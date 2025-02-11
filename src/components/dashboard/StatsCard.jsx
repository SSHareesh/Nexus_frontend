import React from 'react';

const StatsCard = ({ title, value, change, icon: Icon }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-2xl font-semibold mt-1">{value}</h3>
        </div>
        <div className="bg-blue-50 p-3 rounded-lg">
          <Icon size={24} className="text-blue-500" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;