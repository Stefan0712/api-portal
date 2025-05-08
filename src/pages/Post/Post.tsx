import { IconLibrary } from "../../IconLibrary";
import { StatusPost } from "../../types/interfaces";
import React, { useState } from "react";
import { formatDateToPretty } from "../../utils/dateFormat";
import Comment from "./Comment";
import { useMessage } from "../../context/MessageContext";
import axios from "axios";


interface PostProps {
    postData: StatusPost;
}

const Post: React.FC<PostProps> = ({postData}) => {

    const {showMessage} = useMessage();

    const [expandComments, setExpandComments] = useState<boolean>(false);

    const [likes, setLikes] = useState<string[]>(postData.likes || []);
    const [comments, setComments] = useState<string[]>(postData.comments || []);

    const [comment, setComment] = useState<string>('');

    const handleAddComment = () =>{
        if(comment && comment.length > 0){
            const commentData: {body: string, parentId: string | null} = {
                body: comment,
                parentId: null
            }
            handleSaveComment(commentData);
        }
    }

    const handleSaveComment = async (data: {body: string})=>{
        try{
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/comment/${postData._id}`,data,{withCredentials: true});
            if(response.status === 201){
                showMessage('Comment added successfully', 'success');
                setComments(prev=>[...prev, response.data]);
                setComment('');
            }
        }catch(error){
            console.error(error);
            showMessage("There has been a server error.", "error");
        }
    }
    const handleShowComments = async () =>{
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/comment/${postData._id}`,{withCredentials: true});
            if(response.status === 200){
                setComments(response.data);
                setExpandComments(true);
            }
        }catch(error){
            console.error(error);
            showMessage("There has been a server error.", "error");
        }
    }
    return ( 
        <div className="w-full p-[15px] rounded-xl secondary-color flex flex-col gap-[20px]">
            <div className="w-full flex justify-between">
                <div className='flex gap-2 items-center mr-auto'>
                    <img className='h-[40px] w-[40px]' src={IconLibrary.Profile} alt='profile picture'></img>
                    <p>{postData.author.username} on <b className="text-white text-opacity-50">{formatDateToPretty(postData.createdAt)}</b></p>
                </div>
                <button><img className='h-[20px] w-[20px]' src={IconLibrary.Dots} alt='menu'></img></button>
            </div>
            <p>{postData.body}</p>
            <div className="flex gap-[30px]">
                <button className="flex gap-2 items-center"><img className='h-[20px] w-[20px]' src={IconLibrary.HeartEmpty} alt='likes'></img>{postData.likes.length || 0}</button>
                <button className="flex gap-2 items-center" onClick={()=>expandComments ? setExpandComments(false) : handleShowComments()}><img className='h-[20px] w-[20px]' src={IconLibrary.Comment} alt='comments'></img>{postData.comments.length || 0}</button>
                <button className="flex gap-2 items-center"><img className='h-[20px] w-[20px]' src={IconLibrary.BookmarkEmpty} alt='bookmark'></img></button>
            </div>
            <div className={`overflow-hidden ${expandComments ? "" : 'h-[0px]'} w-full transition-all duration-100 flex flex-col gap-[10px]`}>
                <p>Comments</p>
                <div className="flex gap-3">
                    <input className="flex-1 h-[40px] pl-2 bg-transparent border-b border-gray-400 border-opacity-50" type="text" value={comment} onChange={(e)=>setComment(e.target.value)} maxLength={1000} placeholder="Write your comment..."></input>
                    <button onClick={handleAddComment}><img className='h-[20px] w-[20px]' src={IconLibrary.Send} alt='add comment'></img></button>
                </div>
                <div className="flex flex-col gap-3 min-h-[50px] rounded-l">
                    {comments && comments.length > 0 ? comments.map((item,index)=><Comment key={'Comment-'+index} data={item} />) : <p>No comments</p>}
                </div>
            </div>
        </div> 
    );
}
 
export default Post;