import React, { useEffect, useState } from "react";
import axios from "axios";
import {toast} from "react-hot-toast";

const StaticUserTable = () => {
  const [showForm, setShowForm] = useState(false);
  const [user, setuser] = useState([]);
  const [searchUser, setsearchUser] = useState('')

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editUserId, setEditUserId] = useState(null);

  const fetchData = async () => {
    const loadingToast = toast.loading("Fetching users...");
    try {
      const response = await axios.get("http://localhost:3000/api/users");
      setuser(response.data);
      toast.success("Users fetched successfully", { id: loadingToast,  position:"top-right" });

    } catch (error) {
      toast.error("Failed to fetch users", { id: loadingToast,  position:"top-right" });
      console.log("Error while fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddUser = async () => {
    if (!name || !email) {
      toast.error("Please enter both name and email", { position:"top-right"});
      return;
    }
  
    const loadingToast = toast.loading("Creating user...");
  
    try {
      const response = await axios.post("http://localhost:3000/api/user", {
        name,
        email,
      });
  
      // You mentioned backend sometimes sends alert-like messages
      const msg = response.data?.message || "User created successfully!";
      toast.success(msg, { id: loadingToast,  position:"top-right" });
  
      // Optional: Reset form
      setName("");
      setEmail("");
  
      fetchData(); // Refresh user list
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong.",
        { id: loadingToast,  position:"top-right" }
      );
      console.error("Error adding user:", error);
    }
  };
  

  const handleDeleteUser = (id) => {
    const toastId = toast.loading("Deleting user...");
  
    axios
      .delete(`http://localhost:3000/api/deleteuser/${id}`)
      .then(() => {
        setuser((prev) => prev.filter((user) => user._id !== id));
        setShowForm(false);
        toast.success("User deleted successfully!", { id: toastId });
      })
      .catch((err) => {
        console.error("Error deleting user:", err);
        toast.error(
          err.response?.data?.message || "Failed to delete user.",
          { id: toastId }
        );
      });
  };

  const handleEditClick = (user) => {
    setIsEditing(true);
    setEditUserId(user._id); // or user.id depending on backend
    setName(user.name);
    setEmail(user.email);
    setShowForm(true);
  };

const handleUpdateUser = async () => {
  if (!name || !email) {
    toast.error("Please enter both name and email");
    return;
  }

  const toastId = toast.loading("Updating user...");

  try {
    await axios.put(`http://localhost:3000/api/updatebyid/${editUserId}`, {
      name,
      email,
    });

    toast.success("User updated successfully!", { id: toastId });

    setName('');
    setEmail('');
    setIsEditing(false);
    setEditUserId(null);
    fetchData(); // Refresh the user list
    setShowForm(false);

  } catch (error) {
    console.error("Error updating user:", error);
    toast.error(
      error.response?.data?.message || "Failed to update user",
      { id: toastId }
    );
  }
};
  

  const cancelEditUser = ()=>{
    setName('')
    setEmail('')
    setIsEditing(false)
    setShowForm(false)
  }


  const filteredUsers = user.filter((usersd)=>{

    return usersd.name.toLowerCase().includes(searchUser.toLowerCase()) || usersd.email.toLowerCase().includes(searchUser.toLowerCase())
  })

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header + Add User Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">User Management</h2>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close Form" : "Add User"}
        </button>

        <input
        value={searchUser}
        onChange={(e)=>{
          setsearchUser(e.target.value)
        }}
         type="text" placeholder="Search User" />
      </div>

      {/* Add User Form - toggled */}
      {showForm && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200 transition-all duration-300">
          <h2 className="text-lg font-semibold mb-3">Add New User</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input
                type="text"
                placeholder="Name"
                className="p-2 border rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                className="p-2 border rounded"
              />

              {isEditing ? (

                <div>
                     <button
                  onClick={handleUpdateUser}
                  className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
                >
                  Update
                </button>

                <button
                onClick={cancelEditUser}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Cancel
              </button>
                </div>
                
             
                
              ) : (
                <button
                  onClick={handleAddUser}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Submit
                </button>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sr.no
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-500">{index + 1}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {user.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditClick(user)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaticUserTable;
