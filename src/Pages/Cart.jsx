import React, { useState, useEffect } from 'react';
import NavBar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import img from '../components/assets/Cards/yugi.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Card from '../components/Card.jsx';
import {
  getMangas,
  resetCart,
  DeleteCart,
  sumItemToCart,
  restItemToCart,
  addItemToCart,
  filterMangaByDate,
  getMangasOnSale,
} from '../Redux/actions/index.js';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import Checkout from '../components/Checkout.jsx';
import styles from '../components/assets/cart/cart.module.css';

export default function Cart() {
  const [currentPage, setCurrentPage] = useState(1);
  const cart = useSelector((state) => state.cart);
  const dateList = useSelector((state) => state.DateListMangas);
  const latest10 = dateList
    .filter((manga) => {
      return manga.stockQty > 2;
    })
    .slice(0, 5);
  const [quantity, setCurrent] = useState(window.localStorage.getItem('items'));
  const promotions = new Map(useSelector((state) => state.mangasOnSale));
  const setLocalStorage = (value) => {
    try {
      setCurrent(value);
      window.localStorage.setItems('items', value);
    } catch (error) {
      swal(error);
    }
  };

  console.log('carrito silvi', cart);
  //// sum - resr product ////

  function sumContador(mangaid) {
    const itemCart = cart.find((item) => item.mangaid === mangaid);
    if (itemCart.stockQty === itemCart.quantity + 1) {
      dispatch(addItemToCart(mangaid));
      swal("This is the last unit available. Let's go!! do not waste time :)", {
        button: {
          className:
            'bg-purple-500 p-3 mt-8 text-white hover:bg-white hover:text-purple-700 uppercase font-bold rounded-xl',
        },
      });
    } else if (itemCart.stockQty === itemCart.quantity) {
      swal('This is the last unit available.', {
        button: {
          className:
            'bg-purple-500 p-3 mt-8 text-white hover:bg-white hover:text-purple-700 uppercase font-bold rounded-xl',
        },
      });
    } else {
      dispatch(addItemToCart(mangaid));
    }
  }

  function resContador(mangaid) {
    const itemRest = cart.find((item) => item.mangaid === mangaid);
    if (itemRest.quantity === 1) {
      swal({
        text: 'To delete press "Remove".',
        button: {
          text: 'Okey!',
        },
      });
    } else {
      dispatch(restItemToCart(mangaid));
    }
  }

  function handleResetCart() {
    Swal.fire({
      title: 'Do you sure to delete all items?',
      showDenyButton: true,
      confirmButtonText: 'Sure',
      denyButtonText: `Cancel`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(resetCart());
      }
    });
  }

  function handleDelete(mangaid) {
    swal({
      title: 'Are you sure?',
      text: 'Once remove from your cart!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(DeleteCart(mangaid));
        swal('Poof! Your product has been remove from your cart!', {
          icon: 'success',
        });
      } else {
        swal('Your product has been saved in your cart!');
      }
    });
  }

  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].price)
      totalPrice =
        totalPrice +
        cart[i]?.quantity *
          (promotions.get(cart[i].mangaid)
            ? promotions.get(cart[i].mangaid) * cart[i]?.price
            : cart[i]?.price);
  }

  ///// Recomended /////
  const dispatch = useDispatch();
  let { id } = useParams();
  const mangas = useSelector((state) => state.mangas);

  // function handleDeleteItem(mangaid){
  //     dispatch(deleteItemOfCart(mangaid))
  // }

  useEffect(() => {
    dispatch(getMangas());
    dispatch(filterMangaByDate());
    dispatch(getMangasOnSale());
  }, [dispatch]);

  const [payment, setPaymet] = useState(false); //para checkout
  return (
    <div>
      <NavBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="flex flex-col  font-serif">
        <div className="w-3/6 h-80 overflow-y-scroll rounded-md  self-center  mt-8 flex  justify-center ">
          <Checkout
            payment={payment}
            setPaymet={setPaymet}
            cart={cart}
            totalPrice={totalPrice}
          >
            <button
              onClick={() => setPaymet(!payment)}
              className="absolute text-purple-600 top-5 right-5 w-10 h-10 pointer border-2 border-purple-600 p-1 rounded-md hover:bg-purple-600 hover:text-white"
            >
              {' '}
              X{' '}
            </button>
          </Checkout>
          <div className={styles.scroll}>
            <div className="w-full  h-7/12 ">
              <div className="m-3 h-6/12 flex flex-col justify-center font-serif">
                {cart.length ? (
                  cart.map((e) => {
                    return (
                      <div className=" flex ">
                        <div className="w-full border-gray-300 rounded-md mt-2 border-2 flex font-serif  justify-between">
                          <div className="w-20 m-3 ">
                            <img
                              value={quantity}
                              onChange={(e) => setLocalStorage(e.target.value)}
                              src={
                                e.posterImage ? e.posterImage.small.url : img
                              }
                              alt=""
                            />
                          </div>
                          <div>
                            <h1
                              className="text-3xl font-serif mt-3"
                              onChange={(e) => setLocalStorage(e.target.value)}
                              value={quantity}
                            >
                              Product: {e.canonicalTitle}
                            </h1>
                            <div className="flex">
                              <h3
                                className="text-3xl font-serif"
                                onChange={(e) =>
                                  setLocalStorage(e.target.value)
                                }
                                value={quantity}
                              ></h3>
                              <h3 className="text-green-400 text-3xl font-arial mt-2">
                                U$D {e.price}
                              </h3>
                              {promotions.has(e.mangaid) ? (
                                <h3 className="text-red-00 text-3xl font-arial mt-2 text-red-600">
                                  {'-' +
                                    (
                                      (1 - Number(promotions.get(e.mangaid))) *
                                      100
                                    )
                                      .toFixed(0)
                                      .toString() +
                                    '%'}
                                </h3>
                              ) : (
                                ''
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col ml-4">
                            <div className=" flex">
                              <button
                                onClick={() => resContador(e.mangaid)}
                                className="w-7  h-7 mr-3 rounded-md bg-purple-600 mt-3 text-white"
                              >
                                -
                              </button>
                              <input
                                type="text"
                                className="w-10 h-7 p-2 rounded-md bg-purple-600 text-white p-3 mt-3"
                                value={e.quantity}
                              />

                              <button
                                onClick={() => sumContador(e.mangaid)}
                                className="w-7 h-7  rounded-md bg-purple-600 m-3 text-white"
                              >
                                +
                              </button>
                            </div>
                            <div className="flex ">
                              <span className="mt-2">U$D</span>
                              <span
                                className=" mr-3 rounded-md p-2 bg-purple-600 ml-4 w-5/6 text-white "
                                onChange={(e) =>
                                  setLocalStorage(e.target.value)
                                }
                                value={quantity}
                              >
                                {(promotions.has(e.mangaid)
                                  ? e.price *
                                    e.quantity *
                                    promotions.get(e.mangaid)
                                  : e.price * e.quantity
                                ).toFixed(2)}
                              </span>
                            </div>

                            <button
                              onClick={() => handleDelete(e.mangaid)}
                              className=" pt-1 ml-10 flex mt-3 justify-center  w-20  rounded-md hover:bg-red-500 mt-1 h-9 bg-red-600 border-red-600 border-2 text-white"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <h1 className="text-3xl m-5 text-purple-600 font-mono">
                    You haven't added mangas to your cart yet
                  </h1>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center w-3/6 m-auto">
          <button
            onClick={(mangaid) => handleResetCart(mangaid)}
            className=" flex self-end w-fit px-4 py-1 m-2 text-lg hover:bg-red-500 rounded-md bg-red-600 border-red-600 border-2 text-white"
          >
            Clear Cart
          </button>
          <div className=" w-fit self-center h-10/12  rounded-md p-2   flex ">
            Total:{' '}
            <span className="text-5xl text-green-600 self-center ">
              U$D {totalPrice.toFixed(2)}
            </span>
            {cart.length !== 0 && (
              <button
                onClick={() => setPaymet(true)}
                className="bg-purple-600 text-white m-5 mt-10 text-2xl p-5 rounded-md w-fit hover:bg-purple-400"
              >
                Proceed to Payment!
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="mt-10">
        <h1 className="text-4xl p-7 ">LATEST RELEASES :</h1>
        <div className="flex justify-center">
          <div className="flex overflow-x-scroll  w-8/12">
            {!payment && (
              <div className="flex justify-center ">
                {dateList.length &&
                  latest10.map((e) => {
                    return (
                      <Card
                        key={e.mangaid}
                        mangaid={e.mangaid}
                        canonicalTitle={e.canonicalTitle}
                        posterImage={
                          e.posterImage
                            ? e.posterImage.small.url
                            : e.posterImage
                            ? e.posterImage
                            : img
                        }
                        promotion={promotions.has(e.mangaid)}
                        discount={promotions.get(e.mangaid)}
                        startDate={e.startDate}
                        price={e.price}
                        status={e.status}
                        averageRating={e.averageRating}
                        stockQty={e.stockQty}
                      />
                    );
                  })}{' '}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-9 bottom-0">
        <Footer />
      </div>
    </div>
  );
}
