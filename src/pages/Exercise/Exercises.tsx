import React, { useEffect, useState } from "react";
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
    const handleSaveExercise = async () =>{
        try{
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/exercise/save/${selectedItem._id}`,{}, {withCredentials: true});
            if(response.status === 200){
                setUsersExercises(prev => {
                    if (!prev) return prev;
                    const isSaved = prev.saved.includes(selectedItem._id);

                    return {
                        ...prev, 
                        saved: isSaved ? prev.saved.filter(id => id !== selectedItem._id) : [...prev.saved, selectedItem._id]
                    } 
                });
                showMessage(response.data.message, "success");
                
            }else if(response.status === 500){
                showMessage("Failed to add exercise to saved exercises. Server error.", "error")
            }
        } catch (error){
            showMessage("Error fetching exercises", "error");
            console.error(error)
        }
    };
    const handleToggleFavorite = async () =>{
        try{
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/exercise/favorite/${selectedItem._id}`,{}, {withCredentials: true});
            if(response.status === 200){
                setUsersExercises(prev => {
                    if (!prev) return prev;
                    const isFavorited = prev.favorites.includes(selectedItem._id);

                    return {
                        ...prev, 
                        favorites: isFavorited ? prev.favorites.filter(id => id !== selectedItem._id) : [...prev.favorites, selectedItem._id]
                    } 
                });
                showMessage(response.data.message, "success");
            }else if(response.status === 500){
                showMessage("Failed to add exercise to favorite exercises. Server error.", "error")
            }
        } catch (error){
            showMessage("Error fetching exercises", "error");
            console.error(error)
        }
    };
    return ( 
        <div className="p-[10px] h-screen w-full overflow-hidden flex flex-col gap-3">
            <div className="w-full h-[50px] flex items-center justify-between"><h1 className="text-2xl font-bold">Exercises</h1>{isUserLoggedIn ? <Link to={'/exercises/new'}><img className="w-[30px] h-[30px]" src={IconLibrary.Add} alt="create exercise" /></Link> : null}</div>
            <div className="w-full flex-1 overflow-hidden grid grid-cols-[350px_1fr] gap-[10px] primary-color border border-white border-opacity-5 rounded p-2">
                <div className="flex flex-col gap-[10px] overflow-hidden flex-1 flex-shrink-0">
                    <div className="flex-1 flex flex-col gap-2 overflow-hidden">
                        <div className="h-[100px] w-full flex flex-wrap gap-2 px-[5px]">
                            <div className="w-full flex items-center gap-2"><button className="secondary-color w-1/2 h-[40px] px-[15px] rounded">My Workouts</button><button className="w-1/2 h-[40px] px-[15px] rounded">Explore Workouts</button></div>
                            <select className="secondary-color h-[40px] w-full px-[15px] rounded">
                                <option>All</option>
                                <option>Created</option>
                                <option>Saved</option>
                                <option>Favorites</option>
                            </select>
                        </div>
                        <div className="h-full flex-1 flex flex-col gap-2 overflow-y-auto overflow-x-hidden scrollbar-hide">
                            {items && items.length && Array.isArray(items) ? items?.map((item, index)=> (
                                <div className={`item w-full h-[90px] flex-shrink-0 menu-color rounded py-[5px] px-[10px] ${selectedItem?._id===item._id ? 'selected-item' : ''}`} key={index} onClick={()=>getExerciseData(item._id)}>
                                    <h3 className="font-bold text-lg">{item.name}</h3>
                                    <div className="flex gap-[10px] overflow-hidden w-full text-white text-opacity-50 whitespace-nowrap">
                                        {item.muscleGroups && item.muscleGroups.length > 0 ? item.muscleGroups.map((group,index)=><p key={'group-'+index}>{group.name}</p>):<p>No groups</p>}
                                    </div>
                                    <div className="flex gap-[10px] overflow-hidden w-full text-white text-opacity-50 whitespace-nowrap">
                                        {item.tags && item.tags.length > 0 ? item.tags.map((tag,index)=><p key={'tag-'+index}>{tag.name}</p>):<p>No tags</p>}
                                    </div>
                                    
                                </div>
                            )) : null}
                        </div>
                    </div>
                </div>
                <div className="item-content content-color rounded">
                    {showModal ? <DeleteModal confirm={handleDeleteExercise} cancel={()=>setShowModal(false)} /> : null}
                    {selectedItem ? 
                    <div className="px-[15px] flex gap-[10px] flex-wrap">
                        <div className="flex gap-[20px] h-[50px] align-center w-full">
                            <h2 className="font-bold flex items-center text-2xl">{selectedItem.name}</h2>
                            {isUserLoggedIn && userData ? <div className="ml-auto flex gap-5">
                                    <button className="flex gap-1 items-center" onClick={handleSaveExercise}><img className="h-[20px] w-[20px]" src={usersExercises && usersExercises.saved?.length > 0 ? usersExercises?.saved.includes(selectedItem._id) ? IconLibrary.Checkmark : IconLibrary.Save : IconLibrary.Save} alt="" /></button>
                                    <button className="flex gap-1 items-center" onClick={handleToggleFavorite}><img className="h-[20px] w-[20px]" src={usersExercises && usersExercises.favorites?.length > 0 ? usersExercises?.favorites.includes(selectedItem._id) ? IconLibrary.StarFilled : IconLibrary.StarEmpty : IconLibrary.StarEmpty} alt="" /></button>
                                    {userData.id === selectedItem.authorId || userData.role==='admin' ? (
                                        <div className="flex gap-3">
                                            <Link to={`/exercise/${selectedItem._id}/edit`} className="w-[100px] h-[40px] rounded items-center flex justify-center ml-auto">Edit</Link>
                                            <button className="w-[100px] h-[40px] rounded accent-background" onClick={()=>setShowModal(true)}>Delete</button>
                                        </div>) 
                                    : null}
                                </div> 
                            : null}
                        </div>
                        <div className="primary-color p-[10px] rounded w-full h-[90px] flex">
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
                        <div className="flex-column gap-[10px] overflow-hidden primary-color p-[10px] rounded h-[75px]" style={{ width: 'calc(50% - 5px)' }}>
                            <h3 className="font-bold mb-2">Target Muscles</h3>
                            <div className="flex gap-[10px] overflow-x-hidden overflow-y-auto">
                                {selectedItem.muscleGroups && selectedItem.muscleGroups.length > 0 ? selectedItem.muscleGroups.map((group,index)=><p  className="primary-color px-[10px] rounded" key={'group-'+index}>{group.name}</p>):<p  className="primary-color px-[10px] rounded">No groups</p>}
                            </div>
                        </div>
                        
                        <div className="flex-column gap-[10px] overflow-hidden primary-color p-[10px] rounded h-[75px]" style={{ width: 'calc(50% - 5px)' }}>
                            <h3 className="font-bold mb-2">Tags</h3>
                            <div className="flex gap-[10px] overflow-x-hidden overflow-y-auto">
                                {selectedItem.tags && selectedItem.tags.length > 0 ? selectedItem.tags.map((tag,index)=><p className="primary-color px-[10px] rounded" key={'tag-'+index}>{tag.name}</p>):<p  className="primary-color px-[10px] rounded">No tags</p>}
                            </div>
                        </div>
                        <div className="flex-column gap-[10px] overflow-hidden primary-color p-[10px] rounded h-[200px]" style={{ width: 'calc(50% - 5px)' }}>
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
                        
                        <div className="flex-column gap-[10px] overflow-hidden primary-color p-[10px] rounded h-[200px]" style={{ width: 'calc(50% - 5px)' }}>
                            <h3 className="font-bold mb-2">Equipment</h3>
                            <div className="flex flex-col gap-[10px]  overflow-x-hidden overflow-y-auto">
                                {selectedItem.equipment && selectedItem.equipment.length > 0 ? selectedItem.equipment.map((eq,index)=><div className="primary-color px-[10px] rounded w-full h-[40px] flex gap-3 overflow-hidden items-center" key={'tag-'+index}>
                                    <h3>{eq.name}</h3>
                                    {eq.attributes && eq.attributes.length > 0 ? <p className="ml-auto">{eq.attributes[0].value} {eq.attributes[0].unit}</p> : null}
                                </div>):<p>No Equipment</p>}
                            </div>
                        </div>

                        <div className="flex-column gap-[10px] overflow-hidden primary-color p-[10px] rounded h-[200px] w-full">
                            <h3 className="font-bold mb-2">Instructions</h3>
                            <div className="flex-column gap-[10px] flex flex-col overflow-x-hidden overflow-y-auto h-full">
                                {selectedItem.instructions && selectedItem.instructions.length > 0 ? selectedItem.instructions.map((instruction,index)=><div className="flex-shrink-0 secondary-color px-[10px] flex items-center rounded w-full h-[40px] flex gap-[10px]" key={'group-'+index}>
                                        <p className="font-bold">{index+1} </p><p className="w-full">{instruction}</p>
                                    </div>):<p  className="secondary-color rounded w-full p-[10px]">No instructions</p>}
                            </div>
                        </div>

                    </div> : <div className="flex items-center justify-center w-full h-full"><h1 className="text-2xl font-bold">Select an exercise</h1></div>}
                </div>
            </div>
        </div>
     );
}
 
export default Exercises;