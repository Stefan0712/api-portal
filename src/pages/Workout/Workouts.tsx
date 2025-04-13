import react, { useEffect, useState } from "react";
import axios from "axios";
import { Workout } from "../../types/interfaces";



const Workouts = () => {
    const [items, setItems] = useState<Workout[]>([])

    useEffect(()=>{
        fetchItems();
    },[]);

    console.log(process.env.REACT_APP_API_URL)
    const fetchItems = async () =>{
        try{
            const response = await axios.get<Workout[]>(`${process.env.REACT_APP_API_URL}/workout/`);
            setItems(response.data);
            console.log(response.data)
        } catch (error){
            console.error("Error fetching workouts: ", error)
        }
    }

    
    return ( 
        <div className="workout p-[20px]">
            <div className="items-top col-start-1 col-end-3 row-start-1 row-end-2">
                <h2>Workouts</h2>
            </div>
            <div className="items-container col-start-1 col-end-2 row-start-2 row-end-3 flex flex-col gap-[10px]">
                {items && items.length > 0 ? items.map((item, index)=> (
                    <div className="item w-full h-[75px] bg-gray-900 py-[5px] px-[10px]" key={index}>
                        <div className="flex content-between w-full">
                            <h3>{item.name}</h3>
                            <p>by Author Name</p>
                        </div>
                        <div className="flex gap-[10px]">
                            <p>Equipment {item.equipment?.length}</p>
                            <p>Exercises {item.exercises?.length}</p>
                        </div>
                        <div className="flex gap-[10px] overflow-hidden w-full">
                            {item.targetGroup && item.targetGroup.length > 0 ? item.targetGroup.map((group,index)=><p key={'group-'+index}>{group.name}</p>):null}
                        </div>
                        <div className="flex gap-[10px]">
                            <p>Duration {item.duration}</p>
                            <p>Difficulty {item.difficulty}</p>
                        </div>
                    </div>
            )) : null}
            </div>
            <div className="item-content col-start-2 col-end-3 row-start-2 row-end-3">
                
            </div>
        </div>
     );
}
 
export default Workouts;