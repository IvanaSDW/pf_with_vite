import React, { useEffect, useState } from 'react';
import DarkMode from './assets/NavBar/darkMode';
import styles from './assets/NavBar/NavBar.module.css';
import { Link } from 'react-router-dom';
import Logo from './assets/NavBar/ico2.png';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { MdAdminPanelSettings } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { getMangByName } from '../Redux/actions';
import { BiBookAdd } from 'react-icons/bi';

import firebase, { fetchUserData } from '../domain/userService';
import { setFirebaseUser } from '../Redux/actions';

export default function Navbar({
  currentPage,
  setCurrentPage,
  mangaState,
  setMangasState,
}) {
  const dispatch = useDispatch();

  const [currentUser, setCurrentUser] = useState();
  const firebaseUser = useSelector((state) => state.firebaseUser);

  useEffect(() => {
    setCurrentPage(1);
    dispatch(getMangByName(mangaState, currentPage));
  }, [dispatch, mangaState]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      dispatch(setFirebaseUser(user));
      if (user) {
        const userData = await fetchUserData();
        setCurrentUser(userData);
      }
    });
  }, [firebaseUser]);

  function onHandleinput(e) {
    setMangasState(e.target.value);
  }
  const cart = useSelector((state) => state.cart);

  let count = 0;
  count = cart.length;
  return (
    <div>
      <div className={styles.navBar}>
        <div className={styles.left}>
          <Link to="/home">
            <img src={Logo} className={styles.ico} alt="Home" />
          </Link>
          <h1 className="text-3xl font-bold underline">
            <span className={styles.Span}>My</span>Manga
          </h1>
        </div>
        <div className={styles.mid}>
          <Link to="/home">
            <input
              type="text"
              className={styles.Search}
              placeholder="Search your manga..."
              id="search"
              onKeyUp={
                onHandleinput
              } /*onChange={(e) => setMangasState(e.target.value)}*/
            />
          </Link>
        </div>
        <div className={styles.buttons}>
          {currentUser?.role === 'ADMIN' ? (
            <>
              <Link to="/cms">
                <button className={styles.iconBtn}>
                  <MdAdminPanelSettings
                    style={{ fontSize: 28, marginTop: 3, marginRight: 4 }}
                  />
                </button>
              </Link>
            </>
          ) : null}
          <Link to={firebaseUser ? '/profile' : '/login'}>
            <button className={styles.iconBtn}>
              <FaUserCircle style={{ fontSize: 20, marginTop: 7 }} />
            </button>
          </Link>
          <Link to={firebaseUser ? '/cart' : '/login'}>
            <button className={styles.iconBtn}>
              {count > 0 && (
                <div>
                  {/* <circle className="pb-5/6">{count}</circle> */}
                  <input
                    type="text"
                    className="w-4 h-4  bg-red-600 flex justify-center ml-3 rounded-full text-white pl-1 absolute"
                    value={count}
                    disabled
                  />
                </div>
              )}
              <FaShoppingCart style={{ fontSize: 20, marginTop: 7 }} />
            </button>
          </Link>
          <DarkMode />
        </div>
      </div>
    </div>
  );
}
