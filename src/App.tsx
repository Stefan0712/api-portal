import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Exercises from './pages/Exercise/Exercises.tsx';
import Workouts from './pages/Workout/Workouts.tsx';
import Guides from './pages/Exercise/Exercises.tsx';
import Profile from './pages/Profile.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import NewExercise from './pages/Exercise/NewExercise.tsx';



function App() {
  return (
    <Router>
      <div className='App'>
        <nav className='navigation px-[15px]'>
          <Link to="/exercises" className="h-full text-white px-[15px] bg-transparent inline-flex items-center justify-center border-none text-sm font-medium">Exercises</Link>
          <Link to="/workouts" className="h-full text-white px-[15px] bg-transparent inline-flex items-center justify-center border-none text-sm font-medium">Workouts</Link>
          <Link to="/guides" className="h-full text-white px-[15px] bg-transparent inline-flex items-center justify-center border-none text-sm font-medium">Guides</Link>
          <Link to="/profile" className="h-full text-white px-[15px] bg-transparent inline-flex items-center justify-center border-none text-sm font-medium">Profile</Link>
          <Link to="/login" className="h-full text-white px-[15px] bg-transparent inline-flex items-center justify-center border-none text-sm font-medium">Login</Link>
        </nav>
        
        <div className="main-container text-white">
          <Routes>
            <Route path="/" element={<Exercises />} />
            <Route path="/exercises" element={<Exercises />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path='/new-exercise' element={<NewExercise />} />
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
