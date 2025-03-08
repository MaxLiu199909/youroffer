import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ currentStep }) => {
  const steps = [
    { id: 'resume-upload', label: '上传简历' },
    { id: 'info-collection', label: '信息收集' },
    { id: 'complete', label: '完成' }
  ];
  
  const currentIndex = steps.findIndex(step => step.id === currentStep);

  return (
    <div className="relative">
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2"></div>
      <div className="relative flex justify-between max-w-2xl mx-auto">
        {steps.map((step, index) => {
          const isCompleted = index <= currentIndex;
          const isCurrent = step.id === currentStep;
          
          return (
            <div key={step.id} className="flex flex-col items-center">
              <motion.div
                initial={false}
                animate={{
                  backgroundColor: isCompleted ? '#7C3AED' : '#E5E7EB',
                  scale: isCurrent ? 1.2 : 1
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white relative z-10"
              >
                {index + 1}
              </motion.div>
              <div className={`mt-2 text-sm ${isCurrent ? 'text-primary font-medium' : 'text-gray-500'}`}>
                {step.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;