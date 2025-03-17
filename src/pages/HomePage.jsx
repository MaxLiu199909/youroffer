import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowRight, FiChevronLeft, FiChevronRight, FiSearch, FiFileText, FiTarget, FiX, FiVideo, FiMessageSquare, FiRotateCw, FiLayers, FiTrendingUp, FiArrowUp } from 'react-icons/fi';
import Logo from '../components/Logo';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { MdMenuBook, MdSearch, MdTune, MdAutorenew, MdMessage, MdDescription, MdSupportAgent, MdAnalytics, MdTrendingUp, MdChecklist, MdAssignment, MdOutlineAutoAwesome } from 'react-icons/md';

// 动画常量
const FADE_IN_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const TRANSITION_DEFAULT = {
  duration: 0.5,
  ease: "easeOut" 
};

const TRANSITION_SLOW = {
  duration: 0.7,
  ease: "easeInOut" 
};

const STAGGER_VARIANTS = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut"
    }
  })
};

const FEATURE_ICON_VARIANTS = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 10
    }
  }
};

const SCALE_IN_VARIANTS = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 }
};

const INFINITE_TRANSITION = { 
  duration: 5, 
  repeat: Infinity, 
  ease: "easeInOut" 
};

const HomePage = () => {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  const handleAuthAction = (action) => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/auth', { state: { action } });
    }
  };
  
  const toggleDemoModal = () => {
    setShowDemoModal(!showDemoModal);
  };
  
  // 视频演示模态框组件
  const DemoVideoModal = ({ isVisible, onClose, t }) => {
    if (!isVisible) return null;
    
    return (
      <motion.div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        }}
        transition={TRANSITION_DEFAULT}
        style={{ willChange: 'opacity' }}
      >
        <motion.div 
          className="relative bg-white rounded-lg w-11/12 max-w-3xl p-4"
          variants={SCALE_IN_VARIANTS}
          transition={{...TRANSITION_DEFAULT, delay: 0.1}}
          style={{ willChange: 'transform, opacity' }}
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <FiX size={24} />
          </button>
          <h3 className="text-2xl font-bold mb-4 text-gray-800">{t.demoVideoTitle || '产品演示视频'}</h3>
          <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-md">
            {/* 这里可以替换为实际的视频链接 */}
            <iframe 
              className="w-full h-full rounded-md"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
              title="产品演示视频"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="mt-4 text-center">
            <button 
              onClick={onClose}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-300"
            >
              {t.closeBtn || '关闭'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  };
  
  // Features data
  const features = [
    {
      icon: <FiLayers className="w-8 h-8 text-primary" />,
      title: t.intelligentParsing,
      description: t.intelligentParsingDesc
    },
    {
      icon: <FiMessageSquare className="w-8 h-8 text-primary" />,
      title: t.efficientMatching,
      description: t.efficientMatchingDesc
    },
    {
      icon: <FiTrendingUp className="w-8 h-8 text-primary" />,
      title: t.preciseRecommendation,
      description: t.preciseRecommendationDesc
    }
  ];
  
  // 用户评价数据
  const testimonials = [
    {
      initials: "LZ",
      name: "李先生",
      title: "软件工程师",
      testimonial: "找个班上平台帮我找到了理想的工作，匹配度非常高，面试一次就成功了。感谢这个平台！"
    },
    {
      initials: "WX",
      name: "王女士",
      title: "产品经理",
      testimonial: "这个平台分析我的技能非常精准，推荐的工作都很符合我的期望，省去了我大量筛选时间。"
    }
  ];
  
  // Feature卡片组件
  const FeatureCard = ({ feature, index }) => (
    <motion.div 
      key={index}
      className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={STAGGER_VARIANTS}
      custom={index}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary opacity-5 rounded-full -mr-16 -mt-16"></div>
      <div className="flex flex-col md:flex-row md:items-start relative z-10">
        <div className="mb-6 md:mb-0 md:mr-8">
          <motion.div 
            className="p-5 bg-primary bg-opacity-10 rounded-xl inline-flex items-center justify-center"
            variants={FEATURE_ICON_VARIANTS}
          >
            <div className="text-primary w-12 h-12">{feature.icon}</div>
          </motion.div>
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-5 text-gray-800">{feature.title}</h3>
          <div className="text-gray-600 space-y-4">
            {feature.description.split('；').map((point, idx) => (
              <div key={idx} className="flex items-start">
                <span className="text-primary font-bold mr-3 mt-0.5 text-lg">•</span>
                <p className="text-base leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
  
  // Feature分类卡片组件
  const FeatureCategory = ({ title, icon, subFeatures, index }) => (
    <motion.div 
      className="bg-white p-10 rounded-2xl shadow-lg transition-all duration-500 border border-gray-100 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={STAGGER_VARIANTS}
      custom={index}
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-5 rounded-full -mr-16 -mt-16"></div>
      <div className="flex flex-col space-y-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-6">
          <motion.div 
            className="p-4 bg-primary bg-opacity-10 rounded-xl inline-flex items-center justify-center mb-4"
            variants={FEATURE_ICON_VARIANTS}
          >
            <div className="text-primary w-10 h-10">{icon}</div>
          </motion.div>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">{title}</h3>
        </div>
        
        <div className="flex flex-wrap justify-center md:justify-start -mx-2">
          {subFeatures.map((subFeature, idx) => (
            <div key={idx} className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
              <motion.div 
                className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 h-full flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (idx * 0.1) }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col items-center text-center mb-3">
                  <div className="p-3 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center mb-3">
                    <div className="text-primary w-6 h-6">{subFeature.icon}</div>
                  </div>
                  <h4 className="text-base font-semibold text-gray-800">{subFeature.title}</h4>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed text-center">{subFeature.description}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
  
  // Testimonial卡片组件
  const TestimonialCard = ({ testimonial, delay = 0 }) => (
    <motion.div 
      className="bg-white p-8 rounded-xl shadow-sm"
      initial="hidden"
      whileInView="visible"
      variants={FADE_IN_VARIANTS}
      transition={{...TRANSITION_DEFAULT, delay}}
      viewport={{ once: true }}
      style={{ willChange: 'opacity, transform' }}
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-primary bg-opacity-20 rounded-full flex items-center justify-center mr-4">
          <span className="text-primary font-bold">{testimonial.initials}</span>
        </div>
        <div>
          <h4 className="font-bold">{testimonial.name}</h4>
          <p className="text-sm text-gray-500">{testimonial.title}</p>
        </div>
      </div>
      <p className="text-gray-600">"{testimonial.testimonial}"</p>
    </motion.div>
  );
  
  return (
    <div ref={scrollRef} className="min-h-screen">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-primary bg-opacity-95 backdrop-blur-sm shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Logo />
            
            <div className="hidden md:flex items-center space-x-10">
              <a href="#features" className="text-white hover:text-white hover:underline transition-all duration-200 font-medium">{t.features}</a>
              <a href="#testimonials" className="text-white hover:text-white hover:underline transition-all duration-200 font-medium">{t.testimonials}</a>
              <a href="#download" className="text-white hover:text-white hover:underline transition-all duration-200 font-medium">{t.download}</a>
              <LanguageSwitcher />
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => handleAuthAction('login')} 
                className="bg-white text-primary font-medium px-5 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-sm"
              >
                {t.login}
              </button>
              <button 
                onClick={() => handleAuthAction('register')} 
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium px-5 py-2 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200 shadow-md"
              >
                {t.register}
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center animated-background overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-white opacity-10"
            animate={{ 
              x: [0, 30, 0],
              y: [0, -30, 0],
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-white opacity-5"
            animate={{ 
              x: [0, -20, 0],
              y: [0, 20, 0],
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute top-2/3 left-1/3 w-32 h-32 rounded-lg rotate-45 bg-white opacity-10"
            animate={{ 
              rotate: [45, 90, 45],
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        <div className="container mx-auto px-4 z-10">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 text-center md:text-left text-white"
              style={{ opacity, scale, y }}
            >
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-6"
                initial="hidden"
                animate="visible"
                variants={FADE_IN_VARIANTS}
                transition={TRANSITION_SLOW}
                style={{ willChange: 'opacity, transform' }}
              >
                {t.heroTitle}
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl mb-4 text-white text-opacity-90"
                initial="hidden"
                animate="visible"
                variants={FADE_IN_VARIANTS}
                transition={{...TRANSITION_SLOW, delay: 0.2}}
                style={{ willChange: 'opacity, transform' }}
              >
                {t.heroSubtitle}
              </motion.p>
              <motion.p 
                className="text-xl md:text-2xl mb-8 text-white font-bold"
                initial="hidden"
                animate="visible"
                variants={FADE_IN_VARIANTS}
                transition={{...TRANSITION_SLOW, delay: 0.3}}
                style={{ willChange: 'opacity, transform' }}
              >
                {t.heroHighlight}
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
                initial="hidden"
                animate="visible"
                variants={FADE_IN_VARIANTS}
                transition={{...TRANSITION_SLOW, delay: 0.4}}
                style={{ willChange: 'opacity, transform' }}
              >
                <button 
                  onClick={() => handleAuthAction('register')} 
                  className="gradient-button flex items-center justify-center"
                >
                  {t.exploreButton}
                  <FiArrowRight className="ml-2" />
                </button>
                <button 
                  onClick={toggleDemoModal}
                  className="px-6 py-3 bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-30 transition-all duration-300"
                >
                  {t.watchDemo}
                </button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2 mt-12 md:mt-0"
              initial="hidden"
              animate="visible"
              variants={SCALE_IN_VARIANTS}
              transition={{...TRANSITION_SLOW, duration: 1, delay: 0.6}}
              style={{ willChange: 'opacity, transform' }}
            >
              <motion.div className="relative w-full max-w-lg mx-auto">
                {/* 主图片 */}
                <motion.img 
                  src="./hero-job-search.png" 
                  alt="找个班上" 
                  className="w-full max-w-lg mx-auto relative z-10"
                  animate={{ 
                    y: [0, -10, 0],
                  }}
                  transition={{
                    ...INFINITE_TRANSITION,
                    duration: 4
                  }}
                  style={{ willChange: 'transform' }}
                />
                
                {/* 装饰光效 */}
                <motion.div 
                  className="absolute -bottom-10 -left-10 -right-10 h-20 bg-primary opacity-20 filter blur-xl rounded-full z-0"
                  animate={{ 
                    opacity: [0.1, 0.3, 0.1],
                    scale: [0.9, 1.1, 0.9],
                  }}
                  transition={INFINITE_TRANSITION}
                  style={{ willChange: 'opacity, transform' }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent inline-block">{t.ourAdvantages}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.aiTechDescription}</p>
          </div>
          
          <div className="flex flex-col space-y-16 max-w-6xl mx-auto">
            {/* 不卷简历 轻松匹配 */}
            <FeatureCategory 
              title={t.intelligentParsing} 
              icon={<MdMenuBook className="w-8 h-8" />}
              subFeatures={[
                { title: t.resumeAI, description: t.resumeAIDesc, icon: <MdSearch className="w-8 h-8" /> },
                { title: t.matchAlgorithm, description: t.matchAlgorithmDesc, icon: <MdTune className="w-8 h-8" /> },
                { title: t.smartPush, description: t.smartPushDesc, icon: <MdAutorenew className="w-8 h-8" /> }
              ]} 
              index={0}
            />
            
            {/* 面试咖啡 稳拿Offer */}
            <FeatureCategory 
              title={t.efficientMatching} 
              icon={<MdMessage className="w-8 h-8" />}
              subFeatures={[
                { title: t.guaranteedInterview, description: t.guaranteedInterviewDesc, icon: <MdDescription className="w-8 h-8" /> },
                { title: t.aiCoach, description: t.aiCoachDesc, icon: <MdSupportAgent className="w-8 h-8" /> },
                { title: t.realTimeFeedback, description: t.realTimeFeedbackDesc, icon: <MdAnalytics className="w-8 h-8" /> }
              ]} 
              index={1}
            />
            
            {/* 技能充值 职场开挂 */}
            <FeatureCategory 
              title={t.preciseRecommendation} 
              icon={<MdTrendingUp className="w-8 h-8" />}
              subFeatures={[
                { title: t.skillGap, description: t.skillGapDesc, icon: <MdChecklist className="w-8 h-8" /> },
                { title: t.careerPath, description: t.careerPathDesc, icon: <MdAssignment className="w-8 h-8" /> },
                { title: t.resumeBoost, description: t.resumeBoostDesc, icon: <MdOutlineAutoAwesome className="w-8 h-8" /> }
              ]} 
              index={2}
            />
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.testimonialsTitle || '用户评价'}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.testimonialsSubtitle || '听听我们用户的真实反馈'}</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col space-y-6">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard 
                  key={index} 
                  testimonial={testimonial} 
                  delay={index * 0.1} 
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Download Section */}
      {/* CTA Section */}
      <section id="download" className="py-20 gradient-bg">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {t.manageAnywhere || '随时随地管理您的求职'}
              </motion.h2>
              <motion.p 
                className="text-white text-opacity-90 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {t.mobileAppDesc || '通过我们的移动应用程序，您可以随时接收面试邀请、管理简历，并与招聘人员保持联系。无论您身在何处，找工作从未如此便捷。'}
              </motion.p>
              
              <div className="flex space-x-4">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/1280px-Google_Play_Store_badge_EN.svg.png" alt="Google Play" className="h-12" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/1280px-Download_on_the_App_Store_Badge.svg.png" alt="App Store" className="h-12" />
              </div>
            </div>
            
            <div className="md:w-1/2 flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative"
              >
                <img 
                  src="https://assets.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e3a57bdb3717fbf9cec_Working_01.svg" 
                  alt="移动应用" 
                  className="w-full max-w-xs"
                />
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-4 w-48 text-center">
                  <div className="text-lg font-bold mb-2">{t.scanToDownload || '扫码下载'}</div>
                  <div className="bg-gray-200 w-32 h-32 mx-auto"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      {/* 视频演示模态框 */}
      <DemoVideoModal isVisible={showDemoModal} onClose={toggleDemoModal} t={t} />
    </div>
  );
};

export default HomePage;