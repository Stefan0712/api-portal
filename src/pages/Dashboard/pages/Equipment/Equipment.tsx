import { IconLibrary } from "../../../../IconLibrary";
import { useEffect, useState } from "react";
import { useMessage } from "../../../../context/MessageContext";
import NewEquipment from "./NewEquipment";
import ErrorLoginPage from "../../../common/LoginErrorPage";
import { Equipment as IEquipment } from "../../../../types/interfaces";
import axios from "axios";
import ViewEquipment from "./ViewEquipment";
import EditEquipment from "./EditEquipment";

const Equipment = () => {

    const userId = localStorage.getItem("userId");
    const {showMessage} = useMessage();

    const [showCreateEquipment, setShowCreateEquipment] = useState(false); // State for showing/hiding the NewEquipment form
    const [showEdit, setShowEdit] = useState<IEquipment | null>(null); // State for showing/hiding the EditEquipment form
    const [filteredItems, setFilteredItems] = useState<IEquipment[]>([]);
    const [selectedIdAfterRefresh, setSelectedIdAfterRefresh] = useState<string | null>(null);
    const [selectedEquipment, setSelectedEquipment] = useState<IEquipment | null>(null);


   
    const getEquipment = async (type: string) =>{
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/equipment/${type === "user" ? "my-equipment" : type==="default" ? "default" : type === "public" ? "all" : "all"}`, {withCredentials: true});
            if(response){
                if(type === "user"){
                    setFilteredItems([...response.data.created, ...response.data.saved]); // Since there are two arrays of equipments, merge them into one
                }else{
                    setFilteredItems(response.data); // The other two type should return only one array
                }
                console.log(response.data)
            }
        }catch(error){
            console.error(error);
        }
    }
    useEffect(()=>{
        getEquipment('user');
    },[])
    const handleDelete = async (id: string) =>{
        try{
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/equipment/${id}`, {withCredentials: true})
            if(response.status === 200){
                setSelectedEquipment(null);
                refreshEquipment();
                showMessage("Equipment deleted successfully", "success")
            }
        } catch (error) {
            showMessage("There was an error deleting an equipment", "error");
            console.error(`Error deleting exercise: `, error);
        }
    }
    const handleEdit = (equipment: IEquipment) =>{
        if(equipment){
            setShowEdit(equipment);
        }else{
            showMessage("There was an error with edit equipment", "error");
        }
    }
    const refreshEquipment = async (selected?: string) =>{
        await getEquipment('user');
        if (selected) {
            setSelectedIdAfterRefresh(selected); 
        }
    }
    useEffect(() => {
        if (selectedIdAfterRefresh && filteredItems && filteredItems.length > 0) {
          const found = filteredItems.find(item => item._id === selectedIdAfterRefresh);
          if (found) {
            setSelectedEquipment(found);
          }
          setSelectedIdAfterRefresh(null);
        }
      }, [filteredItems, selectedIdAfterRefresh]);
    if(!userId){
        return (<ErrorLoginPage />)
    }else{
        return ( 
            <div className="w-full h-full grid grid-cols-[1fr_500px]">
                <div className="w-full h-full">
                    <h1 className="w-full h-[60px] text-2xl font-bold p-[15px]">Equipment</h1>
                    <div className="flex gap-3 items-center px-[15px]">
                        <button className="h-[50px] background-color px-[15px] rounded" onClick={()=>getEquipment("user")}>My Equipment</button>
                        <button className="h-[50px] background-color px-[15px] rounded" onClick={()=>getEquipment("default")}>Default Equipment</button>
                        <button className="h-[50px] background-color px-[15px] rounded" onClick={()=>getEquipment("public")}>Explore</button>
                        <button className="ml-auto" onClick={()=>setShowCreateEquipment(true)}><img src={IconLibrary.Add} className="h-[40px] w-[40px]" /></button>
                    </div>
                    {showCreateEquipment ? <NewEquipment closeNewEquipment={()=>setShowCreateEquipment(false)} />: null}
                    {showEdit ? <EditEquipment refreshEquipment={refreshEquipment} equipment={showEdit} closeEditEquipment={()=>setShowEdit(null)} />: null}
                    <div className="flex flex-col p-[15px] gap-2">
                        {filteredItems && filteredItems.length > 0 ? filteredItems.map((item, index)=>(
                            <div key={"equipment-"+index} onClick={()=>setSelectedEquipment(item)} className="w-full h-[40px] flex items-center gap-4 primary-color rounded px-3 cursor-pointer">
                                <p className="font-bold">{item.name}</p>
                                <p>{item.description || 'Description not set'}</p>
                                <div className="flex ml-auto items-center gap-2">{item.muscleGroups  && item.muscleGroups?.length > 0 ? item.muscleGroups?.map((muscle,index)=><p key={'muscle-'+index}>{muscle.name}</p>) : null}</div>
                            </div>
                        )): null}
                    </div>
                </div>
                <ViewEquipment equipment={selectedEquipment} handleDelete={handleDelete} handleEdit={handleEdit} />
            </div>
        );
    }
}
 
export default Equipment;