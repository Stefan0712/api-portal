import { IconLibrary } from "../../IconLibrary";
import { StatusPost } from "../../types/interfaces";
import React from "react";
import { formatDateToPretty } from "../../utils/dateFormat";



interface PostProps {
    postData: StatusPost;
}

const Post: React.FC<PostProps> = ({postData}) => {
    return ( 
        <div className="w-full p-[15px] rounded-xl secondary-color flex flex-col gap-[20px]">
            <div className="w-full flex justify-between">
                <div className='flex gap-2 items-center mr-auto'>
                    <img className='h-[40px] w-[40ppx]' src={IconLibrary.Profile} alt='profile picture'></img>
                    <p>{postData.author.username} on <b className="text-white text-opacity-50">{formatDateToPretty(postData.createdAt)}</b></p>
                </div>
                <button><img className='h-[20px] w-[20ppx]' src={IconLibrary.Dots} alt='menu'></img></button>
            </div>
            <p>{postData.body}</p>
            <div className="flex gap-[30px]">
                <button className="flex gap-2 items-center"><img className='h-[20px] w-[20ppx]' src={IconLibrary.HeartEmpty} alt='likes'></img>{postData.likes.length || 0}</button>
                <button className="flex gap-2 items-center"><img className='h-[20px] w-[20ppx]' src={IconLibrary.Comment} alt='comments'></img>{postData.comments.length || 0}</button>
                <button className="flex gap-2 items-center"><img className='h-[20px] w-[20ppx]' src={IconLibrary.BookmarkEmpty} alt='bookmark'></img></button>
            </div>
        </div> 
    );
}
 
export default Post;