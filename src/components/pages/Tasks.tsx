import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { 
  Search, 
  Filter, 
  CheckSquare,
  Clock,
  ArrowUpDown
} from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import TaskList from '@/components/TaskList';
import type { Task } from '@/lib/types';
import { useLanguage } from '@/contexts/LanguageContext';

interface TasksProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onPauseTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (task: Task) => void;
  onShowHistory: (task: Task) => void;
  onShareTask: (task: Task) => void;
  onReorderTasks: (tasks: Task[]) => void;
}

const Tasks = ({ 
  tasks, 
  onToggleTask, 
  onPauseTask, 
  onDeleteTask, 
  onEditTask,
  onShowHistory,
  onShareTask,
  onReorderTasks 
}: TasksProps) => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || task.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesStatus = selectedStatus === 'all' || 
      (selectedStatus === 'completed' && task.completed) ||
      (selectedStatus === 'pending' && !task.completed);
    const matchesPriority = selectedPriority === 'all' || task.priority.toLowerCase() === selectedPriority.toLowerCase();
    
    return matchesSearch && matchesCategory && matchesStatus && matchesPriority;
  });

  const categories = [t('all'), t('study'), t('work'), t('health'), t('personal'), t('productive'), t('life')];
  const statuses = [
    { value: 'all', label: t('all') },
    { value: 'completed', label: t('completed') },
    { value: 'pending', label: t('pending') }
  ];
  const priorities = [
    { value: 'all', label: t('all') },
    { value: 'high', label: t('high') },
    { value: 'medium', label: t('medium') },
    { value: 'low', label: t('low') }
  ];

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  const handleReorder = (reorderedTasks: Task[]) => {
    // Map filtered tasks' order to the original tasks array
    const taskMap = new Map(tasks.map(task => [task.id, task]));
    const updatedTasks = reorderedTasks
      .map(task => taskMap.get(task.id))
      .filter((task): task is Task => !!task)
      .map((task, index) => ({ ...task, task_order: index }));
    
    onReorderTasks(updatedTasks);
  };

  return (
    <div className="flex-1 p-4 md:p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="md:hidden" aria-label={t('toggleSidebar')} />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">{t('tasks')}</h1>
            <p className="text-muted-foreground">{t('manageTasks')}</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <Card className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{t('totalTasks')}</p>
                <p className="text-xl md:text-2xl font-bold">{totalTasks}</p>
              </div>
              <CheckSquare className="h-6 w-6 md:h-8 md:w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{t('completed')}</p>
                <p className="text-xl md:text-2xl font-bold text-green-600">{completedTasks}</p>
              </div>
              <CheckSquare className="h-6 w-6 md:h-8 md:w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02] sm:col-span-2 lg:col-span-1">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{t('remaining')}</p>
                <p className="text-xl md:text-2xl font-bold text-orange-600">{totalTasks - completedTasks}</p>
              </div>
              <Clock className="h-6 w-6 md:h-8 md:w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            {t('filtersSearch')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('searchTasks')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 hover:shadow-lg transition-all duration-300 focus:scale-[1.02]"
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === (category === t('all') ? 'all' : category.toLowerCase()) ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category === t('all') ? 'all' : category.toLowerCase())}
                  className="capitalize hover:scale-105 transition-all duration-300"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium text-muted-foreground mb-1 block">{t('status')}</label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full hover:shadow-lg transition-all duration-300">
                  <SelectValue placeholder={t('status')} />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1">
              <label className="text-sm font-medium text-muted-foreground mb-1 block">{t('priority')}</label>
              <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                <SelectTrigger className="w-full hover:shadow-lg transition-all duration-300">
                  <SelectValue placeholder={t('priority')} />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map((priority) => (
                    <SelectItem key={priority.value} value={priority.value}>
                      {priority.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tasks List */}
      <Card className="hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{t('allTasks')} ({filteredTasks.length})</span>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ArrowUpDown className="h-4 w-4" />
              <span className="hidden sm:inline">{t('dragToReorder')}</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TaskList 
            tasks={filteredTasks} 
            onToggleTask={onToggleTask}
            onPauseTask={onPauseTask}
            onDeleteTask={onDeleteTask}
            onEditTask={onEditTask}
            onShowHistory={onShowHistory}
            onShareTask={onShareTask}
            onReorderTasks={handleReorder}
            showDate={true}
          />
          {filteredTasks.length === 0 && (
            <div className="text-center py-12 text-muted-foreground animate-fade-in">
              <CheckSquare className="mx-auto h-12 w-12 mb-4 opacity-50" />
              <p className="text-lg font-medium">{t('noTasksFound')}</p>
              <p className="text-sm">{t('adjustFilters')}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Tasks;
