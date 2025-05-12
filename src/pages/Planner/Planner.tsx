import { useState } from "react";
import Activity from "./Activity";
import Meal from "./Meal";

const Planner = () => {

    const [screen, setScreen] = useState('activity');





    return ( 
        <div className="w-full h-full flex flex-col primary-color p-[10px] overflow-hidden">
            <div className="w-full h-[50px] flex items-center gap-2 justify-between mb-[10px]">
                    <h1 className="font-bold text-2xl"> Planner {screen}</h1>
                    <div className="h-50px px-[5px] flex gap-1">
                        <button className={`h-[40px] px-[10px] rounded ${screen === 'activity' ? 'secondary-color' : ''}`} onClick={()=>setScreen('activity')}>Activity Planner</button>
                        <button className={`h-[40px] px-[10px] rounded ${screen === 'meal' ? 'secondary-color' : ''}`} onClick={()=>setScreen('meal')}>Meal Planner</button>
                    </div>
                </div>
            
            <div className="w-full h-full secondary-color rounded p-3 flex gap-[10px] overflow-hidden">
                <div className="w-full h-full rounded p-[10px]">
                    <div className="h-full w-full overflow-hidden">
                        {screen === "weekly" ? <Activity /> : screen === "meal" ? <Meal /> : <Activity />}
                    </div>  
                </div>
            </div>
        </div>
    );
}
 
export default Planner;