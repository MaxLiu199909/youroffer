import React, { useState } from 'react';
import { FiArrowLeft, FiSearch, FiTrash, FiCheckCircle, FiBell, FiBriefcase, FiMessageSquare, FiInfo, FiFileText } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useMessages } from '../context/MessageContext';
import Logo from '../components/Logo';
import UserDropdown from '../components/UserDropdown';
import NotificationBell from '../components/NotificationBell';

const MessageCenter = () => {
  const { messages, markAsRead, markAllAsRead, deleteMessage } = useMessages();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  
  // 过滤消息
  const filteredMessages = messages
    .filter(msg => {
      if (filter === 'all') return true;
      if (filter === 'unread') return !msg.isRead;
      return msg.type === filter;
    })
    .filter(msg => 
      msg.title.toLowerCase().includes(search.toLowerCase()) ||
      msg.content.toLowerCase().includes(search.toLowerCase())
    );
  
  const messageTypeIcons = {
    'system': <FiInfo className="text-blue-500" />,
    'interview': <FiBriefcase className="text-green-500" />,
    'application': <FiFileText className="text-yellow-500" />,
    'message': <FiMessageSquare className="text-purple-500" />
  };
  
  const messageTypeLabels = {
    'system': '系统通知',
    'interview': '面试邀请',
    'application': '申请状态',
    'message': '私信消息'
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Logo isDarkMode={true} size="medium" />
            <div className="flex items-center space-x-4">
              <NotificationBell />
              <UserDropdown />
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <motion.button 
              className="flex items-center justify-center mr-4 p-2 rounded-full bg-gray-100 hover:bg-primary hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
            >
              <FiArrowLeft className="text-lg" />
            </motion.button>
            <h1 className="text-2xl font-bold">消息中心</h1>
          </div>
          
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="搜索消息..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Message Types */}
          <div className="md:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                className={`flex items-center w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors duration-200 ${
                  filter === 'all' ? 'border-l-4 border-primary bg-primary bg-opacity-5' : ''
                }`}
                onClick={() => setFilter('all')}
              >
                <span className={`text-xl ${filter === 'all' ? 'text-primary' : 'text-gray-500'}`}>
                  <FiBell />
                </span>
                <span className={`ml-3 ${filter === 'all' ? 'font-medium text-primary' : 'text-gray-700'}`}>
                  全部消息
                </span>
                {messages.length > 0 && (
                  <span className="ml-auto bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                    {messages.length}
                  </span>
                )}
              </button>
              
              <button
                className={`flex items-center w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors duration-200 ${
                  filter === 'unread' ? 'border-l-4 border-primary bg-primary bg-opacity-5' : ''
                }`}
                onClick={() => setFilter('unread')}
              >
                <span className={`text-xl ${filter === 'unread' ? 'text-primary' : 'text-gray-500'}`}>
                  <FiBell />
                </span>
                <span className={`ml-3 ${filter === 'unread' ? 'font-medium text-primary' : 'text-gray-700'}`}>
                  未读消息
                </span>
                {messages.filter(m => !m.isRead).length > 0 && (
                  <span className="ml-auto bg-primary text-white text-xs px-2 py-1 rounded-full">
                    {messages.filter(m => !m.isRead).length}
                  </span>
                )}
              </button>
              
              {Object.keys(messageTypeLabels).map(type => (
                <button
                  key={type}
                  className={`flex items-center w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors duration-200 ${
                    filter === type ? 'border-l-4 border-primary bg-primary bg-opacity-5' : ''
                  }`}
                  onClick={() => setFilter(type)}
                >
                  <span className={`text-xl ${filter === type ? 'text-primary' : 'text-gray-500'}`}>
                    {messageTypeIcons[type]}
                  </span>
                  <span className={`ml-3 ${filter === type ? 'font-medium text-primary' : 'text-gray-700'}`}>
                    {messageTypeLabels[type]}
                  </span>
                  {messages.filter(m => m.type === type).length > 0 && (
                    <span className="ml-auto bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                      {messages.filter(m => m.type === type).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
            
            <div className="mt-4">
              <button 
                className="w-full flex justify-center items-center bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity duration-300"
                onClick={markAllAsRead}
              >
                <FiCheckCircle className="mr-2" />
                全部标为已读
              </button>
            </div>
          </div>
          
          {/* Messages */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {filteredMessages.length > 0 ? (
                filteredMessages.map(message => (
                  <motion.div 
                    key={message.id}
                    layout
                    className="border-b border-gray-100 last:border-0"
                  >
                    <div className={`p-6 hover:bg-gray-50 transition-colors duration-200 ${!message.isRead ? 'bg-primary bg-opacity-5' : ''}`}>
                      <div className="flex">
                        {message.sender?.avatar ? (
                          <img src={message.sender.avatar} alt={message.sender.name} className="w-12 h-12 rounded-full mr-4" />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white mr-4">
                            {message.type === 'system' ? '系' : message.sender?.name?.[0] || '?'}
                          </div>
                        )}
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{message.title}</h3>
                            <span className="text-sm text-gray-500">
                              {new Date(message.timestamp).toLocaleString()}
                            </span>
                          </div>
                          
                          <div className="mt-1 flex items-center">
                            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 mr-2">
                              {messageTypeLabels[message.type] || message.type}
                            </span>
                            {message.importance === 'high' && (
                              <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700">
                                重要
                              </span>
                            )}
                          </div>
                          
                          <p className="mt-2 text-gray-700">{message.content}</p>
                          
                          <div className="mt-4 flex justify-end space-x-2">
                            {!message.isRead && (
                              <motion.button 
                                className="text-sm px-4 py-2 rounded-lg bg-primary text-white hover:bg-opacity-90"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => markAsRead(message.id)}
                              >
                                标为已读
                              </motion.button>
                            )}
                            <motion.button 
                              className="text-sm px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() => deleteMessage(message.id)}
                            >
                              <FiTrash className="mr-1 inline-block" />
                              删除
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="py-16 text-center">
                  <FiBell className="mx-auto text-5xl text-gray-300 mb-4" />
                  <p className="text-gray-500">没有符合条件的消息</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MessageCenter;
