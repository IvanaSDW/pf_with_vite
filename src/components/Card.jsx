import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import img from './assets/Cards/yugi.jpg';
import imgSoldOut from './assets/Cards/soldOut4.png';
import { addItemToCart } from '../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import RatingRender from './RatingRender';

const Card = ({
  mangaid,
  canonicalTitle,
  posterImage,
  status,
  startDate,
  price,
  averageRating,
  stockQty,
  reviewsCount,
  promotion,
  discount,
}) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  function handleAddToCart(mangaid) {
    const ItemInCart = cart.find((item) => item.mangaid === mangaid);

    if (ItemInCart) {
      if (stockQty === ItemInCart.quantity + 1) {
        dispatch(addItemToCart(mangaid));
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

      if (stockQty === ItemInCart.quantity || stockQty < ItemInCart.quantity) {
        swal('Oops!! unavailable. Soon we will have more stock.', {
          button: {
            className:
              'bg-purple-500 p-3 mt-8 text-white hover:bg-white hover:text-purple-700 uppercase font-bold rounded-xl',
          },
        });
      }

      if (stockQty > ItemInCart.quantity) {
        dispatch(addItemToCart(mangaid));
      }
    }

    if (!ItemInCart && stockQty > 0) {
      dispatch(addItemToCart(mangaid));
    }
  }

  if (stockQty > 0) {
    return (
      <div className=" group w-64 h-96 bg-white relative flex flex-col justify-between items-center rounded-2xl shadow-3xl mb-8 mr-2">
        {posterImage ? (
          <img
            className="w-full h-full absolute top-0 left-0 rounded-2xl object-cover group-hover:brightness-50"
            src={posterImage}
            alt="click aqui para ver mas"
          />
        ) : (
          <img
            className="w-full h-full absolute top-0 left-0 rounded-2xl object-cover group-hover:brightness-50"
            src={img}
            alt="click aqui para ver mas"
          />
        )}
        <h3 className="z-50 duration-1000 transition ease-in-out text-white bg-slate-800 border-none rounded-b-2xl px-3 text-2xl font-bold absolute bottom-1 group-hover:relative group-hover:top-0 group-hover:translate-y-3 shadow-2xl p-1">
          {canonicalTitle}
        </h3>
        <div className="absolute left-0 bg-red-600 box-border text-white font-sans	text-xl font-semibold mt-16  px-8 rounded-br-3xl ">
          <span>
            {discount
              ? '-' +
                ((1 - Number(discount)) * 100).toFixed(0).toString() +
                '%' +
                ' OFFER!!'
              : null}
          </span>
        </div>
        <div className="absolute left-0 bottom-36 bg-green-600 box-border text-white font-sans	text-xl font-semibold mt-16  px-11  rounded-lg ">
          <span>
            {discount ? 'SALE: $' : null}
            {discount ? (price * discount).toFixed(2) : null}
          </span>
        </div>
        <div className="invisible group-hover:visible z-50 flex flex-col justify-between bg-black opacity-75 w-full p-4 border-none rounded-b-2xl transition ease-out duration-1000 group-hover:translate-y-2">
          <p className="text-white text-xs">Start Date: {startDate}</p>
          <p className="text-white text-xs">Status: {status}</p>
          <div className="flex items-center mt-2">
            {reviewsCount ? (
              <RatingRender rating={averageRating} />
            ) : (
              [...Array(5)].map((star, i) => {
                return (
                  <div className="text-gray-200 flex  overflow-hidden ">
                    <FaStar size={27} />
                  </div>
                );
              })
            )}
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
              {reviewsCount ? reviewsCount : 0}
            </span>
          </div>
          <div className="flex items-center justify-between pt-2">
            <span className="text-2xl font-bold text-red-400 dark:text-white line-through decoration-red-600">
              {discount ? price : null}
            </span>
            <span className="text-2xl font-bold text-gray-100 dark:text-white ">
              {discount ? null : price}
            </span>
            <button
              onClick={() => handleAddToCart(mangaid)}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add to cart
            </button>
            <Link to={`/manga/${mangaid}`}>
              <button className="text-white text-base text-center font-bold">
                +
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className=" group w-64 h-96 bg-white relative flex flex-col justify-between items-center rounded-2xl shadow-3xl mb-8 mr-2">
        {posterImage ? (
          <div>
            <img
              src={imgSoldOut}
              className="absolute top-0 right-0 h-full w-full z-50 bg-black/60  rounded-2xl"
              alt="image sold out"
            />
            <img
              className="w-full h-full absolute top-0 left-0 rounded-2xl object-cover group-hover:brightness-50"
              src={posterImage}
              alt="click aqui para ver mas"
            />
          </div>
        ) : (
          <div>
            <img
              className="w-full h-full absolute top-0 left-0 rounded-2xl object-cover group-hover:brightness-50"
              src={img}
              alt="click aqui para ver mas"
            />
            <img
              className="absolute top-0 right-0 h-20 opacity-90 z-50"
              src={imgSoldOut}
              alt="image sold out"
            />
          </div>
        )}
        <h3 className="z-50 duration-1000 transition ease-in-out text-white bg-slate-800 border-none rounded-b-2xl px-3 text-2xl font-bold absolute bottom-1 group-hover:relative group-hover:top-0 group-hover:translate-y-3 shadow-2xl p-1">
          {canonicalTitle}
        </h3>
        <div className="invisible group-hover:visible z-50 flex flex-col justify-between bg-black opacity-75 w-full p-4 border-none rounded-b-2xl transition ease-out duration-1000 group-hover:translate-y-2">
          <p className="text-white text-xs">Start Date: {startDate}</p>
          <p className="text-white text-xs">Status: {status}</p>
          <div className="flex items-center mt-2">
            <RatingRender rating={averageRating} />

            <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
              {averageRating ? averageRating : 0}
            </span>
          </div>
          <div className="flex items-center justify-between pt-2">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {price}
            </span>
            <Link to={`/manga/${mangaid}`}>
              <button className="text-white text-base text-center font-bold">
                +
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
};

export default Card;
