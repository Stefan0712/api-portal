import react, { useEffect, useState } from "react";
import axios from "../../axios";
import { Exercise } from "../../types/interfaces";
import { Link } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import { getUserData, isLoggedIn } from "../../utils/auth";
import { IconLibrary } from "../../IconLibrary";
import { formatDateToPretty } from "../../utils/dateFormat";
import { useMessage } from "../../context/MessageContext";



const Exercises = () => {

    const {showMessage} = useMessage();

    const [items, setItems] = useState<Exercise[]>([]);
    const [selectedItem, setSelectedItem] = useState<Exercise | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [usersExercises, setUsersExercises] = useState<{favorites: string[], saved: string[], created: string[]} | null>(null)

    const isUserLoggedIn = isLoggedIn();
    const userData = getUserData();

    useEffect(()=>{
        fetchItems();
        if(userData && isUserLoggedIn){
            fetchUsersExercises();
        }
    },[]);

    const fetchItems = async () =>{
        try{
            const response = await axios.get<Exercise[]>(`${process.env.REACT_APP_API_URL}/exercise/`);
            setItems(response.data);
            console.log(response.data)
        } catch (error){
            console.error("Error fetching exercises: ", error)
        }
    }
    const getExerciseData = async (id: string) =>{
        fetchUsersExercises();
        try{
            const response = await axios.get<Exercise>(`${process.env.REACT_APP_API_URL}/exercise/view/${id}`, {withCredentials: true});
            setSelectedItem(response.data);
            console.log(response.data)
        } catch (error) {
            console.error("Error fetching exercises: ", error)
        }
    }
    const fetchUsersExercises = async () =>{
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/exercise/my-exercises`,{withCredentials: true});
            setUsersExercises(response.data.exercises);
            console.log(response.data.exercises)
        } catch (error) {
            console.error("Error getting user's exercises: ", error)
        }
    }
    const handleDeleteExercise = async () =>{
        try{
            if(selectedItem){
                const response = await axios.delete(`${process.env.REACT_APP_API_URL}/exercise/${selectedItem._id}`, {withCredentials: true}) ;
                const data = await response.data;
                if(data){
                    setSelectedItem(null);
                    setShowModal(false);
                    fetchItems();
                }
            }
            
        } catch (error) {
            console.error(`Error deleting exercise: `, error);
        }
        
    }
    const addToFavorites = async (exerciseId: string) =>{
        try{
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/exercise/${exerciseId}/favorite`,{}, {withCredentials: true});
            console.log(response.data)
            if(response.status === 200){
                showMessage("Exercise added to favorites", "success")
            }else if(response.status === 500){
                showMessage("Failed to add exercise to favorites. Server error.", "error")
            }
        } catch (error){
            showMessage("Error fetching exercises", "error");
            console.error(error)
        }
    };
    const removeFromFavorites = async (exerciseId: string) =>{
        try{
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/exercise/${exerciseId}/favorite`, {withCredentials: true});
            console.log(response.data)
            if(response.status === 200){
                showMessage("Exercise removed from favorites", "success")
            }else if(response.status === 500){
                showMessage("Failed to remove exercise from favorites. Server error.", "error")
            }
        } catch (error){
            showMessage("Error fetching exercises", "error");
            console.error(error);
        }
    };
    const handleToggleFavorite = () =>{
        if(usersExercises && selectedItem && selectedItem._id){
            if(usersExercises.favorites.includes(selectedItem._id)){
                console.log("Removed from favorites");
                removeFromFavorites(selectedItem._id);
            }else if(selectedItem ){
                console.log("Added to favorites");
                addToFavorites(selectedItem._id);
            };
            fetchUsersExercises();
        }
    }
    const addToLibrary = async (exerciseId: string) =>{
        try{
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/exercise/${exerciseId}/saved`,{}, {withCredentials: true});
            console.log(response.data)
            if(response.status === 200){
                showMessage("Exercise successfully saved", "success")
            }else if(response.status === 500){
                showMessage("Failed to add exercise to saved exercises. Server error.", "error")
            }
        } catch (error){
            showMessage("Error fetching exercises", "error");
            console.error(error)
        }
    };
    const removeFromLibrary = async (exerciseId: string) =>{
        try{
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/exercise/${exerciseId}/saved`, {withCredentials: true});
            console.log(response.data)
            if(response.status === 200){
                showMessage("Exercise successfully removed", "success")
            }else if(response.status === 500){
                showMessage("Failed to remove exercise from saved exercises. Server error.", "error")
            }
        } catch (error){
            showMessage("Error fetching exercises", "error");
            console.error(error);
        }
    };
    const handleToggleSave = () =>{
        if(usersExercises && selectedItem && selectedItem._id){
            if(usersExercises.saved.includes(selectedItem._id)){
                console.log("Removed from saved exercises");
                removeFromLibrary(selectedItem._id);
            }else if(selectedItem ){
                console.log("Added to saved exercises");
                addToLibrary(selectedItem._id);
            };
            fetchUsersExercises();
        }
    }
    //TODO: Show the entire description of field on hover
    //TODO: Add colors to tags
    return ( 
        <div className="full-container p-[20px] h-full w-full overflow-hidden flex gap-3">
            <div className="items-container flex flex-col gap-[10px] overflow-y-hidden h-full w-1/5 flex-shrink-0">
                <h2 className="font-bold text-2xl items-center flex justify-center h-[50px] primary-color">Exercises</h2>
                {isUserLoggedIn ? <Link to={'/exercises/new'} className="w-full h-[40px] rounded primary-color items-center flex justify-center">Add Exercise</Link> : null}
                <div className="h-full flex flex-col gap-3 overflow-x-hidden overflow-y-auto scrollbar-hide">
                    {items && items.length && Array.isArray(items) ? items?.map((item, index)=> (
                        <div className={`item w-full h-[90px] primary-color rounded py-[5px] px-[10px] ${selectedItem?._id===item._id ? 'selected-item' : ''}`} key={index} onClick={()=>getExerciseData(item._id)}>
                            <h3 className="font-bold">{item.name}</h3>
                            <div className="flex gap-[10px] overflow-hidden w-full whitespace-nowrap">
                                {item.muscleGroups && item.muscleGroups.length > 0 ? item.muscleGroups.map((group,index)=><p key={'group-'+index}>{group.name}</p>):<p>No groups</p>}
                            </div>
                            <div className="flex gap-[10px] overflow-hidden w-full whitespace-nowrap">
                                {item.tags && item.tags.length > 0 ? item.tags.map((tag,index)=><p key={'tag-'+index}>{tag.name}</p>):<p>No tags</p>}
                            </div>
                            
                        </div>
                    )) : null}
                </div>
            </div>
            <div className="item-content primary-color w-4/5">
                {showModal ? <DeleteModal confirm={handleDeleteExercise} cancel={()=>setShowModal(false)} /> : null}
                {selectedItem ? 
                <div className="p-[15px] flex gap-[10px] flex-wrap">
                    <div className="flex gap-[20px] align-center w-full">
                        <h2 className="font-bold mb-2 text-2xl">{selectedItem.name}</h2>
                        {isUserLoggedIn && userData ? <div className="ml-auto flex gap-5">
                                <button className="flex gap-1 items-center" onClick={handleToggleSave}><img className="h-[20px] w-[20px]" src={usersExercises && usersExercises.favorites?.length > 0 ? usersExercises?.favorites.includes(selectedItem._id) ? IconLibrary.Checkmark : IconLibrary.Add : IconLibrary.Add} alt="" />Save</button>
                                <button className="flex gap-1 items-center" onClick={handleToggleFavorite}><img className="h-[20px] w-[20px]" src={usersExercises && usersExercises.favorites?.length > 0 ? usersExercises?.favorites.includes(selectedItem._id) ? IconLibrary.StarFilled : IconLibrary.StarEmpty : IconLibrary.StarEmpty} alt="" />Add to favorite</button>
                                {userData.id === selectedItem.authorId || userData.role==='admin' ? (
                                    <div className="flex gap-3">
                                        <Link to={`/exercise/${selectedItem._id}/edit`} className="w-[100px] h-[40px] rounded items-center flex justify-center ml-auto">Edit</Link>
                                        <button className="w-[100px] h-[40px] rounded accent-background" onClick={()=>setShowModal(true)}>Delete</button>
                                    </div>) 
                                : null}
                            </div> 
                        : null}
                    </div>
                    <div className="secondary-color p-[10px] rounded w-full h-[90px] flex">
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
                    <div className="flex-column gap-[10px] overflow-hidden secondary-color p-[10px] rounded h-[75px]" style={{ width: 'calc(50% - 5px)' }}>
                        <h3 className="font-bold mb-2">Target Muscles</h3>
                        <div className="flex gap-[10px] overflow-x-hidden overflow-y-auto">
                            {selectedItem.muscleGroups && selectedItem.muscleGroups.length > 0 ? selectedItem.muscleGroups.map((group,index)=><p  className="primary-color px-[10px] rounded" key={'group-'+index}>{group.name}</p>):<p  className="primary-color px-[10px] rounded">No groups</p>}
                        </div>
                    </div>
                    
                    <div className="flex-column gap-[10px] overflow-hidden secondary-color p-[10px] rounded h-[75px]" style={{ width: 'calc(50% - 5px)' }}>
                        <h3 className="font-bold mb-2">Tags</h3>
                        <div className="flex gap-[10px] overflow-x-hidden overflow-y-auto">
                            {selectedItem.tags && selectedItem.tags.length > 0 ? selectedItem.tags.map((tag,index)=><p className="primary-color px-[10px] rounded" key={'tag-'+index}>{tag.name}</p>):<p  className="primary-color px-[10px] rounded">No tags</p>}
                        </div>
                    </div>
                    <div className="flex-column gap-[10px] overflow-hidden secondary-color p-[10px] rounded h-[200px]" style={{ width: 'calc(50% - 5px)' }}>
                        <h3 className="font-bold mb-2">Fields</h3>
                        <div className="flex gap-[10px] items-center mb-3">
                            <p><b>Duration: </b>{selectedItem.duration || 'Not Set'} {selectedItem.durationUnit || ''}</p>
                            <p><b>Rest: </b>{selectedItem.rest || 'Not Set'} {selectedItem.restUnit || ''}</p>
                            <p><b>Sets: </b>{selectedItem.sets || 'Not Set'} sets</p>
                        </div>
                        <div className="flex-column gap-[10px] overflow-x-hidden overflow-y-auto">
                            {selectedItem.fields && selectedItem.fields.length > 0 ? selectedItem.fields.map((field,index)=><div className="primary-color px-[10px] flex items-center rounded w-full h-[40px] flex gap-[10px]" key={'group-'+index}>
                                    <h3 className="w-1/4">{field.name}</h3>
                                    <p className="w-1/2 overflow-hidden truncate">{field.description}</p>
                                    <p className="w-1/4 text-end">{field.target} {field.unit}</p>
                                </div>):<p  className="primary-color rounded w-full h-[40px] gap-[10px] items-center flex pl-3">No fields</p>}
                        </div>
                    </div>
                    
                    <div className="flex-column gap-[10px] overflow-hidden secondary-color p-[10px] rounded h-[200px]" style={{ width: 'calc(50% - 5px)' }}>
                        <h3 className="font-bold mb-2">Equipment</h3>
                        <div className="flex flex-col gap-[10px]  overflow-x-hidden overflow-y-auto">
                            {selectedItem.equipment && selectedItem.equipment.length > 0 ? selectedItem.equipment.map((eq,index)=><div className="primary-color px-[10px] rounded w-full h-[40px] flex gap-3 overflow-hidden items-center" key={'tag-'+index}>
                                <h3>{eq.name}</h3>
                                {eq.attributes && eq.attributes.length > 0 ? <p className="ml-auto">{eq.attributes[0].value} {eq.attributes[0].unit}</p> : null}
                            </div>):<p>No Equipment</p>}
                        </div>
                    </div>

                    <div className="flex-column gap-[10px] overflow-hidden secondary-color p-[10px] rounded h-[200px] w-full">
                        <h3 className="font-bold mb-2">Instructions</h3>
                        <div className="flex-column gap-[10px] flex flex-col overflow-x-hidden overflow-y-auto h-full">
                            {selectedItem.instructions && selectedItem.instructions.length > 0 ? selectedItem.instructions.map((instruction,index)=><div className="flex-shrink-0 primary-color px-[10px] flex items-center rounded w-full h-[40px] flex gap-[10px]" key={'group-'+index}>
                                    <p className="font-bold">{index+1} </p><p className="w-full">{instruction}</p>
                                </div>):<p  className="primary-color rounded w-full p-[10px]">No instructions</p>}
                        </div>
                    </div>

                </div> : <div className="flex items-center justify-center w-full h-full"><h1 className="text-2xl font-bold">Select an exercise</h1></div>}
            </div>
        </div>
     );
}
 
export default Exercises;