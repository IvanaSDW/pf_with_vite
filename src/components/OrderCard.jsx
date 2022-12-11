import React, { useState } from 'react';

const OrderCard = ({ order }) => {
  ////// ADD REVIEW/////////
  const [showReviewForm, setShowReviewForm] = useState(false);

  function toggleModalReview() {
    setShowReviewForm(!showReviewForm);
  }

  const addReview = (review) => {
    alert('Adding review...');
  };

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
            <p>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              {order.status === 'completed' ? (
                <p className="text-green-600">{order.status === 'rejected'}</p>
              ) : (
                <p className="text-red-600">{order.status}</p>
              )}
            </p>
          </div>
          <div>
            <p className="font-bold">{'Total: '}</p>
            <p>{`$${order.total}`}</p>
          </div>
        </div>
        {order.orderItems.length &&
          order.orderItems.slice(0, 3).map((item) => {
            return (
              <div className="my-6">
                <div>
                  {showReviewForm && item.id && (
                    <div>
                      <div className="flex flex-row w-full p-60 h-full fixed top-0 left-0 bg-black/60">
                        <div className="flex flex-row h-80 w-full bg-white relative justify-center items-center">
                          <button
                            onClick={toggleModalReview}
                            className="absolute bg-purple-600 right-60 p-5"
                          >
                            Cancel
                          </button>

                          <div>
                            <form action="submit">
                              <img
                                src={item.mangaPosterImage}
                                className="w-40 "
                                alt=""
                              />
                              <button
                                type="button"
                                onClick={addReview}
                                className="absolute bg-purple-600 right-60 p-5"
                              >
                                Add
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-5 gap-x-4 mx-3 align-middle">
                  <img
                    src={item.mangaPosterImage}
                    alt="poster"
                    className="max-h-20 rounded-full"
                  />
                  <div className="flex flex-col col-span-3 ">
                    <p> {item.mangaTitle}</p>
                    <p> Qty : {item.quantity}</p>
                    <p className="flex ">
                      {' '}
                      Price:{' '}
                      <p className="text-green-600 pl-2">${item.price}</p>
                    </p>
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
