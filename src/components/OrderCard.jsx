import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import swal from 'sweetalert';
import { SERVER_URL } from '../domain/serverConfig';
import firebase from '../domain/userService';
import RatingStar from './RatingStar';

const OrderCard = ({ order }) => {
  ////// ADD REVIEW/////////
  const [showReviewForm, setShowReviewForm] = useState(false);
  const firebaseUser = useSelector((state) => state.firebaseUser);

  function toggleModalReview() {
    setShowReviewForm(!showReviewForm);
  }

  const [rating, setRating] = useState();
  const [review, setReview] = useState('');
  const [submitEnabled, setSubmitEnabled] = useState(false);

  const addReview = async (mangaId) => {
    firebase
      .auth()
      .currentUser.getIdToken()
      .then((token) => {
        axios
          .post(
            `${SERVER_URL}/review/`,
            {
              review,
              rating,
              userId: firebaseUser.uid,
              mangaMangaid: mangaId,
            },
            {
              headers: {
                AuthToken: token,
              },
            }
          )
          .then((response) => {
            swal('Your review was succesfully saved! -> ', response);
            toggleModalReview();
            setRating('');
            setReview('');
          })
          .catch((err) => {
            console.log('err: ', err.response.data);
          });
      });
  };

  const handleRatingChange = (value) => {
    if (isNaN(value)) return;
    if (value < 1 || value > 5) return;
    setRating(value);
  };
  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  useEffect(() => {
    if (rating >= 1 && rating <= 5 && review.trim().length >= 10) {
      setSubmitEnabled(true);
    } else {
      setSubmitEnabled(false);
    }
  }, [rating, review]);

  return (
    <>
      <div className="justify-center w-full mr-20 mt-0 mb-6" key={order.id}>
        <div className="w-full bg-slate-600 grid grid-cols-3 px-4 py-1">
          <div>
            <p className="font-bold">{'Order date: '}</p>
            <p>{order.createdAt.slice(0, 10)}</p>
          </div>
          <div>
            <p className="font-bold">Status:</p>
            <div>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              {order.status === 'completed' ? (
                <p className="text-green-600">{order.status === 'rejected'}</p>
              ) : (
                <p className="text-red-600">{order.status}</p>
              )}
            </div>
          </div>
          <div>
            <p className="font-bold">{'Total: '}</p>
            <p>{`$${order.total}`}</p>
          </div>
        </div>
        {order.orderItems.length &&
          order.orderItems.map((item) => {
            return (
              <div className="my-6 " key={item.id}>
                {showReviewForm && item.id && (
                  <div className="w-full p-60 h-full fixed top-0  left-0">
                    <form className="h-80 rounded-md w-full bg-slate-500 relative p-5 justify-center items-center grid grid-cols-5 grid-rows-4 grid-flow-col gap-4">
                      <div className="row-span-3 col-span-1">
                        <img
                          src={item.mangaPosterImage}
                          className="w-40 "
                          alt=""
                        />
                      </div>
                      <div className="row-span-1 col-span-1 ">
                        <label
                          htmlFor="rating"
                          className="text-sm text-yellow-300"
                        >
                          Your rating{' '}
                        </label>
                        <RatingStar
                          rating={rating}
                          setRating={handleRatingChange}
                        />
                      </div>

                      <div className="col-span-4 row-span-1">
                        <p className="text-3xl">{item.mangaTitle}</p>
                      </div>

                      <div className="row-span-2 col-span-4 w-full flex flex-wrap">
                        <label htmlFor="review" className="w-full">
                          Write your review{' '}
                        </label>
                        <textarea
                          type="text"
                          className="bg-slate-600 w-full text-gray-200 p-2"
                          name="review"
                          value={review}
                          onChange={handleReviewChange}
                        />
                        <p className="italic text-sm">
                          ¡ Add at least 10 chars in your review !
                        </p>
                      </div>
                      <div className="col-span-2 justify-center items-center ml-9">
                        <button
                          onClick={toggleModalReview}
                          className="bg-purple-600 px-10 py-2 rounded-xl"
                        >
                          Cancel
                        </button>
                      </div>
                      <div className="col-span-2">
                        <button
                          type="button"
                          onClick={() => addReview(item.mangaMangaid)}
                          className={
                            submitEnabled
                              ? 'bg-purple-600 px-10 py-2 rounded-xl'
                              : 'bg-purple-300 px-10 py-2 rounded-xl'
                          }
                          disabled={!submitEnabled}
                        >
                          Add
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                <div className="grid grid-cols-5 gap-x-4 mx-3 align-middle">
                  <img
                    src={item.mangaPosterImage}
                    alt="poster"
                    className="max-h-20 rounded-full"
                  />
                  <div className="flex flex-col col-span-3 ">
                    <p> {item.mangaTitle}</p>
                    <p> Qty : {item.quantity}</p>
                    <div className="flex ">
                      {' '}
                      Price:{' '}
                      <p className="text-green-600 pl-2">${item.price}</p>
                    </div>
                  </div>
                  <button
                    className="text-purple-400 hover:underline"
                    onClick={toggleModalReview}
                  >
                    Add Review
                  </button>
                </div>
              </div>
            );
          })}
      </div>

      <div className="w-full border-2 border-gray-500"></div>
    </>
  );
};

export default OrderCard;
