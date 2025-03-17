import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FiMic, FiMicOff, FiVideo, FiVideoOff, FiMessageSquare, 
  FiMaximize, FiMinimize, FiPhoneOff, FiShare, FiUsers,
  FiXCircle, FiChevronLeft, FiMoreVertical, FiSend, FiClock, FiHome, FiCalendar
} from 'react-icons/fi';
import Logo from '../components/Logo';
import UserDropdown from '../components/UserDropdown';

const InterviewRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isMeetingStarted, setIsMeetingStarted] = useState(false);
  
  // 模拟面试数据
  const interviewData = {
    id: id || '1',
    company: '字节跳动',
    position: '高级前端工程师',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Bytedance_logo.svg/1280px-Bytedance_logo.svg.png',
    type: 'technical',
    date: '2025-03-10',
    time: '14:00-15:30',
    interviewer: '张工',
    location: '线上面试',
    platform: 'Zoom'
  };
  
  // 模拟参与者数据
  const participants = [
    { id: 1, name: '张工', role: '面试官', avatar: 'https://randomuser.me/api/portraits/men/42.jpg', isInterviewer: true },
    { id: 2, name: '王工', role: '技术专家', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', isInterviewer: true },
    { id: 3, name: '李明', role: '候选人', avatar: 'https://randomuser.me/api/portraits/men/22.jpg', isInterviewer: false }
  ];
  
  // 初始化消息数据
  useEffect(() => {
    setMessages([
      { id: 1, sender: '系统', content: '面试即将开始，请做好准备', time: '13:58', isSystem: true },
      { id: 2, sender: '张工', content: '您好，欢迎参加我们的技术面试', time: '14:00', isSystem: false }
    ]);
  }, []);

  // 计时器
  useEffect(() => {
    let timer;
    if (isMeetingStarted) {
      timer = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isMeetingStarted]);
  
  // 格式化时间
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // 处理消息发送
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      sender: '李明',
      content: messageInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSystem: false
    };
    
    setMessages([...messages, newMessage]);
    setMessageInput('');
  };
  
  // 处理退出面试
  const handleEndInterview = () => {
    if (window.confirm('确定要结束面试吗？')) {
      navigate('/interviews');
    }
  };
  
  // 处理开始面试
  const handleStartInterview = () => {
    setIsMeetingStarted(true);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 头部 */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <Logo isDarkMode={true} size="medium" />
          </div>
          
          <div className="flex items-center">
            <div className="mr-4 flex items-center text-gray-600">
              <FiClock className="mr-1" />
              <span className="font-mono">
                {isMeetingStarted ? formatTime(elapsedTime) : '00:00'}
              </span>
            </div>
            <UserDropdown />
          </div>
        </div>
      </header>
      
      {/* 主内容区 */}
      <main className="container mx-auto px-6 py-8">
        {/* 页面标题 */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <motion.button 
              className="flex items-center justify-center mr-4 p-2 rounded-full bg-gray-100 hover:bg-primary hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/interviews')}
            >
              <FiChevronLeft className="text-lg" />
            </motion.button>
            <div className="flex items-center">
              <FiVideo className="text-primary mr-2" />
              <h2 className="text-2xl font-bold">面试室</h2>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <motion.button 
              className="flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-primary-light text-white shadow-sm hover:shadow-md transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/dashboard')}
            >
              <FiHome className="mr-2" />
              返回仪表盘
            </motion.button>
          </div>
        </div>
        
        {/* 视频区域 */}
        <div className="flex-1">
          {isMeetingStarted ? (
            <motion.div
              className="bg-white rounded-xl shadow-sm overflow-hidden relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* 主视频 */}
              <div className="w-full relative" style={{ aspectRatio: '16/9' }}>
                {isVideoOn ? (
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" 
                    alt="面试官视频" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-gray-700 rounded-full mx-auto flex items-center justify-center mb-4">
                        <span className="text-3xl text-white font-medium">张工</span>
                      </div>
                      <p className="text-gray-400">摄像头已关闭</p>
                    </div>
                  </div>
                )}
                
                {/* 悬浮名称 */}
                <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-md">
                  张工（面试官）
                </div>
              </div>
              
              {/* 其他参与者视频 */}
              <div className="absolute top-4 right-4 flex space-x-3">
                <div className="w-40 h-24 bg-gray-800 rounded-lg overflow-hidden shadow-md border-2 border-white">
                  {isVideoOn ? (
                    <img 
                      src="https://randomuser.me/api/portraits/men/22.jpg" 
                      alt="我的视频" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                        <span className="text-sm text-white">李明</span>
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-1 left-2 text-white text-xs bg-black bg-opacity-60 px-1 rounded">
                    我
                  </div>
                </div>
                
                <div className="w-40 h-24 bg-gray-800 rounded-lg overflow-hidden shadow-md border-2 border-white">
                  <img 
                    src="https://randomuser.me/api/portraits/men/32.jpg" 
                    alt="技术专家视频" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-1 left-2 text-white text-xs bg-black bg-opacity-60 px-1 rounded">
                    王工
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-start gap-4 w-full mb-6">
                {/* 公司Logo */}
                <div className="w-16 h-16 flex-shrink-0 bg-white rounded-lg overflow-hidden border">
                  <img 
                    src={interviewData.logo} 
                    alt={interviewData.company} 
                    className="w-full h-full object-contain" 
                  />
                </div>
                
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{interviewData.position}</h3>
                      <p className="text-gray-700">{interviewData.company}</p>
                    </div>
                    <div className="px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                      技术面试
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <FiCalendar className="mr-2" />
                      <span>{interviewData.date} {interviewData.time}</span>
                    </div>
                    <div className="flex items-center">
                      <FiVideo className="mr-2" />
                      <span>{interviewData.platform}面试</span>
                    </div>
                    <div className="flex items-center">
                      <FiUsers className="mr-2" />
                      <span>面试官: {interviewData.interviewer}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="w-full border-t pt-6 mt-2 flex flex-col items-center">
                <h2 className="text-xl font-bold mb-6">准备好开始面试了吗？</h2>
                <motion.button
                  className="bg-gradient-to-r from-primary-light to-secondary-light text-white px-6 py-3 rounded-lg flex items-center shadow-sm"
                  whileHover={{ scale: 1.05 }}
                  onClick={handleStartInterview}
                >
                  <FiVideo className="mr-2" />
                  开始面试
                </motion.button>
              </div>
            </motion.div>
          )}
          
          {/* 控制区域 */}
          {isMeetingStarted && (
            <motion.div 
              className="mt-6 bg-white rounded-xl shadow-sm p-4 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center space-x-5">
                <motion.button
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${isAudioOn ? 'bg-gray-200 text-gray-700' : 'bg-red-500 text-white'}`}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setIsAudioOn(!isAudioOn)}
                >
                  {isAudioOn ? <FiMic size={20} /> : <FiMicOff size={20} />}
                </motion.button>
                
                <motion.button
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${isVideoOn ? 'bg-gray-200 text-gray-700' : 'bg-red-500 text-white'}`}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setIsVideoOn(!isVideoOn)}
                >
                  {isVideoOn ? <FiVideo size={20} /> : <FiVideoOff size={20} />}
                </motion.button>
                
                <motion.button
                  className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-700"
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setIsChatOpen(!isChatOpen)}
                >
                  <FiMessageSquare size={20} />
                </motion.button>
                
                <motion.button
                  className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-700"
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setIsFullScreen(!isFullScreen)}
                >
                  {isFullScreen ? <FiMinimize size={20} /> : <FiMaximize size={20} />}
                </motion.button>
                
                <motion.button
                  className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-700"
                  whileHover={{ scale: 1.1 }}
                >
                  <FiShare size={20} />
                </motion.button>
                
                <motion.button
                  className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white"
                  whileHover={{ scale: 1.1 }}
                  onClick={handleEndInterview}
                >
                  <FiPhoneOff size={20} />
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* 侧边栏 - 聊天区域 */}
        {isMeetingStarted && isChatOpen && (
          <motion.div 
            className="w-80 ml-6 bg-white rounded-xl shadow-sm overflow-hidden flex flex-col"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-4 flex justify-between items-center border-b">
              <h3 className="text-lg font-semibold">聊天</h3>
              <button 
                className="text-gray-400 hover:text-gray-600" 
                onClick={() => setIsChatOpen(false)}
              >
                <FiXCircle />
              </button>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map(message => (
                <div key={message.id} className={`flex ${message.isSystem ? 'justify-center' : 'items-start'}`}>
                  {message.isSystem ? (
                    <div className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                      {message.content}
                    </div>
                  ) : (
                    <>
                      <div className="flex-shrink-0 mr-3">
                        {message.sender === '李明' ? (
                          <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">
                            <span className="font-medium">李</span>
                          </div>
                        ) : (
                          <div className="w-8 h-8 bg-gray-500 text-white rounded-full flex items-center justify-center">
                            <span className="font-medium">{message.sender.charAt(0)}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-baseline mb-1">
                          <span className="font-medium text-sm">{message.sender}</span>
                          <span className="ml-2 text-gray-400 text-xs">{message.time}</span>
                        </div>
                        <p className="text-gray-800 bg-gray-100 p-3 rounded-lg inline-block">
                          {message.content}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
            
            <form onSubmit={handleSendMessage} className="border-t p-3 flex">
              <input
                type="text"
                className="flex-1 border border-gray-200 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="输入消息..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
              />
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded-r-lg"
              >
                <FiSend />
              </button>
            </form>
          </motion.div>
        )}
        
        {/* 参与者列表 */}
        {isMeetingStarted && !isChatOpen && (
          <motion.div 
            className="w-80 ml-6 bg-white rounded-xl shadow-sm overflow-hidden flex flex-col"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-4 flex justify-between items-center border-b">
              <h3 className="text-lg font-semibold flex items-center">
                <FiUsers className="mr-2" />
                参与者 ({participants.length})
              </h3>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {participants.map(participant => (
                <div key={participant.id} className="flex items-center p-2 hover:bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 mr-3">
                    <img 
                      src={participant.avatar} 
                      alt={participant.name} 
                      className="w-10 h-10 rounded-full object-cover" 
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <span className="font-medium">{participant.name}</span>
                      {participant.isInterviewer && (
                        <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                          面试官
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{participant.role}</p>
                  </div>
                  <div className="flex space-x-2">
                    {participant.id !== 3 && isAudioOn && (
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <FiMic className="w-3 h-3 text-green-600" />
                      </div>
                    )}
                    {participant.id !== 3 && isVideoOn && (
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <FiVideo className="w-3 h-3 text-green-600" />
                      </div>
                    )}
                    <button className="text-gray-400 hover:text-gray-600">
                      <FiMoreVertical />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t p-3">
              <button 
                className="w-full text-primary flex items-center justify-center py-2 hover:bg-primary hover:bg-opacity-10 rounded-lg transition-colors"
                onClick={() => setIsChatOpen(true)}
              >
                <FiMessageSquare className="mr-2" />
                打开聊天
              </button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default InterviewRoom;
