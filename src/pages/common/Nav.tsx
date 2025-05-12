import { Link, useNavigate, useLocation } from "react-router-dom";
import { isLoggedIn, logoutUser } from "../../utils/auth";
import { IconLibrary } from "../../IconLibrary";
import { useEffect, useState } from "react";
import axios from "axios";

const Nav = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [isApiRunning, setIsApiRunning] = useState(false);
    

    const handleLogout = () =>{
        logoutUser();
        navigate('/login');
    }
    const checkApiConnection = async () =>{
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/test`, {withCredentials: true})
            if(response.status === 200){
                setIsApiRunning(true);
            }
        }catch(error){
            setIsApiRunning(false);
            console.error(error);
        }
    }
    useEffect(()=>{checkApiConnection()},[])
    return ( 
        <nav className='navigation w-[250px] flex-shrink-0 px-[15px] menu-color text-white text-opacity-60 flex flex-col py-[20px] overflow-hidden h-full'>
            <h1 className="text-xl font-bold mb-[30px]">EasyFit</h1>
            <div className="flex flex-col overflow-x-hidden overflow-y-auto">
                <Link to="/" className={`flex gap-2 items-center w-full h-[30px] transition-transform duration-200 hover:translate-x-1 ${location.pathname === '/' ? 'selected-nav-button' : ''}`}><img className="w-[15px] h-[15px]" src={IconLibrary.Home} alt="home button" />Home</Link>
                <Link to={'/planner'} className={`flex gap-2 items-center w-full h-[30px] transition-transform duration-200 hover:translate-x-1 ${location.pathname === '/planner' ? 'selected-nav-button' : ''}`}><img className="w-[15px] h-[15px]" src={IconLibrary.Planner} alt="home button" />Planner</Link>
                <Link to="/exercises" className={`flex gap-2 items-center w-full h-[30px] transition-transform duration-200 hover:translate-x-1 ${location.pathname === '/exercises' ? 'selected-nav-button' : ''}`}><img className="w-[15px] h-[15px]" src={IconLibrary.Exercise} alt="home button" />Exercises</Link>
                <Link to="/workouts" className={`flex gap-2 items-center w-full h-[30px] transition-transform duration-200 hover:translate-x-1 ${location.pathname === '/workouts' ? 'selected-nav-button' : ''}`}><img className="w-[15px] h-[15px]" src={IconLibrary.Workout} alt="home button" />Workouts</Link>
                <Link to="/equipment" className={`flex gap-2 items-center w-full h-[30px] transition-transform duration-200 hover:translate-x-1 ${location.pathname === '/equipment' ? 'selected-nav-button' : ''}`}><img className="w-[15px] h-[15px]" src={IconLibrary.Equipment} alt="home button" />Equipment</Link>
                <Link to="/" className={`flex gap-2 items-center w-full h-[30px] transition-transform duration-200 hover:translate-x-1 ${location.pathname === 'asd' ? 'selected-nav-button' : ''}`}><img className="w-[15px] h-[15px]" src={IconLibrary.Guides} alt="home button" />Guides</Link>
                <Link to="/" className={`flex gap-2 items-center w-full h-[30px] transition-transform duration-200 hover:translate-x-1 ${location.pathname === 'asd' ? 'selected-nav-button' : ''}`}><img className="w-[15px] h-[15px]" src={IconLibrary.Posts} alt="home button" />Posts</Link>
                <Link to="/community" className={`flex gap-2 items-center w-full h-[30px] transition-transform duration-200 hover:translate-x-1 ${location.pathname === '/community' ? 'selected-nav-button' : ''}`}><img className="w-[15px] h-[15px]" src={IconLibrary.Community} alt="home button" />Community</Link>
                <Link to="/" className={`flex gap-2 items-center w-full h-[30px] transition-transform duration-200 hover:translate-x-1 ${location.pathname === 'asd' ? 'selected-nav-button' : ''}`}><img className="w-[15px] h-[15px]" src={IconLibrary.Friends} alt="home button" />Friends</Link>
                <Link to="/" className={`flex gap-2 items-center w-full h-[30px] transition-transform duration-200 hover:translate-x-1 ${location.pathname === 'asd' ? 'selected-nav-button' : ''}`}><img className="w-[15px] h-[15px]" src={IconLibrary.Activity} alt="home button" />My Activity</Link>
            </div>
            
            <div className="mt-auto content-color flex flex-col rounded-xl align-center px-[15px] py-[10px] border border-gray-800 gap-4">
                <div className={`${isApiRunning ? 'bg-green-500' : 'bg-red-500'} text-white rounded p-3 mt-auto flex gap-2 items-center justify-between`}>{isApiRunning ? 'API online' : "API offline"}<img className="w-[20px] h-[20px]" src={IconLibrary.Restart} onClick={checkApiConnection} alt="refresh"/></div>
                {
                    isLoggedIn() ? 
                        <div className="grid grid-cols-[1fr_50px] w-full">
                            <Link to="/profile"><h3>{localStorage.getItem('username')}</h3><p>{localStorage.getItem('role')}</p></Link>
                            <button className="w-[50px] h-[50x] flex items-center justify-center" type="button" onClick={handleLogout}><img className="w-[30px] h-[30px]" src={IconLibrary.Logout} alt="home button" /></button>
                        </div>
                    :
                    <Link to="/login" >Login</Link>
                }
            </div>
        </nav>
    );
}
 
export default Nav;