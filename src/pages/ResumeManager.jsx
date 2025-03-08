import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUpload, FiEdit, FiTrash2, FiDownload, FiPlus, FiFileText, FiCheckCircle, FiAlertCircle, FiBarChart2 } from 'react-icons/fi';
import Logo from '../components/Logo';
import UserDropdown from '../components/UserDropdown';

const ResumeManager = () => {
  const [resumes, setResumes] = useState([
    {
      id: 1,
      name: '主简历',
      lastUpdated: '3天前',
      completeness: 95,
      format: 'PDF'
    },
    {
      id: 2,
      name: '英文简历',
      lastUpdated: '1周前',
      completeness: 80,
      format: 'Word'
    }
  ]);
  
  const [activeResume, setActiveResume] = useState(resumes[0]);
  
  // Mock analysis data
  const analysisData = {
    skillCoverage: 85,
    experienceMatch: 90,
    educationMatch: 100,
    improvements: [
      '添加更多项目经验',
      '强化领导力相关描述',
      '增加数据分析相关技能'
    ],
    strengths: [
      '技术技能描述详细',
      '工作经历时间线清晰',
      '教育背景匹配度高'
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
              <button className="relative p-2 text-gray-600 hover:text-primary transition-colors duration-200">
                <FiFileText className="w-6 h-6" />
              </button>
              <UserDropdown />
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">简历管理</h1>
          
          <div className="flex space-x-3">
            <button className="flex items-center px-4 py-2 bg-white rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors duration-200">
              <FiUpload className="mr-2" />
              导入简历
            </button>
            <button className="flex items-center px-4 py-2 bg-white rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors duration-200">
              <FiFileText className="mr-2" />
              模板库
            </button>
            <button className="gradient-button flex items-center">
              <FiPlus className="mr-2" />
              新建简历
            </button>
          </div>
        </div>
        
        {/* Upload Area */}
        <motion.div 
          className="bg-white rounded-xl shadow-sm p-8 mb-8 border-2 border-dashed border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mb-4">
              <FiUpload className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-xl font-semibold mb-2">拖放文件到这里或点击上传</h2>
            <p className="text-gray-500 mb-6">支持PDF, Word, 图片格式</p>
            <button className="gradient-button">
              选择文件
            </button>
          </div>
        </motion.div>
        
        {/* Resumes */}
        <h2 className="text-xl font-semibold mb-4">我的简历:</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {resumes.map((resume) => (
            <motion.div 
              key={resume.id}
              className={`bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer ${
                activeResume.id === resume.id ? 'ring-2 ring-primary' : ''
              }`}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              onClick={() => setActiveResume(resume)}
            >
              <div className="h-40 bg-gray-100 flex items-center justify-center">
                <FiFileText className="w-16 h-16 text-gray-400" />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">{resume.name}</h3>
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">{resume.format}</span>
                </div>
                <p className="text-sm text-gray-500 mb-3">更新于{resume.lastUpdated}</p>
                <div className="flex justify-between items-center">
                  <div className="text-sm">
                    完整度: <span className={`font-medium ${
                      resume.completeness >= 90 ? 'text-green-500' :
                      resume.completeness >= 70 ? 'text-yellow-500' :
                      'text-red-500'
                    }`}>{resume.completeness}%</span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-1 text-gray-500 hover:text-primary transition-colors duration-200">
                      <FiEdit className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-500 hover:text-primary transition-colors duration-200">
                      <FiDownload className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-500 hover:text-red-500 transition-colors duration-200">
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Add New Resume Card */}
          <motion.div 
            className="bg-white rounded-xl shadow-sm border-2 border-dashed border-gray-200 flex items-center justify-center h-64 cursor-pointer"
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
          >
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <FiPlus className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500">添加新简历</p>
            </div>
          </motion.div>
        </div>
        
        {/* Resume Analysis */}
        <h2 className="text-xl font-semibold mb-4">简历分析:</h2>
        
        <motion.div 
          className="bg-white rounded-xl shadow-sm p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Skill Coverage */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">技能覆盖率</h3>
                <span className={`text-sm font-medium ${
                  analysisData.skillCoverage >= 90 ? 'text-green-500' :
                  analysisData.skillCoverage >= 70 ? 'text-yellow-500' :
                  'text-red-500'
                }`}>{analysisData.skillCoverage}%</span>
              </div>
              
              <div className="relative h-40 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-32 h-32" viewBox="0 0 36 36">
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
                      strokeDasharray={`${analysisData.skillCoverage}, 100`}
                    />
                  </svg>
                </div>
                <div className="text-center z-10">
                  <FiBarChart2 className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-sm text-gray-500">技能雷达图</div>
                </div>
              </div>
            </div>
            
            {/* Strengths */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-4">优势</h3>
              <ul className="space-y-2">
                {analysisData.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start">
                    <FiCheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Improvements */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-4">改进建议</h3>
              <ul className="space-y-2">
                {analysisData.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start">
                    <FiAlertCircle className="w-5 h-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{improvement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button className="gradient-button">
              查看完整分析
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default ResumeManager;