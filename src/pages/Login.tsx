import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {

    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');



    return ( 
        <div className="login w-full h-full flex items-center justify-center">
            <div className="secondary-color rounded flex flex-col gap-3 px-[10px] py-[30px] w-[500px]">
                <form className="w-1/2 items-center">
                    <h1 className="font-bold text-center text-2xl">Login</h1>
                    <fieldset className="flex flex-col gap-1 w-full">
                        <label>Username</label>
                        <input className="w-full h-[40px] rounded primary-color" type="text" name="username" id="username" required></input>
                    </fieldset>
                    <fieldset className="flex flex-col gap-1  w-full">
                        <label>Password</label>
                        <input className="w-full h-[40px] rounded primary-color" type="password" name="password" id="password" required></input>
                    </fieldset>
                    <a href="#">Forgot Password</a>
                    <button className="accent-background w-[150px] h-[40px] rounded">Login</button>
                    <Link to={'/register'}>Register</Link>
                </form>
                <div className="w-1/2">

                </div>
            </div>
        </div>
     );
}
 
export default Login;