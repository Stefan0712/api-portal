import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, logoutUser } from "../../utils/auth";

const Nav = () => {

    const navigate = useNavigate();

    const handleLogout = () =>{
        logoutUser();
        navigate('/login');
    }

    return ( 
        <nav className='navigation px-[15px]'>
            <Link to="/dashboard" className="h-full text-white px-[15px] bg-transparent inline-flex items-center justify-center border-none  text-xl font-medium">Dashboard</Link>
            <a className="h-full text-white px-[15px] bg-transparent inline-flex items-center justify-center border-none  text-xl font-medium">Explore</a>
            <a className="h-full text-white px-[15px] bg-transparent inline-flex items-center justify-center border-none text-xl font-medium">Planner</a>
            <Link to="/exercises" className="h-full text-white px-[15px] bg-transparent inline-flex items-center justify-center border-none  text-xl font-medium">Exercises</Link>
            <Link to="/workouts" className="h-full text-white px-[15px] bg-transparent inline-flex items-center justify-center border-none  text-xl font-medium">Workouts</Link>
            <Link to="/guides" className="h-full text-white px-[15px] bg-transparent inline-flex items-center justify-center border-none  text-xl font-medium">Guides</Link>
            <Link to="/profile" className="h-full text-white px-[15px] bg-transparent inline-flex items-center justify-center border-none  text-xl font-medium">Profile</Link>
            {
                isLoggedIn() ? 
                <button type="button" className="h-full text-white px-[15px] bg-transparent inline-flex items-center justify-center border-none  text-xl font-medium" onClick={handleLogout}>Logout</button>
                :
                <Link to="/login" className="h-full text-white px-[15px] bg-transparent inline-flex items-center justify-center border-none  text-xl font-medium">Login</Link>
            }
        </nav>
    );
}
 
export default Nav;