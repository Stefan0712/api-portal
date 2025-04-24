import react, { useEffect, useState } from "react";
import axios from "../../axios";
import { Workout } from "../../types/interfaces";
import { Link } from "react-router-dom";
import DeleteModal from "../Exercise/DeleteModal";
import { getUserData, isLoggedIn } from "../../utils/auth";
import { IconLibrary } from "../../IconLibrary";
import { formatDateToPretty } from "../../utils/dateFormat";
import { useMessage } from "../../context/MessageContext";



const Workouts = () => {

    const { showMessage } = useMessage();
    const [items, setItems] = useState<Workout[]>([])
    const [selectedItem, setSelectedItem] = useState<Workout | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);

    const [userWorkouts, setUserWorkouts] = useState<{favorites: string[], saved: string[], created: string[]} | null>(null);

    const isUserLoggedIn = isLoggedIn();
    const userData = getUserData();

    useEffect(()=>{
        fetchItems();
    },[]);

    const fetchItems = async () =>{
        try{
            const response = await axios.get<Workout[]>(`${process.env.REACT_APP_API_URL}/workout/`, {withCredentials: true});
            setItems(response.data);
            console.log(response.data)
        } catch (error){
            console.error("Error fetching workouts: ", error)
        }
    }
    const getWorkoutData = async (id: string) =>{
        try{
            const response = await axios.get<Workout>(`${process.env.REACT_APP_API_URL}/workout/${id}`, {withCredentials: true});
            setSelectedItem(response.data);
            console.log(response.data)
        } catch (error) {
            console.error("Error fetching workout: ", error)
        }
        fetchUsersWokouts();
    }
    const fetchUsersWokouts = async () =>{
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/workout/my-workouts`,{withCredentials: true});
            setUserWorkouts({saved: response.data.saved, favorites: response.data.favorites, created: response.data.created});
            console.log(response.data);
        } catch (error) {
            console.error("Error getting user's workouts: ", error)
        }
        console.log(userWorkouts)
    }
    const handleDelete = async () =>{
        try{
            if(selectedItem){
                const response = await fetch(`${process.env.REACT_APP_API_URL}/workout/${selectedItem._id}`, {method: 'DELETE'}) ;
                const data = await response.json();
                if (response.ok) {
                    setSelectedItem(null);
                    setShowModal(false);
                    fetchItems();
                } else {
                    alert('Error deleting workout: ' + data.message);
                }
            }
            
        } catch (error) {
            console.error(`Error deleting workout: `, error);
        }
    }

    const handleSaveWorkout = async () =>{
        try{
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/workout/save/${selectedItem._id}`,{}, {withCredentials: true});
            if(response.status === 200){
                setUserWorkouts(prev => {
                    if (!prev) return prev;
                    const isSaved = prev.saved.includes(selectedItem._id);

                    return {
                        ...prev, 
                        saved: isSaved ? prev.saved.filter(id => id !== selectedItem._id) : [...prev.saved, selectedItem._id]
                    } 
                });
                showMessage(response.data.message, "success");
                
            }else if(response.status === 500){
                showMessage("Failed to add workout to saved workouts. Server error.", "error")
            }
        } catch (error){
            showMessage("Error fetching workouts", "error");
            console.error(error)
        }
    };
    const handleToggleFavorite = async () =>{
        try{
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/workout/favorite/${selectedItem._id}`,{}, {withCredentials: true});
            if(response.status === 200){
                setUserWorkouts(prev => {
                    if (!prev) return prev;
                    console.log(prev)
                    const isFavorited = prev.favorites.includes(selectedItem._id);

                    return {
                        ...prev, 
                        favorites: isFavorited ? prev.favorites.filter(id => id !== selectedItem._id) : [...prev.favorites, selectedItem._id]
                    } 
                });
                showMessage(response.data.message, "success");
            }else if(response.status === 500){
                showMessage("Failed to add workout to favorite workouts. Server error.", "error")
            }
        } catch (error){
            showMessage("Error fetching workouts", "error");
            console.error(error)
        }
    };
    return ( 
        <div className="full-container p-[20px] h-full w-full overflow-hidden flex gap-3">
            <div className="items-container flex flex-col gap-[10px] overflow-y-hidden h-full w-1/5 flex-shrink-0">
                <h2 className="font-bold text-2xl items-center flex justify-center h-[50px] primary-color">Workouts</h2>
                { isUserLoggedIn ? <Link to={'/workouts/new'} className="w-full h-[40px] rounded primary-color items-center flex justify-center">Add Workout</Link> : null }
                <div className="h-full flex flex-col gap-3 overflow-x-hidden overflow-y-auto scrollbar-hide">
                    {items && items.length > 0 ? items.map((item, index)=> (
                        <div className={`item w-full h-[90px] primary-color rounded py-[5px] px-[10px] ${selectedItem?._id===item._id ? 'selected-item' : ''}`} key={index} onClick={()=>getWorkoutData(item._id)}>
                        <h3>{item.name}</h3>
                        <div className="flex gap-[10px] overflow-hidden w-full whitespace-nowrap">
                            {item.targetGroups && item.targetGroups.length > 0 ? item.targetGroups.map((group,index)=><p key={'group-'+index}>{group.name}</p>):<p>No groups</p>}
                        </div>
                        <div className="flex gap-[10px] overflow-hidden w-full whitespace-nowrap">
                            {item.tags && item.tags.length > 0 ? item.tags.map((tag,index)=><p key={'tag-'+index}>{tag.name}</p>):<p>No tags</p>}
                        </div>
                        
                        </div>
                    )) : null}
                </div>
            </div>
            <div className="item-content primary-color w-4/5">
            {showModal ? <DeleteModal confirm={handleDelete} cancel={()=>setShowModal(false)} /> : null}
            {selectedItem ? 
                <div className="p-[15px] flex gap-[10px] flex-wrap">
                    <div className="flex gap-[20px] align-center w-full">
                        <h2 className="font-bold mb-2 text-2xl">{selectedItem.name}</h2>
                        {isUserLoggedIn && userData ? <div className="ml-auto flex gap-5">
                            <button className="flex gap-1 items-center" onClick={handleSaveWorkout}><img className="h-[20px] w-[20px]" src={userWorkouts && userWorkouts.saved?.length > 0 ? userWorkouts?.saved.includes(selectedItem._id) ? IconLibrary.Checkmark : IconLibrary.Add : IconLibrary.Add} alt="" /></button>
                            <button className="flex gap-1 items-center" onClick={handleToggleFavorite}><img className="h-[20px] w-[20px]" src={userWorkouts && userWorkouts.favorites?.length > 0 ? userWorkouts?.favorites.includes(selectedItem._id) ? IconLibrary.StarFilled : IconLibrary.StarEmpty : IconLibrary.StarEmpty} alt="" /></button>
                                {userData.id === selectedItem.authorId || userData.role==='admin' ? (
                                    <div className="flex gap-3">
                                        <Link to={`/exercise/${selectedItem._id}/edit`} className="w-[100px] h-[40px] rounded items-center flex justify-center ml-auto">Edit</Link>
                                        <button className="w-[100px] h-[40px] rounded accent-background" onClick={()=>setShowModal(true)}>Delete</button>
                                    </div>) 
                                : null}
                            </div> 
                        : null}
                    </div>
                    <div className="secondary-color p-[10px] rounded w-full h-[90px] flex gap-[10px]">
                        <div className="w-2/3">
                            <h3 className="font-bold">Description</h3>
                            <p>{selectedItem.description || 'No description'}</p>
                        </div>
                        <div className="w-1/3">
                            <p><b>Author:</b> Stefan</p>
                            <p><b>Created at:</b> {formatDateToPretty(selectedItem.createdAt) || 'Not Set'}</p>
                            <p><b>Difficulty:</b> {selectedItem.difficulty || 'Not Set'}</p>
                        </div>
                    </div>
                    <div className="flex flex-col overflow-hidden secondary-color p-[10px] rounded h-[90px]" style={{ width: 'calc(50% - 5px)' }}>
                        <h3 className="font-bold mb-2">Target Muscles</h3>
                        <div className="flex gap-[10px] overflow-x-auto overflow-y-hidden scrollbar-hide">
                            {selectedItem.targetGroups && selectedItem.targetGroups.length > 0 ? selectedItem.targetGroups.map((group,index)=><p  className="primary-color px-[10px] py-[5px] rounded" key={'group-'+index}>{group.name}</p>):<p  className="primary-color px-[10px] rounded">No groups</p>}
                        </div>
                    </div>
                    
                    <div className="flex flex-col overflow-hidden secondary-color p-[10px] rounded h-[90px]" style={{ width: 'calc(50% - 5px)' }}>
                        <h3 className="font-bold mb-2">Tags</h3>
                        <div className="flex gap-[10px] overflow-x-auto overflow-y-hidden scrollbar-hide">
                            {selectedItem.tags && selectedItem.tags.length > 0 ? selectedItem.tags.map((tag,index)=><p className="primary-color px-[10px] py-[5px] rounded" key={'tag-'+index}>{tag.name}</p>):<p  className="primary-color px-[10px] rounded">No tags</p>}
                        </div>
                    </div>
                   
                    
                    <div className="flex-column gap-[10px] overflow-hidden secondary-color p-[10px] rounded h-[400px]" style={{ width: 'calc(50% - 5px)' }}>
                        <h3 className="font-bold mb-2">Equipment</h3>
                        <div className="flex flex-col gap-[10px] h-full overflow-x-hidden overflow-y-auto">
                            {selectedItem.equipment && selectedItem.equipment.length > 0 ? selectedItem.equipment.map((eq,index)=><div className="primary-color px-[10px] rounded w-full h-[40px] flex gap-3 overflow-hidden items-center flex-shrink-0" key={'tag-'+index}>
                                <h3>{eq.name}</h3>
                                {eq.attributes && eq.attributes.length > 0 ? <p className="ml-auto">{eq.attributes[0].value} {eq.attributes[0].unit}</p> : null}
                            </div>):<p>No Equipment</p>}
                        </div>
                    </div>
                    <div className="flex flex-col gap-[10px] overflow-hidden secondary-color p-[10px] rounded h-[400px]" style={{ width: 'calc(50% - 5px)' }}>
                        <div className="flex gap-[10px] items-center mb-3">
                            <h3 className="font-bold mr-auto">Exercises</h3>
                            <p><b>Duration: </b>{selectedItem.duration || 'Not Set'} minutes</p>
                            <p><b>Exercises: </b>{selectedItem.exercises?.length || 'Not Set'}</p>
                        </div>
                        <div className="flex flex-col gap-[10px] overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-500 scrollbar-track-gray-200 pr-[20px]">
                            {selectedItem.exercises && selectedItem.exercises.length > 0 ? selectedItem.exercises.map((exercise,index)=><div className="primary-color flex-shrink-0 px-[10px] flex items-center rounded w-full h-[40px] flex gap-[10px]" key={'group-'+index}>
                                    <h3 className="w-4/5">{exercise.name || 'Unnamed exercise'}</h3>
                                    <p className="w-1/5 text-end">{exercise.sets} {exercise.sets && exercise.sets === 1 ? 'set' : 'sets'}</p>
                                </div>):<p  className="primary-color rounded w-full h-[40px] flex gap-[10px]">No exercises</p>}
                        </div>
                    </div>
                </div> : <div className="flex items-center justify-center w-full h-full"><h1 className="text-2xl font-bold">Select a workout</h1></div>}
            </div>
        </div>
     );
}
 
export default Workouts;