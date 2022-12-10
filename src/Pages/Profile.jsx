import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import firebase, {
  fetchUserData,
  logout,
  uploadFile,
} from '../domain/userService';
import { resetCart, setFirebaseUser } from '../Redux/actions';
import { CgProfile } from 'react-icons/cg';
import { FiLogOut } from 'react-icons/fi';
import { AiFillHome, AiFillEdit } from 'react-icons/ai';
import Footer from '../components/Footer';
import axios from 'axios';
import styles from '../components/assets/Profile/profile.module.css'
//  import { getOrderList } from '../Redux/actions';

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
  const [avatarFile, setAvatarFile] = useState();

  const photoUrl = useSelector((state) => state.firebaseUser.photoURL);

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
        userAvatar: userData.userAvatar,
      };
    });
  }, [userData]);

  const [control, ControlModal] = useState(true);
  const [control2, ControlModal2] = useState(false);

  
  const user = useSelector((state) => state.firebaseUser);
 let userId = user.uid;
  
  const [order, setOrder] = useState([])  

  const getOrderList = async (userId) => {
    const order1 = await axios.get(`https://backend-production-1a11.up.railway.app/order/user/${userId}`);
    setOrder(order1.data)
    console.log(order1.data, "     DSDS D    PUTOO")
}

const [view, setView] = useState(false)

// const [res, setRes] = useState()


const getOrder =  (id)=>{
  
}

useEffect(()=>{
  getOrderList(userId)

},[] )



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

  const handleChangeAvatar = (e) => {
    console.log('changing avatar...');
    setAvatarFile(e.target.files[0]);
  };

  useEffect(() => {
    console.log('avatar changed...uploading file..');
    saveAvatar(avatarFile);
  }, [avatarFile]);

  const saveAvatar = async (file) => {
    try {
      const avatarUrl = await uploadFile(file);
      setFieldsState((prevState) => {
        return {
          ...prevState,
          userAvatar: avatarUrl,
        };
      });
      saveAvatarInDb(avatarUrl);
    } catch (e) {
      console.log('error uploadin image: ', e);
    }
  };



/////////Details order complete***/////

function viewMore(){
  setView(!view)
}

////// ADD REVIEW/////////
const [review, setReview] = useState(false)

function addReview(){
  setReview(!review)
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

  const saveAvatarInDb = (avatarUrl) => {
    axios
      .put(
        `https://backend-production-1a11.up.railway.app/user/${userData.id}`,
        { userAvatar: avatarUrl }
      )
      .then((response) => {
        console.log('Your avatar was succesfully updated!');
      })
      .catch((err) => {
        console.log('err: ', err.response.data);
      });
  };

  
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
                {fieldsState.userAvatar ? (
                  <img
                  src={fieldsState.userAvatar}
                  alt="avatar"
                  className=" w-40 h-40  rounded-full "
                  />
                  ) : photoUrl ? (
                    <img
                    src={photoUrl}
                    alt="avatar"
                    className=" w-40 h-40 rounded-full "
                    />
                    ) : (
                      <CgProfile />
                      )}
              </div>
              <div className=" flex mt-10 flex-col pl-20">
                <h5 className="pl-5 text-4xl">
                  {userData.firstname?.toUpperCase()}
                  {userData.lastname?.toUpperCase()}
                </h5>
                {/* <h5 className="card-title">
              {firebaseUser.displayName?.toUpperCase()}
            </h5> */}
                <p className="pl-10 mt-4">
                  {userData.email}
                  <br />
                </p>
            <label htmlFor="file" className={styles.change}>Change a profile photo</label>
            <input
              type="file"
              placeholder='Change photo'
              className={styles.inputFile}
              onChange={handleChangeAvatar}
              id="file"
            />
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
              className="bg-purple-600 hover:bg-white h-10 pb-1  pl-7 pr-7  rounded-md text-white hover:text-purple-600"
              onClick={controlView}
            >
            My order list
             
            </button>
            <button
              className="bg-purple-600 hover:bg-white h-10 pb-1 pl-7 pr-7  rounded-md text-white hover:text-purple-600"
              onClick={control2View}
            >
             My Personal data
            </button>
          </div>
          <div className='pb-20'>
          {control && (
            <div className="flex justify-center 2xl:mt-60 xl:mt-5 h-60  " value={control}>
              <div className="border-2 border-purple-600 rounded-md  2xl:w-9/12  absolute self-center ">
                
                
                <div className=" h-screen w-full hove:shadow-2 overflow-y-scroll">
                      {order.length &&
                        order.map((e)=>{
                          return(
                          <>
                          <div className=' flex justify-center m-6 pr-20'>
                          {
                          // () => {for(let i; i < e.orderItems.length; i++){
                          e.orderItems.length && e.orderItems.slice(0, 3).map((e)=>{
                            return(
                              <div>
                              <div>
                              {review && e.id &&
                                <div>
                                    <div className='flex flex-row w-full p-60 h-full fixed top-0 left-0 bg-black/60'>
                                    <div className='flex flex-row h-80 w-full bg-white relative justify-center items-center'>
                                    <button onClick={addReview} className='absolute bg-purple-600 right-60 p-5' >CERRAR REVIEW</button>
                                      <div>
                                        <form action="submit">
                                          <img src={e.mangaPosterImage} className="w-40 " alt="" />
                                        </form>
                                        </div>
                                    </div>
                                    </div>
                                </div>}
                                </div>
                              <div className='flex flex-wrap pr-20 '>
                              <img src= {e.mangaPosterImage} alt="" className='w-20 rounded-full'/>      
                                <div className='flex flex-col ml-4 mt-5'>
                                  <p > Name : {e.mangaTitle}</p>
                                  <p > Quantity : {e.quantity}</p>
                                  <p className='flex ' > Price x unity:   <p className='text-green-600 pl-2'>usd {e.price}</p></p>
                                  </div>
                                  <button className='text-purple-400 hover:underline' onClick={addReview}>Add Review</button>
                            
                                </div></div>
                            )
                            })
                            }
                            
          
                          <div>
                          <p>Status: {e.status === "completed" ? <p className='text-green-600'>{e.status === "rejected" }</p> : <p className='text-red-600'>{e.status}</p>}</p>
                          <p className='flex'>Total Price: </p><p className='text-green-600 '>usd {e.total}</p>
                            </div>
                            {e.orderItems.length > 3 && <button className='text-yellow-600 hover:underline   right-10 top-60' onClick={viewMore} >More details...</button>}
                              {view && e.orderItems.length   > 3 &&
                                <div className='flex flex-row w-full p-60 h-full fixed top-0 left-0 bg-black/60'>
                              {
                              e.orderItems.map((e)=>{
                                return(
                                  <>
                                  <div className='flex flex-row h-80 w-full bg-white relative justify-center items-center'>  
                                  <div className='flex  text-black flex-row'>
                                    <img src= {e.mangaPosterImage} alt="" className='w-20 rounded-full'/>      
                                      <div className='flex flex-col ml-4 mt-5'>
                                        <p > Name : {e.mangaTitle}</p>
                                        <p > Quantity : {e.quantity}</p>
                                        <p className='flex ' > Price x unity:   <p className='text-green-600 pl-2'>usd {e.price}</p></p>
                                        </div>
                                  </div>
                                  </div>
                                  <button onClick={viewMore} className='absolute bg-purple-600 right-60 p-5'>Exit.</button>

                                  </>
                                )
                              })
                              }
                              </div>
                              }
                          </div>

                            <div className='w-full border-2 border-gray-500'></div>
                          </>)
                        })  }
                </div>
              </div>
            </div>
          )}
          
          {control2 && (
            <div className="flex justify-center mt-8 h-60" value={control2}>
              <div className="border-2 border-purple-600 rounded-md  w-6/12  absolute self-center">
                <div className="flex flex-col text-purple-500">
                  <div className="flex text-4xl p-2 2xl:ml-60 xl:ml-10 xl:pl-40">
                    <h2 className="text-4xl self-center ">Personal Data ....</h2>
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
                  <form action="" className="flex flex-col 2xl:ml-20 w-full xl:ml-20  m-5">
                    <div className="flex flex-col  2xl:ml-60 xl:ml-20">
                      <div className="flex">
                        <div className="flex flex-col  2xl:mr-12 xl:mr-0">
                          <label>First Name</label>
                          <input
                            disabled={!editMode}
                            type="text"
                            className="border-2 border-purple-600 xl:w-5/6 rounded-md p-2 text-gray-800"
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
                            className="border-2 border-purple-600 xl:w-5/6 rounded-md p-2 text-gray-800"
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
                        className="border-2 border-purple-600 2xl:w-7/12 rounded-md p-2 text-gray-800 xl:w-4/6 "
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
                        className="border-2 border-purple-600 2xl:w-7/12 xl:w-4/6  rounded-md p-2 text-gray-800"
                        name="phone"
                        value={fieldsState.phone}
                        onChange={handleFieldChange}
                      />

                      <div className="flex">
                        <div className="flex flex-col 2xl:mr-12 xl:mr-0">
                          <label>Address</label>
                          <input
                            disabled={!editMode}
                            type="text"
                            className="border-2 border-purple-600  xl:w-5/6 rounded-md p-2 text-gray-800"
                            name="addressLine1"
                            value={fieldsState.addressLine1}
                            onChange={handleFieldChange}
                          />
                        </div>
                        <div className="flex flex-col 2xl:mr-10 xl:mr-0">
                          <label>Address2</label>
                          <input
                            disabled={!editMode}
                            type="text"
                            className="border-2 border-purple-600 xl:w-5/6 rounded-md p-2 text-gray-800"
                            name="addressLine2"
                            value={fieldsState.addressLine2}
                            onChange={handleFieldChange}
                          />
                        </div>
                      </div>
                      <div className="flex">
                        <div className="flex flex-col 2xl:mr-12 ">
                          <label> city</label>
                          <input
                            disabled={!editMode}
                            type="text"
                            className="border-2  xl:w-5/6 xl:mr-0 border-purple-600 rounded-md p-2 text-gray-800"
                            name="city"
                            value={fieldsState.city}
                            onChange={handleFieldChange}
                          />
                        </div>
                        <div className="flex flex-col ">
                          <label>Postal Code</label>
                          <input
                            disabled={!editMode}
                            type="text"
                            className="border-2 border-purple-600 xl:w-5/6 rounded-md p-2 text-gray-800"
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
                        className="border-2 2xl:w-7/12 border-purple-600 xl:w-4/6 rounded-md p-2 text-gray-800"
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
                            ? 'bg-gray-500 text-gray-700 h-10 rounded-md mt-3 xl:w-4/6 2xl:w-7/12'
                            : 'bg-purple-600 text-white h-10 rounded-md 4mt-3 xl:4/6 hover:bg-purple-800 2xl:w-7/12'
                        }
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}</div>
        
        </div>
              </div>
      <div className="mt-80">
        <Footer />
      </div>
    </div>
  );
};

export default Profile;
