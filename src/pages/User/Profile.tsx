import React, { useEffect, useState } from "react";
import axios from "axios";
import { IUser } from "../../types/interfaces";
import { isLoggedIn } from "../../utils/auth";
import ErrorLoginPage from "../common/LoginErrorPage";
import { formatDateToPretty } from "../../utils/dateFormat";
import { IconLibrary } from "../../IconLibrary";
import { Link } from "react-router-dom";


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
    }else{
        return ( 
            <div className="profile flex flex-col items-center justify-center p-[40px] w-full h-full">
            <div className="primary-color rounded flex items-center gap-[20px] relative">
              <Link className="absolute left-[10px] top-[10px]" to={'/edit-profile'}><img className="w-[25px] h-[25px]" src={IconLibrary.Edit} alt="" /></Link>
              <div className="flex flex-col gap-2 w-[250px] menu-color px-[10px] py-[15px] items-center">
                <img className="w-[100px] h-[100px]" src={IconLibrary.Profile} alt="" />
                <div className="flex flex-col gap-1 w-full">
                  <p className="text-white opacity-50">Username</p>
                  <p>{userData.username || "Not set"}</p>
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <p className="text-white opacity-50">Name</p>
                  <p>{userData.name || "Not set"}</p>
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <p className="text-white opacity-50">Bio</p>
                  <p>{userData.bio || "Not set"}</p>
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <p className="text-white opacity-50">Age</p>
                  <p>{userData.age || "Not set"}</p>
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <p className="text-white opacity-50">Created At</p>
                  <p>{formatDateToPretty(userData.createdAt) || "Not set"}</p>
                </div>
              </div>
              <div className="flex flex-col gap-[10px] p-[10px] h-full justify-center rounded ">
                
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
                <div className="flex gap-2">
                  <div className="flex flex-col gap-1">
                    <p className="text-white opacity-50">Workouts</p>
                    <p>{userData.createdWorkouts.length+userData.savedWorkouts.length || 0}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-white opacity-50">Exercises</p>
                    <p>{userData.createdExercises.length+userData.savedExercises.length || 0}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-white opacity-50">Activity Level</p>
                    <p>Medium</p>
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
                    <p className="text-white opacity-50">Posts</p>
                    <p>{userData.height || "Not set"}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-white opacity-50">Guides</p>
                    <p>{userData.weight || "Not set"}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-white opacity-50">Last online</p>
                    <p>Today</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex flex-col gap-1">
                    <p className="text-white opacity-50">Role</p>
                    <p>{userData.role || "Not set"}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-white opacity-50">Username</p>
                    <p>{userData.username || "Not set"}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-white opacity-50">Email</p>
                    <p>{userData.email || "Not set"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        );
    }
}
 
export default Profile;