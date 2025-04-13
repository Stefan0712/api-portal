import { useEffect, useState } from "react";
import React from "react";
import styles from './ColorPicker.module.css';
import { IconLibrary } from "../../../IconLibrary";

interface ModalProps {
    closeModal: ()=>void;
    getColor: (color: string) => void;
    currentColor?: string;
}
const ColorPicker: React.FC<ModalProps> = ({getColor, closeModal, currentColor}) => {

    const colors = ["#FF6F61", "#6B5B95", "#88B04B", "#F7CAC9", "#92A8D1", "#955251", "#B565A7", "#009B77", 
        "#DD4124", "#45B8AC", "#EFC050", "#5B5EA6", "#9B2335", "#DFCFBE", "#BC243C", "#C3447A", "#98B4D4", "#D94F70", "#6C7A89", 
        "#F7786B", "#F0EAD6", "#C39BD3", "#7FCDCD", "#D5A6BD", "#FFD662"];

    const [selectedColor, setSelectedColor] = useState<string>(currentColor ?? 'white');
    const [hexCode, setHexCode] = useState<string>('#FFFFFF');
    const [isHexCorrect, setIsHexCorrect] = useState<boolean>(true);
    
    const handleColorChange = () => {
        if(isValidHexColor(selectedColor)){
            getColor(selectedColor);
            closeModal();
        }
    }
    const isValidHexColor = (color: string): boolean => {
        return CSS.supports("color", color);
    };
    useEffect(()=>{
        if(isValidHexColor(hexCode)){
            setSelectedColor(hexCode);
            setIsHexCorrect(true);
        }else{
            setIsHexCorrect(false);
        }
    }, [hexCode]);

    const handleHexCodeInput = (e: React.ChangeEvent<HTMLInputElement>) =>{
        let value = e.target.value;
        // Ensure the value starts with "#"
        if (!value.startsWith("#")) {
            value = "#" + value.replace(/^#+/, ""); // Remove extra "#" if user types one
        };
        setHexCode(value);
    }
    const changeColor = (color: string) =>{
        setSelectedColor(color);
        setHexCode(color);
    }
    return ( 
        <div className={styles['color-picker']}>
            <div className={styles.header}>
                <h3>Select a color</h3>
                <button type="button" className="clear-button" onClick={()=>closeModal()}>
                    <img src={IconLibrary.Close} className="w-[30px] h-[30px]" alt="close color picker"></img>
                </button>
            </div>
            <div className={styles["colors-container"]}>
                {colors.map( item =>  <button type="button" key={item} className={styles.color} style={{backgroundColor: item}} onClick={()=>changeColor(item)}></button>)}
            </div>
            <div className={styles['custom-color-inputs']}>
                <b>HEX</b>
                <input className={`${styles.hex} ${!isHexCorrect && hexCode.length > 0 ? styles['incorrect-hex'] : null} text-black`} type="text" name="hex-code" id="hex-code" onChange={(e)=>handleHexCodeInput(e)} value={hexCode}></input>
                <div className={styles['selected-color']} style={{backgroundColor: selectedColor}}></div>
                <input type="color" className={styles['custom-color-input']} name="color-input" id="color-input" onChange={(e)=>changeColor(e.target.value)} value={selectedColor}></input>
            </div>
            <button type="button" className={styles["save-color-button"]} onClick={handleColorChange}>Save</button>
        </div>
     );
}
 
export default ColorPicker;