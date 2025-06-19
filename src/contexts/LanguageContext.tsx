import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    tasks: 'Tasks',
    analytics: 'Analytics',
    calendar: 'Calendar',
    profile: 'Profile',
    about: 'About',
    
    // Common
    create: 'Create',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    close: 'Close',
    share: 'Share',
    search: 'Search',
    filter: 'Filter',
    all: 'All',
    none: 'None',
    
    // Profile
    profileInformation: 'Profile Information',
    name: 'Name',
    email: 'Email',
    updateProfile: 'Update Profile',
    profilePicture: 'Profile Picture',
    uploadPicture: 'Upload Picture',
    selectFromDevice: 'Select from Device',
    
    // Task Modal
    createTask: 'Create Task',
    editTask: 'Edit Task',
    taskName: 'Task Name',
    date: 'Date',
    startingTime: 'Starting Time',
    priorityLevel: 'Priority Level',
    deadline: 'Deadline',
    remindMe: 'Remind Me',
    category: 'Category',
    
    // Tasks
    totalTasks: 'Total Tasks',
    completed: 'Completed',
    remaining: 'Remaining',
    filtersSearch: 'Filters & Search',
    searchTasks: 'Search tasks...',
    todayTasks: "Today's Tasks",
    noTasksScheduled: 'No tasks scheduled for today',
    completionRate: 'Completion Rate',
    todayProgress: "Today's Progress",
    
    // Categories
    study: 'Study',
    work: 'Work',
    life: 'Life',
    health: 'Health',
    personal: 'Personal',
    productive: 'Productive',
    
    // Priority
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    
    // History
    taskHistory: 'Task History',
    versions: 'Versions',
    restore: 'Restore',
    
    // Collaboration
    shareTask: 'Share Task',
    collaboration: 'Collaboration',
    importTask: 'Import Shared Task',
    pasteShareLink: 'Paste share link here...',
    addSharedTask: 'Add Shared Task',
    
    // Settings
    settings: 'Settings',
    language: 'Language',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
    notifications: 'Notifications',
    emailReminders: 'Email Reminders',
    
    // Dashboard
    welcomeBack: 'Welcome back! Here\'s your productivity overview.',
    quickStats: 'Quick Stats',
    
    // Messages
    taskCreated: 'Task created successfully!',
    taskUpdated: 'Task updated successfully!',
    taskDeleted: 'Task deleted!',
    taskCompleted: 'Task completed!',
    taskReopened: 'Task reopened!',
    profileUpdated: 'Profile updated successfully!',
    linkCopied: 'Link copied!',
    shareLinkCopied: 'Share link has been copied to clipboard',
    taskImported: 'Task imported successfully!',
    invalidLink: 'Invalid share link',
    
    // About
    aboutTaskMaster: 'About TaskMaster',
    aboutCreator: 'About the Creator',
    creatorDescription: 'Hi there! I\'m Krish Yadav, a passionate full-stack developer who created TaskMaster to help people organize their daily tasks more efficiently. I believe in building applications that are not only functional but also beautiful and user-friendly.',
    specializesIn: 'Specializes in React, TypeScript, and Modern Web Technologies',
    passionateAbout: 'Passionate about creating intuitive user experiences',
    thankYou: 'Thank You for Using TaskMaster!',
    thankYouMessage: 'I hope TaskMaster helps you stay organized and productive. If you have any feedback, suggestions, or just want to say hello, feel free to reach out. Your input helps make TaskMaster better for everyone!',
    madeWithLove: 'Made with love by Krish Yadav',
    projectDescription: 'TaskMaster is a modern, feature-rich task management application built with cutting-edge web technologies. It\'s designed to help you stay organized, productive, and focused on what matters most.',
    modernDesign: 'Modern Design',
    modernDesignDesc: 'Beautiful UI with smooth animations',
    fullFeatured: 'Full Featured',
    fullFeaturedDesc: 'Priority levels, deadlines, categories, and more',
    builtWithReact: 'Built with React',
    builtWithReactDesc: 'TypeScript, Tailwind CSS, and Shadcn UI',
    keyFeatures: 'Key Features',
    featureTaskManagement: 'Task management with priorities and deadlines',
    featureThemes: 'Dark/Light mode support',
    featureDragDrop: 'Drag and drop reordering',
    featureAnalytics: 'Analytics and achievements',
    featureResponsive: 'Responsive design for all devices',
    featureCalendar: 'Modern calendar interface',
    
    // Analytics
    trackProductivity: 'Track your productivity and progress over time.',
    successRate: 'Success Rate',
    categoryBreakdown: 'Category Breakdown',
    weeklyOverview: 'Weekly Overview',
    tasksCompletedThisWeek: 'Tasks completed this week',
    recentActivity: 'Recent Activity',
    dailyPerformance: 'Daily Performance (Last 7 Days)',

    manageProfile: 'Manage your profile settings and preferences.',
    joined: 'Joined',
    notificationDesc: 'Get notified on new tasks and updates.',
    emailReminderDesc: 'Receive daily task reminders via email.',
    noNotifications: 'No notifications yet.',
    clearNotifications: 'Clear Notifications',
    notificationsCleared: 'Notifications cleared',
    welcomeBackName: 'Welcome back, {name}!',
    taskFetchFailed: 'Failed to fetch tasks',
    userFetchFailed: 'Failed to fetch user',
    loginRequired: 'Please log in to create tasks',
    taskCreateFailed: 'Failed to create task',
    taskImportFailed: 'Failed to import task',
    taskToggleFailed: 'Failed to toggle task',
    taskPauseFailed: 'Failed to pause task',
    taskDeleteFailed: 'Failed to delete task',
    taskReorderFailed: 'Failed to reorder tasks',
    profileUpdateFailed: 'Failed to update profile',
    taskUpdateFailed: 'Failed to update task',
    taskRestored: 'Task "{name}" restored from history!',
    taskPaused: 'Task "{name}" paused!',
    taskResumed: 'Task "{name}" resumed!',
    goodbye: 'Goodbye, {name}!',
    appName: 'TaskMaster',
    appDescription: 'Your Productivity Companion',
    createAccount: 'Create Account',
    
    fullName: 'Full Name',
    
    password: 'Password',
    signUp: 'Sign Up',
    signIn: 'Sign In',
    alreadyHaveAccount: 'Already have an account?',
    dontHaveAccount: "Don't have an account?",
    
    success: 'Success',
    accountCreated: 'Account created!',
    signedIn: 'Signed in!',
    error: 'Error',


    // Calendar
    planOrganize: 'Plan and organize your tasks by date.',
    taskCalendar: 'Task Calendar',
    allComplete: 'All Complete',
    partial: 'Partial',
    pending: 'Pending',
    upcomingTasks: 'Upcoming Tasks',
    noUpcomingTasks: 'No upcoming tasks',
    tasksFor: 'Tasks for'
  },
  hi: {
    // Navigation
    dashboard: 'डैशबोर्ड',
    tasks: 'कार्य',
    analytics: 'विश्लेषण',
    calendar: 'कैलेंडर',
    profile: 'प्रोफ़ाइल',
    about: 'बारे में',
    
    // Common
    create: 'बनाएं',
    edit: 'संपादित करें',
    delete: 'हटाएं',
    save: 'सहेजें',
    cancel: 'रद्द करें',
    close: 'बंद करें',
    share: 'साझा करें',
    search: 'खोजें',
    filter: 'फ़िल्टर',
    all: 'सभी',
    none: 'कोई नहीं',
    
    // Profile
    profileInformation: 'प्रोफ़ाइल जानकारी',
    name: 'नाम',
    email: 'ईमेल',
    updateProfile: 'प्रोफ़ाइल अपडेट करें',
    profilePicture: 'प्रोफ़ाइल चित्र',
    uploadPicture: 'चित्र अपलोड करें',
    selectFromDevice: 'डिवाइस से चुनें',
    
    // Task Modal
    createTask: 'कार्य बनाएं',
    editTask: 'कार्य संपादित करें',
    taskName: 'कार्य का नाम',
    date: 'दिनांक',
    startingTime: 'प्रारंभ समय',
    priorityLevel: 'प्राथमिकता स्तर',
    deadline: 'समय सीमा',
    remindMe: 'मुझे याद दिलाएं',
    category: 'श्रेणी',
    
    // Tasks
    totalTasks: 'कुल कार्य',
    completed: 'पूर्ण',
    remaining: 'शेष',
    filtersSearch: 'फ़िल्टर और खोज',
    searchTasks: 'कार्य खोजें...',
    todayTasks: 'आज के कार्य',
    noTasksScheduled: 'आज के लिए कोई कार्य निर्धारित नहीं',
    completionRate: 'पूर्णता दर',
    todayProgress: 'आज की प्रगति',
    
    // Categories
    study: 'अध्ययन',
    work: 'काम',
    life: 'जीवन',
    health: 'स्वास्थ्य',
    personal: 'व्यक्तिगत',
    productive: 'उत्पादक',
    
    // Priority
    low: 'कम',
    medium: 'मध्यम',
    high: 'उच्च',
    
    // History
    taskHistory: 'कार्य इतिहास',
    versions: 'संस्करण',
    restore: 'पुनर्स्थापित करें',
    
    // Collaboration
    shareTask: 'कार्य साझा करें',
    collaboration: 'सहयोग',
    importTask: 'साझा कार्य आयात करें',
    pasteShareLink: 'साझा लिंक यहाँ पेस्ट करें...',
    addSharedTask: 'साझा कार्य जोड़ें',
    
    // Settings
    settings: 'सेटिंग्स',
    language: 'भाषा',
    theme: 'थीम',
    light: 'प्रकाश',
    dark: 'अंधेरा',
    system: 'सिस्टम',
    notifications: 'सूचनाएं',
    emailReminders: 'ईमेल रिमाइंडर',
    
    // Dashboard
    welcomeBack: 'वापस स्वागत है! यहाँ आपकी उत्पादकता का अवलोकन है।',
    quickStats: 'त्वरित आंकड़े',
    
    // Messages
    taskCreated: 'कार्य सफलतापूर्वक बनाया गया!',
    taskUpdated: 'कार्य सफलतापूर्वक अपडेट किया गया!',
    taskDeleted: 'कार्य हटाया गया!',
    taskCompleted: 'कार्य पूरा हुआ!',
    taskReopened: 'कार्य पुनः खोला गया!',
    profileUpdated: 'प्रोफ़ाइल सफलतापूर्वक अपडेट किया गया!',
    linkCopied: 'लिंक कॉपी किया गया!',
    shareLinkCopied: 'साझा लिंक क्लिपबोर्ड पर कॉपी किया गया है',
    taskImported: 'कार्य सफलतापूर्वक आयात किया गया!',
    invalidLink: 'अमान्य साझा लिंक',
    
    // About
    aboutTaskMaster: 'टास्कमास्टर के बारे में',
    aboutCreator: 'निर्माता के बारे में',
    creatorDescription: 'नमस्ते! मैं कृष यादव हूँ, एक उत्साही फुल-स्टैक डेवलपर जिसने टास्कमास्टर बनाया है ताकि लोग अपने दैनिक कार्यों को अधिक कुशलता से व्यवस्थित कर सकें। मेरा मानना है कि ऐसी एप्लिकेशन बनानी चाहिए जो न केवल कार्यात्मक हों बल्कि सुंदर और उपयोगकर्ता-अनुकूल भी हों।',
    specializesIn: 'रिएक्ट, टाइपस्क्रिप्ट और आधुनिक वेब तकनीकों में विशेषज्ञता',
    passionateAbout: 'सहज उपयोगकर्ता अनुभव बनाने के लिए उत्साही',
    thankYou: 'टास्कमास्टर का उपयोग करने के लिए धन्यवाद!',
    thankYouMessage: 'मुझे आशा है कि टास्कमास्टर आपको व्यवस्थित और उत्पादक रहने में मदद करता है। यदि आपके पास कोई फीडबैक, सुझाव हैं, या बस नमस्ते कहना चाहते हैं, तो कृपया संपर्क करें। आपका इनपुट टास्कमास्टर को सभी के लिए बेहतर बनाने में मदद करता है!',
    madeWithLove: 'कृष यादव द्वारा प्रेम के साथ बनाया गया',
    projectDescription: 'टास्कमास्टर एक आधुनिक, सुविधा-संपन्न कार्य प्रबंधन एप्लिकेशन है जो अत्याधुनिक वेब तकनीकों के साथ बनाया गया है। यह आपको व्यवस्थित, उत्पादक और सबसे महत्वपूर्ण चीजों पर केंद्रित रहने में मदद करने के लिए डिज़ाइन किया गया है।',
    modernDesign: 'आधुनिक डिज़ाइन',
    modernDesignDesc: 'सुंदर यूआई और सहज एनिमेशन',
    fullFeatured: 'पूर्ण सुविधाएँ',
    fullFeaturedDesc: 'प्राथमिकता स्तर, समय सीमा, श्रेणियाँ और अधिक',
    builtWithReact: 'रिएक्ट के साथ बनाया गया',
    builtWithReactDesc: 'टाइपस्क्रिप्ट, टेलविंड सीएसएस, और शैडसीएन यूआई',
    keyFeatures: 'मुख्य विशेषताएँ',
    featureTaskManagement: 'प्राथमिकता और समय सीमा के साथ कार्य प्रबंधन',
    featureThemes: 'डार्क/लाइट मोड समर्थन',
    featureDragDrop: 'ड्रैग और ड्रॉप रीऑर्डरिंग',
    featureAnalytics: 'विश्लेषण और उपलब्धियाँ',
    featureResponsive: 'सभी डिवाइसों के लिए रिस्पॉन्सिव डिज़ाइन',
    featureCalendar: 'आधुनिक कैलेंडर इंटरफ़ेस',
    
    // Analytics
    trackProductivity: 'अपनी उत्पादकता और प्रगति को समय के साथ ट्रैक करें।',
    successRate: 'सफलता दर',
    categoryBreakdown: 'श्रेणी विवरण',
    weeklyOverview: 'साप्ताहिक अवलोकन',
    tasksCompletedThisWeek: 'इस सप्ताह पूर्ण किए गए कार्य',
    recentActivity: 'हाल की गतिविधि',
    dailyPerformance: 'दैनिक प्रदर्शन (पिछले 7 दिन)',

    manageProfile: 'अपनी प्रोफ़ाइल सेटिंग्स और प्राथमिकताएँ प्रबंधित करें।',
    joined: 'शामिल हुए',
    notificationDesc: 'नए कार्यों और अपडेट्स पर सूचित हों।',
    emailReminderDesc: 'ईमेल के माध्यम से दैनिक कार्य रिमाइंडर प्राप्त करें।',
    noNotifications: 'अभी तक कोई सूचनाएँ नहीं।',
    clearNotifications: 'सूचनाएँ साफ़ करें',
    notificationsCleared: 'सूचनाएँ साफ़ की गईं',
    welcomeBackName: 'वापस स्वागत है, {name}!',
    taskFetchFailed: 'कार्य प्राप्त करने में विफल',
    userFetchFailed: 'उपयोगकर्ता प्राप्त करने में विफल',
    loginRequired: 'कार्य बनाने के लिए कृपया लॉग इन करें',
    taskCreateFailed: 'कार्य बनाने में विफल',
    taskImportFailed: 'कार्य आयात करने में विफल',
    taskToggleFailed: 'कार्य टॉगल करने में विफल',
    taskPauseFailed: 'कार्य रोकने में विफल',
    taskDeleteFailed: 'कार्य हटाने में विफल',
    taskReorderFailed: 'कार्यों को पुन: क्रमबद्ध करने में विफल',
    profileUpdateFailed: 'प्रोफ़ाइल अपडेट करने में विफल',
    taskUpdateFailed: 'कार्य अपडेट करने में विफल',
    taskRestored: 'कार्य "{name}" इतिहास से पुनर्स्थापित किया गया!',
    taskPaused: 'कार्य "{name}" रोका गया!',
    taskResumed: 'कार्य "{name}" फिर से शुरू किया गया!',
    goodbye: 'अलविदा, {name}!',
    appName: 'टास्कमास्टर',
    appDescription: 'आपका उत्पादकता साथी',
    createAccount: 'खाता बनाएं',
   
    fullName: 'पूरा नाम',
   
    password: 'पासवर्ड',
    signUp: 'साइन अप',
    signIn: 'साइन इन',
    alreadyHaveAccount: 'पहले से खाता है?',
    dontHaveAccount: 'खाता नहीं है?',
    
    success: 'सफलता',
    accountCreated: 'खाता बन गया!',
    signedIn: 'साइन इन हो गया!',
    error: 'त्रुटि',
    Study: 'अध्ययन',
    Work: 'काम',
    pealth: 'स्वास्थ्य',
    Personal: 'निजी',
    Productive: 'उत्पादक',
    Life: 'जीवन',
    About: 'के बारे में',
    main_menu: 'मुख्य मेनू',
    Dashboard: 'डैशबोर्ड',
    Analytics: 'विश्लेषण',
    Calendar: 'कैलेंडर',
    Profile: 'प्रोफाइल',
    quick_action: 'त्वरित कार्रवाई',
    add_new_task: 'नया कार्य जोड़ें',
    taskmaster: 'टास्कमास्टर',
    stay_organised: 'संगठित रहें',


    
    // Calendar
    planOrganize: 'अपने कार्यों को दिनांक के अनुसार योजना बनाएं और व्यवस्थित करें।',
    taskCalendar: 'कार्य कैलेंडर',
    allComplete: 'सभी पूर्ण',
    partial: 'आंशिक',
    pending: 'लंबित',
    upcomingTasks: 'आगामी कार्य',
    noUpcomingTasks: 'कोई आगामी कार्य नहीं',
    tasksFor: 'के लिए कार्य'
  },
  ru: {
    // Navigation
    dashboard: 'Панель управления',
    tasks: 'Задачи',
    analytics: 'Аналитика',
    calendar: 'Календарь',
    profile: 'Профиль',
    about: 'О программе',
    
    // Common
    create: 'Создать',
    edit: 'Редактировать',
    delete: 'Удалить',
    save: 'Сохранить',
    cancel: 'Отменить',
    close: 'Закрыть',
    share: 'Поделиться',
    search: 'Поиск',
    filter: 'Фильтр',
    all: 'Все',
    none: 'Нет',
    
    // Profile
    profileInformation: 'Информация профиля',
    name: 'Имя',
    email: 'Электронная почта',
    updateProfile: 'Обновить профиль',
    profilePicture: 'Фото профиля',
    uploadPicture: 'Загрузить фото',
    selectFromDevice: 'Выбрать с устройства',
    
    // Task Modal
    createTask: 'Создать задачу',
    editTask: 'Редактировать задачу',
    taskName: 'Название задачи',
    date: 'Дата',
    startingTime: 'Время начала',
    priorityLevel: 'Уровень приоритета',
    deadline: 'Крайний срок',
    remindMe: 'Напомнить мне',
    category: 'Категория',
    
    // Tasks
    totalTasks: 'Всего задач',
    completed: 'Завершено',
    remaining: 'Осталось',
    filtersSearch: 'Фильтры и поиск',
    searchTasks: 'Поиск задач...',
    todayTasks: 'Задачи на сегодня',
    noTasksScheduled: 'На сегодня задач не запланировано',
    completionRate: 'Уровень завершения',
    todayProgress: 'Прогресс за сегодня',
    
    // Categories
    study: 'Учеба',
    work: 'Работа',
    life: 'Жизнь',
    health: 'Здоровье',
    personal: 'Личное',
    productive: 'Продуктивность',
    
    // Priority
    low: 'Низкий',
    medium: 'Средний',
    high: 'Высокий',
    
    // History
    taskHistory: 'История задач',
    versions: 'Версии',
    restore: 'Восстановить',
    
    // Collaboration
    shareTask: 'Поделиться задачей',
    collaboration: 'Совместная работа',
    importTask: 'Импорт общей задачи',
    pasteShareLink: 'Вставьте ссылку для общего доступа здесь...',
    addSharedTask: 'Добавить общую задачу',
    
    // Settings
    settings: 'Настройки',
    language: 'Язык',
    theme: 'Тема',
    light: 'Светлая',
    dark: 'Темная',
    system: 'Системная',
    notifications: 'Уведомления',
    emailReminders: 'Напоминания по почте',
    
    // Dashboard
    welcomeBack: 'Добро пожаловать! Вот обзор вашей продуктивности.',
    quickStats: 'Быстрая статистика',
    
    // Messages
    taskCreated: 'Задача успешно создана!',
    taskUpdated: 'Задача успешно обновлена!',
    taskDeleted: 'Задача удалена!',
    taskCompleted: 'Задача завершена!',
    taskReopened: 'Задача переоткрыта!',
    profileUpdated: 'Профиль успешно обновлен!',
    linkCopied: 'Ссылка скопирована!',
    shareLinkCopied: 'Ссылка для общего доступа скопирована в буфер обмена',
    taskImported: 'Задача успешно импортирована!',
    invalidLink: 'Недействительная ссылка для общего доступа',
    
    // About
    aboutTaskMaster: 'О TaskMaster',
    aboutCreator: 'О создателе',
    creatorDescription: 'Привет! Я Криш Ядав, страстный фулл-стек разработчик, создавший TaskMaster, чтобы помочь людям более эффективно организовывать свои ежедневные задачи. Я верю в создание приложений, которые не только функциональны, но также красивы и удобны для пользователя.',
    specializesIn: 'Специализируется на React, TypeScript и современных веб-технологиях',
    passionateAbout: 'Увлечен созданием интуитивных пользовательских интерфейсов',
    thankYou: 'Спасибо за использование TaskMaster!',
    thankYouMessage: 'Я надеюсь, что TaskMaster помогает вам оставаться организованным и продуктивным. Если у вас есть отзывы, предложения или вы просто хотите поздороваться, пожалуйста, свяжитесь со мной. Ваш вклад помогает сделать TaskMaster лучше для всех!',
    madeWithLove: 'Сделано с любовью Кришем Ядавом',
    projectDescription: 'TaskMaster — это современное, многофункциональное приложение для управления задачами, созданное с использованием передовых веб-технологий. Оно разработано, чтобы помочь вам оставаться организованным, продуктивным и сосредоточенным на самом важном.',
    modernDesign: 'Современный дизайн',
    modernDesignDesc: 'Красивый интерфейс с плавными анимациями',
    fullFeatured: 'Полный функционал',
    fullFeaturedDesc: 'Уровни приоритета, сроки, категории и многое другое',
    builtWithReact: 'Создано с использованием React',
    builtWithReactDesc: 'TypeScript, Tailwind CSS и Shadcn UI',
    keyFeatures: 'Ключевые функции',
    featureTaskManagement: 'Управление задачами с приоритетами и сроками',
    featureThemes: 'Поддержка светлой/темной темы',
    featureDragDrop: 'Перетаскивание для изменения порядка',
    featureAnalytics: 'Аналитика и достижения',
    featureResponsive: 'Адаптивный дизайн для всех устройств',
    featureCalendar: 'Современный интерфейс календаря',
    
    // Analytics
    trackProductivity: 'Отслеживайте свою продуктивность и прогресс со временем.',
    successRate: 'Уровень успеха',
    categoryBreakdown: 'Разбивка по категориям',
    weeklyOverview: 'Еженедельный обзор',
    tasksCompletedThisWeek: 'Задачи, выполненные на этой неделе',
    recentActivity: 'Недавняя активность',
    dailyPerformance: 'Ежедневная производительность (последние 7 дней)',

    manageProfile: 'Управляйте настройками профиля и предпочтениями.',
    joined: 'Присоединился',
    notificationDesc: 'Получайте уведомления о новых задачах и обновлениях.',
    emailReminderDesc: 'Получайте ежедневные напоминания о задачах по электронной почте.',
    noNotifications: 'Пока нет уведомлений.',
    clearNotifications: 'Очистить уведомления',
    notificationsCleared: 'Уведомления очищены',
    welcomeBackName: 'Добро пожаловать, {name}!',
    taskFetchFailed: 'Не удалось получить задачи',
userFetchFailed: 'Не удалось получить пользователя',
loginRequired: 'Пожалуйста, войдите, чтобы создать задачи',
taskCreateFailed: 'Не удалось создать задачу',
taskImportFailed: 'Не удалось импортировать задачу',
taskToggleFailed: 'Не удалось переключить задачу',
taskPauseFailed: 'Не удалось приостановить задачу',
taskDeleteFailed: 'Не удалось удалить задачу',
taskReorderFailed: 'Не удалось переупорядочить задачи',
profileUpdateFailed: 'Не удалось обновить профиль',
taskUpdateFailed: 'Не удалось обновить задачу',
taskRestored: 'Задача "{name}" восстановлена из истории!',
taskPaused: 'Задача "{name}" приостановлена!',
taskResumed: 'Задача "{name}" возобновлена!',
goodbye: 'До свидания, {name}!',
appName: 'TaskMaster',
    appDescription: 'Ваш спутник продуктивности',
    createAccount: 'Создать аккаунт',
    
    fullName: 'Полное имя',
   
    password: 'Пароль',
    signUp: 'Зарегистрироваться',
    signIn: 'Войти',
    alreadyHaveAccount: 'Уже есть аккаунт?',
    dontHaveAccount: 'Нет аккаунта?',
   TaskMaster: 'Таскамастер',
    success: 'Успех',
    accountCreated: 'Аккаунт создан!',
    signedIn: 'Вход выполнен!',
    error: 'Ошибка',

    
    // Calendar
    planOrganize: 'Планируйте и организуйте свои задачи по датам.',
    taskCalendar: 'Календарь задач',
    allComplete: 'Все завершено',
    partial: 'Частично',
    pending: 'Ожидает',
    upcomingTasks: 'Предстоящие задачи',
    noUpcomingTasks: 'Нет предстоящих задач',
    tasksFor: 'Задачи для'
  },
  zh: {
    // Navigation
    dashboard: '仪表板',
    tasks: '任务',
    analytics: '分析',
    calendar: '日历',
    profile: '个人资料',
    about: '关于',
    
    // Common
    create: '创建',
    edit: '编辑',
    delete: '删除',
    save: '保存',
    cancel: '取消',
    close: '关闭',
    share: '分享',
    search: '搜索',
    filter: '筛选',
    all: '全部',
    none: '无',
    
    // Profile
    profileInformation: '个人资料信息',
    name: '姓名',
    email: '电子邮件',
    updateProfile: '更新个人资料',
    profilePicture: '头像',
    uploadPicture: '上传图片',
    selectFromDevice: '从设备选择',
    
    // Task Modal
    createTask: '创建任务',
    editTask: '编辑任务',
    taskName: '任务名称',
    date: '日期',
    startingTime: '开始时间',
    priorityLevel: '优先级',
    deadline: '截止日期',
    remindMe: '提醒我',
    category: '类别',
    
    // Tasks
    totalTasks: '总任务数',
    completed: '已完成',
    remaining: '剩余',
    filtersSearch: '筛选与搜索',
    searchTasks: '搜索任务...',
    todayTasks: '今日任务',
    noTasksScheduled: '今日无任务安排',
    completionRate: '完成率',
    todayProgress: '今日进度',
    
    // Categories
    study: '学习',
    work: '工作',
    life: '生活',
    health: '健康',
    personal: '个人',
    productive: '生产力',
    
    // Priority
    low: '低',
    medium: '中',
    high: '高',
    
    // History
    taskHistory: '任务历史',
    versions: '版本',
    restore: '恢复',
    
    // Collaboration
    shareTask: '分享任务',
    collaboration: '协作',
    importTask: '导入共享任务',
    pasteShareLink: '在此粘贴共享链接...',
    addSharedTask: '添加共享任务',
    
    // Settings
    settings: '设置',
    language: '语言',
    theme: '主题',
    light: '浅色',
    dark: '深色',
    system: '系统',
    notifications: '通知',
    emailReminders: '电子邮件提醒',
    
    // Dashboard
    welcomeBack: '欢迎回来！这是您的生产力概览。',
    quickStats: '快速统计',
    
    // Messages
    taskCreated: '任务创建成功！',
    taskUpdated: '任务更新成功！',
    taskDeleted: '任务已删除！',
    taskCompleted: '任务已完成！',
    taskReopened: '任务已重新打开！',
    profileUpdated: '个人资料更新成功！',
    linkCopied: '链接已复制！',
    shareLinkCopied: '共享链接已复制到剪贴板',
    taskImported: '任务导入成功！',
    invalidLink: '无效的共享链接',
    
    // About
    aboutTaskMaster: '关于TaskMaster',
    aboutCreator: '关于创建者',
    creatorDescription: '你好！我是Krish Yadav，一位充满激情的全栈开发者，创建了TaskMaster以帮助人们更高效地组织日常任务。我相信构建的应用程序不仅要功能强大，还要美观且用户友好。',
    specializesIn: '擅长React、TypeScript和现代Web技术',
    passionateAbout: '热衷于创造直观的用户体验',
    thankYou: '感谢使用TaskMaster！',
    thankYouMessage: '我希望TaskMaster能帮助您保持井然有序和高效。如果您有任何反馈、建议或只是想打个招呼，请随时联系。您的意见有助于让TaskMaster对每个人都更好！',
    madeWithLove: '由Krish Yadav用心打造',
    projectDescription: 'TaskMaster是一款现代、功能丰富的任务管理应用程序，采用尖端的Web技术构建。它旨在帮助您保持井然有序、高效并专注于最重要的事情。',
    modernDesign: '现代设计',
    modernDesignDesc: '美观的界面，流畅的动画',
    fullFeatured: '功能齐全',
    fullFeaturedDesc: '优先级、截止日期、类别等',
    builtWithReact: '使用React构建',
    builtWithReactDesc: 'TypeScript、Tailwind CSS和Shadcn UI',
    keyFeatures: '主要功能',
    featureTaskManagement: '带优先级和截止日期的任务管理',
    featureThemes: '支持深色/浅色模式',
    featureDragDrop: '拖放重新排序',
    featureAnalytics: '分析和成就',
    featureResponsive: '适配所有设备的响应式设计',
    featureCalendar: '现代日历界面',
    
    // Analytics
    trackProductivity: '跟踪您的生产力和随时间推移的进展。',
    successRate: '成功率',
    categoryBreakdown: '类别细分',
    weeklyOverview: '每周概览',
    tasksCompletedThisWeek: '本周完成的任务',
    recentActivity: '近期活动',
    dailyPerformance: '每日表现（最近7天）',

    
    noNotifications: '暂无通知。',
    clearNotifications: '清除通知',
    notificationsCleared: '通知已清除',
    welcomeBackName: '欢迎回来，{name}！',
    taskFetchFailed: '无法获取任务',
userFetchFailed: '无法获取用户',
loginRequired: '请登录以创建任务',
taskCreateFailed: '创建任务失败',
taskImportFailed: '导入任务失败',
taskToggleFailed: '切换任务失败',
taskPauseFailed: '暂停任务失败',
taskDeleteFailed: '删除任务失败',
taskReorderFailed: '重新排序任务失败',
profileUpdateFailed: '更新个人资料失败',
taskUpdateFailed: '更新任务失败',
taskRestored: '任务"{name}"已从历史记录中恢复！',
taskPaused: '任务"{name}"已暂停！',
taskResumed: '任务"{name}"已恢复！',
goodbye: '再见，{name}！',
appName: '任务大师',
    appDescription: '您的生产力伙伴',
    createAccount: '创建账户',
    
    fullName: '全名',
    
    password: '密码',
    signUp: '注册',
    signIn: '登录',
    alreadyHaveAccount: '已有账户？',
    dontHaveAccount: '没有账户？',
   
    success: '成功',
    accountCreated: '账户已创建！',
    signedIn: '已登录！',
    error: '错误',
    
    // Calendar
    planOrganize: '按日期计划和组织您的任务。',
    taskCalendar: '任务日历',
    allComplete: '全部完成',
    partial: '部分完成',
    pending: '待处理',
    upcomingTasks: '即将执行的任务',
    noUpcomingTasks: '没有即将执行的任务',
    tasksFor: '任务用于'
  },
  es: {
    // Navigation
    dashboard: 'Tablero',
    tasks: 'Tareas',
    analytics: 'Análisis',
    calendar: 'Calendario',
    profile: 'Perfil',
    about: 'Acerca de',
    
    // Common
    create: 'Crear',
    edit: 'Editar',
    delete: 'Eliminar',
    save: 'Guardar',
    cancel: 'Cancelar',
    close: 'Cerrar',
    share: 'Compartir',
    search: 'Buscar',
    filter: 'Filtrar',
    all: 'Todos',
    none: 'Ninguno',
    
    // Profile
    profileInformation: 'Información del perfil',
    name: 'Nombre',
    email: 'Correo electrónico',
    updateProfile: 'Actualizar perfil',
    profilePicture: 'Foto de perfil',
    uploadPicture: 'Subir imagen',
    selectFromDevice: 'Seleccionar desde el dispositivo',
    
    // Task Modal
    createTask: 'Crear tarea',
    editTask: 'Editar tarea',
    taskName: 'Nombre de la tarea',
    date: 'Fecha',
    startingTime: 'Hora de inicio',
    priorityLevel: 'Nivel de prioridad',
    deadline: 'Fecha límite',
    remindMe: 'Recordarme',
    category: 'Categoría',
    
    // Tasks
    totalTasks: 'Total de tareas',
    completed: 'Completadas',
    remaining: 'Pendientes',
    filtersSearch: 'Filtros y búsqueda',
    searchTasks: 'Buscar tareas...',
    todayTasks: 'Tareas de hoy',
    noTasksScheduled: 'No hay tareas programadas para hoy',
    completionRate: 'Tasa de finalización',
    todayProgress: 'Progreso de hoy',
    
    // Categories
    study: 'Estudio',
    work: 'Trabajo',
    life: 'Vida',
    health: 'Salud',
    personal: 'Personal',
    productive: 'Productivo',
    
    // Priority
    low: 'Baja',
    medium: 'Media',
    high: 'Alta',
    
    // History
    taskHistory: 'Historial de tareas',
    versions: 'Versiones',
    restore: 'Restaurar',
    
    // Collaboration
    shareTask: 'Compartir tarea',
    collaboration: 'Colaboración',
    importTask: 'Importar tarea compartida',
    pasteShareLink: 'Pega el enlace compartido aquí...',
    addSharedTask: 'Añadir tarea compartida',
    
    // Settings
    settings: 'Configuraciones',
    language: 'Idioma',
    theme: 'Tema',
    light: 'Claro',
    dark: 'Oscuro',
    system: 'Sistema',
    notifications: 'Notificaciones',
    emailReminders: 'Recordatorios por correo',
    
    // Dashboard
    welcomeBack: '¡Bienvenido de nuevo! Aquí está tu resumen de productividad.',
    quickStats: 'Estadísticas rápidas',
    
    // Messages
    taskCreated: '¡Tarea creada con éxito!',
    taskUpdated: '¡Tarea actualizada con éxito!',
    taskDeleted: '¡Tarea eliminada!',
    taskCompleted: '¡Tarea completada!',
    taskReopened: '¡Tarea reabierta!',
    profileUpdated: '¡Perfil actualizado con éxito!',
    linkCopied: '¡Enlace copiado!',
    shareLinkCopied: 'El enlace compartido ha sido copiado al portapapeles',
    taskImported: '¡Tarea importada con éxito!',
    invalidLink: 'Enlace compartido inválido',
    
    // About
    aboutTaskMaster: 'Acerca de TaskMaster',
    aboutCreator: 'Acerca del creador',
    creatorDescription: '¡Hola! Soy Krish Yadav, un apasionado desarrollador full-stack que creó TaskMaster para ayudar a las personas a organizar sus tareas diarias de manera más eficiente. Creo en construir aplicaciones que no solo sean funcionales, sino también hermosas y fáciles de usar.',
    specializesIn: 'Especializado en React, TypeScript y tecnologías web modernas',
    passionateAbout: 'Apasionado por crear experiencias de usuario intuitivas',
    thankYou: '¡Gracias por usar TaskMaster!',
    thankYouMessage: 'Espero que TaskMaster te ayude a mantenerte organizado y productivo. Si tienes comentarios, sugerencias o simplemente quieres saludar, no dudes en contactarme. ¡Tu opinión ayuda a mejorar TaskMaster para todos!',
    madeWithLove: 'Hecho con amor por Krish Yadav',
    projectDescription: 'TaskMaster es una aplicación de gestión de tareas moderna y rica en funciones, construida con tecnologías web de vanguardia. Está diseñada para ayudarte a mantenerte organizado, productivo y enfocado en lo que más importa.',
    modernDesign: 'Diseño moderno',
    modernDesignDesc: 'Interfaz hermosa con animaciones suaves',
    fullFeatured: 'Funcionalidad completa',
    fullFeaturedDesc: 'Niveles de prioridad, fechas límite, categorías y más',
    builtWithReact: 'Construido con React',
    builtWithReactDesc: 'TypeScript, Tailwind CSS y Shadcn UI',
    keyFeatures: 'Características clave',
    featureTaskManagement: 'Gestión de tareas con prioridades y fechas límite',
    featureThemes: 'Soporte para modo claro/oscuro',
    featureDragDrop: 'Reordenamiento por arrastre y suelta',
    featureAnalytics: 'Análisis y logros',
    featureResponsive: 'Diseño responsivo para todos los dispositivos',
    featureCalendar: 'Interfaz de calendario moderna',
    
    // Analytics
    trackProductivity: 'Sigue tu productividad y progreso a lo largo del tiempo.',
    successRate: 'Tasa de éxito',
    categoryBreakdown: 'Desglose por categorías',
    weeklyOverview: 'Resumen semanal',
    tasksCompletedThisWeek: 'Tareas completadas esta semana',
    recentActivity: 'Actividad reciente',
    dailyPerformance: 'Rendimiento diario (últimos 7 días)',

   
    noNotifications: 'Aún no hay notificaciones.',
    clearNotifications: 'Borrar Notificaciones',
    notificationsCleared: 'Notificaciones borradas',
    welcomeBackName: '¡Bienvenido de nuevo, {name}!',
    taskFetchFailed: 'No se pudieron cargar las tareas',
userFetchFailed: 'No se pudo obtener el usuario',
loginRequired: 'Por favor, inicia sesión para crear tareas',
taskCreateFailed: 'No se pudo crear la tarea',
taskImportFailed: 'No se pudo importar la tarea',
taskToggleFailed: 'No se pudo alternar la tarea',
taskPauseFailed: 'No se pudo pausar la tarea',
taskDeleteFailed: 'No se pudo eliminar la tarea',
taskReorderFailed: 'No se pudo reordenar las tareas',
profileUpdateFailed: 'No se pudo actualizar el perfil',
taskUpdateFailed: 'No se pudo actualizar la tarea',
taskRestored: '¡Tarea "{name}" restaurada del historial!',
taskPaused: '¡Tarea "{name}" pausada!',
taskResumed: '¡Tarea "{name}" reanudada!',
goodbye: '¡Adiós, {name}!',
appName: 'TaskMaster',
    appDescription: 'Tu compañero de productividad',
    createAccount: 'Crear cuenta',
    
    fullName: 'Nombre completo',
    
    password: 'Contraseña',
    signUp: 'Registrarse',
    signIn: 'Iniciar sesión',
    alreadyHaveAccount: '¿Ya tienes una cuenta?',
    dontHaveAccount: '¿No tienes una cuenta?',
    
    success: 'Éxito',
    accountCreated: '¡Cuenta creada!',
    signedIn: '¡Sesión iniciada!',
    error: 'Error',
    
    // Calendar
    planOrganize: 'Planifica y organiza tus tareas por fecha.',
    taskCalendar: 'Calendario de tareas',
    allComplete: 'Todo completado',
    partial: 'Parcial',
    pending: 'Pendiente',
    upcomingTasks: 'Tareas próximas',
    noUpcomingTasks: 'No hay tareas próximas',
    tasksFor: 'Tareas para'
  },
  fr: {
    // Navigation
    dashboard: 'Tableau de bord',
    tasks: 'Tâches',
    analytics: 'Analytique',
    calendar: 'Calendrier',
    profile: 'Profil',
    about: 'À propos',
    
    // Common
    create: 'Créer',
    edit: 'Modifier',
    delete: 'Supprimer',
    save: 'Enregistrer',
    cancel: 'Annuler',
    close: 'Fermer',
    share: 'Partager',
    search: 'Rechercher',
    filter: 'Filtrer',
    all: 'Tous',
    none: 'Aucun',
    
    // Profile
    profileInformation: 'Informations du profil',
    name: 'Nom',
    email: 'E-mail',
    updateProfile: 'Mettre à jour le profil',
    profilePicture: 'Photo de profil',
    uploadPicture: 'Télécharger une image',
    selectFromDevice: 'Sélectionner depuis l’appareil',
    
    // Task Modal
    createTask: 'Créer une tâche',
    editTask: 'Modifier la tâche',
    taskName: 'Nom de la tâche',
    date: 'Date',
    startingTime: 'Heure de début',
    priorityLevel: 'Niveau de priorité',
    deadline: 'Date limite',
    remindMe: 'Me rappeler',
    category: 'Catégorie',
    
    // Tasks
    totalTasks: 'Total des tâches',
    completed: 'Terminées',
    remaining: 'Restantes',
    filtersSearch: 'Filtres et recherche',
    searchTasks: 'Rechercher des tâches...',
    todayTasks: 'Tâches d’aujourd’hui',
    noTasksScheduled: 'Aucune tâche planifiée pour aujourd’hui',
    completionRate: 'Taux de complétion',
    todayProgress: 'Progrès d’aujourd’hui',
    
    // Categories
    study: 'Études',
    work: 'Travail',
    life: 'Vie personnelle',
    health: 'Santé',
    personal: 'Personnel',
    productive: 'Productivité',
    
    // Priority
    low: 'Faible',
    medium: 'Moyen',
    high: 'Élevé',
    
    // History
    taskHistory: 'Historique des tâches',
    versions: 'Versions',
    restore: 'Restaurer',
    
    // Collaboration
    shareTask: 'Partager une tâche',
    collaboration: 'Collaboration',
    importTask: 'Importer une tâche partagée',
    pasteShareLink: 'Collez le lien partagé ici...',
    addSharedTask: 'Ajouter une tâche partagée',
    
    // Settings
    settings: 'Paramètres',
    language: 'Langue',
    theme: 'Thème',
    light: 'Clair',
    dark: 'Sombre',
    system: 'Système',
    notifications: 'Notifications',
    emailReminders: 'Rappels par e-mail',
    
    // Dashboard
    welcomeBack: 'Bon retour ! Voici un aperçu de votre productivité.',
    quickStats: 'Statistiques rapides',
    
    // Messages
    taskCreated: 'Tâche créée avec succès !',
    taskUpdated: 'Tâche mise à jour avec succès !',
    taskDeleted: 'Tâche supprimée !',
    taskCompleted: 'Tâche terminée !',
    taskReopened: 'Tâche rouverte !',
    profileUpdated: 'Profil mis à jour avec succès !',
    linkCopied: 'Lien copié !',
    shareLinkCopied: 'Le lien partagé a été copié dans le presse-papiers',
    taskImported: 'Tâche importée avec succès !',
    invalidLink: 'Lien partagé invalide',
    
    // About
    aboutTaskMaster: 'À propos de TaskMaster',
    aboutCreator: 'À propos du créateur',
    creatorDescription: 'Bonjour ! Je m’appelle Krish Yadav, un développeur full-stack passionné qui a créé TaskMaster pour aider les gens à organiser leurs tâches quotidiennes plus efficacement. Je crois en la création d’applications qui sont non seulement fonctionnelles, mais aussi belles et conviviales.',
    specializesIn: 'Spécialisé en React, TypeScript et technologies web modernes',
    passionateAbout: 'Passionné par la création d’expériences utilisateur intuitives',
    thankYou: 'Merci d’utiliser TaskMaster !',
    thankYouMessage: 'J’espère que TaskMaster vous aide à rester organisé et productif. Si vous avez des commentaires, des suggestions ou simplement envie de dire bonjour, n’hésitez pas à me contacter. Vos retours aident à rendre TaskMaster meilleur pour tous !',
    madeWithLove: 'Fait avec amour par Krish Yadav',
    projectDescription: 'TaskMaster est une application de gestion de tâches moderne et riche en fonctionnalités, construite avec des technologies web de pointe. Elle est conçue pour vous aider à rester organisé, productif et concentré sur ce qui compte le plus.',
    modernDesign: 'Design moderne',
    modernDesignDesc: 'Interface élégante avec des animations fluides',
    fullFeatured: 'Fonctionnalités complètes',
    fullFeaturedDesc: 'Niveaux de priorité, dates limites, catégories et plus',
    builtWithReact: 'Construit avec React',
    builtWithReactDesc: 'TypeScript, Tailwind CSS et Shadcn UI',
    keyFeatures: 'Fonctionnalités clés',
    featureTaskManagement: 'Gestion des tâches avec priorités et dates limites',
    featureThemes: 'Support des modes clair/sombre',
    featureDragDrop: 'Réorganisation par glisser-déposer',
    featureAnalytics: 'Analytique et réalisations',
    featureResponsive: 'Design responsive pour tous les appareils',
    featureCalendar: 'Interface de calendrier moderne',
    
    // Analytics
    trackProductivity: 'Suivez votre productivité et vos progrès au fil du temps.',
    successRate: 'Taux de réussite',
    categoryBreakdown: 'Répartition par catégorie',
    weeklyOverview: 'Aperçu hebdomadaire',
    tasksCompletedThisWeek: 'Tâches terminées cette semaine',
    recentActivity: 'Activité récente',
    dailyPerformance: 'Performance quotidienne (7 derniers jours)',

   
    noNotifications: 'Aucune notification pour le moment.',
    clearNotifications: 'Effacer les Notifications',
    notificationsCleared: 'Notifications effacées',
    welcomeBackName: 'Bon retour, {name} !',
    taskFetchFailed: 'Échec de la récupération des tâches',
userFetchFailed: 'Échec de la récupération de l’utilisateur',
loginRequired: 'Veuillez vous connecter pour créer des tâches',
taskCreateFailed: 'Échec de la création de la tâche',
taskImportFailed: 'Échec de l’importation de la tâche',
taskToggleFailed: 'Échec de la bascule de la tâche',
taskPauseFailed: 'Échec de la pause de la tâche',
taskDeleteFailed: 'Échec de la suppression de la tâche',
taskReorderFailed: 'Échec du réordonnancement des tâches',
profileUpdateFailed: 'Échec de la mise à jour du profil',
taskUpdateFailed: 'Échec de la mise à jour de la tâche',
taskRestored: 'Tâche "{name}" restaurée depuis l’historique !',
taskPaused: 'Tâche "{name}" mise en pause !',
taskResumed: 'Tâche "{name}" reprise !',
goodbye: 'Au revoir, {name} !',
appName: 'TaskMaster',
    appDescription: 'Votre compagnon de productivité',
    createAccount: 'Créer un compte',
    
    fullName: 'Nom complet',
   
    password: 'Mot de passe',
    signUp: 'S’inscrire',
    signIn: 'Se connecter',
    alreadyHaveAccount: 'Vous avez déjà un compte ?',
    dontHaveAccount: 'Vous n’avez pas de compte ?',
    
    success: 'Succès',
    accountCreated: 'Compte créé !',
    signedIn: 'Connecté !',
    error: 'Erreur',
    
    // Calendar
    planOrganize: 'Planifiez et organisez vos tâches par date.',
    taskCalendar: 'Calendrier des tâches',
    allComplete: 'Tout terminé',
    partial: 'Partiel',
    pending: 'En attente',
    upcomingTasks: 'Tâches à venir',
    noUpcomingTasks: 'Aucune tâche à venir',
    tasksFor: 'Tâches pour'
  },
  pt: {
    // Navigation
    dashboard: 'Painel',
    tasks: 'Tarefas',
    analytics: 'Análise',
    calendar: 'Calendário',
    profile: 'Perfil',
    about: 'Sobre',
    
    // Common
    create: 'Criar',
    edit: 'Editar',
    delete: 'Excluir',
    save: 'Salvar',
    cancel: 'Cancelar',
    close: 'Fechar',
    share: 'Compartilhar',
    search: 'Pesquisar',
    filter: 'Filtrar',
    all: 'Todos',
    none: 'Nenhum',
    
    // Profile
    profileInformation: 'Informações do perfil',
    name: 'Nome',
    email: 'E-mail',
    updateProfile: 'Atualizar perfil',
    profilePicture: 'Foto de perfil',
    uploadPicture: 'Carregar imagem',
    selectFromDevice: 'Selecionar do dispositivo',
    
    // Task Modal
    createTask: 'Criar tarefa',
    editTask: 'Editar tarefa',
    taskName: 'Nome da tarefa',
    date: 'Data',
    startingTime: 'Hora de início',
    priorityLevel: 'Nível de prioridade',
    deadline: 'Prazo',
    remindMe: 'Lembrar-me',
    category: 'Categoria',
    
    // Tasks
    totalTasks: 'Total de tarefas',
    completed: 'Concluídas',
    remaining: 'Restantes',
    filtersSearch: 'Filtros e pesquisa',
    searchTasks: 'Pesquisar tarefas...',
    todayTasks: 'Tarefas de hoje',
    noTasksScheduled: 'Nenhuma tarefa agendada para hoje',
    completionRate: 'Taxa de conclusão',
    todayProgress: 'Progresso de hoje',
    
    // Categories
    study: 'Estudo',
    work: 'Trabalho',
    life: 'Vida',
    health: 'Saúde',
    personal: 'Pessoal',
    productive: 'Produtivo',
    
    // Priority
    low: 'Baixa',
    medium: 'Média',
    high: 'Alta',
    
    // History
    taskHistory: 'Histórico de tarefas',
    versions: 'Versões',
    restore: 'Restaurar',
    
    // Collaboration
    shareTask: 'Compartilhar tarefa',
    collaboration: 'Colaboração',
    importTask: 'Importar tarefa compartilhada',
    pasteShareLink: 'Cole o link compartilhado aqui...',
    addSharedTask: 'Adicionar tarefa compartilhada',
    
    // Settings
    settings: 'Configurações',
    language: 'Idioma',
    theme: 'Tema',
    light: 'Claro',
    dark: 'Escuro',
    system: 'Sistema',
    notifications: 'Notificações',
    emailReminders: 'Lembretes por e-mail',
    
    // Dashboard
    welcomeBack: 'Bem-vindo de volta! Aqui está o resumo da sua produtividade.',
    quickStats: 'Estatísticas rápidas',
    
    // Messages
    taskCreated: 'Tarefa criada com sucesso!',
    taskUpdated: 'Tarefa atualizada com sucesso!',
    taskDeleted: 'Tarefa excluída!',
    taskCompleted: 'Tarefa concluída!',
    taskReopened: 'Tarefa reaberta!',
    profileUpdated: 'Perfil atualizado com sucesso!',
    linkCopied: 'Link copiado!',
    shareLinkCopied: 'Link compartilhado copiado para a área de transferência',
    taskImported: 'Tarefa importada com sucesso!',
    invalidLink: 'Link compartilhado inválido',
    
    // About
    aboutTaskMaster: 'Sobre o TaskMaster',
    aboutCreator: 'Sobre o criador',
    creatorDescription: 'Olá! Sou Krish Yadav, um desenvolvedor full-stack apaixonado que criou o TaskMaster para ajudar as pessoas a organizar suas tarefas diárias de forma mais eficiente. Acredito em construir aplicativos que não são apenas funcionais, mas também bonitos e fáceis de usar.',
    specializesIn: 'Especializado em React, TypeScript e tecnologias web modernas',
    passionateAbout: 'Apaixonado por criar experiências de usuário intuitivas',
    thankYou: 'Obrigado por usar o TaskMaster!',
    thankYouMessage: 'Espero que o TaskMaster ajude você a se manter organizado e produtivo. Se você tiver feedback, sugestões ou apenas quiser dizer olá, sinta-se à vontade para entrar em contato. Sua opinião ajuda a tornar o TaskMaster melhor para todos!',
    madeWithLove: 'Feito com amor por Krish Yadav',
    projectDescription: 'TaskMaster é um aplicativo de gerenciamento de tarefas moderno e rico em recursos, construído com tecnologias web de ponta. Ele é projetado para ajudar você a se manter organizado, produtivo e focado no que mais importa.',
    modernDesign: 'Design moderno',
    modernDesignDesc: 'Interface bonita com animações suaves',
    fullFeatured: 'Recursos completos',
    fullFeaturedDesc: 'Níveis de prioridade, prazos, categorias e mais',
    builtWithReact: 'Construído com React',
    builtWithReactDesc: 'TypeScript, Tailwind CSS e Shadcn UI',
    keyFeatures: 'Recursos principais',
    featureTaskManagement: 'Gerenciamento de tarefas com prioridades e prazos',
    featureThemes: 'Suporte a modo claro/escuro',
    featureDragDrop: 'Reorganização por arrastar e soltar',
    featureAnalytics: 'Análise e conquistas',
    featureResponsive: 'Design responsivo para todos os dispositivos',
    featureCalendar: 'Interface de calendário moderna',
    
    // Analytics
    trackProductivity: 'Acompanhe sua produtividade e progresso ao longo do tempo.',
    successRate: 'Taxa de sucesso',
    categoryBreakdown: 'Divisão por categoria',
    weeklyOverview: 'Visão geral semanal',
    tasksCompletedThisWeek: 'Tarefas concluídas esta semana',
    recentActivity: 'Atividade recente',
    dailyPerformance: 'Desempenho diário (últimos 7 dias)',

    
    noNotifications: 'Ainda não há notificações.',
    clearNotifications: 'Limpar Notificações',
    notificationsCleared: 'Notificações limpas',
    welcomeBackName: 'Bem-vindo de volta, {name}!',
    taskFetchFailed: 'Falha ao buscar tarefas',
userFetchFailed: 'Falha ao buscar usuário',
loginRequired: 'Por favor, faça login para criar tarefas',
taskCreateFailed: 'Falha ao criar tarefa',
taskImportFailed: 'Falha ao importar tarefa',
taskToggleFailed: 'Falha ao alternar tarefa',
taskPauseFailed: 'Falha ao pausar tarefa',
taskDeleteFailed: 'Falha ao excluir tarefa',
taskReorderFailed: 'Falha ao reordenar tarefas',
profileUpdateFailed: 'Falha ao atualizar perfil',
taskUpdateFailed: 'Falha ao atualizar tarefa',
taskRestored: 'Tarefa "{name}" restaurada do histórico!',
taskPaused: 'Tarefa "{name}" pausada!',
taskResumed: 'Tarefa "{name}" retomada!',
goodbye: 'Adeus, {name}!',
appName: 'TaskMaster',
    appDescription: 'Seu companheiro de produtividade',
    createAccount: 'Criar conta',
   
    fullName: 'Nome completo',
   
    password: 'Senha',
    signUp: 'Cadastrar',
    signIn: 'Entrar',
    alreadyHaveAccount: 'Já tem uma conta?',
    dontHaveAccount: 'Não tem uma conta?',
   
    success: 'Sucesso',
    accountCreated: 'Conta criada!',
    signedIn: 'Conectado!',
    error: 'Erro',
    
    // Calendar
    planOrganize: 'Planeje e organize suas tarefas por data.',
    taskCalendar: 'Calendário de tarefas',
    allComplete: 'Tudo concluído',
    partial: 'Parcial',
    pending: 'Pendente',
    upcomingTasks: 'Tarefas futuras',
    noUpcomingTasks: 'Nenhuma tarefa futura',
    tasksFor: 'Tarefas para'
  },
  ur: {
    // Navigation
    dashboard: 'ڈیش بورڈ',
    tasks: 'ٹاسکس',
    analytics: 'تجزیات',
    calendar: 'کیلنڈر',
    profile: 'پروفائل',
    about: 'بارے میں',
    
    // Common
    create: 'بنائیں',
    edit: 'ترمیم کریں',
    delete: 'حذف کریں',
    save: 'محفوظ کریں',
    cancel: 'منسوخ کریں',
    close: 'بند کریں',
    share: 'شیئر کریں',
    search: 'تلاش کریں',
    filter: 'فلٹر',
    all: 'سب',
    none: 'کوئی نہیں',
    
    // Profile
    profileInformation: 'پروفائل کی معلومات',
    name: 'نام',
    email: 'ای میل',
    updateProfile: 'پروفائل اپ ڈیٹ کریں',
    profilePicture: 'پروفائل تصویر',
    uploadPicture: 'تصویر اپ لوڈ کریں',
    selectFromDevice: 'ڈیوائس سے منتخب کریں',
    
    // Task Modal
    createTask: 'ٹاسک بنائیں',
    editTask: 'ٹاسک ترمیم کریں',
    taskName: 'ٹاسک کا نام',
    date: 'تاریخ',
    startingTime: 'شروع کا وقت',
    priorityLevel: 'ترجیحی سطح',
    deadline: 'آخری تاریخ',
    remindMe: 'مجھے یاد دلائیں',
    category: 'زمرہ',
    
    // Tasks
    totalTasks: 'کل ٹاسکس',
    completed: 'مکمل',
    remaining: 'باقی',
    filtersSearch: 'فلٹرز اور تلاش',
    searchTasks: 'ٹاسکس تلاش کریں...',
    todayTasks: 'آج کے ٹاسکس',
    noTasksScheduled: 'آج کے لئے کوئی ٹاسکس شیڈول نہیں',
    completionRate: 'مکمل ہونے کی شرح',
    todayProgress: 'آج کی پیش رفت',
    
    // Categories
    study: 'مطالعہ',
    work: 'کام',
    life: 'زندگی',
    health: 'صحت',
    personal: 'ذاتی',
    productive: 'پیداواری',
    
    // Priority
    low: 'کم',
    medium: 'درمیانی',
    high: 'اعلیٰ',
    
    // History
    taskHistory: 'ٹاسک کی تاریخ',
    versions: 'ورژن',
    restore: 'بحال کریں',
    
    // Collaboration
    shareTask: 'ٹاسک شیئر کریں',
    collaboration: 'تعاون',
    importTask: 'مشترکہ ٹاسک درآمد کریں',
    pasteShareLink: 'یہاں شیئر لنک پیسٹ کریں...',
    addSharedTask: 'مشترکہ ٹاسک شامل کریں',
    
    // Settings
    settings: 'ترتیبات',
    language: 'زبان',
    theme: 'تھیم',
    light: 'ہلکا',
    dark: 'گہرا',
    system: 'سسٹم',
    notifications: 'اطلاعات',
    emailReminders: 'ای میل ریمائنڈرز',
    
    // Dashboard
    welcomeBack: 'خوش آمدید! یہ آپ کی پیداواریت کا جائزہ ہے۔',
    quickStats: 'فوری شماریات',
    
    // Messages
    taskCreated: 'ٹاسک کامیابی سے بنایا گیا!',
    taskUpdated: 'ٹاسک کامیابی سے اپ ڈیٹ کیا گیا!',
    taskDeleted: 'ٹاسک حذف کر دیا گیا!',
    taskCompleted: 'ٹاسک مکمل ہو گیا!',
    taskReopened: 'ٹاسک دوبارہ کھول دیا گیا!',
    profileUpdated: 'پروفائل کامیابی سے اپ ڈیٹ کیا گیا!',
    linkCopied: 'لنک کاپی کیا گیا!',
    shareLinkCopied: 'شیئر لنک کلپ بورڈ پر کاپی کیا گیا ہے',
    taskImported: 'ٹاسک کامیابی سے درآمد کیا گیا!',
    invalidLink: 'غلط شیئر لنک',
    
    // About
    aboutTaskMaster: 'ٹاسک ماسٹر کے بارے میں',
    aboutCreator: 'خالق کے بارے میں',
    creatorDescription: 'ہیلو! میں کرش یادو ہوں، ایک پرجوش فل اسٹیک ڈیولپر جس نے ٹاسک ماسٹر بنایا تاکہ لوگ اپنے روزمرہ کے ٹاسکس کو زیادہ موثر طریقے سے منظم کر سکیں۔ میرا ماننا ہے کہ ایسی ایپلی کیشنز بنانی چاہئیں جو نہ صرف فعال ہوں بلکہ خوبصورت اور صارف دوست بھی ہوں۔',
    specializesIn: 'ری ایکٹ، ٹائپ اسکرپٹ اور جدید ویب ٹیکنالوجیز میں مہارت',
    passionateAbout: 'بدیہی صارف تجربات بنانے کے لئے پرجوش',
    thankYou: 'ٹاسک ماسٹر استعمال کرنے کے لئے شکریہ!',
    thankYouMessage: 'مجھے امید ہے کہ ٹاسک ماسٹر آپ کو منظم اور پیداواری رہنے میں مدد کرتا ہے۔ اگر آپ کے پاس کوئی رائے، تجاویز ہیں، یا صرف ہیلو کہنا چاہتے ہیں، تو براہ کرم رابطہ کریں۔ آپ کا ان پٹ ٹاسک ماسٹر کو سب کے لئے بہتر بنانے میں مدد کرتا ہے!',
    madeWithLove: 'کرش یادو کے پیار سے بنایا گیا',
    projectDescription: 'ٹاسک ماسٹر ایک جدید، فیچر سے بھرپور ٹاسک مینجمنٹ ایپلی کیشن ہے جو جدید ویب ٹیکنالوجیز کے ساتھ بنائی گئی ہے۔ یہ آپ کو منظم، پیداواری اور اہم چیزوں پر مرکوز رہنے میں مدد دینے کے لئے ڈیزائن کی گئی ہے۔',
    modernDesign: 'جدید ڈیزائن',
    modernDesignDesc: 'خوبصورت یو آئی اور ہموار اینیمیشنز',
    fullFeatured: 'مکمل فیچرز',
    fullFeaturedDesc: 'ترجیحی سطحیں، آخری تاریخیں، زمرے اور مزید',
    builtWithReact: 'ری ایکٹ کے ساتھ بنایا گیا',
    builtWithReactDesc: 'ٹائپ اسکرپٹ، ٹیل ونڈ سی ایس ایس اور شاڈکن یو آئی',
    keyFeatures: 'اہم خصوصیات',
    featureTaskManagement: 'ترجیحات اور آخری تاریخیں کے ساتھ ٹاسک مینجمنٹ',
    featureThemes: 'ڈارک/لائٹ موڈ سپورٹ',
    featureDragDrop: 'ڈریگ اینڈ ڈراپ ری آرڈرنگ',
    featureAnalytics: 'تجزیات اور کامیابیاں',
    featureResponsive: 'تمام ڈیوائسز کے لئے ریسپانسیو ڈیزائن',
    featureCalendar: 'جدید کیلنڈر انٹرفیس',
    
    // Analytics
    trackProductivity: 'اپنی پیداواریت اور ترقی کو وقت کے ساتھ ٹریک کریں۔',
    successRate: 'کامیابی کی شرح',
    categoryBreakdown: 'زمرہ جات کی تقسیم',
    weeklyOverview: 'ہفتہ وار جائزہ',
    tasksCompletedThisWeek: 'اس ہفتے مکمل ہونے والے ٹاسکس',
    recentActivity: 'حالیہ سرگرمی',
    dailyPerformance: 'روزانہ کی کارکردگی (آخری 7 دن)',

    noNotifications: 'ابھی تک کوئی اطلاعات نہیں۔',
    clearNotifications: 'اطلاعات صاف کریں',
    notificationsCleared: 'اطلاعات صاف کی گئیں',
    welcomeBackName: 'خوش آمدید،{name}!',
    taskFetchFailed: 'ٹاسک لینے جا نہ سکے',
userFetchFailed: 'صارف حاصل کرنے میں ناکامی',
loginRequired: 'ٹاسک بنانے کے لیے براہ کرم لاگ ان کریں',
taskCreateFailed: 'ٹاسک بنانے میں ناکامی',
taskImportFailed: 'ٹاسک درآمد کرنے میں ناکامی',
taskToggleFailed: 'ٹاسک ٹوگل کرنے میں ناکامی',
taskPauseFailed: 'ٹاسک روکنے میں ناکامی',
taskDeleteFailed: 'ٹاسک حذف کرنے میں ناکامی',
taskReorderFailed: 'ٹاسکس کو ترتیب دینے میں ناکامی',
profileUpdateFailed: 'پروفائل اپ ڈیٹ کرنے میں ناکامی',
taskUpdateFailed: 'ٹاسک اپ ڈیٹ کرنے میں ناکامی',
taskRestored: 'ٹاسک "{name}" تاریخ سے بحال کیا گیا!',
taskPaused: 'ٹاسک "{name}" روک دیا گیا!',
taskResumed: 'ٹاسک "{name}" دوبارہ شروع کیا گیا!',
goodbye: 'خداحافظ، {name}!',
appName: 'ٹاسک ماسٹر',
    appDescription: 'آپ کا پیداواری ساتھی',
    createAccount: 'اکاؤنٹ بنائیں',
   
    fullName: 'پورا نام',
   
    password: 'پاس ورڈ',
    signUp: 'سائن اپ',
    signIn: 'سائن ان',
    alreadyHaveAccount: 'پہلے سے اکاؤنٹ ہے؟',
    dontHaveAccount: 'اکاؤنٹ نہیں ہے؟',
   
    success: 'کامیابی',
    accountCreated: 'اکاؤنٹ بن گیا!',
    signedIn: 'سائن ان ہو گیا!',
    error: 'خرابی',
    
    // Calendar
    planOrganize: 'اپنے ٹاسکس کو تاریخ کے مطابق منصوبہ بنائیں اور منظم کریں۔',
    taskCalendar: 'ٹاسک کیلنڈر',
    allComplete: 'سب مکمل',
    partial: 'جزوی',
    pending: 'زیر التوا',
    upcomingTasks: 'آنے والے ٹاسکس',
    noUpcomingTasks: 'کوئی آنے والے ٹاسکس نہیں',
    tasksFor: 'کے لئے ٹاسکس'
  },
  de: {
    // Navigation
    dashboard: 'Dashboard',
    tasks: 'Aufgaben',
    analytics: 'Analytik',
    calendar: 'Kalender',
    profile: 'Profil',
    about: 'Über',
    
    // Common
    create: 'Erstellen',
    edit: 'Bearbeiten',
    delete: 'Löschen',
    save: 'Speichern',
    cancel: 'Abbrechen',
    close: 'Schließen',
    share: 'Teilen',
    search: 'Suchen',
    filter: 'Filtern',
    all: 'Alle',
    none: 'Keine',
    
    // Profile
    profileInformation: 'Profilinformationen',
    name: 'Name',
    email: 'E-Mail',
    updateProfile: 'Profil aktualisieren',
    profilePicture: 'Profilbild',
    uploadPicture: 'Bild hochladen',
    selectFromDevice: 'Vom Gerät auswählen',
    
    // Task Modal
    createTask: 'Aufgabe erstellen',
    editTask: 'Aufgabe bearbeiten',
    taskName: 'Aufgabenname',
    date: 'Datum',
    startingTime: 'Startzeit',
    priorityLevel: 'Prioritätsstufe',
    deadline: 'Frist',
    remindMe: 'Erinnere mich',
    category: 'Kategorie',
    
    // Tasks
    totalTasks: 'Gesamtzahl Aufgaben',
    completed: 'Abgeschlossen',
    remaining: 'Ausstehend',
    filtersSearch: 'Filter & Suche',
    searchTasks: 'Aufgaben suchen...',
    todayTasks: 'Aufgaben heute',
    noTasksScheduled: 'Keine Aufgaben für heute geplant',
    completionRate: 'Abschlussquote',
    todayProgress: 'Fortschritt heute',
    
    // Categories
    study: 'Studium',
    work: 'Arbeit',
    life: 'Leben',
    health: 'Gesundheit',
    personal: 'Persönlich',
    productive: 'Produktiv',
    
    // Priority
    low: 'Niedrig',
    medium: 'Mittel',
    high: 'Hoch',
    
    // History
    taskHistory: 'Aufgabenverlauf',
    versions: 'Versionen',
    restore: 'Wiederherstellen',
    
    // Collaboration
    shareTask: 'Aufgabe teilen',
    collaboration: 'Zusammenarbeit',
    importTask: 'Geteilte Aufgabe importieren',
    pasteShareLink: 'Geteilten Link hier einfügen...',
    addSharedTask: 'Geteilte Aufgabe hinzufügen',
    
    // Settings
    settings: 'Einstellungen',
    language: 'Sprache',
    theme: 'Thema',
    light: 'Hell',
    dark: 'Dunkel',
    system: 'System',
    notifications: 'Benachrichtigungen',
    emailReminders: 'E-Mail-Erinnerungen',
    
    // Dashboard
    welcomeBack: 'Willkommen zurück! Hier ist dein Produktivitätsüberblick.',
    quickStats: 'Schnellstatistiken',
    
    // Messages
    taskCreated: 'Aufgabe erfolgreich erstellt!',
    taskUpdated: 'Aufgabe erfolgreich aktualisiert!',
    taskDeleted: 'Aufgabe gelöscht!',
    taskCompleted: 'Aufgabe abgeschlossen!',
    taskReopened: 'Aufgabe wieder geöffnet!',
    profileUpdated: 'Profil erfolgreich aktualisiert!',
    linkCopied: 'Link kopiert!',
    shareLinkCopied: 'Geteilter Link wurde in die Zwischenablage kopiert',
    taskImported: 'Aufgabe erfolgreich importiert!',
    invalidLink: 'Ungültiger geteilter Link',
    
    // About
    aboutTaskMaster: 'Über TaskMaster',
    aboutCreator: 'Über den Ersteller',
    creatorDescription: 'Hallo! Ich bin Krish Yadav, ein leidenschaftlicher Full-Stack-Entwickler, der TaskMaster entwickelt hat, um Menschen dabei zu helfen, ihre täglichen Aufgaben effizienter zu organisieren. Ich glaube an die Entwicklung von Anwendungen, die nicht nur funktional, sondern auch schön und benutzerfreundlich sind.',
    specializesIn: 'Spezialisiert auf React, TypeScript und moderne Webtechnologien',
    passionateAbout: 'Leidenschaftlich daran, intuitive Benutzererfahrungen zu schaffen',
    thankYou: 'Danke, dass du TaskMaster nutzt!',
    thankYouMessage: 'Ich hoffe, TaskMaster hilft dir, organisiert und produktiv zu bleiben. Wenn du Feedback, Vorschläge oder einfach nur hallo sagen möchtest, kontaktiere mich gerne. Dein Input hilft, TaskMaster für alle besser zu machen!',
    madeWithLove: 'Mit Liebe gemacht von Krish Yadav',
    projectDescription: 'TaskMaster ist eine moderne, funktionsreiche Aufgabenmanagement-Anwendung, die mit modernsten Webtechnologien entwickelt wurde. Sie ist darauf ausgelegt, dich organisiert, produktiv und fokussiert auf das Wesentliche zu halten.',
    modernDesign: 'Modernes Design',
    modernDesignDesc: 'Schöne Benutzeroberfläche mit flüssigen Animationen',
    fullFeatured: 'Umfassende Funktionen',
    fullFeaturedDesc: 'Prioritätsstufen, Fristen, Kategorien und mehr',
    builtWithReact: 'Mit React entwickelt',
    builtWithReactDesc: 'TypeScript, Tailwind CSS und Shadcn UI',
    keyFeatures: 'Hauptmerkmale',
    featureTaskManagement: 'Aufgabenmanagement mit Prioritäten und Fristen',
    featureThemes: 'Unterstützung für Hell-/Dunkelmodus',
    featureDragDrop: 'Drag-and-Drop-Neuanordnung',
    featureAnalytics: 'Analytik und Erfolge',
    featureResponsive: 'Responsives Design für alle Geräte',
    featureCalendar: 'Moderne Kalenderoberfläche',
    
    // Analytics
    trackProductivity: 'Verfolge deine Produktivität und Fortschritte über die Zeit.',
    successRate: 'Erfolgsquote',
    categoryBreakdown: 'Kategorieaufteilung',
    weeklyOverview: 'Wöchentliche Übersicht',
    tasksCompletedThisWeek: 'Diese Woche abgeschlossene Aufgaben',
    recentActivity: 'Kürzliche Aktivität',
    dailyPerformance: 'Tägliche Leistung (letzte 7 Tage)',

   
    noNotifications: 'Noch keine Benachrichtigungen.',
    clearNotifications: 'Benachrichtigungen Löschen',
    notificationsCleared: 'Benachrichtigungen gelöscht',
    welcomeBackName: 'Willkommen zurück, {name}!',
    taskFetchFailed: 'Aufgaben konnten nicht abgerufen werden',
userFetchFailed: 'Benutzer konnte nicht abgerufen werden',
loginRequired: 'Bitte melden Sie sich an, um Aufgaben zu erstellen',
taskCreateFailed: 'Aufgabe konnte nicht erstellt werden',
taskImportFailed: 'Aufgabe konnte nicht importiert werden',
taskToggleFailed: 'Aufgabe konnte nicht umgeschaltet werden',
taskPauseFailed: 'Aufgabe konnte nicht pausiert werden',
taskDeleteFailed: 'Aufgabe konnte nicht gelöscht werden',
taskReorderFailed: 'Aufgaben konnten nicht neu geordnet werden',
profileUpdateFailed: 'Profil konnte nicht aktualisiert werden',
taskUpdateFailed: 'Aufgabe konnte nicht aktualisiert werden',
taskRestored: 'Aufgabe "{name}" aus dem Verlauf wiederhergestellt!',
taskPaused: 'Aufgabe "{name}" pausiert!',
taskResumed: 'Aufgabe "{name}" fortgesetzt!',
goodbye: 'Auf Wiedersehen, {name}!',
appName: 'TaskMaster',
    appDescription: 'Ihr Produktivitätsbegleiter',
    createAccount: 'Konto erstellen',
   
    fullName: 'Vollständiger Name',
   
    password: 'Passwort',
    signUp: 'Registrieren',
    signIn: 'Anmelden',
    alreadyHaveAccount: 'Haben Sie bereits ein Konto?',
    dontHaveAccount: 'Haben Sie kein Konto?',
   
    success: 'Erfolg',
    accountCreated: 'Konto erstellt!',
    signedIn: 'Angemeldet!',
    error: 'Fehler',
    
    // Calendar
    planOrganize: 'Plane und organisiere deine Aufgaben nach Datum.',
    taskCalendar: 'Aufgabenkalender',
    allComplete: 'Alles abgeschlossen',
    partial: 'Teilweise',
    pending: 'Ausstehend',
    upcomingTasks: 'Kommende Aufgaben',
    noUpcomingTasks: 'Keine kommenden Aufgaben',
    tasksFor: 'Aufgaben für'
  },
  ja: {
    // Navigation
    dashboard: 'ダッシュボード',
    tasks: 'タスク',
    analytics: '分析',
    calendar: 'カレンダー',
    profile: 'プロフィール',
    about: '概要',
    
    // Common
    create: '作成',
    edit: '編集',
    delete: '削除',
    save: '保存',
    cancel: 'キャンセル',
    close: '閉じる',
    share: '共有',
    search: '検索',
    filter: 'フィルター',
    all: 'すべて',
    none: 'なし',
    
    // Profile
    profileInformation: 'プロフィール情報',
    name: '名前',
    email: 'メール',
    updateProfile: 'プロフィールを更新',
    profilePicture: 'プロフィール画像',
    uploadPicture: '画像をアップロード',
    selectFromDevice: 'デバイスから選択',
    
    // Task Modal
    createTask: 'タスクを作成',
    editTask: 'タスクを編集',
    taskName: 'タスク名',
    date: '日付',
    startingTime: '開始時間',
    priorityLevel: '優先度',
    deadline: '期限',
    remindMe: 'リマインドする',
    category: 'カテゴリー',
    
    // Tasks
    totalTasks: 'タスクの総数',
    completed: '完了',
    remaining: '未完了',
    filtersSearch: 'フィルターと検索',
    searchTasks: 'タスクを検索...',
    todayTasks: '今日のタスク',
    noTasksScheduled: '今日の予定タスクはありません',
    completionRate: '完了率',
    todayProgress: '今日の進捗',
    
    // Categories
    study: '勉強',
    work: '仕事',
    life: '生活',
    health: '健康',
    personal: '個人',
    productive: '生産性',
    
    // Priority
    low: '低',
    medium: '中',
    high: '高',
    
    // History
    taskHistory: 'タスク履歴',
    versions: 'バージョン',
    restore: '復元',
    
    // Collaboration
    shareTask: 'タスクを共有',
    collaboration: 'コラボレーション',
    importTask: '共有タスクをインポート',
    pasteShareLink: 'ここに共有リンクを貼り付け...',
    addSharedTask: '共有タスクを追加',
    
    // Settings
    settings: '設定',
    language: '言語',
    theme: 'テーマ',
    light: 'ライト',
    dark: 'ダーク',
    system: 'システム',
    notifications: '通知',
    emailReminders: 'メールリマインダー',
    
    // Dashboard
    welcomeBack: 'おかえりなさい！これがあなたの生産性概要です。',
    quickStats: 'クイック統計',
    
    // Messages
    taskCreated: 'タスクが正常に作成されました！',
    taskUpdated: 'タスクが正常に更新されました！',
    taskDeleted: 'タスクが削除されました！',
    taskCompleted: 'タスクが完了しました！',
    taskReopened: 'タスクが再開されました！',
    profileUpdated: 'プロフィールが正常に更新されました！',
    linkCopied: 'リンクがコピーされました！',
    shareLinkCopied: '共有リンクがクリップボードにコピーされました',
    taskImported: 'タスクが正常にインポートされました！',
    invalidLink: '無効な共有リンク',
    
    // About
    aboutTaskMaster: 'TaskMasterについて',
    aboutCreator: '作成者について',
    creatorDescription: 'こんにちは！私はKrish Yadav、情熱的なフルスタックデベロッパーで、TaskMasterを作成し、人々が日常のタスクをより効率的に整理できるようにしました。機能的だけでなく、美しく使いやすいアプリケーションの構築を信じています。',
    specializesIn: 'React、TypeScript、最新のWeb技術に特化',
    passionateAbout: '直感的なユーザー体験の作成に情熱',
    thankYou: 'TaskMasterをご利用いただきありがとう！',
    thankYouMessage: 'TaskMasterがあなたを整理し、生産的に保つ助けになることを願っています。フィードバック、提案、またはただ挨拶したい場合は、気軽にご連絡ください。あなたの意見はTaskMasterをみんなにとってより良くするのに役立ちます！',
    madeWithLove: 'Krish Yadavによって愛を込めて作られました',
    projectDescription: 'TaskMasterは、最新のWeb技術を使用して構築された、モダンで機能豊富なタスク管理アプリケーションです。あなたが整理され、生産的で、最も重要なことに集中し続けるのを助けるように設計されています。',
    modernDesign: 'モダンなデザイン',
    modernDesignDesc: '滑らかなアニメーションを備えた美しいUI',
    fullFeatured: 'フル機能',
    fullFeaturedDesc: '優先度、期限、カテゴリーなど',
    builtWithReact: 'Reactで構築',
    builtWithReactDesc: 'TypeScript、Tailwind CSS、Shadcn UI',
    keyFeatures: '主な機能',
    featureTaskManagement: '優先度と期限付きのタスク管理',
    featureThemes: 'ダーク/ライトモードのサポート',
    featureDragDrop: 'ドラッグアンドドロップによる並べ替え',
    featureAnalytics: '分析と実績',
    featureResponsive: 'すべてのデバイスに対応するレスポンシブデザイン',
    featureCalendar: 'モダンなカレンダーインターフェース',
    
    // Analytics
    trackProductivity: '時間とともに生産性と進捗を追跡します。',
    successRate: '成功率',
    categoryBreakdown: 'カテゴリー内訳',
    weeklyOverview: '週間概要',
    tasksCompletedThisWeek: '今週完了したタスク',
    recentActivity: '最近の活動',
    dailyPerformance: '日次パフォーマンス（過去7日間）',

    
    noNotifications: 'まだ通知はありません。',
    clearNotifications: '通知をクリア',
    notificationsCleared: '通知がクリアされました',
    welcomeBackName: 'おかえりなさい、{name}！',
    taskFetchFailed: 'タスクの取得に失敗しました',
userFetchFailed: 'ユーザーの取得に失敗しました',
loginRequired: 'タスクを作成するにはログインしてください',
taskCreateFailed: 'タスクの作成に失敗しました',
taskImportFailed: 'タスクのインポートに失敗しました',
taskToggleFailed: 'タスクの切り替えに失敗しました',
taskPauseFailed: 'タスクの一時停止に失敗しました',
taskDeleteFailed: 'タスクの削除に失敗しました',
taskReorderFailed: 'タスクの並べ替えに失敗しました',
profileUpdateFailed: 'プロファイルの更新に失敗しました',
taskUpdateFailed: 'タスクの更新に失敗しました',
taskRestored: 'タスク"{name}"が履歴から復元されました！',
taskPaused: 'タスク"{name}"が一時停止されました！',
taskResumed: 'タスク"{name}"が再開されました！',
goodbye: 'さようなら、{name}！',
appName: 'タスクマスター',
    appDescription: 'あなたの生産性のパートナー',
    createAccount: 'アカウントを作成',
   
    fullName: 'フルネーム',
   
    password: 'パスワード',
    signUp: 'サインアップ',
    signIn: 'サインイン',
    alreadyHaveAccount: 'すでにアカウントをお持ちですか？',
    dontHaveAccount: 'アカウントをお持ちではありませんか？',
   
    success: '成功',
    accountCreated: 'アカウントが作成されました！',
    signedIn: 'サインインしました！',
    error: 'エラー',
    
    // Calendar
    planOrganize: '日付ごとにタスクを計画し、整理します。',
    taskCalendar: 'タスクカレンダー',
    allComplete: 'すべて完了',
    partial: '部分完了',
    pending: '保留中',
    upcomingTasks: '近日中のタスク',
    noUpcomingTasks: '近日中のタスクはありません',
    tasksFor: 'のためのタスク'
  },
  id: {
    // Navigation
    dashboard: 'Dasbor',
    tasks: 'Tugas',
    analytics: 'Analitik',
    calendar: 'Kalender',
    profile: 'Profil',
    about: 'Tentang',
    
    // Common
    create: 'Buat',
    edit: 'Edit',
    delete: 'Hapus',
    save: 'Simpan',
    cancel: 'Batal',
    close: 'Tutup',
    share: 'Bagikan',
    search: 'Cari',
    filter: 'Filter',
    all: 'Semua',
    none: 'Tidak ada',
    
    // Profile
    profileInformation: 'Informasi Profil',
    name: 'Nama',
    email: 'Email',
    updateProfile: 'Perbarui Profil',
    profilePicture: 'Foto Profil',
    uploadPicture: 'Unggah Gambar',
    selectFromDevice: 'Pilih dari Perangkat',
    
    // Task Modal
    createTask: 'Buat Tugas',
    editTask: 'Edit Tugas',
    taskName: 'Nama Tugas',
    date: 'Tanggal',
    startingTime: 'Waktu Mulai',
    priorityLevel: 'Tingkat Prioritas',
    deadline: 'Batas Waktu',
    remindMe: 'Ingatkan Saya',
    category: 'Kategori',
    
    // Tasks
    totalTasks: 'Total Tugas',
    completed: 'Selesai',
    remaining: 'Tersisa',
    filtersSearch: 'Filter & Pencarian',
    searchTasks: 'Cari tugas...',
    todayTasks: 'Tugas Hari Ini',
    noTasksScheduled: 'Tidak ada tugas yang dijadwalkan untuk hari ini',
    completionRate: 'Tingkat Penyelesaian',
    todayProgress: 'Kemajuan Hari Ini',
    
    // Categories
    study: 'Belajar',
    work: 'Kerja',
    life: 'Hidup',
    health: 'Kesehatan',
    personal: 'Pribadi',
    productive: 'Produktif',
    
    // Priority
    low: 'Rendah',
    medium: 'Sedang',
    high: 'Tinggi',
    
    // History
    taskHistory: 'Riwayat Tugas',
    versions: 'Versi',
    restore: 'Pulihkan',
    
    // Collaboration
    shareTask: 'Bagikan Tugas',
    collaboration: 'Kolaborasi',
    importTask: 'Impor Tugas Bersama',
    pasteShareLink: 'Tempel tautan berbagi di sini...',
    addSharedTask: 'Tambah Tugas Bersama',
    
    // Settings
    settings: 'Pengaturan',
    language: 'Bahasa',
    theme: 'Tema',
    light: 'Terang',
    dark: 'Gelap',
    system: 'Sistem',
    notifications: 'Notifikasi',
    emailReminders: 'Pengingat Email',
    
    // Dashboard
    welcomeBack: 'Selamat datang kembali! Ini adalah gambaran produktivitas Anda.',
    quickStats: 'Statistik Cepat',
    
    // Messages
    taskCreated: 'Tugas berhasil dibuat!',
    taskUpdated: 'Tugas berhasil diperbarui!',
    taskDeleted: 'Tugas dihapus!',
    taskCompleted: 'Tugas selesai!',
    taskReopened: 'Tugas dibuka kembali!',
    profileUpdated: 'Profil berhasil diperbarui!',
    linkCopied: 'Tautan disalin!',
    shareLinkCopied: 'Tautan berbagi telah disalin ke papan klip',
    taskImported: 'Tugas berhasil diimpor!',
    invalidLink: 'Tautan berbagi tidak valid',
    
    // About
    aboutTaskMaster: 'Tentang TaskMaster',
    aboutCreator: 'Tentang Pembuat',
    creatorDescription: 'Halo! Saya Krish Yadav, seorang pengembang full-stack yang bersemangat yang menciptakan TaskMaster untuk membantu orang mengatur tugas harian mereka dengan lebih efisien. Saya percaya pada pembuatan aplikasi yang tidak hanya fungsional tetapi juga indah dan ramah pengguna.',
    specializesIn: 'Spesialisasi dalam React, TypeScript, dan Teknologi Web Modern',
    passionateAbout: 'Bersemangat menciptakan pengalaman pengguna yang intuitif',
    thankYou: 'Terima kasih telah menggunakan TaskMaster!',
    thankYouMessage: 'Saya harap TaskMaster membantu Anda tetap teratur dan produktif. Jika Anda memiliki umpan balik, saran, atau hanya ingin menyapa, jangan ragu untuk menghubungi. Masukan Anda membantu menjadikan TaskMaster lebih baik untuk semua orang!',
    madeWithLove: 'Dibuat dengan cinta oleh Krish Yadav',
    projectDescription: 'TaskMaster adalah aplikasi manajemen tugas modern yang kaya fitur, dibuat dengan teknologi web mutakhir. Ini dirancang untuk membantu Anda tetap teratur, produktif, dan fokus pada hal yang paling penting.',
    modernDesign: 'Desain Modern',
    modernDesignDesc: 'UI yang indah dengan animasi halus',
    fullFeatured: 'Fitur Lengkap',
    fullFeaturedDesc: 'Tingkat prioritas, batas waktu, kategori, dan lainnya',
    builtWithReact: 'Dibuat dengan React',
    builtWithReactDesc: 'TypeScript, Tailwind CSS, dan Shadcn UI',
    keyFeatures: 'Fitur Utama',
    featureTaskManagement: 'Manajemen tugas dengan prioritas dan batas waktu',
    featureThemes: 'Dukungan mode terang/gelap',
    featureDragDrop: 'Pengurutan ulang dengan drag and drop',
    featureAnalytics: 'Analitik dan pencapaian',
    featureResponsive: 'Desain responsif untuk semua perangkat',
    featureCalendar: 'Antarmuka kalender modern',
    
    // Analytics
    trackProductivity: 'Lacak produktivitas dan kemajuan Anda dari waktu ke waktu.',
    successRate: 'Tingkat Keberhasilan',
    categoryBreakdown: 'Rincian Kategori',
    weeklyOverview: 'Tinjauan Mingguan',
    tasksCompletedThisWeek: 'Tugas selesai minggu ini',
    recentActivity: 'Aktivitas Terbaru',
    dailyPerformance: 'Kinerja Harian (7 Hari Terakhir)',

     noNotifications: 'Belum ada notifikasi.',
     clearNotifications: 'Hapus Notifikasi',
     notificationsCleared: 'Notifikasi dihapus',
     welcomeBackName: 'Selamat datang kembali, {name}!',
     taskFetchFailed: 'Gagal mengambil tugas',
userFetchFailed: 'Gagal mengambil pengguna',
loginRequired: 'Silakan masuk untuk membuat tugas',
taskCreateFailed: 'Gagal membuat tugas',
taskImportFailed: 'Gagal mengimpor tugas',
taskToggleFailed: 'Gagal mengalihkan tugas',
taskPauseFailed: 'Gagal menjeda tugas',
taskDeleteFailed: 'Gagal menghapus tugas',
taskReorderFailed: 'Gagal menyusun ulang tugas',
profileUpdateFailed: 'Gagal memperbarui profil',
taskUpdateFailed: 'Gagal memperbarui tugas',
taskRestored: 'Tugas "{name}" dipulihkan dari riwayat!',
taskPaused: 'Tugas "{name}" dijeda!',
taskResumed: 'Tugas "{name}" dilanjutkan!',
goodbye: 'Selamat tinggal, {name}!',
appName: 'TaskMaster',
    appDescription: 'Pendamping Produktivitas Anda',
    createAccount: 'Buat Akun',
    
    fullName: 'Nama Lengkap',
  
    password: 'Kata Sandi',
    signUp: 'Daftar',
    signIn: 'Masuk',
    alreadyHaveAccount: 'Sudah punya akun?',
    dontHaveAccount: 'Belum punya akun?',
   
    success: 'Sukses',
    accountCreated: 'Akun dibuat!',
    signedIn: 'Masuk berhasil!',
    error: 'Kesalahan',
    
    // Calendar
    planOrganize: 'Rencanakan dan atur tugas Anda berdasarkan tanggal.',
    taskCalendar: 'Kalender Tugas',
    allComplete: 'Semua Selesai',
    partial: 'Sebagian',
    pending: 'Tertunda',
    upcomingTasks: 'Tugas Mendatang',
    noUpcomingTasks: 'Tidak ada tugas mendatang',
    tasksFor: 'Tugas untuk'
  },
 ko: {
  // Navigation
  dashboard: '대시보드',
  tasks: '작업',
  analytics: '분석',
  calendar: '캘린더',
  profile: '프로필',
  about: '소개',
  
  // Common
  create: '생성',
  edit: '편집',
  delete: '삭제',
  save: '저장',
  cancel: '취소',
  close: '닫기',
  share: '공유',
  search: '검색',
  filter: '필터',
  all: '모두',
  none: '없음',
  
  // Profile
  profileInformation: '프로필 정보',
  name: '이름',
  email: '이메일',
  updateProfile: '프로필 업데이트',
  profilePicture: '프로필 사진',
  uploadPicture: '사진 업로드',
  selectFromDevice: '기기에서 선택',
  
  // Task Modal
  createTask: '작업 생성',
  editTask: '작업 편집',
  taskName: '작업 이름',
  date: '날짜',
  startingTime: '시작 시간',
  priorityLevel: '우선순위 수준',
  deadline: '마감일',
  remindMe: '알림 설정',
  category: '카테고리',
  
  // Tasks
  totalTasks: '총 작업 수',
  completed: '완료됨',
  remaining: '남음',
  filtersSearch: '필터 및 검색',
  searchTasks: '작업 검색...',
  todayTasks: '오늘의 작업',
  noTasksScheduled: '오늘 예정된 작업이 없습니다',
  completionRate: '완료율',
  todayProgress: '오늘의 진행 상황',
  
  // Categories
  study: '학습',
  work: '업무',
  life: '생활',
  health: '건강',
  personal: '개인',
  productive: '생산적',
  
  // Priority
  low: '낮음',
  medium: '중간',
  high: '높음',
  
  // History
  taskHistory: '작업 기록',
  versions: '버전',
  restore: '복원',
  
  // Collaboration
  shareTask: '작업 공유',
  collaboration: '협업',
  importTask: '공유 작업 가져오기',
  pasteShareLink: '여기에 공유 링크를 붙여넣으세요...',
  addSharedTask: '공유 작업 추가',
  
  // Settings
  settings: '설정',
  language: '언어',
  theme: '테마',
  light: '밝은',
  dark: '어두운',
  system: '시스템',
  notifications: '알림',
  emailReminders: '이메일 알림',
  
  // Dashboard
  welcomeBack: '다시 오신 것을 환영합니다! 생산성 개요입니다.',
  quickStats: '빠른 통계',
  
  // Messages
  taskCreated: '작업이 성공적으로 생성되었습니다!',
  taskUpdated: '작업이 성공적으로 업데이트되었습니다!',
  taskDeleted: '작업이 삭제되었습니다!',
  taskCompleted: '작업이 완료되었습니다!',
  taskReopened: '작업이 다시 열렸습니다!',
  profileUpdated: '프로필이 성공적으로 업데이트되었습니다!',
  linkCopied: '링크가 복사되었습니다!',
  shareLinkCopied: '공유 링크가 클립보드에 복사되었습니다',
  taskImported: '작업이 성공적으로 가져왔습니다!',
  invalidLink: '잘못된 공유 링크',
  
  // About
  aboutTaskMaster: 'TaskMaster 소개',
  aboutCreator: '창작자 소개',
  creatorDescription: '안녕하세요! 저는 Krish Yadav입니다. 사람들이 일상 작업을 더 효율적으로 관리할 수 있도록 TaskMaster를 만든 열정적인 풀스택 개발자입니다. 기능적일 뿐만 아니라 아름답고 사용자 친화적인 애플리케이션 개발을 믿습니다.',
  specializesIn: 'React, TypeScript, 현대 웹 기술 전문',
  passionateAbout: '직관적인 사용자 경험 창출에 열정적',
  thankYou: 'TaskMaster를 사용해 주셔서 감사합니다!',
  thankYouMessage: 'TaskMaster가 당신을 체계적이고 생산적으로 유지하는 데 도움이 되기를 바랍니다. 피드백, 제안, 또는 인사를 나누고 싶다면 언제든 연락 주세요. 당신의 의견은 TaskMaster를 모두에게 더 나은 앱으로 만드는 데 도움이 됩니다!',
  madeWithLove: 'Krish Yadav가 사랑으로 만들었습니다',
  projectDescription: 'TaskMaster는 최첨단 웹 기술로 구축된 현대적이고 기능이 풍부한 작업 관리 애플리케이션입니다. 체계적이고 생산적이며 가장 중요한 것에 집중할 수 있도록 설계되었습니다.',
  modernDesign: '현대적인 디자인',
  modernDesignDesc: '부드러운 애니메이션이 있는 아름다운 UI',
  fullFeatured: '완전한 기능',
  fullFeaturedDesc: '우선순위 수준, 마감일, 카테고리 등',
  builtWithReact: 'React로 구축',
  builtWithReactDesc: 'TypeScript, Tailwind CSS, Shadcn UI',
  keyFeatures: '주요 기능',
  featureTaskManagement: '우선순위와 마감일이 있는 작업 관리',
  featureThemes: '다크/라이트 모드 지원',
  featureDragDrop: '드래그 앤 드롭 재정렬',
  featureAnalytics: '분석 및 업적',
  featureResponsive: '모든 기기에 맞는 반응형 디자인',
  featureCalendar: '현대적인 캘린더 인터페이스',
  
  // Analytics
  trackProductivity: '시간에 따른 생산성과 진행 상황을 추적하세요.',
  successRate: '성공률',
  categoryBreakdown: '카테고리 분류',
  weeklyOverview: '주간 개요',
  tasksCompletedThisWeek: '이번 주 완료된 작업',
  recentActivity: '최근 활동',
  dailyPerformance: '일일 성과 (최근 7일)',

  
   noNotifications: '아직 알림이 없습니다.',
   clearNotifications: '알림 지우기',
   notificationsCleared: '알림이 지워졌습니다',

   welcomeBackName: '다시 오신 것을 환영합니다, {name}!',
   taskFetchFailed: '작업을 가져오지 못했습니다',
userFetchFailed: '사용자를 가져오지 못했습니다',
loginRequired: '작업을 생성하려면 로그인하세요',
taskCreateFailed: '작업 생성에 실패했습니다',
taskImportFailed: '작업 가져오기에 실패했습니다',
taskToggleFailed: '작업 전환에 실패했습니다',
taskPauseFailed: '작업 일시 중지에 실패했습니다',
taskDeleteFailed: '작업 삭제에 실패했습니다',
taskReorderFailed: '작업 재정렬에 실패했습니다',
profileUpdateFailed: '프로필 업데이트에 실패했습니다',
taskUpdateFailed: '작업 업데이트에 실패했습니다',
taskRestored: '작업 "{name}"이 기록에서 복원되었습니다!',
taskPaused: '작업 "{name}"이 일시 중지되었습니다!',
taskResumed: '작업 "{name}"이 재개되었습니다!',
goodbye: '안녕, {name}!',
appName: '태스크마스터',
    appDescription: '당신의 생산성 동반자',
    createAccount: '계정 생성',
   
    fullName: '전체 이름',
   
    password: '비밀번호',
    signUp: '가입',
    signIn: '로그인',
    alreadyHaveAccount: '이미 계정이 있으신가요?',
    dontHaveAccount: '계정이 없으신가요?',
    
    success: '성공',
    accountCreated: '계정이 생성되었습니다!',
    signedIn: '로그인되었습니다!',
    error: '오류',
  
  // Calendar
  planOrganize: '날짜별로 작업을 계획하고 정리하세요.',
  taskCalendar: '작업 캘린더',
  allComplete: '모두 완료',
  partial: '부분 완료',
  pending: '보류 중',
  upcomingTasks: '예정 작업',
  noUpcomingTasks: '예정된 작업이 없습니다',
  tasksFor: '작업 대상'
}
};

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<string>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && translations[savedLanguage]) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: string) => {
    if (translations[lang]) {
      setLanguageState(lang);
      localStorage.setItem('language', lang);
    }
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};