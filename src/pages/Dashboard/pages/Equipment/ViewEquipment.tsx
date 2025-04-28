import { IconLibrary } from "../../../../IconLibrary";
import { Equipment } from "../../../../types/interfaces";
import { formatDateToPretty } from "../../../../utils/dateFormat";

interface ViewEquipmentProps {
    equipment: Equipment;
    close: ()=>void;
}
//TODO: Add a link to the author's profile
const ViewEquipment: React.FC<ViewEquipmentProps> = ({equipment, close}) => {
    return ( 
        <div className="w-[300px] h-full absolute right-0 bottom-0 secondary-color">
            <div className="w-full h-[50px] flex items-center gap-4">
                <h2>{equipment.name}</h2>
                <button><img className="h-[30px] w-[30px]" src={IconLibrary.Close} alt="close view equipment" /></button>
            </div>
            <div><p>Created by {equipment?.authorId?.username}</p><p>Created on {formatDateToPretty(equipment?.createdAt)}</p></div>
            <p>{equipment.description || 'Description not set'}</p>
            {equipment.url ? <a href={equipment.url} target="_blank">{equipment.urlName || equipment.url}</a> : "No references provided"}
            <h3>Target Muscles</h3>
            <div>
                {equipment.muscleGroups?.map((item, index)=><p key={"muscle-"+index}>{item.name}</p>)}
            </div>
            <h3>Tags</h3>
            <div>
                {equipment.tags?.map((item, index)=><div key={"tag-"+index}><div style={{backgroundColor: item.color || 'white'}}></div><p>{item.name}</p></div>)}
            </div>
        </div>
    );
}
 
export default ViewEquipment;