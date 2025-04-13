import styles from './IconPicker.module.css';
import { iconList } from '../../../icons';
import { useState } from 'react';
import { IconLibrary } from '../../../IconLibrary';
import React from 'react';

interface IconPickerProps {
    handleIcon: (icon: string) => void;
    closeModal: ()=>void;
    currentIcon?: {
        url: string;
        name: string;
    }
}
const IconPicker: React.FC<IconPickerProps> = ({handleIcon, closeModal, currentIcon}) => {

    const [selectedIcon, setSelectedIcon] = useState<string>(currentIcon ?? iconList[0]);



    const selectIcon = (icon: string) =>{
        setSelectedIcon(icon);
        handleIcon(icon);
    }

    const handleSaveIcon = () =>{
        handleIcon(selectedIcon);
        closeModal();
    }
    return ( 
        <div className={styles['icon-picker']}>
            <div className={styles.top}>
                <img src={selectedIcon} className={styles['selected-icon']} alt='selected icon' />
                <h3>Select an icon</h3>
                <button className={styles['close-button']} onClick={closeModal}><img src={IconLibrary.Close} className='small-icon' alt='close icon picker' /></button>
            </div>
            <div className={styles.container}>
                {iconList.map((icon)=>(
                    <div key={icon} className={`${styles['icon-button']} ${selectedIcon === icon ? styles['selected'] : ''}`} onClick={()=>selectIcon(icon)}>
                        <img className={styles.icon} src={icon}></img>
                    </div>
                ))}
            </div>
            <button type='button' className={styles['save-icon-button']} onClick={handleSaveIcon}>Save</button>
        </div>
     );
}
 
export default IconPicker;