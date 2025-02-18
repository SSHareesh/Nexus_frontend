// import React from 'react';
// import { Link } from 'react-router-dom';

// const NavItem = ({ icon: Icon, label, count = 0, isCollapsed }) => {
//   return (
//     <div className="group relative">
//       <Link
//         to={`/${label.toLowerCase().replace(/\s+/g, '-')}`}
//         className={`flex items-center space-x-3 p-3 rounded-lg text-grey-500 hover:bg-blue-100 hover:text-blue-600 transition-colors ${
//           label === 'Dashboard'  ? 'bg-blue-600 text-white' :''
//         }`}>
//         <Icon size={20} />
//         {!isCollapsed && (
//           <div className="flex items-center justify-between flex-1">
//             <span>{label}</span>
//             {count > 0 && (
//               <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
//                 {count}
//               </span>
//             )}
//           </div>
//         )}
//       </Link>
//       {isCollapsed && (
//         <div className="absolute left-full top-0 ml-2 p-2 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity invisible group-hover:visible z-50">
//           <span className="whitespace-nowrap">{label}</span>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NavItem;


import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavItem = ({ icon: Icon, label, count = 0, isCollapsed }) => {
  const location = useLocation();

  const paths = {
    Dashboard: "/",
    "Hardware Assets": "/HardwareAssets",
    "Software Assets": "/SoftwareAssets",
    "Assigned Assets": "/assigned-assets",
    "In Stock": "/in-stock",
    "Maintenance": "/maintenance",
    "Disposed Assets": "/disposed-assets",
    "Reports": "/reports",
    "Settings": "/settings",
  };

  const currentPath = paths[label] 

  return (
    <div className="group relative">
      <Link
        to={currentPath}
        className={`flex items-center space-x-3 p-3 rounded-lg text-gray-500 hover:bg-blue-100 hover:text-blue-600 transition-colors ${
          location.pathname === currentPath ? "bg-blue-600 text-white" : ""
        }`}
      >
        <Icon size={20} />
        {!isCollapsed && (
          <div className="flex items-center justify-between flex-1">
            <span>{label}</span>
            {count > 0 && (
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                {count}
              </span>
            )}
          </div>
        )}
      </Link>

   
      {isCollapsed && (
        <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 p-2 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity invisible group-hover:visible z-50">
          <span className="whitespace-nowrap text-gray-700">{label}</span>
        </div>
      )}
    </div>
  );
};

export default NavItem;
