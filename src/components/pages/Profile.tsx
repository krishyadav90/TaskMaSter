import { useState, useRef, useCallback, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Settings, Bell, CheckCircle, Sun, Moon, Globe, Upload, Link } from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTheme } from '@/components/ThemeProvider';
import { useLanguage } from '@/contexts/LanguageContext';
import { User, Task } from '@/lib/types';
import { supabase } from '@/lib/supabaseClient';

interface Notification {
  id: string;
  message: string;
  timestamp: string;
}

interface ProfileProps {
  user: User | null;
  tasks: Task[];
  notifications: Notification[];
  onUpdateProfile: (updatedUser: User) => void;
  onClearNotifications: () => void;
  onImportTask?: (task: Task) => void;
}

const Profile = ({ user, tasks, notifications, onUpdateProfile, onClearNotifications, onImportTask }: ProfileProps) => {
  const { language, setLanguage, t } = useLanguage();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [shareLink, setShareLink] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(user?.preferences.notifications || false);
  const [emailRemindersEnabled, setEmailRemindersEnabled] = useState(user?.preferences.emailReminders || false);

  // Deduplicate notifications by id
  const uniqueNotifications = Array.from(new Map(notifications.map(n => [n.id, n])).values());

  const languages = [
    { value: 'en', label: 'English', flag: '🇺🇸' },
    { value: 'hi', label: 'हिंदी', flag: '🇮🇳' },
    { value: 'ru', label: 'Русский', flag: '🇷🇺' },
    { value: 'zh', label: '中文', flag: '🇨🇳' },
    { value: 'es', label: 'Español', flag: '🇪🇸' },
    { value: 'fr', label: 'Français', flag: '🇫🇷' },
    { value: 'pt', label: 'Português', flag: '🇵🇹' },
    { value: 'ur', label: 'اردو', flag: '🇵🇰' },
    { value: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { value: 'ja', label: '日本語', flag: '🇯🇵' },
    { value: 'id', label: 'Bahasa Indonesia', flag: '🇮🇩' },
    { value: 'ko', label: '한국어', flag: '🇰🇷' },
  ];

  // Sync avatar state with user prop only if different
  useEffect(() => {
    if (user?.avatar && user.avatar !== avatar) {
      setAvatar(user.avatar);
    }
  }, [user?.avatar]);

  const updateNotificationPreference = useCallback(async (enabled: boolean) => {
    if (!user) {
      toast({
        title: t('error'),
        description: t('loginRequired'),
        variant: 'destructive',
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('users')
        .update({
          preferences: {
            ...user.preferences,
            notifications: enabled,
          },
        })
        .eq('id', user.id);

      if (error) throw error;

      setNotificationsEnabled(enabled);
      onUpdateProfile({
        ...user,
        preferences: {
          ...user.preferences,
          notifications: enabled,
        },
      });

      toast({
        title: t('success'),
        description: enabled ? t('notificationsEnabled') : t('notificationsDisabled'),
      });
    } catch (error: any) {
      console.error('Error updating notification preference:', {
        message: error.message,
        details: error,
      });
      toast({
        title: t('error'),
        description: t('failedToUpdateNotifications'),
        variant: 'destructive',
      });
    }
  }, [user, onUpdateProfile, t, toast]);

  const handleProfilePictureUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      toast({
        title: t('error'),
        description: t('noFileSelected'),
        variant: 'destructive',
      });
      return;
    }

    if (!user) {
      toast({
        title: t('error'),
        description: t('loginRequired'),
        variant: 'destructive',
      });
      return;
    }

    // Validate file type and size
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (!validTypes.includes(file.type)) {
      toast({
        title: t('error'),
        description: t('invalidFileType'),
        variant: 'destructive',
      });
      return;
    }
    if (file.size > maxSize) {
      toast({
        title: t('error'),
        description: t('fileTooLarge'),
        variant: 'destructive',
      });
      return;
    }

    // Verify session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session) {
      console.error('Session validation failed:', {
        message: sessionError?.message,
        details: sessionError,
      });
      toast({
        title: t('error'),
        description: t('sessionExpired'),
        variant: 'destructive',
      });
      return;
    }

    try {
      // Generate a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      const filePath = fileName;

      console.log('Uploading file to:', filePath);

      // Clean up existing avatar files for the user
      const { data: existingFiles, error: listError } = await supabase.storage
        .from('avatars')
        .list(`${user.id}/`);
      if (listError) {
        console.error('Error listing existing files:', {
          message: listError.message,
          details: listError,
        });
      } else if (existingFiles) {
        const deletePromises = existingFiles.map(file =>
          supabase.storage.from('avatars').remove([`${user.id}/${file.name}`])
        );
        await Promise.all(deletePromises);
        console.log('Cleaned up existing avatars');
      }

      // Upload file to Supabase storage with retry
      let uploadError: any = null;
      let uploadData: any = null;
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          const { error, data } = await supabase.storage
            .from('avatars')
            .upload(filePath, file, { upsert: true });
          if (error) throw error;
          uploadData = data;
          uploadError = null;
          break;
        } catch (err) {
          console.warn(`Upload attempt ${attempt} failed:`, {
            message: err.message,
            details: err,
          });
          uploadError = err;
          if (attempt < 3) {
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
          }
        }
      }

      if (uploadError) {
        console.error('Upload error after retries:', {
          message: uploadError.message,
          details: uploadError,
        });
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      console.log('Upload successful:', uploadData);

      // Get public URL for the uploaded file
      const { data: publicUrlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      if (!publicUrlData?.publicUrl) {
        console.error('Failed to get public URL');
        throw new Error('Failed to get public URL');
      }

      const newAvatarUrl = publicUrlData.publicUrl;
      console.log('Public URL:', newAvatarUrl);

      // Update user profile with new avatar URL
      const { error: updateError } = await supabase
        .from('users')
        .update({ avatar: newAvatarUrl })
        .eq('id', user.id);

      if (updateError) {
        console.error('Update error:', {
          message: updateError.message,
          details: updateError,
        });
        throw new Error(`Database update failed: ${updateError.message}`);
      }

      setAvatar(newAvatarUrl);
      onUpdateProfile({
        ...user,
        avatar: newAvatarUrl,
      });

      toast({
        title: t('success'),
        description: t('profilePictureUpdated'),
      });
    } catch (error: any) {
      console.error('Error uploading profile picture:', {
        message: error.message,
        stack: error.stack,
        details: error,
      });
      toast({
        title: t('error'),
        description: t('failedToUpdateProfilePicture'),
        variant: 'destructive',
      });
    }
  };

  const handleUpdateProfile = async () => {
    if (!user) {
      toast({
        title: t('error'),
        description: t('loginRequired'),
        variant: 'destructive',
      });
      return;
    }

    const updatedUser: User = {
      ...user,
      name,
      email,
      avatar,
      signup_date: user.signup_date,
      preferences: {
        theme: theme || 'system',
        notifications: notificationsEnabled,
        emailReminders: emailRemindersEnabled,
      },
    };

    try {
      const { error } = await supabase
        .from('users')
        .update({
          name: updatedUser.name,
          email: updatedUser.email,
          preferences: updatedUser.preferences,
        })
        .eq('id', user.id);

      if (error) throw error;

      onUpdateProfile(updatedUser);
      toast({
        title: t('profileUpdated'),
        description: t('profileUpdated'),
      });
    } catch (error: any) {
      console.error('Error updating profile:', {
        message: error.message,
        details: error,
      });
      toast({
        title: t('error'),
        description: t('failedToUpdateProfile'),
        variant: 'destructive',
      });
    }
  };

  const handleClearNotifications = () => {
    onClearNotifications();
    toast({
      title: t('notifications'),
      description: t('notificationsCleared'),
    });
  };

  const handleImportSharedTask = () => {
    if (!shareLink.trim()) {
      toast({
        title: t('invalidLink'),
        description: t('invalidLink'),
        variant: 'destructive',
      });
      return;
    }

    const taskId = shareLink.split('/').pop();
    if (!taskId) {
      toast({
        title: t('invalidLink'),
        description: t('invalidLink'),
        variant: 'destructive',
      });
      return;
    }

    const importedTask: Task = {
      id: Date.now().toString(),
      user_id: user?.id || '',
      name: `Shared Task ${taskId.substring(0, 8)}`,
      date: new Date().toISOString(),
      start_time: '09:00',
      end_time: '10:00',
      category: 'Work',
      completed: false,
      paused: false,
      reminder: true,
      priority: 'Medium',
      task_order: tasks.length,
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

  if (!user) {
    return null; // Prevent rendering if user is not loaded
  }

  return (
    <div className="flex-1 p-4 md:p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('profile')}</h1>
          <p className="text-muted-foreground">{t('manageProfile')}</p>
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
                <p className="text-sm text-muted-foreground">
                  {t('joined')} {user?.signup_date ? new Date(user.signup_date).toLocaleDateString() : 'N/A'}
                </p>
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
      <Card className="space-y-4">
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
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-full hover:shadow-lg transition-all duration-300">
                  <SelectValue placeholder={t('language')} />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      <span className="flex items-center gap-2">
                        <span className="text-lg">{lang.flag}</span>
                        {lang.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Theme Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">{t('theme')}</Label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={theme === 'light' ? 'default' : 'outline'}
                  onClick={() => setTheme('light')}
                  className="flex flex-col p-3 h-auto"
                >
                  <Sun className="h-4 w-4 mb-1" />
                  {t('light')}
                </Button>
                <Button
                  variant={theme === 'dark' ? 'default' : 'outline'}
                  onClick={() => setTheme('dark')}
                  className="flex flex-col p-3 h-auto"
                >
                  <Moon className="h-4 w-4 mb-1" />
                  {t('dark')}
                </Button>
                <Button
                  variant={theme === 'system' ? 'default' : 'outline'}
                  onClick={() => setTheme('system')}
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
                  <p className="text-xs text-muted-foreground">{t('notificationDesc')}</p>
                </div>
                <Switch
                  id="notifications"
                  checked={notificationsEnabled}
                  onCheckedChange={updateNotificationPreference}
                />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">{t('emailReminders')}</p>
                  <p className="text-xs text-muted-foreground">{t('emailReminderDesc')}</p>
                </div>
                <Switch
                  id="email-reminders"
                  checked={emailRemindersEnabled}
                  onCheckedChange={setEmailRemindersEnabled}
                />
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
            <ScrollArea className="h-[200px] W-full rounded-md border">
              <div className="p-3">
                {uniqueNotifications.length > 0 ? (
                  uniqueNotifications.map((notification) => (
                    <div key={notification.id} className="mb-2 flex items-center justify-between">
                      <div className="flex flex-col">
                        <p className="text-sm">{notification.message}</p>
                        <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
                      </div>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                  ))
                ) : (
                  <div className="text-center text-muted-foreground">{t('noNotifications')}</div>
                )}
              </div>
            </ScrollArea>
            <Button variant="secondary" onClick={handleClearNotifications}>
              {t('clearNotifications')}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Task Stats */}
      <Card className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
        <CardHeader>
          <CardTitle>{t('totalTasks')} {t('overview')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{t('totalTasks')}</p>
              <p className="text-2xl font-bold">{tasks.length}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{t('completed')}</p>
              <p className="text-2xl font-bold">{tasks.filter((task) => task.completed).length}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{t('remaining')}</p>
              <p className="text-2xl font-bold">{tasks.filter((task) => !task.completed).length}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;