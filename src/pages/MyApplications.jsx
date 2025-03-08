import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiFilter, FiChevronRight, FiCalendar, FiMapPin, FiDollarSign, FiCheckCircle, FiClock, FiEye, FiX, FiChevronLeft, FiHome } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import UserDropdown from '../components/UserDropdown';

const MyApplications = () => {
  const navigate = useNavigate();
  const [activeStatus, setActiveStatus] = useState('all');
  
  // 模拟申请数据
  const applications = [
    {
      id: 1,
      position: '高级前端工程师',
      company: '字节跳动',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Bytedance_logo.svg/1280px-Bytedance_logo.svg.png',
      location: '北京',
      salary: '30k-45k',
      appliedDate: '2025-02-15',
      status: 'interviewing',
      progress: 60,
      nextStep: '技术面试',
      nextStepDate: '2025-03-10'
    },
    {
      id: 2,
      position: '产品经理',
      company: '腾讯',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Tencent_Logo.svg/1280px-Tencent_Logo.svg.png',
      location: '深圳',
      salary: '35k-50k',
      appliedDate: '2025-02-20',
      status: 'reviewing',
      progress: 30,
      nextStep: '等待简历筛选',
      nextStepDate: null
    },
    {
      id: 3,
      position: '数据分析师',
      company: '阿里巴巴',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Alibaba_Group_logo.svg/1280px-Alibaba_Group_logo.svg.png',
      location: '杭州',
      salary: '25k-35k',
      appliedDate: '2025-02-10',
      status: 'rejected',
      progress: 100,
      nextStep: null,
      nextStepDate: null
    },
    {
      id: 4,
      position: 'UI设计师',
      company: '网易',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Netease_Logo.svg/1280px-Netease_Logo.svg.png',
      location: '杭州',
      salary: '20k-30k',
      appliedDate: '2025-02-25',
      status: 'pending',
      progress: 10,
      nextStep: '等待简历筛选',
      nextStepDate: null
    },
    {
      id: 5,
      position: '后端开发工程师',
      company: '百度',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Baidu_Logo.svg/1280px-Baidu_Logo.svg.png',
      location: '北京',
      salary: '30k-40k',
      appliedDate: '2025-02-18',
      status: 'offered',
      progress: 100,
      nextStep: '等待入职',
      nextStepDate: '2025-04-01'
    }
  ];
  
  // 根据状态筛选申请
  const filteredApplications = activeStatus === 'all' 
    ? applications 
    : applications.filter(app => app.status === activeStatus);
    
  // 获取状态文本和颜色
  const getStatusInfo = (status) => {
    switch(status) {
      case 'pending':
        return { text: '待处理', color: 'bg-yellow-100 text-yellow-800', icon: <FiClock className="mr-1" /> };
      case 'reviewing':
        return { text: '审核中', color: 'bg-blue-100 text-blue-800', icon: <FiEye className="mr-1" /> };
      case 'interviewing':
        return { text: '面试中', color: 'bg-purple-100 text-purple-800', icon: <FiCalendar className="mr-1" /> };
      case 'offered':
        return { text: '已录用', color: 'bg-green-100 text-green-800', icon: <FiCheckCircle className="mr-1" /> };
      case 'rejected':
        return { text: '已拒绝', color: 'bg-gray-100 text-gray-800', icon: <FiX className="mr-1" /> };
      default:
        return { text: '未知', color: 'bg-gray-100 text-gray-800', icon: null };
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
            <h1 className="text-2xl font-bold">我的申请</h1>
          </div>
          <motion.button 
            className="flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-primary-light text-white shadow-sm hover:shadow-md transition-all duration-300"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/dashboard')}
          >
            <FiHome className="mr-2" />
            返回仪表盘
          </motion.button>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 左侧筛选区域 */}
          <div className="w-full lg:w-1/4">
            <div className="sticky top-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center mb-6">
                  <FiFilter className="text-primary mr-2" />
                  <h3 className="text-lg font-medium">筛选申请</h3>
                </div>
                
                <div className="space-y-2">
                  <button 
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeStatus === 'all' ? 'bg-primary bg-opacity-10 text-primary' : 'hover:bg-gray-100'}`}
                    onClick={() => setActiveStatus('all')}
                  >
                    全部申请
                  </button>
                  <button 
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeStatus === 'pending' ? 'bg-primary bg-opacity-10 text-primary' : 'hover:bg-gray-100'}`}
                    onClick={() => setActiveStatus('pending')}
                  >
                    待处理
                  </button>
                  <button 
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeStatus === 'reviewing' ? 'bg-primary bg-opacity-10 text-primary' : 'hover:bg-gray-100'}`}
                    onClick={() => setActiveStatus('reviewing')}
                  >
                    审核中
                  </button>
                  <button 
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeStatus === 'interviewing' ? 'bg-primary bg-opacity-10 text-primary' : 'hover:bg-gray-100'}`}
                    onClick={() => setActiveStatus('interviewing')}
                  >
                    面试中
                  </button>
                  <button 
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeStatus === 'offered' ? 'bg-primary bg-opacity-10 text-primary' : 'hover:bg-gray-100'}`}
                    onClick={() => setActiveStatus('offered')}
                  >
                    已录用
                  </button>
                  <button 
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeStatus === 'rejected' ? 'bg-primary bg-opacity-10 text-primary' : 'hover:bg-gray-100'}`}
                    onClick={() => setActiveStatus('rejected')}
                  >
                    已拒绝
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* 右侧申请列表 */}
          <div className="w-full lg:w-3/4">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-6">我的申请 <span className="text-gray-500 text-lg font-normal">({filteredApplications.length})</span></h2>
              
              {filteredApplications.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl text-gray-300 mb-4">📭</div>
                  <h3 className="text-lg font-medium text-gray-600 mb-2">没有找到申请</h3>
                  <p className="text-gray-500">尝试更改筛选条件或浏览更多工作</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredApplications.map(app => {
                    const statusInfo = getStatusInfo(app.status);
                    return (
                      <motion.div 
                        key={app.id}
                        className="border rounded-lg p-5 hover:shadow-md transition-all"
                        whileHover={{ y: -2 }}
                      >
                        <div className="flex flex-wrap md:flex-nowrap items-start gap-4">
                          {/* 公司Logo */}
                          <div className="w-12 h-12 flex-shrink-0 bg-white rounded-lg overflow-hidden border">
                            <img src={app.logo} alt={app.company} className="w-full h-full object-contain" />
                          </div>
                          
                          {/* 申请信息 */}
                          <div className="flex-grow">
                            <div className="flex flex-wrap justify-between items-start">
                              <div>
                                <h3 className="text-lg font-semibold">{app.position}</h3>
                                <p className="text-gray-700">{app.company}</p>
                              </div>
                              <div className={`px-3 py-1 rounded-full text-sm flex items-center ${statusInfo.color}`}>
                                {statusInfo.icon}
                                {statusInfo.text}
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-sm text-gray-600">
                              <div className="flex items-center">
                                <FiMapPin className="mr-1" /> {app.location}
                              </div>
                              <div className="flex items-center">
                                <FiDollarSign className="mr-1" /> {app.salary}
                              </div>
                              <div className="flex items-center">
                                <FiCalendar className="mr-1" /> 申请于 {app.appliedDate}
                              </div>
                            </div>
                            
                            {/* 申请进度 */}
                            <div className="mt-4">
                              <div className="flex justify-between text-xs text-gray-600 mb-1">
                                <span>申请进度</span>
                                <span>{app.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="gradient-bg rounded-full h-2" 
                                  style={{ width: `${app.progress}%` }}
                                ></div>
                              </div>
                            </div>
                            
                            {/* 下一步 */}
                            {app.nextStep && (
                              <div className="mt-4 pt-3 border-t">
                                <div className="flex justify-between items-center">
                                  <div className="text-sm">
                                    <span className="text-gray-600">下一步：</span>
                                    <span className="font-medium">{app.nextStep}</span>
                                    {app.nextStepDate && (
                                      <span className="text-gray-600"> ({app.nextStepDate})</span>
                                    )}
                                  </div>
                                  <button className="text-primary hover:text-primary-dark flex items-center text-sm font-medium">
                                    查看详情 <FiChevronRight className="ml-1" />
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyApplications;
