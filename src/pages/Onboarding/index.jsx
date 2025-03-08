import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProgressBar from '../../components/Onboarding/ProgressBar';
import ResumeUpload from './ResumeUpload';
import InfoCollection from './InfoCollection';
import Complete from './Complete';

const OnboardingPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('resume-upload');
  const [userData, setUserData] = useState({});
  
  const handleStepComplete = (data) => {
    setUserData(prev => ({ ...prev, ...data }));
    
    switch(step) {
      case 'resume-upload':
        setStep('info-collection');
        break;
      case 'info-collection':
        setStep('complete');
        break;
      case 'complete':
        navigate('/dashboard');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <ProgressBar currentStep={step} />
        
        <div className="mt-8">
          {step === 'resume-upload' && (
            <ResumeUpload onComplete={handleStepComplete} />
          )}
          {step === 'info-collection' && (
            <InfoCollection 
              initialData={userData}
              onComplete={handleStepComplete} 
            />
          )}
          {step === 'complete' && (
            <Complete onComplete={handleStepComplete} />
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;