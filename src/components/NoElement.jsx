import React from "react";
import styles from "./assets/NoElement/NoElemenet.module.css"
import img from "../components/assets/NoElement/dtljzwihuh861.png"
export default function NoElement(){
    
    return(
        <div className={styles.content}>
            <h1 className={styles.sorry}>Oopsie! The Manga you'r looking for, isn't avaible</h1>
            <img src={img} alt="Noelement" className={styles.img}/>
        </div>
    );
}