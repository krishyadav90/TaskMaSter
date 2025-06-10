
import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Settings, Bell, CheckCircle, Sun, Moon, Globe, Upload, Link } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useTheme } from '@/components/ThemeProvider';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Task } from '@/pages/Index';

interface ProfileProps {
  user: {
    id: string;
    name: string;
    email: string;
    signupDate: Date;
    avatar?: string;
    preferences: {
      theme: 'light' | 'dark' | 'system';
      notifications: boolean;
      emailReminders: boolean;
    };
  } | null;
  tasks: Task[];
  notifications: string[];
  onUpdateProfile: (updatedUser: any) => void;
  onClearNotifications: () => void;
  onImportTask?: (task: Task) => void;
}

const Profile = ({ user, tasks, notifications, onUpdateProfile, onClearNotifications, onImportTask }: ProfileProps) => {
  const { language, setLanguage, t } = useLanguage();
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [shareLink, setShareLink] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(user?.preferences.notifications || false);
  const [emailRemindersEnabled, setEmailRemindersEnabled] = useState(user?.preferences.emailReminders || false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' }
  ];

  const handleUpdateProfile = () => {
    if (!user) return;

    const updatedUser = {
      ...user,
      name,
      email,
      avatar,
      preferences: {
        theme: theme as 'light' | 'dark' | 'system',
        notifications: notificationsEnabled,
        emailReminders: emailRemindersEnabled,
      }
    };
    onUpdateProfile(updatedUser);
    toast({
      title: t('profileUpdated'),
      description: t('profileUpdated'),
    })
  };

  const handleClearNotifications = () => {
    onClearNotifications();
    toast({
      title: t('notifications'),
      description: "Notifications cleared",
    })
  };

  const handleProfilePictureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setAvatar(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImportSharedTask = () => {
    if (!shareLink.trim()) {
      toast({
        title: t('invalidLink'),
        description: t('invalidLink'),
        variant: "destructive",
      });
      return;
    }

    // Extract task ID from share link
    const taskId = shareLink.split('/').pop();
    if (!taskId) {
      toast({
        title: t('invalidLink'),
        description: t('invalidLink'),
        variant: "destructive",
      });
      return;
    }

    // Create a mock task from the shared link (in real app, this would fetch from API)
    const importedTask: Task = {
      id: Date.now().toString(),
      name: `Shared Task ${taskId.substring(0, 8)}`,
      date: new Date(),
      startTime: '09:00',
      endTime: '10:00',
      category: 'Work',
      completed: false,
      paused: false,
      reminder: true,
      priority: 'Medium',
      order: tasks.length
    };

    if (onImportTask) {
      onImportTask(importedTask);
    }
    
    setShareLink('');
    toast({
      title: t('taskImported'),
      description: t('taskImported'),
    });
  };

  return (
    <div className="flex-1 p-4 md:p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('profile')}</h1>
          <p className="text-muted-foreground">Manage your profile settings and preferences.</p>
        </div>
      </div>

      {/* Profile Card */}
      <Card className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
        <CardHeader>
          <CardTitle>{t('profileInformation')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={avatar} />
                <AvatarFallback className="text-2xl">{user?.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {t('uploadPicture')}
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureUpload}
                  className="hidden"
                />
              </div>
            </div>
            <div className="flex-1 space-y-4 w-full">
              <div>
                <p className="text-lg font-semibold">{user?.name}</p>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
                <p className="text-sm text-muted-foreground">Joined {user?.signupDate.toLocaleDateString()}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('name')}</Label>
                  <Input
                    id="name"
                    placeholder={t('name')}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t('email')}</Label>
                  <Input
                    id="email"
                    placeholder={t('email')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <Button onClick={handleUpdateProfile} className="w-full md:w-auto">
                {t('updateProfile')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Import Shared Task */}
      <Card className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link className="h-5 w-5" />
            {t('importTask')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder={t('pasteShareLink')}
              value={shareLink}
              onChange={(e) => setShareLink(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleImportSharedTask} className="w-full md:w-auto">
              {t('addSharedTask')}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Settings */}
        <Card className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              {t('settings')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Language Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Globe className="h-4 w-4" />
                {t('language')}
              </Label>
              <div className="grid grid-cols-1 gap-2">
                {languages.map((lang) => (
                  <Button
                    key={lang.code}
                    variant={language === lang.code ? "default" : "outline"}
                    className="justify-start h-auto p-3 hover:scale-105 transition-all duration-300"
                    onClick={() => setLanguage(lang.code)}
                  >
                    <span className="mr-2 text-lg">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Theme Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">{t('theme')}</Label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={theme === "light" ? "default" : "outline"}
                  onClick={() => setTheme("light")}
                  className="flex flex-col p-3 h-auto"
                >
                  <Sun className="h-4 w-4 mb-1" />
                  {t('light')}
                </Button>
                <Button
                  variant={theme === "dark" ? "default" : "outline"}
                  onClick={() => setTheme("dark")}
                  className="flex flex-col p-3 h-auto"
                >
                  <Moon className="h-4 w-4 mb-1" />
                  {t('dark')}
                </Button>
                <Button
                  variant={theme === "system" ? "default" : "outline"}
                  onClick={() => setTheme("system")}
                  className="flex flex-col p-3 h-auto text-xs"
                >
                  {t('system')}
                </Button>
              </div>
            </div>

            {/* Notification Preferences */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">{t('notifications')}</Label>
              <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">{t('notifications')}</p>
                  <p className="text-xs text-muted-foreground">Get notified on new tasks and updates.</p>
                </div>
                <Switch id="notifications" checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">{t('emailReminders')}</p>
                  <p className="text-xs text-muted-foreground">Receive daily task reminders via email.</p>
                </div>
                <Switch id="email-reminders" checked={emailRemindersEnabled} onCheckedChange={setEmailRemindersEnabled} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              {t('notifications')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ScrollArea className="h-[200px] w-full rounded-md border">
              <div className="p-3">
                {notifications.length > 0 ? (
                  notifications.map((notification, index) => (
                    <div key={index} className="mb-2 flex items-center justify-between">
                      <p className="text-sm">{notification}</p>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                  ))
                ) : (
                  <div className="text-center text-muted-foreground">
                    No notifications yet.
                  </div>
                )}
              </div>
            </ScrollArea>
            <Button variant="secondary" onClick={handleClearNotifications}>Clear Notifications</Button>
          </CardContent>
        </Card>
      </div>

      {/* Task Stats */}
      <Card className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
        <CardHeader>
          <CardTitle>{t('totalTasks')} Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{t('totalTasks')}</p>
              <p className="text-2xl font-bold">{tasks.length}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{t('completed')}</p>
              <p className="text-2xl font-bold">{tasks.filter(task => task.completed).length}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{t('remaining')}</p>
              <p className="text-2xl font-bold">{tasks.filter(task => !task.completed).length}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
