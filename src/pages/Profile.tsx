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
            <div className="w-full h-full primary-color rounded">
                <p>Name: {userData.name || "Not set"}</p>
                <p>Username: {userData.username || "Not set"}</p>
                <p>Email: {userData.email || "Not set"}</p>
                <p>Created At: {userData.createdAt || "Not set"}</p>
                <p>Friends: {userData.friends.length || 0}</p>
                <p>Followers: {userData.followers.length || 0}</p>
                <p>Following: {userData.following.length || 0}</p>
                <p>Posts: {userData.posts.length || 0}</p>
                <p>Saved Posts: {userData.savedPosts.length || 0}</p>
                <p>Age: {userData.age || "Not set"}</p>
                <p>Height: {userData.height || "Not set"}</p>
                <p>Weight: {userData.weight || "Not set"}</p>
                <p>Bio: {userData.bio || "Not set"}</p>
                <p>Gender: {userData.gender || "Not set"}</p>
                <p>Role: {userData.role || "Not set"}</p>
                <p>Saved Exercises: {userData.savedExercises.length || 0}</p>
                <p>Saved Workouts: {userData.savedWorkouts.length || 0}</p>
                <p>Created Exercises: {userData.createdExercises.length || 0}</p>
                <p>Created Workouts: {userData.createdWorkouts.length || 0}</p>
                <p>Favorite Exercises: {userData.favoriteExercises.length || 0}</p>
                <p>Favorite Workouts: {userData.favoriteWorkouts.length || 0}</p>
                <p>Likes: {userData.likes.length || 0}</p>
                <p>Comments: {userData.comments.length || 0}</p>
            </div>
            }
        </div>
    );
}
 
export default Profile;