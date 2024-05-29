import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateUserCard = ({ user, onUpdate }) => {
  const [editedUser, setEditedUser] = useState(user);

  // Update the editedUser state whenever the user prop changes
  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/api/users/${editedUser.id}`, editedUser);
      onUpdate(response.data); // Pass the updated user data to the parent component
      console.log('User updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg border">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          User Profile
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Update user details
        </p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              User name
            </dt>
            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
              <input
                type="text"
                name="username"
                value={editedUser.username}
                onChange={handleChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Bio
            </dt>
            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
              <textarea
                name="bio"
                value={editedUser.bio}
                onChange={handleChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Email address
            </dt>
            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
              <input
                type="email"
                name="email"
                value={editedUser.email}
                onChange={handleChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Profile picture
            </dt>
            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
              <input
                type="text"
                name="profilePictureUrl"
                value={editedUser.profilePictureUrl}
                onChange={handleChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </dd>
          </div>
        </dl>
      </div>
      <div className="flex justify-end px-4 py-4 sm:px-6">
        <button
          onClick={handleUpdate}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default UpdateUserCard;
