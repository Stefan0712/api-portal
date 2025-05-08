import axios from "axios";
import { IconLibrary } from "../../IconLibrary";
import { Comment as IComment } from "../../types/interfaces";
import { formatDateToPretty } from "../../utils/dateFormat";
import { useEffect, useState } from "react";
import { useMessage } from "../../context/MessageContext";
import SubComment from "./SubComment.tsx";
import Menu from "./Menu.tsx";




interface CommentProps {
    data: IComment;
    updateComments:(newList: IComment[])=>void,
}

const Comment: React.FC<CommentProps> = ({data, updateComments}) => {

    const {showMessage} = useMessage();
    const userId = localStorage.getItem('userId') || '';
    const [expandComments, setExpandComments] = useState<boolean>(false);
    const [showMenu, setShowMenu] = useState(false);

    const [likes, setLikes] = useState<string[]>(data.likes || []);
    const [comments, setComments] = useState<IComment[]>(data.comments || []);

    const [comment, setComment] = useState<string>('');
    useEffect(() => {
        if (data.comments && Array.isArray(data.comments)) {
          setComments(data.comments);
        }
      }, [data.comments]);
    const handleAddComment = () =>{
        if(comment && comment.length > 0){
            const commentData: {body: string, parentId: string} = {
                body: comment,
                parentId: data._id,
            }
            console.log(commentData)
            handleSaveComment(commentData);
        }
    }

    const handleSaveComment = async (newCommentData: {body: string, parentId: string})=>{
        try{
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/comment/${data.postId}`,newCommentData,{withCredentials: true});
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

    const toggleLike = () =>{
        if(likes.includes(userId)){
            setLikes(prev=>[...prev.filter(item=>item!==userId)])
        }else{
            setLikes(prev=>[...prev, userId])
        }
    }
    const updateList = (id) =>{
        updateComments([...comments.filter(item=>item._id!==id)])
    }
    return ( 
        <div className="flex flex-col gap-2 px-[10px] primary-color p-3 rounded relative">
            {showMenu ? <Menu cancel={()=>setShowMenu(false)}  setNewList={()=>updateList(data._id)} type="comment" itemId={data._id}/> : null}
            <div className="w-full flex justify-between">
                <div className='flex gap-2 items-center mr-auto'>
                    <img className='h-[40px] w-[40px]' src={IconLibrary.Profile} alt='profile picture'></img>
                    <p>{data.author?.username} on <b className="text-white text-opacity-50">{data.createdAt ? formatDateToPretty(data.createdAt) : null}</b></p>
                </div>
                <button onClick={()=>setShowMenu(prev=>!prev)}><img className='h-[20px] w-[20px]' src={IconLibrary.Dots} alt='menu'></img></button>
            </div>
            <p>{data.body}</p>
            <div className="flex gap-[30px]">
                <button className="flex gap-2 items-center" onClick={toggleLike}><img className='h-[20px] w-[20px]' src={likes.includes(userId) ? IconLibrary.HeartFilled : IconLibrary.HeartEmpty} alt='likes'></img>{likes?.length || 0}</button>
                <button className="flex gap-2 items-center" onClick={()=>setExpandComments(prev=>!prev)}><img className='h-[20px] w-[20px]' src={IconLibrary.Comment} alt='comments'></img>{comments?.length || 0}</button>
            </div>
            <div className={`overflow-hidden ${expandComments ? "" : 'h-[0px]'} w-full transition-all duration-100 flex flex-col gap-[10px]`}>
                <p>Replies</p>
                <div className="flex gap-3">
                    <input className="flex-1 h-[40px] pl-2 bg-transparent border-b border-gray-400 border-opacity-50" type="text" value={comment} onChange={(e)=>setComment(e.target.value)} maxLength={1000} placeholder="Write your comment..."></input>
                    <button onClick={handleAddComment}><img className='h-[20px] w-[20px]' src={IconLibrary.Send} alt='add comment'></img></button>
                </div>
                <div className="flex flex-col gap-3 min-h-[50px] primary-color rounded-l p-2">
                    {comments && comments.length > 0 ? comments.map((item,index)=><SubComment key={'subcomment-'+index} data={item} />) : <p>No comments</p>}
                </div>
            </div>
        </div>
     );
}
 
export default Comment;