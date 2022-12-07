import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import Details from './Pages/DetailsCard';
import NotFound from './components/404';
import LandingPage from './components/LandingPage';
import './App.css';
import { React, useEffect } from 'react';
import { FormAdmin } from './Pages/FormAdmin';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGenres, getAllCategories } from './Redux/actions';
import Login from './Pages/Login';
import Cart from './Pages/Cart';
import Profile from './Pages/Profile';
import AboutUs from './components/Aboutus';
import Update from './Pages/Update';
import About from './Pages/About';
import { useCurrentUser } from './domain/useCurrentUserHook';




function App() {
  const dispatch = useDispatch();
  const currentUser = useCurrentUser();
  console.log('currentUSer: ', currentUser);

  const user = useSelector((state) => state.firebaseUser);


  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllGenres());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route
                path="/form" 
                element={user.email === "admin@mail.com" ? <FormAdmin/> : <Navigate to='/home' />  }/> 
        <Route path="/manga/:id" element={<Details />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/form/:id" 
               element={user.email === "admin@mail.com" ? <Update/> : <Navigate to='/home' /> }/>
        <Route path="/aboutus" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

