import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiBookmark, FiMapPin, FiDollarSign, FiCalendar, FiStar, FiBarChart2, FiHeart, FiBriefcase, FiChevronLeft, FiHome } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import UserDropdown from '../components/UserDropdown';

const SavedJobs = () => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState('latest');
  const [filterCategory, setFilterCategory] = useState('all');
  
  // 模拟收藏职位数据
  const savedJobsData = [
    {
      id: 1,
      title: '高级前端工程师',
      company: '字节跳动',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Bytedance_logo.svg/1280px-Bytedance_logo.svg.png',
      location: '北京',
      salary: '30k-45k',
      matchRate: 94,
      category: 'tech',
      savedDate: '2025-03-01',
      companySize: '10000人以上',
      experience: '3-5年',
      education: '本科及以上'
    },
    {
      id: 2,
      title: '全栈开发工程师',
      company: '腾讯',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Tencent_Logo.svg/1280px-Tencent_Logo.svg.png',
      location: '深圳',
      salary: '35k-50k',
      matchRate: 92,
      category: 'tech',
      savedDate: '2025-03-02',
      companySize: '10000人以上',
      experience: '3-5年',
      education: '本科及以上'
    },
    {
      id: 3,
      title: '产品经理',
      company: '阿里巴巴',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Alibaba_Group_logo.svg/1280px-Alibaba_Group_logo.svg.png',
      location: '杭州',
      salary: '25k-40k',
      matchRate: 89,
      category: 'product',
      savedDate: '2025-03-03',
      companySize: '10000人以上',
      experience: '3-5年',
      education: '本科及以上'
    },
    {
      id: 4,
      title: 'UI设计师',
      company: '网易',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Netease_Logo.svg/1280px-Netease_Logo.svg.png',
      location: '杭州',
      salary: '20k-30k',
      matchRate: 85,
      category: 'design',
      savedDate: '2025-03-05',
      companySize: '5000-10000人',
      experience: '1-3年',
      education: '本科及以上'
    },
    {
      id: 5,
      title: '数据分析师',
      company: '百度',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Baidu_Logo.svg/1280px-Baidu_Logo.svg.png',
      location: '北京',
      salary: '25k-35k',
      matchRate: 91,
      category: 'data',
      savedDate: '2025-03-06',
      companySize: '10000人以上',
      experience: '1-3年',
      education: '本科及以上'
    },
    {
      id: 6,
      title: '人力资源专员',
      company: '美团',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Meituan_logo.svg/1280px-Meituan_logo.svg.png',
      location: '北京',
      salary: '15k-25k',
      matchRate: 82,
      category: 'hr',
      savedDate: '2025-03-07',
      companySize: '10000人以上',
      experience: '1-3年',
      education: '本科及以上'
    }
  ];
  
  // 筛选和排序职位
  const filteredJobs = filterCategory === 'all' 
    ? savedJobsData 
    : savedJobsData.filter(job => job.category === filterCategory);
    
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === 'latest') {
      return new Date(b.savedDate) - new Date(a.savedDate);
    } else if (sortBy === 'salary-high') {
      return parseInt(b.salary.split('-')[1]) - parseInt(a.salary.split('-')[1]);
    } else if (sortBy === 'salary-low') {
      return parseInt(a.salary.split('-')[0]) - parseInt(b.salary.split('-')[0]);
    } else if (sortBy === 'match') {
      return b.matchRate - a.matchRate;
    }
    return 0;
  });
  
  // 职位类别映射
  const categoryMap = {
    'all': '全部职位',
    'tech': '技术开发',
    'product': '产品',
    'design': '设计',
    'data': '数据',
    'hr': '人力资源'
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
        <div className="bg-white rounded-xl shadow-sm p-6">
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
                <FiBookmark className="text-primary mr-2" />
                <h2 className="text-2xl font-bold">收藏职位</h2>
              </div>
            </div>
            
            {/* 排序和筛选选项 */}
            <div className="flex flex-wrap gap-3 items-center">
              <motion.button 
                className="flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-primary-light text-white shadow-sm hover:shadow-md transition-all duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/dashboard')}
              >
                <FiHome className="mr-2" />
                返回仪表盘
              </motion.button>
              <select 
                className="input-field py-2 px-3"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                {Object.entries(categoryMap).map(([key, value]) => (
                  <option key={key} value={key}>{value}</option>
                ))}
              </select>
              
              <select 
                className="input-field py-2 px-3"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="latest">最新收藏</option>
                <option value="salary-high">薪资由高到低</option>
                <option value="salary-low">薪资由低到高</option>
                <option value="match">匹配度优先</option>
              </select>
            </div>
          </div>
          
          {sortedJobs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl text-gray-300 mb-4">📌</div>
              <h3 className="text-lg font-medium text-gray-600 mb-2">暂无收藏的职位</h3>
              <p className="text-gray-500">浏览职位并收藏您感兴趣的工作</p>
              <button className="gradient-button mt-4">浏览职位</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedJobs.map(job => (
                <motion.div 
                  key={job.id}
                  className="border rounded-lg p-5 hover:shadow-lg transition-all relative"
                  whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                >
                  {/* 收藏按钮 */}
                  <button className="absolute top-4 right-4 text-red-500 hover:text-red-600 transition-colors">
                    <FiHeart className="fill-current w-5 h-5" />
                  </button>
                  
                  <div className="flex items-start mb-4">
                    {/* 公司Logo */}
                    <div className="w-12 h-12 flex-shrink-0 bg-white rounded-lg overflow-hidden border mr-3">
                      <img src={job.logo} alt={job.company} className="w-full h-full object-contain" />
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold line-clamp-1">{job.title}</h3>
                      <p className="text-gray-700">{job.company}</p>
                    </div>
                  </div>
                  
                  {/* 职位信息 */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600 text-sm">
                      <FiMapPin className="mr-1 flex-shrink-0" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <FiDollarSign className="mr-1 flex-shrink-0" />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <FiBriefcase className="mr-1 flex-shrink-0" />
                      <span>{job.experience}</span>
                    </div>
                  </div>
                  
                  {/* 匹配度 */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span className="flex items-center">
                        <FiBarChart2 className="mr-1" />
                        匹配度
                      </span>
                      <span className="font-semibold">{job.matchRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="gradient-bg rounded-full h-2" 
                        style={{ width: `${job.matchRate}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* 收藏日期 */}
                  <div className="text-xs text-gray-500 mb-4 flex items-center">
                    <FiCalendar className="mr-1" />
                    收藏于 {job.savedDate}
                  </div>
                  
                  {/* 操作按钮 */}
                  <div className="flex space-x-2">
                    <button className="gradient-button flex-1 py-2 text-sm">
                      立即申请
                    </button>
                    <button className="border border-gray-300 rounded-lg flex-1 py-2 text-sm hover:bg-gray-50 transition-colors">
                      查看详情
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SavedJobs;
