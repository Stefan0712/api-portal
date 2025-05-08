import { useState } from "react";
import { IconLibrary } from "../../IconLibrary";





const NewPost = () => {

    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [visibility, setVisibility] = useState<string>('public');



    return ( 
        <div className="secondary-color flex flex-col rounded p-2 w-[500px] h-[300px]">
            <div className="flex justify-between">
                <h3>Create a post</h3>
            </div>
            <form onSubmit={(e)=>e.preventDefault()} className="flex flex-col gap-[20px]">
                <div>
                    <fieldset className="flex flex-col gap-1">
                        <label>Title</label>
                        <input className="h-[40px] rounded" type="text" name="title" id="title" value={title} onChange={(e)=>setTitle(e.target.value)} />
                    </fieldset>
                    <fieldset className="flex flex-col gap-1">
                        <label>Content</label>
                        <input className="h-[40px] rounded" type="text" name="content" id="content" value={content} onChange={(e)=>setContent(e.target.value)} />
                    </fieldset>
                </div>
                <div className="flex justify-between items-end w-full h-[75px] gap-3">
                    
                    <fieldset className="flex flex-col gap-1">
                        <label htmlFor="visibility">Visibility</label>
                        <select className="h-[40px] w-[200px] rounded text-black" onChange={(e)=>setVisibility(e.target.value)}>
                            <option value={'public'}>Public</option>
                            <option value={'friends'}>Friends</option>
                            <option value={'private'}>Private</option>
                        </select>
                    </fieldset>
                    <button className="w-[100px] h-[40px] accent-background rounded">Post</button>
                </div>
            </form>
        </div>
     );
}
 
export default NewPost;