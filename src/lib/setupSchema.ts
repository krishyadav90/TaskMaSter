import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Retrieve Supabase URL and service role key from environment variables
const supabaseUrl = process.env.VITE_SUPABASE_URL as string;
const supabaseServiceRoleKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY as string;

// Validate environment variables
if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('Missing Supabase URL or Service Role Key in environment variables');
}

// Initialize Supabase client with service role key
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function setupSchema() {
  try {
    // Check if execute_sql function exists
    const { data: functions, error: functionError } = await supabase
      .rpc('execute_sql', {
        sql_query: `SELECT proname FROM pg_catalog.pg_proc WHERE proname = 'execute_sql';`
      });
    if (functionError) throw new Error(`execute_sql check failed: ${functionError.message}`);
    if (!functions || !functions.success) {
      throw new Error('execute_sql function not found. Please create it in the SQL Editor.');
    }
    console.log('execute_sql function verified');

    // Create users table
    const { data: usersTableData, error: usersTableError } = await supabase.rpc('execute_sql', {
      sql_query: `CREATE TABLE IF NOT EXISTS users (id UUID PRIMARY KEY, name TEXT NOT NULL, email TEXT UNIQUE NOT NULL, signup_date TIMESTAMP WITH TIME ZONE NOT NULL, avatar TEXT, preferences JSONB NOT NULL);`
    });
    if (usersTableError || (usersTableData && usersTableData.error)) {
      throw new Error(usersTableError?.message || usersTableData.error);
    }
    console.log('Users table created successfully');

    // Create tasks table
    const { data: tasksTableData, error: tasksTableError } = await supabase.rpc('execute_sql', {
      sql_query: `CREATE TABLE IF NOT EXISTS tasks (id UUID PRIMARY KEY, user_id UUID NOT NULL REFERENCES users(id), name TEXT NOT NULL, date TIMESTAMP WITH TIME ZONE NOT NULL, start_time TEXT NOT NULL, end_time TEXT NOT NULL, category TEXT NOT NULL CHECK (category IN ('Study', 'Productive', 'Life', 'Work', 'Health', 'Personal')), completed BOOLEAN NOT NULL DEFAULT FALSE, paused BOOLEAN NOT NULL DEFAULT FALSE, reminder BOOLEAN NOT NULL DEFAULT FALSE, priority TEXT NOT NULL CHECK (priority IN ('Low', 'Medium', 'High')), deadline TIMESTAMP WITH TIME ZONE, task_order INTEGER NOT NULL);`
    });
    if (tasksTableError || (tasksTableData && tasksTableData.error)) {
      throw new Error(tasksTableError?.message || tasksTableData.error);
    }
    console.log('Tasks table created successfully');

    // Enable RLS on users table
    const { data: enableRLSUsersData, error: enableRLSUsersError } = await supabase.rpc('execute_sql', {
      sql_query: `ALTER TABLE users ENABLE ROW LEVEL SECURITY;`
    });
    if (enableRLSUsersError || (enableRLSUsersData && enableRLSUsersData.error)) {
      throw new Error(enableRLSUsersError?.message || enableRLSUsersData.error);
    }
    console.log('RLS enabled on users table');

    // Enable RLS on tasks table
    const { data: enableRLSTasksData, error: enableRLSTasksError } = await supabase.rpc('execute_sql', {
      sql_query: `ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;`
    });
    if (enableRLSTasksError || (enableRLSTasksData && enableRLSTasksData.error)) {
      throw new Error(enableRLSTasksError?.message || enableRLSTasksData.error);
    }
    console.log('RLS enabled on tasks table');

    // Drop existing policies to avoid conflicts
    const { data: dropPoliciesData, error: dropPoliciesError } = await supabase.rpc('execute_sql', {
      sql_query: `
        DROP POLICY IF EXISTS "Users can select their own data" ON users;
        DROP POLICY IF EXISTS "Users can update their own data" ON users;
        DROP POLICY IF EXISTS "Users can insert their own profile" ON users;
        DROP POLICY IF EXISTS "Users can select their own tasks" ON tasks;
        DROP POLICY IF EXISTS "Users can insert their own tasks" ON tasks;
        DROP POLICY IF EXISTS "Users can update their own tasks" ON tasks;
        DROP POLICY IF EXISTS "Users can delete their own tasks" ON tasks;
      `
    });
    if (dropPoliciesError || (dropPoliciesData && dropPoliciesData.error)) {
      throw new Error(dropPoliciesError?.message || dropPoliciesData.error);
    }
    console.log('Existing policies dropped successfully');

    // Add RLS policies for users table
    const { data: usersSelectPolicyData, error: usersSelectPolicyError } = await supabase.rpc('execute_sql', {
      sql_query: `CREATE POLICY "Users can select their own data" ON users FOR SELECT USING (id = auth.uid());`
    });
    if (usersSelectPolicyError || (usersSelectPolicyData && usersSelectPolicyData.error)) {
      throw new Error(usersSelectPolicyError?.message || usersSelectPolicyData.error);
    }
    console.log('Users SELECT policy created');

    const { data: usersUpdatePolicyData, error: usersUpdatePolicyError } = await supabase.rpc('execute_sql', {
      sql_query: `CREATE POLICY "Users can update their own data" ON users FOR UPDATE USING (id = auth.uid()) WITH CHECK (id = auth.uid());`
    });
    if (usersUpdatePolicyError || (usersUpdatePolicyData && usersUpdatePolicyData.error)) {
      throw new Error(usersUpdatePolicyError?.message || usersUpdatePolicyData.error);
    }
    console.log('Users UPDATE policy created');

    const { data: usersInsertPolicyData, error: usersInsertPolicyError } = await supabase.rpc('execute_sql', {
      sql_query: `CREATE POLICY "Users can insert their own profile" ON users FOR INSERT WITH CHECK (id = auth.uid());`
    });
    if (usersInsertPolicyError || (usersInsertPolicyData && usersInsertPolicyData.error)) {
      throw new Error(usersInsertPolicyError?.message || usersInsertPolicyData.error);
    }
    console.log('Users INSERT policy created');

    // Add RLS policies for tasks table
    const { data: tasksSelectPolicyData, error: tasksSelectPolicyError } = await supabase.rpc('execute_sql', {
      sql_query: `CREATE POLICY "Users can select their own tasks" ON tasks FOR SELECT USING (user_id = auth.uid());`
    });
    if (tasksSelectPolicyError || (tasksSelectPolicyData && tasksSelectPolicyData.error)) {
      throw new Error(tasksSelectPolicyError?.message || tasksSelectPolicyData.error);
    }
    console.log('Tasks SELECT policy created');

    const { data: tasksInsertPolicyData, error: tasksInsertPolicyError } = await supabase.rpc('execute_sql', {
      sql_query: `CREATE POLICY "Users can insert their own tasks" ON tasks FOR INSERT WITH CHECK (user_id = auth.uid());`
    });
    if (tasksInsertPolicyError || (tasksInsertPolicyData && tasksInsertPolicyData.error)) {
      throw new Error(tasksInsertPolicyError?.message || tasksInsertPolicyData.error);
    }
    console.log('Tasks INSERT policy created');

    const { data: tasksUpdatePolicyData, error: tasksUpdatePolicyError } = await supabase.rpc('execute_sql', {
      sql_query: `CREATE POLICY "Users can update their own tasks" ON tasks FOR UPDATE USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());`
    });
    if (tasksUpdatePolicyError || (tasksUpdatePolicyData && tasksUpdatePolicyData.error)) {
      throw new Error(tasksUpdatePolicyError?.message || tasksUpdatePolicyData.error);
    }
    console.log('Tasks UPDATE policy created');

    const { data: tasksDeletePolicyData, error: tasksDeletePolicyError } = await supabase.rpc('execute_sql', {
      sql_query: `CREATE POLICY "Users can delete their own tasks" ON tasks FOR DELETE USING (user_id = auth.uid());`
    });
    if (tasksDeletePolicyError || (tasksDeletePolicyData && tasksDeletePolicyData.error)) {
      throw new Error(tasksDeletePolicyError?.message || tasksDeletePolicyData.error);
    }
    console.log('Tasks DELETE policy created');

    console.log('Database schema setup completed successfully!');
  } catch (error) {
    console.error('Error setting up database schema:', error);
    throw error;
  }
}

// Run the setup
setupSchema();