import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import Dashboard from '@/components/pages/Dashboard';
import Tasks from '@/components/pages/Tasks';
import Analytics from '@/components/pages/Analytics';
import Profile from '@/components/pages/Profile';
import Calendar from '@/components/pages/Calendar';
import Auth from '@/components/pages/Auth';
import About from '@/components/pages/About';
import TaskModal from '@/components/TaskModal';
import EditTaskModal from '@/components/EditTaskModal';
import TaskHistoryModal from '@/components/TaskHistoryModal';
import ShareTaskModal from '@/components/ShareTaskModal';

export interface Task {
  id: string;
  name: string;
  date: Date;
  startTime: string;
  endTime: string;
  category: 'Study' | 'Productive' | 'Life' | 'Work' | 'Health' | 'Personal';
  completed: boolean;
  paused: boolean;
  reminder: boolean;
  priority: 'Low' | 'Medium' | 'High';
  deadline?: Date;
  order: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  signupDate: Date;
  avatar?: string;
  preferences: {
    theme: 'light' | 'dark' | 'system';
    notifications: boolean;
    emailReminders: boolean;
  };
}

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedTaskForHistory, setSelectedTaskForHistory] = useState<Task | null>(null);
  const [selectedTaskForShare, setSelectedTaskForShare] = useState<Task | null>(null);

  const handleSignIn = (email: string, password: string) => {
    // Simulate authentication
    const newUser: User = {
      id: Date.now().toString(),
      name: email.split('@')[0],
      email,
      signupDate: new Date(),
      preferences: {
        theme: 'system',
        notifications: true,
        emailReminders: true,
      }
    };
    setUser(newUser);
    setIsAuthenticated(true);
    addNotification(`Welcome back, ${newUser.name}!`);
  };

  const handleSignUp = (name: string, email: string, password: string) => {
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      signupDate: new Date(),
      preferences: {
        theme: 'system',
        notifications: true,
        emailReminders: true,
      }
    };
    setUser(newUser);
    setIsAuthenticated(true);
    addNotification(`Welcome to TaskMaster, ${newUser.name}!`);
  };

  const handleSignOut = () => {
    if (user) {
      addNotification(`Goodbye, ${user.name}!`);
    }
    setUser(null);
    setIsAuthenticated(false);
  };

  const addNotification = (message: string) => {
    setNotifications(prev => [message, ...prev.slice(0, 9)]);
  };

  const handleCreateTask = (task: Omit<Task, 'id' | 'order'>) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
      order: tasks.length
    };
    setTasks([...tasks, newTask]);
    setIsTaskModalOpen(false);
    addNotification(`Task "${task.name}" created successfully!`);
  };

  const handleImportTask = (task: Task) => {
    setTasks([...tasks, task]);
    addNotification(`Task "${task.name}" imported successfully!`);
  };

  const handleToggleTask = (id: string) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        const updated = { ...task, completed: !task.completed };
        addNotification(`Task "${task.name}" ${updated.completed ? 'completed' : 'reopened'}!`);
        return updated;
      }
      return task;
    }));
  };

  const handlePauseTask = (id: string) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        const updated = { ...task, paused: !task.paused };
        addNotification(`Task "${task.name}" ${updated.paused ? 'paused' : 'resumed'}!`);
        return updated;
      }
      return task;
    }));
  };

  const handleDeleteTask = (id: string) => {
    const taskToDelete = tasks.find(task => task.id === id);
    setTasks(tasks.filter(task => task.id !== id));
    if (taskToDelete) {
      addNotification(`Task "${taskToDelete.name}" deleted!`);
    }
  };

  const handleReorderTasks = (newTasks: Task[]) => {
    setTasks(newTasks);
  };

  const updateUserProfile = (updatedUser: User) => {
    setUser(updatedUser);
    addNotification('Profile updated successfully!');
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
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

  const handleRestoreVersion = (task: Task) => {
    handleUpdateTask(task);
    setIsHistoryModalOpen(false);
    addNotification(`Task "${task.name}" restored from history!`);
  };

  if (!isAuthenticated) {
    return <Auth onSignIn={handleSignIn} onSignUp={handleSignUp} />;
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
              element={
                <Calendar 
                  tasks={tasks} 
                  onToggleTask={handleToggleTask}
                />
              } 
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
            <Route 
              path="/about" 
              element={<About />} 
            />
          </Routes>
        </main>

        {/* Modals */}
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
