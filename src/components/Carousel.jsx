import data from '../data/data'
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getMangas, getPromos } from "../Redux/actions";

export const Carousel = () => {
    const [activeSlider, setActiveSlider] = useState(1);
    const dispatch = useDispatch();
    const promos = useSelector((state) => state.promos);

    useEffect(() => {
        dispatch(getPromos())
    }, [dispatch])

    const prevSliderHandler = () => {
        setActiveSlider(activeSlider === promos.length - 1 ? 0 : activeSlider + 1)
    }

    const nextSliderHandler = () => {
        setActiveSlider(activeSlider === 0 ? promos.length - 1 : activeSlider - 1)
    }

    return (
        <div className='w-full mt-2' >
            {promos.map((item, index) => {
                const { name, description, categories, imageOne, imageTwo } = item
                return <div key={index} className={activeSlider === index ? 'flex justify-between items-center' : 'hidden'}>
                    <button className='text-6xl absolute left-0 bg-white rounded-full text-blue-600 hover:bg-blue-600 hover:text-white'
                        onClick={prevSliderHandler}>
                        <FiChevronLeft />
                    </button>
                    <div className='text-3xl w-full'>
                        <div className='grid grid-cols-3 content-evenly justify-items-center bg-[url(https://img.freepik.com/fotos-premium/arreglo-navideno-decorativo-espacio-copia_23-2149155894.jpg?w=740)] bg-no-repeat bg-cover bg-center bg-fixed h-64'>

                            <img src={imageOne} alt='' className='h-56 align-middle rounded-full grayscale ml-10' />

                            <h5 className='text-center content-center mt-14 text-black'>
                                <b className='text-purple-700'>{name.toUpperCase()}</b> : {description} on our volumes of the categories <b className='text-purple-700'>{categories[0].title.toUpperCase()}</b> 
                            </h5>

                            <img src={imageTwo} alt='' className='h-56 align-middle rounded-full grayscale mr-10' />
                        </div>


                    </div>
                    <button className='text-6xl absolute right-0 bg-white rounded-full text-blue-600 hover:bg-blue-600 hover:text-white'
                        onClick={nextSliderHandler}>
                        <FiChevronRight />
                    </button>
                </div>
            })}
        </div>
    )
}
