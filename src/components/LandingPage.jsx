import React from 'react';
import styles from './assets/LandingPage/LandingPage.module.css';
import { Link } from 'react-router-dom';
import Footer from './Footer';
export default function LandingPage() {
  return (
    <div>
      <div className={styles.landing}>
        <div className={styles.overlay}></div>
        <div className={styles.overlay2}></div>
        <div className={styles.banerText}>
          <h1 className={styles.title}>
            <b className={styles.colorTitle}>
              <span className={styles.key}>Mangas</span>
            </b>
          </h1>
          <h1 className={styles.title}>Unlimited and much more!</h1>
          <div className={styles.subTitles}>
            <h3>Buy what you want where you want</h3>
            <h4>¿What are you waiting for?</h4>
          </div>
          <div className={styles.btn}>
            <Link to="/home">
              <h1 className={styles.key2}> Enter Now!</h1>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
