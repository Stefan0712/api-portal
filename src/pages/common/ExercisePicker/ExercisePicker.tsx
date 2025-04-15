import React, { useEffect } from 'react';
import styles from '../TagPicker/TagPicker.module.css';
import { useState } from 'react';
import { IconLibrary } from '../../../IconLibrary';
import { Exercise } from '../../../types/interfaces';
import axios from 'axios';

interface ExercisePickerProps {
    closeModal: () => void;
    addExercise: (tag: Exercise) => void;
    currentExercises: Exercise[]
}
const ExercisePicker: React.FC<ExercisePickerProps> = ({closeModal, addExercise, currentExercises}) => {


    const [searchQuery, setSearchQuery] = useState<string>('');
    const [items, setItems] = useState<Exercise[]>([]);
    const [exercises, setExercises] = useState<Exercise[]>([]);

    const handleGetExercises = async () =>{
        try{
            const response = await axios.get<Exercise[]>(`${process.env.REACT_APP_API_URL}/exercise/`);
            setItems(response.data);
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
            setItems([...exercises]); // Reset if search is empty
            return;
        }
        const filteredItems = exercises.filter((item: Exercise) => item.name.toLowerCase().includes(value.toLowerCase()));
        setItems(filteredItems);
    }

    //TODO: Add filters such as "My Exercises/Public Exercises/ Official Exercises", difficulty, target group.
    //TODO: Make it so that users can search by tags, target muscles, and other properties.
    return ( 
        <div className={styles['tag-picker']}>
            <div className={styles.top}>
                <h3>Exercises</h3>
                <button type="button" className="clear-button" onClick={closeModal}><img src={IconLibrary.Close} className="w-[30px] h-[30px]" alt="" /></button>
            </div>
            <div className={styles['search-bar']}>
                <input className={`${styles['search-input']} pl-2 rounded secondary-color`} type="text" minLength={0} maxLength={100} onChange={(e)=>handleSeach(e.target.value)} value={searchQuery} placeholder='Search...'></input>
                <img className="w-[30px] h-[30px]" src={IconLibrary.Search} />
            </div>
            <div className={styles.results}>
                {items?.length > 0 ? items.map((item,index)=>
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
 
export default ExercisePicker;