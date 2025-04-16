import React, { useEffect, useState } from "react";
import axios from "axios";
import { getUserData } from "../utils/auth";
import { IUser } from "../types/interfaces";


const Profile = () => {

    const [userData, setUserData] = useState<IUser | null>( null)

    const getData = async () =>{
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/private`, {withCredentials: true});
            console.log(response.data.user);
            setUserData(response.data.user);
        }catch(error){
            console.error('Failed to get profile data', error)
        }
    }

    useEffect(()=>{getData()},[])
    return ( 
        <div className="profile flex flex-col items-center justify-center p-[40px] w-full h-full">
            <div className="h-[50px] w-full"><h1>Profile</h1></div>
            {!userData ? <div className="w-full h-full primary-color rounded">
                <p>
                    Loading data
                </p>
            </div> : 
            <div className="w-full h-full primary-color rounded flex items-center p-[30px]">
                <div className="flex flex-col gap-[10px]">
                    <h2>Public Info</h2>
                    <div className="flex flex-col gap-1">
                        <p className="text-white opacity-50">Name</p>
                        <p>{userData.name || "Not set"}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-white opacity-50">Bio</p>
                        <p>{userData.bio || "Not set"}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-white opacity-50">Username</p>
                        <p>{userData.username || "Not set"}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-white opacity-50">Created At</p>
                        <p>{userData.createdAt || "Not set"}</p>
                    </div>
                    <div className="flex gap-2">
                        <div className="flex flex-col gap-1">
                            <p className="text-white opacity-50">Friends</p>
                            <p>{userData.friends.length || 0}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-white opacity-50">Followers</p>
                            <p>{userData.followers.length || 0}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-white opacity-50">Following</p>
                            <p>{userData.following.length || 0}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <h1>Personal Info</h1>
                    <div className="flex gap-3">
                        <div className="flex flex-col gap-1">
                            <p className="text-white opacity-50">Email</p>
                            <p>{userData.email || "Not set"}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-white opacity-50">Role</p>
                            <p>{userData.role || "Not set"}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-white opacity-50">Age</p>
                            <p>{userData.age || "Not set"}</p>
                        </div>  
                    </div>              
                    <div className="flex gap-3">
                        <div className="flex flex-col gap-1">
                            <p className="text-white opacity-50">Height</p>
                            <p>{userData.height || "Not set"}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-white opacity-50">Weight</p>
                            <p>{userData.weight || "Not set"}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-white opacity-50">Gender</p>
                            <p>{userData.gender || "Not set"}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h1>Activity</h1>
                    <div className="flex gap-[20px]">
                        <div className="flex flex-col gap-1">
                            <p className="text-white opacity-50">Posts</p>
                            <p>{userData.posts.length || 0}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-white opacity-50">Saved Posts</p>
                            <p>{userData.savedPosts.length || 0}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-white opacity-50">Likes</p>
                            <p>{userData.likes.length || 0}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-white opacity-50">Comments</p>
                            <p>{userData.comments.length || 0}</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <div className="flex flex-col gap-1">
                            <p className="text-white opacity-50">Created Workouts</p>
                            <p>{userData.createdWorkouts.length || 0}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-white opacity-50">Saved Workouts</p>
                            <p>{userData.savedWorkouts.length || 0}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-white opacity-50">Favorite Workouts</p>
                            <p>{userData.favoriteWorkouts.length || 0}</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <div className="flex flex-col gap-1">
                            <p className="text-white opacity-50">Saved Exercises</p>
                            <p>{userData.savedExercises.length || 0}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-white opacity-50">Created Exercises</p>
                            <p>{userData.createdExercises.length || 0}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-white opacity-50">Favorite Exercises</p>
                            <p>{userData.favoriteExercises.length || 0}</p>
                        </div>
                </div>
            </div>
        </div>
        
    }
    </div>
    );
}
 
export default Profile;