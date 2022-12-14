import React, { useState } from 'react';
import { useEffect } from 'react';
import { ImStatsDots } from 'react-icons/im';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUserOrders } from '../Redux/actions';
import CmsOrderCard from './CmsOrderCard';
import OrderCard from './OrderCard';

function CmsOrders() {
  const dispatch = useDispatch();
  const allorders = useSelector((state) => state.allorders);

  const [renderOrders, setRenderOrders] = useState([allorders]);

  const [orderToRender, setOrderToRender] = useState(false);

  const filterCompleted = () => {
    const orders = allorders.filter((order) => {
      return order.status === 'completed';
    });
    setRenderOrders(orders);
  };

  const filterRejected = () => {
    const orders = allorders.filter((order) => order.status === 'rejected');
    setRenderOrders(orders);
  };

  useEffect(() => {
    dispatch(getAllUserOrders());
  }, []);

  useEffect(() => {
    setRenderOrders(allorders);
  }, [allorders]);

  const showOrder = () => {
    return (
      <CmsOrderCard
        order={orderToRender}
        showDetail={setOrderToRender}
        className="w-[50vw]"
      />
    );
  };

  return (
    <div>
      {orderToRender ? (
        showOrder()
      ) : (
        <div className="bg-white-600 rounded-md p-5 mr-10 w-[1000px] h-[680px]  overflow-auto shadow-2xl border-gray-200 border-2 cursor-move">
          <div className="flex py-4 pl-4 rounded-md  justify-between duration-300 cursor-pointer bg-gradient-to-r from-gray-300 to-white-500 ">
            <div className="flex">
              <div className="p-1 w-[31px] h-[31px] object-contain rounded-full bg-teal-300 ">
                <ImStatsDots className="mr-4" />
              </div>
              <div className="ml-4 flex text-gray-600">
                <h1 className="text-gray-600 text-xl font-bold">Orders</h1>
              </div>
            </div>
            <div className="flex self-end mr-4">
              <div className="ml-4 flex text-gray-600">
                <h1
                  className="text-slate-400 text-sm"
                  onClick={() => setRenderOrders(allorders)}
                >
                  All
                </h1>
              </div>
              <div
                className="ml-4 flex text-gray-600"
                onClick={() => filterCompleted()}
              >
                <h1 className="text-slate-400 text-sm">Completed</h1>
              </div>
              <div
                className="ml-4 flex text-gray-600"
                onClick={() => filterRejected()}
              >
                <h1 className="text-slate-400 text-sm">Rejected</h1>
              </div>
            </div>
          </div>

          <div className="rounded-md p-2 mt-2 lista de activeusers ">
            <div>
              {renderOrders.map((o) => {
                return (
                  <div className="mt-3 mb-3  p-0.5 pt-2 rounded-md  duration-300  bg-gray-200 pb-3">
                    <span className="text-gray-600 text-base font-bold pl-2 ">
                      Order Id:{' '}
                      <h2
                        onClick={() => setOrderToRender(o)}
                        className="text-gray-600 text-base font-semibold inline-block cursor-pointer underline"
                      >
                        {o.id}
                      </h2>
                    </span>
                    <div className="md:flex-row flex-col pl-1 mt-1 mb-0 border-t-[1px] border-t-[#3F3E45] ">
                      <div className="flex flex-row md:mt-0 " />
                    </div>
                    <span className="text-gray-600 text-base font-bold pl-2">
                      UserId:{' '}
                      <h2 className="text-gray-600 text-base font-semibold inline-block">
                        {o.userId}
                      </h2>
                    </span>
                    <div className="md:flex-row flex-col pl-1 mt-1 mb-0 border-t-[1px] border-t-[#3F3E45] ">
                      <div className="flex flex-row md:mt-0 " />
                    </div>
                    <span className="text-gray-600 text-base font-bold pl-2">
                      Total: $
                      <h2 className="text-gray-600 text-base font-semibold inline-block">
                        {Number(o.total).toFixed(2)}
                      </h2>
                    </span>
                    <div className="md:flex-row flex-col pl-1 mt-1 mb-0 border-t-[1px] border-t-[#3F3E45] ">
                      <div className="flex flex-row md:mt-0 " />
                    </div>
                    <span className="text-gray-600 text-base font-bold pl-2">
                      Status:{' '}
                      <h2 className="text-gray-600 text-base font-semibold inline-block">
                        {o.status}
                      </h2>
                    </span>
                    <div className="md:flex-row flex-col pl-1 mt-1 mb-0 border-t-[1px] border-t-[#3F3E45] ">
                      <div className="flex flex-row md:mt-0 " />
                    </div>
                    <span className="text-gray-600 text-base font-bold pl-2">
                      Created At:{' '}
                      <h2 className="text-gray-600 text-base font-semibold inline-block">
                        {o.createdAt}
                      </h2>
                    </span>
                    <div className="md:flex-row flex-col pl-1 mt-1 mb-0 border-t-[1px] border-t-[#3F3E45] ">
                      <div className="flex flex-row md:mt-0 " />
                    </div>
                    <span className="text-gray-600 text-base font-bold pl-2">
                      <h2 className="mb-2">Order Items:</h2>

                      <div className="text-gray-600 text-base font-semibold inline-block flex">
                        {o.orderItems?.map((e) => {
                          return (
                            <div className="pl-1 pr-1  mr-2 dark:text-gray-400 italic border-2 border-red-500 rounded-md text-gray-600">
                              <h2> Id: {e.id} </h2>
                              <h2> Quantity: {e.quantity} </h2>
                              <h2> Title: {e.mangaTitle} </h2>
                            </div>
                          );
                        })}
                      </div>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CmsOrders;
