import React, { Fragment, useState } from 'react';
import CardSection from '../components/CardSection';
import { Carousel } from '../components/Carousel';
//import Paginated from "../components/Paginated";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCurrentUser } from '../domain/useCurrentUserHook';
export default function Home() {
  const currentUser = useCurrentUser();
  console.log('currentUSer: ', currentUser);
  const [currentPage, setCurrentPage] = useState(1);
  const [mangaState, setMangasState] = useState([]);

  return (
    <Fragment>
      <div className="overflow-x-hidden ">
        <Navbar 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage} 
          mangaState={mangaState} 
          setMangasState={setMangasState}/>
        <Carousel />
        <CardSection
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          mangaState={mangaState} 
          setMangasState={setMangasState}
        />
        <Footer />
        {/* <Paginated/> */}
      </div>
    </Fragment>
  );
}
