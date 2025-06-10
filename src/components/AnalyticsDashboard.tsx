
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MoreHorizontal, TrendingUp, Clock, Target } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from 'recharts';
import type { Task } from '@/pages/Index';

interface AnalyticsDashboardProps {
  tasks: Task[];
}

const AnalyticsDashboard = ({ tasks }: AnalyticsDashboardProps) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  
  // Sample data for charts (in a real app, this would be calculated from actual task data)
  const weeklyData = [
    { day: 'S', value: 8 },
    { day: 'M', value: 12 },
    { day: 'T', value: 10 },
    { day: 'W', value: 15 },
    { day: 'T', value: 13 },
    { day: 'F', value: 16 },
    { day: 'S', value: 11 }
  ];

  const activityData = [
    { time: '6', value: 2 },
    { time: '8', value: 5 },
    { time: '10', value: 8 },
    { time: '12', value: 12 },
    { time: '14', value: 15 },
    { time: '16', value: 11 },
    { time: '18', value: 7 },
    { time: '20', value: 4 }
  ];

  const categoryCounts = {
    Study: tasks.filter(t => t.category === 'Study').length,
    Productive: tasks.filter(t => t.category === 'Productive').length,
    Life: tasks.filter(t => t.category === 'Life').length
  };

  const missingTasks = tasks.filter(t => !t.completed && new Date(t.date) < new Date()).length;
  const onTimeTasks = tasks.filter(t => t.completed).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Data Report</h1>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* All Activity */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">All Activity</span>
              <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                Activity
              </Badge>
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-2">{totalTasks}</div>
            <div className="h-8">
              <svg viewBox="0 0 100 20" className="w-full h-full">
                <path
                  d="M0 15 Q25 5 50 10 T100 8"
                  stroke="#e5e7eb"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>
          </CardContent>
        </Card>

        {/* Complete */}
        <Card className="bg-gradient-to-br from-red-400 to-red-500 text-white border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/80">Complete</span>
              <Badge className="bg-white/20 text-white border-0">
                {Math.round(completionRate)}%
              </Badge>
            </div>
            <div className="text-2xl font-bold mb-4">{completedTasks}</div>
            <div className="relative">
              <div className="w-16 h-16 mx-auto">
                <svg className="w-16 h-16 transform -rotate-90">
                  <circle
                    cx="32"
                    cy="32"
                    r="26"
                    fill="transparent"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="4"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="26"
                    fill="transparent"
                    stroke="white"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={163}
                    strokeDashoffset={163 - (163 * completionRate) / 100}
                    className="transition-all duration-500"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold">{Math.round(completionRate)}%</span>
                </div>
              </div>
              <p className="text-center text-xs text-white/80 mt-1">
                {completedTasks}/{totalTasks}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Missing */}
        <Card className="bg-gradient-to-br from-pink-400 to-pink-500 text-white border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/80">Missing</span>
            </div>
            <div className="text-2xl font-bold mb-4">{missingTasks}</div>
            <div className="relative">
              <div className="w-16 h-16 mx-auto">
                <svg className="w-16 h-16 transform -rotate-90">
                  <circle
                    cx="32"
                    cy="32"
                    r="26"
                    fill="transparent"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="4"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="26"
                    fill="transparent"
                    stroke="white"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={163}
                    strokeDashoffset={163 - (163 * 25) / 100}
                    className="transition-all duration-500"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold">25%</span>
                </div>
              </div>
              <p className="text-center text-xs text-white/80 mt-1">10/35</p>
            </div>
          </CardContent>
        </Card>

        {/* On Time */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">On Time</span>
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-4">{onTimeTasks}</div>
            <div className="space-y-1">
              {weeklyData.slice(3, 7).map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-1 bg-blue-600 rounded-full" style={{ height: `${item.value}px` }}></div>
                  <div className="text-xs text-gray-500">{item.day}</div>
                </div>
              ))}
            </div>
            <div className="text-sm text-gray-500 mt-2">Activity</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <Card className="bg-gradient-to-br from-blue-600 to-purple-700 text-white border-0 shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-white">Results Activity</CardTitle>
            <div className="text-2xl font-bold mt-1">12</div>
          </div>
          <Select defaultValue="weekly">
            <SelectTrigger className="w-24 bg-white/20 border-0 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityData}>
                <XAxis 
                  dataKey="time" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 12, fill: 'white' }}
                />
                <YAxis hide />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="white" 
                  strokeWidth={2}
                  dot={{ fill: 'white', r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between text-xs text-white/80 mt-2">
            <span>S</span>
            <span>M</span>
            <span>T</span>
            <span>W</span>
            <span>T</span>
            <span>F</span>
            <span>S</span>
          </div>
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-pink-400 to-pink-500 text-white border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold mb-1">{categoryCounts.Study}</div>
            <div className="text-sm text-white/80">Study Tasks</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-red-400 to-red-500 text-white border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold mb-1">{categoryCounts.Productive}</div>
            <div className="text-sm text-white/80">Productive Tasks</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-400 to-blue-500 text-white border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold mb-1">{categoryCounts.Life}</div>
            <div className="text-sm text-white/80">Life Tasks</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
