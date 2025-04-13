import React from 'react';
import styles from './TagPicker.module.css';
import { useState } from 'react';
import { IconLibrary } from '../../../IconLibrary';
import { defaultTags as tags } from '../../../constants/defaultTags';

interface Tag {
    id: string;
    name: string;
    color: string;
    author: string;
}
interface TagPickerProps {
    closeModal: () => void;
    addTag: (tag: Tag) => void;
    currentTags: Tag[]
}
const TagPicker: React.FC<TagPickerProps> = ({closeModal, addTag, currentTags}) => {


    const [searchQuery, setSearchQuery] = useState<string>('');
    const [items, setItems] = useState<Tag[]>(tags || []);



    const checkIfAdded = (item) =>{
        if (currentTags.find(existingItem => existingItem.id === item.id)) {
            return true;
        }
        return false;
    }

    const handleSeach = (value: string) =>{
        setSearchQuery(value);
        if (!value.trim()) {
            setItems(tags); // Reset if search is empty
            return;
        }
        const filteredItems = tags.filter((item: Tag) => item.name.toLowerCase().includes(value.toLowerCase()));
        setItems(filteredItems);
    }


    return ( 
        <div className={styles['tag-picker']}>
            <div className={styles.top}>
                <h3>My Tags</h3>
                <button type="button" className="clear-button" onClick={closeModal}><img src={IconLibrary.Close} className="w-[30px] h-[30px]" alt="" /></button>
            </div>
            <div className={styles['search-bar']}>
                <input className={`${styles['search-input']} pl-2 rounded secondary-color`} type="text" minLength={0} maxLength={100} onChange={(e)=>handleSeach(e.target.value)} value={searchQuery} placeholder='Search...'></input>
                <img className="w-[30px] h-[30px]" src={IconLibrary.Search} />
            </div>
            <div className={styles.results}>
                {items?.length > 0 ? items.map((item,index)=>
                    checkIfAdded(item) ? null : (
                        <div className={styles.tag} key={'tag-'+item.name+index}>
                            <div className={styles.color} style={{backgroundColor: item.color}}></div>
                            <p className={styles.name}>{item.name}</p>
                            <button type="button" className="clear-button" onClick={()=>addTag(item)}><img src={IconLibrary.Add} className="w-[30px] h-[30px]" alt="" /></button>
                        </div>
                    )
                ):<p>Items not found</p>}
            </div>
        </div>
     );
}
 
export default TagPicker;