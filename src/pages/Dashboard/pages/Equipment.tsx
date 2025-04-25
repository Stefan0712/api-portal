import { IconLibrary } from "../../../IconLibrary";
import { useState } from "react";
import { useMessage } from "../../../context/MessageContext";
import NewEquipment from "./NewEquipment";
import ErrorLoginPage from "../../common/LoginErrorPage";
import { Equipment as IEquipment } from "../../../types/interfaces";
import axios from "axios";

const Equipment = () => {

    const userId = localStorage.getItem("userId");
    const {showMessage} = useMessage();

    const [showCreateEquipment, setShowCreateEquipment] = useState(false); // State for showing/hiding the NewExercise form
    const [filteredItems, setFilteredItems] = useState<IEquipment[]>([]);


   
    const getEquipment = async (type: string) =>{
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/equipment/${type === "user" ? "my-equipment" : type==="default" ? "default" : type === "public" ? "all" : "all"}`, {withCredentials: true});
            if(response){
                setFilteredItems(response.data);
                console.log(response.data)
            }
        }catch(error){
            console.error(error);
        }
    }
    
   
    if(!userId){
        return (<ErrorLoginPage />)
    }else{
        return ( 
            <div>
                <h1 className="w-full h-[60px] text-2xl font-bold p-[15px]">Equipment</h1>
                <div className="flex gap-3 items-center px-[15px]">
                    <button className="h-[50px] background-color px-[15px] rounded" onClick={()=>getEquipment("user")}>My Equipment</button>
                    <button className="h-[50px] background-color px-[15px] rounded" onClick={()=>getEquipment("default")}>Default Equipment</button>
                    <button className="h-[50px] background-color px-[15px] rounded" onClick={()=>getEquipment("public")}>Explore</button>
                    <button className="ml-auto" onClick={()=>setShowCreateEquipment(true)}><img src={IconLibrary.Add} className="h-[40px] w-[40px]" /></button>
                </div>
                {showCreateEquipment ? <NewEquipment closeNewEquipment={()=>setShowCreateEquipment(false)} />: null}
                <div>
                    {filteredItems && filteredItems.length > 0 ? filteredItems.map((item, index)=>(
                        <div key={"equipment-"+index}>
                            {item.name}
                        </div>
                    )): null}
                </div>
            </div>
        );
    }
}
 
export default Equipment;