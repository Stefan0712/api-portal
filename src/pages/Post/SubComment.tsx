import { IconLibrary } from "../../IconLibrary";
import { Comment as IComment } from "../../types/interfaces";
import { formatDateToPretty } from "../../utils/dateFormat";
import { useState } from "react";
import { useMessage } from "../../context/MessageContext";




interface CommentProps {
    data: IComment;
}

const SubComment: React.FC<CommentProps> = ({data}) => {

    const {showMessage} = useMessage();
    const [likes, setLikes] = useState<string[]>(data.likes || []);



    return ( 
        <div className="flex gap-3 pl-[30px]">
            <div className="flex flex-col h-full flex-1 gap-3">
                <div className='flex gap-2 items-center mr-auto'>
                    <img className='h-[40px] w-[40px]' src={IconLibrary.Profile} alt='profile picture'></img>
                    <p>{data.author?.username} on <b className="text-white text-opacity-50">{data.createdAt ? formatDateToPretty(data.createdAt) : null}</b></p>
                    <button><img className='h-[20px] w-[20px]' src={IconLibrary.Dots} alt='menu'></img></button>
                </div>
                <p>{data.body}</p>
            </div>
            <button className="flex gap-2 items-center w-[50px]">{likes.length || 0}<img className='h-[20px] w-[20px]' src={IconLibrary.HeartEmpty} alt='likes'></img></button>
        </div>
     );
}
 
export default SubComment;