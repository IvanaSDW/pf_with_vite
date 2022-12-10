import React, { useState, useEffect } from 'react'
import { MdLocalOffer } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { BsFillBarChartFill } from "react-icons/bs";
import { postPromotion, getPromos, deletePromos } from '../Redux/actions';
import { MdDisabledByDefault } from "react-icons/md";


function Promotions() {
    const dispatch = useDispatch()
    const allCategories = useSelector((state) => state.categories);
    const allPromos = useSelector((state) => state.promos)

    const [categoryChoose, setCategoryChoose] = useState([]);  //1 Categorias

    const [inputs, setInputs] = useState({ name: "", categories: [], description: "", discountRate: "", start: "", end: "" })

    //name
    const handleChangeName = (e) => {
        e.preventDefault();
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
        console.log(inputs)
    }

    //Cat
    const handleChangeCat = (e) => {
        setInputs({
            ...inputs,
            categories: [...inputs.categories, e.target.value]
        });
        setCategoryChoose([...categoryChoose, e.target.value])
        console.log(inputs.categories)
    }

    //description
    const handleChangeDes = (e) => {
        e.preventDefault();
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
        console.log(inputs)
    }

    //Descuento
    const handleChangeDescuen = (e) => {
        e.preventDefault();
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
        console.log(inputs)
    }

    //start
    const handleChangeStart = (e) => {
        e.preventDefault();
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
        console.log(inputs)
    }

    //End
    const handleChangeEnd = (e) => {
        e.preventDefault();
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
        console.log(inputs)
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(postPromotion(inputs))
        alert('Se creo de manera correcta!')
    }


    function handleResetCat(e) {
        e.preventDefault(e)
        setCategoryChoose([])
        setInputs({
            ...inputs,
            categories: []
        });
    }

    function deletePromo(e){
        dispatch(deletePromos(e))
    }

    useEffect(() => {
        dispatch(getPromos())
    }, [])





    return (
        <div>
            <div className='flex'>
                <form onSubmit={(e) => handleSubmit(e)} className='bg-gray-100 rounded-md p-5 m-10 w-[900px] h-[780px]  '>
                    <div className='pl-2 pt-2 rounded-md  duration-300 bg-gradient-to-r from-gray-300 to-white-500' >
                        <div className='p-1 w-[31px] object-contain rounded-full bg-blue-400 text-2xl ' >
                            <MdLocalOffer />
                        </div>

                        <div className='flex text-gray-600' >
                            <h1 className='text-gray-600 text-xl font-bold  mb-7' >Create Promotions</h1>
                        </div>
                    </div>

                    <div className='' >


                        <div className='pl-2 pb-5 pr-3 mt-2  pt-2 rounded-md  duration-300 bg-gray-300 text-gray-600'>
                            <h3 className='font-bold text-gray-600'>1.- Name: </h3>
                            <input onChange={(e) => handleChangeName(e)} value={inputs.name} name="name" type="text" required="" />
                        </div >



                        <div className=' pl-2 pb-3 pr-3 mt-2  pt-2 rounded-md  duration-300 bg-gray-300 text-gray-600'>
                            <h3 className='font-bold text-gray-600'>2.- Category: </h3>

                            <div className='flex ' >
                                <select onChange={(e) => handleChangeCat(e)} name="categories" required="" >
                                    <option className='text-gray-600 text-xl font-bold'  > Categories </option>
                                    {allCategories.map((categories) => (
                                        <option
                                            className='text-gray-600 text-x font-bold'
                                            value={categories.title}
                                        >
                                            {categories.title.toLowerCase()}
                                        </option>
                                    ))}
                                </select>

                                <>
                                    {categoryChoose?.map((el) => (
                                        <span className="flex flex-col p-1 ">
                                            <p className="pl-2 pr-2 dark:text-gray-400 italic border-2 border-red-500  rounded-md">{el}</p>
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


                        </div >


                        <div className='pl-2 pb-5 pr-3 mt-2  pt-2 rounded-md  duration-300 bg-gray-300 text-gray-600'>
                            <h3 className='font-bold text-gray-600'>3.- Description: </h3>
                            <input onChange={(e) => handleChangeDes(e)} value={inputs.description} name="description" type="text" required="" />
                        </div >

                        <div className='pl-2 pb-5 pr-3 mt-2  pt-2 rounded-md inline-block  duration-300 bg-gray-300 text-gray-600' >
                            <h3 className='font-bold text-gray-600'>4.- Discount Rate: </h3>
                            <input onChange={(e) => handleChangeDescuen(e)} value={inputs.discountRate} name="discountRate" step="0.01" type="number" required="" />
                        </div >

                        <div></div>

                        <div className='p-5 pl-2 mt-8  pt-2 rounded-md inline-block duration-300 bg-gray-300 text-gray-600'>
                            <h3 className='font-bold text-gray-600' >5.- Start Date: </h3>
                            <input onChange={(e) => handleChangeStart(e)} value={inputs.start} name="start" type="date" required="" />
                        </div>

                        <div></div>

                        <div className='p-5 pl-2 mt-8  pt-2 rounded-md inline-block duration-300 bg-gray-300 text-gray-600'>
                            <h3 className='font-bold text-gray-600' >6.- End Date: </h3>
                            <input onChange={(e) => handleChangeEnd(e)} value={inputs.end} name="end" type="date" required="" />
                        </div>


                        <div className='ml-20' >
                            <button
                                className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursos-pointer bg-purple-400 hover:bg-purple-600 text-white cursor-pointer '>
                                <h3 className='font-bold text-gray-600' >Apply</h3>
                            </button>
                        </div>


                    </div>


                </form>

                <div className='bg-gray-100 rounded-md p-5 mt-10 mb-10 w-[450px] h-[780px] overflow-auto '>
                    <div className='pl-2 pt-2 rounded-md  duration-300 bg-gradient-to-r from-gray-300 to-white-500' >
                        <div className='p-1 w-[31px] object-contain rounded-full bg-yellow-200 text-2xl ' >
                            <BsFillBarChartFill />
                        </div>

                        <div className='flex text-gray-600' >
                            <h1 className='text-gray-600 text-xl font-bold  mb-7' >Current Promotions</h1>
                        </div>
                    </div>

                    <div>
                        {allPromos.map((e) => {
                            return (
                                <div className='pl-2 pb-2  mt-2  pt-2 rounded-md  duration-300 bg-gray-300' >
                                    <div className='flex'> <h2 className='text-gray-600  font-bold pr-2' >Name: </h2>  <h2 className='font-sans text-gray-600' >  {e.name} </h2>      </div>
                                    <div className='flex'> <h2 className='text-gray-600  font-bold pr-2' >DiscountRate: </h2>  <h2 className='font-sans text-gray-600'  >  {e.discountRate} </h2></div>
                                    <div className='flex'> <h2 className='text-gray-600  font-bold pr-2' >StartDate: </h2>  <h2 className='font-sans text-gray-600' >  {e.start} </h2> </div>
                                    <div className='flex'> <h2 className='text-gray-600  font-bold pr-2' >EndDate:</h2>  <h2 className='font-sans text-gray-600' >  {e.end} </h2> </div>
                                    <div className='flex'> <h2 className='text-gray-600  font-bold pr-2' >Categories:</h2>  {e.categories.map((c) => {
                                        return (
                                            <div > <h2 className='pl-1 pr-1  mr-2 dark:text-gray-400 italic border-2 border-red-500 rounded-md text-gray-600' > {c.title}  </h2> </div>
                                        )

                                    })}</div>

                                    <div className='text-gray-600 inline-block flex  justify-center mt-2' >
                                        <button onClick={() => deletePromo(e.id)  } className='p-1   object-contain rounded-full bg-red-400  cursor-pointer flex' >
                                            <MdDisabledByDefault className='mt-1' />
                                            <h2 className='text-gray-600 font-bold pr-2' >Cancel</h2>
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>


                </div>

            </div>


        </div>
    )
}

export default Promotions