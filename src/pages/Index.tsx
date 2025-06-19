import { useState, useEffect, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import Dashboard from '@/components/pages/Dashboard';
import Tasks from '@/components/pages/Tasks';
import Analytics from '@/components/pages/Analytics';
import Profile from '@/components/pages/Profile';
import Calendar from '@/components/pages/Calendar';
import About from '@/components/pages/About';
import TaskModal from '@/components/TaskModal';
import EditTaskModal from '@/components/EditTaskModal';
import TaskHistoryModal from '@/components/TaskHistoryModal';
import ShareTaskModal from '@/components/ShareTaskModal';
import { supabase } from '@/lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Session } from '@supabase/supabase-js';
import { Task, User } from '@/lib/types';
import { isValidUUID, generateUUID } from '@/lib/utils';

interface Notification {
  id: string;
  message: string;
  timestamp: string;
}

interface IndexProps {
  session: Session;
}

const Index = ({ session }: IndexProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedTaskForHistory, setSelectedTaskForHistory] = useState<Task | null>(null);
  const [selectedTaskForShare, setSelectedTaskForShare] = useState<Task | null>(null);
  const [hasWelcomed, setHasWelcomed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const formatTimestamp = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const addNotification = (message: string) => {
    if (!user?.preferences?.notifications) return;
    const timestamp = formatTimestamp();
    const notification: Notification = {
      id: crypto.randomUUID(),
      message: `${message} at ${timestamp}`,
      timestamp,
    };
    setNotifications((prev) => [notification, ...prev.slice(0, 9)]);
  };

  const fetchUser = useCallback(async () => {
    const authUser = session.user;
    if (!authUser) {
      console.log('No auth user, redirecting to /auth');
      navigate('/auth');
      return null;
    }

    console.log('Fetched auth user:', authUser);
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', authUser.id)
      .single();
    if (userError) {
      console.error('Error fetching user:', userError);
      addNotification(`${t('userFetchFailed')}: ${userError.message}`);
      return null;
    }
    console.log('User data:', userData);
    return userData as User;
  }, [session, navigate, t]);

  const fetchTasks = useCallback(
    async (userId: string) => {
      setIsLoading(true);
      const { data: tasksData, error } = await supabase
        .from('tasks')
        .select('id, user_id, name, date, start_time, end_time, category, completed, paused, reminder, priority, task_order')
        .eq('user_id', userId)
        .order('task_order', { ascending: true });
      setIsLoading(false);
      if (error) {
        console.error('Error fetching tasks:', error);
        if (error.code === '42P01') {
          addNotification('Tasks table not found. Please create the table in Supabase.');
        } else {
          addNotification(`${t('taskFetchFailed')}: ${error.message}`);
        }
        return;
      }
      const validatedTasks = tasksData.map((task: Task) => ({
        ...task,
        id: isValidUUID(task.id) ? task.id : generateUUID(),
        name: task.name || 'Untitled Task', // Ensure name is not null
      }));
      setTasks(validatedTasks || []);
    },
    [t]
  );

  useEffect(() => {
    let mounted = true;

    const initialize = async () => {
      const userData = await fetchUser();
      if (!mounted || !userData) return;

      setUser(userData);
      if (!hasWelcomed) {
        const welcomeMessage = t('welcomeBackName').includes('{name}')
          ? t('welcomeBackName').replace('{name}', userData.name || 'User')
          : `Welcome back, ${userData.name || 'User'}!`;
        console.log('Translated welcomeBackName:', t('welcomeBackName'), 'Final message:', welcomeMessage);
        addNotification(welcomeMessage);
        setHasWelcomed(true);
      }
      await fetchTasks(userData.id);
    };

    initialize();

    return () => {
      mounted = false;
    };
  }, [fetchUser, fetchTasks, t, hasWelcomed]);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, newSession) => {
      console.log('Auth state changed:', event, newSession);
      if (event === 'SIGNED_OUT') {
        setUser(null);
        setTasks([]);
        setNotifications([]);
        setHasWelcomed(false);
        navigate('/auth');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  const handleSignOut = async () => {
    if (user) {
      addNotification(t('goodbye').replace('{name}', user.name || 'User'));
    }
    console.log('Signing out');
    await supabase.auth.signOut();
    console.log('Sign-out complete');
  };

  const handleCreateTask = async (task: Omit<Task, 'id' | 'user_id' | 'task_order'>) => {
    if (!user) {
      addNotification(t('loginRequired'));
      return;
    }

    if (!task.name || task.name.trim() === '') {
      addNotification(t('invalidTaskName'));
      return;
    }

    const newTask: Task = {
      ...task,
      id: generateUUID(),
      user_id: user.id,
      task_order: tasks.length,
      date: task.date || new Date().toISOString().split('T')[0],
      start_time: task.start_time || '09:00',
      end_time: task.end_time || '17:00',
      category: task.category || 'Personal',
      completed: task.completed ?? false,
      paused: task.paused ?? false,
      reminder: task.reminder ?? false,
      priority: task.priority || 'Medium',
    };

    console.log('Creating task:', newTask);
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from('tasks').insert([newTask]).select();
      setIsLoading(false);
      if (error) {
        console.error('Error creating task:', error);
        if (error.code === '42P01') {
          addNotification('Tasks table not found. Please create the table in Supabase.');
        } else if (error.code === '42501') {
          addNotification('Permission denied. Please check RLS policies in Supabase.');
        } else {
          addNotification(`${t('taskCreateFailed')}: ${error.message}`);
        }
        return;
      }
      console.log('Task created:', data);
      await fetchTasks(user.id);
      setIsTaskModalOpen(false);
      addNotification(`${t('taskCreated').replace('{name}', newTask.name)}`);
    } catch (err) {
      setIsLoading(false);
      console.error('Unexpected error creating task:', err);
      addNotification(`${t('taskCreateFailed')}: ${err.message || 'Unknown error'}`);
    }
  };

  const handleImportTask = async (task: Task) => {
    if (!user) {
      addNotification(t('loginRequired'));
      return;
    }

    if (!task.name || task.name.trim() === '') {
      addNotification(t('invalidTaskName'));
      return;
    }

    const newTask: Task = {
      ...task,
      id: isValidUUID(task.id) ? task.id : generateUUID(),
      user_id: user.id,
      name: task.name || 'Untitled Task', // Fallback name
      date: task.date || new Date().toISOString().split('T')[0],
      start_time: task.start_time || '09:00',
      end_time: task.end_time || '17:00',
      category: task.category || 'Personal',
      completed: task.completed ?? false,
      paused: task.paused ?? false,
      reminder: task.reminder ?? false,
      priority: task.priority || 'Medium',
      task_order: task.task_order ?? tasks.length,
    };

    console.log('Importing task:', newTask);
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from('tasks').insert([newTask]).select();
      setIsLoading(false);
      if (error) {
        console.error('Error importing task:', error);
        if (error.code === '42P01') {
          addNotification('Tasks table not found. Please create the table in Supabase.');
        } else if (error.code === '42501') {
          addNotification('Permission denied. Please check RLS policies in Supabase.');
        } else if (error.code === '23502') {
          addNotification(`${t('taskImportFailed')}: Missing required field (name or date)`);
        } else {
          addNotification(`${t('taskImportFailed')}: ${error.message}`);
        }
        return;
      }
      console.log('Task imported:', data);
      await fetchTasks(user.id);
      addNotification(`${t('taskImported').replace('{name}', newTask.name || 'Untitled Task')}`);
    } catch (err) {
      setIsLoading(false);
      console.error('Unexpected error importing task:', err);
      addNotification(`${t('taskImportFailed')}: ${err.message || 'Unknown error'}`);
    }
  };

  const handleToggleTask = async (id: string) => {
    if (!isValidUUID(id)) {
      addNotification(t('invalidTask'));
      return;
    }
    const taskToToggle = tasks.find((task) => task.id === id);
    if (!taskToToggle) return;
    const updatedTask = { ...taskToToggle, completed: !taskToToggle.completed };
    setIsLoading(true);
    const { error } = await supabase
      .from('tasks')
      .update({ completed: updatedTask.completed })
      .eq('id', id);
    setIsLoading(false);
    if (error) {
      console.error('Error toggling task:', error);
      if (error.code === '42P01') {
        addNotification('Tasks table not found. Please create the table in Supabase.');
      } else {
        addNotification(`${t('taskToggleFailed')}: ${error.message}`);
      }
      return;
    }
    setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
    addNotification(
      `${t(updatedTask.completed ? 'taskCompleted' : 'taskReopened').replace('{name}', taskToToggle.name)}`
    );
  };

  const handlePauseTask = async (id: string) => {
    if (!isValidUUID(id)) {
      addNotification(t('invalidTask'));
      return;
    }
    const taskToPause = tasks.find((task) => task.id === id);
    if (!taskToPause) return;
    const updatedTask = { ...taskToPause, paused: !taskToPause.paused };
    setIsLoading(true);
    const { error } = await supabase
      .from('tasks')
      .update({ paused: updatedTask.paused })
      .eq('id', id);
    setIsLoading(false);
    if (error) {
      console.error('Error pausing task:', error);
      if (error.code === '42P01') {
        addNotification('Tasks table not found. Please create the table in Supabase.');
      } else {
        addNotification(`${t('taskPauseFailed')}: ${error.message}`);
      }
      return;
    }
    setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
    addNotification(
      `${t(updatedTask.paused ? 'taskPaused' : 'taskResumed').replace('{name}', taskToPause.name)}`
    );
  };

  const handleDeleteTask = async (id: string) => {
    if (!isValidUUID(id)) {
      addNotification(t('invalidTask'));
      return;
    }
    const taskToDelete = tasks.find((task) => task.id === id);
    if (!taskToDelete) return;
    setIsLoading(true);
    const { error } = await supabase.from('tasks').delete().eq('id', id);
    setIsLoading(false);
    if (error) {
      console.error('Error deleting task:', error);
      if (error.code === '42P01') {
        addNotification('Tasks table not found. Please create the table in Supabase.');
      } else {
        addNotification(`${t('taskDeleteFailed')}: ${error.message}`);
      }
      return;
    }
    setTasks(tasks.filter((task) => task.id !== id));
    addNotification(`${t('taskDeleted').replace('{name}', taskToDelete.name)}`);
  };

  const handleReorderTasks = async (newTasks: Task[]) => {
    const updatedTasks = newTasks.map((task, index) => ({
      ...task,
      id: isValidUUID(task.id) ? task.id : generateUUID(),
      name: task.name || 'Untitled Task',
      task_order: index,
    }));
    setIsLoading(true);
    const { error } = await supabase
      .from('tasks')
      .upsert(updatedTasks, { onConflict: 'id' });
    setIsLoading(false);
    if (error) {
      console.error('Error reordering tasks:', error);
      if (error.code === '42P01') {
        addNotification('Tasks table not found. Please create the table in Supabase.');
      } else {
        addNotification(`${t('taskReorderFailed')}: ${error.message}`);
      }
      return;
    }
    setTasks(updatedTasks);
  };

  const updateUserProfile = async (updatedUser: User) => {
    setIsLoading(true);
    const { error } = await supabase
      .from('users')
      .update({ name: updatedUser.name, preferences: updatedUser.preferences })
      .eq('id', updatedUser.id);
    setIsLoading(false);
    if (error) {
      console.error('Error updating profile:', error);
      addNotification(`${t('profileUpdateFailed')}: ${error.message}`);
      return;
    }
    setUser(updatedUser);
    addNotification(t('profileUpdated'));
  };

  const handleEditTask = (task: Task) => {
    if (!isValidUUID(task.id)) {
      addNotification(t('invalidTask'));
      return;
    }
    setEditingTask(task);
    setIsEditModalOpen(true);
  };

  const handleUpdateTask = async (updatedTask: Task) => {
    if (!isValidUUID(updatedTask.id)) {
      addNotification(t('invalidTask'));
      return;
    }
    if (!updatedTask.name || updatedTask.name.trim() === '') {
      addNotification(t('invalidTaskName'));
      return;
    }
    setIsLoading(true);
    const { error } = await supabase
      .from('tasks')
      .update(updatedTask)
      .eq('id', updatedTask.id);
    setIsLoading(false);
    if (error) {
      console.error('Error updating task:', error);
      if (error.code === '42P01') {
        addNotification('Tasks table not found. Please create the table in Supabase.');
      } else {
        addNotification(`${t('taskUpdateFailed')}: ${error.message}`);
      }
      return;
    }
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    setIsEditModalOpen(false);
    setEditingTask(null);
    addNotification(`${t('taskUpdated').replace('{name}', updatedTask.name)}`);
  };

  const handleShowHistory = (task: Task) => {
    if (!isValidUUID(task.id)) {
      addNotification(t('invalidTask'));
      return;
    }
    setSelectedTaskForHistory(task);
    setIsHistoryModalOpen(true);
  };

  const handleShareTask = (task: Task) => {
    if (!isValidUUID(task.id)) {
      addNotification(t('invalidTask'));
      return;
    }
    setSelectedTaskForShare(task);
    setIsShareModalOpen(true);
  };

  const handleRestoreVersion = async (task: Task) => {
    if (!isValidUUID(task.id)) {
      addNotification(t('invalidTask'));
      return;
    }
    await handleUpdateTask(task);
    setIsHistoryModalOpen(false);
    addNotification(`${t('taskRestored').replace('{name}', task.name)}`);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900 transition-all duration-300">
        {isLoading && <div>Loading...</div>}
        <AppSidebar
          onAddTask={() => setIsTaskModalOpen(true)}
          user={user}
          onSignOut={handleSignOut}
          taskCount={tasks.length}
        />
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  tasks={tasks}
                  onToggleTask={handleToggleTask}
                  onPauseTask={handlePauseTask}
                  onDeleteTask={handleDeleteTask}
                  onEditTask={handleEditTask}
                  onShowHistory={handleShowHistory}
                  onShareTask={handleShareTask}
                  user={user}
                />
              }
            />
            <Route
              path="/tasks"
              element={
                <Tasks
                  tasks={tasks}
                  onToggleTask={handleToggleTask}
                  onPauseTask={handlePauseTask}
                  onDeleteTask={handleDeleteTask}
                  onEditTask={handleEditTask}
                  onShowHistory={handleShowHistory}
                  onShareTask={handleShareTask}
                  onReorderTasks={handleReorderTasks}
                />
              }
            />
            <Route
              path="/analytics"
              element={<Analytics tasks={tasks} user={user} />}
            />
            <Route
              path="/calendar"
              element={<Calendar tasks={tasks} onToggleTask={handleToggleTask} />}
            />
            <Route
              path="/profile"
              element={
                <Profile
                  user={user}
                  tasks={tasks}
                  notifications={notifications}
                  onUpdateProfile={updateUserProfile}
                  onClearNotifications={() => setNotifications([])}
                  onImportTask={handleImportTask}
                />
              }
            />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        <TaskModal
          isOpen={isTaskModalOpen}
          onClose={() => setIsTaskModalOpen(false)}
          onCreateTask={handleCreateTask}
          aria-describedby="task-modal-description"
        />
        <EditTaskModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingTask(null);
          }}
          onUpdateTask={handleUpdateTask}
          task={editingTask}
          aria-describedby="edit-task-modal-description"
        />
        <TaskHistoryModal
          isOpen={isHistoryModalOpen}
          onClose={() => {
            setIsHistoryModalOpen(false);
            setSelectedTaskForHistory(null);
          }}
          task={selectedTaskForHistory}
          onRestoreVersion={handleRestoreVersion}
          aria-describedby="task-history-modal-description"
        />
        <ShareTaskModal
          isOpen={isShareModalOpen}
          onClose={() => {
            setIsShareModalOpen(false);
            setSelectedTaskForShare(null);
          }}
          task={selectedTaskForShare}
          aria-describedby="share-task-modal-description"
        />
      </div>
    </SidebarProvider>
  );
};

export default Index;