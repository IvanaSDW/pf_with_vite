import React from 'react';
import styles from './assets/NavBar/NavBar.module.css';
import EachOne from './Eachone.jsx';
import { MdKeyboardBackspace } from 'react-icons/md';
import { Link } from 'react-router-dom';
import DarkMode from './assets/NavBar/darkMode';
import formikImg from '../components/assets/tecnologies/formik.png';

const AboutUs = () => {
  return (
    <div className="">
      <div className={styles.navBar}>
        <Link to="/home">
          <button className="cursor-pointer text-white text-lg m-2 bg-purple-600 h-9 pointer w-9 rounded-full flex justify-center pt-2">
            <MdKeyboardBackspace />
          </button>
        </Link>

        <div className="mr-10">
          <DarkMode />
        </div>
      </div>

      <div className="flex justify-center pt-6 ">
        <h2 className="text-6xl font-bold">Group 18</h2>
      </div>

      <div className="flex justify-center pr-10 pl-10 pt-5">
        <h2 className="text-2xl font-serif">
        This project was realized in the last stage of "Soy Henry" with the objetive to incorporate new technologies and realize best practices.
        And finally incorporate the new learning of this last months in the career through team work, focus resolutive capacity and responsability.
        </h2>
      </div>

      <div className="ml-20">
        <EachOne
          nombre="Jorge Castañeda"
          pais="Colombia"
          mail='"mailto:castanedajorge.correo@gmail.com'
          carrera="Full Stack developer"
          linkedin="https://www.linkedin.com/in/jorgeenriquecastaneda/"
          github="https://github.com/IvanaSDW"
          image="avatar3.jpg"
        />
        <EachOne
          nombre="Franco Romero"
          pais="Argentina"
          mail="mailto:Lleaguen99@gmail.com"
          carrera="Full Stack developer"
          linkedin="https://www.linkedin.com/in/franco-romero-945b66226/"
          github="https://github.com/Lleaguen"
          image="avatar2.jpg"
        />
        <EachOne
          nombre="Silvi Bordon"
          pais="Argentina"
          mail="mailto:silbordon.89@gmail.com"
          carrera="Full Stack developer"
          linkedin="www.linkedin.com/in/silvina-bordon"
          github="https://github.com/Silbordon"
          image="avatar5.jpg"
        />
        <EachOne
          nombre="Facundo Gomez"
          pais="Argentina"
          mail="mailto:facuugomez67@gmail.com"
          carrera="Full Stack developer"
          linkedin="https://www.linkedin.com/in/facu-gomez-293a68238/"
          github="https://github.com/FacuuGomez"
          image="avatar1.jpg"
        />
        <EachOne
          nombre="Erik Retana"
          pais="México"
          mail="mailto:erik.retana.lopez@gmail.com"
          carrera="Full Stack developer"
          linkedin="https://www.linkedin.com/in/erik-retana-webdev/"
          github="https://github.com/Merzelert"
          image="avatar4.jpg"
        />
        <EachOne
          nombre="Gervasio Jacob"
          pais="Argentina"
          mail="mailto:gerva.jacob.tropini@gmail.com"
          carrera="Full Stack developer"
          linkedin="https://www.linkedin.com/in/gervasio-jacob/"
          github="https://github.com/gervajac"
          image="avatar7.png"
        />
        <EachOne
          nombre="Sebastian Gomez"
          pais="Perú"
          mail="mailto:sebastiangs2309@gmail.com"
          carrera="Full Stack developer"
          linkedin="https://www.linkedin.com/in/sebastian-gomez-salinas-510586246/"
          github="https://github.com/sebastiangs23"
          image="avatar6.jpg"
        />
      </div>
      <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45] ">
        <div className="flex flex-row md:mt-0 mt-6 " />
      </div>

      <div className="flex justify-center">
        <h2 className="text-4xl font-bold">Tecnologías Aplicadas</h2>
      </div>

      <div className="md:mt-0 mt-6 justify-between items-center">
        <img
          className="w-[141px] h-[91px] inline-block ml-10 mr-10 mt-2 "
          src={require('./assets/tecnologies/js.png')}
          alt=""
        />
        <img
          className="w-[81px] h-[91px] inline-block ml-10 mr-10 mt-2 "
          src={require('./assets/tecnologies/html.png')}
          alt=""
        />
        <img
          className="w-[140px] h-[91px] inline-block ml-10 mr-10 mt-2 "
          src={require('./assets/tecnologies/react.png')}
          alt=""
        />
        <img
          className="w-[230px] h-[70px] inline-block ml-10 mr-10 mt-2 "
          src={require('./assets/tecnologies/redux.png')}
          alt=""
        />
        <img
          className="w-[161px] h-[91px] inline-block ml-10 mr-10 mt-2 "
          src={require('./assets/tecnologies/node.png')}
          alt=""
        />
        <img
          className="w-[191px] h-[91px] inline-block ml-10 mr-10 mt-2 "
          src={require('./assets/tecnologies/sequelize.png')}
          alt=""
        />
        <img
          className="w-[91px] h-[91px] inline-block ml-10 mr-10 mt-2"
          src={require('./assets/tecnologies/postgres.png')}
          alt=""
        />
        <img
          className="w-[250px] h-[75px] inline-block ml-10 mr-5 mt-2 "
          src={require('./assets/tecnologies/firebase.png')}
          alt=""
        />
        <img
          className="w-[161px] h-[181px] inline-block ml-10 mr-5 mt-2 "
          src={require('./assets/tecnologies/tailwind.png')}
          alt=""
        />
        <img
          className="w-[170px] h-[71px] inline-block ml-10 mr-5 mt-2 "
          src={require('./assets/tecnologies/stripe.png')}
          alt=""
        />
        <img
          className="w-[170px] h-[71px] inline-block ml-10 mr-5 mt-2 "
          src={formikImg}
          alt=""
        />
      </div>

      <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45] ">
        <div className="flex flex-row md:mt-0 mt-6 " />
      </div>
      <h2 className="font-poppins font-normal text-center text-[18px] leading-[27px] mb-10  ">
        2022 Henry . All Rights Reserved.
      </h2>
    </div>
  );
};

export default AboutUs;
