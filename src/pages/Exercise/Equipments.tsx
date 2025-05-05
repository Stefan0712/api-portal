import React from 'react';
import { useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import {IconLibrary} from '../../IconLibrary';
import EquipmentPicker from '../common/EquipmentPicker/EquipmentPicker.tsx';

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
    addEquipment: () => void;
    allItems: Equipment[];
}
  
const Equipments: React.FC<CreateEquipmentProps> = ({addEquipment, allItems}) => {

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
    //since input type number gives a string, I handle value as string and convert it to int when creating the equipment object
    const handleUnitChange = ( value: string ) =>{
        setUnit(value);
    }   
    const handleValueChange = ( value: string ) =>{
        setValue(value);
    }   
    const handleAddEquipment = () =>{
        if(name.length > 0 && name.length < 15){
            const equipmentData: Equipment = {
                id: uuidv4(),
                name,
                attributes: [{id: uuidv4(), name: unit || 'No unit', unit, value: value === '' ? 0 : typeof value === 'string' ? parseInt(value) : value }]
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
        <div className='flex gap-2'>
            {showEquipments ? <EquipmentPicker closeModal={()=>setShowEquipments(false)} currentItems={allItems} addItem={addEquipment} /> : null}
            <button type="button" onClick={()=>setShowEquipments(true)}><img   className="w-[30px] h-[30px] w-1/7" src={IconLibrary.Search} alt=""/></button>
            <input className={`${error ? 'input-error' : ''} h-[40px] rounded w-1/3 pl-[10px] secondary-color`} type='text' onChange={(e)=>handleNameChange(e.target.value)} value={name} maxLength={15} placeholder='Name'/>
            <input className='h-[40px] rounded w-1/3 pl-[10px] secondary-color' type='text' onChange={(e)=>handleUnitChange(e.target.value)} value={unit} placeholder='Unit'/>
            <input className='h-[40px] rounded w-1/3 pl-[10px] secondary-color' type='number' onChange={(e)=>handleValueChange(e.target.value)} value={value} placeholder='Value'/>
            <button type='button' onClick={handleAddEquipment}><img src={IconLibrary.Add} className="h-[40px] w-[40px]" alt='' /></button>
        </div>
     );
}
 
export default Equipments;