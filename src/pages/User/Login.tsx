import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMessage } from "../../context/MessageContext";

const Login = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {showMessage} = useMessage();



    const handleSubmit = () =>{
        if(!username || username.length === 0){
            showMessage('Username cannot be empty','error');

        }
        if(!password || password.length === 0){
            showMessage('Password cannot be empty','error');
        }
        if(password && password.length>0 && username && username.length > 0){
            handleLogin();
        }
    }

const handleLogin = async () =>{
        try{
            const loginData = {username, password};
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, loginData,{ withCredentials: true })
            const user = response.data.user;
            if (user?.id && user?.username && user?.role) {
                localStorage.setItem("userId", user.id);
                localStorage.setItem("username", user.username);
                localStorage.setItem("role", user.role);
                localStorage.setItem("token", response.data.token)
              
                // Double-check if they were saved correctly
                const savedId = localStorage.getItem("userId");
                const savedUsername = localStorage.getItem("username");
                const savedRole = localStorage.getItem("role");
              
                if (savedId && savedUsername && savedRole) {
                    showMessage('Logged in successfuly','success');
                    navigate("/profile");
                } else {
                    showMessage('Something went wrong!','error');
                }
              } else {
                showMessage('Something went wrong!','error');
              }
        } catch (error){
            console.log("Error logging in: ",error);
            if (axios.isAxiosError(error)) {
                if (error.response?.data?.error === "Invalid username or password.") {
                  showMessage("Incorrect username or password", "error");
                } else {
                  showMessage("Something went wrong!", "error");
                }
            } else {
                showMessage("Unexpected error occurred!", "error");
            }
            
        }

    }



    return ( 
        <div className="login w-full h-full flex items-center justify-center">
            <form className="w-[350px] secondary-color rounded flex flex-col gap-3 px-[10px] py-[30px] items-center" onSubmit={(e) => e.preventDefault()}>
                <h1 className="font-bold text-center text-2xl">Login</h1>
                <fieldset className="flex flex-col gap-1 w-full">
                    <label>Username</label>
                    <input className="w-full h-[40px] rounded primary-color pl-3" type="text" name="username" id="username" onChange={(e)=>setUsername(e.target.value)} value={username} required></input>
                </fieldset>
                <fieldset className="flex flex-col gap-1  w-full">
                    <label>Password</label>
                    <input className="w-full h-[40px] rounded primary-color pl-3" type="password" name="password" id="password" onChange={(e)=>setPassword(e.target.value)} value={password} required></input>
                </fieldset>
                <a href="#">Forgot Password</a>
                <button className="accent-background w-[150px] h-[40px] rounded" type="button" onClick={handleSubmit}>Login</button>
                <Link to={'/register'}>Register</Link>
            </form>
        </div>
     );
}
 
export default Login;