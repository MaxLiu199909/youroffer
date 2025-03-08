import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiDownload, FiShare2, FiCheckCircle, FiAlertCircle, FiBarChart2, FiMapPin, FiCalendar, FiDollarSign, FiBriefcase } from 'react-icons/fi';
import Logo from '../components/Logo';

const MatchDetails = () => {
  const { id } = useParams();
  
  // Mock match data
  const matchData = {
    id: parseInt(id) || 1,
    job: {
      title: '高级前端工程师',
      company: '字节跳动',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Bytedance_logo.svg/1280px-Bytedance_logo.svg.png',
      location: '北京·朝阳',
      salary: '30k-45k',
      experience: '3-5年',
      postedDate: '2天前'
    },
    matchRate: 92,
    dimensions: {
      skills: 95,
      experience: 85,
      education: 100,
      location: 90
    },
    strengths: [
      '产品设计技能超出要求20%',
      '用户研究经验非常匹配',
      '行业经验高度相关'
    ],
    improvements: [
      '数据分析技能可进一步提升',
      '建议增加项目管理相关经验',
      '可以补充团队协作相关经历'
    ],
    skillsAnalysis: [
      { name: 'JavaScript', value: 95, required: 80 },
      { name: 'React', value: 90, required: 85 },
      { name: 'HTML/CSS', value: 100, required: 75 },
      { name: 'Vue', value: 70, required: 60 },
      { name: '前端工程化', value: 85, required: 80 },
      { name: '数据可视化', value: 60, required: 70 }
    ]
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Logo />
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-medium">
                  ZS
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="flex items-center mb-8">
          <Link to="/jobs" className="flex items-center text-gray-600 hover:text-primary transition-colors duration-200">
            <FiArrowLeft className="mr-2" />
            返回职位列表
          </Link>
          <h1 className="text-2xl font-bold ml-4">匹配分析结果</h1>
        </div>
        
        {/* Job Info */}
        <motion.div 
          className="bg-white rounded-xl shadow-sm p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-start">
            <img 
              src={matchData.job.logo} 
              alt={matchData.job.company} 
              className="w-16 h-16 object-contain rounded-lg border border-gray-100 p-2"
            />
            <div className="ml-4">
              <h2 className="text-xl font-bold">{matchData.job.title}</h2>
              <p className="text-gray-600">{matchData.job.company}</p>
              <div className="flex flex-wrap gap-y-2 mt-2">
                <div className="flex items-center text-sm text-gray-500 mr-4">
                  <FiMapPin className="mr-1" />
                  {matchData.job.location}
                </div>
                <div className="flex items-center text-sm text-gray-500 mr-4">
                  <FiDollarSign className="mr-1" />
                  {matchData.job.salary}
                </div>
                <div className="flex items-center text-sm text-gray-500 mr-4">
                  <FiBriefcase className="mr-1" />
                  {matchData.job.experience}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <FiCalendar className="mr-1" />
                  发布于 {matchData.job.postedDate}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Overall Match Rate */}
        <motion.div 
          className="bg-white rounded-xl shadow-sm p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex flex-col items-center justify-center py-6">
            <h2 className="text-xl font-semibold mb-6">总体匹配度</h2>
            <div className="relative w-48 h-48">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#e6e6e6"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#7C3AED"
                  strokeWidth="3"
                  strokeDasharray={`${matchData.matchRate}, 100`}
                />
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="text-4xl font-bold text-primary">{matchData.matchRate}%</div>
                <div className="text-sm text-gray-500">匹配度</div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Dimension Analysis */}
        <motion.div 
          className="bg-white rounded-xl shadow-sm p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold mb-6">维度分析</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Skills Match */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">技能匹配</h3>
                <span className="text-primary font-medium">{matchData.dimensions.skills}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div className="bg-primary h-2 rounded-full" style={{ width: `${matchData.dimensions.skills}%` }}></div>
              </div>
              <div className="h-40 flex items-center justify-center">
                <div className="text-center">
                  <FiBarChart2 className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-sm text-gray-500">技能雷达图</div>
                </div>
              </div>
            </div>
            
            {/* Experience Match */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">经验匹配</h3>
                <span className="text-primary font-medium">{matchData.dimensions.experience}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div className="bg-primary h-2 rounded-full" style={{ width: `${matchData.dimensions.experience}%` }}></div>
              </div>
              <div className="h-40 flex items-center justify-center">
                <div className="text-center">
                  <FiBarChart2 className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-sm text-gray-500">经验时间线图</div>
                </div>
              </div>
            </div>
            
            {/* Education Match */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">教育匹配</h3>
                <span className="text-green-500 font-medium">{matchData.dimensions.education}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: `${matchData.dimensions.education}%` }}></div>
              </div>
              <div className="h-40 flex items-center justify-center">
                <div className="text-center">
                  <FiBarChart2 className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-sm text-gray-500">教育匹配图表</div>
                </div>
              </div>
            </div>
            
            {/* Location Match */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">地点匹配</h3>
                <span className="text-primary font-medium">{matchData.dimensions.location}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div className="bg-primary h-2 rounded-full" style={{ width: `${matchData.dimensions.location}%` }}></div>
              </div>
              <div className="h-40 flex items-center justify-center">
                <div className="text-center">
                  <FiMapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-sm text-gray-500">地图可视化</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Skills Analysis */}
        <motion.div 
          className="bg-white rounded-xl shadow-sm p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold mb-6">技能分析</h2>
          
          <div className="space-y-4">
            {matchData.skillsAnalysis.map((skill, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <div className="font-medium">{skill.name}</div>
                  <div className="text-sm">
                    <span className={skill.value >= skill.required ? 'text-green-500' : 'text-yellow-500'}>
                      {skill.value}%
                    </span>
                    <span className="text-gray-400 mx-1">/</span>
                    <span className="text-gray-500">{skill.required}% 要求</span>
                  </div>
                </div>
                <div className="relative w-full h-2 bg-gray-200 rounded-full">
                  <div 
                    className="absolute left-0 top-0 h-2 bg-gray-400 bg-opacity-30 rounded-full"
                    style={{ width: `${skill.required}%` }}
                  ></div>
                  <div 
                    className={`absolute left-0 top-0 h-2 rounded-full ${
                      skill.value >= skill.required ? 'bg-green-500' : 'bg-yellow-500'
                    }`}
                    style={{ width: `${skill.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Strengths and Improvements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Strengths */}
          <motion.div 
            className="bg-white rounded-xl shadow-sm p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-xl font-semibold mb-4">你的优势</h2>
            <ul className="space-y-3">
              {matchData.strengths.map((strength, index) => (
                <li key={index} className="flex items-start">
                  <FiCheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Improvements */}
          <motion.div 
            className="bg-white rounded-xl shadow-sm p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h2 className="text-xl font-semibold mb-4">提升空间</h2>
            <ul className="space-y-3">
              {matchData.improvements.map((improvement, index) => (
                <li key={index} className="flex items-start">
                  <FiAlertCircle className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span>{improvement}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
        
        {/* Action Buttons */}
        <motion.div 
          className="flex flex-wrap gap-4 justify-center md:justify-end"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <button className="gradient-button">
            应用职位
          </button>
          <button className="px-6 py-3 bg-white border border-gray-200 rounded-lg text-gray-700 hover:border-primary hover:text-primary transition-colors duration-200 flex items-center">
            <FiDownload className="mr-2" />
            保存结果
          </button>
          <button className="px-6 py-3 bg-white border border-gray-200 rounded-lg text-gray-700 hover:border-primary hover:text-primary transition-colors duration-200 flex items-center">
            <FiShare2 className="mr-2" />
            分享
          </button>
        </motion.div>
      </main>
    </div>
  );
};

export default MatchDetails;