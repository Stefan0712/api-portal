import React, { useEffect } from "react";
import { useState } from "react";
import { IconLibrary } from "../../IconLibrary";
import { TargetGroups as TargetGroup, Tag, Equipment, Field, Exercise } from "../../types/interfaces.ts";
import {v4 as uuidv4} from 'uuid';
import Fields from "./Fields.tsx";
import Tags from "./Tags.tsx";
import TargetGroups from "./TargetGroups.tsx";
import Equipments from "./Equipments.tsx";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../../axios";



const EditExercise: React.FC = () => {

    const navigate = useNavigate();
    const {id} = useParams();
    

    const [showGroups, setShowGroups] = useState<boolean>(false);
    const [exerciseData, setExerciseData] = useState<Exercise | null>(null);

    
    //form values
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [reference, setReference] = useState<string>('');
    const [difficulty, setDifficulty] = useState<string>('');
    const [exerciseTags, setExerciseTags] = useState<Tag[]>([]);
    const [equipments, setEquipments] = useState<Equipment[]>([]);
    const [sets, setSets] = useState<number>(0);
    const [duration, setDuration] = useState<string>('');
    const [fields, setFields] = useState<Field[]>([]);
    const [rest, setRest] = useState<string>('');
    const [notes, setNotes] = useState<string>('');
    const [muscleGroups, setMuscleGroups] = useState<TargetGroup[]>([]); // State that holds the array containing all Target Groups
    const [groupName, setGroupName] = useState<string>(''); // State to hold the value of Target Group input
    const [instructions, setInstructions] = useState<string[]>([]); // State to hold the array of all instructions
    const [instruction, setInstruction] = useState<string>(''); // State to hold current value of instruction input

    const handleSaveExercise = async (data: Exercise) =>{
        try{
            const response = axios.put(`${process.env.REACT_APP_API_URL}/exercise/${id}`, data);
            console.log("Exercise saved!", response);
           navigate(`/exercises`);
        } catch (error){
            console.log("Error saving exercise: ",error)
        }
    }
    const getExerciseData = async (id: string) =>{
        try{
            const response = await axios.get<Exercise>(`${process.env.REACT_APP_API_URL}/exercise/${id}`);
            setExerciseData(response.data);
            console.log(response.data)
        } catch (error) {
            console.error("Error fetching exercises: ", error)
        }
    }
    useEffect(()=>{
        if(id){
            getExerciseData(id);
        }
    },[]);
    useEffect(() => {
        populateData();
    }, [exerciseData]);
    const populateData = () =>{
        if (exerciseData) {
            setName(exerciseData.name || '');
            setDescription(exerciseData.description || '');
            setReference(exerciseData.reference || '');
            setDifficulty(exerciseData.difficulty || '');
            setExerciseTags(exerciseData.tags || []);
            setEquipments(exerciseData.equipment || []);
            setSets(exerciseData.sets || 0);
            setDuration(exerciseData.duration != null ? exerciseData.duration.toString() : '');
            setFields(exerciseData.fields || []);
            setRest(exerciseData.rest != null ? exerciseData.rest.toString() : '');
            setNotes(exerciseData.notes || '');
            setMuscleGroups(exerciseData.muscleGroups || []);
            setInstructions(exerciseData.instructions || []);
        }
    }
    const handleSubmit = ()=>{
        const createdAt = new Date().toISOString(); // Get raw date and time for keeping track of when the exercise was created;

        const exerciseData: Exercise = {
            createdAt, 
            authorId: 'system',
            isCompleted: false, 
            name,
            source: 'database', 
            description, 
            reference, 
            difficulty, 
            sets, 
            duration: parseInt(duration), 
            durationUnit: 'min',
            rest: parseInt(rest),
            restUnit: 'seconds',
            visibility: 'private',
            notes,
            muscleGroups, 
            fields, 
            tags: exerciseTags, 
            equipment: equipments, 
            instructions: instructions || []
        };
        console.log(exerciseData);
        handleSaveExercise(exerciseData);
        
    }


    const addField = (field: Field)=>{
        setFields((fields)=>[...fields, field]);
    }
    const addTag = (newItem: Tag) =>{
        setExerciseTags((exerciseTags)=>[...exerciseTags, newItem]);
    }
    const addEquipment = (newItem: Equipment) =>{
        setEquipments((equipments)=>[...equipments, newItem]);
    }
    const addmuscleGroups = (newItem: TargetGroup) =>{
        setMuscleGroups((targetGorups)=>[...targetGorups, newItem]);
    }

    // Handles adding new muscle group
    const handleAddGroup = () =>{
        if(groupName.length > 0 && groupName.length < 15){ // Checks if the name is between 0 and 15 not including them
            // If the length is good, create a new target group with an id used on the frontend, an author, and the name of the group
            const groupData: TargetGroup = {
                id: uuidv4(),
                author: 'system',
                name: groupName
            }
            addmuscleGroups(groupData);
            setGroupName(''); // Resets the state holding group name
        }
    }
    const handleAddInstruction = () =>{
        if(instruction.length > 0){
            setInstructions(instructions=>[...instructions, instruction]);
            setInstruction('');
        }
    };
    // Remove the instruction by filtering all instructions and excluding the provided one (since it's just a string, no id is needed)
    const handleRemoveInstruction = (instr: string) =>{
        setInstructions(instructions=>[...instructions.filter(item => item != instr)]);
    }
    //TODO: Add Preview Exercise where the app shows the view of other users
    //TODO: Test that everything works
    //TODO: Add automatic tests
    return ( 
        <div>
            <div className="flex gap-4 px-[20px] items-center">
                <Link to={'/exercises'}><img className="w-[25px] h-[25px]" src={IconLibrary.BackArrow} alt=""></img></Link>
                <h2 className="font-bold text-2xl">Edit Exercise</h2>
                <button className="w-[100px] h-[40px] rounded accent-background text-white ml-auto" type="button" onClick={handleSubmit}>Save</button>
            </div>
                {exerciseData ? <form className="flex flex-wrap p-[20px]">
                    <div className="flex flex-col gap-2 w-1/2 h-[250px] p-3">
                        <h3 className="font-bold text-xl">Exercise Info</h3> 
                        <input className="h-[40px] rounded w-full pl-[10px] secondary-color" type="text" name="name" id="name" required={true} minLength={3} maxLength={20} onChange={(e) => setName(e.target.value)} value={name} placeholder="Name"></input>
                        <input className="h-[40px] rounded w-full pl-[10px] secondary-color" type="text" name="description" id="description" onChange={(e) => setDescription(e.target.value)} value={description} minLength={0} maxLength={300} placeholder="Description"></input>
                        <div className="w-full flex gap-3">
                            <input className="h-[40px] rounded w-1/2 pl-[10px] secondary-color" type="url" name="reference" id="reference" onChange={(e) => setReference(e.target.value)} value={reference} placeholder="Reference URL"></input>
                            <input className="h-[40px] rounded w-1/2 pl-[10px] secondary-color" type="url" name="notes" id="notes" onChange={(e) => setNotes(e.target.value)} value={notes} placeholder="Notes..."></input>
                        </div>
                        <fieldset className="flex w-full gap-[10px]">
                                <select className="h-[40px] rounded w-full pl-[10px] secondary-color" name="difficulty" id="difficulty" onChange={(e) => setDifficulty(e.target.value)} value={difficulty}>
                                    <option value="" disabled>Difficulty</option>
                                    <option value="beginner">Beginner</option>
                                    <option value="intermediate">Intermediate</option>
                                    <option value="advanced">Advanced</option>
                                    <option value="expert">Expert</option>
                                </select>
                                <select className="h-[40px] rounded w-full pl-[10px] secondary-color" name="sets" id="sets" onChange={(e) => setSets(parseInt(e.target.value))} value={sets}>
                                    <option value={0} disabled>Sets</option>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={6}>6</option>
                                    <option value={7}>7</option>
                                    <option value={8}>8</option>
                                    <option value={9}>9</option>
                                    <option value={10}>10</option>
                                </select>
                                <input className="h-[40px] rounded w-full pl-[10px] secondary-color" type="text" name="rest" id="rest" onChange={(e) => setRest(e.target.value)} value={rest} placeholder="Rest (sec)"></input>
                                <input className="h-[40px] rounded w-full pl-[10px] secondary-color" type="text" name="duration" id="duration" onChange={(e) => setDuration(e.target.value)} value={duration} placeholder="Duration (min)"></input>
                        </fieldset>
                    </div>
                    <div className="flex flex-col gap-2 w-1/2 h-[250px] p-3">
                        <h3 className="font-bold text-xl">Fields</h3>
                        <Fields key='fields-create-field' addField={addField} />
                        <div className="flex flex-col gap-2 h-[150px] overflow-x-hidden overflow-y-auto primary-color rounded p-2 pr-[20px]">
                            {fields?.length > 0 ? fields.map((field, index)=>(
                                    <div className="w-full h-[40px] flex gap-2 secondary-color px-2 items-center rounded flex-shrink-0" id={'field-'+index} key={field.name}>
                                        <h4>{field.name}</h4>
                                        <p className="ml-auto">{field.target || null}</p>
                                        <p>{field.unit}</p>
                                        <button type="button" onClick={()=>setFields((fields)=>[...fields.filter(item=>item!=field)])}><img className=" w-[20px] h-[20px]" src={IconLibrary.No}  alt=""></img></button>
                                    </div>
                            )): <p className="px-2 py-1 font-bold">No fields created</p>}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-1/2 h-[250px] p-3">
                        <h3 className="font-bold text-xl">Instructions</h3>
                        <div className="flex gap-2">
                            <input className="h-[40px] rounded w-full pl-[10px] secondary-color" type='text' name="instruction" onChange={(e)=>setInstruction(e.target.value)} value={instruction} placeholder="Instruction..." />
                            <button type="button" onClick={handleAddInstruction}><img className="w-[30px] h-[30px]" src={IconLibrary.Add} alt="" /></button>
                        </div>  
                        <div className="flex flex-col gap-2 h-[150px] overflow-x-hidden overflow-y-auto primary-color rounded p-2 pr-[20px]">
                            {instructions?.length > 0 ? instructions.map((instruction, index)=>(
                                    <div className="w-full mh-[40px] flex gap-2 secondary-color px-2 items-center rounded flex-shrink-0" id={'instruction'} key={'instruction-'+index}>
                                        <h4>{index+1}. {instruction}</h4>
                                        <button className="ml-auto" type="button" onClick={()=>handleRemoveInstruction(instruction)}><img className="w-[20px] h-[20px]" src={IconLibrary.No}  alt=""></img></button>
                                    </div>
                            )): <p className="px-2 py-1 font-bold">No instructions created</p>}
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

                </form> : <h1>Loading exercise data...</h1>}
        </div>
     );
}
 
export default EditExercise;