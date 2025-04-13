import React from "react";
import { useState } from "react";
import { IconLibrary } from "../../IconLibrary";
import { TargetGroup, Tag, Equipment, Field, Exercise } from "../../types/interfaces.ts";
import {v4 as uuidv4} from 'uuid';
import Fields from "./Fields.tsx";
const NewExercise: React.FC = () => {

    
    const [isExtended, setIsExtended] = useState<boolean>(true);

    const [showGroups, setShowGroups] = useState<boolean>(false);

    //form values
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [reference, setReference] = useState<string>('');
    const [muscleGroups, setMuscleGroups] = useState<TargetGroup[]>([]);
    const [difficulty, setDifficulty] = useState<string>('');
    const [exerciseTags, setExerciseTags] = useState<Tag[]>([]);
    const [equipments, setEquipments] = useState<Equipment[]>([]);
    const [sets, setSets] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [fields, setFields] = useState<Field[]>([]);
    const [rest, setRest] = useState<string>('');

    const [groupName, setGroupName] = useState<string>('');

    const handleSubmit = (e)=>{
        e.preventDefault();
        const createdAt = new Date().toISOString();
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
            duration, 
            durationUnit: 'min',
            rest: parseInt(rest),
            restUnit: 'seconds',
            visibility: 'private',
            notes: [],
            muscleGroups, 
            fields, 
            tags: exerciseTags, 
            equipment: equipments, 
            instructions: []
        };
        console.log(exerciseData)
        
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
    const handleAddGroup = () =>{
        if(groupName.length > 0 && groupName.length < 15){
            const groupData: TargetGroup = {
                id: uuidv4(),
                author: user,
                name: groupName
            }
            addmuscleGroups(groupData);
            setGroupName('');
        }
    }
    
    return ( 
        <div>
            <div>
                <h2>Create Exercise</h2>
            </div>
                <form className="flex gap-[10px] p-[20px]">
                    <div className="w-1/2 flex flex-col gap-[10px]">
                        <h3 className="font-bold text-xl">Exercise Info</h3> 
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
                        </fieldset>
                        <div>
                            <Fields key='fields-create-field' addField={addField} />
                            <div>
                                {fields?.length > 0 ? fields.map((field, index)=>(
                                        <div id={'field-'+index} key={field.name}>
                                            <h4>{field.name}</h4>
                                            <p>{field.target || null}</p>
                                            <p>{field.unit}</p>
                                            <button type="button" onClick={()=>setFields((fields)=>[...fields.filter(item=>item==field)])}><img className=" w-[20px] h-[20px]" src={IconLibrary.No}  alt=""></img></button>
                                        </div>
                                )): <h3>No fields created</h3>}
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2 flex flex-col gap-[20px]">
                        <div>
                            {/* <CreateTag addTag={addTag} author={"system"} allTags={exerciseTags} /> */}
                            
                            <div>
                                {exerciseTags?.length > 0 ? exerciseTags.map((item)=><div key={item.name+item.color}><div style={{backgroundColor: item.color}}></div><p>{item.name}</p><img className=" w-[20px] h-[20px]" src={IconLibrary.No} onClick={()=>setExerciseTags((exerciseTags)=>[...exerciseTags.filter(it=>it.id!==item.id)]) }/></div>) : ''}
                            </div>
                        </div>
                        <div>
                            <div>
                                <button type="button" onClick={()=>setShowGroups(true)}><img className=" w-[20px] h-[20px]" src={IconLibrary.Search} alt=""/></button>
                                <input type='text' name="groupName" onChange={(e)=>setGroupName(e.target.value)} value={groupName} placeholder="Muscle Name" />
                                <button type="button" onClick={handleAddGroup}><img className=" w-[20px] h-[20px]"  src={IconLibrary.Add} alt="" /></button>
                            </div>  
                            {/* {showGroups ? <TargetGroupPicker closeModal={()=>setShowGroups(false)} currentItems={muscleGroups} addItem={addmuscleGroups} /> : null} */}
                            <div>
                                {muscleGroups?.length > 0 ? muscleGroups.map((item, index)=><div key={item.name+index} ><div></div><p>{item.name}</p><img className=" w-[20px] h-[20px]" src={IconLibrary.No} onClick={()=>setMuscleGroups((muscleGroups)=>[...muscleGroups.filter(it=>it.id!==item.id)]) }/></div>) : ''}
                            </div>
                        </div> 
                        <div >
                            {/* <CreateEquipment addEquipment={addEquipment} allItems={equipments} /> */}
                            <div >
                                {equipments?.length > 0 ? equipments.map((item,index)=><div key={item.name+index} >
                                    <p>{item.name}</p>
                                    <div>{item.attributes && item.attributes.length > 0 ? item.attributes.map((item, index)=>(<p key={'attribute-'+index}>{item.value} {item.unit}</p>)): null}</div>
                                    <img className=" w-[20px] h-[20px]" src={IconLibrary.No} onClick={()=>setEquipments((equipments)=>[...equipments.filter(it=>it.id!==item.id)]) }/>
                                </div>) : ''}
                            </div>
                        </div>

                    </div>    
                </form>
        </div>
     );
}
 
export default NewExercise;