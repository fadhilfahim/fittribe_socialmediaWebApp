import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import PostCard from './components/PostCards';

const ViewUserPer = () => {
  const { id } = useParams(); // Extract the id parameter from the URL
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
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

        <div>
           
            <div className="text-center px-14">
              <h2 className="text-gray-800 text-3xl font-bold">{user.username}</h2>
              <p className="text-gray-400 mt-2 hover:text-blue-500" src={user.instagramUrl} target="_blank">@{user.username}</p>
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
          
        </>
      )}
      <PostCard />
      <footer className="bg-white py-4 mt-auto">
        <div className="container mx-auto px-6">
          <p className="text-gray-600 text-sm">&copy; 2024 Fitness Social. All rights reserved.</p>
        </div>
      </footer>
    
    </div>
  );
};

export default ViewUserPer;
