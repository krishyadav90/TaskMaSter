
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, Clock, ArrowLeft, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Task } from '@/pages/Index';

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateTask: (task: Task) => void;
  task: Task | null;
}

const EditTaskModal = ({ isOpen, onClose, onUpdateTask, task }: EditTaskModalProps) => {
  const { t } = useLanguage();
  const [taskName, setTaskName] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('09:00');
  const [reminder, setReminder] = useState(false);
  const [category, setCategory] = useState<'Study' | 'Productive' | 'Life' | 'Work' | 'Health' | 'Personal'>('Study');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [deadline, setDeadline] = useState<Date | undefined>(undefined);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isDeadlinePickerOpen, setIsDeadlinePickerOpen] = useState(false);

  useEffect(() => {
    if (task) {
      setTaskName(task.name);
      setSelectedDate(task.date);
      setStartTime(task.startTime);
      setEndTime(task.endTime);
      setReminder(task.reminder);
      setCategory(task.category);
      setPriority(task.priority);
      setDeadline(task.deadline);
    }
  }, [task]);

  const categories: Array<{value: 'Study' | 'Productive' | 'Life' | 'Work' | 'Health' | 'Personal', label: string, color: string, icon: string}> = [
    { value: 'Study', label: 'Study', color: 'bg-pink-500 hover:bg-pink-600', icon: '📚' },
    { value: 'Work', label: 'Work', color: 'bg-blue-500 hover:bg-blue-600', icon: '💼' },
    { value: 'Health', label: 'Health', color: 'bg-green-500 hover:bg-green-600', icon: '🏃' },
    { value: 'Personal', label: 'Personal', color: 'bg-purple-500 hover:bg-purple-600', icon: '✨' },
    { value: 'Productive', label: 'Productive', color: 'bg-orange-500 hover:bg-orange-600', icon: '⚡' },
    { value: 'Life', label: 'Life', color: 'bg-indigo-500 hover:bg-indigo-600', icon: '🏠' }
  ];

  const priorities: Array<{value: 'Low' | 'Medium' | 'High', label: string, color: string, icon: string}> = [
    { value: 'Low', label: 'Low', color: 'bg-gray-500 hover:bg-gray-600', icon: '⬇️' },
    { value: 'Medium', label: 'Medium', color: 'bg-yellow-500 hover:bg-yellow-600', icon: '➡️' },
    { value: 'High', label: 'High', color: 'bg-red-500 hover:bg-red-600', icon: '⬆️' }
  ];

  const handleSubmit = () => {
    if (!taskName.trim() || !task) return;

    const updatedTask: Task = {
      ...task,
      name: taskName,
      date: selectedDate,
      startTime,
      endTime,
      category,
      priority,
      deadline,
      reminder
    };

    onUpdateTask(updatedTask);
    onClose();
  };

  if (!task) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-w-[95vw] max-h-[95vh] overflow-y-auto bg-gradient-to-br from-orange-50 to-pink-50 dark:from-slate-800 dark:to-slate-700 border-0 shadow-2xl backdrop-blur-lg animate-scale-in">
        <DialogHeader className="flex flex-row items-center gap-3 space-y-0 pb-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="h-8 w-8 hover:scale-110 transition-transform duration-300"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <DialogTitle className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200">{t('edit')}</DialogTitle>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400">{t('editTask')}</p>
          </div>
        </DialogHeader>

        <div className="space-y-4 md:space-y-6 pb-6">
          {/* Task Name */}
          <div className="space-y-2">
            <Label htmlFor="taskName" className="text-sm text-gray-500 dark:text-gray-400">{t('taskName')}</Label>
            <Input
              id="taskName"
              placeholder={t('taskName')}
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="bg-white/70 dark:bg-slate-600/70 border-0 rounded-xl h-10 md:h-12 text-base md:text-lg placeholder:text-gray-400 shadow-lg hover:shadow-xl transition-all duration-300 focus:scale-105"
            />
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label className="text-sm text-gray-500 dark:text-gray-400">{t('date')}</Label>
            <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-white/70 dark:bg-slate-600/70 border-0 rounded-xl h-10 md:h-12 text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <CalendarIcon className="mr-2 md:mr-3 h-4 md:h-5 w-4 md:w-5" />
                  {format(selectedDate, 'EEEE dd, MMMM')}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 shadow-2xl border-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    if (date) {
                      setSelectedDate(date);
                      setIsDatePickerOpen(false);
                    }
                  }}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Time */}
          <div className="space-y-2">
            <Label className="text-sm text-gray-500 dark:text-gray-400">{t('startingTime')}</Label>
            <div className="flex items-center gap-2 md:gap-3">
              <div className="flex-1 relative">
                <Input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="bg-white/70 dark:bg-slate-600/70 border-0 rounded-xl h-10 md:h-12 text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 focus:scale-105"
                />
              </div>
              <span className="text-gray-400 text-sm md:text-base">-</span>
              <div className="flex-1">
                <Input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="bg-white/70 dark:bg-slate-600/70 border-0 rounded-xl h-10 md:h-12 text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 focus:scale-105"
                />
              </div>
              <Clock className="h-4 md:h-5 w-4 md:w-5 text-gray-400" />
            </div>
          </div>

          {/* Priority */}
          <div className="space-y-3">
            <Label className="text-sm text-gray-500 dark:text-gray-400">{t('priorityLevel')}</Label>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {priorities.map((prio) => (
                <Badge
                  key={prio.value}
                  variant={priority === prio.value ? "default" : "outline"}
                  className={cn(
                    "px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105",
                    priority === prio.value
                      ? `${prio.color} text-white`
                      : "bg-white/70 dark:bg-slate-600/70 text-gray-600 dark:text-gray-300 hover:bg-white/90 dark:hover:bg-slate-500/90"
                  )}
                  onClick={() => setPriority(prio.value)}
                >
                  <span className="mr-1 md:mr-2">{prio.icon}</span>
                  {prio.label}
                </Badge>
              ))}
            </div>
          </div>

          {/* Deadline */}
          <div className="space-y-2">
            <Label className="text-sm text-gray-500 dark:text-gray-400">{t('deadline')} (Optional)</Label>
            <Popover open={isDeadlinePickerOpen} onOpenChange={setIsDeadlinePickerOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-white/70 dark:bg-slate-600/70 border-0 rounded-xl h-10 md:h-12 text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <AlertTriangle className="mr-2 md:mr-3 h-4 md:h-5 w-4 md:w-5" />
                  {deadline ? format(deadline, 'EEEE dd, MMMM') : 'No deadline'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 shadow-2xl border-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg" align="start">
                <div className="p-3">
                  <Calendar
                    mode="single"
                    selected={deadline}
                    onSelect={(date) => {
                      setDeadline(date);
                      setIsDeadlinePickerOpen(false);
                    }}
                    initialFocus
                    className={cn("pointer-events-auto")}
                  />
                  {deadline && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setDeadline(undefined);
                        setIsDeadlinePickerOpen(false);
                      }}
                      className="w-full mt-2"
                    >
                      Clear Deadline
                    </Button>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Reminder */}
          <div className="flex items-center justify-between py-2 px-3 md:px-4 bg-white/50 dark:bg-slate-600/50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="p-1.5 md:p-2 bg-blue-100 dark:bg-blue-900 rounded-lg shadow-lg">
                <div className="w-3 md:w-4 h-3 md:h-4 bg-blue-500 rounded-full"></div>
              </div>
              <span className="text-base md:text-lg text-gray-700 dark:text-gray-300">{t('remindMe')}</span>
            </div>
            <Switch
              checked={reminder}
              onCheckedChange={setReminder}
              className="data-[state=checked]:bg-blue-500 shadow-lg"
            />
          </div>

          {/* Category */}
          <div className="space-y-3">
            <Label className="text-sm text-gray-500 dark:text-gray-400">{t('category')}</Label>
            <div className="grid grid-cols-2 gap-2 md:gap-3">
              {categories.map((cat) => (
                <Badge
                  key={cat.value}
                  variant={category === cat.value ? "default" : "outline"}
                  className={cn(
                    "px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 justify-center",
                    category === cat.value
                      ? `${cat.color} text-white`
                      : "bg-white/70 dark:bg-slate-600/70 text-gray-600 dark:text-gray-300 hover:bg-white/90 dark:hover:bg-slate-500/90"
                  )}
                  onClick={() => setCategory(cat.value)}
                >
                  <span className="mr-1 md:mr-2">{cat.icon}</span>
                  {cat.label}
                </Badge>
              ))}
            </div>
          </div>

          {/* Update Button */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
            <Button
              onClick={handleSubmit}
              disabled={!taskName.trim()}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white h-12 md:h-14 text-base md:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ✨ {t('save').toUpperCase()} {t('editTask').toUpperCase()}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskModal;
