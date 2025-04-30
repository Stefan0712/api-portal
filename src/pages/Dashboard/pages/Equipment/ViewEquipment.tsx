import axios from "axios";
import { useMessage } from "../../../../context/MessageContext";
import { Equipment } from "../../../../types/interfaces";
import { formatDateToPretty } from "../../../../utils/dateFormat";
import { useState } from "react";
import { IconLibrary } from "../../../../IconLibrary";

interface ViewEquipmentProps {
    equipment: Equipment | null;
    handleEdit: (equipment: Equipment) =>void;
    handleDelete: (id: string) => void;
    refresh: ()=>void;
}
//TODO: Add a link to the author's profile
const ViewEquipment: React.FC<ViewEquipmentProps> = ({equipment, handleEdit, handleDelete, refresh}) => {

    const {showMessage} = useMessage();

    const userId = localStorage.getItem('userId')
    const handleSaveEquipment = async (id: string) =>{
        try{
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/equipment/toggle-save/${id}`,{}, {withCredentials: true});
            if(response.status === 200){
                showMessage(response.data.message, "success");
                refresh();
            }
        }catch(error){
            showMessage("There has been an error saving this equipment", "error");
            console.error(error)
        }
    }
    
    return ( 
        <div className="w-full h-full content-color p-4">
            {!equipment ? <h1>Select an equipment to view</h1> : <div className="flex flex-col gap-2 h-full w-full">
                <h2 className="full font-bold text-2xl">{equipment.name}</h2>
                <p className="text-white text-opacity-50 pl-[10px]">Created by {equipment?.authorId?.username} on {formatDateToPretty(equipment?.createdAt)}</p>
                <h3 className="font-bold text-white text-opacity-75">Description</h3>
                <p className="pl-[10px]">{equipment.description || 'Description not set'}</p>
                <h3 className="font-bold text-white text-opacity-75">Reference (URL)</h3>
                {equipment.url ? <a className="pl-[10px]" href={equipment.url} target="_blank">{equipment.urlName || equipment.url}</a> : <p className="pl-[10px]">No references provided</p>}
                <h3 className="font-bold text-white text-opacity-75">Target Muscles</h3>
                <div className="flex pl-[10px] items-center gap-2 flex-wrap">
                    {equipment.muscleGroups?.map((item, index)=><p key={"muscle-"+index}>{item.name}</p>)}
                </div>
                <h3 className="font-bold text-white text-opacity-75">Tags</h3>
                <div className="flex pl-[10px] items-center gap-2 flex-wrap">
                    {equipment.tags?.map((item, index)=><div key={"tag-"+index} className="flex gap-2 items-center"><div className="w-[10px] h-[10px] rounded" style={{backgroundColor: item.color || 'white'}}></div><p>{item.name}</p></div>)}
                </div>
                {userId && userId === equipment.authorId?._id ? 
                    <div className="mt-auto mb-[20px] w-full flex items-center gap-3 justify-center">
                        <button onClick={()=>handleEdit(equipment)} className="secondary-color w-[150px] h-[40px] rounded">Edit</button>
                        <button onClick={()=>handleDelete(equipment._id)} className="bg-red-500 w-[150px] h-[40px] rounded">Delete</button>
                    </div> : <div className="mt-auto w-full flex items-center gap-3 justify-center">
                        <button className=" w-[40px] h-[40px] rounded" onClick={()=> handleSaveEquipment(equipment._id)}><img src={equipment.isSaved ? IconLibrary.Delete : IconLibrary.Save} className="h-[30px] w-[30px]" alt="" /></button>
                    </div>
                }
            </div>}
        </div>
    );
}
 
export default ViewEquipment;