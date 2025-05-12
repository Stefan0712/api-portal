import axios from "axios";
import { useEffect, useState } from "react";
import { Workout } from "../../types/interfaces";
import { useMessage } from "../../context/MessageContext";
import { IconLibrary } from "../../IconLibrary";

const WorkoutList = () => {

    const {showMessage} = useMessage();

    const [category, setCategory] = useState('personal');
    const [allItems, setAllItems] = useState<Workout[] | null>(null);
    const [myItems, setMyItems] = useState<{created: Workout[], saved: Workout[], favorites: Workout[]} | null>(null);
    const [filteredItems, setFilteredItems] = useState<Workout[] | null>(null);

    const [showCreated, setShowCreated] = useState<boolean>(true);
    const [showSaved, setShowSaved] = useState<boolean>(true);
    const [showFavorites, setShowFavorites] = useState<boolean>(true);




    const fetchAllItems = async () =>{
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/workout`, {withCredentials: true});
            if(response.status === 200){
                setAllItems(response.data);
                setFilteredItems(response.data)
            }
        }catch(error){
            console.error(error)
            showMessage('There was been a server error.', 'error');
        }
    }
    const fetchMyItems = async () =>{
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/workout/my-workouts`, {withCredentials: true});
            if(response.status === 200){
                setMyItems(response.data);
                setFilteredItems(filterItems(response.data));
            }
        }catch(error){
            console.error(error)
            showMessage('There was been a server error.', 'error');
        }
    }
    const switchCategory = (category: string)=>{
        setCategory(category);
        if(category === 'all'){
            fetchAllItems();
        }else if(category === 'personal'){
            fetchMyItems();
        }
    }

    useEffect(()=>{
        if(myItems){
            console.log("Filters ran")
            setFilteredItems(filterItems(myItems));
        }
    },[showCreated, showFavorites, showSaved]);

    useEffect(()=>{switchCategory('personal')},[])



    const filterItems = (items: {created: Workout[], saved: Workout[], favorites: Workout[]}) =>{
        console.log(items)
        let tempItems: Workout[] = [];
        if(items){
            if(showCreated){
            tempItems.push(...items.created)
            }
            if(showSaved){
                tempItems.push(...items.saved)
            }
            if(showFavorites){
                tempItems.push(...items.favorites)
            }
        }
        console.log(tempItems)
        return tempItems;
    }
    return ( 
        <div className="flex flex-col px-[10px] gap-2">
            
            <select value={category} onChange={(e)=>switchCategory(e.target.value)} className="h-[40px] secondary-color rounded pl-[5px]">
                <option value={'all'}>Public Workouts</option>
                <option value={'personal'}>My Workouts</option>
            </select>
            {category === 'personal' ? 
                <div className="flex flex-wrap gap-2">
                    <fieldset className="flex gap-2 items-center">
                        <input type="checkbox" checked={showCreated} onChange={(e)=>setShowCreated(e.target.checked)} name="created" id="created" className="h-[20px] w-[20px] rounded"></input>
                        <label htmlFor="created">Created</label>
                    </fieldset> 
                    <fieldset className="flex gap-2 items-center">
                        <input type="checkbox" checked={showSaved} onChange={(e)=>setShowSaved(e.target.checked)} name="saved" id="saved" className="h-[20px] w-[20px] rounded"></input>
                        <label htmlFor="created">Saved</label>
                    </fieldset> 
                    <fieldset className="flex gap-2 items-center">
                        <input type="checkbox" checked={showFavorites} onChange={(e)=>setShowFavorites(e.target.checked)} name="favorites" id="favorites" className="h-[20px] w-[20px] rounded"></input>
                        <label htmlFor="created">Favorites</label>
                    </fieldset> 
                </div>
            : null}
            <div className="flex flex-col flex-1 gap-2 overflow-y-auto">
                {filteredItems && filteredItems.length > 0 ? filteredItems?.map((item,index)=>(<div key={'Exercise-'+index}>
                    <div className="w-full h-[40px] flex-shrink-0 flex items-center gap-4">
                    <h4>{item.name}</h4>
                    <button type="button" className="small-square transparent-bg">
                        <img src={IconLibrary.Add} className="w-[30px] h-[30px]" alt="" />
                    </button>
                    </div>
                </div>)) : null}
            </div>
        </div>
    );
}
 
export default WorkoutList;