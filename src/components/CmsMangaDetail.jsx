import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDetails,
  deleteDetails,
  deleteManga,
  loading,
  addItemToCart,
  getMangasDetail,
} from '../Redux/actions/index';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import styles from '../components/assets/Details/Details.module.css';

import swal from 'sweetalert';
import styleLoading from '../../src/components/assets/Cards/loading.module.css';
import { useCurrentUser } from '../domain/useCurrentUserHook';
import RatingRender from '../components/RatingRender';

const CmsMangaDetail = ({ mangaid, showMangaDetail }) => {
  const dispatch = useDispatch();
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
    const itemInCart = cart.find((item) => item.mangaid === mangaid);

    if (itemInCart) {
      if (itemInCart.stockQty === itemInCart.quantity + 1) {
        dispatch(addItemToCart(mangaid, 'card_detail'));
        swal(
          "This is the last unit available. Let's go!! do not waste time :)",
          {
            button: {
              className:
                'bg-purple-500 p-3 mt-8 text-white hover:bg-white hover:text-purple-700 uppercase font-bold rounded-xl',
            },
          }
        );
      }

      if (
        itemInCart.stockQty === itemInCart.quantity ||
        itemInCart.stockQty < itemInCart.quantity
      ) {
        swal('Oops!! unavailable. Soon we will have more stock.', {
          button: {
            className:
              'bg-purple-500 p-3 mt-8 text-white hover:bg-white hover:text-purple-700 uppercase font-bold rounded-xl',
          },
        });
      }
      if (itemInCart.stockQty > itemInCart.quantity) {
        dispatch(addItemToCart(mangaid, 'card_detail'));
      }
    }

    if (!itemInCart && manga.stockQty > 0) {
      dispatch(addItemToCart(mangaid, 'card_detail'));
    }
  }

  const id = manga.mangaid;
  const discount = promotion.has(id);
  const numDiscount = promotion.get(id);

  if (!isLoading) {
    return (
      <div>
        <div
          className="flex cursor-pointer"
          onClick={() => showMangaDetail(false)}
        >
          <h1 className="underline text-red-600 italic mr-0">Close</h1>
        </div>
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
                <div className="justify-evenly items-center">
                  <p className="flex">
                    Started date:{' '}
                    {manga.startDate ? (
                      <h5 className="text-blue-600 pl-2">
                        {' '}
                        {manga.startDate}{' '}
                      </h5>
                    ) : (
                      ''
                    )}
                  </p>
                  <p className="flex">
                    State:{' '}
                    {manga.status === 'finished' ? (
                      <p className="text-red-600 pl-2">Finished</p>
                    ) : (
                      <p className="text-green-600">In broadcast</p>
                    )}
                  </p>
                  <div className={styles.filter}>
                    <h3 className="flex justify-start">Categories: </h3>
                    <h5 className="flex justify-start">
                      {' '}
                      {manga.categories?.map((e) => (
                        <p className="p-1 ">{e.title}</p>
                      ))}{' '}
                    </h5>
                    <h3 className="flex">Genres: </h3>
                    <h5 className="flex justify-start">
                      {' '}
                      {manga.genres?.map((e) => (
                        <p className="p-2"> {e.name}</p>
                      ))}
                    </h5>
                  </div>
                  <div>
                    {' '}
                    <h1 className={styles.prieces}>
                      {discount ? (
                        <span>
                          {' '}
                          Now:
                          <b className={styles.prieces2}>
                            $
                            {discount
                              ? (manga.price * numDiscount).toFixed(2)
                              : manga.price.toFixed(2)}
                          </b>
                          <b className={styles.prieces3}>${manga.price}</b>
                        </span>
                      ) : (
                        <span className={styles.prieces}>
                          Price:{' '}
                          <b className={styles.prieces1}>
                            ${' '}
                            {discount
                              ? (manga.price * numDiscount).toFixed(2)
                              : manga.price}
                          </b>
                        </span>
                      )}
                    </h1>
                  </div>
                  <div className={styles.stars}>
                    <RatingRender rating={manga.averageRating} />
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3 h-6">
                      {manga.averageRating ? manga.averageRating : 0}
                    </span>
                  </div>

                  {currentUser?.role === 'MASTER' ||
                    (currentUser?.role === 'ADMIN' && (
                      <div className="flex w-fit mt-4">
                        <div className={styles.content}>
                          <button
                            className="mx-6"
                            onClick={(id) => {
                              handleDelete(id);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                        <div className={styles.content}>
                          <Link className="mx-6" to={`/form/${mangaid}`}>
                            Update
                          </Link>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <span className={styleLoading.loader}></span>;
  }
};

export default CmsMangaDetail;
