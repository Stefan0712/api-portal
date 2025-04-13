import react, { useEffect, useState } from "react";
import axios from "axios";
import { Exercise } from "../../types/interfaces";



const Exercises = () => {
    const [items, setItems] = useState<Exercise[]>([]);
    const [selectedItem, setSelectedItem] = useState<Exercise | null>(null);

    useEffect(()=>{
        fetchItems();
    },[]);

    console.log(process.env.REACT_APP_API_URL)
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
        try{
            const response = await axios.get<Exercise>(`${process.env.REACT_APP_API_URL}/exercise/${id}`);
            setSelectedItem(response.data);
            console.log(response.data)
        } catch (error) {
            console.error("Error fetching exercises: ", error)
        }
    }
    //TODO: Convert raw Created at date to a formated version
    //TODO: Replace hardcoded author name with one found by id from the database
    //TODO: Change notes to be a string instead of an array of strings
    //TODO: Show the entire description of field on hover
    //TODO: Make sure equipment work as expected
    //TODO: Add colors to tags
    return ( 
        <div className="exercises p-[20px] gap-[10px]">
            <div className="items-top col-start-1 col-end-3 row-start-1 row-end-2">
                <h2>Exercises</h2>
            </div>
            <div className="items-container col-start-1 col-end-2 row-start-2 row-end-3 flex flex-col gap-[10px]">
                {items && items.length > 0 ? items.map((item, index)=> (
                    <div className={`item w-full h-[90px] primary-color rounded py-[5px] px-[10px] ${selectedItem?._id===item._id ? 'selected-item' : ''}`} key={index} onClick={()=>getExerciseData(item._id)}>
                        <h3>{item.name}</h3>
                        <div className="flex gap-[10px] overflow-hidden w-full">
                            {item.muscleGroups && item.muscleGroups.length > 0 ? item.muscleGroups.map((group,index)=><p key={'group-'+index}>{group.name}</p>):<p>No groups</p>}
                        </div>
                        <div className="flex gap-[10px] overflow-hidden w-full">
                            {item.tags && item.tags.length > 0 ? item.tags.map((tag,index)=><p key={'tag-'+index}>{tag.name}</p>):<p>No tags</p>}
                        </div>
                        
                    </div>
            )) : null}
            </div>
            <div className="item-content col-start-2 col-end-3 row-start-2 row-end-3 primary-color">
                {selectedItem ? 
                <div className="p-[15px] flex gap-[10px] flex-wrap">
                    <h2 className="font-bold mb-2">{selectedItem.name}</h2>
                    <div className="secondary-color p-[10px] rounded w-full h-[90px] flex">
                        <div className="w-2/3">
                            <h3 className="font-bold">Description</h3>
                            <p>{selectedItem.description || 'No description'}</p>
                        </div>
                        <div className="w-1/3">
                            <p><b>Author:</b> Stefan</p>
                            <p><b>Created at:</b> {selectedItem.createdAt || 'Not Set'}</p>
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
                                </div>):<p  className="primary-color rounded w-full h-[40px] flex gap-[10px]">No fields</p>}
                        </div>
                    </div>
                    
                    <div className="flex-column gap-[10px] overflow-hidden secondary-color p-[10px] rounded h-[200px]" style={{ width: 'calc(50% - 5px)' }}>
                        <h3 className="font-bold mb-2">Equipment</h3>
                        <div className="flex gap-[10px]  overflow-x-hidden overflow-y-auto">
                            {selectedItem.tags && selectedItem.tags.length > 0 ? selectedItem.tags.map((tag,index)=><p className="primary-color px-[10px] rounded" key={'tag-'+index}>{tag.name}</p>):<p  className="primary-color px-[10px] rounded">No tags</p>}
                        </div>
                    </div>

                    <div className="flex-column gap-[10px] overflow-hidden secondary-color p-[10px] rounded h-[200px] w-full">
                        <h3 className="font-bold mb-2">Instructions</h3>
                        <div className="flex-column gap-[10px]  overflow-x-hidden overflow-y-auto">
                            {selectedItem.instructions && selectedItem.instructions.length > 0 ? selectedItem.instructions.map((instruction,index)=><div className="primary-color px-[10px] flex items-center rounded w-full h-[40px] flex gap-[10px]" key={'group-'+index}>
                                    <p className="font-bold">{index+1} </p><p className="w-full">{instruction}</p>
                                </div>):<p  className="primary-color rounded w-full p-[10px]">No instructions</p>}
                        </div>
                    </div>

                </div> : <h2>Select an exercise</h2>}
            </div>
        </div>
     );
}
 
export default Exercises;