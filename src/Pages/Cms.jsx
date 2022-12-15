import React from 'react';
import logo from '../components/assets/NavBar/ico3.png';
import { AiOutlineShoppingCart, AiOutlineDatabase } from 'react-icons/ai';

import { FiUsers } from 'react-icons/fi';
import { useState } from 'react';
import DarkMode from '../components/assets/NavBar/darkMode';
import CmsPromos from '../components/CmsPromos';
import { MdKeyboardBackspace, MdOutlineLocalOffer } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAvailableUsers, getDisabledUsers } from '../Redux/actions'; //Ncesito el localhost back abierto
import CmsUsers from '../components/CmsUsers';
import CmsOrders from '../components/CmsOrders';
import CmsProducts from '../components/CmsProducts';
import swal from 'sweetalert';

function Cms() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const availableUsers = useSelector((state) => state.usersAvailable);
  const disabledUsers = useSelector((state) => state.disabledUsers);
  const userRole = useSelector((state) => state.userRole);

  const [menuItem, setMenuItem] = useState('');

  useEffect(() => {
    dispatch(getAvailableUsers());
    dispatch(getDisabledUsers());
  }, []);

  const renderSwitch = (activeMenu) => {
    switch (menuItem) {
      case 'users': {
        return (
          <CmsUsers
            availableUsers={availableUsers}
            disabledUsers={disabledUsers}
          />
        );
      }
      case 'promotions': {
        return <CmsPromos />;
      }

      case 'orders': {
        return <CmsOrders />;
      }

      case 'addproduct': {
        return <CmsProducts />;
        // return <FormAdmin />;
      }
      default: {
        return (
          <CmsUsers
            availableUsers={availableUsers}
            disabledUsers={disabledUsers}
          />
        );
      }
    }
  };

  if (!userRole) {
    return <>Loading....</>;
  } else {
    if (userRole !== 'ADMIN') {
      navigate('/home');
      swal('You need to be logged in as ADMIN to access CMS Panel.').then(
        () => {}
      );
    }
  }

  return (
    <div>
      <div className="flex bg-white-600 h-screen w-screen">
        <div className="sidebar top-0 bottom-0 lg:left-0 p-2 rounded-br-full text-center bg-gray-900 w-1/6">
          <Link to="/home">
            <button className="cursor-pointer text-white text-lg m-2 bg-purple-600 h-9 pointer rounded-full flex justify-center p-2">
              <MdKeyboardBackspace />
            </button>
          </Link>
          <aside className="text-gray-100 text-l mx-1">
            <div className="w-fit h-fit">
              <div className="flex rounded-md duration-300 cursor-pointer bg-gray-700 mt-4 align-middle, items-center w-fit px-4">
                <img src={logo} alt="prueba" className="w-[40px] h-[41px]" />
                <h2 className="font-bold text-amber-400 my-auto ml-2">
                  My Manga
                </h2>
              </div>

              <div
                onClick={() => setMenuItem('users')}
                className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursos-pointer hover:bg-purple-600 text-white cursor-pointer"
              >
                <span>
                  {' '}
                  <FiUsers />{' '}
                </span>
                <h3 className="font-bold text-gray-200 ml-2">Users</h3>
              </div>
              <div
                onClick={() => setMenuItem('orders')}
                className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursos-pointer hover:bg-purple-600 text-white cursor-pointer"
              >
                <span>
                  {' '}
                  <AiOutlineShoppingCart />{' '}
                </span>
                <h3 className="font-bold text-gray-200 ml-2">Orders</h3>
              </div>
              <div
                onClick={() => setMenuItem('promotions')}
                className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursos-pointer hover:bg-purple-600 text-white cursor-pointer"
              >
                <span>
                  {' '}
                  <MdOutlineLocalOffer />{' '}
                </span>
                <h3 className="font-bold text-gray-200 ml-2">Promotions</h3>
              </div>
              <div
                onClick={() => setMenuItem('addproduct')}
                className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursos-pointer hover:bg-purple-600 text-white cursor-pointer"
              >
                <span>
                  {' '}
                  <AiOutlineDatabase />{' '}
                </span>
                <h3 className="font-bold text-gray-200 ml-2">Products</h3>
              </div>
            </div>
          </aside>
        </div>

        <div className="w-5/6 mt-0 p-3 ">
          <div className="flex justify-between ">
            <h1 className="text-black-100 text-xl font-bold pb-4">CMS Panel</h1>
            <div className="w-fit h-fit text-gray-600 mr-8">
              <DarkMode />
            </div>
          </div>
          {renderSwitch()}
        </div>
      </div>
    </div>
  );
}

export default Cms;
