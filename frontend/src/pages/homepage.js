import React from "react";
import PostCard from "./components/PostCards";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="bg-gray-100 flex flex-col min-h-screen">
      {/* Floating buttons */}
      <div className="fixed flex flex-col right-8 z-50">
        <Link to="#" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              strokeLinejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          <span>Add Post</span>
        </Link>

        <Link to="/Fitnessstatus" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>

          <span>Add workout</span>
        </Link>
      </div>

      <header className="bg-white py-4">
        <div className="container mx-auto px-6">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">WELCOME user</span>
            </h1>
        </div>
      </header>

      <div className="container mx-auto px-6 py-4">
        {/* Insert your PostCard components here */}
        <PostCard />
        <PostCard />
        {/* Add more PostCard components as needed */}
      </div>

      <footer className="bg-white py-4 mt-auto">
        <div className="container mx-auto px-6">
          <p className="text-gray-600 text-sm">
            &copy; 2024 Fit Tribe. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
