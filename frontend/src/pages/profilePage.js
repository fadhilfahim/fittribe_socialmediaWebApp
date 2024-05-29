import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import PostCard from './components/PostCards';
import UpdateUserCard from './components/UpdateUserCard'; // Import the UpdateUserCard component

const ProfilePage = () => {
  const { id } = useParams(); // Extract the id parameter from the URL
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [showUpdateForm, setShowUpdateForm] = useState(false); // State to manage whether to show the update form
  const [showConfirmation, setShowConfirmation] = useState(false); // State to manage whether to show the confirmation popup
  const [isOpen, setIsOpen] = useState(false); //for dropdown
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/users/${id}`);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]); // Fetch user data whenever the id parameter changes

  const handleUpdateProfile = async (updatedUserData) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/users/${id}`, updatedUserData);
      setShowUpdateForm(prevState => !prevState);
      setUser(response.data);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleToggleUpdateForm = () => {
    // Toggle the state to show or hide the update form
    setShowUpdateForm(prevState => !prevState);
  };

  const handleDeleteUser = async () => {
    setShowConfirmation(true); // Show the confirmation popup
  };

  const confirmDeleteUser = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/users/${id}`);
      navigate('/SignUp');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // fordropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-gray-100 flex flex-col min-h-screen">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="h-32 overflow-hidden">
            <img className="w-full" src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" alt="" />
          </div>
          <div className="flex justify-center px-5 -mt-12">
            <img className="h-32 w-32 bg-white p-2 rounded-full" src={user.profilePictureUrl} alt="userProfile" />
          </div>

          {/* dropdown */}
          <div className="relative mr-2">
              <div className='flex justify-end'>
                <button
                  id="dropdownMenu"
                  data-dropdown-toggle="dropdownDotsHorizontal"
                  onClick={toggleDropdown}
                  className=" inline-flex items-center p-2 text-sm font-medium text-center bg-gray-800 hover:bg-gray-700 text-white rounded-lg  focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  type="button"
                >
                  
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
</svg>

                </button>
              </div>

              {/* Dropdown menu */}
              {isOpen && (
                <div id="dropdownDotsHorizontal" className="z-10 absolute top-full right-0 mt-1 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconHorizontalButton">
                    <li>
                      <a onClick={handleToggleUpdateForm} className="block px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-600 dark:hover:text-white">{showUpdateForm ? 'Cancel Update' : 'Update Profile'}</a>
                    </li>
                    <li>
                      <a onClick={handleDeleteUser} className="block px-4 py-2 hover:bg-red-500 hover:text-white dark:hover:bg-gray-600 dark:hover:text-white">Delete User</a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          <div>
           
            <div className="text-center px-14">
              <h2 className="text-gray-800 text-3xl font-bold">{user.username}</h2>
              <a className="text-gray-400 mt-2 hover:text-blue-500" src={user.instagramUrl} target="_blank">@{user.username}</a>
              <p className="mt-2 text-gray-500 text-sm">{user.bio}</p>
            </div>
            <hr className="mt-6" />
            <div className="flex bg-gray-50">
              <div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
                <p><span className="font-semibold">{user.followersCount}</span> Followers</p>
              </div>
              <div className="border"></div>
              <div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
                <p> <span className="font-semibold">{user.followingCount}</span> Following</p>
              </div>
            </div>
          </div>
          {showUpdateForm && <UpdateUserCard user={user} onUpdate={handleUpdateProfile} />} {/* Pass the onUpdate function as a prop */}
        </>
      )}
      <PostCard />
      <footer className="bg-white py-4 mt-auto">
        <div className="container mx-auto px-6">
          <p className="text-gray-600 text-sm">&copy; 2024 Fitness Social. All rights reserved.</p>
        </div>
      </footer>
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded-md shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Dear {user.username}</h2>
            <p className="text-xl text-gray-800 mb-1">Are you sure you want to delete this account?</p>
            <p className="text-gray-700 mb-6">this will delete all your data permenently</p>
            <div className="flex justify-center">
              <button onClick={confirmDeleteUser} className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded mr-4">Delete</button>
              <button onClick={() => setShowConfirmation(false)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-4 py-2 rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
