import NewPost from "../Post/NewPost";
import { useEffect, useState } from "react";
import Post from "../Post/Post";
import NewStatusPost from "./NewStatusPost";
import { StatusPost } from "../../types/interfaces";
import { IconLibrary } from "../../IconLibrary";
import axios from "axios";
import { useMessage } from "../../context/MessageContext";


const Community = () => {

    const {showMessage} = useMessage();

    const [posts, setPosts] = useState<StatusPost[]>([]);
    const [sort, setSort] = useState<string>('new');

    const addPost = (postData: StatusPost) =>{
        setPosts(prev=>[...prev, postData])
    }
    const fetchPosts = async () =>{
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/post/`,{withCredentials: true});
            if(response.status === 200){
                setPosts(response.data);
            }
        }catch(error){
            console.error(error)
            showMessage('There has been a server error','error');
        }
    }
    useEffect(()=>{fetchPosts()},[])
   
    return ( 
        <div className="p-[10px] h-full w-full overflow-hidden flex flex-col gap-3">
            <div className="w-full h-[50px] flex items-center justify-between"><h1 className="text-2xl font-bold">Community Feed</h1></div>
            <div className="w-full h-full flex">
                <div className="w-2/3 h-full flex flex-col gap-3 overflow-y-auto pb-[100px] scrollbar-thin scrollbar-thumb scrollbar-thumb-rounded scrollbar-thumb-white scrollbar-track-transparent pr-[10px]">
                    <NewStatusPost addPost={addPost} />
                    <div className="flex gap-4 justify-end">
                        <select className="bg-transparent" onChange={(e)=>setSort(e.target.value)} value={sort}>
                            <option className="menu-color text-white" value={'new'}>Newest</option>
                            <option className="menu-color text-white" value={'oldest'}>Oldest</option>
                            <option className="menu-color text-white" value={'top-weekly'}>Top weekly</option>
                            <option className="menu-color text-white" value={'top-monthly'}>Top monthly</option>
                        </select>
                        <button><img className='h-[30px] w-[30ppx]' src={IconLibrary.Filter} alt='filters'></img></button>
                    </div>
                    {posts && posts.length > 0 ? posts.map((post, index)=><Post key={index} postData={post}/>) : null}
                </div>
                <div className="w-1/3 h-full">

                </div>
            </div>
        </div>
     );
}
 
export default Community;