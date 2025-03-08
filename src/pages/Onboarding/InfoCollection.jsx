import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiBriefcase, FiDollarSign, FiTarget, FiX } from 'react-icons/fi';

const InfoCollection = ({ initialData, onComplete }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    desiredPosition: '',
    desiredCity: '',
    salaryRange: '',
    workType: '',
    interestedCompanies: [],
    industryPreference: '',
    workEnvironment: ''
  });
  
  const [customInput, setCustomInput] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  
  const questions = [
    {
      id: 'desiredPosition',
      title: '您期望的职位是什么？',
      icon: <FiBriefcase className="w-8 h-8" />,
      options: ['前端工程师', '后端工程师', '全栈工程师', '产品经理', '其他'],
      type: 'single',
      placeholder: '请输入您期望的职位'
    },
    {
      id: 'desiredCity',
      title: '您期望的工作城市是？',
      icon: <FiMapPin className="w-8 h-8" />,
      options: ['北京', '上海', '深圳', '杭州', '广州', '其他'],
      type: 'single',
      placeholder: '请输入您期望的城市'
    },
    {
      id: 'salaryRange',
      title: '您期望的薪资范围是？',
      icon: <FiDollarSign className="w-8 h-8" />,
      options: ['10k-15k', '15k-25k', '25k-35k', '35k-50k', '50k以上', '其他'],
      type: 'single',
      placeholder: '请输入您期望的薪资范围'
    },
    {
      id: 'workType',
      title: '您期望的工作类型是？',
      icon: <FiBriefcase className="w-8 h-8" />,
      options: ['全职', '兼职', '实习', '远程', '其他'],
      type: 'single',
      placeholder: '请输入您期望的工作类型'
    },
    {
      id: 'interestedCompanies',
      title: '您感兴趣的公司有哪些？',
      icon: <FiTarget className="w-8 h-8" />,
      options: ['字节跳动', '腾讯', '阿里巴巴', '百度', '美团', '京东', '其他'],
      type: 'multiple',
      placeholder: '请输入您感兴趣的公司'
    }
  ];

  const handleAnswer = (questionId, answer) => {
    if (answer === '其他') {
      setShowCustomInput(true);
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [questionId]: answer
    }));
    
    if (step < questions.length - 1) {
      setStep(prev => prev + 1);
      setShowCustomInput(false);
      setCustomInput('');
    } else {
      onComplete(formData);
    }
  };

  const handleCustomInputSubmit = () => {
    if (customInput.trim()) {
      const currentQuestion = questions[step];
      
      if (currentQuestion.type === 'multiple') {
        setFormData(prev => ({
          ...prev,
          [currentQuestion.id]: [...(prev[currentQuestion.id] || []), customInput]
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [currentQuestion.id]: customInput
        }));
      }
      
      if (step < questions.length - 1) {
        setStep(prev => prev + 1);
        setShowCustomInput(false);
        setCustomInput('');
      } else {
        onComplete(formData);
      }
    }
  };

  const currentQuestion = questions[step];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-16 h-16 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mx-auto mb-4"
        >
          {currentQuestion.icon}
        </motion.div>
        <h2 className="text-2xl font-bold mb-2">{currentQuestion.title}</h2>
        <div className="w-full bg-gray-200 rounded-full h-1 mt-8">
          <div
            className="bg-primary h-1 rounded-full transition-all duration-300"
            style={{ width: `${((step + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {showCustomInput ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {currentQuestion.placeholder}
            </label>
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
              placeholder={currentQuestion.placeholder}
              autoFocus
            />
          </div>
          
          <div className="flex justify-between">
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setShowCustomInput(false)}
            >
              返回选项
            </button>
            <button
              className="gradient-button"
              onClick={handleCustomInputSubmit}
              disabled={!customInput.trim()}
            >
              确认
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentQuestion.options.map((option, index) => (
            <motion.button
              key={option}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border-2 text-left hover:border-primary hover:bg-primary hover:bg-opacity-5 transition-all duration-200 ${
                currentQuestion.type === 'single'
                  ? formData[currentQuestion.id] === option
                    ? 'border-primary bg-primary bg-opacity-5'
                    : 'border-gray-200'
                  : formData[currentQuestion.id]?.includes(option)
                  ? 'border-primary bg-primary bg-opacity-5'
                  : 'border-gray-200'
              }`}
              onClick={() => {
                if (option === '其他') {
                  setShowCustomInput(true);
                } else if (currentQuestion.type === 'multiple') {
                  const current = formData[currentQuestion.id] || [];
                  const updated = current.includes(option)
                    ? current.filter(item => item !== option)
                    : [...current, option];
                  handleAnswer(currentQuestion.id, updated);
                } else {
                  handleAnswer(currentQuestion.id, option);
                }
              }}
            >
              <div className="font-medium mb-1">{option}</div>
              <div className="text-sm text-gray-500">
                {option === '其他' 
                  ? '输入自定义选项'
                  : `选择${option}作为您的${currentQuestion.title.replace('您期望的', '').replace('是？', '')}`
                }
              </div>
            </motion.button>
          ))}
        </div>
      )}
      
      {currentQuestion.type === 'multiple' && !showCustomInput && (
        <div className="mt-6 flex justify-end">
          <button
            className="gradient-button"
            onClick={() => {
              if (formData[currentQuestion.id]?.length > 0) {
                onComplete(formData);
              }
            }}
          >
            下一步
          </button>
        </div>
      )}
      
      {/* 显示已选择的自定义选项 */}
      {currentQuestion.type === 'multiple' && formData[currentQuestion.id]?.some(item => 
        !currentQuestion.options.includes(item)
      ) && (
        <div className="mt-4">
          <div className="text-sm font-medium text-gray-700 mb-2">已添加的自定义选项:</div>
          <div className="flex flex-wrap gap-2">
            {formData[currentQuestion.id]
              .filter(item => !currentQuestion.options.includes(item))
              .map((item, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-100 rounded-full px-3 py-1"
                >
                  <span className="text-sm">{item}</span>
                  <button
                    className="ml-2 text-gray-500 hover:text-gray-700"
                    onClick={() => {
                      const updated = formData[currentQuestion.id].filter(i => i !== item);
                      setFormData(prev => ({
                        ...prev,
                        [currentQuestion.id]: updated
                      }));
                    }}
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </div>
              ))
            }
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default InfoCollection;