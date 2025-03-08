import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';

const Complete = ({ onComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto text-center"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"
      >
        <FiCheckCircle className="w-10 h-10 text-green-500" />
      </motion.div>
      
      <h1 className="text-3xl font-bold mb-4">太棒了！</h1>
      <p className="text-gray-600 mb-8">
        您的个人信息已设置完成，我们已为您匹配了一些合适的职位
      </p>
      
      <button
        className="gradient-button"
        onClick={() => onComplete()}
      >
        开始探索
      </button>
    </motion.div>
  );
};

export default Complete;