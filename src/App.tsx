import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Exercises from './pages/Exercise/Exercises.tsx';
import Workouts from './pages/Workout/Workouts.tsx';
import Guides from './pages/Exercise/Exercises.tsx';
import Profile from './pages/Profile.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import NewExercise from './pages/Exercise/NewExercise.tsx';
import NewWorkout from './pages/Workout/NewWorkout.tsx';
import EditExercise from './pages/Exercise/EditExercise.tsx';
import EditWorkout from './pages/Workout/EditWorkout.tsx';
import { isLoggedIn, logoutUser } from './utils/auth.ts';
import Nav from './pages/common/Nav.tsx';



function App() {
  
  return (
    <Router>
      <div className='App'>
        <Nav />
        <div className="main-container text-white">
          <Routes>
            <Route path="/" element={<Exercises />} />
            <Route path="/exercises" element={<Exercises />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path='/exercises/new' element={<NewExercise />} />
            <Route path='/exercise/:id/edit' element={<EditExercise />} />
            <Route path='/workouts/new' element={<NewWorkout />} />
            <Route path='/workout/:id/edit' element={<EditWorkout />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
