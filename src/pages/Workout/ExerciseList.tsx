import React, { useEffect } from 'react';
import { useState } from 'react';
import { IconLibrary } from '../../IconLibrary';
import { Exercise } from '../../types/interfaces';
import axios from "../../axios";

interface ExercisePickerProps {
    addExercise: (tag: Exercise) => void;
    currentExercises: Exercise[]
}
const ExerciseList: React.FC<ExercisePickerProps> = ({addExercise, currentExercises}) => {


    const [searchQuery, setSearchQuery] = useState<string>('');
    const [items, setItems] = useState<Exercise[]>([]);
    const [exercises, setExercises] = useState<Exercise[]>([]);

    const handleGetExercises = async () =>{
        try{
            const response = await axios.get<Exercise[]>(`${process.env.REACT_APP_API_URL}/exercise/`);
            setItems(response.data);
            setExercises(response.data)
        } catch (error){
            console.error("Error fetching exercises: ", error)
        }
    }
    useEffect(()=>{
        handleGetExercises();
    },[]);

    const checkIfAdded = (item: Exercise) =>{
        if (currentExercises.find(existingItem => existingItem._id === item._id)) {
            return true;
        }
        return false;
    }

    const handleSeach = (value: string) =>{
        setSearchQuery(value);
        if (!value.trim()) {
            setExercises([...items]); // Reset if search is empty
            return;
        }
        const filteredItems = items.filter((item: Exercise) => item.name.toLowerCase().includes(value.toLowerCase()));
        setExercises(filteredItems);
    }

    //TODO: Add filters such as "My Exercises/Public Exercises/ Official Exercises", difficulty, target group.
    //TODO: Make it so that users can search by tags, target muscles, and other properties.
    return ( 
        <div className='flex flex-col flex-1 gap-2 h-[350px] primary-color p-2'>
            <input className="pl-2 h-[40px] rounded secondary-color flex-shrink-0" type="text" minLength={0} maxLength={100} onChange={(e)=>handleSeach(e.target.value)} value={searchQuery} placeholder='Search existing exercises...'></input>
            <div className="flex flex-col gap-2 flex-1 overflow-y-auto overflow-x-hidden">
                {exercises?.length > 0 ? exercises.map((item,index)=>
                    checkIfAdded(item) ? null : (
                        <div className="w-full h-[40px] flex-shrink-0 flex items-center gap-4" id={item.name} key={index}>
                            <h4>{item.name}</h4>
                            <p className="ml-auto">{item.sets} sets</p>
                            <button type="button" onClick={() => addExercise(item)} className="small-square transparent-bg"> <img src={IconLibrary.Add} className="w-[40px] h-[40px]" alt="" /></button>
                        </div>
                    )
                ):<p>Items not found</p>}
            </div>
        </div>
     );
}
 
export default ExerciseList;