import React from 'react'
import logo from "../components/assets/NavBar/ico3.png"
import fotomuestra from "../components/assets/Dashboard/people01.png"
import {
    AiOutlineClose, AiFillAppstore, AiOutlineBook, AiTwotoneAlert, AiFillFileAdd,
    AiOutlineLogout, AiOutlineArrowDown, AiOutlineWhatsApp
} from "react-icons/ai";
import { BiUserX, BiUserCheck, BiUserPin } from "react-icons/bi";
import { FaUserAltSlash, FaUserCheck } from "react-icons/fa";
import { useState } from 'react';
import DarkMode from '../components/assets/NavBar/darkMode';
import { MdKeyboardBackspace } from 'react-icons/md';
import { Link } from 'react-router-dom';

function Cms() {

    const [downdrop, setDowndrop] = useState(true) 
    const handleClickDrop = () => {
        setDowndrop(downdrop => !downdrop)
    }
    let toggleClass = downdrop ? "hidden" : "";


    return (
        <div className='flex bg-white-600 h-screen' >

            <div className='sidebar top-0 bottom-0 lg:left-0 p-2 w-[250px] overflow-y-auto text-center bg-gray-900  ' >
                <Link to="/home">
                    <button className="cursor-pointer text-white text-lg m-2 bg-purple-600 h-9 pointer w-9 rounded-full flex justify-center pt-2">
                        <MdKeyboardBackspace />
                    </button>
                </Link>
                <aside className='text-gray-100 text-xl' >
                    <div className='w-[220px] h-[121px]' >
                        <div className='p-2.5 flex rounded-md px-4 duration-300 cursor-pointer bg-gray-700 mt-16'>
                            <div>  <span className='' > <AiOutlineClose />  </span> </div> {/*Futuro responsive */}
                            <h2 className='font-bold text-gray-200 pt-4 pr-4 ' >My Manga</h2>
                            <img src={logo} alt="prueba" className='w-[90px] h-[91px]' />
                        </div>

                        <div className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursos-pointer hover:bg-purple-600 text-white cursor-pointer'>
                            <span> <AiFillAppstore />  </span>
                            <h3 className='font-bold text-gray-200' >Home</h3>
                        </div>
                        <div className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursos-pointer hover:bg-purple-600 text-white cursor-pointer'>
                            <span> <AiOutlineBook />  </span>
                            <h3 className='font-bold text-gray-200' >Products</h3>
                        </div>

                        <div className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursos-pointer hover:bg-purple-600 text-white cursor-pointer' >
                            <span> <AiFillFileAdd />  </span>
                            <h3 className='font-bold text-gray-200' >Add Productos</h3>
                        </div>

                        <div className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursos-pointer hover:bg-purple-600 text-white cursor-pointer'
                            onClick={() => { handleClickDrop() }}
                        >

                            <span> <AiTwotoneAlert />  </span>
                            <h3 className='font-bold text-gray-200 mr-20' >Reports</h3>
                            <span  > <AiOutlineArrowDown />  </span>

                            <div className='flex justify-between w-full items-center' >
                                <span className='text-sm rotate-180' >
                                    <i className='bi bi-chevron-down' ></i>
                                </span>
                            </div>
                        </div>

                        <div className={`text-left text-sm  w-4/5 mx-auto ${toggleClass}`} id='submenu' >
                            <a className='p-2.5 mt-1 flex items-center rounded-md  duration-300 cursos-pointer text-white hover:bg-gray-700'
                                href="https://wa.me/573028405926" target="_blank"  >
                                <AiOutlineWhatsApp />
                                <h2 className='font-bold cursos-pointer pl-2 pr-4  rounded-md' > Admin1 </h2>
                            </a>

                            <a className='p-2.5 mt-1 flex items-center rounded-md  duration-300 cursos-pointer text-white hover:bg-gray-700'
                                href="https://wa.me/5491141786108" target="_blank"  >
                                <AiOutlineWhatsApp />
                                <h2 className='font-bold cursos-pointer pl-2 pr-4  rounded-md ' > Admin2 </h2>
                            </a>

                            <a className='p-2.5 mt-1 flex items-center rounded-md  duration-300 cursos-pointer text-white hover:bg-gray-700 '
                                href="https://wa.me/525587304585" target="_blank"  >
                                <AiOutlineWhatsApp />
                                <h2 className='font-bold cursos-pointer pl-2 pr-4 rounded-md ' > Admin2 </h2>
                            </a>
                        </div>

                        <div className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursos-pointer hover:bg-purple-600 text-white cursor-pointer' >
                            <span> <AiOutlineLogout />  </span>
                            <h3 className='font-bold text-gray-200' >Log Out</h3>
                        </div>

                    </div>
                </aside>
            </div>

            <div className='w-[1000px] h-screen mt-0 p-3 ' >
                <h1 className='text-black-100 text-xl font-bold pb-4' >DashBoard</h1>

                <div className='flex' >

                    <div className='bg-gray-100 rounded-md p-5 mr-10 w-[450px] '>

                        <div className='pl-2 pt-2 rounded-md  duration-300 cursor-pointer bg-gradient-to-r from-gray-300 to-white-500' >
                            <div className='p-1 w-[31px] object-contain rounded-full bg-green-400 text-2xl ' >
                                <BiUserPin className='' />
                            </div>

                            <div className='flex text-gray-600' >
                                <h1 className='text-gray-600 text-xl font-bold  mb-7' >Active Users</h1>
                            </div>
                        </div>


                        <div className='rounded-md p-2 mt-5 lista de activeusers ' >
                            <div className='p-0.5  rounded-md  duration-300 cursos-pointer hover:bg-purple-500 pb-3' >
                                <h4 className='text-gray-600 text-base font-bold pl-2' >User 1</h4>
                                <div className='flex text-gray-600'>
                                    <h4 className='text-gray-600 text-base font-bold pl-2 pr-10 mr-20'>id: uuid1231aajasaj11312</h4>
                                    <div className='p-1 w-[31px] object-contain rounded-full bg-red-400 text-2xl cursor-pointer' >
                                        <FaUserAltSlash className='' />
                                    </div>

                                </div>
                            </div>

                            <br />

                            <div className='p-0.5  rounded-md  duration-300 cursos-pointer hover:bg-purple-500 pb-3' >
                                <h4 className='text-gray-600 text-base font-bold pl-2' >User 7</h4>
                                <div className='flex text-gray-600'>
                                    <h4 className='text-gray-600 text-base font-bold pl-2 pr-10 mr-20'>id: uuid1231aajasaj11312</h4>
                                    <div className='p-1 w-[31px] object-contain rounded-full bg-red-400 text-2xl cursor-pointer' >
                                        <FaUserAltSlash className='' />
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className='p-0.5  rounded-md  duration-300 cursos-pointer hover:bg-purple-500 pb-3' >
                                <h4 className='text-gray-600 text-base font-bold pl-2' >User 11</h4>
                                <div className='flex text-gray-600'>
                                    <h4 className='text-gray-600 text-base font-bold pl-2 pr-10 mr-20'>id: uuid1231aajasaj11312</h4>
                                    <div className='p-1 w-[31px] object-contain rounded-full bg-red-400 text-2xl cursor-pointer' >
                                        <FaUserAltSlash className='' />
                                    </div>
                                </div>
                            </div>
                            <br />

                            <div className='p-0.5  rounded-md  duration-300 cursos-pointer hover:bg-purple-500 pb-3' >
                                <h4 className='text-gray-600 text-base font-bold pl-2' >User 92</h4>
                                <div className='flex text-gray-600'>
                                    <h4 className='text-gray-600 text-base font-bold pl-2 pr-10 mr-20'>id: uuid1231aajasaj11312</h4>
                                    <div className='p-1 w-[31px] object-contain rounded-full bg-red-400 text-2xl cursor-pointer' >
                                        <FaUserAltSlash className='' />
                                    </div>
                                </div>
                            </div>

                            <br />
                            <div className='p-0.5  rounded-md  duration-300 cursos-pointer hover:bg-purple-500 pb-3' >
                                <h4 className='text-gray-600 text-base font-bold pl-2' >User 510</h4>
                                <div className='flex text-gray-600'>
                                    <h4 className='text-gray-600 text-base font-bold pl-2 pr-10 mr-20'>id: uuid1231aajasaj11312</h4>
                                    <div className='p-1 w-[31px] object-contain rounded-full bg-red-400 text-2xl cursor-pointer' >
                                        <FaUserAltSlash className='' />
                                    </div>
                                </div>
                            </div>
                            <br />
                        </div>


                    </div>


                    <div className='bg-gray-100  rounded-md p-5 pt-2 w-[450px] '  >

                        <div className='pl-2 pt-2 rounded-md  duration-300 cursor-pointer bg-gradient-to-r from-gray-300 to-white-500' >
                            <div className='p-1 w-[31px] object-contain rounded-full bg-red-700 text-2xl ' >
                                <BiUserX />
                            </div>

                            <div className='flex'>
                                <h1 className='text-gray-600 text-xl font-bold  mb-7' >Black List</h1>
                            </div>
                        </div>


                        <div className=' rounded-md p-2 mt-5 ' >

                            <div className='p-0.5  rounded-md  duration-300 cursos-pointer hover:bg-purple-500 pb-3' >
                                <h4 className='text-gray-600 text-base font-bold pl-2' >User 510</h4>
                                <div className='flex text-gray-600'>
                                    <h4 className='text-gray-600 text-base font-bold pl-2 pr-10 mr-20'>id: uuid1231aajasaj11312</h4>
                                    <div className='p-1 w-[31px] object-contain rounded-full bg-green-300 text-2xl cursor-pointer' >
                                        <FaUserCheck />
                                    </div>
                                </div>
                            </div>

                            <br />

                            <div className='p-0.5  rounded-md  duration-300 cursos-pointer hover:bg-purple-500 pb-3' >
                                <h4 className='text-gray-600 text-base font-bold pl-2' >User 510</h4>
                                <div className='flex text-gray-600'>
                                    <h4 className='text-gray-600 text-base font-bold pl-2 pr-10 mr-20'>id: uuid1231aajasaj11312</h4>
                                    <div className='p-1 w-[31px] object-contain rounded-full bg-green-300 text-2xl cursor-pointer' >
                                        <FaUserCheck />
                                    </div>
                                </div>
                            </div>

                            <br />

                            <div className='p-0.5  rounded-md  duration-300 cursos-pointer hover:bg-purple-500 pb-3' >
                                <h4 className='text-gray-600 text-base font-bold pl-2' >User 510</h4>
                                <div className='flex text-gray-600'>
                                    <h4 className='text-gray-600 text-base font-bold pl-2 pr-10 mr-20'>id: uuid1231aajasaj11312</h4>
                                    <div className='p-1 w-[31px] object-contain rounded-full bg-green-300 text-2xl cursor-pointer' >
                                        <FaUserCheck />
                                    </div>
                                </div>
                            </div>

                            <br />

                            <div className='p-0.5  rounded-md  duration-300 cursos-pointer hover:bg-purple-500 pb-3' >
                                <h4 className='text-gray-600 text-base font-bold pl-2' >User 510</h4>
                                <div className='flex text-gray-600'>
                                    <h4 className='text-gray-600 text-base font-bold pl-2 pr-10 mr-20'>id: uuid1231aajasaj11312</h4>
                                    <div className='p-1 w-[31px] object-contain rounded-full bg-green-300 text-2xl cursor-pointer' >
                                        <FaUserCheck />
                                    </div>
                                </div>
                            </div>

                            <br />

                            <div className='p-0.5  rounded-md  duration-300 cursos-pointer hover:bg-purple-500 pb-3' >
                                <h4 className='text-gray-600 text-base font-bold pl-2' >User 510</h4>
                                <div className='flex text-gray-600'>
                                    <h4 className='text-gray-600 text-base font-bold pl-2 pr-10 mr-20'>id: uuid1231aajasaj11312</h4>
                                    <div className='p-1 w-[31px] object-contain rounded-full bg-green-300 text-2xl cursor-pointer' >
                                        <FaUserCheck />
                                    </div>
                                </div>
                            </div>

                            <br />
                        </div>
                    </div>
                </div>

            </div>

            <div className='w-[200px] h-screen mt-10 text-gray-600' >
                <div className='bg-gray-100 rounded-md  pt-2 w-[250px] h-screen' >

                    <div className='ml-5 flex mb-5 ' >
                        <div className='info' >
                            <p className='text-xl'>Hello, Elon Musk  </p>
                            <small className='text-muted' >Rol: </small>
                            <small className='text-muted' >Master</small>
                        </div>
                        <div className='ml-5' >
                            <img src={fotomuestra} alt="master" className='sm:w-[42px] w-[25px] object-contain rounded-full' />
                        </div>
                    </div>
                    <DarkMode />
                </div>


            </div>



        </div>
    )
}

export default Cms