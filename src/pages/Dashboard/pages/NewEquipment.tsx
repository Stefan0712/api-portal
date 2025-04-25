import { useState } from "react";
import { EquipmentAttributes, Tag, TargetGroups as ITargetGroups } from "../../../types/interfaces";
import { useMessage } from "../../../context/MessageContext";
import Tags from "../../Exercise/Tags";
import TargetGroups from "../../Exercise/TargetGroups";
import { IconLibrary } from "../../../IconLibrary";





interface Props {
    closeNewEquipment: ()=>void;
}

const NewEquipment: React.FC<Props> = ({closeNewEquipment}) => {

    const { showMessage } = useMessage();
    const userId = localStorage.getItem("userId");
    const [showGroups, setShowGroups] = useState(false);

     // Equipment states
     const [name, setName] = useState('');
     const [description, setDescription] = useState('');
     const [url, setUrl] = useState('');
     const [urlName, setUrlName] = useState('');
     const [attributes, setAttributes] = useState<EquipmentAttributes[]>([]);
     const [tags, setTags] = useState<Tag[]>([]);
     const [muscleGroups, setMuscleGroups] = useState<ITargetGroups[]>([]);
 
     // Equipment attribute states
     const [attributeName, setAttributeName] = useState('');
     const [attributeUnit, setAttributeUnit] = useState('');
     const [attributeValue, setAttributeValue] = useState('');

     const handleAddAttribute = () =>{
        if(attributeName && attributeName.length > 2 && attributeName.length < 16){
            const attributeData = {
                name: attributeName,
                unit: attributeUnit,
                value: parseInt(attributeValue)
            }
            setAttributes(prev=>[...prev, attributeData]);
            showMessage("Attribute added successfully", "success");
            setAttributeName('');
            setAttributeUnit('');
            setAttributeValue('');
        }else{
            showMessage("Attribute name is invalid. Make sure it's between 3 and 15 characters long", "error")
        }
    }
    const handleSaveEquipment = () =>{
        if(!name || name.length === 0 ) showMessage("Equipment name cannot be empty", "error");
        if(name && name.length < 3 && name.length > 15 ) showMessage("Equipment name should beb etween 3 and 15 characters", "error");
        if(!tags || tags.length === 0 ) showMessage("Please add at least one tag", "error");

        if(name && tags && name.length > 3 && name.length < 15 && tags.length > 0){
            const equipmentData = {
                savedAt: new Date(),
                name,
                description,
                url,
                urlName,
                attributes,
                tags,
                muscleGroups
            }
            console.log(equipmentData)
            showMessage("Equipment successfully created", "success");
            // setName('');
            // setDescription('');
            // setUrl('');
            // setUrlName('');
            // setTags([]);
            // setAttributes([]);
            // setMuscleGroups([]);
        }
    }

    const handleAddTag = (tag: Tag) =>{
        setTags(prev=>[...prev, tag])
    }
    const handleAddMuscle = (muscle: ITargetGroups) =>{
        setMuscleGroups(prev=>[...prev, muscle])
    }
    return ( 
        <div className="absolute bottom-[25px] left-1/2 transform -translate-x-1/2 w-1/2 min-w-[400px] max-w-[800px] background-color p-[20px] rounded grid grid-cols-[1fr_1fr] grid-rows-[50px_1fr_50px] gap-[10px]">
            <div className="col-start-1 col-end-3 row-start-1 row-end-2 flex items-center"><h2 className="font-bold text-xl">Create Equipment</h2><button className="ml-auto" onClick={closeNewEquipment}><img src={IconLibrary.Close} className="h-[40px] w-[40px]" /></button></div>
            <div className="space-y-4 col-start-1 col-end-2 row-start-2 row-end-3">
                <input className="h-[40px] w-full rounded primary-color pl-[10px]" type="text" id="name" name="name" onChange={(e) => setName(e.target.value)} value={name} placeholder="Name" />
                <textarea className="h-[100px] w-full rounded primary-color pl-[10px] pt-[10px]" id="description" name="description" onChange={(e) => setDescription(e.target.value)} value={description} placeholder="Description" />
                <input className="h-[40px] w-full rounded primary-color pl-[10px]" type="text" id="urlName" name="urlName" onChange={(e) => setUrlName(e.target.value)} value={urlName} placeholder="URL Name" />
                <input className="h-[40px] w-full rounded primary-color pl-[10px]" type="url" id="url" name="url" onChange={(e) => setUrl(e.target.value)} value={url} placeholder="URL" />
                <div className="flex flex-col gap-4">
                    <h3 className="font-bold">Attributes</h3>
                    <div className="w-full gap-3 grid grid-cols-[3fr_1fr_1fr_50px]">
                        <input className="h-[40px] w-full rounded primary-color pl-[10px]" type="text" id="attrName" name="attrName" onChange={(e) => setAttributeName(e.target.value)} value={attributeName} placeholder="Name" />
                        <input className="h-[40px] w-full rounded primary-color pl-[10px]" type="text" id="attrUnit" name="attrUnit" onChange={(e) => setAttributeUnit(e.target.value)} value={attributeUnit} placeholder="Unit" />
                        <input className="h-[40px] w-full rounded primary-color pl-[10px]" type="text" id="attrValue" name="attrValue" onChange={(e) => setAttributeValue(e.target.value)} value={attributeValue} placeholder="Value" />
                        <button onClick={handleAddAttribute} className="w-[40px] h-[40px] flex items-center justify-center"><img className="w-[30px] h-[30px]" alt="" src={IconLibrary.Add} /></button>
                    </div>
                    <div className="primary-color h-[200px] flex flex-col gap-2 rounded">
                        {attributes?.map((attribute, index) => (
                            <div key={index} className="flex w-full primary-color rounded h-[40px] items-center px-[15px] gap-4"><h3>{attribute.name}</h3><p className="ml-auto">{attribute.value} {attribute.unit}</p><button onClick={()=>setAttributes(prev=>[...prev.filter(item=>item != attribute)])}><img className="w-[30px] h-[30px]" alt="" src={IconLibrary.Close} /></button></div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="space-y-4 flex flex-col h-full col-start-2 col-end-3 row-start-2 row-end-3">
                <h3 className="font-bold">Tags</h3>
                <Tags allTags={tags} addTag={handleAddTag} author={userId}/>
                <div className="flex gap-3 flex-col primary-color h-[200px] gap-2 rounded">
                    {tags?.map((item, index)=>(<div key={"tag-"+index} className="h-[40px] px-[10px] rounded primary-color flex items-center gap-3">
                        <div style={{backgroundColor: item.color}} className="w-[15px] h-[15px] rounded" />
                        <p>{item.name}</p>
                        <button onClick={()=>setTags(prev=>[...prev.filter(tag=>tag!=item)])}><img className="w-[25px] h-[25px]" alt="" src={IconLibrary.Close} /></button>
                    </div>))}
                </div>

                <div className="flex items-center"><h3 className="font-bold">Muscle Groups</h3><button className="ml-auto" onClick={()=>setShowGroups(true)}><img className="w-[25px] h-[25px]" alt="" src={IconLibrary.Add} /></button></div>
                {showGroups ? <TargetGroups closeModal={()=>setShowGroups(false)} currentItems={muscleGroups} addItem={handleAddMuscle} /> : null}
                <div className="flex flex-col gap-2 h-[200px] overflow-x-hidden overflow-y-auto primary-color rounded p-2 pr-[20px]">
                    {muscleGroups?.length > 0 ? muscleGroups.map((item, index)=><div className="w-full h-[40px] flex gap-2 secondary-color px-2 items-center rounded flex-shrink-0" key={item.name+index} ><div></div><p>{item.name}</p><img className=" w-[20px] h-[20px] ml-auto" src={IconLibrary.No} onClick={()=>setMuscleGroups((muscleGroups)=>[...muscleGroups.filter(it=>it.id!==item.id)]) }/></div>) : <p className="px-2 py-1 font-bold">No Target Muscles</p>}
                </div>
            </div>
            <button className="w-full h-[50px] rounded accent-background mt-auto col-start-1 col-end-3 row-start-3 row-end-4" onClick={handleSaveEquipment}>Create Equipment</button>
        </div>  
    );
}
 
export default NewEquipment;