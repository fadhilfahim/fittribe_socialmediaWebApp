import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory

const FitnessStatus = () => {
  const navigate = useNavigate(); // Use useNavigate hook instead of useHistory
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [distanceRun, setDistanceRun] = useState(0);
  const [pushupsCompleted, setPushupsCompleted] = useState(0);
  const [weightLifted, setWeightLifted] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newWorkoutStatus = {
        username,
        description,
        distanceRun,
        pushupsCompleted,
        weightLifted,
      };
      const response = await axios.post(
        "http://localhost:8080/api/WorkoutStatus",
        newWorkoutStatus
      );
      console.log(response.data);
      navigate("/Fitnessstatus/WorkoutList"); // Use navigate instead of history.push
      // Optionally, you can reset the form fields after successful submission
      setUsername("");
      setDescription("");
      setDistanceRun(0);
      setPushupsCompleted(0);
      setWeightLifted(0);
    } catch (error) {
      console.error("Error creating workout status:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-xl">
      <h2 className="text-xl font-bold mb-4">Create Workout Status</h2>
      <form onSubmit={handleSubmit} class="max-w-md mx-auto">
    <div class="relative z-0 w-full mb-5 group">
        <input
            type="text"
            name="username"
            id="username"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-800 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
        />
        <label
            for="username"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
            Username
        </label>
    </div>
    <div class="relative z-0 w-full mb-5 group">
        <textarea
            name="description"
            id="description"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-800 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            require
        ></textarea>
        <label
            for="description"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
            Description
        </label>
    </div>
    <div class="relative z-0 w-full mb-5 group">
        <input
            type="number"
            name="distanceRun"
            id="distanceRun"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-800 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={distanceRun}
            onChange={(e) => setDistanceRun(e.target.valueAsNumber)}
            required
        />
        <label
            for="distanceRun"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
            Distance Run (km)
        </label>
    </div>
    <div class="relative z-0 w-full mb-5 group">
        <input
            type="number"
            name="pushupsCompleted"
            id="pushupsCompleted"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-800 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={pushupsCompleted}
            onChange={(e) => setPushupsCompleted(e.target.valueAsNumber)}
            required
        />
        <label
            for="pushupsCompleted"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
            Pushups Completed
        </label>
    </div>
    <div class="relative z-0 w-full mb-5 group">
        <input
            type="number"
            name="weightLifted"
            id="weightLifted"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-800 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={weightLifted}
            onChange={(e) => setWeightLifted(e.target.valueAsNumber)}
            required
        />
        <label
            for="weightLifted"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
            Weight Lifted (kg)
        </label>
    </div>
    <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
        Submit
    </button>
</form>

    </div>

  );
};

export default FitnessStatus;
