import { useNavigate } from "react-router-dom";
import { useState } from "react";
import React from "react";
import { IUser } from "../../types/interfaces";


interface Badges {
    id: string,
    name: string,
    value: number
}

interface ProfileData {
    name?: string,
    username?: string,
    _id: string,
    email?: string,
    age?: number,
    gender?: string,
    height?: number,
    weight?: number,
    bio?: string,
    isPrivate: boolean,
    profileSettings: {
      showMyWorkouts: string,
      showMyExercises: string,
      showProfile: string
      showMyActivity: string,
      showMyDetails: string,
      showMyPosts: string,
      showMyPlans: string,
    }
}
const EditProfile = () => {

    const navigate = useNavigate();
    const [username, setUsername] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [bio, setBio] = useState<string>("");
    const [age, setAge] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [height, setHeight] = useState<string>("");
    const [weight, setWeight] = useState<string>("");
    const [showMyWorkouts, setShowMyWorkouts] = useState<string>("false");
    const [showMyExercises, setShowMyExercises] = useState<string>("false");
    const [showProfile, setShowProfile] = useState<string>("false");
    const [showMyActivity, setShowMyActivity] = useState<string>("false");
    const [showMyDetails, setShowMyDetails] = useState<string>("false");
    const [showMyPosts, setShowMyPosts] = useState<string>("false");
    const [showMyPlans, setShowMyPlans] = useState<string>("false");
    const [email, setEmail] = useState<string>('');

    const [userData, setUserData] = useState<IUser | null>(null);


    const handleSaveProfile = () =>{
       if(userData){
         const profileData: ProfileData = {
            username, 
            name, 
            bio, 
            age: typeof age === 'string' ? parseInt(age) : age,
            gender, 
            height: typeof height === 'string' ? parseInt(height) : height, 
            weight: typeof weight === 'string' ? parseInt(weight) : weight,
            profileSettings:{
                showMyWorkouts,
                showProfile,
                showMyExercises,
                showMyActivity,
                showMyDetails,
                showMyPlans,
                showMyPosts
            }
        };
        //navigate('/my-profile');
       }
    }
    const fieldsetStyles = 'w-full flex flex-col gap-2 h-[75px]';
    const inputStyles = 'w-full h-[40px] rounded secondary-color pl-2';
    const labelStyles = 'text-white text-opacity-50'
    return ( 
        <div className="w-full h-full flex items-center justify-center">
            <form onSubmit={(e)=>e.preventDefault()} className="flex gap-2 w-1/2">
                <div className="w-1/2 h-full flex flex-col gap-2">
                    <h2>Profile details</h2>
                    <fieldset className={fieldsetStyles}>
                        <label className={labelStyles}>Name</label>
                        <input className={inputStyles} type="text" name="name"  id="name"  value={name} onChange={(e) => setName(e.target.value)} ></input>
                    </fieldset>
                    <fieldset className={fieldsetStyles}>
                        <label className={labelStyles}>Username</label>
                        <input className={inputStyles} type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)}
                        />
                    </fieldset>
                    <fieldset className={fieldsetStyles}>
                        <label className={labelStyles}>Bio</label>
                        <input className={inputStyles} type="text" name="bio" id="bio" value={bio} onChange={(e) => setBio(e.target.value)} />
                    </fieldset>
                    <fieldset  className={fieldsetStyles}>
                        <label className={labelStyles}>Email</label>
                        <input className={inputStyles} type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </fieldset>
                    <fieldset  className={fieldsetStyles}>
                        <label className={labelStyles}>Age</label>
                        <input className={inputStyles} type="number" name="age" id="age" value={age} onChange={(e) => setAge(e.target.value)} />
                    </fieldset>
                    <fieldset  className={fieldsetStyles}>
                        <label className={labelStyles}>Gender</label>
                        <input className={inputStyles} type="text" name="gender" id="gender" value={gender} onChange={(e) => setGender(e.target.value)} />
                    </fieldset>
                    <fieldset  className={fieldsetStyles}>
                        <label className={labelStyles}>Height (cm)</label>
                        <input className={inputStyles} type="number" name="height" id="height" value={height} onChange={(e) => setHeight(e.target.value)} />
                    </fieldset>
                    <fieldset  className={fieldsetStyles}>
                        <label className={labelStyles}>Weight (kg)</label>
                        <input className={inputStyles} type="number" name="weight" id="weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
                    </fieldset>
                </div>
                <div className="w-1/2 h-full flex flex-col gap-2">
                    <h2>Privacy Settings</h2>
                    <fieldset  className={fieldsetStyles}>
                        <label className={labelStyles}>Workouts</label>
                        <select className={inputStyles} name="showMyWorkouts" id="showMyWorkouts" value={showMyWorkouts} onChange={(e) => setShowMyWorkouts(e.target.value)}>
                            <option value={"false"}>Hide</option>
                            <option value={"true"}>Show</option>
                        </select>
                    </fieldset>
                    <fieldset  className={fieldsetStyles}>
                        <label className={labelStyles}>Profile</label>
                        <select className={inputStyles} name="showProfile" id="showProfile" value={showProfile} onChange={(e) => setShowProfile(e.target.value)}>
                            <option value={"false"}>Hide</option>
                            <option value={"true"}>Show</option>
                        </select>
                    </fieldset>
                    <fieldset  className={fieldsetStyles}>
                        <label className={labelStyles}>Exercises</label>
                        <select className={inputStyles} name="showMyExercises" id="showMyExercises" value={showMyExercises} onChange={(e) => setShowMyExercises(e.target.value )}>
                            <option value={"false"}>Hide</option>
                            <option value={"true"}>Show</option>
                        </select>
                    </fieldset>
                    <fieldset  className={fieldsetStyles}>
                        <label className={labelStyles}>My Activity</label>
                        <select className={inputStyles} name="showMyActivity" id="showMyActivity" value={showMyActivity} onChange={(e) => setShowMyActivity(e.target.value)}>
                            <option value={"false"}>Private</option>
                            <option value={"true"}>Public</option>
                        </select>
                    </fieldset>
                    <fieldset  className={fieldsetStyles}>
                        <label className={labelStyles}>Personal details</label>
                        <select className={inputStyles} name="showMyDetails" id="showMyDetails" value={showMyDetails} onChange={(e) => setShowMyDetails(e.target.value)}>
                            <option value={"false"}>Private</option>
                            <option value={"true"}>Public</option>
                        </select>
                    </fieldset>
                    <fieldset  className={fieldsetStyles}>
                        <label className={labelStyles}>My Plans</label>
                        <select className={inputStyles} name="showMyPlans" id="showMyPlans" value={showMyPlans} onChange={(e) => setShowMyPlans(e.target.value)}>
                            <option value={"false"}>Private</option>
                            <option value={"true"}>Public</option>
                        </select>
                    </fieldset>
                    <fieldset  className={fieldsetStyles}>
                        <label className={labelStyles}>My Posts</label>
                        <select className={inputStyles} name="showMyPosts" id="showMyPosts" value={showMyPosts} onChange={(e) => setShowMyPosts(e.target.value)}>
                            <option value={"false"}>Private</option>
                            <option value={"true"}>Public</option>
                        </select>
                    </fieldset>
                    <button className="accent-background h-[40px] mt-[30px] w-full rounded">Update profile</button>
                </div>
            </form>
        </div>
     );
}
 
export default EditProfile;