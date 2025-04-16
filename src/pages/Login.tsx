import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<string[]>([]);




    const handleSubmit = () =>{
        setErrors([]);
        if(!username || username.length === 0){
            setErrors(prevState=> [...prevState, "Username cannot be empty!"])
        }
        if(!password || password.length === 0){
            setErrors(prevState=> [...prevState, "Password cannot be empty!"])
        }
        if(password && password.length>0 && username && username.length > 0){
            handleLogin();
        }
    }

    const handleLogin = async () =>{
        try{
            const loginData = {username, password};
            console.log(loginData)
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, loginData)
            console.log("Logged in successfuly!", response);
            navigate('/profile');
        } catch (error){
            console.log("Error logging in: ",error);
            setErrors(prevState=> [...prevState, "Something went wrong! Check console!"])
        }

    }



    return ( 
        <div className="login w-full h-full flex items-center justify-center">
            <form className="w-[350px] secondary-color rounded flex flex-col gap-3 px-[10px] py-[30px] items-center" onSubmit={(e) => e.preventDefault()}>
                <h1 className="font-bold text-center text-2xl">Login</h1>
                {errors && errors.length > 0 ? <div className="w-full p-[10px] flex flex-col gap-2 error-background rounded">{errors.map((item,index)=><p key={index}>{item}</p>)}</div> : null}
                <fieldset className="flex flex-col gap-1 w-full">
                    <label>Username</label>
                    <input className="w-full h-[40px] rounded primary-color" type="text" name="username" id="username" onChange={(e)=>setUsername(e.target.value)} value={username} required></input>
                </fieldset>
                <fieldset className="flex flex-col gap-1  w-full">
                    <label>Password</label>
                    <input className="w-full h-[40px] rounded primary-color" type="password" name="password" id="password" onChange={(e)=>setPassword(e.target.value)} value={password} required></input>
                </fieldset>
                <a href="#">Forgot Password</a>
                <button className="accent-background w-[150px] h-[40px] rounded" type="button" onClick={handleSubmit}>Login</button>
                <Link to={'/register'}>Register</Link>
            </form>
        </div>
     );
}
 
export default Login;