import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowRight, FiChevronLeft, FiChevronRight, FiSearch, FiFileText, FiTarget } from 'react-icons/fi';
import Logo from '../components/Logo';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const scrollRef = useRef(null);
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
  
  // Features data
  const features = [
    {
      icon: <FiSearch className="w-8 h-8 text-primary" />,
      title: t.intelligentParsing,
      description: t.intelligentParsingDesc
    },
    {
      icon: <FiFileText className="w-8 h-8 text-primary" />,
      title: t.efficientMatching,
      description: t.efficientMatchingDesc
    },
    {
      icon: <FiTarget className="w-8 h-8 text-primary" />,
      title: t.preciseRecommendation,
      description: t.preciseRecommendationDesc
    }
  ];
  
  return (
    <div ref={scrollRef} className="min-h-screen">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Logo />
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-primary transition-colors duration-200">{t.features}</a>
              <a href="#testimonials" className="text-gray-700 hover:text-primary transition-colors duration-200">{t.testimonials}</a>
              <a href="#download" className="text-gray-700 hover:text-primary transition-colors duration-200">{t.download}</a>
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {t.heroTitle}
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl mb-8 text-white text-opacity-90"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {t.heroSubtitle}
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <button 
                  onClick={() => handleAuthAction('register')} 
                  className="gradient-button flex items-center justify-center"
                >
                  {t.exploreButton}
                  <FiArrowRight className="ml-2" />
                </button>
                <button className="px-6 py-3 bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-30 transition-all duration-300">
                  {t.watchDemo}
                </button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2 mt-12 md:mt-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <motion.div className="relative w-full max-w-lg mx-auto">
                {/* 主图片 */}
                <motion.img 
                  src="/hero-job-search.png" 
                  alt="找个班上" 
                  className="w-full max-w-lg mx-auto relative z-10"
                  animate={{ 
                    y: [0, -10, 0],
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* 装饰光效 */}
                <motion.div 
                  className="absolute -bottom-10 -left-10 -right-10 h-20 bg-primary opacity-20 filter blur-xl rounded-full z-0"
                  animate={{ 
                    opacity: [0.1, 0.3, 0.1],
                    scale: [0.9, 1.1, 0.9],
                  }}
                  transition={{ 
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.featuresTitle || '强大功能'}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.featuresSubtitle || '我们提供最先进的求职匹配功能，帮助您找到理想的工作'}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="mb-4 inline-block p-3 bg-primary bg-opacity-10 rounded-lg">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
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
              {/* Sample testimonial */}
              <motion.div 
                className="bg-white p-8 rounded-xl shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                    <span className="text-primary font-bold">LZ</span>
                  </div>
                  <div>
                    <h4 className="font-bold">李先生</h4>
                    <p className="text-sm text-gray-500">软件工程师</p>
                  </div>
                </div>
                <p className="text-gray-600">"找个班上平台帮我找到了理想的工作，匹配度非常高，面试一次就成功了。感谢这个平台！"</p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-8 rounded-xl shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                    <span className="text-primary font-bold">WX</span>
                  </div>
                  <div>
                    <h4 className="font-bold">王女士</h4>
                    <p className="text-sm text-gray-500">产品经理</p>
                  </div>
                </div>
                <p className="text-gray-600">"这个平台分析我的技能非常精准，推荐的工作都很符合我的期望，省去了我大量筛选时间。"</p>
              </motion.div>
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
    </div>
  );
};

export default HomePage;