export const isLoggedIn = (): boolean => {
    const user = localStorage.getItem("userId");
    return !!user;
};
interface IUserData { 
    id: string;
    username: string;
    role: string;
}
export const getUserData = (): IUserData | null => {
    const id = localStorage.getItem("userId");
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");
    if(id && username && role){
        const user = {id, username, role};
        return user || null;
    }else{
        console.log("Error getting user's data from localStorage");
        return {id:'', username:'', role:''};
    }
    
};

export const logoutUser = async () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    try {
        await fetch('http://localhost:5000/api/logout', {
          method: 'POST',
          credentials: 'include',
        });
    } catch (err) {
        console.error('Logout failed', err);
    }
};
  