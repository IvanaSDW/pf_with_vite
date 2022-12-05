import React from "react";
import { useSelector } from "react-redux";
import styles from "./assets/Paginated/Paginated2.module.css";

export default function Pagination({mangasPerPage, mangas, pagination, currentPage, setMangasPerPage, setCurrentPage }) {
    const pageNumbers = []
    const totalNumberOfPages = useSelector(state => state.totalNumberOfPages)
    for (let i = 1; i <= totalNumberOfPages; i++) {
        pageNumbers.push(i)
    }
  
    return(
         <nav>
            <ul className={styles.crumbs}>
                {
                    
                    pageNumbers&&
                    pageNumbers.map(number => (
                        <li className={styles.number} key={number}>
                            <div className={currentPage === number ? styles.crumb__active : styles.crumb} onClick={()=> pagination(number)}>{number}</div>
                        </li>

))
                }
            </ul>
        </nav>
    )
};