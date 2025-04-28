import { Equipment } from "../../../../types/interfaces";
import { formatDateToPretty } from "../../../../utils/dateFormat";

interface ViewEquipmentProps {
    equipment: Equipment | null;
}
//TODO: Add a link to the author's profile
const ViewEquipment: React.FC<ViewEquipmentProps> = ({equipment}) => {
    return ( 
        <div className="w-full h-full primary-color">
            {!equipment ? <h1>Select an equipment to view</h1> : <div>
                <h2 className="full font-bold text-2xl">{equipment.name}</h2>
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
                </div>}
        </div>
    );
}
 
export default ViewEquipment;