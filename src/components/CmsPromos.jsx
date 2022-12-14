import React, { useState, useEffect } from 'react';
import { MdLocalOffer } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { BsFillBarChartFill } from 'react-icons/bs';
import { postPromotion, getPromos, deletePromos } from '../Redux/actions';
import { MdDisabledByDefault } from 'react-icons/md';

function CmsPromos() {
  const dispatch = useDispatch();
  const allCategories = useSelector((state) => state.categories);
  const allPromos = useSelector((state) => state.promos);

  const [categoryChoose, setCategoryChoose] = useState([]); //1 Categorias

  const [inputs, setInputs] = useState({
    name: '',
    categories: [],
    description: '',
    discountRate: '',
    start: '',
    end: '',
  });

  const [errorName, setErrorName] = useState(false);
  const [errorDescription, setErrorDescription] = useState(false);
  const [errorCategories, setErrorCategories] = useState(false);
  const [errorDiscountRate, setErrorDiscountRate] = useState(false);
  const [errorStart, setErrorStart] = useState(false);
  const [errorEnd, setErrorEnd] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState(false);

  //name
  const handleChangeName = (e) => {
    e.preventDefault();

    if (e.target.value.length > 255) {
      setErrorName('Maximum character capacity 255');
    } else {
      setErrorName(false);
    }

    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
    console.log(inputs);
  };

  //Cat
  const handleChangeCat = (e) => {
    if (e.target.name === 'categories' && !e.target.value) {
      setErrorCategories('Select at least one category');
    } else {
      setErrorCategories(false);
    }

    setInputs({
      ...inputs,
      categories: [...inputs.categories, e.target.value],
    });
    setCategoryChoose([...categoryChoose, e.target.value]);
    console.log(inputs.categories);
  };

  //description
  const handleChangeDes = (e) => {
    e.preventDefault();

    if (e.target.value.length > 255) {
      setErrorDescription('Maximum character capacity 255');
    } else {
      setErrorDescription(false);
    }

    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
    console.log(inputs);
  };

  //Descuento
  const handleChangeDescuen = (e) => {
    e.preventDefault();

    if (e.target.value < 0.01 || e.target.value > 0.99) {
      setErrorDiscountRate('Wrong value ( 0.01 - 0.99 )');
    } else {
      setErrorDiscountRate(false);
    }

    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
    console.log(inputs);
  };

  //start
  const handleChangeStart = (e) => {
    e.preventDefault();

    const day = e.target.value.split('-')[2];
    const month = e.target.value.split('-')[1];
    const year = e.target.value.split('-')[0];

    const date = new Date();

    const currentDay = date.getDate();
    const currentMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear();

    if (year < currentYear) {
      setErrorStart('Date before today');
    } else if (year > currentYear) {
      setErrorStart(false);
    } else if (month < currentMonth || day < currentDay) {
      setErrorStart('Date before today');
    } else {
      setErrorStart(false);
    }

    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
    console.log(inputs);
  };

  //End
  const handleChangeEnd = (e) => {
    const day = e.target.value.split('-')[2];
    const month = e.target.value.split('-')[1];
    const year = e.target.value.split('-')[0];

    const date = new Date();

    const currentDay = date.getDate();
    const currentMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear();

    if (year < currentYear) {
      setErrorEnd('Date before today');
    } else if (year > currentYear) {
      setErrorEnd(false);
    } else if (month < currentMonth || day <= currentDay) {
      setErrorEnd('Date before today');
    } else {
      setErrorEnd(false);
    }

    e.preventDefault();
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
    console.log(inputs);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !inputs.categories ||
      !inputs.description ||
      !inputs.discountRate ||
      !inputs.end ||
      !inputs.start ||
      !inputs.name
    ) {
      setErrorSubmit('Missing parameters, all fields are required');
    } else {
      setErrorSubmit(false);
      dispatch(postPromotion(inputs));
      alert('Se creo de manera correcta!');
      dispatch(getPromos());
    }
  };

  function handleResetCat(e) {
    e.preventDefault(e);
    setCategoryChoose([]);
    setInputs({
      ...inputs,
      categories: [],
    });
    dispatch(getPromos());
  }

  function deletePromo(e) {
    dispatch(deletePromos(e));
  }

  useEffect(() => {
    dispatch(getPromos());
  }, [deletePromo]);

  useEffect(() => {
    dispatch(getPromos());
  }, []);

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-2">
        <form
          className="bg-gray-100 rounded-md p-5 m-4 h-[100vh]  "
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="pl-2 pt-2 rounded-md  duration-300 bg-gradient-to-r from-gray-300 to-white-500">
            <div className="p-1 w-[31px] object-contain rounded-full bg-blue-400 text-2xl ">
              <MdLocalOffer />
            </div>

            <div className="flex text-gray-600">
              <h1 className="text-gray-600 text-xl font-bold  mb-7">
                Create Promotions
              </h1>
            </div>
          </div>

          <div className="">
            <div className="pl-2 pb-5 pr-3 mt-2  pt-2 rounded-md  duration-300 bg-gray-300 text-gray-600">
              <h3 className="font-bold text-gray-600">1.- Name: </h3>
              {errorName && (
                <p className="text-red-600  font-bold pr-2">{errorName}</p>
              )}
              <input
                className="w-96"
                onChange={(e) => handleChangeName(e)}
                value={inputs.name}
                name="name"
                type="text"
                required=""
              />
            </div>

            <div className=" pl-2 pb-3 pr-3 mt-2  pt-2 rounded-md  duration-300 bg-gray-300 text-gray-600">
              <h3 className="font-bold text-gray-600">2.- Category: </h3>
              {errorCategories && (
                <p className="text-red-600  font-bold pr-2">
                  {errorCategories}
                </p>
              )}
              <div className="flex ">
                <select
                  className="w-96"
                  onChange={(e) => handleChangeCat(e)}
                  name="categories"
                  required=""
                >
                  <option className="text-gray-600 text-xl font-bold">
                    {' '}
                    Categories{' '}
                  </option>
                  {allCategories.map((categories) => (
                    <option
                      className="text-gray-600 text-x font-bold"
                      value={categories.title}
                    >
                      {categories.title.toLowerCase()}
                    </option>
                  ))}
                </select>

                <>
                  {categoryChoose?.map((el) => (
                    <span className="flex flex-col p-1 ">
                      <p className="pl-2 pr-2 dark:text-gray-400 italic border-2 border-red-500  rounded-md">
                        {el}
                      </p>
                    </span>
                  ))}
                </>
              </div>

              <button
                className="text-gray-600 text-xs flex mb-1 border-red-500 hover:text-white pl-1 pr-1 pb-1 mt-2 bg-purple-300 font-bold cursor-pointer rounded-md"
                onClick={(e) => handleResetCat(e)}
              >
                Reset
              </button>
            </div>

            <div className="pl-2 pb-5 pr-3 mt-2  pt-2 rounded-md  duration-300 bg-gray-300 text-gray-600">
              <h3 className="font-bold text-gray-600">3.- Description: </h3>
              {errorDescription && (
                <p className="text-red-600  font-bold pr-2">
                  {errorDescription}
                </p>
              )}
              <textarea
                className="w-full"
                onChange={(e) => handleChangeDes(e)}
                value={inputs.description}
                name="description"
                type="text"
                required=""
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="p-5 pl-2 mt-8 rounded-md inline-block duration-300 bg-gray-300 text-gray-600">
                <h3 className="font-bold text-gray-600">4.- Discount Rate: </h3>
                {errorDiscountRate && (
                  <p className="text-red-600  font-bold pr-2">
                    {errorDiscountRate}
                  </p>
                )}

                <input
                  className="w-20"
                  onChange={(e) => handleChangeDescuen(e)}
                  value={inputs.discountRate}
                  name="discountRate"
                  step="0.01"
                  type="number"
                  required=""
                />
              </div>

              <div className="p-5 pl-2 mt-8  pt-2 rounded-md inline-block duration-300 bg-gray-300 text-gray-600">
                <h3 className="font-bold text-gray-600">5.- Start Date: </h3>
                {errorStart && (
                  <p className="text-red-600  font-bold pr-2">{errorStart}</p>
                )}

                <input
                  onChange={(e) => handleChangeStart(e)}
                  value={inputs.start}
                  name="start"
                  type="date"
                  required=""
                />
              </div>

              <div className="p-5 pl-2 mt-8  pt-2 rounded-md inline-block duration-300 bg-gray-300 text-gray-600">
                <h3 className="font-bold text-gray-600">6.- End Date: </h3>
                {errorEnd && (
                  <p className="text-red-600  font-bold pr-2">{errorEnd}</p>
                )}

                <input
                  onChange={(e) => handleChangeEnd(e)}
                  value={inputs.end}
                  name="end"
                  type="date"
                  required=""
                />
              </div>
            </div>

            <div className="ml-20">
              <button className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursos-pointer bg-purple-400 hover:bg-purple-600 text-white cursor-pointer ">
                <h3 className="font-bold text-gray-600">Apply</h3>
              </button>
              {errorSubmit && (
                <p className="text-red-600  font-bold pr-2">{errorSubmit}</p>
              )}
            </div>
          </div>
        </form>

        <div className="bg-gray-100 rounded-md p-5 m-4 h-[100vh] overflow-auto ">
          <div className="pl-2 pt-2 rounded-md  duration-300 bg-gradient-to-r from-gray-300 to-white-500">
            <div className="p-1 w-[31px] object-contain rounded-full bg-yellow-200 text-2xl ">
              <BsFillBarChartFill />
            </div>

            <div className="flex text-gray-600">
              <h1 className="text-gray-600 text-xl font-bold  mb-7">
                Current Promotions
              </h1>
            </div>
          </div>

          <div>
            {allPromos.map((e) => {
              return (
                <div className="pl-2 pb-2  mt-2  pt-2 rounded-md  duration-300 bg-gray-300">
                  <div className="flex">
                    {' '}
                    <h2 className="text-gray-600  font-bold pr-2">
                      Name:{' '}
                    </h2>{' '}
                    <h2 className="font-sans text-gray-600"> {e.name} </h2>{' '}
                  </div>
                  <div className="flex">
                    {' '}
                    <h2 className="text-gray-600  font-bold pr-2">
                      DiscountRate:{' '}
                    </h2>{' '}
                    <h2 className="font-sans text-gray-600">
                      {' '}
                      {e.discountRate}{' '}
                    </h2>
                  </div>
                  <div className="flex">
                    {' '}
                    <h2 className="text-gray-600  font-bold pr-2">
                      StartDate:{' '}
                    </h2>{' '}
                    <h2 className="font-sans text-gray-600"> {e.start} </h2>{' '}
                  </div>
                  <div className="flex">
                    {' '}
                    <h2 className="text-gray-600  font-bold pr-2">
                      EndDate:
                    </h2>{' '}
                    <h2 className="font-sans text-gray-600"> {e.end} </h2>{' '}
                  </div>
                  <div className="flex">
                    {' '}
                    <h2 className="text-gray-600  font-bold pr-2">
                      Categories:
                    </h2>{' '}
                    {e.categories.map((c) => {
                      return (
                        <div>
                          {' '}
                          <h2 className="pl-1 pr-1  mr-2 dark:text-gray-400 italic border-2 border-red-500 rounded-md text-gray-600">
                            {' '}
                            {c.title}{' '}
                          </h2>{' '}
                        </div>
                      );
                    })}
                  </div>

                  <div className="text-gray-600 inline-block flex  justify-center mt-2">
                    <button
                      onClick={() => deletePromo(e.id)}
                      className="p-1   object-contain rounded-full bg-red-400  cursor-pointer flex"
                    >
                      <MdDisabledByDefault className="mt-1" />
                      <h2 className="text-gray-600 font-bold pr-2">Cancel</h2>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CmsPromos;
