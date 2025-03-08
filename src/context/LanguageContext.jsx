import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context for language
export const LanguageContext = createContext();

// Available languages
export const languages = {
  zh: {
    code: 'zh',
    name: '中文',
    flag: '🇨🇳'
  },
  en: {
    code: 'en',
    name: 'English',
    flag: '🇺🇸'
  }
};

// Translations
export const translations = {
  zh: {
    // Navigation
    features: '功能',
    testimonials: '用户评价',
    download: '下载',
    login: '登录',
    register: '注册',
    
    // Hero section
    heroTitle: '找工作只需要一步',
    heroSubtitle: '让简历和工作机会完美匹配',
    exploreButton: '开始探索',
    watchDemo: '观看演示',
    
    // Features section
    ourAdvantages: '我们的优势',
    aiTechDescription: '利用最先进的AI技术，为您提供个性化的求职体验',
    
    // Feature cards
    intelligentParsing: '智能解析',
    intelligentParsingDesc: 'AI技术自动解析简历，提取关键技能和经验',
    efficientMatching: '高效匹配',
    efficientMatchingDesc: '多维度分析职位需求，快速找到最适合的工作机会',
    preciseRecommendation: '精准推荐',
    preciseRecommendationDesc: '基于个人技能和职业发展方向，提供定制化职位推荐',
    
    // Stats section
    usersFound: '已有 10,000+ 用户找到理想工作',
    userSatisfaction: '用户满意度',
    interviewIncrease: '面试邀请增长',
    avgJobCycle: '平均求职周期',
    weeks: '周',
    
    // Partners section
    partners: '合作伙伴',
    
    // CTA section
    manageAnywhere: '随时随地管理您的求职',
    mobileAppDesc: '下载我们的移动应用，获得更便捷的求职体验。随时查看最新职位，接收面试通知，管理您的求职进度。',
    scanToDownload: '扫码下载',
    
    // Footer
    product: '产品',
    pricing: '定价',
    enterprise: '企业版',
    resources: '资源',
    blog: '博客',
    guides: '指南',
    helpCenter: '帮助中心',
    contactUs: '联系我们',
    allRightsReserved: '保留所有权利',
    
    // Auth page
    welcome: '欢迎回来',
    loginTab: '登录',
    registerTab: '注册',
    name: '姓名',
    enterName: '请输入您的姓名',
    emailPhone: '邮箱/手机号',
    enterEmailPhone: '请输入邮箱或手机号',
    phone: '手机号',
    enterPhone: '请输入手机号',
    password: '密码',
    enterPassword: '请输入密码',
    setPassword: '请设置密码',
    rememberMe: '记住我',
    forgotPassword: '忘记密码?',
    or: '或',
    firstTime: '首次使用?',
    createAccount: '创建账号',
    alreadyHaveAccount: '已有账号?',
    loginNow: '立即登录'
  },
  en: {
    // Navigation
    features: 'Features',
    testimonials: 'Testimonials',
    download: 'Download',
    login: 'Login',
    register: 'Register',
    
    // Hero section
    heroTitle: 'Job Search in Just One Step',
    heroSubtitle: 'Perfect matching between resumes and job opportunities',
    exploreButton: 'Start Exploring',
    watchDemo: 'Watch Demo',
    
    // Features section
    ourAdvantages: 'Our Advantages',
    aiTechDescription: 'Utilizing cutting-edge AI technology to provide personalized job-seeking experience',
    
    // Feature cards
    intelligentParsing: 'Intelligent Parsing',
    intelligentParsingDesc: 'AI technology automatically parses resumes and extracts key skills and experiences',
    efficientMatching: 'Efficient Matching',
    efficientMatchingDesc: 'Multi-dimensional analysis of job requirements to quickly find the most suitable opportunities',
    preciseRecommendation: 'Precise Recommendations',
    preciseRecommendationDesc: 'Customized job recommendations based on personal skills and career development direction',
    
    // Stats section
    usersFound: '10,000+ users have found their ideal jobs',
    userSatisfaction: 'User Satisfaction',
    interviewIncrease: 'Interview Invitation Growth',
    avgJobCycle: 'Average Job Search Cycle',
    weeks: 'weeks',
    
    // Partners section
    partners: 'Partners',
    
    // CTA section
    manageAnywhere: 'Manage Your Job Search Anytime, Anywhere',
    mobileAppDesc: 'Download our mobile app for a more convenient job-seeking experience. Check the latest positions, receive interview notifications, and manage your job search progress anytime.',
    scanToDownload: 'Scan to Download',
    
    // Footer
    product: 'Product',
    pricing: 'Pricing',
    enterprise: 'Enterprise',
    resources: 'Resources',
    blog: 'Blog',
    guides: 'Guides',
    helpCenter: 'Help Center',
    contactUs: 'Contact Us',
    allRightsReserved: 'All Rights Reserved',
    
    // Auth page
    welcome: 'Welcome Back',
    loginTab: 'Login',
    registerTab: 'Register',
    name: 'Name',
    enterName: 'Please enter your name',
    emailPhone: 'Email/Phone',
    enterEmailPhone: 'Please enter email or phone',
    phone: 'Phone',
    enterPhone: 'Please enter phone number',
    password: 'Password',
    enterPassword: 'Please enter password',
    setPassword: 'Please set password',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password?',
    or: 'or',
    firstTime: 'First time?',
    createAccount: 'Create Account',
    alreadyHaveAccount: 'Already have an account?',
    loginNow: 'Login Now'
  }
};

export const LanguageProvider = ({ children }) => {
  // Try to get language from localStorage, default to Chinese
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage && languages[savedLanguage] ? savedLanguage : 'zh';
  });

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Function to change language
  const changeLanguage = (langCode) => {
    if (languages[langCode]) {
      setLanguage(langCode);
    }
  };

  // Get current translations
  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t, languages }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};