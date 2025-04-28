import { Equipment } from "../../../../types/interfaces";
import { formatDateToPretty } from "../../../../utils/dateFormat";

interface ViewEquipmentProps {
    equipment: Equipment | null;
    handleEdit: (equipment: Equipment) =>void;
    handleDelete: (id: string) => void;
}
//TODO: Add a link to the author's profile
const ViewEquipment: React.FC<ViewEquipmentProps> = ({equipment, handleEdit, handleDelete}) => {



    return ( 
        <div className="w-full h-full primary-color p-4">
            {!equipment ? <h1>Select an equipment to view</h1> : <div className="flex flex-col gap-2 h-full w-full">
                <h2 className="full font-bold text-2xl">{equipment.name}</h2>
                <p className="text-white text-opacity-50 pl-[10px]">Created by {equipment?.authorId?.username} on {formatDateToPretty(equipment?.createdAt)}</p>
                <h3 className="font-bold text-white text-opacity-75">Description</h3>
                <p className="pl-[10px]">{equipment.description || 'Description not set'}</p>
                <h3 className="font-bold text-white text-opacity-75">Reference (URL)</h3>
                {equipment.url ? <a className="pl-[10px]" href={equipment.url} target="_blank">{equipment.urlName || equipment.url}</a> : <p className="pl-[10px]">No references provided</p>}
                <h3 className="font-bold text-white text-opacity-75">Target Muscles</h3>
                <div className="flex pl-[10px] items-center gap-2">
                    {equipment.muscleGroups?.map((item, index)=><p key={"muscle-"+index}>{item.name}</p>)}
                </div>
                <h3 className="font-bold text-white text-opacity-75">Tags</h3>
                <div className="flex pl-[10px] items-center gap-2">
                    {equipment.tags?.map((item, index)=><div key={"tag-"+index} className="flex gap-2 items-center"><div className="w-[10px] h-[10px] rounded" style={{backgroundColor: item.color || 'white'}}></div><p>{item.name}</p></div>)}
                </div>
                <div className="mt-auto mb-[20px] w-full flex items-center gap-3 justify-center">
                    <button onClick={()=>handleEdit(equipment)} className="secondary-color w-[150px] h-[40px] rounded">Edit</button>
                    <button onClick={()=>handleDelete(equipment._id)} className="bg-red-500 w-[150px] h-[40px] rounded">Delete</button>
                </div>
            </div>}
        </div>
    );
}
 
export default ViewEquipment;