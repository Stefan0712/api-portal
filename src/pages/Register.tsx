import React from "react";
import { useState } from "react";
import { IconLibrary } from "../IconLibrary";
import axios from "../axios";
import { Link, useNavigate } from "react-router-dom";

interface IUserData {
    username: string;
    email: string;
    password: string;
}

const Register = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [usernameErrors, setUsernameErrors] = useState<string[]>([]);
    const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
    const [isEmailValid, setIsEmailValid] = useState<boolean>(false);

    const validateUsername = (username: string): string[] => {
        const errors: string[] = [];
        if (username.length < 3 || username.length > 20) {errors.push("length")}
        if (!/^[a-zA-Z0-9_]+$/.test(username)) {errors.push("characters")}
        if (/\s/.test(username)) {errors.push("spaces")}
        return errors;
    }
    const validatePassword = (password: string): string[] => {
        const errors: string[] = [];
        if (password.length < 8 || password.length > 30) {errors.push("length")}
        if (!/[A-Z]/.test(password)) {errors.push("uppercase")}
        if (!/[a-z]/.test(password)) {errors.push("lowercase")}
        if (!/[0-9]/.test(password)) {errors.push("number")}
        return errors;
    }
      





    const handleChangeUsername = (value: string) =>{
        setUsername(value);
        setUsernameErrors(validateUsername(value));
    }
    const checkEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleChangeEmail = (value: string) =>{
        setEmail(value);
        if(!checkEmail(value)){
            setIsEmailValid(false);
        }else{
            setIsEmailValid(true);
        }
    }
    const handleChangePassword = (value: string) =>{
        setPassword(value);
        setPasswordErrors(validatePassword(value));
    }

    const handleSubmit = () =>{
        if(validateUsername(username).length === 0 && validatePassword(password).length === 0 && isEmailValid){
            const userData = {
                username,
                email,
                password
            }
            handleRegister(userData);
        }
    }
    const handleRegister = async (userData: IUserData) =>{
        console.log(userData);
        try{
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, userData)
            console.log("User created!", response);
            navigate('/profile');
        } catch (error){
            console.log("Error creating user: ",error)
        }
    }
    return ( 
        <div className="register w-full h-full flex items-center justify-center">
            <div className="secondary-color rounded flex gap-[20px] px-[10px] py-[30px] w-[700px]">
                <form className="items-center w-1/2 flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                    <h1 className="font-bold text-center text-2xl">Register</h1>
                    <fieldset className="flex flex-col gap-1 w-full">
                        <label>Username</label>
                        <input className="w-full h-[40px] rounded primary-color" type="text" name="username" id="username" onChange={(e)=>handleChangeUsername(e.target.value)} value={username} required></input>
                    </fieldset>
                    <fieldset className="flex flex-col gap-1 w-full">
                        <label>Email</label>
                        <input className="w-full h-[40px] rounded primary-color" type="email" name="email" id="email" onChange={(e)=>handleChangeEmail(e.target.value)} value={email} required></input>
                    </fieldset>
                    <fieldset className="flex flex-col gap-1  w-full">
                        <label>Password</label>
                        <input className="w-full h-[40px] rounded primary-color" type="password" name="password" id="password" onChange={(e)=>handleChangePassword(e.target.value)} value={password} required></input>
                    </fieldset>
                    <button className="accent-background w-[150px] h-[40px] rounded" type="button" onClick={handleSubmit} disabled={usernameErrors.length > 0 || passwordErrors.length > 0 || !isEmailValid}>Register</button>
                    <Link to={'/login'}>Login</Link>
                </form>
                <div className="w-1/2 flex flex-col gap-2 justify-center">
                    <div className="w-full flex flex-col gap-1">
                        <h3>The <b>username</b> must be:</h3>
                        <div className={`flex gap-3 items-center ${username?.length > 0 && usernameErrors.includes('length') ? 'error-text' : ''}`}><img src={username?.length === 0 ? IconLibrary.Circle : usernameErrors.includes('length') ? IconLibrary.Close : IconLibrary.Checkmark} alt="" className="w-[20px] h-[20px]" />Between 3 and 20 characters</div>
                        <div className={`flex gap-3 items-center ${username?.length > 0 && usernameErrors.includes('characters') ? 'error-text' : ''}`}><img src={username?.length === 0 ? IconLibrary.Circle : usernameErrors.includes('characters') ? IconLibrary.Close : IconLibrary.Checkmark} alt="" className="w-[20px] h-[20px]" />Only letters, numbers, and underscores (_)</div>
                        <div className={`flex gap-3 items-center ${username?.length > 0 && usernameErrors.includes('spaces') ? 'error-text' : ''}`}><img src={username?.length === 0 ? IconLibrary.Circle : usernameErrors.includes('spaces') ? IconLibrary.Close : IconLibrary.Checkmark} alt="" className="w-[20px] h-[20px]" />With no spaces</div>
                    </div>
                    <div className="w-full flex flex-col gap-1">
                        <h3>The <b>password</b> must be:</h3>
                        <div className={`flex gap-3 items-center ${password?.length > 0 && passwordErrors.includes('length') ? 'error-text' : ''}`}><img src={password?.length === 0 ? IconLibrary.Circle : passwordErrors.includes('length') ? IconLibrary.Close : IconLibrary.Checkmark} alt="" className="w-[20px] h-[20px]" />Between 8 and 30 characters</div>
                        <div className={`flex gap-3 items-center ${password?.length > 0 && passwordErrors.includes('uppercase') ? 'error-text' : ''}`}><img src={password?.length === 0 ? IconLibrary.Circle : passwordErrors.includes('uppercase') ? IconLibrary.Close : IconLibrary.Checkmark} alt="" className="w-[20px] h-[20px]" />With at least 1 uppercase</div>
                        <div className={`flex gap-3 items-center ${password?.length > 0 && passwordErrors.includes('lowercase') ? 'error-text' : ''}`}><img src={password?.length === 0 ? IconLibrary.Circle : passwordErrors.includes('lowercase') ? IconLibrary.Close : IconLibrary.Checkmark} alt="" className="w-[20px] h-[20px]" />With at least 1 lowercase</div>
                        <div className={`flex gap-3 items-center ${password?.length > 0 && passwordErrors.includes('number') ? 'error-text' : ''}`}><img src={password?.length === 0 ? IconLibrary.Circle : passwordErrors.includes('number') ? IconLibrary.Close : IconLibrary.Checkmark} alt="" className="w-[20px] h-[20px]" />With at least 1 number</div>
                    </div>
                    <div className="w-full flex flex-col gap-1">
                        <h3><b>Email</b> is:</h3>
                        <div className={`flex gap-3 items-center ${email?.length > 0 && !isEmailValid ? 'error-text' : ''}`}>
                            <img src={email?.length === 0 ? IconLibrary.Circle : !isEmailValid ? IconLibrary.Close : IconLibrary.Checkmark} alt="" className="w-[20px] h-[20px]" />
                            {email?.length === 0 ? 'Empty' : isEmailValid ? "Valid" : "Not valid"}
                        </div>
                    </div>
                </div>
            </div>

        </div>
     );
}
 
export default Register;