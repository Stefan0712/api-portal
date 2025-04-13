import React from 'react';
import styles from '../common/TagPicker/TagPicker.module.css';
import { useState } from 'react';
import { IconLibrary } from '../../IconLibrary';
import {muscles as defaultItems} from '../../constants/defaultMuscles';

interface TargetGroup {
    id: string;
    name: string;
    author: string;
}
interface TargetGroupsProps {
    closeModal: () => void;
    addItem: (item: TargetGroup) => void;
    currentItems: TargetGroup[]
}
const TargetGroups: React.FC<TargetGroupsProps> = ({closeModal, addItem, currentItems}) => {


    const [searchQuery, setSearchQuery] = useState<string>('');
    const [items, setItems] = useState<TargetGroup[]>(defaultItems.map(({ name, id }) => ({ name, id, author: "system" })) || []);



    const checkIfAdded = (item) =>{
        if (currentItems.find(existingItem => existingItem.id === item.id)) {
            return true;
        }
        return false;
    }

    const handleSeach = (value: string) =>{
        setSearchQuery(value);
        if (!value.trim()) {
            setItems(items); // Reset if search is empty
            return;
        }
        const filteredItems = items.filter((item: TargetGroup) => item.name.toLowerCase().includes(value.toLowerCase()));
        setItems(filteredItems);
    }


    return ( 
        <div className={`${styles['tag-picker']}`}>
            <div className={styles.top}>
                <h3>My Tags</h3>
                <button type="button" className="clear-button" onClick={closeModal}><img src={IconLibrary.Close} className="w-[30px] h-[30px]" alt="" /></button>
            </div>
            <div className={styles['search-bar']}>
                <input className={`${styles['search-input']} h-[40px] rounded w-full pl-[10px] secondary-color`} type="text" minLength={0} maxLength={20} onChange={(e)=>handleSeach(e.target.value)} value={searchQuery} placeholder='Search...'></input>
                <img className="w-[30px] h-[30px]" src={IconLibrary.Search} />
            </div>
            <div className={styles.results}>
                {items?.length > 0 ? items.map((item,index)=>
                    checkIfAdded(item) ? null : (
                        <div className={styles.tag} key={'equipment-'+item.name+index}>
                            <p className={styles.name}>{item.name}</p>
                            <button type="button" className="clear-button" onClick={()=>addItem(item)}><img src={IconLibrary.Add} className="w-[30px] h-[30px]" alt="" /></button>
                        </div>
                    )
                ):<p>Items not found</p>}
            </div>
        </div>
     );
}
 
export default TargetGroups;