import { useState } from "react";
import { Day, Tag } from "../../types/interfaces";
import Details from "./Details";
import ExerciseList from "./ExerciseList";
import WorkoutList from "./WorkoutList";


interface IDays {
    mon: Day;
    tue: Day;
    wed: Day;
    thu: Day;
    fri: Day;
    sat: Day;
    sun: Day;
}
const defaultDays = {
    mon: {exercises: [], goals: []}, 
    tue: {exercises: [], goals: []}, 
    wed: {exercises: [], goals: []}, 
    thu: {exercises: [], goals: []}, 
    fri: {exercises: [], goals: []}, 
    sat: {exercises: [], goals: []}, 
    sun: {exercises: [], goals: []}
}


const Activity = () => {

    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [difficulty, setDifficulty] = useState<string>('');
    const [visibility, setVisibility] = useState<string>('');
    const [tags, setTags] = useState<Tag[]>([]);
    const [days, setDays] = useState<IDays>(defaultDays);

    const [sideMenu, setSideMenu] = useState<'details' | 'workouts' | 'exercises'>('details');




    

    return ( 
        <div className="w-full h-full flex gap-2">
            <div className="w-3/4 h-full grid grid-rows-[1fr_1fr] grid-cols-[1fr_1fr_1fr_1fr] gap-[10px]">
                
                <div className="w-full h-full primary-color rounded">
                    <div className="w-full h-[40px] flex items-center justify-center text-xl font-bold">Monday</div>
                </div>
                <div className="w-full h-full primary-color rounded">
                    <div className="w-full h-[40px] flex items-center justify-center text-xl font-bold">Tuesday</div>
                </div>
                <div className="w-full h-full primary-color rounded">
                    <div className="w-full h-[40px] flex items-center justify-center text-xl font-bold">Wednesday</div>
                </div>
                <div className="w-full h-full primary-color rounded">
                    <div className="w-full h-[40px] flex items-center justify-center text-xl font-bold">Thursday</div>
                </div>
                <div className="w-full h-full primary-color rounded">
                    <div className="w-full h-[40px] flex items-center justify-center text-xl font-bold">Friday</div>
                </div>
                <div className="w-full h-full primary-color rounded">
                    <div className="w-full h-[40px] flex items-center justify-center text-xl font-bold">Saturday</div>
                </div>
                <div className="w-full h-full primary-color rounded">
                    <div className="w-full h-[40px] flex items-center justify-center text-xl font-bold">Sunday</div>
                </div>
                <div className="w-full h-full flex flex-col gap-1 primary-color rounded">
                    <div className="w-full h-[40px] flex items-center justify-center text-xl font-bold">Summaries</div>
                </div>
            </div>
            <div className="w-1/4 primary-color rounded h-full">
                <div className="w-full h-[60px] flex items-center px-[10px]">
                    <button className={`h-[40px] w-1/3 rounded ${sideMenu === 'details' ? 'secondary-color' : ''}`} onClick={()=>setSideMenu('details')}>Plan details</button>
                    <button className={`h-[40px] w-1/3 rounded ${sideMenu === 'workouts' ? 'secondary-color' : ''}`} onClick={()=>setSideMenu('workouts')}>Workouts</button>
                    <button className={`h-[40px] w-1/3 rounded ${sideMenu === 'exercises' ? 'secondary-color' : ''}`} onClick={()=>setSideMenu('exercises')}>Exercises</button>
                </div>
                <div>
                    {sideMenu === 'details' ? <Details name={name} setName={setName} description={description} setDescription={setDescription} difficulty={difficulty} setDifficulty={setDifficulty} visibility={visibility} setVisibility={setVisibility} tags={tags} setTags={setTags}  /> 
                    : sideMenu === 'exercises' ? <ExerciseList /> 
                    : sideMenu === 'workouts' ? <WorkoutList /> 
                    : <Details name={name} setName={setName} description={description} setDescription={setDescription} difficulty={difficulty} setDifficulty={setDifficulty} visibility={visibility} setVisibility={setVisibility} tags={tags} setTags={setTags}  />}
                </div>
            </div>
        </div>
     );
}
 
export default Activity;