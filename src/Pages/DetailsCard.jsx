import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDetails,
  deleteDetails,
  deleteManga,
  loading,
  getReview,
  getAllUsers,
  // getUserReview,
  addItemToCart,
  getMangasDetail,
} from "../Redux/actions/index";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import styles from "../components/assets/Details/Details.module.css";
import { FaStar } from 'react-icons/fa';
import swal from "sweetalert";
import styleLoading from "../../src/components/assets/Cards/loading.module.css";
import Footer from "../components/Footer";
import { useCurrentUser } from "../domain/useCurrentUserHook";
import RatingRender from '../components/RatingRender';
import RatingStar from "../components/RatingStar";


export default function Details() {
  const dispatch = useDispatch();
  let { id: mangaid } = useParams();
  const manga = useSelector((state) => state.mangasDetails);
  const cart = useSelector((state) => state.cart);
  const isLoading = useSelector((state) => state.isLoading);
  const promotion = new Map(useSelector((state) => state.mangasOnSale));
  const navigate = useNavigate();

  const currentUser = useCurrentUser();
  // console.log("current user: ", currentUser);
  useEffect(() => {
    dispatch(loading());
    dispatch(getMangasDetail());
    dispatch(getDetails(mangaid));
    return () => {
      dispatch(deleteDetails());
    };
  }, [dispatch, mangaid]);

  function handleDelete(e) {
    e.preventDefault();
    dispatch(deleteManga(mangaid));
    dispatch(deleteDetails(mangaid));
    swal("Your Manga was deleted Successfully", {
      button: {
        className:
          "bg-purple-500 p-3 mt-8 text-white hover:bg-white hover:text-purple-700 uppercase font-bold rounded-xl",
      },
    });
    navigate("/home");
  }
  const [currentPage, setCurrentPage] = useState(1);

  function handleAddToCart(mangaid) {
    const itemInCart = cart.find((item) => item.mangaid === mangaid);

    if (itemInCart) {
      if (itemInCart.stockQty === itemInCart.quantity + 1) {
        dispatch(addItemToCart(mangaid, "card_detail"));
        swal(
          "This is the last unit available. Let's go!! do not waste time :)",
          {
            button: {
              className:
                "bg-purple-500 p-3 mt-8 text-white hover:bg-white hover:text-purple-700 uppercase font-bold rounded-xl",
            },
          }
        );
      }

      if (
        itemInCart.stockQty === itemInCart.quantity ||
        itemInCart.stockQty < itemInCart.quantity
      ) {
        swal("Oops!! unavailable. Soon we will have more stock.", {
          button: {
            className:
              "bg-purple-500 p-3 mt-8 text-white hover:bg-white hover:text-purple-700 uppercase font-bold rounded-xl",
          },
        });
      }
      if (itemInCart.stockQty > itemInCart.quantity) {
        dispatch(addItemToCart(mangaid, "card_detail"));
      }
    }

    if (!itemInCart && manga.stockQty > 0) {
      dispatch(addItemToCart(mangaid, "card_detail"));
    }
  }

  const id = manga.mangaid;
  const discount = promotion.has(id);
  const numDiscount = promotion.get(id);

  const reviews = useSelector((state)=> state.reviews);
  
  // const userRev = useSelector((state)=> state.reviews)
  // const user = userRev.map((e)=> e.userId);

  const user = useSelector((state)=> state.users);
console.log(user, "hola")
  // console.log(userRev, "userRev")
  useEffect(()=>{
    dispatch(getReview(mangaid))
    dispatch(getAllUsers())
    // dispatch(getUserReview(user))
  }, [])

  if (!isLoading) {
    return (
      <div>
        <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        {isLoading}
        <div className={styles.detailsContain}>
          <div className={styles.overlay}></div>
          <div className={styles.port}>
            <img
              src={
                manga.posterImage ? (
                  manga.posterImage.small.url
                ) : (
                  <h1>NO HAY IMAGEN</h1>
                )
              }
              alt="your name"
              className={styles.img}
            />
            <div>
              <h1 className={styles.title}>{manga.canonicalTitle}</h1>
              <div className={styles.details}>
                <p className={styles.synopsis}>{manga.synopsis}</p>
                <div className={styles.rating}>
                  <p className="flex">
                    Started date:{" "}
                    {manga.startDate ? (
                      <h5 className="text-blue-600 pl-2">
                        {" "}
                        {manga.startDate}{" "}
                      </h5>
                    ) : (
                      ""
                    )}
                  </p>
                  <p className="flex">
                    State:{" "}
                    {manga.status === "finished" ? (
                      <p className="text-red-600 pl-2">Finished</p>
                    ) : (
                      <p className="text-green-600">In broadcast</p>
                    )}
                  </p>
                  <div className={styles.filter}>
                    <h3 className="flex justify-start">Categories: </h3>
                    <h5 className="flex justify-start">
                      {" "}
                      {manga.categories?.map((e) => (
                        <p className="p-1 ">{e.title}</p>
                      ))}{" "}
                    </h5>
                    <h3 className="flex">Genres: </h3>
                    <h5 className="flex justify-start">
                      {" "}
                      {manga.genres?.map((e) => (
                        <p className="p-2"> {e.name}</p>
                      ))}
                    </h5>
                  </div>
                  <div>
                    {" "}

                      <h1 className={styles.prieces}>
                      { discount? <span> Now: 
                      <b className={styles.prieces2}>${discount? (manga.price * numDiscount).toFixed(2) : manga.price}</b>
                      <b className={styles.prieces3}>${manga.price}</b>
                      </span> :
                      <span className={styles.prieces}>
                      Price: <b className={styles.prieces1}>$ {discount? (manga.price * numDiscount).toFixed(2) : manga.price}</b>
                      </span> }
                  
                    </h1>
                  </div>
                  <div className={styles.stars}>
                    
                      <RatingRender rating={manga.averageRating}/>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3 h-6">
                      {manga.reviewsCount ? manga.reviewsCount : 0}
                    </span>
                  </div>

                  {manga.stockQty >0 && (
                    <div className={styles.buttons}>
                    <Link to="/cart">
                      <button
                        onClick={() => handleAddToCart(mangaid)}
                        className={styles.btns}
                      >
                        Buy
                      </button>
                    </Link>
                    <button
                      onClick={() => handleAddToCart(mangaid)}
                      className={styles.btns}
                    >
                      Add to Cart
                    </button>
                  </div>
                  )
                  }
                  
                  {currentUser?.role === "MASTER" ||
                    (currentUser?.role === "ADMIN" && (
                      <div className={styles.content}>
                        <button
                          className={styles.bttns}
                          onClick={(id) => {
                            handleDelete(id);
                          }}
                        >
                          Delete
                        </button>
                        <h2 className={styles.or}>Or</h2>
                        <Link className={styles.bttns} to={`/form/${mangaid}`}>
                          Update?
                        </Link>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          </div>
          
        <div className="flex justify-center  relative w-10/12 mt-10 m-40 flex-col">
         <h1 className=" text-6xl m-10 ml-0 h-4/12">Reviews :</h1>
            <div className="w-10/12 border-2 overflow-y-scroll bg-white/75 p-10 h-80  self-center">

                  {reviews.length && reviews.map((e)=>{
                   return(
                      <div className="m-5 " >
                            <div className="border-2 border-gray-200 h-0 w-full  "></div>

                        {user.map((f)=> f.id === e.userId && 
                          <div className="flex ml-80 p-2 ">
                            <div>
                              <img src={f.userAvatar} className="w-20  rounded-full mt-6" alt=""/>
                            </div>
                            <div className="flex flex-col">
                              <div className="flex ">
                                  <p className="text-black ml-6 text-3xl">{f.firstname }</p>
                                  <p className="text-black ml-6 text-3xl">{f.lastname}</p>
                               </div>
                              <div className="border-2 w-80 self-center ml-6 h-20">    
                                  <p className="text-black p-1">{e.review}</p>
                              </div>
                              <div className="flex justify-end">
                                {e.rating && 
                                   <div>
                                    <RatingRender rating={(e.rating / 5) * 100 }/>
                                   </div>
                                  }
                              </div>
                            </div>
                          </div> 
                            
                            ) }  
                            <div className="border-2 border-gray-200 h-0 w-full  "></div>
                    </div>
                    )
                    
                  })} 
                 
            </div>
          </div>
        <Footer />
      </div>
    );
  } else {
    return <span className={styleLoading.loader}></span>;
  }
}
