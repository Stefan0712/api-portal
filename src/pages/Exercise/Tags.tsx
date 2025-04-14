import React from "react";
import { useState } from "react";
import ColorPicker from "../common/ColorPicker/ColorPicker.tsx";
import { IconLibrary } from "../../IconLibrary";
import {v4 as uuidv4} from 'uuid';
import TagPicker from "../common/TagPicker/TagPicker.tsx";

interface Tag {
    id: string;
    name: string;
    color: string;
    author: string;
  }
interface CreateTagProps {
    addTag: (tag: Tag)=>void;
    author: string;
    allTags: Tag[]
}
const Tags: React.FC<CreateTagProps> = ({addTag, author, allTags}) => {

    const [name, setName] = useState<string>('');
    const [color, setColor] = useState<string>('#FFFFFF');
    const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [showTags, setShowTags] = useState<boolean>(false);

    const addButtonStyles = {
        width: '40px', 
        height: '40px',
        backgroundColor: 'transparent',
        borderRadius: '5px',
        border: 'none'
    }
    const colorButtonStyles = {
        width: '40px', 
        height: '40px',
        backgroundColor: color,
        borderRadius: '5px',
        border: 'none'
    }
    const createTagStyles = {
        width: '100%', 
        height: '50px', 
        display: 'grid', 
        gridTemplateColumns: '50px 50px 1fr 50px', 
        gap: '5px',
        backgroundColor: '#111214'
    }






    const handleAddTag = () =>{
        if(name.length > 0 && name.length < 18){
            const tagData = {
                id: uuidv4(),
                name,
                color: color ?? '#FFFFFF',
                author
            }
            addTag(tagData);
            setName('');
            setColor('#FFFFFF');
        }else{
            setError(true);
        }
    }
    const handleNameInput = (value: string) =>{
        setName(value);
        if(name.length > 0 && name.length < 18 && error){
            setError(false);
        }
    }
    return ( 
        <div style={createTagStyles} className="background-color">
            {showTags ? <TagPicker closeModal={()=>setShowTags(false)} currentTags={allTags} addTag={addTag} /> : null}
            {showColorPicker ? <ColorPicker closeModal={()=>setShowColorPicker(false)} getColor={setColor} currentColor={color}/> : null}
            <button type="button" onClick={()=>setShowTags(true)}><img className="w-[30px] h-[30px]" src={IconLibrary.Search} alt=""/></button>
            <button type="button" style={colorButtonStyles} onClick={()=>setShowColorPicker(true)} />
            <input className={` h-[40px] rounded w-full pl-[10px] secondary-color ${error ? 'input-error' : ''}`} type="text" name="name" id="name" onChange={(e)=>handleNameInput(e.target.value)} value={name} placeholder="Name"/>
            <button type="button" onClick={handleAddTag} style={addButtonStyles}><img style={{width: '40px', height: '40px'}} src={IconLibrary.Add} alt="" /></button>
        </div>
     );
}
 
export default Tags;