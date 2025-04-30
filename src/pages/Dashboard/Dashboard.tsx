import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import { isLoggedIn, logoutUser } from "../../utils/auth";


const Dashboard = () => {

    const navigate = useNavigate();

    const handleLogout = () =>{
        logoutUser();
        navigate('/login');
    }


    return ( 
        <div className="w-[200px] h-full flex flex-col menu-color">
            <Link to="/dashboard" >Dashboard</Link>
            <a>Explore</a>
            <a>Planner</a>
            <Link to="/exercises">Exercises</Link>
            <Link to="/workouts">Workouts</Link>
            <Link to="/guides">Guides</Link>
            <Link to="/profile">Profile</Link>
            {
                isLoggedIn() ? 
                <button type="button" onClick={handleLogout}>Logout</button>
                :
                <Link to="/login" >Login</Link>
            }
        </div>
     );
}
 
export default Dashboard;