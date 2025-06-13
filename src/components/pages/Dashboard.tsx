import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Target,
  Calendar as CalendarIcon,
  BarChart3
} from 'lucide-react';
import { format, parseISO } from 'date-fns'; // Add parseISO
import { useState } from 'react';
import TaskList from '@/components/TaskList';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Task, User } from '@/lib/types';

interface DashboardProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onPauseTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (task: Task) => void;
  onShowHistory: (task: Task) => void;
  onShareTask: (task: Task) => void;
  user: User | null;
}

const Dashboard = ({ 
  tasks, 
  onToggleTask, 
  onPauseTask, 
  onDeleteTask, 
  onEditTask,
  onShowHistory,
  onShareTask,
  user 
}: DashboardProps) => {
  const { t } = useLanguage();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const todayTasks = tasks.filter(task => 
    format(parseISO(task.date), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
  );

  const completedToday = todayTasks.filter(task => task.completed).length;
  const totalToday = todayTasks.length;
  const completionRate = totalToday > 0 ? (completedToday / totalToday) * 100 : 0;

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="md:hidden" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">{t('dashboard')}</h1>
            <p className="text-muted-foreground">{t('welcomeBack')}</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarIcon className="h-4 w-4" />
          {format(new Date(), 'EEEE, MMMM dd, yyyy')}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">{t('totalTasks')}</p>
                <p className="text-2xl font-bold text-blue-900">{tasks.length}</p>
              </div>
              <div className="h-12 w-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">{t('completed')}</p>
                <p className="text-2xl font-bold text-green-900">{tasks.filter(t => t.completed).length}</p>
              </div>
              <div className="h-12 w-12 bg-green-500 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">{t('todayTasks')}</p>
                <p className="text-2xl font-bold text-orange-900">{todayTasks.length}</p>
              </div>
              <div className="h-12 w-12 bg-orange-500 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">{t('completionRate')}</p>
                <p className="text-2xl font-bold text-purple-900">{Math.round(completionRate)}%</p>
              </div>
              <div className="h-12 w-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Progress */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              {t('todayProgress')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>{t('completionRate')}</span>
                <span>{completedToday}/{totalToday} {t('tasks').toLowerCase()}</span>
              </div>
              <Progress value={completionRate} className="h-3" />
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-lg">{t('todayTasks')}</h4>
              <TaskList 
                tasks={todayTasks} 
                onToggleTask={onToggleTask}
                onPauseTask={onPauseTask}
                onDeleteTask={onDeleteTask}
                onEditTask={onEditTask}
                onShowHistory={onShowHistory}
                onShareTask={onShareTask}
                showDate={false}
              />
              {todayTasks.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Clock className="mx-auto h-12 w-12 mb-2 opacity-50" />
                  <p>{t('noTasksScheduled')}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Calendar & Quick Stats */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t('calendar')}</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="rounded-md border-0"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t('quickStats')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">{t('study')} {t('tasks')}</span>
                <Badge variant="outline" className="bg-pink-50 text-pink-700 border-pink-200">
                  {tasks.filter(t => t.category === 'Study').length}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">{t('work')} {t('tasks')}</span>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {tasks.filter(t => t.category === 'Work').length}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">{t('life')} {t('tasks')}</span>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  {tasks.filter(t => t.category === 'Life').length}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;