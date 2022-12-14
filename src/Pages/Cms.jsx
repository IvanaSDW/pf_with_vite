import React from 'react';
import logo from '../components/assets/NavBar/ico3.png';
import fotomuestra from '../components/assets/Dashboard/people01.png';
import {
  AiOutlineClose,
  AiFillAppstore,
  AiOutlineBook,
  AiTwotoneAlert,
  AiFillFileAdd,
  AiOutlineLogout,
  AiOutlineArrowDown,
  AiOutlineWhatsApp,
} from 'react-icons/ai';
import { useState } from 'react';
import DarkMode from '../components/assets/NavBar/darkMode';
import CmsPromotions from '../components/CmsPromotions';
import { MdKeyboardBackspace } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAvailableUsers, getDisabledUsers } from '../Redux/actions'; //Ncesito el localhost back abierto
import { disableUser, activeUser } from '../domain/userService';
import CmsUsers from '../components/CmsUsers';
import AllOrders from '../components/AllOrders';
import { FormAdmin } from './FormAdmin';

function Cms() {
  const dispatch = useDispatch();
  const availableUsers = useSelector((state) => state.usersAvailable);
  const disabledUsers = useSelector((state) => state.disabledUsers);

  const [downdrop, setDowndrop] = useState(true);
  const handleClickDrop = () => {
    setDowndrop((downdrop) => !downdrop);
  };
  let toggleClass = downdrop ? 'hidden' : '';

  const [menuItem, setMenuItem] = useState('');

  useEffect(() => {
    dispatch(getAvailableUsers());
    dispatch(getDisabledUsers());
  }, []);

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
        return <CmsPromotions />;
      }

      case 'orders': {
        return <AllOrders />;
      }

      //   case 'products': {
      //     return <FormAdmin />;
      //   }
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
                  <AiFillAppstore />{' '}
                </span>
                <h3 className="font-bold text-gray-200">Users</h3>
              </div>
              <div
                onClick={() => setMenuItem('products')}
                className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursos-pointer hover:bg-purple-600 text-white cursor-pointer"
              >
                <span>
                  {' '}
                  <AiOutlineBook />{' '}
                </span>
                <h3 className="font-bold text-gray-200">Products</h3>
              </div>

              <div
                onClick={() => setMenuItem('orders')}
                className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursos-pointer hover:bg-purple-600 text-white cursor-pointer"
              >
                <span>
                  {' '}
                  <AiFillFileAdd />{' '}
                </span>
                <h3 className="font-bold text-gray-200">Orders</h3>
              </div>
              <div
                onClick={() => setMenuItem('promotions')}
                className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursos-pointer hover:bg-purple-600 text-white cursor-pointer"
              >
                <span>
                  {' '}
                  <AiOutlineLogout />{' '}
                </span>
                <h3 className="font-bold text-gray-200">Promotions</h3>
              </div>
              <div
                className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursos-pointer hover:bg-purple-600 text-white cursor-pointer"
                onClick={() => {
                  handleClickDrop();
                }}
              >
                <span>
                  {' '}
                  <AiTwotoneAlert />{' '}
                </span>
                <h3 className="font-bold text-gray-200 mr-20">Reports</h3>
                <span>
                  {' '}
                  <AiOutlineArrowDown />{' '}
                </span>

                <div className="flex justify-between w-full items-center">
                  <span className="text-sm rotate-180">
                    <i className="bi bi-chevron-down"></i>
                  </span>
                </div>
              </div>
              <div
                className={`text-left text-sm  w-4/5 mx-auto ${toggleClass}`}
                id="submenu"
              >
                <a
                  className="p-2.5 mt-1 flex items-center rounded-md  duration-300 cursos-pointer text-white hover:bg-gray-700"
                  href="https://wa.me/573028405926"
                  target="_blank"
                >
                  <AiOutlineWhatsApp />
                  <h2 className="font-bold cursos-pointer pl-2 pr-4  rounded-md">
                    {' '}
                    Admin1{' '}
                  </h2>
                </a>

                <a
                  className="p-2.5 mt-1 flex items-center rounded-md  duration-300 cursos-pointer text-white hover:bg-gray-700"
                  href="https://wa.me/5491141786108"
                  target="_blank"
                >
                  <AiOutlineWhatsApp />
                  <h2 className="font-bold cursos-pointer pl-2 pr-4  rounded-md ">
                    {' '}
                    Admin2{' '}
                  </h2>
                </a>

                <a
                  className="p-2.5 mt-1 flex items-center rounded-md  duration-300 cursos-pointer text-white hover:bg-gray-700 "
                  href="https://wa.me/525587304585"
                  target="_blank"
                >
                  <AiOutlineWhatsApp />
                  <h2 className="font-bold cursos-pointer pl-2 pr-4 rounded-md ">
                    {' '}
                    Admin2{' '}
                  </h2>
                </a>
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
