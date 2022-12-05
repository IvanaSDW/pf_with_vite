import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import firebase, { fetchUserData, logout } from '../domain/userService';
import { resetCart, setFirebaseUser } from '../Redux/actions';
import '../components/assets/Profile/profile.css';
import { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { FiLogOut } from 'react-icons/fi';
import { AiFillHome } from 'react-icons/ai';
import Footer from '../components/Footer';
import Card from '../components/Card';
import { AiFillEdit } from 'react-icons/ai';
import axios from 'axios';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const firebaseUser = useSelector((state) => state.firebaseUser);
  const [userData, setUserData] = useState({});
  const [someChanged, setSomeChanged] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (!firebaseUser) navigate('/login');
    firebase.auth().onAuthStateChanged(async (user) => {
      dispatch(setFirebaseUser(user));
      if (user) {
        const userData = await fetchUserData();
        setUserData(userData);
      } else {
        dispatch(resetCart());
        navigate('/home');
      }
    });
  }, [firebaseUser]);

  const [fieldsState, setFieldsState] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    setFieldsState((prevState) => {
      return {
        ...prevState,
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userData.email,
        phone: userData.phone,
        addressLine1: userData.addressLine1,
        addressLine2: userData.addressLine2,
        city: userData.city,
        postalCode: userData.postalCode,
        country: userData.country,
      };
    });
  }, [userData]);

  const [control, ControlModal] = useState(true);
  const [control2, ControlModal2] = useState(false);

  function controlView() {
    if (control2) {
      ControlModal2(false);
      ControlModal(!control);
    } else if (control) {
      alert("You'r already on Favs section");
    }
  }

  function control2View() {
    if (control) {
      ControlModal(false);
      ControlModal2(!control2);
    } else if (control2) {
      alert("You'r already on Data section");
    }
  }

  //Personal data form state

  const handleFieldChange = (e) => {
    setFieldErrors((prevErrors) => {
      return {};
    });
    setSomeChanged(true);
    setFieldsState((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const validateInputs = () => {
    let valid = true;
    console.log('validate inputs called');
    const validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!fieldsState.email.match(validEmail)) {
      valid = false;
      setFieldErrors((prevErr) => {
        return { ...prevErr, emailError: 'Email address badly formatted' };
      });
    } else {
      setFieldErrors((prevErr) => {
        return { ...prevErr, emailError: false };
      });
    }
    return valid;
  };

  const onSaveChanges = async () => {
    if (!validateInputs()) return;
    axios
      .put(
        `https://backend-production-1a11.up.railway.app/user/${userData.id}`,
        fieldsState
      )
      .then((response) => {
        console.log('resp: ', response.data.updatedUser);
        window.alert('Your data were succesfully updated!');
        setSomeChanged(false);
        setEditMode(false);
      })
      .catch((err) => {
        console.log('err: ', err.response.data);
      });
  };

  const mangas = useSelector((state) => state.mangas);
  // <input type="file" />
  return (
    <div>
      <div className="">
        <div className="">
          <div className="w-full flex justify-around bg-purple-600 text-white">
            <div className="mt-10 text-4xl mr-10">
              <Link to="/home">
                <button className="hover:text-purple-600 hover:bg-white w-6/6 h-9 rounded-md self-center">
                  <AiFillHome />
                </button>
              </Link>
            </div>
            <div className="flex">
              <div className=" flex ">
                <h2 className="text-9xl">
                  <button
                    type="file"
                    className="bg-gray-400 rounded-full mt-2 text-white"
                  >
                    <CgProfile />
                  </button>
                </h2>
              </div>
              <div className=" flex mt-10 flex-col pl-20">
                <h5 className="pl-5 text-4xl">
                  {userData.firstname?.toUpperCase()}{' '}
                  {userData.lastname?.toUpperCase()}
                </h5>
                {/* <h5 className="card-title">
              {firebaseUser.displayName?.toUpperCase()}
            </h5> */}
                <p className="pl-10 mt-4">
                  {userData.email}
                  <br />
                </p>
              </div>
            </div>
            <div>
              <button
                onClick={logout}
                className="mt-10 text-4xl hover:text-purple-600 hover:bg-white w-6/6 h-9 rounded-md self-center "
              >
                <FiLogOut />
              </button>
            </div>
          </div>
          <div className="flex justify-evenly h-80 p-20 ">
            <button
              className="bg-purple-600 hover:bg-white h-10 p-3 pl-7 pr-7 rounded-md text-white hover:text-purple-600"
              onClick={controlView}
            >
              My Favs
            </button>

            <button
              className="bg-purple-600 hover:bg-white h-10 p-3 pl-7 pr-7 rounded-md text-white hover:text-purple-600"
              onClick={control2View}
            >
              Personal data
            </button>
          </div>
          {control && (
            <div className="flex justify-center mt-5 h-40" value={control}>
              <div className="border-2 border-purple-600 rounded-md  w-9/12 h-full absolute self-center ">
                {' '}
                MY FAVs
                <div className=" h-screen  flex  flex-row overflow-x-scroll overflow-y-hidden ">
                  {mangas.length &&
                    mangas.map((e) => {
                      return (
                        <div className="w-full ">
                          <Card
                            posterImage={
                              e.posterImage && e.posterImage.small.url
                            }
                            startDate={e.startDate}
                            price={e.price}
                            averageRating={e.averageRating}
                          />
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          )}

          {control2 && (
            <div className="flex justify-center mt-5 h-60" value={control2}>
              <div className="border-2 border-purple-600 rounded-md  w-6/12  absolute self-center">
                <div className="flex flex-col text-purple-500">
                  <div className="flex text-4xl p-2 ml-40">
                    <h2 className="text-4xl self-center">Personal Data ....</h2>
                    {editMode ? (
                      <p
                        onClick={() => {
                          setEditMode(false);
                          setSomeChanged(false);
                        }}
                        className="text-red-300 cursor-pointer hover:text-red-600 italic"
                      >
                        cancel
                      </p>
                    ) : (
                      <AiFillEdit
                        className="cursor-pointer hover:text-red-600"
                        onClick={() => {
                          setEditMode(true);
                        }}
                      />
                    )}
                  </div>
                  <form action="" className="flex flex-col w-full ml-10  m-5">
                    <div className="flex flex-col  mr-40 ml-20 w-100">
                      <div className="flex">
                        <div className="flex flex-col  mr-2 ">
                          <label>First Name</label>
                          <input
                            disabled={!editMode}
                            type="text"
                            className="border-2 border-purple-600 rounded-md p-2 text-gray-800"
                            name="firstname"
                            value={fieldsState.firstname}
                            onChange={handleFieldChange}
                          />
                        </div>
                        <div className="flex flex-col ">
                          <label>Last Name</label>
                          <input
                            disabled={!editMode}
                            type="text"
                            className="border-2 border-purple-600 rounded-md p-2 text-gray-800"
                            name="lastname"
                            value={fieldsState.lastname}
                            onChange={handleFieldChange}
                          />
                        </div>
                      </div>
                      <label>E-mail</label>
                      <input
                        disabled={!editMode}
                        type="email"
                        className="border-2 border-purple-600 rounded-md p-2 text-gray-800"
                        name="email"
                        value={fieldsState.email}
                        onChange={handleFieldChange}
                      />
                      {fieldErrors.emailError && (
                        <p className="italic text-red-600 text-sm">
                          {fieldErrors.emailError}
                        </p>
                      )}
                      <label>Number Phone</label>
                      <input
                        disabled={!editMode}
                        type="text"
                        className="border-2 border-purple-600 rounded-md p-2 text-gray-800"
                        name="phone"
                        value={fieldsState.phone}
                        onChange={handleFieldChange}
                      />

                      <div className="flex">
                        <div className="flex flex-col mr-2">
                          <label>Address</label>
                          <input
                            disabled={!editMode}
                            type="text"
                            className="border-2 border-purple-600 rounded-md p-2 text-gray-800"
                            name="addressLine1"
                            value={fieldsState.addressLine1}
                            onChange={handleFieldChange}
                          />
                        </div>
                        <div className="flex flex-col mr-10">
                          <label>Address2</label>
                          <input
                            disabled={!editMode}
                            type="text"
                            className="border-2 border-purple-600 rounded-md p-2 text-gray-800"
                            name="addressLine2"
                            value={fieldsState.addressLine2}
                            onChange={handleFieldChange}
                          />
                        </div>
                      </div>
                      <div className="flex">
                        <div className="flex flex-col mr-2  ">
                          <label> city</label>
                          <input
                            disabled={!editMode}
                            type="text"
                            className="border-2 border-purple-600 rounded-md p-2 text-gray-800"
                            name="city"
                            value={fieldsState.city}
                            onChange={handleFieldChange}
                          />
                        </div>
                        <div className="flex flex-col mr-10">
                          <label>Postal Code</label>
                          <input
                            disabled={!editMode}
                            type="text"
                            className="border-2 border-purple-600 rounded-md p-2 text-gray-800"
                            name="postalCode"
                            value={fieldsState.postalCode}
                            onChange={handleFieldChange}
                          />
                        </div>
                      </div>
                      <label>Country</label>
                      <input
                        disabled={!editMode}
                        type="text"
                        className="border-2 border-purple-600 rounded-md p-2 text-gray-800"
                        name="country"
                        value={fieldsState.country}
                        onChange={handleFieldChange}
                      />
                      <button
                        type="button"
                        disabled={!someChanged}
                        onClick={onSaveChanges}
                        className={
                          !someChanged
                            ? 'bg-gray-500 text-gray-700 h-10 rounded-md mt-3'
                            : 'bg-purple-600 text-white h-10 rounded-md mt-3 hover:bg-purple-800'
                        }
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* <div className="mt-80">
          <Footer />
        </div> */}
      </div>
      <div className="mt-80">
        <Footer />
      </div>
    </div>
  );
};

export default Profile;
