import React from 'react';
import StatsCard from '../components/dashboard/StatsCard';
import { Package, HardDrive, FileCode, PenTool as Tool, Trash2, AlertTriangle } from 'lucide-react';

function Dashboard() {
  const stats = [
    {
      title: 'Total Assets',
      value: '1234',
      change: { value: '12.45%', isPositive: true },
      icon: Package
    },
    {
      title: 'In Use',
      value: '1000',
      change: { value: '8.45%', isPositive: true },
      icon: HardDrive
    },
    {
      title: 'Maintenance',
      value: '30',
      change: { value: '2.45%', isPositive: false },
      icon: Tool
    },
    {
      title: 'Depreciated',
      value: '5',
      change: { value: '0.45%', isPositive: false },
      icon: AlertTriangle
    },
    {
      title: 'Hardware Assets',
      value: '500',
      change: { value: '5.45%', isPositive: true },
      icon: HardDrive
    },
    {
      title: 'Software Assets',
      value: '734',
      change: { value: '3.45%', isPositive: true },
      icon: FileCode
    },
    {
      title: 'Expiring Licenses',
      value: '15',
      change: { value: '1.45%', isPositive: false },
      icon: AlertTriangle
    },
    {
      title: 'Disposed',
      value: '15',
      change: { value: '0.45%', isPositive: false },
      icon: Trash2
    }
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Manage
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;