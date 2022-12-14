import React, { useEffect, useState } from 'react';
import RatingStar from './RatingStar';

const CmsOrderCard = ({ order, showDetail }) => {
  return (
    <>
      <div className="justify-center w-full border-white" key={order.id}>
        <div className="w-full bg-slate-600 grid grid-cols-4 px-4 py-1">
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

          <div>
            <p
              className="italic text-red-600 underline cursor-pointer"
              onClick={() => showDetail(false)}
            >
              Close
            </p>
          </div>
        </div>
        {order.orderItems.length &&
          order.orderItems.map((item) => {
            return (
              <div className="my-6 " key={item.id}>
                <div className="grid grid-cols-5 gap-x-4 mx-3 align-middle">
                  <img
                    src={item.mangaPosterImage}
                    alt="poster"
                    className="max-h-20 rounded-md"
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
                </div>
              </div>
            );
          })}
      </div>

      <div className="w-full border-2 border-gray-500"></div>
    </>
  );
};

export default CmsOrderCard;
