import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckSquare, Mail, Lock, User as UserIcon, Globe } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { User } from '@/lib/types';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language, setLanguage, t } = useLanguage();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Starting auth process:', { isSignUp, email });
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { name } },
        });
        if (error) throw error;
        console.log('Sign-up response:', data);
        if (data.user) {
          const newUser: User = {
            id: data.user.id,
            name,
            email,
            signup_date: new Date().toISOString(),
            preferences: { theme: 'system', notifications: true, emailReminders: true },
          };
          const { error: profileError } = await supabase.from('users').insert(newUser);
          if (profileError) throw profileError;
          toast({ title: t('success'), description: t('accountCreated') });
          await supabase.auth.getSession();
          console.log('Navigating to / after sign-up');
          navigate('/', { replace: true });
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        console.log('Sign-in response:', data);
        await supabase.auth.getSession();
        toast({ title: t('success'), description: t('signedIn') });
        console.log('Navigating to / after sign-in');
        navigate('/', { replace: true });
      }
    } catch (err) {
      console.error('Auth error:', err);
      toast({
        title: t('error'),
        description: (err as Error).message,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-end mb-4">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-40 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
              <Globe className="h-4 w-4 mr-2" />
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

        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
              <CheckSquare className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t('appName')}
            </h1>
          </div>
          <p className="text-muted-foreground">{t('appDescription')}</p>
        </div>

        <Card className="shadow-2xl bg-white/80 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              {isSignUp ? t('createAccount') : t('welcomeBack')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <UserIcon className="h-4 w-4" />
                    {t('fullName')}
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="shadow-lg hover:shadow-xl transition-all duration-300 focus:scale-105"
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {t('email')}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="shadow-lg hover:shadow-xl transition-all duration-300 focus:scale-105"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  {t('password')}
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="shadow-lg hover:shadow-xl transition-all duration-300 focus:scale-105"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                {isSignUp ? t('signUp') : t('signIn')}
              </Button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {isSignUp ? t('alreadyHaveAccount') : t('dontHaveAccount')}
              </p>
              <Button
                variant="ghost"
                onClick={() => setIsSignUp(!isSignUp)}
                className="mt-2 text-blue-600 hover:text-blue-700 transition-colors duration-300"
              >
                {isSignUp ? t('signIn') : t('signUp')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;