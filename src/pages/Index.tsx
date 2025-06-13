import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import { User, Task } from '@/lib/types';

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedTaskForHistory, setSelectedTaskForHistory] = useState<Task | null>(null);
  const [selectedTaskForShare, setSelectedTaskForShare] = useState<Task | null>(null);
  const navigate = useNavigate();

  const fetchTasks = async (userId: string) => {
    const { data: tasksData, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId)
      .order('task_order', { ascending: true });
    if (error) {
      console.error('Error fetching tasks:', error);
      addNotification(`Failed to fetch tasks: ${error.message}`);
      return;
    }
    setTasks(tasksData || []);
  };

  useEffect(() => {
    const fetchUserAndTasks = async () => {
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
      if (authError || !authUser) {
        console.log('No auth user, redirecting to /auth');
        navigate('/auth');
        return;
      }

      console.log('Fetched auth user:', authUser);
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUser.id)
        .single();
      if (userError) {
        console.error('Error fetching user:', userError);
        addNotification(`Failed to fetch user: ${userError.message}`);
        return;
      }
      setUser(userData);
      addNotification(`Welcome back, ${userData.name}!`);

      await fetchTasks(authUser.id);
    };

    fetchUserAndTasks();
  }, [navigate]);

  const handleSignOut = async () => {
    if (user) {
      addNotification(`Goodbye, ${user.name}!`);
    }
    console.log('Signing out');
    await supabase.auth.signOut();
    console.log('Sign-out complete');
    setUser(null);
    setTasks([]);
    navigate('/auth');
  };

  const addNotification = (message: string) => {
    setNotifications((prev) => [message, ...prev.slice(0, 9)]);
  };

  const handleCreateTask = async (task: Omit<Task, 'id' | 'task_order' | 'user_id'>) => {
    if (!user) {
      addNotification('Please log in to create tasks.');
      return;
    }

    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      user_id: user.id,
      task_order: tasks.length,
    };

    console.log('Creating task:', newTask);
    const { error } = await supabase.from('tasks').insert(newTask);
    if (error) {
      console.error('Error creating task:', error);
      addNotification(`Failed to create task: ${error.message}`);
      return;
    }

    await fetchTasks(user.id); // Refetch tasks to ensure consistency
    setIsTaskModalOpen(false);
    addNotification(`Task "${task.name}" created successfully!`);
  };

  const handleImportTask = async (task: Task) => {
    if (!user) return;
    const newTask = { ...task, user_id: user.id };
    const { error } = await supabase.from('tasks').insert(newTask);
    if (error) {
      console.error('Error importing task:', error);
      addNotification(`Failed to import task: ${error.message}`);
      return;
    }
    await fetchTasks(user.id);
    addNotification(`Task "${task.name}" imported successfully!`);
  };

  const handleToggleTask = async (id: string) => {
    const taskToToggle = tasks.find((task) => task.id === id);
    if (!taskToToggle) return;
    const updatedTask = { ...taskToToggle, completed: !taskToToggle.completed };
    const { error } = await supabase
      .from('tasks')
      .update({ completed: updatedTask.completed })
      .eq('id', id);
    if (error) {
      console.error('Error toggling task:', error);
      addNotification(`Failed to toggle task: ${error.message}`);
      return;
    }
    setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
    addNotification(`Task "${taskToToggle.name}" ${updatedTask.completed ? 'completed' : 'reopened'}!`);
  };

  const handlePauseTask = async (id: string) => {
    const taskToPause = tasks.find((task) => task.id === id);
    if (!taskToPause) return;
    const updatedTask = { ...taskToPause, paused: !taskToPause.paused };
    const { error } = await supabase
      .from('tasks')
      .update({ paused: updatedTask.paused })
      .eq('id', id);
    if (error) {
      console.error('Error pausing task:', error);
      addNotification(`Failed to pause task: ${error.message}`);
      return;
    }
    setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
    addNotification(`Task "${taskToPause.name}" ${updatedTask.paused ? 'paused' : 'resumed'}!`);
  };

  const handleDeleteTask = async (id: string) => {
    const taskToDelete = tasks.find((task) => task.id === id);
    if (!taskToDelete) return;
    const { error } = await supabase.from('tasks').delete().eq('id', id);
    if (error) {
      console.error('Error deleting task:', error);
      addNotification(`Failed to delete task: ${error.message}`);
      return;
    }
    setTasks(tasks.filter((task) => task.id !== id));
    addNotification(`Task "${taskToDelete.name}" deleted!`);
  };

  const handleReorderTasks = async (newTasks: Task[]) => {
    const updatedTasks = newTasks.map((task, index) => ({ ...task, task_order: index }));
    const { error } = await supabase
      .from('tasks')
      .upsert(updatedTasks, { onConflict: 'id' });
    if (error) {
      console.error('Error reordering tasks:', error);
      addNotification(`Failed to reorder tasks: ${error.message}`);
      return;
    }
    setTasks(updatedTasks);
  };

  const updateUserProfile = async (updatedUser: User) => {
    const { error } = await supabase
      .from('users')
      .update({ name: updatedUser.name, preferences: updatedUser.preferences })
      .eq('id', updatedUser.id);
    if (error) {
      console.error('Error updating profile:', error);
      addNotification(`Failed to update profile: ${error.message}`);
      return;
    }
    setUser(updatedUser);
    addNotification('Profile updated successfully!');
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  };

  const handleUpdateTask = async (updatedTask: Task) => {
    const { error } = await supabase
      .from('tasks')
      .update(updatedTask)
      .eq('id', updatedTask.id);
    if (error) {
      console.error('Error updating task:', error);
      addNotification(`Failed to update task: ${error.message}`);
      return;
    }
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    setIsEditModalOpen(false);
    setEditingTask(null);
    addNotification(`Task "${updatedTask.name}" updated successfully!`);
  };

  const handleShowHistory = (task: Task) => {
    setSelectedTaskForHistory(task);
    setIsHistoryModalOpen(true);
  };

  const handleShareTask = (task: Task) => {
    setSelectedTaskForShare(task);
    setIsShareModalOpen(true);
  };

  const handleRestoreVersion = async (task: Task) => {
    await handleUpdateTask(task);
    setIsHistoryModalOpen(false);
    addNotification(`Task "${task.name}" restored from history!`);
  };

  if (!user) {
    return null; // App.tsx handles redirect to /auth
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900 transition-all duration-300">
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
        />
        <EditTaskModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingTask(null);
          }}
          onUpdateTask={handleUpdateTask}
          task={editingTask}
        />
        <TaskHistoryModal
          isOpen={isHistoryModalOpen}
          onClose={() => {
            setIsHistoryModalOpen(false);
            setSelectedTaskForHistory(null);
          }}
          task={selectedTaskForHistory}
          onRestoreVersion={handleRestoreVersion}
        />
        <ShareTaskModal
          isOpen={isShareModalOpen}
          onClose={() => {
            setIsShareModalOpen(false);
            setSelectedTaskForShare(null);
          }}
          task={selectedTaskForShare}
        />
      </div>
    </SidebarProvider>
  );
};

export default Index;