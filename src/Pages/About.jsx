import React from 'react';
import styles from '../components/assets/NavBar/NavBar.module.css';
import EachOne from '../components/Eachone.jsx';
import { MdKeyboardBackspace } from 'react-icons/md';
import { Link } from 'react-router-dom';
import DarkMode from '../components/assets/NavBar/darkMode';
import formikImg from '../components/assets/tecnologies/formik.png';
import stripeImg from '../components/assets/tecnologies/stripe.png';
import jsImage from '../components/assets/tecnologies/js.png';
import htmlImage from '../components/assets/tecnologies/html.png';
import reactImage from '../components/assets/tecnologies/react.png';
import reduxImage from '../components/assets/tecnologies/redux.png';
import nodeImage from '../components/assets/tecnologies/node.png';
import sequelizeImage from '../components/assets/tecnologies/sequelize.png';
import postgresImage from '../components/assets/tecnologies/postgres.png';
import firebaseImage from '../components/assets/tecnologies/firebase.png';
import tailwindImage from '../components/assets/tecnologies/tailwind.png';

const About = () => {
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
          Proyecto realizado en la última etapa del bootcamp de "Soy Henry" con
          el objetivo de poder seguir adentrándonos en nuevas tecnologías y
          realizar mejores prácticas, asimismo de terminar de solidificar el
          conocimiento adquirido en los últimos meses de la cursada, por medio
          del trabajo en equipo, enfoque, capacidad resolutiva y
          responsabilidad.
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
          image="jorge"
        />
        <EachOne
          nombre="Franco Romero"
          pais="Argentina"
          mail="mailto:Lleaguen99@gmail.com"
          carrera="Full Stack developer"
          linkedin="https://www.linkedin.com/in/franco-romero-945b66226/"
          github="https://github.com/Lleaguen"
          image="franco"
        />
        <EachOne
          nombre="Silvi Bordon"
          pais="Argentina"
          mail="mailto:silbordon.89@gmail.com"
          carrera="Full Stack developer"
          linkedin="https://www.linkedin.com/in/silvina-bordon"
          github="https://github.com/Silbordon"
          image="silvi"
        />
        <EachOne
          nombre="Facundo Gomez"
          pais="Argentina"
          mail="mailto:facuugomez67@gmail.com"
          carrera="Full Stack developer"
          linkedin="https://www.linkedin.com/in/facu-gomez-293a68238/"
          github="https://github.com/FacuuGomez"
          image="facu"
        />
        <EachOne
          nombre="Erik Retana"
          pais="México"
          mail="mailto:erik.retana.lopez@gmail.com"
          carrera="Full Stack developer"
          linkedin="https://www.linkedin.com/in/erik-retana-webdev/"
          github="https://github.com/Merzelert"
          image="erik"
        />
        <EachOne
          nombre="Gervasio Jacob"
          pais="Argentina"
          mail="mailto:gerva.jacob.tropini@gmail.com"
          carrera="Full Stack developer"
          linkedin="https://www.linkedin.com/in/gervasio-jacob/"
          github="https://github.com/gervajac"
          image="gerva"
        />
        <EachOne
          nombre="Sebastian Gomez"
          pais="Perú"
          mail="mailto:sebastiangs2309@gmail.com"
          carrera="Full Stack developer"
          linkedin="https://www.linkedin.com/in/sebastian-gomez-salinas-510586246/"
          github="https://github.com/sebastiangs23"
          image="seba"
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
          src={jsImage}
          alt=""
        />
        <img
          className="w-[81px] h-[91px] inline-block ml-10 mr-10 mt-2 "
          src={htmlImage}
          alt=""
        />
        <img
          className="w-[140px] h-[91px] inline-block ml-10 mr-10 mt-2 "
          src={reactImage}
          alt=""
        />
        <img
          className="w-[230px] h-[70px] inline-block ml-10 mr-10 mt-2 "
          src={reduxImage}
          alt=""
        />
        <img
          className="w-[161px] h-[91px] inline-block ml-10 mr-10 mt-2 "
          src={nodeImage}
          alt=""
        />
        <img
          className="w-[191px] h-[91px] inline-block ml-10 mr-10 mt-2 "
          src={sequelizeImage}
          alt=""
        />
        <img
          className="w-[91px] h-[91px] inline-block ml-10 mr-10 mt-2"
          src={postgresImage}
          alt=""
        />
        <img
          className="w-[250px] h-[75px] inline-block ml-10 mr-5 mt-2 "
          src={firebaseImage}
          alt=""
        />
        <img
          className="w-[161px] h-[181px] inline-block ml-10 mr-5 mt-2 "
          src={tailwindImage}
          alt=""
        />
        <img
          className="w-[170px] h-[71px] inline-block ml-10 mr-5 mt-2 "
          src={stripeImg}
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

export default About;
