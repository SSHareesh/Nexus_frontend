import React, { useState, useEffect } from "react";
import { Search, Plus, Eye, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

const columnMappings = {
  userid: "User ID",
  name: "Name",
  email: "Email",
  status: "Status",
  project: "Project",
  actions: "Actions",
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [message, setMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.getUsers();
        setUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const handleViewMore = (user) => {
    navigate(`/EditUser/${user.userid}`);
  };

  const handleCreate = () => {
    navigate(`/AddUser`);
  };

  const handleDelete = async () => {
    if (!selectedUser) return;
    try {
      await api.deleteUserById(selectedUser.userid);
      setUsers(users.filter(user => user.userid !== selectedUser.userid));
      setMessage(`User deleted successfully.`);
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
    setSelectedUser(null);
  };

  const filteredUsers = users.filter((user) =>
    user.project.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    return sortOrder === "asc"
      ? a[sortColumn].localeCompare(b[sortColumn])
      : b[sortColumn].localeCompare(a[sortColumn]);
  });

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-xl md:text-xl font-bold text-gray-800">Users</h1>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by project"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base w-full"
            />
          </div>
          <button
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-base"
            onClick={handleCreate}
          >
            <Plus size={18} className="mr-2" /> Add New
          </button>
        </div>
      </div>

      {message && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 border border-green-300 rounded-lg text-center">
          {message}
        </div>
      )}

      <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
        <table className="min-w-full border-collapse text-base ">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              {Object.keys(columnMappings).map((col) => (
                <th key={col} className="p-3 text-center cursor-pointer" onClick={() => handleSort(col)}>
                  {columnMappings[col]}
                  <span className="ml-1 inline-block">
                    {sortColumn === col ? (
                      sortOrder === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    ) : (
                      <ChevronUp size={14} className="text-gray-400" />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user) => (
              <tr key={user.userid} className="border-b hover:bg-gray-100 transition">
                <td className="p-3 text-center">{user.userid}</td>
                <td className="p-3 text-center">{user.name}</td>
                <td className="p-3 text-center">{user.email}</td>
                <td className="p-3 text-center">{user.status}</td>
                <td className="p-3 text-center">{user.project}</td>
                <td className="px-4 py-2 border-b flex justify-center space-x-2">
                  <button className="p-2 rounded bg-blue-100 text-blue-600 hover:bg-blue-200" onClick={() => handleViewMore(user)}>
                    <Eye size={18} />
                  </button>
                  <button className="p-2 rounded bg-red-100 text-red-600 hover:bg-red-200" onClick={() => setSelectedUser(user)}>
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
