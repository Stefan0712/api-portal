import { useState } from "react";
import { defaultDays } from "./placeholder";





const Meal = () => {


    const [days, setDays] = useState(defaultDays)
    return ( 
        <div className="grid grid-cols-[1fr_200px]">
            <div>1</div>
            <div>
                {}
            </div>
        </div>
     );
}
 
export default Meal;