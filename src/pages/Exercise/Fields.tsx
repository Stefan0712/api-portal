import { useState } from "react";
import { IconLibrary } from "../../IconLibrary";
import { v4 as uuidv4 } from 'uuid';
import React from "react";
import { Field } from "../../types/interfaces";
interface FieldsProps {
    addField: (field: Field) => void;
  }
const Fields: React.FC<FieldsProps> = ({addField}) => {

    const [name, setName] = useState('');
    const [unit, setUnit] = useState('');
    const [target, setTarget] = useState(0);

    const [isNameValid, setIsNameValid] = useState<boolean>(true);
    const [isUnitValid, setIsUnitValid] = useState<boolean>(true);

    const handleAddField = () =>{
        if(!name && name.length < 3){
            addError('name')
        }else if(!unit && unit.length < 1){
            addError('unit')
        }else{
            const fieldData = {
                id: uuidv4(),
                name,
                unit,
                target: target,
                isCompleted: false,
                value: 0,
            }
            addField(fieldData);
            clearInputs();
        }
    }
 
    const addError = (type) => {
        console.log(type);
    
        if (type === 'name') {
            setIsNameValid(false)
            setTimeout(() => setIsNameValid(true), 3000); 
        } else if (type === 'unit') {
            setIsUnitValid(false); 
            setTimeout(() => setIsUnitValid(true), 3000); 
        }
    };
    const clearInputs = () =>{
        setName('');
        setUnit('');
        setTarget('');
    }
    return ( 
        <div className="flex gap-[10px]">
            <input className={`h-[40px] rounded w-3/6 pl-[10px] secondary-color ${!isNameValid ? 'input-error' : ''}`} type="text" name="name" onChange={(e)=>setName(e.target.value)} value={name} placeholder="Name"></input>
            <input className="h-[40px] rounded w-1/6 pl-[10px] secondary-color" type="text" name="unit" onChange={(e)=>setUnit(e.target.value)} value={unit} placeholder="Unit"></input>  
            <input className="h-[40px] rounded w-1/6 pl-[10px] secondary-color" type="number" name="target" onChange={(e)=>setTarget(parseInt(e.target.value))} value={target} placeholder="Target Value"></input>
            <button className="h-[40px] w-[40px] flex justify-center items-center ml-auto" type="button" onClick={handleAddField}><img className="h-[30px] w-[30px]" src={IconLibrary.Add} alt="" /></button>
        </div>
     );
}
 
export default Fields;