import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Details from './Pages/DetailsCard';
import NotFound from './components/404';
import LandingPage from './components/LandingPage';
import './App.css';
import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllGenres,
  getAllCategories,
  setFirebaseUser,
  setUserRole,
} from './Redux/actions';
import Login from './Pages/Login';
import Cart from './Pages/Cart';
import Profile from './Pages/Profile';
import AboutUs from './components/Aboutus';
import Update from './Pages/UpdateManga';
import About from './Pages/About';
import Cms from './Pages/Cms';
import firebase, { fetchUserData } from './domain/userService';

function App() {
  const dispatch = useDispatch();

  const firebaseUser = useSelector((state) => state.firebaseUser);
  const userRole = useSelector((state) => state.userRole);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      dispatch(setFirebaseUser(user));
      if (user) {
        const userData = await fetchUserData();
        dispatch(setUserRole(userData.role));
      } else {
        dispatch(setUserRole('loggedout'));
      }
    });
  }, [firebaseUser]);

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllGenres());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/form" element={<FormAdmin />} /> */}
        <Route path="/manga/:id" element={<Details />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/form/:id" element={<Update />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/cms" element={<Cms />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
