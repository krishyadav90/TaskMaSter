
import { Button } from '@/components/ui/button';
import { Plus, Grid3X3, BarChart3, Clock, CheckSquare, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationBarProps {
  currentView: 'dashboard' | 'analytics';
  onViewChange: (view: 'dashboard' | 'analytics') => void;
  onAddTask: () => void;
}

const NavigationBar = ({ currentView, onViewChange, onAddTask }: NavigationBarProps) => {
  const navItems = [
    { id: 'dashboard', icon: Grid3X3, label: 'Dashboard' },
    { id: 'tasks', icon: CheckSquare, label: 'Tasks' },
    { id: 'add', icon: Plus, label: 'Add', isAction: true },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-2">
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            if (item.isAction) {
              return (
                <Button
                  key={item.id}
                  onClick={onAddTask}
                  className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  <item.icon className="h-5 w-5" />
                </Button>
              );
            }

            const isActive = item.id === currentView;
            
            return (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => {
                  if (item.id === 'dashboard' || item.id === 'analytics') {
                    onViewChange(item.id);
                  }
                }}
                className={cn(
                  "w-12 h-12 rounded-xl transition-all duration-200",
                  isActive 
                    ? "bg-blue-100 text-blue-600 shadow-sm" 
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                )}
              >
                <item.icon className="h-5 w-5" />
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
