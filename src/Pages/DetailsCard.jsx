import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDetails,
  deleteDetails,
  deleteManga,
  loading,
  getMangas,
  addItemToCart,
  getMangasDetail,
} from '../Redux/actions/index';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import styles from '../components/assets/Details/Details.module.css';
import Card from '../components/Card';
import img from '../components/assets/Cards/yugi.jpg';
import { FaStar } from 'react-icons/fa';
import swal from 'sweetalert';
import styleLoading from '../../src/components/assets/Cards/loading.module.css';
import Footer from '../components/Footer';
import { useCurrentUser } from '../domain/useCurrentUserHook';

export default function Details() {
  const dispatch = useDispatch();
  let { id: mangaid } = useParams();
  const manga = useSelector((state) => state.mangasDetails);
  const mangas = useSelector((state) => state.mangas);
  const mangasDetail = useSelector((state) => state.mangasForDetail);
  
  const isLoading = useSelector((state) => state.isLoading);
  const navigate = useNavigate();

  console.log(mangas, "MANGASSSSSSSSSSS")

  const currentUser = useCurrentUser();
  console.log('current user: ', currentUser);
  useEffect(() => {
    dispatch(loading());
    dispatch(getMangasDetail());
    dispatch(getDetails(mangaid));
    return () => {
      dispatch(deleteDetails());
    };
  }, [dispatch, mangaid]);


  console.log(mangasDetail, "MANGASDETAIL")

  function handleDelete(e) {
    e.preventDefault();
    dispatch(deleteManga(mangaid));
    dispatch(deleteDetails(mangaid));
    swal('Your Manga was deleted Successfully', {
      button: {
        className:
          'bg-purple-500 p-3 mt-8 text-white hover:bg-white hover:text-purple-700 uppercase font-bold rounded-xl',
      },
    });
    navigate('/home');
  }
  const [currentPage, setCurrentPage] = useState(1);

  function handleAddToCart(mangaid) {
    dispatch(addItemToCart(mangaid, "card_detail"));
  }

  if(!isLoading){
    return(
        <div>
            <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            {isLoading}
            <div className={styles.detailsContain}>
                <div className={styles.overlay}></div>       
                <div className={styles.port}>
                    <img src={manga.posterImage ? manga.posterImage.small.url : <h1>NO HAY IMAGEN</h1>} alt="your name" className={styles.img}/>
                    <div >
                    
                        <h1 className={styles.title}>{manga.canonicalTitle}</h1>
                    <div className={styles.details}>
                        <p className={styles.synopsis}>{manga.synopsis}</p>
                    <div className={styles.rating}>
                          <p className="flex">Started date: {manga.startDate ? <h5 className="text-blue-600 pl-2"> {manga.startDate} </h5>: "" }</p>
                          <p className="flex">State: {manga.status === "finished" ? <p className="text-red-600 pl-2">Finished</p> : <p className="text-green-600">In broadcast</p>}</p>
                            <div className={styles.filter}>
                                <h3 className="flex justify-start">Categories: </h3>
                                <h5 className="flex justify-start"> {manga.categories?.map((e) => <p className="p-1 ">{e.title}</p> )} </h5>
                                <h3 className="flex">Genres: </h3> 
                                <h5 className="flex justify-start"> {manga.genres?.map((e) => <p className="p-2"> {e.name}</p> )}</h5>
                                </div>
                           <div> <h1 className={styles.prieces}>Price: <b>${manga.price}</b></h1></div>
                             <div className={styles.stars}>
                                <FaStar/>
                                <FaStar/>
                                <FaStar/>
                                <FaStar/>
                                <FaStar/>
                                <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3 h-6">
                                        {manga.averageRating ? manga.averageRating : 0}
                                </span>
                    </div> 
                     
                    <div className={styles.buttons}>
                                <Link to="/cart">
                                <button onClick={() => handleAddToCart(mangaid)} className={styles.btns}>
                                  Buy
                                  </button>
                                </Link>
                                <button onClick={() => handleAddToCart(mangaid)}  className={styles.btns}>
                                  Add to Cart
                                  </button>
                            </div>
                    {currentUser?.role === "MASTER"  ||
                     currentUser?.role === "ADMIN"  &&
                            <div className={styles.content}>
                              <button className={styles.bttns} onClick={(id)=>{handleDelete(id);}}>Delete</button>
                              <h2 className={styles.or}>Or</h2>
                              <Link className={styles.bttns} to={`/form/${mangaid}`}>Update?</Link>
                            </div>
               
                        
                        } 
                    </div>
                    </div>
                    
                </div>
                </div>

            {/* </div>
          
         <h1 className={styles.recom}>RECOMENDED :</h1>
        <div className={styles.recomend}>
          <div className={styles.cards}>
            {mangasDetail.length && mangasDetail.map((e) => {
                  return (
                    <div className={styles.card}>
                      <Card
                        mangaid={e.mangaid}
                        canonicalTitle={e.canonicalTitle}
                        posterImage={
                          e.posterImage ? e.posterImage.small.url : img
                        }
                        startDate={e.startDate}
                        price={e.price}
                        status={e.status}
                        averageRating={e.averageRating}
                      />
                    </div>
                  );
                })}
          </div> */}
        </div> 
        <Footer />
      </div>
    );
  } else {
    return <span className={styleLoading.loader}></span>;
  }
}