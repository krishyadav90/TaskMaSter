export interface User {
  id: string;
  name: string;
  email: string;
  signup_date: string; // ISO string from Supabase TIMESTAMP
  avatar?: string;
  preferences: {
    theme: 'light' | 'dark' | 'system';
    notifications: boolean;
    emailReminders: boolean;
  };
}

export interface Task {
  id: string;
  user_id: string;
  name: string;
  date: string; // ISO string from Supabase TIMESTAMP
  start_time: string;
  end_time: string;
  category: 'Study' | 'Productive' | 'Life' | 'Work' | 'Health' | 'Personal';
  completed: boolean;
  paused: boolean;
  reminder: boolean;
  priority: 'Low' | 'Medium' | 'High';
  deadline?: string; // ISO string or null
  task_order: number;
}