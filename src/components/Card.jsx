import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import img from './assets/Cards/yugi.jpg';
import { addItemToCart } from '../Redux/actions';
import { useDispatch /*, useSelector-*/ } from 'react-redux';
//import { useEffect } from "react";

const Card = ({
  mangaid,
  canonicalTitle,
  posterImage,
  status,
  startDate,
  price,
  averageRating,
}) => {
  const dispatch = useDispatch();
  //const carrito = useSelector((state => state.cart))

  function handleAddToCart(mangaid) {
    dispatch(addItemToCart(mangaid));
  }

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
      <div className="invisible group-hover:visible z-50 flex flex-col justify-between bg-black opacity-75 w-full p-4 border-none rounded-b-2xl transition ease-out duration-1000 group-hover:translate-y-2">
        <p className="text-white text-xs">Start Date: {startDate}</p>
        <p className="text-white text-xs">Status: {status}</p>
        <div className="flex items-center mt-2">
          <svg
            className="w-4 h-4 text-yellow-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <FaStar />
          </svg>
          <svg
            className="w-4 h-4 text-yellow-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <FaStar />
          </svg>
          <svg
            className="w-4 h-4 text-yellow-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <FaStar />
          </svg>
          <svg
            className="w-4 h-4 text-yellow-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <FaStar />
          </svg>
          <svg
            className="w-4 h-4 text-yellow-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <FaStar />
          </svg>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
            {averageRating ? averageRating : 0}
          </span>
        </div>
        <div className="flex items-center justify-between pt-2">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {price}
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
};

export default Card;
