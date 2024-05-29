import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const ViewUsers = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Fetch users data from your API
        axios.get('http://localhost:8080/api/users')
            .then(response => {
                setUsers(response.data); // Assuming response.data is an array of users
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Filter users based on search query
    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">All Users!</span>
            </h1>
            <input
                className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:border-blue-500"
                type="text"
                placeholder="Search by username"
                value={searchQuery}
                onChange={handleSearchChange}
            />
            <div className="max-w-2xl mx-auto mt-15">
                {filteredUsers.map(user => (
                    <Link key={user.id} to={`/ViewUserPer/${user.id}`}> {/* Wrap the image inside Link */}
                        <div className="flex gap-3 mt-5 bg-white border border-gray-300 rounded-xl overflow-hidden items-center justify-start">
                            <div className="relative w-32 h-32 flex-shrink-0">
                                <img className="absolute left-0 top-0 w-full h-full object-cover object-center transition duration-50" loading="lazy" src={user.profilePictureUrl} alt="Profile" />
                            </div>
                            <div className="flex flex-col gap-2 py-2">
                                <p className="text-xl font-bold">{user.username}</p>
                                <p className="text-gray-500">{user.bio}</p>
                                {/* Additional user information can be displayed here */}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ViewUsers;
