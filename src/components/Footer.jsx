import React from 'react';
import { Link } from 'react-router-dom';
import styles from './assets/Footer/Footer.module.css';
import IMG from './assets/Footer/naruto.png';
export default function Footer() {
  return (
    <div className={styles.Footer}>
      <div className={styles.left}>
        <div className={styles.more}>
          <h1 className={styles.title2}>THANK YOU FOR YOUR VISIT!</h1>
          <img src={IMG} alt="like" className={styles.img} />
        </div>
      </div>
      <div className={styles.eas}>
        <h3>© 2022 Project Final - My Manga</h3>
      </div>
      <div>
        <h1 className={styles.title}>Contact Us:</h1>
        <div className={styles.right}>
          <div className={styles.contact}>
            <a
              href="mailto:Lleaguen99@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2>Franco </h2>
            </a>
            <a
              href="mailto:gerva.jacob.tropini@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2>Grevasio</h2>
            </a>
            <a
              href="mailto:silbordon.89@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2>Silvina </h2>
            </a>
            <a
              href="mailto:erik.retana.lopez@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2>Erik </h2>
            </a>
          </div>
          <div className={styles.contact}>
            <a
              href="mailto:facuugomez67@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2>Facundo</h2>
            </a>
            <a
              href="mailto:castanedajorge.correo@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2>Jorge</h2>
            </a>
            <a
              href="mailto:sebastiangs2309@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2>Sebastian</h2>
            </a>
          </div>
        </div>
        <Link to="/aboutus">
          <h1 className="text-4xl">About Us</h1>
        </Link>
      </div>
    </div>
  );
}
