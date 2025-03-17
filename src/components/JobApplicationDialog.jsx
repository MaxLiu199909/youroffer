import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiUpload, FiCheckCircle } from 'react-icons/fi';

const JobApplicationDialog = ({ isOpen, onClose, job }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 模拟提交申请
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // 3秒后关闭对话框
      setTimeout(() => {
        onClose();
        setStep(1);
        setIsSuccess(false);
      }, 3000);
    }, 1500);
  };
  
  if (!job) return null;

  return (
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
          className="fixed inset-0 z-[100] overflow-y-auto"
        >
          <div className="min-h-screen px-4 text-center">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
            
            <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle bg-white shadow-xl rounded-2xl z-[110] relative"
            >
              {!isSuccess ? (
                <>
                  <div className="flex justify-between items-start mb-6">
                    <Dialog.Title as="h3" className="text-xl font-bold">
                      申请职位
                    </Dialog.Title>
                    <button
                      onClick={onClose}
                      className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
                    >
                      <FiX className="w-6 h-6" />
                    </button>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-start">
                      <img src={job.logo} alt={job.company} className="w-12 h-12 object-contain rounded-lg border border-gray-100 p-1" />
                      <div className="ml-3">
                        <h4 className="font-medium">{job.title}</h4>
                        <p className="text-sm text-gray-600">{job.company}</p>
                      </div>
                    </div>
                  </div>
                  
                  <form onSubmit={handleSubmit}>
                    {step === 1 && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            选择简历
                          </label>
                          <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center">
                            <FiUpload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">点击上传或拖放文件</p>
                            <p className="text-xs text-gray-400 mt-1">支持 PDF、Word 格式</p>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            求职意向
                          </label>
                          <textarea
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                            rows="3"
                            placeholder="简单介绍您为什么适合这个职位..."
                          ></textarea>
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-6 flex justify-end">
                      <button
                        type="submit"
                        className="gradient-button flex items-center"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            提交中...
                          </>
                        ) : (
                          '提交申请'
                        )}
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiCheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">申请成功！</h3>
                  <p className="text-gray-600">
                    我们已收到您的申请，请保持手机畅通，<br />
                    HR会尽快与您联系。
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default JobApplicationDialog;