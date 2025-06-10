
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Calendar,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { format, subDays, startOfWeek, endOfWeek } from 'date-fns';
import type { Task, User } from '@/pages/Index';

interface AnalyticsProps {
  tasks: Task[];
  user: User | null;
}

const Analytics = ({ tasks, user }: AnalyticsProps) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  // Weekly stats
  const weekStart = startOfWeek(new Date());
  const weekEnd = endOfWeek(new Date());
  const weeklyTasks = tasks.filter(task => 
    task.date >= weekStart && task.date <= weekEnd
  );
  const weeklyCompleted = weeklyTasks.filter(task => task.completed).length;

  // Category breakdown
  const categoryStats = {
    Study: tasks.filter(task => task.category === 'Study'),
    Work: tasks.filter(task => task.category === 'Work'),
    Health: tasks.filter(task => task.category === 'Health'),
    Personal: tasks.filter(task => task.category === 'Personal'),
    Productive: tasks.filter(task => task.category === 'Productive'),
    Life: tasks.filter(task => task.category === 'Life'),
  };

  // Daily completion for the last 7 days
  const dailyStats = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), i);
    const dayTasks = tasks.filter(task => 
      format(task.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
    const dayCompleted = dayTasks.filter(task => task.completed).length;
    return {
      date: format(date, 'MMM dd'),
      total: dayTasks.length,
      completed: dayCompleted,
      rate: dayTasks.length > 0 ? (dayCompleted / dayTasks.length) * 100 : 0
    };
  }).reverse();

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="md:hidden" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
            <p className="text-muted-foreground">Track your productivity and progress over time.</p>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Tasks</p>
                <p className="text-3xl font-bold text-blue-900">{totalTasks}</p>
              </div>
              <Target className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Completed</p>
                <p className="text-3xl font-bold text-green-900">{completedTasks}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Pending</p>
                <p className="text-3xl font-bold text-orange-900">{pendingTasks}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Success Rate</p>
                <p className="text-3xl font-bold text-purple-900">{Math.round(completionRate)}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Category Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {Object.entries(categoryStats).map(([category, categoryTasks]) => {
              const categoryCompleted = categoryTasks.filter(task => task.completed).length;
              const categoryTotal = categoryTasks.length;
              const categoryRate = categoryTotal > 0 ? (categoryCompleted / categoryTotal) * 100 : 0;
              
              const getCategoryColor = (cat: string) => {
                switch (cat) {
                  case 'Study': return 'bg-pink-500';
                  case 'Work': return 'bg-blue-500';
                  case 'Health': return 'bg-green-500';
                  case 'Personal': return 'bg-purple-500';
                  case 'Productive': return 'bg-orange-500';
                  case 'Life': return 'bg-indigo-500';
                  default: return 'bg-gray-500';
                }
              };

              return (
                <div key={category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getCategoryColor(category)}`} />
                      <span className="font-medium">{category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {categoryCompleted}/{categoryTotal}
                      </span>
                      <Badge variant="outline">
                        {Math.round(categoryRate)}%
                      </Badge>
                    </div>
                  </div>
                  <Progress value={categoryRate} className="h-2" />
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Weekly Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Weekly Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-indigo-600 mb-2">
                {weeklyCompleted}/{weeklyTasks.length}
              </div>
              <p className="text-sm text-muted-foreground">Tasks completed this week</p>
              <div className="mt-4">
                <Progress 
                  value={weeklyTasks.length > 0 ? (weeklyCompleted / weeklyTasks.length) * 100 : 0} 
                  className="h-3"
                />
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Recent Activity</h4>
              <div className="space-y-2">
                {tasks.slice(0, 3).map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 
                        className={`h-4 w-4 ${task.completed ? 'text-green-500' : 'text-gray-400'}`} 
                      />
                      <span className="text-sm font-medium">{task.name}</span>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={
                        task.category === 'Study' ? 'bg-pink-50 text-pink-700 border-pink-200' :
                        task.category === 'Work' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        task.category === 'Health' ? 'bg-green-50 text-green-700 border-green-200' :
                        task.category === 'Personal' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                        task.category === 'Productive' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                        'bg-indigo-50 text-indigo-700 border-indigo-200'
                      }
                    >
                      {task.category}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Daily Performance (Last 7 Days)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-4">
            {dailyStats.map((day, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="text-xs font-medium text-muted-foreground">{day.date}</div>
                <div className="h-20 bg-gray-100 rounded-lg flex flex-col justify-end p-2">
                  <div 
                    className="bg-blue-500 rounded-sm transition-all duration-300"
                    style={{ height: `${Math.max(day.rate, 5)}%` }}
                  />
                </div>
                <div className="text-xs">
                  <div className="font-medium">{day.completed}/{day.total}</div>
                  <div className="text-muted-foreground">{Math.round(day.rate)}%</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
