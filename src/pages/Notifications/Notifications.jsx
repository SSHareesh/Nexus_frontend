import React, { useState, useEffect } from "react";
import api from "../../utils/api";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await api.getNotifications();
        console.log("API Response:", response.data);  // Inspect API response
        setNotifications(response.data.data );  // Ensure correct structure
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setNotifications([]);  // Avoid undefined issues
      }
    };
    fetchNotifications();
  }, []);

  useEffect(() => {
    console.log("Updated Notifications State:", notifications);
  }, [notifications]); // Logs whenever state updates

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-xl md:text-xl font-bold text-gray-800 mb-6">Notifications</h1>

      {notifications.length > 0 ? (
        <div className="space-y-4">
          {notifications.map((notif) => (
            <div key={notif.id} className="p-4 bg-gray-100 shadow-md rounded-lg">
              <p className="text-gray-800 font-semibold">{notif.message}</p>
              <p className="text-gray-500 text-sm">{notif.date}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No notifications available.</p>
      )}
    </div>
  );
};

export default Notifications;
