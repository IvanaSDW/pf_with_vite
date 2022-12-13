import React from 'react';
import { BiUserX, BiUserCheck, BiUserPin } from 'react-icons/bi';
import { FaUserAltSlash, FaUserCheck } from 'react-icons/fa';

const CmsUsers = ({ availableUsers, disabledUsers }) => {
  return (
    <div>
      <div className="flex">
        <div className="bg-white-600 rounded-md p-5 mr-10 w-[450px] h-[550px]  overflow-auto shadow-2xl border-gray-200 border-2 cursor-move">
          <div className="pl-2 pt-2 rounded-md  duration-300 cursor-pointer bg-gradient-to-r from-gray-300 to-white-500">
            <div className="p-1 w-[31px] object-contain rounded-full bg-green-400 text-2xl ">
              <BiUserPin className="" />
            </div>

            <div className="flex text-gray-600">
              <h1 className="text-gray-600 text-xl font-bold  mb-7">
                Active Users
              </h1>
            </div>
          </div>

          <div className="rounded-md p-2 mt-5 lista de activeusers ">
            <div>
              {availableUsers.map((u) => {
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
                      <div className="p-1  object-contain rounded-full bg-red-400 text-2xl cursor-pointer ">
                        <button onClick={() => handleDisableUser(u.id)}>
                          <FaUserAltSlash />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="bg-white-600 rounded-md p-5 mr-10 w-[450px] h-[550px]  overflow-auto shadow-2xl border-gray-200 border-2 cursor-move">
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
                        <button onClick={() => handleDisableUser(u.id)}>
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
