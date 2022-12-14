import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import swal from 'sweetalert';
import { useDispatch, useSelector } from 'react-redux';
import { updateManga } from '../Redux/actions';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';
import axios from 'axios';
import { uploadFile } from '../domain/userService'; //1
import { SERVER_URL } from '../domain/serverConfig';
import firebase, { fetchUserData } from '../domain/userService';
import { setFirebaseUser } from '../Redux/actions';

export default function Update() {
  const allGenres = useSelector((state) => state.genres);
  const allCategories = useSelector((state) => state.categories);
  const { id } = useParams();
  const [genresChoose, setGenresChoose] = useState([]);
  const [categoryChoose, setCategoryChoose] = useState([]);
  const [loader, setLoader] = useState(false);
  const [detail, setDetail] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const firebaseUser = useSelector((state) => state.firebaseUser);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (!firebase.auth().currentUser) {
      navigate('/login');
      swal('You need admin priviledges to edit products');
    }
    firebase.auth().onAuthStateChanged(async (user) => {
      dispatch(setFirebaseUser(user));
      if (user) {
        const userData = await fetchUserData();
        setUserData(userData);
      }
    });
  }, [firebaseUser]);

  useEffect(() => {
    if (userData.role) {
      if (!(userData.role == 'ADMIN' || userData.role === 'MASTER')) {
        swal('You need admin priviledges to access CMS panel').then(() => {
          navigate('/login');
        });
      }
    }
  }, [userData]);

  const [urlStorage, setUrlStorage] = useState(''); //2
  const [file, setFile] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await uploadFile(file);
      setUrlStorage(result);
    } catch (e) {
      console.log(e);
    }
  };

  const saveNewImage = async (file) => {
    try {
      const imageUrl = await uploadFile(file);
      setUrlStorage((prevState) => {
        return imageUrl;
      });
    } catch (e) {
      console.log('error uploading image: ', e);
    }
  };

  useEffect(() => {
    console.log('image changed...uploading file..');
    saveNewImage(file);
  }, [file]);

  const handlerResetGenre = (setFieldValue) => {
    setFieldValue('genre', '');
    setGenresChoose([]);
  };

  const handlerResetCategory = (setFieldValue) => {
    setFieldValue('category', '');
    setCategoryChoose([]);
  };

  async function getData() {
    console.log('called');
    try {
      const response = await axios.get(`${SERVER_URL}/manga/${id}`);
      setDetail(response.data);
      setLoader(false);
    } catch (error) {
      swal('Id not found in manga catalog').then((r) => {
        navigate(-1);
      });
    }
  }

  useEffect(() => {
    if (id) {
      setLoader(true);
      getData(id);
    }
  }, [dispatch]);

  if (id && Object.keys(detail).length === 0) {
    return <h1>loading</h1>;
  }

  return (
    <div className=" h-full">
      <h2 className="font-black text-violet-800 text-3xl text-center pt-10">
        Update Manga Data
      </h2>

      <button className="bg-violet-800 w-20 h-20 rounded-full text-6xl pl-2 ml-4 absolute top-2 hover:bg-violet-600 hover:text-blue-500">
        <IoMdArrowRoundBack onClick={() => navigate(-1)} />
      </button>

      {/* section form */}
      <Formik
        initialValues={{
          canonicalTitle: detail.canonicalTitle,
          subtype: detail.subtype,
          status: detail.status,
          synopsis: detail.synopsis,
          price: detail.price,
          posterImage: detail.posterImage.small.url,
          startDate: detail.startDate,
          genre: detail.genres?.map((e) => e.name),
          category: detail.categories?.map((e) => e.title),
          ageRating: detail.ageRating,
          stockQty: detail.stockQty,
        }}
        validate={(itemsValue) => {
          let errorsBox = {};

          if (!itemsValue.canonicalTitle) {
            errorsBox.canonicalTitle = 'Title is needed';
          }

          if (!itemsValue.subtype) {
            errorsBox.subtype = 'Subtype is needed';
          }

          if (!itemsValue.ageRating) {
            errorsBox.ageRating = 'Age Rating is needed';
          }

          if (!itemsValue.status) {
            errorsBox.status = 'Status is needed';
          }

          if (!itemsValue.synopsis) {
            errorsBox.synopsis = 'Synopsis is needed';
          }

          if (!itemsValue.genre) {
            errorsBox.genre = 'Genre is needed';
          }

          if (!itemsValue.category) {
            errorsBox.category = 'Categories is needed';
          }

          if (!itemsValue.posterImage) {
            errorsBox.posterImage = 'Image URL is required';
          } else if (
            !/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(
              itemsValue.posterImage
            )
          ) {
            errorsBox.posterImage = 'The URL format is wrong';
          }

          if (!itemsValue.price) {
            errorsBox.price = 'Price is needed';
          } else if (
            itemsValue.price <= 0 ||
            /^(?:[1-9]\d{0,9}|0)\.\d$/.test(itemsValue.price)
          ) {
            errorsBox.price = 'The price must be a valid number';
          }

          if (!itemsValue.stockQty) {
            errorsBox.stockQty = 'Stock is needed';
          } else if (
            itemsValue.stockQty <= 0 ||
            !/^(?:[1-9]\d{0,9}|0)$/.test(itemsValue.stockQty)
          ) {
            errorsBox.stockQty = 'The stock must be an integer';
          }

          if (!itemsValue.startDate) {
            errorsBox.startDate = 'Start Date is needed';
          } else if (
            !/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/.test(
              itemsValue.startDate
            )
          ) {
            errorsBox.startDate =
              'The date format is wrong, should be: YYYY-MM-DD';
          }

          return errorsBox;
        }}
        onSubmit={(itemsValue, { resetForm }) => {
          resetForm();
          console.log({
            itemsValue,
          });
          if (itemsValue.genre.length === 0) {
            swal('genre can not be empty');
            return;
          }
          if (itemsValue.category.length === 0) {
            swal('category can not be empty');
            return;
          }
          dispatch(
            updateManga(id, {
              ...itemsValue,
              posterImage: {
                small: {
                  url: urlStorage ? urlStorage : itemsValue.posterImage,
                },
              },
              genre: genresChoose.slice(1),
              categories: categoryChoose.slice(1),
            })
          );
          swal('Your Manga was edited Successfully', {
            button: {
              className:
                'bg-purple-500 p-3 mt-8 text-white hover:bg-white hover:text-purple-700 uppercase font-bold rounded-xl',
            },
          });
          setTimeout(() => {
            navigate(-1);
          }, 2000);
        }}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <div className="flex flex-row justify-center h-full mt-12">
            <Form className=" shadow-4xl rounded-lg px-5 mb-10 h-full md:w-1/2 lg:w-2/5 mx-5 ">
              <div className="mb-5">
                <label
                  htmlFor="canonicalTitle"
                  className="block  uppercase font-bold mt-2"
                >
                  Title
                </label>
                <Field
                  className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-sm"
                  type="text"
                  id="canonicalTitle"
                  name="canonicalTitle"
                  placeholder="Naruto"
                />
                {touched.canonicalTitle && errors.canonicalTitle && (
                  <div className="block text-red-500 font-bold mt-1">
                    {errors.canonicalTitle}
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="posterImage"
                  className="block  uppercase font-bold mt-2"
                >
                  URL Image
                </label>
                <Field
                  className="border-2 w-full p-2 mt-2 text-black placeholder-gray-400 rounded-sm"
                  type="text"
                  id="posterImage"
                  name="posterImage"
                  placeholder="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpCW4O6AT0orARolhUqwpgg4auA-MmmB8-LaALvB1zZNszhjGmrPzZ0wSVwznLpk-n8nU&usqp=CAU"
                />
                {touched.posterImage && errors.posterImage && (
                  <div className="block text-red-500 font-bold mt-1">
                    {errors.posterImage}
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="startDate"
                  className="block uppercase font-bold mt-2"
                >
                  Start Date
                </label>
                <Field
                  className="border-2 w-full p-2 mt-2  text-black placeholder-gray-400 rounded-sm "
                  type="date"
                  id="startDate"
                  name="startDate"
                  placeholder="YYYY-MM-DD"
                />
                {touched.startDate && errors.startDate && (
                  <div className="block text-red-500 font-bold mt-1">
                    {errors.startDate}
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="subtype"
                  className="block  uppercase font-bold mt-2"
                >
                  Subtype
                </label>
                <Field
                  className="border-2 w-full p-2 mt-2 text-black placeholder-gray-400 rounded-sm text-white hover:bg-purple-500 cursos-pointer"
                  name="subtype"
                  as="select"
                >
                  <option value="">Choose an option</option>
                  <option value="doujin">Doujin</option>
                  <option value="manga">Manga</option>
                  <option value="manhua">Manhua</option>
                  <option value="manhwa">Manhwa</option>
                  <option value="novel">Novel</option>
                  <option value="oel">Oel</option>
                  <option value="oneshot">Oneshot</option>
                </Field>
                {touched.subtype && errors.subtype && (
                  <div className="block text-red-500 font-bold mt-1">
                    {errors.subtype}
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="ageRating"
                  className="block uppercase font-bold mt-2"
                >
                  Age Rating
                </label>
                <Field
                  className="border-2 w-full p-2 mt-2 text-black placeholder-gray-400 rounded-sm text-white hover:bg-purple-500 cursos-pointer"
                  name="ageRating"
                  as="select"
                >
                  <option value="">Choose an option</option>
                  <option value="G">G</option>
                  <option value="PG">PG</option>
                  <option value="R">R</option>
                  <option value="R18">R18</option>
                </Field>
                {touched.ageRating && errors.ageRating && (
                  <div className="block text-red-500 font-bold mt-1">
                    {errors.ageRating}
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="status"
                  className="block  uppercase font-bold mt-2"
                >
                  Status
                </label>
                <Field
                  className="border-2 w-full text-black p-2 mt-2 placeholder-gray-400 rounded-sm text-white hover:bg-purple-500 cursos-pointer"
                  name="status"
                  as="select"
                >
                  <option value="">Choose an option</option>
                  <option value="current">Current</option>
                  <option value="finished">Finished</option>
                  <option value="tba">TBA</option>
                  <option value="unreleased">Unreleased</option>
                  <option value="upcoming">Upcoming</option>
                </Field>
                {touched.status && errors.status && (
                  <div className="block text-red-500 font-bold mt-1">
                    {errors.status}
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="genre"
                  className="block  uppercase font-bold mt-2"
                >
                  Genres
                </label>
                <Field
                  className="border-2 w-full text-black p-2 mt-2 placeholder-gray-400 rounded-sm text-white hover:bg-purple-500 cursos-pointer"
                  name="genre"
                  id="genre"
                  as="select"
                >
                  <option value="">Choose one or more options</option>
                  {allGenres.map((genre) => (
                    <option key={genre.id} value={genre.name}>
                      {genre.name.toUpperCase()}
                    </option>
                  ))}
                </Field>
                {touched.genre && errors.genre && (
                  <div className="block text-red-500 font-bold mt-1">
                    {errors.genre}
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block  uppercase font-bold mt-2"
                >
                  Categories
                </label>
                <Field
                  className="border-2 w-full text-black p-2 mt-2 placeholder-gray-400 rounded-sm text-white hover:bg-purple-500 cursos-pointer"
                  name="category"
                  as="select"
                >
                  <option value="">Choose one or more options</option>
                  {allCategories.map((categories) => (
                    <option key={categories.id} value={categories.title}>
                      {categories.title.toUpperCase()}
                    </option>
                  ))}
                </Field>
                {touched.category && errors.category && (
                  <div className="block text-red-500 font-bold mt-1">
                    {errors.category}
                  </div>
                )}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="price"
                  className="block  uppercase font-bold mt-2"
                >
                  Price
                </label>
                <Field
                  className="border-2 w-full text-black p-2 mt-2 placeholder-gray-400 rounded-sm"
                  type="text"
                  id="price"
                  name="price"
                  placeholder="9.99"
                />
                {touched.price && errors.price && (
                  <div className="block  text-red-500 font-bold mt-1">
                    {errors.price}
                  </div>
                )}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="stockQty"
                  className="block  uppercase font-bold mt-2"
                >
                  Stock
                </label>
                <Field
                  className="border-2 w-full text-black p-2 mt-2 placeholder-gray-400 rounded-sm"
                  type="text"
                  id="stockQty"
                  name="stockQty"
                  placeholder="4"
                />
                {touched.stockQty && errors.stockQty && (
                  <div className="block  text-red-500 font-bold mt-1">
                    {errors.stockQty}
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="synopsis"
                  className="block  uppercase font-bold mt-2"
                >
                  Synopsis
                </label>
                <Field
                  className="border-2 w-full text-black p-2 mt-2 placeholder-gray-400 rounded-sm"
                  name="synopsis"
                  as="textarea"
                  placeholder="This manga is about...."
                />
                {touched.synopsis && errors.synopsis && (
                  <div className="block text-red-500 font-bold mt-1">
                    {errors.synopsis}
                  </div>
                )}
              </div>

              <button
                className="bg-purple-500 w-full p-3 mt-8 text-white uppercase font-bold hover:bg-purple-700 cursor-pointer transition-colors rounded-xl"
                type="submit"
              >
                Update Manga
              </button>
            </Form>
            <div className="bg-white shadow-2xl rounded-lg pt-10 px-5 mb-10 md:w-1/2 lg:w-2/5 flex flex-col justify-evenly">
              <p className=" text-base font-bold uppercase text-teal-700 mb-2 text-center">
                Title:
                <span className="pl-2 dark:text-gray-400 italic">
                  {values.canonicalTitle}
                </span>
              </p>
              <div>
                {/*4 */}
                <form onSubmit={handleSubmit}>
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <img
                    className="rounded-t-lg px-3 py-1"
                    src={urlStorage ? urlStorage : values.posterImage}
                    alt={values.canonicalTitle}
                  />
                </form>
              </div>
              <div className="px-4 py-3 flex flex-col">
                <p className="text-1xl font-bold text-gray-700 mb-4">
                  Synopsis:
                  <span className="pl-2 dark:text-gray-400 italic">
                    {values.synopsis}
                  </span>
                </p>
                <p className="text-1xl font-bold text-gray-700 mb-4">
                  Status :
                  <span className="pl-2 dark:text-gray-400 italic">
                    {values.status}
                  </span>
                </p>
                <p className="text-1xl font-bold text-gray-700 mb-4">
                  Subtype:
                  <span className="pl-2 dark:text-gray-400 italic">
                    {values.subtype}
                  </span>
                </p>
                <p className="text-1xl font-bold text-gray-700 mb-4">
                  Age Rating:
                  <span className="pl-2 dark:text-gray-400 italic">
                    {values.ageRating}
                  </span>
                </p>
                <p className="text-1xl font-bold text-gray-700 mb-4">
                  Start Date:
                  <span className="pl-2 dark:text-gray-400 italic">
                    {values.startDate}
                  </span>
                </p>
                <div className="flex flex-col items-start">
                  <p className="text-1xl font-bold text-gray-700 flex flex-row">
                    Genres:
                    {console.log(genresChoose)}
                    {!genresChoose.includes(values.genre) &&
                      setGenresChoose([...genresChoose, values.genre])}
                    {console.log(genresChoose)}
                    {genresChoose?.slice(1).map((el) => (
                      <div className="flex flex-col">
                        <p className="pl-2 dark:text-gray-400 italic">{el}</p>
                      </div>
                    ))}
                  </p>
                  <button
                    className="text-red-400 text-xs flex mb-4 border-red-500 hover:text-white p-1 mt-1 hover:bg-red-600 font-bold cursor-pointer rounded-md"
                    onClick={() => handlerResetGenre(setFieldValue)}
                  >
                    Reset
                  </button>
                </div>
                <div className="flex flex-col items-start">
                  <p className="text-1xl font-bold text-gray-700 flex flex-row">
                    Categories:
                    {!categoryChoose.includes(values.category) &&
                      setCategoryChoose([...categoryChoose, values.category])}
                    {categoryChoose?.slice(1).map((el) => (
                      <div className="flex flex-col">
                        <p className="pl-2 dark:text-gray-400 italic">{el}</p>
                      </div>
                    ))}
                  </p>
                  <button
                    className="text-red-400 text-xs flex mb-4 border-red-500 hover:text-white p-1 mt-1 hover:bg-red-600 font-bold cursor-pointer rounded-md"
                    onClick={() => handlerResetCategory(setFieldValue)}
                  >
                    Reset
                  </button>
                </div>
                <p className="text-1xl font-bold text-gray-700 mb-4">
                  Price:
                  <span className="pl-2 dark:text-gray-400 italic">
                    $ {values.price}
                  </span>
                </p>
                <p className="text-1xl font-bold text-gray-700 mb-4">
                  Stock:
                  <span className="pl-2 dark:text-gray-400 italic">
                    {values.stockQty}
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
}
