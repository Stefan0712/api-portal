import React, { useEffect, useState } from "react";
import axios from "axios";
import { IUser } from "../types/interfaces";
import { isLoggedIn } from "../utils/auth";
import ErrorLoginPage from "./common/LoginErrorPage";
import { formatDateToPretty } from "../utils/dateFormat";


const Profile = () => {

    const [userData, setUserData] = useState<IUser | null>( null);

    const isUserLoggedIn = isLoggedIn();

    const getData = async () =>{
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/private`, {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}});
            console.log(response.data.user);
            setUserData(response.data.user);
        }catch(error){
            console.error('Failed to get profile data', error)
        }
    }

    useEffect(()=>{if(isUserLoggedIn){getData()}},[]);


    if(!isUserLoggedIn){
        return (<ErrorLoginPage />);
    }else if(!userData){
        return (<div className="w-full h-full primary-color rounded">
            <p>
                Loading data
            </p>
        </div> );
    }else if(!userData){return (<h1>Loading Data...</h1>)}else{
        return ( 
            <div className="profile flex flex-col items-center justify-center p-[40px] w-full h-full">
                <div className="primary-color rounded flex items-center p-[30px] gap-[20px]">
                    <div className="flex flex-col gap-[10px] p-[10px] rounded">
                            <div className="flex flex-col gap-1">
                                <p className="text-white opacity-50">Username</p>
                                <p>{userData.username || "Not set"}</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-white opacity-50">Name</p>
                                <p>{userData.name || "Not set"}</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-white opacity-50">Bio</p>
                                <p>{userData.bio || "Not set"}</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-white opacity-50">Created At</p>
                                <p>{formatDateToPretty(userData.createdAt) || "Not set"}</p>
                            </div>
                <div className="primary-color rounded flex items-center p-[30px] gap-[20px]">
                    <div className="flex flex-col gap-[10px] p-[10px] rounded">
                            <div className="flex flex-col gap-1">
                                <p className="text-white opacity-50">Username</p>
                                <p>{userData.username || "Not set"}</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-white opacity-50">Name</p>
                                <p>{userData.name || "Not set"}</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-white opacity-50">Bio</p>
                                <p>{userData.bio || "Not set"}</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-white opacity-50">Created At</p>
                                <p>{formatDateToPretty(userData.createdAt) || "Not set"}</p>
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
                        <div className="flex gap-3">
                            <div className="flex flex-col gap-1">
                                <p className="text-white opacity-50">Role</p>
                                <p>{userData.role || "Not set"}</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-white opacity-50">Age</p>
                                <p>{userData.age || "Not set"}</p>
                            </div>  
                        </div>    
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="flex flex-col gap-1">
                                <p className="text-white opacity-50">Role</p>
                                <p>{userData.role || "Not set"}</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-white opacity-50">Age</p>
                                <p>{userData.age || "Not set"}</p>
                            </div>  
                        </div>    
                    </div>
                    <div className="flex flex-col gap-[10px] p-[10px] rounded">
                    <div className="flex flex-col gap-[10px] p-[10px] rounded">
                        <h1>Activity</h1>
                        <div className="flex gap-[20px]">
                            <div className="flex flex-col gap-1">
                                <p className="text-white opacity-50">Posts</p>
                                <p>{userData.posts.length || 0}</p>
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
                    </div>
                    <div>
                        <h1>Dashboard</h1>
                        <div>
                            <h1>Favorites</h1>
                            <button>Workouts ({userData.favoriteWorkouts.length})</button>
                            <button>Exercises ({userData.favoriteExercises.length})</button>
                        </div>
                        <div>
                            <h1>Saved</h1>
                            <button>Workouts ({userData.savedWorkouts.length})</button>
                            <button>Exercises ({userData.savedExercises.length})</button>
                        </div>
                        <div>
                            <h1>Created</h1>
                            <button>Workouts ({userData.createdWorkouts.length})</button>
                            <button>Exercises ({userData.createdExercises.length})</button>
                        </div>
                    </div>
                </div>
            </div>
            


        );
    }
}
 
export default Profile;