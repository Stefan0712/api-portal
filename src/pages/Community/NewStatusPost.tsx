import axios from 'axios';
import { Tag, NewStatusPost as IStatusPost, StatusPost } from '../../types/interfaces';
import React, {useState} from 'react';
import { useMessage } from '../../context/MessageContext';
import { IconLibrary } from '../../IconLibrary';


interface IErrors {
    title: string[]; 
    body: string[]
}
interface NewStatusPostProps {
    addPost: (post: StatusPost) => void;
  }
const NewStatusPost: React.FC<NewStatusPostProps> = ({addPost}) => {

    const { showMessage } = useMessage();

    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('')
    const [privacy, setPrivacy] = useState<"public" | "friends" | "private">('public');
    const [errors, setErrors] = useState<IErrors>({title: [], body: []});
    const [tags, setTags] = useState<Tag[]>([])

    const handleAddStatusPost = () =>{
        const currentErrors = validateStatusPost();
        setErrors(currentErrors);
        if(currentErrors.title.length < 1 && currentErrors.body.length < 1){
            const newStatusPost: IStatusPost = {
                title,
                body,
                tags,
                privacy
            }
            console.log(newStatusPost)
            handleSendData(newStatusPost);
        }
    }
    const validateStatusPost = () =>{
        let tempErrors: IErrors = {title: [], body: []};
        if(title.length < 1){
            tempErrors.title.push('Title cannot be empty')
        }else if(title.length > 50){
            tempErrors.title.push('Title cannot be longer than 50 characters')
        }
        if(body.length < 1){
            tempErrors.body.push('Body cannot be empty')
        }else if(body.length > 500){
            tempErrors.body.push('Body cannot be longer than 500 characters')
        }
        return tempErrors
    }
    const resetInputs = () =>{
        setTitle('');
        setTags([]);
        setBody('');
        setPrivacy('public');
    }
    const handleSendData = async (newPostData: IStatusPost) =>{
        console.log("handleSendData started")
        try{
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/post/status-post`,newPostData,{withCredentials: true});
            if(response.status === 201){
                showMessage('Status Post successfully created', 'success');
                addPost(response.data);
                resetInputs();
            }
        }catch(error){
            console.error(error);
            showMessage("There has been a server error.", "error");
        }
    }

    return ( 
        <div className="secondary-color flex flex-col rounded-xl p-4 w-full pb-[30px]">
            <form onSubmit={(e)=>e.preventDefault()} className="flex flex-col gap-[20px]">
                <div className='w-full flex gap-3'>
                    <div className='flex gap-2 items-center mr-auto'>
                        <img className='h-[40px] w-[40ppx]' src={IconLibrary.Profile} alt='profile picture'></img>
                        <p>{localStorage.getItem('username')}</p>
                    </div>
                    <select className="w-[125px] h-[40px] rounded text-white bg-transparent pl-[10px]" onChange={(e)=>setPrivacy(e.target.value as "public" | "friends" | "private")} value={privacy}>
                        <option className='menu-color text-white' value={'public'}>Public</option>
                        <option className='menu-color text-white' value={'friends'}>Friends</option>
                        <option className='menu-color text-white' value={'private'}>Private</option>
                    </select>
                    <button className="w-[125px] h-[40px] accent-background rounded" onClick={handleAddStatusPost}>Post</button>
                </div>
                <div className='flex flex-col gap-2 flex-1'>
                    <div className='w-full flex gap-2'>
                        <fieldset className="flex flex-col gap-1 flex-1">
                            <input className={`h-[40px] bg-transparent border-b border-opacity-50 pl-[10px] ${errors.title.length > 0 ? 'border-red-500 text-red-500' : 'border-gray-300'}`} type="text" name="title" id="title" maxLength={50} value={title} onChange={(e)=>( setTitle(e.target.value), setErrors(prev=>({...prev, title: []})) )} placeholder='Title...'/>
                            {errors.title.length > 0 ? <ul>{errors.title.map((err, index)=><li className='text-red-400' key={'title-error-'+index}>{err}</li>)}</ul> : null}
                        </fieldset>
                    </div>
                    <fieldset className="flex flex-col gap-1">
                        <input className={`h-[60px] pl-[10px] bg-transparent border-b border-opacity-50 ${errors.body.length > 0 ? 'border-red-500 text-red-500' : 'border-gray-300'}`} type="text" name="body" id="body" value={body} maxLength={500} onChange={(e)=>( setBody(e.target.value), setErrors(prev=>({...prev, body: []})) )} placeholder="What's on your mind?"/>
                        {errors.body.length > 0 ? <ul>{errors.body.map((err, index)=><li className='text-red-400' key={'body-error-'+index}>{err}</li>)}</ul> : null}
                    </fieldset>
                </div>   
                
            </form>
        </div>
     );
}
 
export default NewStatusPost;