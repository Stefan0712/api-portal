import styles from './CreateExercise.module.css';
import React from 'react';
import { useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import {IconLibrary} from '../../../IconLibrary';
import EquipmentPicker from '../../common/EquipmentPicker/EquipmentPicker.tsx';

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
interface CreateEquipmentProps {
    addEquipment: (equipment: Equipment) => void;
    allItems: Equipment[];
}
  
const Equipment: React.FC<CreateEquipmentProps> = ({addEquipment, allItems}) => {

    const [name, setName] = useState<string>('');
    const [unit, setUnit] = useState<string>('');
    const [value, setValue] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const [showEquipments, setShowEquipments] = useState(false);

    const handleNameChange = ( value ) =>{
        if(name.length > 0 && name.length < 15 && error){
            setError(false);  
            console.log("No error")
        }
        setName(value);

        
        
    }   
    const handleUnitChange = ( value ) =>{
        setUnit(value);
    }   
    const handleValueChange = ( value ) =>{
        setValue(value);
    }   
    const handleAddEquipment = () =>{
        if(name.length > 0 && name.length < 15){
            const equipmentData: Equipment = {
                id: uuidv4(),
                name,
                attributes: [{name: unit, unit, value: typeof value === 'string' ? parseInt(value) : value}]
            };
            addEquipment(equipmentData);
            setName('');
            setUnit('');
            setValue('');
        }else{
            setError(true);
        }
    }

    return ( 
        <div className={styles['create-equipment']}>
            {showEquipments ? <EquipmentPicker closeModal={()=>setShowEquipments(false)} currentItems={allItems} addItem={addEquipment} /> : null}
            <button type="button" className="clear-button" onClick={()=>setShowEquipments(true)}><img   className="small-icon" src={IconLibrary.Search} alt=""/></button>
            <input className={error ? 'input-error' : ''} type='text' onChange={(e)=>handleNameChange(e.target.value)} value={name} maxLength={15} placeholder='Name'/>
            <input type='text' onChange={(e)=>handleUnitChange(e.target.value)} value={unit} placeholder='Unit'/>
            <input type='number' onChange={(e)=>handleValueChange(e.target.value)} value={value} placeholder='Value'/>
            <button type='button' className='clear-button' onClick={handleAddEquipment}><img src={IconLibrary.Add} className='small-icon' alt='' /></button>
        </div>
     );
}
 
export default Equipment;