import { useState } from 'react';

const UserTable = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
  ]);

  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [editingId, setEditingId] = useState(null);

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      setUsers([...users, { 
        id: users.length + 1, 
        ...newUser 
      }]);
      setNewUser({ name: '', email: '' });
    }
  };

  const handleUpdate = (id) => {
    const userToUpdate = users.find(user => user.id === id);
    if (userToUpdate) {
      setNewUser({ name: userToUpdate.name, email: userToUpdate.email });
      setEditingId(id);
    }
  };

  const saveUpdate = () => {
    setUsers(users.map(user => 
      user.id === editingId ? { ...user, ...newUser } : user
    ));
    setNewUser({ name: '', email: '' });
    setEditingId(null);
  };

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Add/Edit User Form */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">
          {editingId ? 'Edit User' : 'Add New User'}
        </h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Name"
            className="flex-1 p-2 border rounded"
            value={newUser.name}
            onChange={(e) => setNewUser({...newUser, name: e.target.value})}
          />
          <input
            type="email"
            placeholder="Email"
            className="flex-1 p-2 border rounded"
            value={newUser.email}
            onChange={(e) => setNewUser({...newUser, email: e.target.value})}
          />
          <button
            onClick={editingId ? saveUpdate : handleAddUser}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {editingId ? 'Update' : 'Add'}
          </button>
          {editingId && (
            <button
              onClick={() => {
                setEditingId(null);
                setNewUser({ name: '', email: '' });
              }}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Users Table */}

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user, index) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdate(user.id)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-yellow-600 text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
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

export default UserTable;