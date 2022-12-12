import React, { useState } from 'react';
import NavBar from './Navbar';
import styles from './assets/404/NotFound.module.css';
import { Link } from 'react-router-dom';
import Footer from './Footer';


export default function NotFound() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div>
      <NavBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className={styles.NotFound}>
        <div className={styles.left}>
          <h1 className={styles.error}>404</h1>
          <Link to="/home">
            <div className={styles.banner}>
              <h2 className={styles.not}>Not Found</h2>
            </div>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
