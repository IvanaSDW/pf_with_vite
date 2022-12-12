import React from "react";
import { FaStar } from 'react-icons/fa';
import  styles from "./assets/Rating/Rating.module.css";

 
export default function RatingRender({rating}){

    const percentage = rating + '%';
    
    return(
        <div className={styles.starrating} title={percentage}>
            <div className={styles.backstars}>
                <i aria-hidden="true"><FaStar/></i>
                <i aria-hidden="true"><FaStar/></i>
                <i aria-hidden="true"><FaStar/></i>
                <i aria-hidden="true"><FaStar/></i>
                <i aria-hidden="true"><FaStar/></i>
                
                <div className={styles.frontstars} style={{width: percentage}}>
                    <i aria-hidden="true"><FaStar/></i>
                    <i aria-hidden="true"><FaStar/></i>
                    <i aria-hidden="true"><FaStar/></i>
                    <i aria-hidden="true"><FaStar/></i>
                    <i aria-hidden="true"><FaStar/></i>
                </div>
            </div>
        </div>   
    )
} 