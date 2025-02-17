import React from 'react';
import StatsCard from '../../components/StatsCard/StatsCard';
import { Package,Boxes, HardDrive, FileCode,  Wrench, Trash2, AlertTriangle, Monitor } from 'lucide-react';

function Dashboard() {
  const stats = [
    {
      title: 'Total Assets',
      value: '1234',
      icon: Package
    },
    {
      title: 'Expiring Licenses',
      value: '15',
      icon: AlertTriangle
    },
    {
      title: 'In Stock',
      value: '5',
      icon: Boxes
    },
    {
      title: 'Hardware Assets',
      value: '500',
      icon: Monitor
    },
        
    {
      title: 'Assigned',
      value: '900',
      icon: HardDrive
    },
    {
      title: 'Maintenance',
      value: '30',
      icon: Wrench
    },
    {
      title: 'Disposed',
      value: '15',
      icon: Trash2
    },
    {
      title: 'Software Assets',
      value: '734',
      icon: FileCode 
    },
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
          <StatsCard key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}  
            icon={stat.icon}/>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;

// import React from 'react';
// import NavBar from '../components/layout/NavBar';
// import StatsCard from '../components/dashboard/StatsCard';
// import { Package, HardDrive, FileCode, PenTool as Tool, Trash2, AlertTriangle } from 'lucide-react';

// function Dashboard() {
//   const stats = [
//     {
//       title: 'Total Assets',
//       value: '1234',
//       icon: Package
//     },
//     {
//       title: 'In Use',
//       value: '1000',
//       icon: HardDrive
//     },
//     {
//       title: 'Maintenance',
//       value: '30',
//       icon: Tool
//     },
//     {
//       title: 'Depreciated',
//       value: '5',
//       icon: AlertTriangle
//     },
//     {
//       title: 'Hardware Assets',
//       value: '500',
//       icon: HardDrive
//     },
//     {
//       title: 'Software Assets',
//       value: '734',
//       icon: FileCode
//     },
//     {
//       title: 'Expiring Licenses',
//       value: '15',
//       icon: AlertTriangle
//     },
//     {
//       title: 'Disposed',
//       value: '15',
//       icon: Trash2
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <NavBar notifications={5} />
      
//       <main className="pt-24 px-4 md:px-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex justify-between items-center mb-8">
//             <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {stats.map((stat, index) => (
//               <StatsCard
//                 key={index}
//                 title={stat.title}
//                 value={stat.value}
//                 change={stat.change}
//                 icon={stat.icon}
//               />
//             ))}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default Dashboard;