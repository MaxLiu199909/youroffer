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
    heroHighlight: '(匹配成功，强制面试)',
    exploreButton: '开始探索',
    watchDemo: '观看演示',
    
    // Features section
    ourAdvantages: '超能力解锁 · 求职更轻松',
    aiTechDescription: '一站式求职神器，让找工作变得像玩游戏一样简单有趣',
    
    // Main Feature categories
    intelligentParsing: '不卷简历 轻松匹配',
    efficientMatching: '面试咖啡 稳拿Offer',
    preciseRecommendation: '技能充值 职场开挂',
    
    // Sub-features for "不卷简历 轻松匹配"
    resumeAI: '智能解析',
    resumeAIDesc: '上传简历就躺平，AI一键解锁你的隐藏技能',
    matchAlgorithm: '精准锁定',
    matchAlgorithmDesc: '22维算法，比相亲软件还懂你，岗位匹配直接拉满',
    smartPush: '躺赢投递',
    smartPushDesc: '每天智能推送高匹配岗位，简历海投不再内卷',
    
    // Sub-features for "面试咖啡 稳拿Offer"
    guaranteedInterview: '免战投递',
    guaranteedInterviewDesc: '匹配即面试，HR已阅不回？不存在的！',
    aiCoach: '模拟训练',
    aiCoachDesc: 'AI面试小助手陪你练，答案怎么说，轻松拿高分',
    realTimeFeedback: '实时打分',
    realTimeFeedbackDesc: '面试回答即时点评，答题失误立马纠正，告别社死',
    
    // Sub-features for "技能充值 职场开挂"
    skillGap: '技能清单',
    skillGapDesc: '想转行不知从何开始？一键解锁大神养成路线图',
    careerPath: '成长攻略',
    careerPathDesc: '想当产品经理？AI定制专属"养成计划"，技能拉满不是梦',
    resumeBoost: '简历变身',
    resumeBoostDesc: '让你的简历从"已读不回"到"疯狂邀约"',
    
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
    heroHighlight: 'Match successfully, guaranteed interview',
    exploreButton: 'Start Exploring',
    watchDemo: 'Watch Demo',
    
    // Features section
    ourAdvantages: 'Unlock Superpowers · Level Up Your Career',
    aiTechDescription: 'All-in-one job search solution that makes finding your dream job as fun as playing a game',
    
    // Main Feature categories
    intelligentParsing: 'Effortless Resume Matching',
    efficientMatching: 'Interview Success Guaranteed',
    preciseRecommendation: 'Level Up Your Career',
    
    // Sub-features for "Effortless Resume Matching"
    resumeAI: 'AI-powered Resume Analysis',
    resumeAIDesc: 'Upload once & chill: AI instantly unlocks your hidden talents',
    matchAlgorithm: 'Smart Matching Algorithm',
    matchAlgorithmDesc: 'Our 22-dimension algorithm knows you better than dating apps',
    smartPush: 'Daily Recommendations',
    smartPushDesc: 'Get high-match jobs without endless searching',
    
    // Sub-features for "Interview Success Guaranteed"
    guaranteedInterview: 'No More Ghosting',
    guaranteedInterviewDesc: 'Matching means interview, period!',
    aiCoach: 'AI Interview Coach',
    aiCoachDesc: 'Practice mode: AI interview buddy helps perfect your answers',
    realTimeFeedback: 'Real-time Feedback',
    realTimeFeedbackDesc: 'Instant corrections to avoid awkward moments',
    
    // Sub-features for "Level Up Your Career"
    skillGap: 'Skill Roadmap',
    skillGapDesc: 'Want to switch careers? Unlock your personalized path to success',
    careerPath: 'Growth Hacking',
    careerPathDesc: 'Want to be a Product Manager? AI creates your custom skill plan',
    resumeBoost: 'Resume Transformation',
    resumeBoostDesc: 'Turn "seen" into "invited"',
    
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