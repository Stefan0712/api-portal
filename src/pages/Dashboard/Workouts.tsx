import React, { useState } from "react";
import axios from "../../axios";
import { Workout } from "../../types/interfaces";

const Workouts = () => {

    const [workouts, setWorkouts] = useState<Workout | null>(null);
    const [type, setType] = useState<string>('created');

    const fetchExercises = () =>{
        console.log("Fetched")
    }

    return ( 
        <div className="w-full h-full secondary-color">
            <h1>Workouts</h1>
        </div>
     );
}
 
export default Workouts;