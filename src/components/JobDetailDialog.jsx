import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMapPin, FiDollarSign, FiClock, FiBarChart2, FiCheckCircle, FiX } from 'react-icons/fi';
import JobApplicationDialog from './JobApplicationDialog';

const JobDetailDialog = ({ isOpen, onClose, job }) => {
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  
  if (!job) return null;

  const handleApply = () => {
    setIsApplicationOpen(true);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <Dialog
            static
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            open={isOpen}
            onClose={onClose}
            className="fixed inset-0 z-40 overflow-y-auto"
          >
            <div className="min-h-screen px-4 text-center">
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
              
              <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle bg-white shadow-xl rounded-2xl"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-start">
                    <img src={job.logo} alt={job.company} className="w-16 h-16 object-contain rounded-lg border border-gray-100 p-2" />
                    <div className="ml-4">
                      <Dialog.Title as="h3" className="text-2xl font-bold">
                        {job.title}
                      </Dialog.Title>
                      <p className="text-gray-600">{job.company}</p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
                  >
                    <FiX className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center text-gray-600">
                    <FiMapPin className="mr-2" />
                    {job.location}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FiDollarSign className="mr-2" />
                    {job.salary}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FiClock className="mr-2" />
                    {job.experience || '3-5年'}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">匹配度分析</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">总体匹配度</span>
                      <span className="text-primary font-medium">{job.matchRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${job.matchRate}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">技能要求</h4>
                  <div className="space-y-2">
                    {['React', 'TypeScript', 'Node.js'].map((skill, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <span>{skill}</span>
                        <FiCheckCircle className="text-green-500" />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">职位描述</h4>
                  <p className="text-gray-600">
                    负责公司核心产品的前端开发工作，包括但不限于Web应用、移动端适配等。使用React、TypeScript等现代前端技术栈，打造高性能、可扩展的用户界面。
                  </p>
                </div>
                
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:border-gray-300 transition-colors duration-200"
                  >
                    关闭
                  </button>
                  <button 
                    className="gradient-button"
                    onClick={handleApply}
                  >
                    立即申请
                  </button>
                </div>
              </motion.div>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
      
      <JobApplicationDialog
        isOpen={isApplicationOpen}
        onClose={() => setIsApplicationOpen(false)}
        job={job}
      />
    </>
  );
};

export default JobDetailDialog;