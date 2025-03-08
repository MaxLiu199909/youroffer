import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiSettings, FiFileText, FiBriefcase, FiCalendar, FiBell, FiMoon, FiGlobe, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    {
      section: '个人信息',
      items: [
        { icon: <FiUser />, label: '个人资料', link: '/settings' },
        { icon: <FiSettings />, label: '账号设置', link: '/settings' },
      ]
    },
    {
      section: '系统设置',
      items: [
        { 
          icon: <FiMoon />, 
          label: '深色模式', 
          action: () => console.log('Toggle theme'),
          toggle: true
        },
        { 
          icon: <FiGlobe />, 
          label: '切换语言', 
          action: () => console.log('Change language')
        },
        { 
          icon: <FiLogOut />, 
          label: '退出登录', 
          action: handleLogout,
          danger: true
        },
      ]
    }
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center space-x-3 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-medium">
          {user?.avatar || user?.email?.charAt(0).toUpperCase() || 'U'}
        </div>
        <span className="font-medium hidden md:block">
          {user?.name || user?.email?.split('@')[0] || '用户'}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg py-2 z-50"
          >
            {/* User Info */}
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white text-xl font-medium">
                  {user?.avatar || user?.email?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="ml-3">
                  <div className="font-medium">
                    {user?.name || user?.email?.split('@')[0] || '用户'}
                  </div>
                  <div className="text-sm text-gray-500">{user?.email}</div>
                </div>
              </div>
            </div>

            {/* Menu Sections */}
            {menuItems.map((section, index) => (
              <div key={index} className="py-2">
                <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {section.section}
                </div>
                {section.items.map((item, itemIndex) => (
                  item.link ? (
                    <Link
                      key={itemIndex}
                      to={item.link}
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="w-5 h-5">{item.icon}</span>
                      <span className="ml-3">{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto bg-primary text-white text-xs font-medium px-2 py-1 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  ) : (
                    <button
                      key={itemIndex}
                      onClick={() => {
                        item.action();
                        if (!item.toggle) setIsOpen(false);
                      }}
                      className={`flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-200 ${
                        item.danger ? 'text-red-600 hover:text-red-700' : ''
                      }`}
                    >
                      <span className="w-5 h-5">{item.icon}</span>
                      <span className="ml-3">{item.label}</span>
                      {item.toggle && (
                        <div className="ml-auto">
                          <div className="w-8 h-4 bg-gray-200 rounded-full relative">
                            <div className="w-4 h-4 bg-white rounded-full absolute left-0 top-0 shadow transition-transform duration-200 transform"></div>
                          </div>
                        </div>
                      )}
                    </button>
                  )
                ))}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDropdown;