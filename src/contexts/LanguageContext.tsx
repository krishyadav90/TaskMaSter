
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

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
  }
};

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && translations[savedLanguage]) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
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

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
