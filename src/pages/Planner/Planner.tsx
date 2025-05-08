import { useState } from "react";
import Weekly from "./Weekly";
import Monthly from "./Monthly";
import PlanList from "./PlanList";
import { IconLibrary } from "../../IconLibrary";

const Planner = () => {

    const [screen, setScreen] = useState('list');





    return ( 
        <div className="w-full h-full flex flex-col primary-color p-[10px] overflow-hidden">
            <h1 className="w-full h-[50px] font-bold text-2xl flex items-center gap-2"><button onClick={()=>setScreen('list')}><img className="h-[20px] w-[20px]" src={IconLibrary.BackArrow} alt="back" /></button> Planner {screen}</h1>
            
            <div className="w-full h-full secondary-color rounded p-3 flex gap-[10px] overflow-hidden">
                <div className="w-full h-full primary-color rounded p-[10px]">
                    <div className="h-full w-full overflow-hidden">
                        {screen === "weekly" ? <Weekly setScreen={setScreen} /> : screen === "monthly" ? <Monthly setScreen={setScreen} /> : <PlanList setScreen={setScreen} screen={screen}/>}
                    </div>  
                </div>
            </div>
        </div>
    );
}
 
export default Planner;