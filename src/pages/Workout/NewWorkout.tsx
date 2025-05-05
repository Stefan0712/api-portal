import React, { useEffect } from "react";
import { useState } from "react";
import { IconLibrary } from "../../IconLibrary";
import { TargetGroups as ITargetGroups, Tag, Equipment, Workout, Exercise } from "../../types/interfaces.ts";
import {v4 as uuidv4} from 'uuid';
import Tags from "../Exercise/Tags.tsx";
import TargetGroups from "../Exercise/TargetGroups.tsx";
import Equipments from "../Exercise/Equipments.tsx";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../axios";
import { getUserData, isLoggedIn } from "../../utils/auth.ts";
import ErrorLoginPage from "../common/LoginErrorPage.tsx";
import { useMessage } from "../../context/MessageContext.tsx";
import ExerciseList from "./ExerciseList.tsx";
import { DragDropContext, Droppable, Draggable, } from '@hello-pangea/dnd';


interface IPhase {
    id: string;
    order: number;
    name: string;
    exercises: Exercise[];
}

const NewWorkout: React.FC = () => {

    const navigate = useNavigate();
    const isUserLoggedIn = isLoggedIn();
    const userData = getUserData();
    const { showMessage } = useMessage();


    const [showGroups, setShowGroups] = useState<boolean>(false);
    const [currentSection, setCurrentSection] = useState<string>('tags');

    const [allExercises, setAllExercises] = useState<Exercise[]>();

    //form values
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [reference, setReference] = useState<string>('');
    const [difficulty, setDifficulty] = useState<string>('beginner');
    const [exerciseTags, setExerciseTags] = useState<Tag[]>([]);
    const [equipments, setEquipments] = useState<Equipment[]>([]);
    const [duration, setDuration] = useState<string>('');
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [muscleGroups, setMuscleGroups] = useState<ITargetGroups[]>([]); // State that holds the array containing all Target Groups
    const [groupName, setGroupName] = useState<string>(''); // State to hold the value of Target Group input


    const [phases, setPhases] = useState<IPhase[]>([{id: 'id-phase-1', order: 1, name: 'Warm-up', exercises: []}, {id: 'id-phase-2', order: 2, name: 'Workout', exercises: []}, {id: 'id-phase-3', order: 3, name: 'Cooldown', exercises: []}]);
    const [phaseToEdit, setPhaseToEdit] = useState<string | null>(null);
    const [phaseName, setPhaseName] = useState<string>('');
    const handleSaveWorkout = async (data: Workout) =>{
        try{
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/workout`, data, {withCredentials: true});
            if(response.status === 201){
                showMessage("Workout saved successfully","success");
                navigate('/workouts');
            }
        } catch (error){
            showMessage("There was an error creating a new workout", "error");
            console.error(error)
        }
    }

    const handleSubmit = ()=>{
        if(isUserLoggedIn && userData && userData.id){

            const createdAt = new Date().toISOString(); // Get raw date and time for keeping track of when the exercise was created;
    
            //extract only the id and source from each exercise
            const phasesIds = phases.map((phase: IPhase)=>({...phase, exercises: phase.exercises.map(item=>item._id)}));
            const workoutData: Workout = {
                createdAt, 
                authorId: userData.id,
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
                exercises, 
                phases: phasesIds || [],
                tags: exerciseTags, 
                equipment: equipments, 
            };
            handleSaveWorkout(workoutData);
        }else{
            showMessage("You are not logged in","error");
            
        }
        
    }
    const addTag = (newItem: Tag) =>{
        setExerciseTags((exerciseTags)=>[...exerciseTags, newItem]);
    }
    const addEquipment = (newItem: Equipment) =>{
        const alreadyExists = equipments.some(item => item.id === newItem.id || item.name === newItem.name);
        if (!alreadyExists) {
            setEquipments(prev => [...prev, newItem]);
        } else {
            showMessage("Equipment already added.", "error");
        }
    }
    

    // Handles adding new muscle group
    const handleAddGroup = () =>{
        if(groupName.length > 0 && groupName.length < 15){ // Checks if the name is between 0 and 15 not including them
            // If the length is good, create a new target group with an id used on the frontend, an author, and the name of the group
            const groupData: ITargetGroups = {
                id: uuidv4(),
                author: 'system',
                name: groupName
            }
            addmuscleGroups(groupData);
            setGroupName(''); // Resets the state holding group name
        }
    }
    const addmuscleGroups = (newItem: ITargetGroups) =>{
        const alreadyExists = muscleGroups.some(item => item.id === newItem.id || item.name === newItem.name);
        if (!alreadyExists) {
            setMuscleGroups(prev => [...prev, newItem]);
        } else {
            showMessage("This muscle group already exists", "error")
        }

    }
    const handleRemoveExercise = (id: string, phaseId: string) =>{
        if(id && phaseId){
            setPhases(prevPhases =>
                prevPhases.map(phase =>
                  phase.id === phaseId ? { ...phase, exercises: [...phase.exercises.filter(item=>item._id!==id)] } : phase
                )
            );
        }
    }
    //get duration based on each exercise duration that will be set as workout duration if none is specified by the user
    const getTotalDuration = () => exercises.reduce((sum, exercise) => sum + (exercise.duration ?? 0), 0);

    const handleDragEnd = (result) => {
        const { source, destination, draggableId } = result;
        if (!destination) return;
        if (source.droppableId === destination.droppableId && source.index === destination.index) return;
      
        const updatedPhases = [...phases];
        let draggedExercise;
      
        if (source.droppableId === 'pool') {
            // Dragging from the exercise pool
            const original = allExercises.find(ex => ex._id === draggableId);
            if(original){
                if(original.equipment && original.equipment.length > 0){
                    original.equipment.forEach(item=>!equipments.includes(item) ? addEquipment(item) : null);
                }
                if(original.muscleGroups && original.muscleGroups.length > 0){
                    original.muscleGroups.forEach(item=>!muscleGroups.includes(item) ? addmuscleGroups(item) : null);
                }
            }
            draggedExercise = { ...original, _id: original._id, tempId: uuidv4() };

        } else {
            // Dragging from a phase
            const sourcePhaseIndex = parseInt(source.droppableId.split('-')[1]);
            draggedExercise = updatedPhases[sourcePhaseIndex].exercises[source.index];
            updatedPhases[sourcePhaseIndex].exercises.splice(source.index, 1);
        }
      
        if (destination.droppableId !== 'pool') {
            const destPhaseIndex = parseInt(destination.droppableId.split('-')[1]);
            updatedPhases[destPhaseIndex].exercises.splice(destination.index, 0, draggedExercise);
        }
      
        setPhases(updatedPhases);
      };
      
      const handleUpdatePhase = (id: string) =>{
        if(phaseName.length > 0 && phaseName.length <= 20){
            setPhases(prevPhases =>
                prevPhases.map(phase =>
                  phase.id === id ? { ...phase, name: phaseName } : phase
                )
            );
            setPhaseName('');
            setPhaseToEdit(null);
        }else{
            if(phaseName.length < 1){
                showMessage("Phase name can't be empty", "error");
            }else if(phaseName.length > 20){
                showMessage("Phase name can't be longer than 20 characters", "error");
            }
            
        }
      }
    
    if(!isUserLoggedIn){
        return (<ErrorLoginPage />);
    }else{
        return ( 
            <div>
                <div className="flex gap-4 px-[20px] items-center py-[10px] w-full">
                    <Link to={'/workouts'}><img className="w-[25px] h-[25px]" src={IconLibrary.BackArrow} alt=""></img></Link>
                    <h2 className="font-bold text-2xl">Create Workout</h2>
                    <button className="w-[100px] h-[40px] rounded accent-background text-white ml-auto" type="button" onClick={handleSubmit}>Save</button>
                </div>
                    <form className="flex flex-col">
                            <div className="top w-full h-[300px] flex gap-[20px]">
                                <div className="flex flex-col h-full gap-2 w-1/2 p-3">
                                    <h3 className="font-bold text-xl">Workout Info</h3> 
                                    <input className="h-[40px] rounded w-full pl-[10px] secondary-color" type="text" name="name" id="name" required={true} minLength={3} maxLength={50} onChange={(e) => setName(e.target.value)} value={name} placeholder="Name"></input>
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
                                <div className="w-1/2 p-3 flex flex-col gap-2 h-full">
                                    <div className="flex gap-3">
                                        <button type="button" onClick={()=>setCurrentSection('tags')} className={`px-[10px] h-[40px] rounded ${currentSection === "tags" ? 'secondary-color' : ''} `}>Tags</button>
                                        <button type="button" onClick={()=>setCurrentSection('equipment')} className={`px-[10px] h-[40px] rounded ${currentSection === "equipment" ? 'secondary-color' : ''} `}>Equipment</button>
                                        <button type="button" onClick={()=>setCurrentSection('muscles')} className={`px-[10px] h-[40px] rounded ${currentSection === "muscles" ? 'secondary-color' : ''} `}>Target Muscles</button>
                                    </div>
                                    {currentSection === 'tags' ? <div className="flex flex-col gap-2 w-full h-full">
                                        <h3 className="font-bold text-xl">Tags</h3>
                                        <Tags addTag={addTag} author={"system"} allTags={exerciseTags} />
                                        
                                        <div className="flex flex-wrap gap-2 h-[150px] overflow-x-hidden overflow-y-auto  rounded p-2 pr-[20px]">
                                            {exerciseTags?.length > 0 ? exerciseTags.map((item)=><div key={item.name+item.color} className="h-[40px] flex gap-2 secondary-color px-2 items-center rounded flex-shrink-0"><div className="h-[15px] w-[15px] rounded" style={{backgroundColor: item.color}}></div><p>{item.name}</p><img className=" w-[20px] h-[20px]" src={IconLibrary.No} onClick={()=>setExerciseTags((exerciseTags)=>[...exerciseTags.filter(it=>it.id!==item.id)]) }/></div>) : <p className="px-2 py-1 font-bold">No Tags</p>}
                                        </div>
                                    </div> : currentSection === "muscles" ? <div className="flex flex-col gap-2 w-full h-full">
                                        <h3 className="font-bold text-xl">Target Muscles</h3>
                                        <div className="flex gap-2">
                                            <button type="button" onClick={()=>setShowGroups(true)}><img className="w-[30px] h-[30px]" src={IconLibrary.Search} alt=""/></button>
                                            <input className="h-[40px] rounded w-full pl-[10px] secondary-color" type='text' name="groupName" onChange={(e)=>setGroupName(e.target.value)} value={groupName} placeholder="Muscle Name" />
                                            <button type="button" onClick={handleAddGroup}><img className="w-[40px] h-[40px]"  src={IconLibrary.Add} alt="" /></button>
                                        </div>  
                                        {showGroups ? <TargetGroups closeModal={()=>setShowGroups(false)} currentItems={muscleGroups} addItem={addmuscleGroups} /> : null}
                                        <div className="flex flex-wrap gap-2 h-[150px] overflow-x-hidden overflow-y-auto  rounded p-2 pr-[20px]">
                                            {muscleGroups?.length > 0 ? muscleGroups.map((item, index)=><div className="h-[40px] flex gap-2 secondary-color px-[10px] items-center rounded flex-shrink-0" key={item.name+index} ><div></div><p>{item.name}</p><img className=" w-[20px] h-[20px]" src={IconLibrary.No} onClick={()=>setMuscleGroups((muscleGroups)=>[...muscleGroups.filter(it=>it.id!==item.id)]) }/></div>) : <p className="px-2 py-1 font-bold">No Target Muscles</p>}
                                        </div>
                                    </div>  : currentSection === "equipment" ? <div className="flex flex-col gap-2 w-full h-full">
                                        <h3 className="font-bold text-xl">Equipment</h3>
                                        <Equipments addEquipment={addEquipment} allItems={equipments} />
                                        <div className="flex flex-col gap-2 h-[150px] overflow-x-hidden overflow-y-auto rounded mt-2 p-2 pr-[20px]">
                                            {equipments?.length > 0 ? equipments.map((item,index)=><div key={item.name+index} className="w-full h-[40px] flex gap-2 secondary-color px-2 items-center rounded flex-shrink-0">
                                                <p>{item.name}</p>
                                                <div>{item.attributes && item.attributes.length > 0 ? item.attributes.map((item, index)=>(<p key={'attribute-'+index}>{item.value || null} {item.unit || null}</p>)): null}</div>
                                                <img className="w-[20px] h-[20px] ml-auto" src={IconLibrary.No} onClick={()=>setEquipments((equipments)=>[...equipments.filter(it=>it.id!==item.id)]) }/>
                                            </div>) : <p className="px-2 py-1 font-bold">No Equipment</p>}
                                        </div>
                                    </div> : <div className="flex flex-col gap-2 w-full h-full">
                                        <h3 className="font-bold text-xl">Equipment</h3>
                                        <Equipments addEquipment={addEquipment} allItems={equipments} />
                                        <div className="flex flex-col gap-2 h-[150px] overflow-x-hidden overflow-y-auto rounded mt-2 p-2 pr-[20px]">
                                            {equipments?.length > 0 ? equipments.map((item,index)=><div key={item.name+index} className="w-full h-[40px] flex gap-2 secondary-color px-2 items-center rounded flex-shrink-0">
                                                <p>{item.name}</p>
                                                <div>{item.attributes && item.attributes.length > 0 ? item.attributes.map((item, index)=>(<p key={'attribute-'+index}>{item.value} {item.unit}</p>)): null}</div>
                                                <img className="w-[20px] h-[20px] ml-auto" src={IconLibrary.No} onClick={()=>setEquipments((equipments)=>[...equipments.filter(it=>it.id!==item.id)]) }/>
                                            </div>) : <p className="px-2 py-1 font-bold">No Equipment</p>}
                                        </div>
                                    </div>}
                                </div>
                            </div>
                            <div className="font-bold text-xl w-full pl-[15px] h-[50px]">Exercises</div>
                            <div className="flex gap-2 w-full h-[400px] p-[10px] overflow-x-hidden">
                                <DragDropContext onDragEnd={handleDragEnd}>
                                    <ExerciseList currentExercises={exercises} exercises={allExercises} setExercises={(items)=>setAllExercises(items)} />
                                    <button type="button" onClick={() => setPhases((phases) => [...phases, {id: uuidv4(), order: phases.length, name: 'New Phase', exercises: [] }])} className="flex-shrink-0 primary-color w-[100px] h-full p-1 flex flex-col items-center justify-center gap-2" key={"Phase-add"}>
                                        <img src={IconLibrary.Add} className="w-[40px] h-[40px]" alt="" />
                                    </button>
                                    <div className="flex gap-2 h-full overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-thumb scrollbar-thumb-rounded scrollbar-thumb-white scrollbar-track-transparent">
                                        {phases && phases.length > 0 ? (phases.map((phase, phaseIndex) => (
                                            <div className="primary-color w-[300px] flex-shrink-0 h-full p-1 flex flex-col gap-2">
                                                 {phaseToEdit !== phase.id ? 
                                                    <div className="top w-full h-[40px] flex gap-2 items-center border-b border-white border-opacity-20 pb-1">
                                                        <h2 className="font-bold text-xl">{phase.name}</h2>
                                                        <button type="button" onClick={()=>(setPhaseToEdit(phase.id), setPhaseName(phase.name))}><img src={IconLibrary.Edit} className="w-[20px] h-[20px]" alt="" /> </button>
                                                        <button className="ml-auto" type="button" onClick={()=>setPhases(prev=>[...prev.filter(item=>item.id!==phase.id)])}><img src={IconLibrary.Close} className="w-[20px] h-[20px]" alt="" /> </button>

                                                    </div> : 
                                                    <div className="top w-full h-[40px] flex gap-2 items-center border-b border-white border-opacity-20 pb-1">
                                                        <input className="text-white pl-[5px] bg-white bg-opacity-30 border-b border-white border-opacity-30" type="text" name="phaseName" id="phaseName" value={phaseName} onChange={(e)=>setPhaseName(e.target.value)} placeholder={phase.name}></input> 
                                                        <button type="button" onClick={()=>handleUpdatePhase(phase.id)}><img src={IconLibrary.Save} className="w-[20px] h-[20px]" alt="" /> </button>
                                                    </div>
                                                }
                                                <Droppable droppableId={`phase-${phaseIndex}`}>
                                                    {(provided) => (
                                                    <div ref={provided.innerRef} {...provided.droppableProps} className="flex flex-col gap-2 flex-1 overflow-y-auto">
                                                        {phase.exercises.length > 0 ? (phase.exercises.map((exercise, index) => (
                                                            <Draggable draggableId={exercise.tempId || exercise._id} index={index} key={'Exercise-'+index}>
                                                            {(provided) => (
                                                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="w-full h-[40px] flex-shrink-0 flex items-center gap-4">
                                                                <h4>{exercise.name}</h4>
                                                                <p className="ml-auto">{exercise.sets} sets</p>
                                                                <button type="button" onClick={() => handleRemoveExercise(exercise._id, phase.id)} className="small-square transparent-bg">
                                                                    <img src={IconLibrary.Close} className="w-[30px] h-[30px]" alt="" />
                                                                </button>
                                                                </div>
                                                            )}
                                                            </Draggable>))
                                                        ) : (<h3>No exercises added</h3>)}
                                                        {provided.placeholder}
                                                    </div>
                                                    )}
                                                </Droppable>
                                            </div>
                                        )) ) : ( <p className="primary-color w-[300px] flex-shrink-0 h-full flex items-center justify-center">No phase created</p> )}
                                        
                                    </div>
                                </DragDropContext>
                            </div>
                    </form>
            </div>
        );
    };
}
 
export default NewWorkout;