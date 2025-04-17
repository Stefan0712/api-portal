import { Link } from "react-router-dom";

const ErrorLoginPage = () => {
    return ( 
        <div className="w-full h-full flex items-center justify-center">
            <div className="flex flex-col gap-[20px] items-center justify-center secondary-color rounded p-[30px]">
                <h1 className="text-4xl font-bold">You are not logged in!</h1>
                <p className="text-xl">Please log in to access this page</p>
                <Link to={'/login'} className="w-[200px] h-[50px] accent-background rounded flex items-center justify-center">Continue to Log in</Link>
            </div>
        </div>
     );
}
 
export default ErrorLoginPage;