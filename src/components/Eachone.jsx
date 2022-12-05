import React from 'react';
import { AiFillLinkedin, AiOutlineGithub } from 'react-icons/ai';
import jorge from '../components/assets/aboutUs/avatar3.jpg';
import franco from '../components/assets/aboutUs/avatar2.jpg';
import silvi from '../components/assets/aboutUs/avatar5.jpg';
import facu from '../components/assets/aboutUs/avatar1.jpg';
import erik from '../components/assets/aboutUs/avatar4.jpg';
import gerva from '../components/assets/aboutUs/avatar7.png';
import seba from '../components/assets/aboutUs/avatar6.jpg';

function EachOne(props) {
  let avatar;
  switch (props.image) {
    case 'jorge':
      avatar = jorge;
      break;
    case 'franco':
      avatar = franco;
      break;
    case 'silvi':
      avatar = silvi;
      break;
    case 'facu':
      avatar = facu;
      break;
    case 'erik':
      avatar = erik;
      break;
    case 'gerva':
      avatar = gerva;
      break;
    case 'seba':
      avatar = seba;
      break;
    default:
      avatar = silvi;
  }

  return (
    <div className="inline-block bg-gradient-to-r from-purple-500 to-white-500 text-black-700 w-72 min-h-[10rem] shadow-lg rounded-md overflow-hidden m-10 ">
      {/*el bg no cambia */}

      <div>
        <img
          className="w-full h-full object-cover"
          src={avatar}
          alt="Foto perfil"
        />

        <div className="pb-7 ">
          <div className="p-2 flex justify-center">
            <span className="text-xl font-bold">{props.nombre}</span>
          </div>

          <div className="p-2 flex justify-center pb-5">
            <span className="text-xl font-bold">{props.pais}</span>
          </div>

          <span className="bg-red-300 px-1.5 py-0.5 rounded-md text-xl text-black font-semibold p-2 ml-5 mr-2">
            <a href={props.mail} target="_blank">
              Let´s Talk
            </a>
          </span>

          <span className="bg-blue-400 px-1.5 py-0.5 rounded-md text-xl text-black p-2 ml-5 mr-5 ">
            <a href={props.linkedin} target="_blank">
              <button>
                {' '}
                <AiFillLinkedin />{' '}
              </button>
            </a>
          </span>

          <span className="bg-orange-200 px-1.5 py-0.5 rounded-md text-xl text-black p-2 ml-5 mr-2">
            <a href={props.github} target="_blank">
              <button>
                {' '}
                <AiOutlineGithub />{' '}
              </button>
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}

export default EachOne;
