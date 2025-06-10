
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, History, RotateCcw } from 'lucide-react';
import { format } from 'date-fns';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Task } from '@/pages/Index';

interface TaskVersion {
  id: string;
  task: Task;
  timestamp: Date;
  action: 'created' | 'updated' | 'completed' | 'paused';
}

interface TaskHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  onRestoreVersion: (task: Task) => void;
}

const TaskHistoryModal = ({ isOpen, onClose, task, onRestoreVersion }: TaskHistoryModalProps) => {
  const { t } = useLanguage();
  
  // Mock task history - in a real app, this would come from your data store
  const [taskHistory] = useState<TaskVersion[]>(() => {
    if (!task) return [];
    
    return [
      {
        id: '1',
        task: { ...task, name: task.name + ' (Original)' },
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        action: 'created'
      },
      {
        id: '2',
        task: { ...task, priority: 'Medium' },
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
        action: 'updated'
      },
      {
        id: '3',
        task: { ...task },
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        action: 'updated'
      }
    ];
  });

  const getActionColor = (action: string) => {
    switch (action) {
      case 'created':
        return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-300';
      case 'updated':
        return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900 dark:text-blue-300';
      case 'completed':
        return 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900 dark:text-purple-300';
      case 'paused':
        return 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900 dark:text-orange-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  if (!task) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-w-[95vw] max-h-[95vh] overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 border-0 shadow-2xl backdrop-blur-lg animate-scale-in">
        <DialogHeader className="flex flex-row items-center gap-3 space-y-0 pb-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="h-8 w-8 hover:scale-110 transition-transform duration-300"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-blue-600" />
            <div>
              <DialogTitle className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200">{t('taskHistory')}</DialogTitle>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400">{task.name}</p>
            </div>
          </div>
        </DialogHeader>

        <div className="max-h-[60vh] overflow-y-auto space-y-4 pr-2">
          {taskHistory.map((version) => (
            <Card key={version.id} className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getActionColor(version.action)}`}
                      >
                        {version.action}
                      </Badge>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {format(version.timestamp, 'MMM dd, yyyy - HH:mm')}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                        {version.task.name}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 flex-wrap">
                        <span>{format(version.task.date, 'MMM dd')}</span>
                        <span>•</span>
                        <span>{version.task.startTime} - {version.task.endTime}</span>
                        <span>•</span>
                        <Badge variant="outline" className="text-xs">
                          {version.task.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {version.task.priority}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onRestoreVersion(version.task)}
                    className="hover:scale-105 transition-all duration-300 bg-white/70 dark:bg-slate-600/70"
                  >
                    <RotateCcw className="h-4 w-4 mr-1" />
                    {t('restore')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {taskHistory.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <History className="mx-auto h-12 w-12 mb-2 opacity-50" />
              <p>No history available for this task</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskHistoryModal;
