import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiMapPin, FiDollarSign, FiClock } from 'react-icons/fi';
import Logo from '../components/Logo';
import UserDropdown from '../components/UserDropdown';
import JobDetailDialog from '../components/JobDetailDialog';

const JobList = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  
  // Mock data for job list
  const jobs = [
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
    },
    {
      id: 3,
      title: '前端架构师',
      company: '阿里巴巴',
      location: '杭州',
      salary: '40k-60k',
      matchRate: 88,
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Alibaba_Group_logo.svg/1280px-Alibaba_Group_logo.svg.png'
    }
  ];
  
  const handleJobClick = (job) => {
    setSelectedJob(job);
    setIsDetailOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Logo isDarkMode={true} size="medium" />
            <UserDropdown />
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">职位匹配</h1>
          
          <div className="flex space-x-4">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="搜索职位、公司..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
              />
            </div>
            <button className="flex items-center px-4 py-2 bg-white rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50">
              <FiFilter className="mr-2" />
              筛选
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <motion.div
              key={job.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer"
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              onClick={() => handleJobClick(job)}
            >
              <div className="p-6">
                <div className="flex items-start">
                  <img src={job.logo} alt={job.company} className="w-12 h-12 object-contain rounded-lg border border-gray-100 p-1" />
                  <div className="ml-4 flex-1">
                    <h3 className="font-semibold">{job.title}</h3>
                    <p className="text-gray-600">{job.company}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-primary font-medium">{job.matchRate}%</div>
                    <div className="text-xs text-gray-500">匹配度</div>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center text-sm text-gray-500 space-x-4">
                  <div className="flex items-center">
                    <FiMapPin className="mr-1" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <FiDollarSign className="mr-1" />
                    {job.salary}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
      
      <JobDetailDialog
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        job={selectedJob}
      />
    </div>
  );
};

export default JobList;