import React, { useState } from 'react';
import { Bell,  Search, HardDrive,  FileCode,  PenTool as Tool, Users, ClipboardList, X} from 'lucide-react';

const NavBar = ({ notifications = 5 }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { icon: HardDrive, path: '/hardware' },
    { icon: FileCode, path: '/software' },
    { icon: Tool, path: '/maintenance' },
    { icon: Users, path: '/Users' },
    { icon: ClipboardList,  path: '/audit' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 fixed right-0 top-0 h-16 transition-all duration-300 z-10" style={{ left: '16rem' }} >
      <div className="h-full px-4 flex items-center justify-between">
       
        <div className="hidden md:flex items-center space-x-4">
          {navItems.map((item, index) => (
            <button
              key={index}
              className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <item.icon className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-4 ml-auto">
          <div className="relative">
            {isSearchOpen ? (
              <div className="absolute right-0 top-0 flex items-center bg-white rounded-lg shadow-lg">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 px-4 py-2 text-sm border border-gray-200 rounded-l-lg focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="p-2 text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
            <Bell className="w-5 h-5" />
            {notifications > 0 && (
              <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;