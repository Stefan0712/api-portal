import { IconLibrary } from "../../../IconLibrary";
import { useState } from "react";
import { useMessage } from "../../../context/MessageContext";
import NewEquipment from "./NewEquipment";

const Equipment = () => {

    const userId = localStorage.getItem("userId");
    const {showMessage} = useMessage();

    const [showCreateEquipment, setShowCreateEquipment] = useState(false);

   

    
   
    if(!userId){
        return (<h1>You are not logged in</h1>)
    }else{
        return ( 
            <div>
                <h1 className="w-full h-[60px] text-2xl font-bold p-[15px]">Equipment</h1>
                <div className="flex gap-3 items-center px-[15px]">
                    <button className="h-[50px] background-color px-[15px] rounded">Default</button>
                    <button className="h-[50px] background-color px-[15px] rounded">Created</button>
                    <button className="h-[50px] background-color px-[15px] rounded">Saved</button>
                    <button className="h-[50px] background-color px-[15px] rounded">Explore</button>
                    <button className="ml-auto" onClick={()=>setShowCreateEquipment(true)}><img src={IconLibrary.Add} className="h-[40px] w-[40px]" /></button>
                </div>
                {showCreateEquipment ? <NewEquipment closeNewEquipment={()=>setShowCreateEquipment(false)} />: null}
            </div>
        );
    }
}
 
export default Equipment;