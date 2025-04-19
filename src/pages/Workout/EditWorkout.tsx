import React, { useEffect, useState } from "react";
import { IconLibrary } from "../../IconLibrary";
import { TargetGroups as ITargetGroups, Tag, Equipment, Workout, Exercise } from "../../types/interfaces.ts";
import { v4 as uuidv4 } from 'uuid';
import Tags from "../Exercise/Tags.tsx";
import TargetGroups from "../Exercise/TargetGroups.tsx";
import Equipments from "../Exercise/Equipments.tsx";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../../axios";
import ExercisePicker from "../common/ExercisePicker/ExercisePicker.tsx";

const EditWorkout: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const [showGroups, setShowGroups] = useState<boolean>(false);
    const [showExercisePicker, setShowExercisePicker] = useState<boolean>(false);

    const [workoutData, setWorkoutData] = useState<Workout | null>(null);

    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [reference, setReference] = useState<string>('');
    const [difficulty, setDifficulty] = useState<string>('');
    const [exerciseTags, setExerciseTags] = useState<Tag[]>([]);
    const [equipments, setEquipments] = useState<Equipment[]>([]);
    const [duration, setDuration] = useState<string>('');
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [muscleGroups, setMuscleGroups] = useState<ITargetGroups[]>([]);
    const [groupName, setGroupName] = useState<string>('');
    const [createdAt, setCreatedAt] = useState<string>('');

    useEffect(() => {
        const fetchWorkout = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/workout/${id}`);
                setWorkoutData(response.data);
                
                
            } catch (error) {
                console.error("Error fetching workout:", error);
            }
        };

        if (id) {
            fetchWorkout();
        }
    }, [id]);

    useEffect(()=>{
        populateData();
    },[workoutData]);


    const populateData = () =>{
        if(workoutData){
            setName(workoutData.name || '');
            setDescription(workoutData.description || '');
            setReference(workoutData.reference || '');
            setDifficulty(workoutData.difficulty || '');
            setExerciseTags(workoutData.tags || []);
            setEquipments(workoutData.equipment || []);
            setDuration(workoutData.duration?.toString() || '');
            setMuscleGroups(workoutData.targetGroups || []);
            setCreatedAt(workoutData.createdAt);
            setExercises(workoutData.exercises || []);
        }
    }
    const handleSaveWorkout = async (data: Workout) => {
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/workout/${id}`, data);
            console.log("Workout updated!");
            navigate('/workouts');
        } catch (error) {
            console.log("Error updating workout: ", error);
        }
    };

    const handleSubmit = () => {
        const updatedAt = new Date().toISOString();
        let exercisesIds: string[] = [];

        exercises.forEach((item: Exercise) => {
            if (item._id) {
                exercisesIds.push(item._id);
            } else {
                console.log("Could not push id for: ", item);
            }
        });

        const workoutData: Workout = {
            updatedAt,
            createdAt,
            authorId: 'system',
            isCompleted: false,
            name,
            source: 'database',
            description,
            reference,
            difficulty,
            duration: parseInt(duration) || getTotalDuration(),
            durationUnit: 'min',
            visibility: 'private',
            imageUrl: '',
            targetGroups: muscleGroups,
            exercises: exercisesIds,
            tags: exerciseTags,
            equipment: equipments,
        };
        console.log(workoutData);
        handleSaveWorkout(workoutData);
    };

    const addTag = (newItem: Tag) => {
        setExerciseTags((exerciseTags) => [...exerciseTags, newItem]);
    };

    const addEquipment = (newItem: Equipment) => {
        const alreadyExists = equipments.some(item => item.id === newItem.id);
        if (!alreadyExists) {
            setEquipments(prev => [...prev, newItem]);
        } else {
            console.log("Equipment already added.");
        }
    };

    const handleAddGroup = () => {
        if (groupName.length > 0 && groupName.length < 15) {
            const groupData: ITargetGroups = {
                id: uuidv4(),
                author: 'system',
                name: groupName
            };
            addmuscleGroups(groupData);
            setGroupName('');
        }
    };

    const addmuscleGroups = (newItem: ITargetGroups) => {
        const alreadyExists = muscleGroups.some(item => item.id === newItem.id);
        if (!alreadyExists) {
            setMuscleGroups(prev => [...prev, newItem]);
        } else {
            console.log("Muscle Group already added.");
        }
    };

    const handleAddExercise = (exercise: Exercise) => {
        setExercises((exercises) => [...exercises, exercise]);
        if (exercise.equipment && exercise.equipment.length > 0) {
            exercise.equipment.forEach(item => addEquipment(item));
        }
        if (exercise.muscleGroups && exercise.muscleGroups.length > 0) {
            exercise.muscleGroups.forEach(item => addmuscleGroups(item));
        }
    };

    const handleRemoveExercise = (id: string | undefined) => {
        if (id) {
            setExercises(prevExercises => [...prevExercises.filter(item => item._id !== id)]);
        }
    };

    const getTotalDuration = () => exercises.reduce((sum, exercise) => sum + (exercise.duration ?? 0), 0);

    return ( 
        <div>
            <div className="flex gap-4 px-[20px] items-center">
                <Link to={'/workouts'}><img className="w-[25px] h-[25px]" src={IconLibrary.BackArrow} alt=""></img></Link>
                <h2 className="font-bold text-2xl">Edit Workout</h2>
                <button className="w-[100px] h-[40px] rounded accent-background text-white ml-auto" type="button" onClick={handleSubmit}>Save</button>
            </div>
                <form className="flex flex-wrap p-[20px]">
                        <div className="flex flex-col gap-2 w-1/2 h-[250px] p-3">
                            <h3 className="font-bold text-xl">Workout Info</h3> 
                            <input className="h-[40px] rounded w-full pl-[10px] secondary-color" type="text" name="name" id="name" required={true} minLength={3} maxLength={20} onChange={(e) => setName(e.target.value)} value={name} placeholder="Name"></input>
                            <input className="h-[40px] rounded w-full pl-[10px] secondary-color" type="text" name="description" id="description" onChange={(e) => setDescription(e.target.value)} value={description} minLength={0} maxLength={300} placeholder="Description"></input>
                            <input className="h-[40px] rounded w-full pl-[10px] secondary-color" type="url" name="reference" id="reference" onChange={(e) => setReference(e.target.value)} value={reference} placeholder="Reference URL"></input>
                            <fieldset className="flex w-full gap-[10px]">
                                    <select className="h-[40px] rounded w-full pl-[10px] secondary-color" name="difficulty" id="difficulty" onChange={(e) => setDifficulty(e.target.value)} value={difficulty}>
                                        <option value="" disabled>Difficulty</option>
                                        <option value="beginner">Beginner</option>
                                        <option value="intermediate">Intermediate</option>
                                        <option value="advanced">Advanced</option>
                                        <option value="expert">Expert</option>
                                    </select>
                                    <input className="h-[40px] rounded w-full pl-[10px] secondary-color" type="text" name="duration" id="duration" onChange={(e) => setDuration(e.target.value)} value={duration} placeholder="Duration (min)"></input>
                            </fieldset>
                        </div>
                        <div className="flex flex-col gap-2 w-1/2 h-[250px] p-3">
                            <h3 className="font-bold text-xl">Exercises</h3>
                            {showExercisePicker ? <ExercisePicker closeModal={()=>setShowExercisePicker(false)} currentExercises={exercises} addExercise={handleAddExercise} /> : null}
                            <button className="w-[150px] h-[40px] secondary-color rounded" type="button" onClick={()=>setShowExercisePicker(true)}>Add Exercise</button>
                            <div className="flex flex-col gap-2 h-[150px] overflow-x-hidden overflow-y-auto primary-color rounded p-2 pr-[20px]">
                            {exercises && exercises.length > 0 ? exercises.map((exercise, index) => (
                                        <div className="w-full h-[40px] flex-shrink-0 flex items-center gap-4" id={exercise.name} key={index}>
                                            <h4>{exercise.name}</h4>
                                            <p className="ml-auto">{exercise.sets} sets</p>
                                            <button type="button" onClick={() => handleRemoveExercise(exercise._id)} className="small-square transparent-bg"> <img src={IconLibrary.Close} className="w-[30px] h-[30px]" alt="" /></button>
                                        </div>
                                        )
                                    ) : (
                                        <h3>No exercises added</h3>
                                    )
                                }
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 w-1/2 h-[250px] p-3">
                            <h3 className="font-bold text-xl">Tags</h3>
                            <Tags addTag={addTag} author={"system"} allTags={exerciseTags} />
                            
                            <div className="flex flex-col gap-2 h-[150px] overflow-x-hidden overflow-y-auto primary-color rounded p-2 pr-[20px]">
                                {exerciseTags?.length > 0 ? exerciseTags.map((item)=><div key={item.name+item.color} className="w-full h-[40px] flex gap-2 secondary-color px-2 items-center rounded flex-shrink-0"><div className="h-[15px] w-[15px] rounded" style={{backgroundColor: item.color}}></div><p>{item.name}</p><img className=" w-[20px] h-[20px] ml-auto" src={IconLibrary.No} onClick={()=>setExerciseTags((exerciseTags)=>[...exerciseTags.filter(it=>it.id!==item.id)]) }/></div>) : <p className="px-2 py-1 font-bold">No Tags</p>}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 w-1/2 h-[250px] p-3">
                            <h3 className="font-bold text-xl">Target Muscles</h3>
                            <div className="flex gap-2">
                                <button type="button" onClick={()=>setShowGroups(true)}><img className="w-[30px] h-[30px]" src={IconLibrary.Search} alt=""/></button>
                                <input className="h-[40px] rounded w-full pl-[10px] secondary-color" type='text' name="groupName" onChange={(e)=>setGroupName(e.target.value)} value={groupName} placeholder="Muscle Name" />
                                <button type="button" onClick={handleAddGroup}><img className="w-[40px] h-[40px]"  src={IconLibrary.Add} alt="" /></button>
                            </div>  
                            {showGroups ? <TargetGroups closeModal={()=>setShowGroups(false)} currentItems={muscleGroups} addItem={addmuscleGroups} /> : null}
                            <div className="flex flex-col gap-2 h-[150px] overflow-x-hidden overflow-y-auto primary-color rounded p-2 pr-[20px]">
                                {muscleGroups?.length > 0 ? muscleGroups.map((item, index)=><div className="w-full h-[40px] flex gap-2 secondary-color px-2 items-center rounded flex-shrink-0" key={item.name+index} ><div></div><p>{item.name}</p><img className=" w-[20px] h-[20px] ml-auto" src={IconLibrary.No} onClick={()=>setMuscleGroups((muscleGroups)=>[...muscleGroups.filter(it=>it.id!==item.id)]) }/></div>) : <p className="px-2 py-1 font-bold">No Target Muscles</p>}
                            </div>
                        </div> 
                        <div className="flex flex-col gap-2 w-1/2 h-[250px] p-3">
                            <h3 className="font-bold text-xl">Equipment</h3>
                            <Equipments addEquipment={addEquipment} allItems={equipments} />
                            <div className="flex flex-col gap-2 h-[150px] overflow-x-hidden overflow-y-auto primary-color rounded mt-2 p-2 pr-[20px]">
                                {equipments?.length > 0 ? equipments.map((item,index)=><div key={item.name+index} className="w-full h-[40px] flex gap-2 secondary-color px-2 items-center rounded flex-shrink-0">
                                    <p>{item.name}</p>
                                    <div>{item.attributes && item.attributes.length > 0 ? item.attributes.map((item, index)=>(<p key={'attribute-'+index}>{item.value} {item.unit}</p>)): null}</div>
                                    <img className="w-[20px] h-[20px] ml-auto" src={IconLibrary.No} onClick={()=>setEquipments((equipments)=>[...equipments.filter(it=>it.id!==item.id)]) }/>
                                </div>) : <p className="px-2 py-1 font-bold">No Equipment</p>}
                            </div>
                        </div>

                </form>
        </div>
     );
}
 
export default EditWorkout;