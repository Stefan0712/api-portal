import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { useMessage } from "../../context/MessageContext";

interface ProfileData {
    name?: string,
    username?: string,
    _id?: string,
    email?: string,
    age?: number,
    gender?: string,
    height?: number,
    weight?: number,
    bio?: string,
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

    const {showMessage} = useMessage();
    const [userData, setUserData] = useState<ProfileData | null>(null);
    const navigate = useNavigate();

    const [username, setUsername] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [bio, setBio] = useState<string>("");
    const [age, setAge] = useState<number>(0);
    const [gender, setGender] = useState<string>("");
    const [height, setHeight] = useState<number>(0);
    const [weight, setWeight] = useState<number>(0);
    const [showMyWorkouts, setShowMyWorkouts] = useState<string>("private");
    const [showMyExercises, setShowMyExercises] = useState<string>("private");
    const [showProfile, setShowProfile] = useState<string>("private");
    const [showMyActivity, setShowMyActivity] = useState<string>("private");
    const [showMyDetails, setShowMyDetails] = useState<string>("private");
    const [showMyPosts, setShowMyPosts] = useState<string>("private");
    const [showMyPlans, setShowMyPlans] = useState<string>("private");
    const [email, setEmail] = useState<string>('');

    


    const handleSaveProfile = () =>{
       if(userData){
         const profileData: ProfileData = {
            username, 
            name, 
            bio, 
            age,
            gender, 
            height, 
            weight,
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
        console.log(profileData)
        handleUpdateProfile(profileData);
        
       }
    }

    const handleUpdateProfile = async (profileData: ProfileData) =>{
        try{
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/user/update-user`, profileData, {withCredentials: true});
            if(response.status === 200){
                showMessage("Profile updated successfully", "success");
                navigate('/my-profile');
            }
        }catch(error){
            console.error(error)
            showMessage("There was a server error", "error");
        }
    }
    const getProfileData = async () =>{
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/update-user`, {withCredentials: true});
            if(response.status === 200){
                setUserData(response.data.user);
                populateData(response.data.user);
            }
        }catch(error){
            console.error(error)
            showMessage("There was a server error", "error");
        }
    }
    useEffect(()=>{getProfileData()},[]);

    const populateData = (data: ProfileData) =>{
        setUsername(data.username || '');
        setName(data.name || '');
        setBio(data.bio || '');
        setAge(data.age || 0);
        setGender(data.gender || '');
        setHeight(data.height || 0);
        setWeight(data.weight || 0);
        setEmail(data.email || '');

       if(data.profileSettings){
            setShowMyWorkouts(data.profileSettings.showMyWorkouts);
            setShowMyExercises(data.profileSettings.showMyExercises);
            setShowProfile(data.profileSettings.showProfile);
            setShowMyActivity(data.profileSettings.showMyActivity);
            setShowMyDetails(data.profileSettings.showMyDetails);
            setShowMyPosts(data.profileSettings.showMyPosts);
            setShowMyPlans(data.profileSettings.showMyPlans);
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
                        <input className={inputStyles} type="number" name="age" id="age" value={age} onChange={(e) => setAge(parseInt(e.target.value))} />
                    </fieldset>
                    <fieldset  className={fieldsetStyles}>
                        <label className={labelStyles}>Gender</label>
                        <input className={inputStyles} type="text" name="gender" id="gender" value={gender} onChange={(e) => setGender(e.target.value)} />
                    </fieldset>
                    <fieldset  className={fieldsetStyles}>
                        <label className={labelStyles}>Height (cm)</label>
                        <input className={inputStyles} type="number" name="height" id="height" value={height} onChange={(e) => setHeight(parseInt(e.target.value))} />
                    </fieldset>
                    <fieldset  className={fieldsetStyles}>
                        <label className={labelStyles}>Weight (kg)</label>
                        <input className={inputStyles} type="number" name="weight" id="weight" value={weight} onChange={(e) => setWeight(parseInt(e.target.value))} />
                    </fieldset>
                </div>
                <div className="w-1/2 h-full flex flex-col gap-2">
                    <h2>Privacy Settings</h2>
                    <fieldset  className={fieldsetStyles}>
                        <label className={labelStyles}>Workouts</label>
                        <select className={inputStyles} name="showMyWorkouts" id="showMyWorkouts" value={showMyWorkouts} onChange={(e) => setShowMyWorkouts(e.target.value)}>
                            <option value={"private"}>Private</option>
                            <option value={"friends"}>Friends Only</option>
                            <option value={"public"}>Public</option>
                        </select>
                    </fieldset>
                    <fieldset  className={fieldsetStyles}>
                        <label className={labelStyles}>Profile</label>
                        <select className={inputStyles} name="showProfile" id="showProfile" value={showProfile} onChange={(e) => setShowProfile(e.target.value)}>
                            <option value={"private"}>Private</option>
                            <option value={"friends"}>Friends Only</option>
                            <option value={"public"}>Public</option>
                        </select>
                    </fieldset>
                    <fieldset  className={fieldsetStyles}>
                        <label className={labelStyles}>Exercises</label>
                        <select className={inputStyles} name="showMyExercises" id="showMyExercises" value={showMyExercises} onChange={(e) => setShowMyExercises(e.target.value )}>
                            <option value={"private"}>Private</option>
                            <option value={"friends"}>Friends Only</option>
                            <option value={"public"}>Public</option>
                        </select>
                    </fieldset>
                    <fieldset  className={fieldsetStyles}>
                        <label className={labelStyles}>My Activity</label>
                        <select className={inputStyles} name="showMyActivity" id="showMyActivity" value={showMyActivity} onChange={(e) => setShowMyActivity(e.target.value)}>
                            <option value={"private"}>Private</option>
                            <option value={"friends"}>Friends Only</option>
                            <option value={"public"}>Public</option>
                        </select>
                    </fieldset>
                    <fieldset  className={fieldsetStyles}>
                        <label className={labelStyles}>Personal details</label>
                        <select className={inputStyles} name="showMyDetails" id="showMyDetails" value={showMyDetails} onChange={(e) => setShowMyDetails(e.target.value)}>
                            <option value={"private"}>Private</option>
                            <option value={"friends"}>Friends Only</option>
                            <option value={"public"}>Public</option>
                        </select>
                    </fieldset>
                    <fieldset  className={fieldsetStyles}>
                        <label className={labelStyles}>My Plans</label>
                        <select className={inputStyles} name="showMyPlans" id="showMyPlans" value={showMyPlans} onChange={(e) => setShowMyPlans(e.target.value)}>
                            <option value={"private"}>Private</option>
                            <option value={"friends"}>Friends Only</option>
                            <option value={"public"}>Public</option>
                        </select>
                    </fieldset>
                    <fieldset  className={fieldsetStyles}>
                        <label className={labelStyles}>My Posts</label>
                        <select className={inputStyles} name="showMyPosts" id="showMyPosts" value={showMyPosts} onChange={(e) => setShowMyPosts(e.target.value)}>
                            <option value={"private"}>Private</option>
                            <option value={"friends"}>Friends Only</option>
                            <option value={"public"}>Public</option>
                        </select>
                    </fieldset>
                    <button className="accent-background h-[40px] mt-[30px] w-full rounded" onClick={handleSaveProfile}>Update profile</button>
                </div>
            </form>
        </div>
     );
}
 
export default EditProfile;