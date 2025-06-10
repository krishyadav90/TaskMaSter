import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Circle, Clock, MoreHorizontal, Pause, Play, Trash2, AlertTriangle, GripVertical, Edit, History, Share2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { format, differenceInDays } from 'date-fns';
import { cn } from '@/lib/utils';
import type { Task } from '@/pages/Index';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onPauseTask?: (id: string) => void;
  onDeleteTask?: (id: string) => void;
  onEditTask?: (task: Task) => void;
  onShowHistory?: (task: Task) => void;
  onShareTask?: (task: Task) => void;
  onReorderTasks?: (tasks: Task[]) => void;
  showDate?: boolean;
}

const TaskList = ({ 
  tasks, 
  onToggleTask, 
  onPauseTask, 
  onDeleteTask, 
  onEditTask,
  onShowHistory,
  onShareTask,
  onReorderTasks, 
  showDate = true 
}: TaskListProps) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const getCategoryColor = (category: Task['category']) => {
    switch (category) {
      case 'Study':
        return 'bg-pink-100 text-pink-700 border-pink-200 dark:bg-pink-900 dark:text-pink-300 dark:border-pink-700';
      case 'Work':
        return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700';
      case 'Health':
        return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-700';
      case 'Personal':
        return 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900 dark:text-purple-300 dark:border-purple-700';
      case 'Productive':
        return 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900 dark:text-orange-300 dark:border-orange-700';
      case 'Life':
        return 'bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900 dark:text-indigo-300 dark:border-indigo-700';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600';
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900 dark:text-red-300 dark:border-red-700';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-300 dark:border-yellow-700';
      case 'Low':
        return 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600';
    }
  };

  const getCategoryIcon = (category: Task['category']) => {
    switch (category) {
      case 'Study':
        return '📚';
      case 'Work':
        return '💼';
      case 'Health':
        return '🏃';
      case 'Personal':
        return '✨';
      case 'Productive':
        return '⚡';
      case 'Life':
        return '🏠';
      default:
        return '📝';
    }
  };

  const getDeadlineStatus = (deadline?: Date) => {
    if (!deadline) return null;
    
    const daysUntil = differenceInDays(deadline, new Date());
    
    if (daysUntil < 0) {
      return { text: 'Overdue', color: 'text-red-600 dark:text-red-400', urgent: true };
    } else if (daysUntil === 0) {
      return { text: 'Due Today', color: 'text-orange-600 dark:text-orange-400', urgent: true };
    } else if (daysUntil <= 3) {
      return { text: `${daysUntil} days left`, color: 'text-yellow-600 dark:text-yellow-400', urgent: false };
    } else {
      return { text: `${daysUntil} days left`, color: 'text-gray-600 dark:text-gray-400', urgent: false };
    }
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (draggedIndex === null || !onReorderTasks) return;
    
    const newTasks = [...tasks];
    const [draggedTask] = newTasks.splice(draggedIndex, 1);
    newTasks.splice(dropIndex, 0, draggedTask);
    
    // Update order property
    const reorderedTasks = newTasks.map((task, index) => ({ ...task, order: index }));
    
    onReorderTasks(reorderedTasks);
    setDraggedIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400 animate-fade-in">
        <Clock className="mx-auto h-12 w-12 mb-2 opacity-50" />
        <p>No tasks to show</p>
      </div>
    );
  }

  const sortedTasks = [...tasks].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-3">
      {sortedTasks.map((task, index) => {
        const deadlineStatus = getDeadlineStatus(task.deadline);
        
        return (
          <div
            key={task.id}
            draggable={!!onReorderTasks}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            className={cn(
              "flex items-center gap-3 p-3 md:p-4 rounded-xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border transition-all duration-300 hover:shadow-xl hover:bg-white/80 dark:hover:bg-slate-700/80 hover:scale-[1.02] group animate-fade-in",
              task.completed && "opacity-60",
              task.paused && "bg-yellow-50/60 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700",
              draggedIndex === index && "scale-105 shadow-2xl z-10"
            )}
          >
            {/* Drag Handle */}
            {onReorderTasks && (
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-grab active:cursor-grabbing">
                <GripVertical className="h-4 w-4 text-gray-400 dark:text-gray-500" />
              </div>
            )}

            {/* Completion Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onToggleTask(task.id)}
              className="h-6 w-6 p-0 hover:bg-transparent hover:scale-110 transition-all duration-300"
            >
              {task.completed ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                <Circle className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
              )}
            </Button>

            {/* Category Icon */}
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-orange-100 to-pink-100 dark:from-orange-900 dark:to-pink-900 flex items-center justify-center text-lg shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110">
              {getCategoryIcon(task.category)}
            </div>

            {/* Task Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h4 className={cn(
                  "font-semibold text-gray-800 dark:text-gray-200 truncate transition-all duration-300",
                  task.completed && "line-through text-gray-500 dark:text-gray-400",
                  task.paused && "text-yellow-700 dark:text-yellow-300"
                )}>
                  {task.name}
                </h4>
                <Badge 
                  variant="outline" 
                  className={cn("text-xs shadow-sm", getCategoryColor(task.category))}
                >
                  {task.category}
                </Badge>
                <Badge 
                  variant="outline" 
                  className={cn("text-xs shadow-sm", getPriorityColor(task.priority))}
                >
                  {task.priority}
                </Badge>
                {task.paused && (
                  <Badge variant="outline" className="text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700">
                    Paused
                  </Badge>
                )}
                {deadlineStatus && deadlineStatus.urgent && (
                  <Badge variant="outline" className={cn("text-xs flex items-center gap-1", deadlineStatus.color)}>
                    <AlertTriangle className="h-3 w-3" />
                    {deadlineStatus.text}
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 flex-wrap">
                {showDate && (
                  <span>{format(task.date, 'MMM dd')}</span>
                )}
                <span>{task.startTime} - {task.endTime}</span>
                {deadlineStatus && !deadlineStatus.urgent && (
                  <span className={deadlineStatus.color}>• {deadlineStatus.text}</span>
                )}
                {task.reminder && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                )}
              </div>
            </div>

            {/* Action Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44 shadow-xl border-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg">
                {onEditTask && (
                  <DropdownMenuItem
                    onClick={() => onEditTask(task)}
                    className="flex items-center gap-2 hover:bg-white/80 dark:hover:bg-slate-700/80 transition-all duration-300"
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                )}
                {onShowHistory && (
                  <DropdownMenuItem
                    onClick={() => onShowHistory(task)}
                    className="flex items-center gap-2 hover:bg-white/80 dark:hover:bg-slate-700/80 transition-all duration-300"
                  >
                    <History className="h-4 w-4" />
                    History
                  </DropdownMenuItem>
                )}
                {onShareTask && (
                  <DropdownMenuItem
                    onClick={() => onShareTask(task)}
                    className="flex items-center gap-2 hover:bg-white/80 dark:hover:bg-slate-700/80 transition-all duration-300"
                  >
                    <Share2 className="h-4 w-4" />
                    Share
                  </DropdownMenuItem>
                )}
                {onPauseTask && (
                  <DropdownMenuItem
                    onClick={() => onPauseTask(task.id)}
                    className="flex items-center gap-2 hover:bg-white/80 dark:hover:bg-slate-700/80 transition-all duration-300"
                  >
                    {task.paused ? (
                      <Play className="h-4 w-4" />
                    ) : (
                      <Pause className="h-4 w-4" />
                    )}
                    {task.paused ? 'Resume' : 'Pause'}
                  </DropdownMenuItem>
                )}
                {onDeleteTask && (
                  <DropdownMenuItem
                    onClick={() => onDeleteTask(task.id)}
                    className="flex items-center gap-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      })}
    </div>
  );
};

export default TaskList;
