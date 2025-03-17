import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiMapPin, FiDollarSign, FiClock, FiStar, FiShare2, FiBookmark, FiX, FiGrid, FiList, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Logo from '../components/Logo';
import UserDropdown from '../components/UserDropdown';
import JobApplicationDialog from '../components/JobApplicationDialog';

const JobBrowser = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedJob, setSelectedJob] = useState(null);
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const [filters, setFilters] = useState({
    location: '',
    salary: '',
    experience: '',
    jobType: '',
    industry: ''
  });
  
  // Mock job data
  const jobs = [
    {
      id: 1,
      title: '高级前端工程师',
      company: '字节跳动',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Bytedance_logo.svg/1280px-Bytedance_logo.svg.png',
      location: '北京·朝阳',
      salary: '30k-45k',
      experience: '3-5年',
      matchRate: 95,
      description: '负责字节跳动旗下产品的前端开发工作，包括但不限于Web应用、小程序等。使用React、Vue等现代前端框架，打造高性能、可扩展的用户界面。',
      requirements: ['精通JavaScript、HTML5、CSS3', '熟练掌握React或Vue框架', '了解前端工程化和性能优化', '有大型Web应用开发经验', '良好的团队协作能力'],
      postedDate: '2天前',
      jobType: '全职',
      industry: '互联网'
    },
    {
      id: 2,
      title: '产品经理',
      company: '腾讯',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Tencent_Logo.svg/1280px-Tencent_Logo.svg.png',
      location: '深圳·南山',
      salary: '25k-40k',
      experience: '3-5年',
      matchRate: 87,
      description: '负责腾讯某核心产品的规划和设计，包括需求分析、功能设计、用户体验优化等。与开发团队紧密合作，确保产品按时高质量交付。',
      requirements: ['本科及以上学历，计算机或相关专业', '3年以上互联网产品经理经验', '优秀的沟通协调能力', '数据分析能力强', '有用户增长经验优先'],
      postedDate: '1周前',
      jobType: '全职',
      industry: '互联网'
    },
    {
      id: 3,
      title: 'UI/UX设计师',
      company: '阿里巴巴',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Alibaba_Group_logo.svg/1280px-Alibaba_Group_logo.svg.png',
      location: '杭州·西湖',
      salary: '20k-35k',
      experience: '2-4年',
      matchRate: 81,
      description: '负责阿里巴巴电商平台的用户界面设计，包括视觉设计、交互设计和用户体验优化。与产品和开发团队合作，打造美观易用的产品界面。',
      requirements: ['本科及以上学历，设计相关专业', '熟练使用Figma、Sketch等设计工具', '良好的视觉设计能力和审美', '了解用户体验设计原则', '有电商平台设计经验优先'],
      postedDate: '3天前',
      jobType: '全职',
      industry: '电子商务'
    },
    {
      id: 4,
      title: '数据分析师',
      company: '百度',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Baidu_logo.svg/1280px-Baidu_logo.svg.png',
      location: '北京·海淀',
      salary: '20k-30k',
      experience: '1-3年',
      matchRate: 78,
      description: '负责百度产品的数据分析工作，包括用户行为分析、转化率优化、A/B测试等。通过数据挖掘和分析，为产品决策提供数据支持。',
      requirements: ['统计学、计算机科学或相关专业', '熟练使用SQL、Python等数据分析工具', '有数据可视化经验', '良好的逻辑思维和沟通能力', '有搜索引擎或广告行业经验优先'],
      postedDate: '1周前',
      jobType: '全职',
      industry: '互联网'
    },
    {
      id: 5,
      title: '后端开发工程师',
      company: '小米',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Xiaomi_logo.svg/1024px-Xiaomi_logo.svg.png',
      location: '北京·海淀',
      salary: '25k-40k',
      experience: '3-5年',
      matchRate: 85,
      description: '负责小米IoT平台的后端服务开发，包括API设计、数据库优化、系统架构等。使用Java、Spring Boot等技术栈，构建高可用、高性能的后端系统。',
      requirements: ['计算机相关专业，本科及以上学历', '精通Java，熟悉Spring Boot、Spring Cloud', '了解MySQL、Redis等数据库', '有分布式系统开发经验', '良好的问题解决能力'],
      postedDate: '5天前',
      jobType: '全职',
      industry: '智能硬件'
    }
  ];
  
  // Filter options
  const filterOptions = {
    location: ['北京', '上海', '深圳', '杭州', '广州'],
    salary: ['10k以下', '10k-20k', '20k-30k', '30k-50k', '50k以上'],
    experience: ['应届生', '1-3年', '3-5年', '5-10年', '10年以上'],
    jobType: ['全职', '兼职', '实习', '自由职业'],
    industry: ['互联网', '金融', '教育', '医疗', '电子商务', '智能硬件']
  };
  
  const handleJobSelect = (job) => {
    setSelectedJob(job);
  };
  
  const handleFilterChange = (category, value) => {
    setFilters({
      ...filters,
      [category]: value
    });
  };
  
  const handleApply = () => {
    setIsApplicationOpen(true);
  };
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Logo isDarkMode={true} size="medium" />
            
            <UserDropdown />
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* 页面标题 */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <motion.button 
              className="flex items-center justify-center mr-4 p-2 rounded-full bg-gray-100 hover:bg-primary hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.history.back()}
            >
              <FiChevronLeft className="text-lg" />
            </motion.button>
            <div className="flex items-center">
              <FiSearch className="text-primary mr-2" />
              <h2 className="text-2xl font-bold">职位浏览</h2>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button 
                className={`px-4 py-2 rounded-md flex items-center ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <FiGrid className="mr-2" />
                网格视图
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
        
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-auto md:flex-1">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="搜索职位、公司、技能..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
              />
            </div>
            
            <div className="flex items-center space-x-2 w-full md:w-auto">
              <button className="flex items-center px-4 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors duration-200">
                <FiFilter className="mr-2" />
                筛选
              </button>
              
              <div className="flex items-center space-x-2 ml-auto">
                <button 
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => setViewMode('grid')}
                >
                  <FiGrid />
                </button>
                <button 
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => setViewMode('list')}
                >
                  <FiList />
                </button>
              </div>
            </div>
          </div>
          
          {/* Filter Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {Object.entries(filters).map(([category, value]) => (
              value && (
                <div key={category} className="flex items-center bg-primary bg-opacity-10 text-primary px-3 py-1 rounded-full text-sm">
                  {value}
                  <button 
                    className="ml-2"
                    onClick={() => handleFilterChange(category, '')}
                  >
                    <FiX className="w-3 h-3" />
                  </button>
                </div>
              )
            ))}
          </div>
        </div>
        
        {/* Job Listings and Details */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Job Listings */}
          <div className={`${selectedJob ? 'lg:w-1/2' : 'w-full'}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">找到 {jobs.length} 个职位</h2>
              <div className="text-sm text-gray-500">
                排序: 
                <select className="ml-2 border-none bg-transparent focus:outline-none">
                  <option>匹配度</option>
                  <option>最新发布</option>
                  <option>薪资最高</option>
                </select>
              </div>
            </div>
            
            <div className={`space-y-4 ${viewMode === 'grid' ? 'md:grid md:grid-cols-2 md:gap-4 md:space-y-0' : ''}`}>
              {jobs.map((job) => (
                <motion.div
                  key={job.id}
                  className={`bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer ${
                    selectedJob?.id === job.id ? 'ring-2 ring-primary' : ''
                  }`}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  onClick={() => handleJobSelect(job)}
                >
                  <div className="p-4">
                    <div className="flex items-start">
                      <img 
                        src={job.logo} 
                        alt={job.company} 
                        className="w-12 h-12 object-contain rounded-lg border border-gray-100 p-1"
                      />
                      <div className="ml-3 flex-1">
                        <h3 className="font-semibold">{job.title}</h3>
                        <p className="text-sm text-gray-600">{job.company}</p>
                        <div className="flex flex-wrap gap-y-1 mt-1">
                          <div className="flex items-center text-xs text-gray-500 mr-3">
                            <FiMapPin className="mr-1" />
                            {job.location}
                          </div>
                          <div className="flex items-center text-xs text-gray-500 mr-3">
                            <FiDollarSign className="mr-1" />
                            {job.salary}
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <FiClock className="mr-1" />
                            {job.postedDate}
                          </div>
                        </div>
                      </div>
                      <div className="relative w-12 h-12 flex-shrink-0">
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
                            strokeDasharray={`${job.matchRate}, 100`}
                          />
                        </svg>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-primary">
                          {job.matchRate}%
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <nav className="flex items-center space-x-2">
                <button className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:border-primary hover:text-primary transition-colors duration-200">
                  <FiChevronLeft />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white">
                  1
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-700 hover:border-primary hover:text-primary transition-colors duration-200">
                  2
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-700 hover:border-primary hover:text-primary transition-colors duration-200">
                  3
                </button>
                <span className="text-gray-500">...</span>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-700 hover:border-primary hover:text-primary transition-colors duration-200">
                  10
                </button>
                <button className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:border-primary hover:text-primary transition-colors duration-200">
                  <FiChevronRight />
                </button>
              </nav>
            </div>
          </div>
          
          {/* Job Details */}
          {selectedJob && (
            <motion.div 
              className="lg:w-1/2 bg-white rounded-xl shadow-sm p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start">
                <img 
                  src={selectedJob.logo} 
                  alt={selectedJob.company} 
                  className="w-16 h-16 object-contain rounded-lg border border-gray-100 p-2"
                />
                <div className="ml-4">
                  <h2 className="text-xl font-bold">{selectedJob.title}</h2>
                  <p className="text-gray-600">{selectedJob.company}</p>
                  <div className="flex flex-wrap gap-y-2 mt-2">
                    <div className="flex items-center text-sm text-gray-500 mr-4">
                      <FiMapPin className="mr-1" />
                      {selectedJob.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mr-4">
                      <FiDollarSign className="mr-1" />
                      {selectedJob.salary}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mr-4">
                      <FiClock className="mr-1" />
                      {selectedJob.experience}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center">
                  <div className="text-sm">
                    匹配度: <span className="text-primary font-medium">{selectedJob.matchRate}%</span>
                  </div>
                  <div className="w-24 h-2 bg-gray-200 rounded-full ml-2">
                    <div 
                      className="h-2 bg-primary rounded-full" 
                      style={{ width: `${selectedJob.matchRate}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-200">
                    <FiBookmark />
                  </button>
                  <button 
                    className="gradient-button"
                    onClick={handleApply}
                  >
                    立即申请
                  </button>
                </div>
              </div>
              
              <div className="border-t border-gray-100 my-6"></div>
              
              <div>
                <h3 className="font-semibold mb-3">职位描述</h3>
                <p className="text-gray-700 mb-6">
                  {selectedJob.description}
                </p>
                
                <h3 className="font-semibold mb-3">技能要求</h3>
                <ul className="list-disc list-inside text-gray-700 mb-6">
                  {selectedJob.requirements.map((req, index) => (
                    <li key={index} className="mb-1">{req}</li>
                  ))}
                </ul>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {['JavaScript', 'React', 'Vue', 'HTML5', 'CSS3'].map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                      {skill}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between">
                  <button className="px-6 py-3 bg-white border border-gray-200 rounded-lg text-gray-700 hover:border-primary hover:text-primary transition-colors duration-200">
                    查看公司
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
      
      <JobApplicationDialog
        isOpen={isApplicationOpen}
        onClose={() => setIsApplicationOpen(false)}
        job={selectedJob}
      />
    </div>
  );
};

export default JobBrowser;