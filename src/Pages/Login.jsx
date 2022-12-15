import '../components/assets/Login/login_signup.css';
import React, { useState, useEffect } from 'react';
import { useDispatch /*, useSelector*/ } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import img from '../components/assets/NavBar/ico2.png';
import { FcGoogle } from 'react-icons/fc';
/*import { FaFacebookSquare } from 'react-icons/fa';*/
import bg from '../components/assets/LandingPage/portada.jpg';
import { MdKeyboardBackspace } from 'react-icons/md';
import card from '../components/assets/Login/card.jpg';
import card2 from '../components/assets/Login/card2.webp';
import card3 from '../components/assets/Login/card3.jpg';
import firebase, {
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from '../domain/userService';
import { setFirebaseUser } from '../Redux/actions';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [estadoModal1, setEstadoModal1] = useState(true);
  const [estadoModal2, setEstadoModal2] = useState(false);
  const [enabledSubmit, setEnabledSubmit] = useState({
    login: false,
    register: false,
  });

  const [fieldInputs, setFieldInputs] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [fieldsTouched, setFieldsTouched] = useState({
    nameTouched: false,
    emailTouched: false,
    passwordTouched: false,
  });

  function cambiarEstado1() {
    setEstadoModal2(false);
    setEstadoModal1(!estadoModal1);
  }

  function cambiarEstado2() {
    setEstadoModal1(false);
    setEstadoModal2(!estadoModal2);
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      dispatch(setFirebaseUser(user));
      if (user) {
        navigate('/home');
      }
    });
  });

  useEffect(() => {
    console.log('inputs changed..');
    if (Object.keys(fieldInputs).length === 0) return;
    validateInputs();
  }, [fieldInputs, fieldsTouched]);

  useEffect(() => {
    setEnabledSubmit((prevState) => {
      return {
        ...prevState,
        login:
          fieldsTouched.emailTouched &&
          fieldsTouched.passwordTouched &&
          fieldErrors.pwdError === false &&
          fieldErrors.emailError === false,
        register:
          fieldsTouched.nameTouched &&
          fieldsTouched.emailTouched &&
          fieldsTouched.passwordTouched &&
          fieldErrors.pwdError === false &&
          fieldErrors.emailError === false &&
          fieldErrors.nameError === false,
      };
    });
  }, [fieldErrors]);

  const handleEmailChange = (e) => {
    setFieldInputs((prevInputs) => {
      return { ...prevInputs, email: e.target.value };
    });
  };

  const handlePwdChange = (e) => {
    if (fieldInputs.email.length > 0) {
      setFieldsTouched((prev) => {
        return { ...prev, emailTouched: true };
      });
    }
    if (e.target.value.length > 5) {
      setFieldsTouched((prev) => {
        return { ...prev, passwordTouched: true };
      });
    }
    setFieldInputs((prevInputs) => {
      return { ...prevInputs, password: e.target.value };
    });
  };

  const handleNameChange = (e) => {
    setFieldInputs((prevInputs) => {
      return { ...prevInputs, name: e.target.value };
    });
  };

  const validateInputs = () => {
    const validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!fieldInputs.email.match(validEmail)) {
      if (fieldsTouched.emailTouched) {
        setFieldErrors((prevErr) => {
          return { ...prevErr, emailError: 'Email address badly formatted' };
        });
      }
    } else {
      setFieldErrors((prevErr) => {
        return { ...prevErr, emailError: false };
      });
    }
    if (fieldInputs.password.trim().length < 6) {
      if (fieldsTouched.passwordTouched) {
        setFieldErrors((prevErr) => {
          return { ...prevErr, pwdError: 'Password must be at least 6 chars' };
        });
      }
    } else {
      setFieldErrors((prevErr) => {
        return { ...prevErr, pwdError: false };
      });
    }

    if (fieldInputs.name.trim().length < 3) {
      if (fieldsTouched.nameTouched) {
        setFieldErrors((prevErr) => {
          return { ...prevErr, nameError: 'Name must be at least 3 chars' };
        });
      }
    } else {
      setFieldErrors((prevErr) => {
        return { ...prevErr, nameError: false };
      });
    }

    setEnabledSubmit((prevState) => {
      return {
        ...prevState,
        login:
          fieldsTouched.emailTouched &&
          fieldsTouched.passwordTouched &&
          fieldErrors.pwdError === false &&
          fieldErrors.emailError === false,
        register:
          fieldsTouched.nameTouched &&
          fieldsTouched.emailTouched &&
          fieldsTouched.passwordTouched &&
          fieldErrors.pwdError === false &&
          fieldErrors.emailError === false &&
          fieldErrors.nameError === false,
      };
    });
  };

  const handleRegisterSubmit = () => {
    registerWithEmailAndPassword(
      fieldInputs.email,
      fieldInputs.password,
      fieldInputs.name
    );
  };

  const handleLoginSubmit = () => {
    logInWithEmailAndPassword(fieldInputs.email, fieldInputs.password);
  };

  return (
    <div className=" relative w-full h-screen flex justify-center  overflow-y-hidden ">
      <Link to="/home">
        <button className="cursor-pointer text-white text-lg m-5 bg-purple-600 h-9 pointer w-9 rounded-full flex justify-center pt-2">
          <MdKeyboardBackspace />
        </button>
      </Link>
      <div className="w-9/12 ml-60 h-5/6 mt-10 rounded-md bg-black shadow-1xl ">
        <div className="h-5/6 w-9/12  absolute  ">
          <img
            src={bg}
            alt="fondo"
            className="w-80 absolute opacity-10 h-full rounded-md"
          />
        </div>
        <div className="mt-20  flex justify-center">
          <img src={card3} className="w-40 absolute" alt="img" />
          <img
            src={card2}
            className="w-40 rotate-12 absolute ml-10"
            alt="img"
          />
          <img src={card} className="w-40 rotate-45 absolute ml-10" alt="img" />
        </div>
      </div>

      <div className="w-10/12 h-5/6 mr-60 shadow-2xl border-gray-500 border-2 rounded-md mt-10 flex justify-center">
        <div className=" flex flex-col  w-4/12 top-0   rounded-lg fixed p-20 justify-center">
          <div className="flex justify-center">
            <img src={img} alt="asd" className="w-20" />
            <h1 className="text-3xl font-bold underline mt-5">
              <span className="text-purple-500 text-fms ">My</span>Manga
            </h1>
          </div>

          {estadoModal1 && (
            <div>
              <form className="flex  flex-col" autoComplete="off">
                <label className="text-2xl font-mono ml-2" htmlFor="email">
                  E-mail
                </label>
                <input
                  className="w-30 p-2 m-2  bg-white text-black relative border-2 rounded-lg border-purple-600 "
                  value={fieldInputs.email}
                  onChange={(e) => handleEmailChange(e)}
                  onBlur={() =>
                    setFieldsTouched((prev) => {
                      return { ...prev, emailTouched: true };
                    })
                  }
                  type="email"
                  placeholder=" your email address"
                  id="email"
                  name="email"
                />
                <p className="text-xs text-red-600 italic ml-4">
                  {fieldErrors.emailError}
                </p>
                <label className="text-2xl font-mono ml-2" htmlFor="password">
                  Password
                </label>
                <input
                  className="w-30 p-6 m-2 text-black mt-2 bg-white  relative border-2 rounded-lg border-purple-600 h-1"
                  value={fieldInputs.password}
                  onChange={(e) => handlePwdChange(e)}
                  onBlur={() =>
                    setFieldsTouched((prev) => {
                      return { ...prev, passwordTouched: true };
                    })
                  }
                  type="password"
                  placeholder="********"
                  id="password"
                  name="password"
                />
                <p className="text-xs text-red-600 italic ml-4">
                  {fieldErrors.pwdError}
                </p>
                <button
                  type="button"
                  onClick={handleLoginSubmit}
                  onMouseEnter={validateInputs}
                  disabled={!enabledSubmit.login}
                  className=" text-white self-center rounded-lg w-60 pb-10 pt-1  p-6 ml-3  bg-violet-600 text-2xl font-sans  md:font-mono hover:bg-white hover:text-violet-600 hover:border-violet-600 border-2 hover:border-2 h-1"
                >
                  Log In
                </button>
              </form>
              <button
                className=" text-2 hover:text-purple-600 hover:underline mt-3"
                onClick={cambiarEstado2}
              >
                Don't have an account? Register here.
              </button>

              {/* <button className=' flex justify-center mt-3 w-full' onClick={signInWithGoogle}>
              <FcGoogle style={{ marginTop: 5 }}/><h4 className=' pl-2 hover:text-purple-400 underline'>Sing in with Google!</h4> */}

              <button
                className=" flex justify-center  w-full"
                onClick={signInWithGoogle}
              >
                <FcGoogle style={{ marginTop: 15 }} />
                <h4 className="text-1xl pl-2 mt-2 hover:text-purple-400 underline">
                  Sing in with Google!
                </h4>
              </button>
            </div>
          )}

          {estadoModal2 && (
            <div>
              <form className="register-form">
                <label className="text-1xl font-arial pl-2" htmlFor="name">
                  Full Name
                </label>
                <input
                  className="w-30 p-4 m-2 text-black mt-1 bg-white  relative border-2 rounded-lg border-purple-600 h-1"
                  value={fieldInputs.name}
                  onChange={(e) => handleNameChange(e)}
                  onBlur={() =>
                    setFieldsTouched((prev) => {
                      return { ...prev, nameTouched: true };
                    })
                  }
                  name="name"
                  id="name"
                  placeholder="Full Name"
                />
                <p className="text-xs text-red-600 italic ml-4">
                  {fieldErrors.nameError}
                </p>
                <label className="text-1xl font-arial pl-2" htmlFor="email">
                  E-mail
                </label>
                <input
                  className="w-30 p-4 m-2 text-black mt-1 bg-white  relative border-2 rounded-lg border-purple-600 h-1"
                  value={fieldInputs.email}
                  onChange={(e) => handleEmailChange(e)}
                  onBlur={() =>
                    setFieldsTouched((prev) => {
                      return { ...prev, emailTouched: true };
                    })
                  }
                  type="email"
                  placeholder="your email address"
                  id="email"
                  name="email"
                />
                <p className="text-xs text-red-600 italic ml-4">
                  {fieldErrors.emailError}
                </p>
                <label className="text-1xl font-arial pl-2" htmlFor="password">
                  Password
                </label>
                <input
                  className="w-30 p-4 m-2 text-black mt-1 bg-white  relative border-2 rounded-lg border-purple-600 h-1"
                  value={fieldInputs.password}
                  onChange={(e) => handlePwdChange(e)}
                  onBlur={() =>
                    setFieldsTouched((prev) => {
                      return { ...prev, passwordTouched: true };
                    })
                  }
                  type="password"
                  placeholder="********"
                  id="password"
                  name="password"
                />
                <p className="text-xs text-red-600 italic ml-4">
                  {fieldErrors.pwdError}
                </p>
                <button
                  type="button"
                  disabled={!enabledSubmit.register}
                  onClick={handleRegisterSubmit}
                  className=" text-white self-center rounded-lg w-40 h-10 border-2  ml-3  bg-violet-600 text-1xl font-sans  md:font-mono hover:bg-white hover:text-violet-600 hover:border-violet-600 border-1 hover:border-"
                >
                  Register
                </button>
              </form>
              <button
                className="flex justify-center w-full mt-2 text-1xl pl-2 hover:text-purple-400 underline"
                onClick={cambiarEstado1}
              >
                Already have an account? Login here.
              </button>
              <button
                className=" flex justify-center w-full"
                onClick={signInWithGoogle}
              >
                <FcGoogle style={{ marginTop: 15 }} />
                <h4 className="text-1xl pl-2 mt-2 hover:text-purple-400 underline">
                  Sing in with Google!
                </h4>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
