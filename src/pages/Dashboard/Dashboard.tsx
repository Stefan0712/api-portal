import React, { useState } from "react";
import Equipment from "./pages/Equipment";


const Dashboard = () => {


    const [currentScreen, setCurrentScreen] = useState<React.ReactNode | null>(null);
    const [isExercisesShown, setIsExercisesShown] = useState<boolean>(true);
    const [isWorkoutsShown, setIsWorkoutsShown] = useState<boolean>(true);
    const [isSocialShown, setIsSocialShown] = useState<boolean>(true);
    const [isPersonalShown, setIsPersonalShown] = useState<boolean>(true);


    return ( 
        <div className="w-full h-full grid grid-cols-[200px_1fr] primary-color">
            <div className="dashboard-menu w-[200px] flex flex-col p-[10px] overflow-y-auto">
                <h1 className="w-full text-center text-2xl font-bold">Dashboard</h1>
                <button className="h-[40px] rounded text-start pl-[10px]">Overview</button>
                <div className={`transition-all duration-300 w-full flex flex-col overflow-hidden ${isWorkoutsShown ? "h-[160px]" : "h-[30px]"}`}>
                    <h2 className="h-[30px] flex-shrink-0" onClick={()=>setIsWorkoutsShown(prevState=>!prevState)}>My Items</h2>
                    <button className="h-[40px] rounded text-start pl-[10px]">Exercises</button>
                    <button className="h-[40px] rounded text-start pl-[10px]">Workouts</button>
                    <button className="h-[40px] rounded text-start pl-[10px]">Guides</button>
                    <button className="h-[40px] rounded text-start pl-[10px]" onClick={()=>setCurrentScreen(<Equipment />)}>Equipment</button>
                </div>
                <div className={`transition-all duration-300 flex flex-col overflow-hidden ${isSocialShown ? "h-[160px]" : "h-[30px]"}`}>
                    <h2 className="h-[30px] flex-shrink-0" onClick={()=>setIsWorkoutsShown(prevState=>!prevState)}>Social</h2>
                    <button className="h-[40px] rounded text-start pl-[10px]">Public Profile</button>
                    <button className="h-[40px] rounded text-start pl-[10px]">Posts</button>
                    <button className="h-[40px] rounded text-start pl-[10px]">Activity</button>
                </div>
                <div className={`transition-all duration-300 flex flex-col overflow-hidden ${isPersonalShown ? "h-[160px]" : "h-[30px]"}`}>
                    <h2 className="h-[30px] flex-shrink-0" onClick={()=>setIsWorkoutsShown(prevState=>!prevState)}>Personal</h2>
                    <button className="h-[40px] rounded text-start pl-[10px]">Friends</button>
                    <button className="h-[40px] rounded text-start pl-[10px]">Profile</button>
                    <button className="h-[40px] rounded text-start pl-[10px]">Profile Settings</button>
                    <button className="h-[40px] rounded text-start pl-[10px]">App settings</button>
                </div>
            </div>
            <div className="content secondary-color">
                {currentScreen}
            </div>
        </div>
     );
}
 
export default Dashboard;