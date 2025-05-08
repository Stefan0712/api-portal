import axios from "axios"
import { StatusPost } from "../../types/interfaces";
import { useMessage } from "../../context/MessageContext";


interface MenuProps {
    type: string,
    itemId: string,
    cancel: () =>void,
    setNewList: (items: StatusPost[] | Comment[]) =>void;
}

const Menu: React.FC<MenuProps> = ({type, itemId, cancel, setNewList}) => {
    console.log("menu was opened on type ", type)
    const {showMessage} = useMessage();

    const handleDelete = async (id:string, type: string) =>{
        try{
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/${type}/${id}`, {withCredentials: true});
            if(response.status === 200){
                showMessage('Deleted successfully', 'success');
                setNewList(response.data);
                cancel();
            }
        }catch(error){
            console.error(error);
            showMessage('Something went wrong', 'error');
        }
    }
    const handleEdit = (id: string, type: string) =>{
        console.log(id, type)
    }
    return ( 
        <div className="z-50 absolute right-[50px] top-[10px] w-[150px] h-[90px] rounded flex flex-col menu-color">
            <button className="w-full h-[30px]" onClick={()=>handleEdit(itemId, type)}>Edit</button>
            <button className="w-full h-[30px]" onClick={()=>handleDelete(itemId, type)}>Delete</button>
            <button className="w-full h-[30px]" onClick={cancel}>Cancel</button>
        </div>
     );
}
 
export default Menu;