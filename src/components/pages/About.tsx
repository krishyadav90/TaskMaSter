
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

const About = () => {
  return (
    <div className="flex-1 p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="md:hidden" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">About TaskMaster</h1>
            <p className="text-muted-foreground">Meet the creator and learn about this project</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Creator Info */}
        <Card className="shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              About the Creator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110">
                KY
              </div>
              <div>
                <h3 className="text-xl font-semibold">Krish Yadav</h3>
                <p className="text-muted-foreground">Full Stack Developer</p>
                <Badge variant="outline" className="mt-2 bg-green-50 text-green-700 border-green-200">
                  Creator & Developer
                </Badge>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Hi there! I'm Krish Yadav, a passionate full-stack developer who created TaskMaster to help people 
              organize their daily tasks more efficiently. I believe in building applications that are not only 
              functional but also beautiful and user-friendly.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-700 dark:to-slate-600 rounded-lg">
                <Code className="h-5 w-5 text-blue-500" />
                <span className="text-sm">Specializes in React, TypeScript, and Modern Web Technologies</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-700 dark:to-slate-600 rounded-lg">
                <Heart className="h-5 w-5 text-red-500" />
                <span className="text-sm">Passionate about creating intuitive user experiences</span>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex items-center gap-2 p-2 bg-gray-100 dark:bg-slate-700 rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300">
                <Github className="h-4 w-4" />
                <span className="text-sm">GitHub</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300">
                <Linkedin className="h-4 w-4" />
                <span className="text-sm">LinkedIn</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300">
                <Mail className="h-4 w-4" />
                <span className="text-sm">Email</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project Info */}
        <Card className="shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              About TaskMaster
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              TaskMaster is a modern, feature-rich task management application built with cutting-edge web technologies. 
              It's designed to help you stay organized, productive, and focused on what matters most.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 rounded-lg">
                <Zap className="h-5 w-5 text-purple-500" />
                <div>
                  <div className="font-medium text-sm">Modern Design</div>
                  <div className="text-xs text-muted-foreground">Beautiful UI with smooth animations</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 rounded-lg">
                <Trophy className="h-5 w-5 text-blue-500" />
                <div>
                  <div className="font-medium text-sm">Full Featured</div>
                  <div className="text-xs text-muted-foreground">Priority levels, deadlines, categories, and more</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900 dark:to-emerald-900 rounded-lg">
                <Code className="h-5 w-5 text-green-500" />
                <div>
                  <div className="font-medium text-sm">Built with React</div>
                  <div className="text-xs text-muted-foreground">TypeScript, Tailwind CSS, and Shadcn UI</div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900 dark:to-red-900 rounded-lg border border-orange-200 dark:border-orange-700">
              <h4 className="font-semibold text-sm mb-2">Key Features:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Task management with priorities and deadlines</li>
                <li>• Dark/Light mode support</li>
                <li>• Drag and drop reordering</li>
                <li>• Analytics and achievements</li>
                <li>• Responsive design for all devices</li>
                <li>• Modern calendar interface</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Thank You Section */}
      <Card className="shadow-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 backdrop-blur-sm border-0 hover:shadow-2xl transition-all duration-300 hover:scale-[1.01]">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-4 text-foreground">Thank You for Using TaskMaster!</h3>
          <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            I hope TaskMaster helps you stay organized and productive. If you have any feedback, suggestions, 
            or just want to say hello, feel free to reach out. Your input helps make TaskMaster better for everyone!
          </p>
          <div className="mt-6 flex justify-center">
            <div className="flex items-center gap-2 text-lg">
              <span>Made with</span>
              <Heart className="h-5 w-5 text-red-500 animate-pulse" />
              <span>by Krish Yadav</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;
