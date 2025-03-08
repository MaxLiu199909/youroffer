import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiMapPin, FiVideo, FiUser, FiList, FiGrid, FiChevronLeft, FiHome } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import UserDropdown from '../components/UserDropdown';

const InterviewSchedule = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('calendar'); // 'calendar' or 'list'
  
  // 模拟面试数据
  const interviews = [
    {
      id: 1,
      company: '字节跳动',
      position: '高级前端工程师',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Bytedance_logo.svg/1280px-Bytedance_logo.svg.png',
      type: 'technical',
      date: '2025-03-10',
      time: '14:00-15:30',
      interviewer: '张工',
      location: '线上面试',
      platform: 'Zoom'
    },
    {
      id: 2,
      company: '腾讯',
      position: '全栈开发工程师',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Tencent_Logo.svg/1280px-Tencent_Logo.svg.png',
      type: 'hr',
      date: '2025-03-12',
      time: '10:00-11:00',
      interviewer: '李HR',
      location: '深圳市南山区腾讯大厦'
    },
    {
      id: 3,
      company: '阿里巴巴',
      position: '前端开发专家',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Alibaba_Group_logo.svg/1280px-Alibaba_Group_logo.svg.png',
      type: 'final',
      date: '2025-03-15',
      time: '16:00-17:00',
      interviewer: '王总监',
      location: '线上面试',
      platform: '钉钉'
    }
  ];

  // 获取面试类型信息
  const getInterviewTypeInfo = (type) => {
    switch(type) {
      case 'technical':
        return { text: '技术面试', color: 'bg-blue-100 text-blue-800' };
      case 'hr':
        return { text: 'HR面试', color: 'bg-green-100 text-green-800' };
      case 'final':
        return { text: '终面', color: 'bg-purple-100 text-purple-800' };
      default:
        return { text: '面试', color: 'bg-gray-100 text-gray-800' };
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 导航栏 */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Logo isDarkMode={true} size="medium" />
            <UserDropdown />
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {/* 页面标题和视图切换 */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <motion.button 
              className="flex items-center justify-center mr-4 p-2 rounded-full bg-gray-100 hover:bg-primary hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/dashboard')}
            >
              <FiChevronLeft className="text-lg" />
            </motion.button>
            <div className="flex items-center">
              <FiCalendar className="text-primary mr-2" />
              <h2 className="text-2xl font-bold">面试日程</h2>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <motion.button 
              className="flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-primary-light text-white shadow-sm hover:shadow-md transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/dashboard')}
            >
              <FiHome className="mr-2" />
              返回仪表盘
            </motion.button>
            <div className="flex bg-gray-100 rounded-lg p-1">
            <button 
              className={`px-4 py-2 rounded-md flex items-center ${viewMode === 'calendar' ? 'bg-white shadow-sm' : ''}`}
              onClick={() => setViewMode('calendar')}
            >
              <FiGrid className="mr-2" />
              日历视图
            </button>
            <button 
              className={`px-4 py-2 rounded-md flex items-center ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <FiList className="mr-2" />
              列表视图
            </button>
          </div>
          </div>
        </div>
        
        {/* 面试列表视图 */}
        <div className="space-y-4">
          {interviews.map(interview => (
            <motion.div 
              key={interview.id}
              className="bg-white rounded-xl shadow-sm p-6"
              whileHover={{ y: -2 }}
            >
              <div className="flex items-start gap-4">
                {/* 公司Logo */}
                <div className="w-12 h-12 flex-shrink-0 bg-white rounded-lg overflow-hidden border">
                  <img src={interview.logo} alt={interview.company} className="w-full h-full object-contain" />
                </div>
                
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{interview.position}</h3>
                      <p className="text-gray-700">{interview.company}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm ${getInterviewTypeInfo(interview.type).color}`}>
                      {getInterviewTypeInfo(interview.type).text}
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <FiCalendar className="mr-2" />
                      {interview.date} {interview.time}
                    </div>
                    <div className="flex items-center">
                      {interview.location === '线上面试' ? (
                        <>
                          <FiVideo className="mr-2" />
                          {interview.platform}面试
                        </>
                      ) : (
                        <>
                          <FiMapPin className="mr-2" />
                          {interview.location}
                        </>
                      )}
                    </div>
                    <div className="flex items-center">
                      <FiUser className="mr-2" />
                      面试官：{interview.interviewer}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default InterviewSchedule;
