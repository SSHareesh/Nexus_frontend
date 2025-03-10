import React, { useEffect, useState } from 'react';
import StatsCard from '../../components/StatsCard/StatsCard';
import { Package, Boxes, HardDrive, FileCode, Wrench, Trash2, AlertTriangle, Monitor, CheckSquare, Plus } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../utils/api';

function Dashboard() {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({});

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await api.getCounts();
        console.log('API Response:', response); // Log the response to debug

        if (response && response.data.counts) {
          setCounts(response.data.counts);
        } else {
          console.error('Invalid response data:', response);
        }
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();
  }, []);

  const stats = [
    { title: 'Total Assets', value: Number(counts.assetmanage) + Number(counts.softwareassets) || '0', icon: Package },
    { title: 'Expiring Licenses', value: counts.expiring || '0', icon: AlertTriangle,path:'/SoftwareAssets?filter=expiring' },
    { title: 'In Stock', value: counts.stock || '0', icon: Boxes,path:'/HardwareAssets?filter=in stock' },
    { title: 'Hardware Assets', value: counts.assetmanage || '0', icon: Monitor,path:'/HardwareAssets' },
    { title: 'Assigned', value: counts.inuse || '0', icon: HardDrive,path:'/HardwareAssets?filter=assigned' },
    { title: 'Maintenance', value: counts.maintenance_manage || '0', icon: Wrench,path:'/HardwareAssets?filter=under maintenance' },
    { title: 'Disposed', value: counts.disposal || '0', icon: Trash2,path:'/HardwareAssets?filter=disposed' },
    { title: 'Software Assets', value: counts.softwareassets || '0', icon: FileCode,path:'/SoftwareAssets' },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Notifications
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-around mb-8">
        <button
          onClick={() => navigate("/AddHardwareAsset")}
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg mb-2 hover:bg-blue-700 transition">
          <Plus className="inline-block  mr-2 " size={18} />
          Add Asset
        </button>

        <button
          onClick={() => navigate("/AddSoftware")}
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg mb-2 hover:bg-blue-700 transition">
          <Plus className="inline-block  mr-2 " size={18} />

          Add License
        </button>

        <button
          onClick={() => navigate('/MaintenanceRecords')}
          className="px-6 py-2 bg-gray-600 text-white font-medium rounded-lg mb-2 hover:bg-gray-700 transition">
          <Wrench className="inline-block  mr-2 " size={18} />

          Maintenance
        </button>

        <button
          onClick={() => navigate('/check-in-out')}
          className="px-6 py-2 bg-gray-600 text-white font-medium rounded-lg mb-2 hover:bg-gray-700 transition">
          <CheckSquare className="inline-block  mr-2 " size={18} />

          Check-In/Out
        </button>
      </div>
      <br />

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Link key={index} to={stat.path} className="block">
            <StatsCard key={index} title={stat.title} value={stat.value} icon={stat.icon} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
