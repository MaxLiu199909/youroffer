import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiBarChart2, FiCheckCircle, FiTrendingUp, FiAward, FiCalendar, FiFileText, FiBriefcase, FiBookmark, FiUser } from 'react-icons/fi';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import UserDropdown from '../components/UserDropdown';
import NotificationBell from '../components/NotificationBell';
import { useAuth } from '../context/AuthContext';
import JobDetailDialog from '../components/JobDetailDialog';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  
  // Mock data for skill match analysis
  const skillMatchData = [
    { name: '技术技能', value: 85 },
    { name: '工作经验', value: 75 },
    { name: '教育背景', value: 90 },
    { name: '行业匹配', value: 80 }
  ];
  
  // Mock data for job recommendations
  const jobRecommendations = [
    {
      id: 1,
      title: '高级前端工程师',
      company: '字节跳动',
      location: '北京',
      salary: '30k-45k',
      matchRate: 94,
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Bytedance_logo.svg/1280px-Bytedance_logo.svg.png'
    },
    {
      id: 2,
      title: '全栈开发工程师',
      company: '腾讯',
      location: '深圳',
      salary: '35k-50k',
      matchRate: 92,
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Tencent_Logo.svg/1280px-Tencent_Logo.svg.png'
    }
  ];
  
  // Mock data for career growth analysis
  const careerGrowthData = [
    { name: '当前水平', 技术: 75, 管理: 60, 沟通: 85 },
    { name: '行业平均', 技术: 65, 管理: 70, 沟通: 75 },
    { name: '目标水平', 技术: 90, 管理: 80, 沟通: 90 }
  ];
  
  // Mock data for upcoming events
  const upcomingEvents = [
    { id: 1, title: '字节跳动面试', date: '2025-03-15', time: '14:00', type: 'interview' },
    { id: 2, title: '技能评估', date: '2025-03-18', time: '10:00', type: 'assessment' }
  ];
  
  // Colors for charts
  const COLORS = ['#7C3AED', '#60A5FA', '#10B981', '#F59E0B'];

  const handleViewAllJobs = () => {
    navigate('/jobs');
  };

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setIsDetailOpen(true);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Logo isDarkMode={true} size="medium" />
            
            <div className="flex items-center space-x-4">
              <NotificationBell />
              <UserDropdown />
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">早安，{user?.name || user?.email?.split('@')[0] || '用户'}</h1>
            <p className="text-gray-500 mt-1">今天是个寻找理想工作的好日子</p>
          </div>
          <div className="text-sm text-gray-500">
            <FiCalendar className="inline mr-2" />
            2025年3月12日
          </div>
        </div>
        
        {/* Top Job Match */}
        <motion.div
          className="bg-white rounded-xl shadow-sm p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">最佳职位匹配</h2>
            <button 
              onClick={handleViewAllJobs}
              className="text-primary text-sm font-medium hover:underline"
            >
              查看全部
            </button>
          </div>
          
          <div 
            className="bg-gradient-to-r from-primary-light to-secondary-light rounded-lg p-6 text-white cursor-pointer transform transition-transform duration-200 hover:scale-[1.02]"
            onClick={() => handleJobClick(jobRecommendations[0])}
          >
            <div className="flex items-start">
              <img src={jobRecommendations[0].logo} alt={jobRecommendations[0].company} className="w-12 h-12 object-contain bg-white rounded-lg p-1" />
              <div className="ml-4 flex-1">
                <h3 className="text-xl font-bold">{jobRecommendations[0].title}</h3>
                <p className="text-white text-opacity-90">{jobRecommendations[0].company}</p>
                <div className="flex items-center mt-2 text-sm">
                  <span>{jobRecommendations[0].location}</span>
                  <span className="mx-2">•</span>
                  <span>{jobRecommendations[0].salary}</span>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="relative w-16 h-16">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.3)"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      strokeDasharray={`${jobRecommendations[0].matchRate}, 100`}
                    />
                  </svg>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold">
                    {jobRecommendations[0].matchRate}%
                  </div>
                </div>
                <span className="text-xs mt-1">匹配度</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {jobRecommendations.slice(1).map((job) => (
              <motion.div
                key={job.id}
                className="bg-white border border-gray-100 rounded-lg p-4 cursor-pointer"
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                onClick={() => handleJobClick(job)}
              >
                <div className="flex items-start">
                  <img src={job.logo} alt={job.company} className="w-10 h-10 object-contain rounded-lg border border-gray-100 p-1" />
                  <div className="ml-3 flex-1">
                    <h3 className="font-medium">{job.title}</h3>
                    <p className="text-sm text-gray-600">{job.company}</p>
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <span>{job.location}</span>
                      <span className="mx-1">•</span>
                      <span>{job.salary}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-primary font-medium">{job.matchRate}%</div>
                    <div className="text-xs text-gray-500">匹配度</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* 求职概览 */}
        <motion.div
          className="bg-white rounded-xl shadow-sm p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <h2 className="text-lg font-semibold mb-4">求职概览</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* 我的申请 */}
            <motion.div
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 cursor-pointer"
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              onClick={() => navigate('/applications')}
            >
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                  <FiFileText className="text-2xl" />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium">我的申请</h3>
                  <div className="text-3xl font-bold mt-2 text-blue-600">8</div>
                  <div className="flex items-center text-sm mt-1">
                    <span className="text-blue-600 font-medium">3</span>
                    <span className="text-gray-500 ml-1">处理中</span>
                    <span className="mx-1 text-gray-300">•</span>
                    <span className="text-green-600 font-medium">2</span>
                    <span className="text-gray-500 ml-1">已回复</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4 pt-3 border-t border-blue-200 text-sm">
                <span className="text-gray-600">查看所有申请</span>
                <FiArrowRight className="text-blue-500" />
              </div>
            </motion.div>
            
            {/* 收藏职位 */}
            <motion.div
              className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 cursor-pointer"
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              onClick={() => navigate('/saved-jobs')}
            >
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-500">
                  <FiBookmark className="text-2xl" />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium">收藏职位</h3>
                  <div className="text-3xl font-bold mt-2 text-purple-600">12</div>
                  <div className="flex items-center text-sm mt-1">
                    <span className="text-purple-600 font-medium">5</span>
                    <span className="text-gray-500 ml-1">新增职位</span>
                    <span className="mx-1 text-gray-300">•</span>
                    <span className="text-amber-600 font-medium">3</span>
                    <span className="text-gray-500 ml-1">即将截止</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4 pt-3 border-t border-purple-200 text-sm">
                <span className="text-gray-600">查看所有收藏</span>
                <FiArrowRight className="text-purple-500" />
              </div>
            </motion.div>
            
            {/* 面试日程 */}
            <motion.div
              className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 cursor-pointer"
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              onClick={() => navigate('/interviews')}
            >
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                  <FiCalendar className="text-2xl" />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium">面试日程</h3>
                  <div className="text-3xl font-bold mt-2 text-green-600">3</div>
                  <div className="flex items-center text-sm mt-1">
                    <span className="text-green-600 font-medium">1</span>
                    <span className="text-gray-500 ml-1">今日</span>
                    <span className="mx-1 text-gray-300">•</span>
                    <span className="text-blue-600 font-medium">2</span>
                    <span className="text-gray-500 ml-1">本周</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4 pt-3 border-t border-green-200 text-sm">
                <span className="text-gray-600">查看所有面试</span>
                <FiArrowRight className="text-green-500" />
              </div>
            </motion.div>
            
            {/* 简历管理 */}
            <motion.div
              className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-5 cursor-pointer"
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              onClick={() => navigate('/resume')}
            >
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-500">
                  <FiUser className="text-2xl" />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium">简历管理</h3>
                  <div className="text-3xl font-bold mt-2 text-amber-600">1</div>
                  <div className="flex items-center text-sm mt-1">
                    <span className="text-amber-600 font-medium">85%</span>
                    <span className="text-gray-500 ml-1">完整度</span>
                    <span className="mx-1 text-gray-300">•</span>
                    <span className="text-blue-600 font-medium">2</span>
                    <span className="text-gray-500 ml-1">更新建议</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4 pt-3 border-t border-amber-200 text-sm">
                <span className="text-gray-600">管理我的简历</span>
                <FiArrowRight className="text-amber-500" />
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Skill Match Analysis */}
          <motion.div
            className="bg-white rounded-xl shadow-sm p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-lg font-semibold mb-4">技能匹配分析</h2>
            <div className="flex items-center justify-center">
              <PieChart width={280} height={280}>
                <Pie
                  data={skillMatchData}
                  cx={140}
                  cy={140}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {skillMatchData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </div>
          </motion.div>
          
          {/* Career Growth Analysis */}
          <motion.div
            className="bg-white rounded-xl shadow-sm p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-lg font-semibold mb-4">职业发展分析</h2>
            <BarChart
              width={500}
              height={280}
              data={careerGrowthData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="技术" fill="#7C3AED" />
              <Bar dataKey="管理" fill="#60A5FA" />
              <Bar dataKey="沟通" fill="#10B981" />
            </BarChart>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Strengths */}
          <motion.div
            className="bg-white rounded-xl shadow-sm p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-lg font-semibold mb-4">个人优势</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mr-4">
                  <FiAward className="text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">技术专长</h3>
                  <p className="text-sm text-gray-500">前端开发技能处于行业领先水平</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-secondary bg-opacity-10 flex items-center justify-center mr-4">
                  <FiTrendingUp className="text-secondary" />
                </div>
                <div>
                  <h3 className="font-medium">学习能力</h3>
                  <p className="text-sm text-gray-500">快速掌握新技术的能力突出</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                  <FiCheckCircle className="text-green-500" />
                </div>
                <div>
                  <h3 className="font-medium">项目经验</h3>
                  <p className="text-sm text-gray-500">拥有丰富的大型项目开发经验</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Upcoming Events */}
          <motion.div
            className="bg-white rounded-xl shadow-sm p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-lg font-semibold mb-4">近期活动</h2>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mr-4">
                    <FiCalendar className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{event.title}</h3>
                    <p className="text-sm text-gray-500">{event.date} {event.time}</p>
                  </div>
                  <button className="text-primary text-sm font-medium">
                    详情
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Job Detail Dialog */}
        <JobDetailDialog
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          job={selectedJob}
        />
      </main>
    </div>
  );
};

export default Dashboard;