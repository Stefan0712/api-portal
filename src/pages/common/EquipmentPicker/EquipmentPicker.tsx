import React from 'react';
import styles from '../styles/DefaultItemPicker.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useState } from 'react';
import { IconLibrary } from '../../../IconLibrary';

interface Equipment {
    id: string;
    name: string;
    attributes?: EquipmentAttributes[];
}
  
interface EquipmentAttributes {
    name: string;
    value?: number;
    unit?: string;
}
interface EquipmentPickerProps {
    closeModal: () => void;
    addItem: (item: Equipment) => void;
    currentItems: Equipment[]
}
const EquipmentPicker: React.FC<EquipmentPickerProps> = ({closeModal, addItem, currentItems}) => {

    const defaultItems = useSelector((state: RootState)=>state.user.equipment);

    const [searchQuery, setSearchQuery] = useState<string>('');
    const [items, setItems] = useState<Equipment[]>(defaultItems || []);



    const checkIfAdded = (item) =>{
        if (currentItems.find(existingItem => existingItem.id === item.id)) {
            return true;
        }
        return false;
    }

    const handleSeach = (value: string) =>{
        setSearchQuery(value);
        if (!value.trim()) {
            setItems(defaultItems); // Reset if search is empty
            return;
        }
        const filteredItems = defaultItems.filter((item: Equipment) => item.name.toLowerCase().includes(value.toLowerCase()));
        setItems(filteredItems);
    }


    return ( 
        <div className={styles['tag-picker']}>
            <div className={styles.top}>
                <h3>My Equipment</h3>
                <button type="button" className="clear-button" onClick={closeModal}><img src={IconLibrary.Close} className="small-icon" alt="" /></button>
            </div>
            <div className={styles['search-bar']}>
                <input className={styles['search-input']} type="text" minLength={0} maxLength={20} onChange={(e)=>handleSeach(e.target.value)} value={searchQuery} placeholder='Search...'></input>
                <img className="small-icon" src={IconLibrary.Search} />
            </div>
            <div className={styles.results}>
                {items?.length > 0 ? items.map((item,index)=>
                    checkIfAdded(item) ? null : (
                        <div className={styles.tag} key={'equipment-'+item.name+index}>
                            <p className={styles.name}>{item.name}</p>
                            <div className={styles.attributes}>
                                {item.attributes && item.attributes.length > 0 ? 
                                    <div className={styles.attribute} key={'attribute-'+item.name}>
                                        <p>{item.attributes[0]?.value} {item.attributes[0]?.unit}</p>
                                    </div> : null}
                            </div>
                            <button type="button" className="clear-button" onClick={()=>addItem(item)}><img src={IconLibrary.Add} className="small-icon" alt="" /></button>
                        </div>
                    )
                ):<p>Items not found</p>}
            </div>
        </div>
     );
}
 
export default EquipmentPicker;