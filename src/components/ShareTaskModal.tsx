import { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Share2, Copy, Mail, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import type { Task } from '@/lib/types';
import { isValidUUID } from '@/lib/utils';

interface ShareTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
}

const ShareTaskModal = ({ isOpen, onClose, task }: ShareTaskModalProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const shareLink = useMemo(() => 
    task?.id && isValidUUID(task.id) ? `https://taskmaster.app/shared/task/${task.id}` : '',
    [task]
  );

  const handleCopyLink = async () => {
    if (!shareLink) {
      toast({
        title: t('error'),
        description: t('invalidTaskLink'),
        variant: 'destructive',
      });
      return;
    }
    try {
      await navigator.clipboard.writeText(shareLink);
      toast({
        title: t('linkCopied'),
        description: t('linkCopiedDescription'),
      });
    } catch (err) {
      console.error('Failed to copy link:', err);
      toast({
        title: t('error'),
        description: t('copyLinkFailed'),
        variant: 'destructive',
      });
    }
  };

  const handleEmailShare = async () => {
    if (!email.trim()) {
      toast({
        title: t('emailRequired'),
        description: t('enterEmail'),
        variant: 'destructive',
      });
      return;
    }
    if (!task?.id || !isValidUUID(task.id)) {
      toast({
        title: t('error'),
        description: t('invalidTask'),
        variant: 'destructive',
      });
      return;
    }
    try {
      const response = await fetch('/api/share/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId: task.id, email }),
      });
      if (!response.ok) throw new Error('Failed to send email');
      toast({
        title: t('invitationSent'),
        description: `Task shared with ${email}`,
      });
      setEmail('');
    } catch (err) {
      console.error('Error sending email:', err);
      toast({
        title: t('error'),
        description: t('emailShareFailed'),
        variant: 'destructive',
      });
    }
  };

  const handleRemoveShare = async () => {
    if (!task?.id || !isValidUUID(task.id)) {
      toast({
        title: t('error'),
        description: t('invalidTask'),
        variant: 'destructive',
      });
      return;
    }
    try {
      const response = await fetch(`/api/shared/task/${task.id}`, { method: 'DELETE' });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to remove share');
      }
      toast({
        title: t('success'),
        description: t('removeShare'),
      });
      onClose();
    } catch (err) {
      console.error('Error removing share:', err);
      toast({
        title: t('error'),
        description: t('removeShareFailed'),
        variant: 'destructive',
      });
    }
  };

  if (!task || !task.id || !isValidUUID(task.id)) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent aria-describedby="invalid-task-description">
          <DialogHeader>
            <DialogTitle>{t('error')}</DialogTitle>
            <DialogDescription id="invalid-task-description">{t('invalidTaskDescription')}</DialogDescription>
          </DialogHeader>
          <p>{t('invalidTask')}</p>
          <Button onClick={onClose}>{t('close')}</Button>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="sm:max-w-md max-w-[95vw] max-h-[95vh] overflow-y-auto bg-gradient-to-br from-green-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 border-0 shadow-2xl backdrop-blur-lg animate-scale-in"
        style={{ willChange: 'transform, opacity' }}
        aria-describedby="share-task-description"
      >
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
              <DialogDescription id="share-task-description">{t('shareTaskDescription')}</DialogDescription>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400">{task.name || 'Untitled Task'}</p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Share2 className="h-4 w-4 text-blue-600" />
                <Label className="text-sm font-medium">{t('shareLink')}</Label>
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
                  className="hover:scale-105 transition-transform duration-300"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-green-600" />
                <Label className="text-sm font-medium">{t('sendEmailInvitation')}</Label>
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
                  className="hover:scale-105 transition-transform duration-300"
                >
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-600" />
                <Label className="text-sm font-medium">{t('collaborationFeatures')}</Label>
              </div>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>{t('realTimeUpdates')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>{t('commentAndDiscuss')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>{t('trackChanges')}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={handleCopyLink}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white h-12 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            style={{ willChange: 'transform' }}
          >
            <Share2 className="mr-2 h-4 w-4" />
            {t('share').toUpperCase()} {t('task').toUpperCase()}
          </Button>

          <Button
            onClick={handleRemoveShare}
            variant="destructive"
            className="w-full mt-4 transition-transform duration-300 hover:scale-105"
            style={{ willChange: 'transform' }}
          >
            {t('removeShare')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareTaskModal;