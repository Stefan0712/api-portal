import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Exercises from './pages/Exercise/Exercises.tsx';
import Workouts from './pages/Workout/Workouts.tsx';
import Guides from './pages/Exercise/Exercises.tsx';
import Profile from './pages/User/Profile.tsx';
import Login from './pages/User/Login.tsx';
import Register from './pages/User/Register.tsx';
import NewExercise from './pages/Exercise/NewExercise.tsx';
import NewWorkout from './pages/Workout/NewWorkout.tsx';
import EditExercise from './pages/Exercise/EditExercise.tsx';
import EditWorkout from './pages/Workout/EditWorkout.tsx';
import Nav from './pages/common/Nav.tsx';
import {MessageProvider} from './context/MessageContext.tsx';
import MessageToast from './pages/common/MessageToast.tsx';
import Equipment from './pages/Dashboard/pages/Equipment/Equipment.tsx';
import Community from './pages/Community/Community.tsx';
import Planner from './pages/Planner/Planner.tsx';


function App() {
  
  return (
    <Router>
      <MessageProvider>
        <div className='App flex w-full h-screen'>
          <Nav />
          <div className="text-white content-color w-full h-full overflow-hidden">
            <MessageToast />
            <Routes>
              <Route path="/" element={<Exercises />} />
              <Route path="/exercises" element={<Exercises />} />
              <Route path="/workouts" element={<Workouts />} />
              <Route path='/exercises/new' element={<NewExercise />} />
              <Route path='/exercise/:id/edit' element={<EditExercise />} />
              <Route path='/workouts/new' element={<NewWorkout />} />
              <Route path='/workout/:id/edit' element={<EditWorkout />} />
              <Route path="/guides" element={<Guides />} />
              <Route path="/community" element={<Community />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/equipment" element={<Equipment />} />
              <Route path="/planner" element={<Planner />} />
            </Routes>
          </div>
        </div>
      </MessageProvider>
    </Router>
  );
}

export default App;
