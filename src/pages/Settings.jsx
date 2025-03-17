import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiLock, FiEye, FiEyeOff, FiMail, FiPhone, FiMapPin, FiBriefcase, FiGlobe, FiSun, FiMoon, FiBell, FiShield, FiSliders, FiChevronLeft, FiHome } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import UserDropdown from '../components/UserDropdown';
import NotificationBell from '../components/NotificationBell';

const Settings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '张三',
    title: '产品经理',
    email: 'zhang@mail.com',
    phone: '13812345678',
    city: '北京',
    website: '',
    bio: ''
  });
  
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    jobMatches: true,
    applicationUpdates: true,
    messages: true,
    marketingEmails: false,
    sms: true,
    pushNotifications: true
  });
  
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    allowRecruiters: true,
    dataSharing: 'minimal'
  });
  
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };
  
  const handleSecurityChange = (e) => {
    const { name, value } = e.target;
    setSecurityData({
      ...securityData,
      [name]: value
    });
  };
  
  const handleNotificationChange = (setting) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting]
    });
  };
  
  const handlePrivacyChange = (setting, value) => {
    setPrivacySettings({
      ...privacySettings,
      [setting]: value
    });
  };
  
  const tabs = [
    { id: 'profile', label: '个人资料', icon: <FiUser /> },
    { id: 'security', label: '账号安全', icon: <FiLock /> },
    { id: 'privacy', label: '隐私设置', icon: <FiShield /> },
    { id: 'notifications', label: '通知设置', icon: <FiBell /> },
    { id: 'appearance', label: '外观设置', icon: <FiSliders /> }
  ];
  
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
              onClick={() => navigate('/dashboard')}
            >
              <FiChevronLeft className="text-lg" />
            </motion.button>
            <div className="flex items-center">
              <FiSliders className="text-primary mr-2" />
              <h1 className="text-2xl font-bold">设置</h1>
            </div>
          </div>
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
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Tabs */}
          <div className="md:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`flex items-center w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors duration-200 ${
                    activeTab === tab.id ? 'border-l-4 border-primary bg-primary bg-opacity-5' : ''
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className={`text-xl ${activeTab === tab.id ? 'text-primary' : 'text-gray-500'}`}>
                    {tab.icon}
                  </span>
                  <span className={`ml-3 ${activeTab === tab.id ? 'font-medium text-primary' : 'text-gray-700'}`}>
                    {tab.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              {/* Profile Settings */}
              {activeTab === 'profile' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-semibold mb-6">个人资料</h2>
                  
                  <div className="flex flex-col md:flex-row gap-6 mb-6">
                    <div className="md:w-1/3">
                      <div className="flex flex-col items-center">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white text-4xl font-medium mb-4">
                          ZS
                        </div>
                        <button className="text-primary text-sm font-medium hover:underline">
                          更换头像
                        </button>
                        <div className="mt-4 text-center">
                          <div className="text-sm text-gray-500 mb-1">等级 5</div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                            <div className="bg-primary h-2 rounded-full" style={{ width: '70%' }}></div>
                          </div>
                          <div className="text-xs text-gray-500">350/500 经验值</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:w-2/3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            姓名
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={profileData.name}
                            onChange={handleProfileChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            职业头衔
                          </label>
                          <input
                            type="text"
                            name="title"
                            value={profileData.title}
                            onChange={handleProfileChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            电子邮箱
                          </label>
                          <div className="relative">
                            <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                              type="email"
                              name="email"
                              value={profileData.email}
                              onChange={handleProfileChange}
                              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            手机号码
                          </label>
                          <div className="relative">
                            <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                              type="tel"
                              name="phone"
                              value={profileData.phone}
                              onChange={handleProfileChange}
                              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            所在城市
                          </label>
                          <div className="relative">
                            <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                              type="text"
                              name="city"
                              value={profileData.city}
                              onChange={handleProfileChange}
                              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            个人网站
                          </label>
                          <div className="relative">
                            <FiGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                              type="url"
                              name="website"
                              value={profileData.website}
                              onChange={handleProfileChange}
                              placeholder="https://"
                              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          个人简介
                        </label>
                        <textarea
                          name="bio"
                          value={profileData.bio}
                          onChange={handleProfileChange}
                          rows="4"
                          placeholder="简单介绍一下自己..."
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button className="gradient-button">
                      保存更改
                    </button>
                  </div>
                </motion.div>
              )}
              
              {/* Security Settings */}
              {activeTab === 'security' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-semibold mb-6">账号安全</h2>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-4">修改密码</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          当前密码
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            name="currentPassword"
                            value={securityData.currentPassword}
                            onChange={handleSecurityChange}
                            className="w-full pr-10 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          新密码
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            name="newPassword"
                            value={securityData.newPassword}
                            onChange={handleSecurityChange}
                            className="w-full pr-10 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                          </button>
                        </div>
                        
                        {/* Password Strength Indicator */}
                        {securityData.newPassword && (
                          <div className="mt-2">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-gray-500">密码强度</span>
                              <span className="text-xs font-medium text-yellow-500">中等</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1">
                              <div className="bg-yellow-500 h-1 rounded-full" style={{ width: '60%' }}></div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          确认新密码
                        </label>
                        <input
                          type={showPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={securityData.confirmPassword}
                          onChange={handleSecurityChange}
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                        />
                        
                        {/* Password Match Indicator */}
                        {securityData.confirmPassword && (
                          <div className="mt-1">
                            {securityData.newPassword === securityData.confirmPassword ? (
                              <span className="text-xs text-green-500 flex items-center">
                                <FiCheckCircle className="mr-1" /> 密码匹配
                              </span>
                            ) : (
                              <span className="text-xs text-red-500">密码不匹配</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <button className="gradient-button">
                        更新密码
                      </button>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-6 mt-6">
                    <h3 className="text-lg font-medium mb-4">两步验证</h3>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">启用两步验证</div>
                        <p className="text-sm text-gray-500 mt-1">
                          使用手机验证码增强账号安全
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary peer-focus:ring-opacity-20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-6 mt-6">
                    <h3 className="text-lg font-medium mb-4">登录设备</h3>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between">
                          <div>
                            <div className="font-medium">Chrome on Windows</div>
                            <div className="text-sm text-gray-500 mt-1">
                              北京, 中国 • 当前设备
                            </div>
                          </div>
                          <button className="text-primary text-sm font-medium">
                            详情
                          </button>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between">
                          <div>
                            <div className="font-medium">Safari on iPhone</div>
                            <div className="text-sm text-gray-500 mt-1">
                              北京, 中国 • 最近登录: 昨天
                            </div>
                          </div>
                          <button className="text-primary text-sm font-medium">
                            详情
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <button className="text-red-500 text-sm font-medium">
                        登出所有设备
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Privacy Settings */}
              {activeTab === 'privacy' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-semibold mb-6">隐私设置</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">个人资料可见性</h3>
                      
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="profileVisibility"
                            checked={privacySettings.profileVisibility === 'public'}
                            onChange={() => handlePrivacyChange('profileVisibility', 'public')}
                            className="w-4 h-4 text-primary focus:ring-primary"
                          />
                          <div className="ml-3">
                            <div className="font-medium">公开</div>
                            <p className="text-sm text-gray-500">
                              所有人都可以查看您的完整资料
                            </p>
                          </div>
                        </label>
                        
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="profileVisibility"
                            checked={privacySettings.profileVisibility === 'limited'}
                            onChange={() => handlePrivacyChange('profileVisibility', 'limited')}
                            className="w-4 h-4 text-primary focus:ring-primary"
                          />
                          <div className="ml-3">
                            <div className="font-medium">有限</div>
                            <p className="text-sm text-gray-500">
                              只有招聘者和您申请的公司可以查看您的完整资料
                            </p>
                          </div>
                        </label>
                        
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="profileVisibility"
                            checked={privacySettings.profileVisibility === 'private'}
                            onChange={() => handlePrivacyChange('profileVisibility', 'private')}
                            className="w-4 h-4 text-primary focus:ring-primary"
                          />
                          <div className="ml-3">
                            <div className="font-medium">私密</div>
                            <p className="text-sm text-gray-500">
                              只有您申请的公司可以查看您的资料
                            </p>
                          </div>
                        </label>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-6">
                      <h3 className="text-lg font-medium mb-4">联系方式保护</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">显示电子邮箱</div>
                            <p className="text-sm text-gray-500">
                              允许招聘者查看您的电子邮箱
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              className="sr-only peer"
                              checked={privacySettings.showEmail}
                              onChange={() => handlePrivacyChange('showEmail', !privacySettings.showEmail)}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary peer-focus:ring-opacity-20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">显示手机号码</div>
                            <p className="text-sm text-gray-500">
                              允许招聘者查看您的手机号码
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              className="sr-only peer"
                              checked={privacySettings.showPhone}
                              onChange={() => handlePrivacyChange('showPhone', !privacySettings.showPhone)}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary peer-focus:ring-opacity-20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-6">
                      <h3 className="text-lg font-medium mb-4">招聘者联系</h3>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">允许招聘者主动联系</div>
                          <p className="text-sm text-gray-500">
                            招聘者可以根据您的资料主动发送职位邀请
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer"
                            checked={privacySettings.allowRecruiters}
                            onChange={() => handlePrivacyChange('allowRecruiters', !privacySettings.allowRecruiters)}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary peer-focus:ring-opacity-20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-6">
                      <h3 className="text-lg font-medium mb-4">数据共享</h3>
                      
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="dataSharing"
                            checked={privacySettings.dataSharing === 'full'}
                            onChange={() => handlePrivacyChange('dataSharing', 'full')}
                            className="w-4 h-4 text-primary focus:ring-primary"
                          />
                          <div className="ml-3">
                            <div className="font-medium">完整共享</div>
                            <p className="text-sm text-gray-500">
                              共享您的完整求职数据以获得更好的职位推荐
                            </p>
                          </div>
                        </label>
                        
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="dataSharing"
                            checked={privacySettings.dataSharing === 'minimal'}
                            onChange={() => handlePrivacyChange('dataSharing', 'minimal')}
                            className="w-4 h-4 text-primary focus:ring-primary"
                          />
                          <div className="ml-3">
                            <div className="font-medium">最小共享</div>
                            <p className="text-sm text-gray-500">
                              仅共享必要的数据用于基本功能
                            </p>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <button className="gradient-button">
                      保存隐私设置
                    </button>
                  </div>
                </motion.div>
              )}
              
              {/* Notification Settings */}
              {activeTab === 'notifications' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-semibold mb-6">通知设置</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">电子邮件通知</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">职位匹配</div>
                            <p className="text-sm text-gray-500">
                              当有新的匹配职位时通知我
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              className="sr-only peer"
                              checked={notificationSettings.jobMatches}
                              onChange={() => handleNotificationChange('jobMatches')}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary peer-focus:ring-opacity-20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">申请更新</div>
                            <p className="text-sm text-gray-500">
                              当我的申请状态有更新时通知我
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" onChange={() => handleNotificationChange('applicationUpdates')} checked={notificationSettings.applicationUpdates} />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary peer-focus:ring-opacity-20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-gray-100 pt-6">
                      <h3 className="text-lg font-medium mb-4">应用内通知</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">系统更新</div>
                            <p className="text-sm text-gray-500">
                              当有新的系统功能或更新时通知我
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              className="sr-only peer"
                              checked={notificationSettings.systemUpdates}
                              onChange={() => handleNotificationChange('systemUpdates')}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary peer-focus:ring-opacity-20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex justify-end">
                      <button className="gradient-button">
                        保存通知设置
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;