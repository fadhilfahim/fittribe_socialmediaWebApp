import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const WorkoutList = () => {
  const [workouts, setWorkouts] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [filteredWorkouts, setFilteredWorkouts] = useState([]);
  const [updateData, setUpdateData] = useState({
    id: '',
    username: '',
    description: '',
    distanceRun: 0,
    pushupsCompleted: 0,
    weightLifted: 0,
  });
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // State to manage whether to show the delete confirmation popup
  const [deleteId, setDeleteId] = useState(null); // State to store the id of the workout to be deleted

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/WorkoutStatus');
        setWorkouts(response.data);
        setFilteredWorkouts(response.data); // Set filteredWorkouts initially with all workouts
      } catch (error) {
        console.error('Error fetching workouts:', error);
      }
    };

    fetchWorkouts();
  }, []);

  const handleSearch = (e) => {
    setSearchName(e.target.value);
    const filtered = workouts.filter(workout =>
      workout.username.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredWorkouts(filtered);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/WorkoutStatus/${deleteId}`);
      setFilteredWorkouts(filteredWorkouts.filter(workout => workout.id !== deleteId));
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error('Error deleting workout:', error);
    }
  };

  const handleUpdate = (workout) => {
    setUpdateData(workout);
    setShowModal(true);
  };

  const handleChange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/WorkoutStatus/${updateData.id}`, updateData);
      const index = filteredWorkouts.findIndex(workout => workout.id === updateData.id);
      const updatedWorkouts = [...filteredWorkouts];
      updatedWorkouts[index] = updateData;
      setFilteredWorkouts(updatedWorkouts);
      setUpdateData({
        id: '',
        username: '',
        description: '',
        distanceRun: 0,
        pushupsCompleted: 0,
        weightLifted: 0,
      });
      setShowModal(false);
    } catch (error) {
      console.error('Error updating workout:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Floating */}
      <div className="fixed flex flex-col right-8 z-50">
        <Link to="/Fitnessstatus" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
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
      <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Workout List !</span></h1>
      <input
        className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:border-blue-500"
        type="text"
        placeholder="Search by username"
        value={searchName}
        onChange={handleSearch}
      />
      <div className="max-w-2xl mx-auto mt-18">
        {filteredWorkouts.map(workout => (
          <div key={workout.id} className="flex gap-1 mt-2 bg-white border border-gray-300 rounded-xl overflow-hidden items-center justify-between p-2">
          <div className="flex flex-col gap-2 py-2">
            <p className="text-xl font-bold">{workout.username}</p>
            <p className="text-gray-500">{workout.description}</p>
            <p className="text-gray-500"><strong>Distance Run:</strong> {workout.distanceRun} km</p>
            <p className="text-gray-500"><strong>Pushups Completed:</strong> {workout.pushupsCompleted}</p>
            <p className="text-gray-500"><strong>Weight Lifted:</strong> {workout.weightLifted} kg</p>
            <p className="text-gray-500"><strong>Time:</strong> {new Date(workout.timestamp).toLocaleString()}</p>
          </div>
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button onClick={() => handleUpdate(workout)} type="button" className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-gray-900 bg-transparent border border-gray-900 rounded-s-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white">
              Update
            </button>
            <button onClick={() => handleDelete(workout.id)} type="button" className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-gray-900 bg-transparent border border-gray-900 rounded-e-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white">
              Delete
            </button>
          </div>
        </div>
        ))}
      </div>
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h2 className="text-2xl font-bold mb-4">Update Workout</h2>
                  <input type="hidden" name="id" value={updateData.id} onChange={handleChange} />
                  <label className="block mb-2" htmlFor="username">Username:</label>
                  <input className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" type="text" name="username" value={updateData.username} readOnly /><br />
                  <label className="block mb-2" htmlFor="description">Description:</label>
                  <textarea className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" name="description" value={updateData.description} onChange={handleChange} placeholder="Description"></textarea><br />
                  <label className="block mb-2" htmlFor="distanceRun">Distance Run (km):</label>
                  <input className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" type="number" name="distanceRun" value={updateData.distanceRun} onChange={handleChange} placeholder="Distance Run (km)" /><br />
                  <label className="block mb-2" htmlFor="pushupsCompleted">Pushups Completed:</label>
                  <input className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" type="number" name="pushupsCompleted" value={updateData.pushupsCompleted} onChange={handleChange} placeholder="Pushups Completed" /><br />
                  <label className="block mb-2" htmlFor="weightLifted">Weight Lifted (kg):</label>
                  <input className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" type="number" name="weightLifted" value={updateData.weightLifted} onChange={handleChange} placeholder="Weight Lifted (kg)" /><br />
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                    Update
                  </button>
                  <button onClick={() => setShowModal(false)} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* Confirmation Popup */}
      {showDeleteConfirmation && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h2 className="text-2xl font-bold mb-4">Confirm Delete</h2>
                <p className="text-gray-600">Are you sure you want to delete this workout?</p>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button onClick={confirmDelete} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Delete
                </button>
                <button onClick={() => setShowDeleteConfirmation(false)} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutList;
