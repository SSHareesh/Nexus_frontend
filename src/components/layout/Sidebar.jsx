import React from 'react';
import {  Menu,Wrench, LayoutDashboard,  Monitor, FileCode,NotebookPen, Users,Trash2, Bell, FileText, Settings } from 'lucide-react';
import NavItem from './NavItem';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', count: 0 },
  { icon: Monitor, label: 'Hardware Assets', count: 0 },
  { icon: FileCode, label: 'Software Assets', count: 0 },
  { icon: Wrench, label: 'Maintenance', count: 0 },
  { icon: Users, label: 'User Details', count: 0 },
  { icon: Trash2, label: 'Disposed', count: 0 },
  { icon: Bell, label: 'Notifications', count: 5 },
];

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  return (
    <div className={`bg-white border-r border-gray-200 h-screen transition-all duration-300 ${
      isCollapsed ? 'w-20' : 'w-64'
    } fixed left-0 top-0`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && <h1 className="text-xl font-bold text-gray-700">NEXUS</h1>}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          {isCollapsed ? <Menu size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <nav className="p-4 space-y-2">
        {navItems.map((item, index) => (
          <NavItem
            key={index}
            icon={item.icon}
            label={item.label}
            count={item.count}
            isCollapsed={isCollapsed}
          />
        ))}
      </nav>

      <div className="absolute bottom-0 w-full border-t border-gray-200 p-4">
        <NavItem
          icon={Settings}
          label="Settings"
          isCollapsed={isCollapsed}
          count={0}
        />
      </div>
    </div>
  );
};

export default Sidebar;