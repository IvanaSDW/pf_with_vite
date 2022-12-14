import React from 'react';
import { BiUserX, BiUserCheck, BiUserPin } from 'react-icons/bi';
import { FaUserAltSlash, FaUserCheck } from 'react-icons/fa';
import { disableUser, activeUser } from '../domain/userService';

const CmsUsers = ({ availableUsers, disabledUsers }) => {
  //sweet alert
  const confirmation2 = (id) => {
    //BOTON PARA REACTIVAR
    swal({
      title: 'Ey',
      text: '¿Do you want to reactive this user?',
      icon: 'warning',
      buttons: ['No', 'Si'],
    }).then((r) => {
      if (r) {
        activeUser(id);
        swal({
          text: 'The user has been reactivated!',
          icon: 'success',
        });
      }
    });
  };

  const confirmation1 = (id) => {
    //BOTON PARA DESACTIVA
    swal({
      title: 'Ey',
      text: '¿Do you want to disable this user?',
      icon: 'warning',
      buttons: ['No', 'Si'],
    }).then((r) => {
      if (r) {
        disableUser(id);
        swal({
          text: 'The user has been succesfully deactivated!',
          icon: 'success',
        });
      }
    });
  };

  return (
    <div>
      <div className="flex flex-col">
        <div className="bg-white-600 rounded-md p-5 mr-10 w-full h-[75vh]  overflow-auto shadow-2xl border-gray-200 border-2 cursor-move">
          <div className="flex align-middle rounded-md  duration-300 cursor-pointer bg-gradient-to-r from-gray-300 to-white-500">
            <div className="w-6 h-6 rounded-full bg-green-400">
              <BiUserPin className="self-center" />
            </div>

            <div className="text-gray-600 my-auto">
              <h1 className="text-gray-600 text-xl font-bold ml-4">
                Active Users
              </h1>
            </div>
          </div>

          <div className="rounded-md px-2 mt-1 lista de activeusers ">
            <div>
              <div className="grid grid-cols-5">
                <div>Full name</div>
                <div>Email</div>
                <div className="w-full flex self-end justify-end mr-4">
                  <p>Role</p>
                </div>
                <div className="ml-4">
                  <p>Id</p>
                </div>
                <div className="text-end">Disable</div>
              </div>
              {availableUsers.map((u) => {
                return (
                  <div
                    key={u.id}
                    className=" grid grid-cols-5 my-3 p-0.5 rounded-md  duration-300 cursos-pointer bg-gray-200"
                  >
                    <div className="flex">
                      <h1 className="text-gray-600 text-base font-bold pl-2">
                        {u.firstname}
                      </h1>
                      <h1 className="text-gray-600 text-base font-bold pl-2">
                        {u.lastname}
                      </h1>
                    </div>
                    <div>
                      {' '}
                      <h1 className="text-gray-600 text-base font-bold pl-2">
                        {u.email}
                      </h1>
                    </div>
                    <div className="w-full flex self-end justify-end">
                      <h1 className="text-gray-600 text-base font-bold pl-2">
                        {u.role}
                      </h1>
                    </div>
                    <h1 className="text-gray-600 text-base font-bold pl-2 inline-block">
                      {u.id}
                    </h1>

                    <div className="w-full flex self-end justify-end">
                      <button
                        className="rounded-full bg-red-400 cursor-pointer w-fit justify-end items-end p-1"
                        onClick={() => confirmation1(u.id)}
                      >
                        <FaUserAltSlash />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="bg-white-600 rounded-md p-5 mr-10 w-full h-[25vh]  overflow-auto shadow-2xl border-gray-200 border-2 cursor-move">
          <div className="pl-2 pt-2 rounded-md  duration-300 cursor-pointer bg-gradient-to-r from-gray-300 to-white-500">
            <div className="p-1 w-[31px] object-contain rounded-full bg-red-500 text-2xl ">
              <BiUserX />
            </div>

            <div className="flex">
              <h1 className="text-gray-600 text-xl font-bold  mb-7">
                Disabled accounts
              </h1>
            </div>
          </div>

          <div className=" rounded-md p-2 mt-5 lista de disabled users">
            <div>
              {disabledUsers.map((u) => {
                return (
                  <div
                    key={u.id}
                    className="mt-3 mb-3  p-0.5 pt-2 rounded-md  duration-300 cursos-pointer bg-gray-200 pb-3"
                  >
                    <h1 className="text-gray-600 text-base font-bold pl-2">
                      Name: {u.firstname}
                    </h1>
                    <h1 className="text-gray-600 text-base font-bold pl-2">
                      Lastname: {u.lastname}
                    </h1>
                    <h1 className="text-gray-600 text-base font-bold pl-2">
                      Email: {u.email}
                    </h1>
                    <h1 className="text-gray-600 text-base font-bold pl-2">
                      Rol: {u.role}
                    </h1>
                    <h1 className="text-gray-600 text-base font-bold pl-2 inline-block">
                      ID: {u.id}
                    </h1>

                    <div className="text-gray-600 inline-block flex justify-center mt-2">
                      <div className="p-1  object-contain rounded-full bg-green-300 text-2xl cursor-pointer ">
                        <button onClick={() => confirmation2(u.id)}>
                          <FaUserCheck />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CmsUsers;
