import { useState } from "react";
import TagPicker from "../common/TagPicker/TagPicker";
import { Tag } from "../../types/interfaces";
import Tags from "../Exercise/Tags";
import { IconLibrary } from "../../IconLibrary";

interface DetailsProps {
    name: string;
    description: string;
    visibility: string;
    difficulty: string;
    tags: Tag[];
    setName: React.Dispatch<React.SetStateAction<string>>;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
    setVisibility: React.Dispatch<React.SetStateAction<string>>;
    setDifficulty: React.Dispatch<React.SetStateAction<string>>;
    setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
}

const Details: React.FC<DetailsProps> = ({name, description, visibility, difficulty, tags, setName, setDescription, setVisibility, setDifficulty, setTags}) => {

    const [showTagPicker, setShowTagPicker] = useState<boolean>(false);
    const userId = localStorage.getItem('userId');
    const inputClasses = 'h-[40px] rounded secondary-color pl-[10px]';
    const handleAddTag = (tag: Tag) =>{
        setTags(prev=>[...prev, tag]);
    }
    return ( 
        <div className="flex flex-col gap-2">
            <fieldset className="flex flex-col gap-1 px-[10px]">
                <label htmlFor="name">Plan Name</label>
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className={inputClasses}/>
            </fieldset>
            <fieldset className="flex flex-col gap-1 px-[10px]">
                <label htmlFor="description">Description</label>
                <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)} className={inputClasses}/>
            </fieldset>
            <fieldset className="flex flex-col gap-1 px-[10px]">
                <label htmlFor="visibility">Visibility</label>
                <select value={visibility} onChange={(e)=>setVisibility(e.target.value)} className={inputClasses}>
                    <option value={'private'}>Private</option>
                    <option value={'friends'}>Friends</option>
                    <option value={'public'}>Public</option>
                </select>
            </fieldset>
            <fieldset className="flex flex-col gap-1 px-[10px]">
                <label htmlFor="difficulty">Difficulty</label>
                <select value={difficulty} onChange={(e)=>setDifficulty(e.target.value)} className={inputClasses}>
                    <option value={'beginner'}>Beginner</option>
                    <option value={'intermediate'}>Intermediate</option>
                    <option value={'hard'}>Hard</option>
                </select>
            </fieldset>
            <h3 className="px-[10px]">Tags</h3>
            {showTagPicker ? <TagPicker closeModal={()=>setShowTagPicker(false)} currentTags={tags} addTag={handleAddTag} /> : null}
            
            <div className="px-[10px] flex flex-col gap-2">
                {userId ? <Tags addTag={handleAddTag} allTags={tags} author={userId} /> : null}
                <div className="h-[200px] overflow-x-hidden overflow-y-auto flex flex-col gap-1">
                    {tags && tags.length > 0 ? tags.map((tag,index)=><div key={'added-tag-'+index}className="w-full h-[40px] flex gap-2 secondary-color px-2 items-center rounded flex-shrink-0"><div className="h-[15px] w-[15px] rounded" style={{backgroundColor: tag.color}}></div><p>{tag.name}</p><img className=" w-[20px] h-[20px] ml-auto" src={IconLibrary.No} onClick={()=>setTags((tags)=>[...tags.filter(it=>it.id!==tag.id)]) }/></div>) : null}
                </div>
            </div>
        </div>
     );
}
 
export default Details;

