import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBell, FiBriefcase, FiFileText, FiInfo, FiMessageSquare, FiCheckCircle, FiX, FiCornerUpRight } from 'react-icons/fi';
import { useMessages } from '../context/MessageContext';

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const dropdownRef = useRef(null);
  const modalRef = useRef(null);
  const { messages, unreadCount, markAsRead } = useMessages();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsMessageModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMessageClick = (message) => {
    markAsRead(message.id);
    setSelectedMessage(message);
    setIsMessageModalOpen(true);
    setIsOpen(false);
  };
  
  const handleNavigateToAction = () => {
    if (selectedMessage && selectedMessage.actionUrl) {
      navigate(selectedMessage.actionUrl);
      setIsMessageModalOpen(false);
    }
  };
  
  const viewAllMessages = () => {
    navigate('/messages');
    setIsOpen(false);
  };

  // 消息类型图标映射
  const messageTypeIcons = {
    'system': <FiInfo className="text-blue-500" />,
    'interview': <FiBriefcase className="text-green-500" />,
    'application': <FiFileText className="text-yellow-500" />,
    'message': <FiMessageSquare className="text-purple-500" />
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="relative p-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FiBell className="text-xl" />
        {unreadCount > 0 && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-primary to-secondary text-white text-xs flex items-center justify-center rounded-full"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.div>
        )}
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg z-50 overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">通知</h3>
                {unreadCount > 0 && (
                  <span className="text-xs bg-primary bg-opacity-10 text-primary font-medium px-2 py-1 rounded-full">
                    {unreadCount} 未读
                  </span>
                )}
              </div>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {messages.length > 0 ? (
                <div>
                  {messages.slice(0, 5).map(message => (
                    <div 
                      key={message.id}
                      className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors duration-200 ${!message.isRead ? 'bg-primary bg-opacity-5' : ''}`}
                      onClick={() => handleMessageClick(message)}
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-3">
                          {message.sender?.avatar ? (
                            <img src={message.sender.avatar} alt={message.sender.name} className="w-10 h-10 rounded-full" />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white">
                              {message.type === 'system' ? '系' : message.sender?.name?.[0] || '?'}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-sm truncate">{message.title}</h4>
                            <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                              {new Date(message.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center mt-1">
                            <span className="text-xs flex items-center mr-1">
                              {messageTypeIcons[message.type]}
                            </span>
                            <p className="text-sm text-gray-600 line-clamp-1">{message.content}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-6 text-center text-gray-500">
                  <p>暂无通知</p>
                </div>
              )}
            </div>
            
            <div className="px-4 py-3 border-t border-gray-100">
              <button 
                className="w-full text-center text-primary font-medium text-sm hover:text-opacity-80 transition-colors duration-300"
                onClick={viewAllMessages}
              >
                查看全部
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* 消息详情模态窗口 */}
      <AnimatePresence>
        {isMessageModalOpen && selectedMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
            onClick={() => setIsMessageModalOpen(false)}
          >
            <motion.div 
              ref={modalRef}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-white w-full max-w-md rounded-xl shadow-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative p-6">
                <button 
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setIsMessageModalOpen(false)}
                >
                  <FiX className="text-xl" />
                </button>
                
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 mr-4">
                    {selectedMessage.sender?.avatar ? (
                      <img src={selectedMessage.sender.avatar} alt={selectedMessage.sender.name} className="w-12 h-12 rounded-full" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white text-lg">
                        {selectedMessage.type === 'system' ? '系' : selectedMessage.sender?.name?.[0] || '?'}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold">{selectedMessage.title}</h3>
                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      <span className="mr-2 flex items-center">
                        {messageTypeIcons[selectedMessage.type]}
                        <span className="ml-1">
                          {{  
                            'system': '系统通知',
                            'interview': '面试通知',
                            'application': '申请进度',
                            'message': '私信消息'
                          }[selectedMessage.type]}
                        </span>
                      </span>
                      <span>{new Date(selectedMessage.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <p className="text-gray-700 whitespace-pre-line">{selectedMessage.content}</p>
                </div>
                
                <div className="flex justify-end gap-3">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMessageModalOpen(false)}
                  >
                    关闭
                  </motion.button>
                  
                  {selectedMessage.actionUrl && (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-primary-light text-white shadow-sm hover:shadow-md transition-all flex items-center"
                      onClick={handleNavigateToAction}
                    >
                      <span className="mr-1">查看详情</span>
                      <FiCornerUpRight />
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationBell;
