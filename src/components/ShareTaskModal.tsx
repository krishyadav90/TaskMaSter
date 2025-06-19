
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Share2, Copy, Mail, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import type { Task } from '@/lib/types';

interface ShareTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
}

const ShareTaskModal = ({ isOpen, onClose, task }: ShareTaskModalProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [shareLink] = useState(`https://taskmaster.app/shared/task/${task?.id || ''}`);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      toast({
        title: "Link copied!",
        description: "Share link has been copied to clipboard",
      });
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleEmailShare = () => {
    if (!email.trim()) {
      toast({
        title: "Email required",
        description: "Please enter an email address",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would make an API call to send the email
    toast({
      title: "Invitation sent!",
      description: `Task shared with ${email}`,
    });
    setEmail('');
  };

  if (!task) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-w-[95vw] max-h-[95vh] overflow-y-auto bg-gradient-to-br from-green-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 border-0 shadow-2xl backdrop-blur-lg animate-scale-in">
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
            <Share2 className="h-5 w-5 text-green-600" />
            <div>
              <DialogTitle className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200">{t('shareTask')}</DialogTitle>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400">{task.name}</p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Share Link */}
          <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Share2 className="h-4 w-4 text-blue-600" />
                <Label className="text-sm font-medium">Share Link</Label>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  value={shareLink}
                  readOnly
                  className="bg-white/70 dark:bg-slate-600/70 border-0 rounded-lg text-sm"
                />
                <Button
                  onClick={handleCopyLink}
                  variant="outline"
                  size="sm"
                  className="hover:scale-105 transition-all duration-300"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Email Invitation */}
          <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-green-600" />
                <Label className="text-sm font-medium">Send Email Invitation</Label>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="email"
                  placeholder="colleague@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/70 dark:bg-slate-600/70 border-0 rounded-lg text-sm"
                />
                <Button
                  onClick={handleEmailShare}
                  variant="outline"
                  size="sm"
                  className="hover:scale-105 transition-all duration-300"
                >
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Collaboration Features */}
          <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-600" />
                <Label className="text-sm font-medium">{t('collaboration')} Features</Label>
              </div>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Real-time updates</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Comment and discuss</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Track changes</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Share Button */}
          <Button
            onClick={handleCopyLink}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white h-12 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Share2 className="mr-2 h-4 w-4" />
            {t('share').toUpperCase()} TASK
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareTaskModal;
