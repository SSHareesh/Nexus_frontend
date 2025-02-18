import React, { useEffect, useState } from 'react';
import StatsCard from '../../components/StatsCard/StatsCard';
import { Package, Boxes, HardDrive, FileCode, Wrench, Trash2, AlertTriangle, Monitor } from 'lucide-react';
import api from '../../utils/api';

function Dashboard() {
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
        { title: 'Total Assets', value: counts.assetmanage ?? '0', icon: Package },
        { title: 'Expiring Licenses', value: counts.expiring ?? '0', icon: AlertTriangle },
        { title: 'In Stock', value: counts.stock ?? '0', icon: Boxes },
        { title: 'Hardware Assets', value: counts.in_out ?? '0', icon: Monitor },
        { title: 'Assigned', value: counts.inuse ?? '0', icon: HardDrive },
        { title: 'Maintenance', value: counts.maintenance_manage ?? '0', icon: Wrench },
        { title: 'Disposed', value: counts.disposal ?? '0', icon: Trash2 },
        { title: 'Software Assets', value: counts.softwareassets ?? '0', icon: FileCode },
    ];

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Notifications
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <StatsCard key={index} title={stat.title} value={stat.value} icon={stat.icon} />
                ))}
            </div>
        </div>
    );
}

export default Dashboard;