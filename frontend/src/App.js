import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homepage";
import FitnessStatus from "./pages/fitnessStatus.js";
import ProfilePage from "./pages/profilePage.js";
import AboutUs from "./pages/AboutUs.js";
import Navbar from "./pages/components/Navbar.js";

import WorkoutList from "./pages/AllWorkouts.js"

import SignIn from "./pages/components/SignIn.js";
import SignUp from "./pages/components/SignUp.js";
import ViewUsers from "./pages/ViewUsers.js";
import ViewUserPer from "./pages/ViewUserPer.js";


const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <div className="p-4 sm:ml-64">
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/Fitnessstatus" element={<FitnessStatus />} />
              <Route path="/AboutUs" element={<AboutUs/>}/>
              <Route path="/Fitnessstatus/WorkoutList" element={<WorkoutList/>}/>

              <Route path="/Profile/:id" element={<ProfilePage />} />
              <Route path="/AboutUs" element={<AboutUs />} />
              <Route path="/SignIn" element={<SignIn/>}/>
              <Route path="/SignUp" element={<SignUp/>}/>
              
              <Route path="/ViewUsers" element={<ViewUsers/>}/>
              <Route path="/ViewUserPer/:id" element ={<ViewUserPer/>}/>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
