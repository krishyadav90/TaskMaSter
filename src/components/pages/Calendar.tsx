
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle2,
  Filter
} from 'lucide-react';
import { format, isSameDay } from 'date-fns';
import TaskList from '@/components/TaskList';
import type { Task } from '@/pages/Index';

interface CalendarProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
}

const Calendar = ({ tasks, onToggleTask }: CalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<'all' | 'completed' | 'pending'>('all');

  const selectedDateTasks = tasks.filter(task => 
    isSameDay(task.date, selectedDate)
  );

  const filteredTasks = selectedDateTasks.filter(task => {
    if (viewMode === 'completed') return task.completed;
    if (viewMode === 'pending') return !task.completed;
    return true;
  });

  // Get tasks for calendar highlighting
  const getTasksForDate = (date: Date) => {
    return tasks.filter(task => isSameDay(task.date, date));
  };

  // Create modifiers for different task states
  const datesWithAllCompleted = tasks
    .reduce((acc: Date[], task) => {
      const dayTasks = getTasksForDate(task.date);
      const completedTasks = dayTasks.filter(t => t.completed).length;
      const hasAllCompleted = completedTasks === dayTasks.length && dayTasks.length > 0;
      
      if (hasAllCompleted && !acc.some(date => isSameDay(date, task.date))) {
        acc.push(task.date);
      }
      return acc;
    }, []);

  const datesWithPartialCompleted = tasks
    .reduce((acc: Date[], task) => {
      const dayTasks = getTasksForDate(task.date);
      const completedTasks = dayTasks.filter(t => t.completed).length;
      const hasPartialCompleted = completedTasks > 0 && completedTasks < dayTasks.length;
      
      if (hasPartialCompleted && !acc.some(date => isSameDay(date, task.date))) {
        acc.push(task.date);
      }
      return acc;
    }, []);

  const datesWithPendingTasks = tasks
    .reduce((acc: Date[], task) => {
      const dayTasks = getTasksForDate(task.date);
      const completedTasks = dayTasks.filter(t => t.completed).length;
      const hasOnlyPending = completedTasks === 0 && dayTasks.length > 0;
      
      if (hasOnlyPending && !acc.some(date => isSameDay(date, task.date))) {
        acc.push(task.date);
      }
      return acc;
    }, []);

  const upcomingTasks = tasks
    .filter(task => task.date > new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5);

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="md:hidden" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Calendar</h1>
            <p className="text-muted-foreground">Plan and organize your tasks by date.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Task Calendar
            </CardTitle>
            <div className="flex gap-2 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-100 rounded"></div>
                <span>All Complete</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-yellow-100 rounded"></div>
                <span>Partial</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-100 rounded"></div>
                <span>Pending</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <CalendarComponent
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md border"
              modifiers={{
                allCompleted: datesWithAllCompleted,
                partialCompleted: datesWithPartialCompleted,
                pendingTasks: datesWithPendingTasks,
              }}
              modifiersClassNames={{
                allCompleted: "bg-green-100 text-green-800 font-semibold",
                partialCompleted: "bg-yellow-100 text-yellow-800 font-semibold",
                pendingTasks: "bg-blue-100 text-blue-800 font-semibold",
              }}
            />
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Upcoming Tasks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingTasks.length > 0 ? (
              upcomingTasks.map((task) => (
                <div key={task.id} className="p-3 bg-gray-50 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{task.name}</span>
                    <Badge 
                      variant="outline" 
                      className={
                        task.category === 'Study' ? 'bg-pink-50 text-pink-700 border-pink-200' :
                        task.category === 'Productive' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        'bg-green-50 text-green-700 border-green-200'
                      }
                    >
                      {task.category}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {format(task.date, 'MMM dd, yyyy')} • {task.startTime} - {task.endTime}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <Clock className="mx-auto h-8 w-8 mb-2 opacity-50" />
                <p className="text-sm">No upcoming tasks</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Selected Date Tasks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              Tasks for {format(selectedDate, 'EEEE, MMMM dd, yyyy')}
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('all')}
              >
                All ({selectedDateTasks.length})
              </Button>
              <Button
                variant={viewMode === 'completed' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('completed')}
              >
                Completed ({selectedDateTasks.filter(t => t.completed).length})
              </Button>
              <Button
                variant={viewMode === 'pending' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('pending')}
              >
                Pending ({selectedDateTasks.filter(t => !t.completed).length})
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TaskList 
            tasks={filteredTasks} 
            onToggleTask={onToggleTask}
            showDate={false}
          />
          {filteredTasks.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <CalendarIcon className="mx-auto h-12 w-12 mb-2 opacity-50" />
              <p>No tasks for this date</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Calendar;
