import { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { 
  User, 
  Code, 
  Heart, 
  Github, 
  Linkedin, 
  Mail,
  Trophy,
  Zap,
  Target
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/krishyadav90?tab=repositories',
    icon: Github,
    className: 'bg-gray-100 dark:bg-slate-700',
    ariaLabel: "Visit Krish Yadav's GitHub profile",
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/krish-yadav-aba86a2bb/',
    icon: Linkedin,
    className: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300',
    ariaLabel: "Visit Krish Yadav's LinkedIn profile",
  },
  {
    name: 'Email',
    url: 'mailto:krishyada9865@gmail.com',
    icon: Mail,
    className: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300',
    ariaLabel: 'Send email to Krish Yadav',
  },
];

const About: FC = () => {
  const { t } = useLanguage();

  return (
    <div className="flex-1 p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="md:hidden" aria-label={t('toggleSidebar')} />
          <div>
            <h1 className="text-3xl font-bold text-foreground">{t('aboutTaskMaster')}</h1>
            <p className="text-muted-foreground">{t('meetCreator')}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Creator Info */}
        <Card className="shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              {t('aboutCreator')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
              <div
                className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110"
                role="img"
                aria-label={t('krishAvatar')}
              >
                KY
              </div>
              <div>
                <h3 className="text-xl font-semibold">Krish Yadav</h3>
                <p className="text-muted-foreground">{t('fullStackDeveloper')}</p>
                <Badge variant="outline" className="mt-2 bg-green-50 text-green-700 border-green-200">
                  {t('creatorDeveloper')}
                </Badge>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {t('creatorDescription')}
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-700 dark:to-slate-600 rounded-lg">
                <Code className="h-5 w-5 text-blue-500" />
                <span className="text-sm">{t('specializesIn')}</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-700 dark:to-slate-600 rounded-lg">
                <Heart className="h-5 w-5 text-red-500" />
                <span className="text-sm">{t('passionateAbout')}</span>
              </div>
            </div>

            <div className="flex gap-3">
              {socialLinks.map(({ name, url, icon: Icon, className, ariaLabel }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 p-2 ${className} rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300`}
                  aria-label={ariaLabel}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm">{name}</span>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Project Info */}
        <Card className="shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              {t('aboutTaskMaster')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              {t('projectDescription')}
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 rounded-lg">
                <Zap className="h-5 w-5 text-purple-500" />
                <div>
                  <div className="font-medium text-sm">{t('modernDesign')}</div>
                  <div className="text-xs text-muted-foreground">{t('modernDesignDesc')}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 rounded-lg">
                <Trophy className="h-5 w-5 text-blue-500" />
                <div>
                  <div className="font-medium text-sm">{t('fullFeatured')}</div>
                  <div className="text-xs text-muted-foreground">{t('fullFeaturedDesc')}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900 dark:to-emerald-900 rounded-lg">
                <Code className="h-5 w-5 text-green-500" />
                <div>
                  <div className="font-medium text-sm">{t('builtWithReact')}</div>
                  <div className="text-xs text-muted-foreground">{t('builtWithReactDesc')}</div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900 dark:to-red-900 rounded-lg border border-orange-200 dark:border-orange-700">
              <h4 className="font-semibold text-sm mb-2">{t('keyFeatures')}</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• {t('featureTaskManagement')}</li>
                <li>• {t('featureThemes')}</li>
                <li>• {t('featureDragDrop')}</li>
                <li>• {t('featureAnalytics')}</li>
                <li>• {t('featureResponsive')}</li>
                <li>• {t('featureCalendar')}</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Thank You Section */}
      <Card className="shadow-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 backdrop-blur-sm border-0 hover:shadow-2xl transition-all duration-300 hover:scale-[1.01]">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-4 text-foreground">{t('thankYou')}</h3>
          <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {t('thankYouMessage')}
          </p>
          <div className="mt-6 flex justify-center">
            <div className="flex items-center gap-2 text-lg">
              <span>{t('madeWithLove')}</span>
              <Heart className="h-5 w-5 text-red-500 animate-pulse" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;