import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUpload, FiFileText, FiCheckCircle } from 'react-icons/fi';

const ResumeUpload = ({ onComplete }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const handleUpload = async (file) => {
    setIsUploading(true);
    
    // 模拟上传进度
    for(let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setUploadProgress(i);
    }
    
    // 模拟解析简历数据
    const mockResumeData = {
      basicInfo: {
        name: '张三',
        age: 28,
        email: 'zhangsan@example.com',
        phone: '13800138000'
      },
      workExperience: {
        years: 5,
        currentPosition: '前端工程师',
        currentCompany: '某科技公司'
      },
      skills: ['JavaScript', 'React', 'Node.js', 'TypeScript']
    };
    
    setIsUploading(false);
    setUploadProgress(0);
    onComplete(mockResumeData);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleUpload(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) handleUpload(file);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">上传您的简历</h1>
        <p className="text-gray-600">
          上传简历后，我们将自动分析并为您匹配最适合的职位
        </p>
      </div>
      
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {isUploading ? (
          <div>
            <div className="w-20 h-20 mx-auto mb-4 relative">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#7C3AED"
                  strokeWidth="3"
                  strokeDasharray={`${uploadProgress}, 100`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-primary">
                {uploadProgress}%
              </div>
            </div>
            <p className="text-gray-600">正在上传并解析简历...</p>
          </div>
        ) : (
          <>
            <FiUpload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              拖放文件到这里或点击上传
            </h3>
            <p className="text-gray-500 mb-4">
              支持 PDF、Word 格式，文件大小不超过 10MB
            </p>
            <input
              type="file"
              className="hidden"
              id="resume-upload"
              accept=".pdf,.doc,.docx"
              onChange={handleFileSelect}
            />
            <label
              htmlFor="resume-upload"
              className="gradient-button inline-flex items-center cursor-pointer"
            >
              <FiFileText className="mr-2" />
              选择文件
            </label>
          </>
        )}
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">没有现成的简历？</h3>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-start">
            <div className="w-12 h-12 rounded-full bg-primary bg-opacity-10 flex items-center justify-center">
              <FiCheckCircle className="text-primary" />
            </div>
            <div className="ml-4">
              <h4 className="font-medium mb-2">使用我们的简历生成器</h4>
              <p className="text-gray-600 mb-4">
                通过简单的问答，我们将帮助您创建一份专业的简历
              </p>
              <button 
                className="text-primary font-medium hover:underline"
                onClick={() => onComplete({ useBuilder: true })}
              >
                开始创建 →
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ResumeUpload;