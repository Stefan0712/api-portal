import React, { useEffect } from 'react';
import { useState } from 'react';
import { IconLibrary } from '../../IconLibrary';
import { Exercise } from '../../types/interfaces';
import axios from "../../axios";
import { Droppable, Draggable } from '@hello-pangea/dnd';

interface ExercisePickerProps {
    addExercise: (tag: Exercise) => void;
    currentExercises: Exercise[];
    exercises: Exercise[] | undefined;
    setExercises: (exercises: Exercise[]) => void;
}
const ExerciseList: React.FC<ExercisePickerProps> = ({addExercise, currentExercises, exercises, setExercises}) => {


    const [searchQuery, setSearchQuery] = useState<string>('');
    const [items, setItems] = useState<Exercise[]>([]);
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
        <div className='flex flex-col flex-1 gap-2 h-full w-[300px] min-w-[300px] primary-color p-2 flex-shrink-0'>
            <input className="pl-2 h-[40px] rounded secondary-color flex-shrink-0" type="text" minLength={0} maxLength={100} onChange={(e) => handleSeach(e.target.value)} value={searchQuery} placeholder='Search existing exercises...'/>
            <Droppable droppableId="pool">
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className="flex flex-col gap-2 flex-1 overflow-y-auto overflow-x-hidden px-2 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-white scrollbar-track-transparent">
                        {exercises && exercises?.length > 0 ? (
                            exercises.map((item, index) =>
                                checkIfAdded(item) ? null : (
                                    <Draggable draggableId={item.tempId || item._id} index={index} key={item._id} >
                                        {(provided) => (
                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="w-full h-[40px] flex-shrink-0 flex items-center gap-4">
                                                <h4>{item.name}</h4>
                                                <p className="ml-auto">{item.sets} sets</p>
                                            </div>
                                        )}
                                    </Draggable>
                                )
                            )
                        ) : (
                            <p>Items not found</p>
                        )}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
}
 
export default ExerciseList;