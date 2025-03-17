import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

const Logo = ({ size = 'medium', isDarkMode = false }) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const logoSizes = {
    small: 'h-6',
    medium: 'h-10',
    large: 'h-16'
  };

  return (
    <motion.div 
      className="flex items-center cursor-pointer"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      onClick={() => navigate('/')}
    >
      <motion.div 
        className={`${logoSizes[size]} aspect-square rounded-lg bg-white bg-opacity-20 flex items-center justify-center mr-2 overflow-hidden`}
        animate={{ 
          boxShadow: ['0 0 0 rgba(124, 58, 237, 0)', '0 0 20px rgba(124, 58, 237, 0.7)', '0 0 0 rgba(124, 58, 237, 0)'] 
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <motion.img
          src="/logo.png" 
          alt="找个班上"
          className="w-2/3 h-2/3 object-contain"
          animate={{ 
            rotate: [0, 180, 360],
            scale: [1, 0.8, 1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          onError={(e) => {
            // 如果logo图片加载失败，显示文字替代
            e.target.onerror = null;
            e.target.style.display = 'none';
            const textNode = document.createElement('div');
            textNode.className = 'w-2/3 h-2/3 bg-gradient-to-r from-primary to-primary-light rounded-md flex items-center justify-center text-white font-bold text-sm';
            textNode.innerText = 'YO';
            e.target.parentNode.appendChild(textNode);
          }}
        />
      </motion.div>
      <div className="font-bold">
        {language === 'zh' ? (
          <>
            <span className={`text-lg font-bold ${isDarkMode ? 'text-primary' : 'gradient-text'}`}>找个</span>
            <span className={`text-lg font-bold ${isDarkMode ? 'text-gray-800' : 'text-white'}`}>班上</span>
          </>
        ) : (
          <>
            <span className={`text-lg font-bold ${isDarkMode ? 'text-primary' : 'gradient-text'}`}>Find</span>
            <span className={`text-lg font-bold ${isDarkMode ? 'text-gray-800' : 'text-white'}`}>Class</span>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Logo;