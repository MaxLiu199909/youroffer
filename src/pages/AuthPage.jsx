import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiPhone } from 'react-icons/fi';
import { FaWeixin, FaQq } from 'react-icons/fa';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import Confetti from 'react-confetti';
import Logo from '../components/Logo';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useAuth } from '../context/AuthContext';

const AuthPage = () => {
  const { t } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // 从location.state中获取初始tab状态
  const initialTab = location.state?.action === 'register' ? 'register' : 'login';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showWelcomeAnimation, setShowWelcomeAnimation] = useState(true);
  const [showSuccessConfetti, setShowSuccessConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // Hide welcome animation after 2 seconds
    const timer = setTimeout(() => {
      setShowWelcomeAnimation(false);
    }, 2000);

    // Update window size on resize for confetti
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Login with any credentials
    if (activeTab === 'login') {
      // Show success animation
      setShowSuccessConfetti(true);
      
      // Login the user (this will always succeed)
      login(email, password);
      
      // Redirect after a short delay to show the confetti
      setTimeout(() => {
        setShowSuccessConfetti(false);
        navigate('/onboarding');
      }, 1500);
    } else {
      // For registration, also just log them in
      setShowSuccessConfetti(true);
      login(email, password);
      setTimeout(() => {
        setShowSuccessConfetti(false);
        navigate('/onboarding');
      }, 1500);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Abstract geometric shapes for background
  const GeometricShapes = () => (
    <div className="absolute right-0 top-0 w-full h-full overflow-hidden z-0 opacity-20">
      <motion.div
        className="absolute top-[10%] right-[15%] w-32 h-32 rounded-full bg-purple-300"
        animate={{
          y: [0, 20, 0],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute top-[30%] right-[25%] w-24 h-24 rounded-lg bg-blue-300 rotate-12"
        animate={{
          rotate: [12, 45, 12],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute top-[60%] right-[10%] w-40 h-40 rounded-lg bg-indigo-300 -rotate-12"
        animate={{
          rotate: [-12, -45, -12],
          opacity: [0.7, 0.4, 0.7],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute top-[80%] right-[30%] w-20 h-20 rounded-full bg-purple-400"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center animated-background relative overflow-hidden">
      {showSuccessConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.1}
        />
      )}
      
      <GeometricShapes />
      
      {/* 3D Illustration */}
      <div className="hidden lg:block absolute left-[10%] z-10">
        <motion.img 
          src="https://img.freepik.com/free-vector/career-progress-concept-illustration_114360-9889.jpg"
          alt="Career progress illustration"
          className="w-96 h-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
      </div>
      
      {/* Auth Card */}
      <motion.div
        className="glass-card w-full max-w-md p-8 z-10 mx-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {showWelcomeAnimation ? (
          <motion.div 
            className="flex flex-col items-center justify-center h-80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Logo size="large" />
            <motion.h2 
              className="text-white text-2xl mt-6 font-medium"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {t.welcome}
            </motion.h2>
          </motion.div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <Logo size="small" />
              <LanguageSwitcher />
            </div>
            
            {/* Tabs */}
            <div className="flex mb-8 border-b border-white border-opacity-20">
              <button
                className={`tab-button flex-1 ${activeTab === 'login' ? 'active' : 'text-white text-opacity-70 hover:text-opacity-100'}`}
                onClick={() => handleTabChange('login')}
              >
                {t.loginTab}
              </button>
              <button
                className={`tab-button flex-1 ${activeTab === 'register' ? 'active' : 'text-white text-opacity-70 hover:text-opacity-100'}`}
                onClick={() => handleTabChange('register')}
              >
                {t.registerTab}
              </button>
            </div>
            
            {/* Form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'register' && (
                <div className="mb-4">
                  <label className="block text-white text-opacity-90 mb-2 text-sm font-medium">
                    <FiUser className="inline mr-2" />
                    {t.name}
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.enterName}
                    required={activeTab === 'register'}
                  />
                </div>
              )}
              
              <div className="mb-4">
                <label className="block text-white text-opacity-90 mb-2 text-sm font-medium">
                  <FiMail className="inline mr-2" />
                  {t.emailPhone}
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.enterEmailPhone}
                  required
                />
              </div>
              
              {activeTab === 'register' && (
                <div className="mb-4">
                  <label className="block text-white text-opacity-90 mb-2 text-sm font-medium">
                    <FiPhone className="inline mr-2" />
                    {t.phone}
                  </label>
                  <input
                    type="tel"
                    className="input-field"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t.enterPhone}
                    required={activeTab === 'register'}
                  />
                </div>
              )}
              
              <div className="mb-6">
                <label className="block text-white text-opacity-90 mb-2 text-sm font-medium">
                  <FiLock className="inline mr-2" />
                  {t.password}
                </label>
                <input
                  type="password"
                  className="input-field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={activeTab === 'login' ? t.enterPassword : t.setPassword}
                  required
                />
              </div>
              
              {activeTab === 'login' && (
                <div className="flex items-center justify-between mb-6">
                  <label className="flex items-center text-white text-opacity-80 text-sm">
                    <input
                      type="checkbox"
                      className="mr-2 h-4 w-4"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                    />
                    {t.rememberMe}
                  </label>
                  <a href="#" className="text-white text-opacity-80 text-sm hover:text-opacity-100 hover:underline transition-all duration-200">
                    {t.forgotPassword}
                  </a>
                </div>
              )}
              
              <button
                type="submit"
                className="gradient-button w-full flex items-center justify-center"
              >
                {activeTab === 'login' ? t.loginTab : t.registerTab}
              </button>
              
              <div className="mt-6 text-center">
                <p className="text-white text-opacity-70 text-sm mb-4">—— {t.or} ——</p>
                <div className="flex justify-center space-x-4">
                  <button type="button" className="social-button">
                    <FaWeixin className="text-green-600" />
                  </button>
                  <button type="button" className="social-button">
                    <FaQq className="text-blue-500" />
                  </button>
                  <button type="button" className="social-button">
                    <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                    </svg>
                  </button>
                  <button type="button" className="social-button">
                    <HiOutlineDotsHorizontal className="text-gray-500" />
                  </button>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-white text-opacity-80 text-sm">
                  {activeTab === 'login' ? t.firstTime : t.alreadyHaveAccount}
                  <button
                    type="button"
                    className="text-white font-medium hover:underline ml-1"
                    onClick={() => handleTabChange(activeTab === 'login' ? 'register' : 'login')}
                  >
                    {activeTab === 'login' ? t.createAccount : t.loginNow}
                  </button>
                </p>
              </div>
            </motion.form>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default AuthPage;