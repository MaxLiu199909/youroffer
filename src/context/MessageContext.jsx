import React, { createContext, useState, useContext, useEffect } from 'react';

// 创建消息上下文
export const MessageContext = createContext();

// 提供消息上下文的组件
export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  
  // 模拟从API获取消息数据
  useEffect(() => {
    const fetchMessages = async () => {
      // 这里应该是从后端API获取消息，现在使用模拟数据
      const mockMessages = [
        {
          id: '1',
          type: 'interview',
          title: '面试邀请：字节跳动前端工程师',
          content: '您好，感谢您应聘字节跳动前端工程师岗位。我们很高兴地通知您，您的简历已通过初筛，我们想邀请您参加线上面试。请在应用中选择合适的面试时间。',
          isRead: false,
          importance: 'high',
          timestamp: new Date('2025-03-07T14:30:00'),
          actionUrl: '/interview/123',
          sender: {
            id: 'byte123',
            name: '字节跳动',
            avatar: 'https://img.alicdn.com/imgextra/i4/O1CN01EI82aG1WKwQEoL8tc_!!6000000002768-2-tps-114-114.png'
          }
        },
        {
          id: '2',
          type: 'application',
          title: '简历已被查看：阿里巴巴',
          content: '您好，您投递给阿里巴巴技术专家岗位的简历已被招聘方查看。请保持手机畅通，随时关注消息更新。',
          isRead: true,
          importance: 'medium',
          timestamp: new Date('2025-03-06T09:15:00'),
          actionUrl: '/applications/456',
          sender: {
            id: 'ali456',
            name: '阿里巴巴',
            avatar: 'https://img.alicdn.com/imgextra/i2/O1CN01RLXnQC1dKXxOJMjXd_!!6000000003717-2-tps-160-160.png'
          }
        },
        {
          id: '3',
          type: 'system',
          title: '简历完善度提醒',
          content: '您的简历完善度为85%，距离求职者中的TOP 20%还差5个百分点。建议您添加项目经历和技能证书，提高简历完善度，获得更多面试机会。',
          isRead: false,
          importance: 'medium',
          timestamp: new Date('2025-03-05T16:45:00'),
          actionUrl: '/resume',
          sender: {
            id: 'system',
            name: '系统通知',
            avatar: ''
          }
        },
        {
          id: '4',
          type: 'message',
          title: '来自招聘官小李的消息',
          content: '您好，我是腾讯招聘官小李，看到您的简历非常感兴趣。想进一步了解您的项目经历和技术栈情况，方便的话可以聊一下吗？',
          isRead: false,
          importance: 'high',
          timestamp: new Date('2025-03-04T11:20:00'),
          actionUrl: '/messages/789',
          sender: {
            id: 'recruiter789',
            name: '小李 · 腾讯',
            avatar: 'https://img.alicdn.com/imgextra/i1/O1CN01YOF2YC1nNFbBoFE8d_!!6000000005071-2-tps-160-160.png'
          }
        },
        {
          id: '5',
          type: 'interview',
          title: '面试时间变更通知',
          content: '您与百度的面试时间已由原来的3月10日下午3点变更为3月11日上午10点，请做好相应安排。如有疑问，请联系招聘官。',
          isRead: true,
          importance: 'high',
          timestamp: new Date('2025-03-03T13:50:00'),
          actionUrl: '/interview/321',
          sender: {
            id: 'baidu321',
            name: '百度',
            avatar: 'https://img.alicdn.com/imgextra/i1/O1CN01Ylw0Mu1cUNP9tGlOC_!!6000000003600-2-tps-160-160.png'
          }
        }
      ];
      
      setMessages(mockMessages);
      setUnreadCount(mockMessages.filter(msg => !msg.isRead).length);
    };
    
    fetchMessages();
  }, []);
  
  // 标记消息为已读
  const markAsRead = (messageId) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, isRead: true } : msg
    ));
    
    setUnreadCount(prev => Math.max(0, prev - 1));
  };
  
  // 标记所有消息为已读
  const markAllAsRead = () => {
    setMessages(messages.map(msg => ({ ...msg, isRead: true })));
    setUnreadCount(0);
  };
  
  // 删除消息
  const deleteMessage = (messageId) => {
    const messageToDelete = messages.find(m => m.id === messageId);
    setMessages(messages.filter(msg => msg.id !== messageId));
    
    if (messageToDelete && !messageToDelete.isRead) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };
  
  return (
    <MessageContext.Provider value={{ 
      messages, 
      unreadCount, 
      markAsRead, 
      markAllAsRead, 
      deleteMessage 
    }}>
      {children}
    </MessageContext.Provider>
  );
};

// 使用消息上下文的钩子
export const useMessages = () => useContext(MessageContext);
