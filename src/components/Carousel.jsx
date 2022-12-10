import data from '../data/data'
import {FiChevronRight, FiChevronLeft} from 'react-icons/fi'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getPromos } from "../Redux/actions";

export const Carousel = () => {
    const [activeSlider, setActiveSlider] = useState(1);
    const dispatch = useDispatch();
    const promos = useSelector((state) => state.promos);

    useEffect (()=>{
        dispatch(getPromos());
    }, [dispatch])
    
    const prevSliderHandler = () => {
            setActiveSlider(activeSlider === promos.length - 1 ? 0 : activeSlider + 1)
        }

    const nextSliderHandler = () => {
            setActiveSlider(activeSlider === 0 ? promos.length -1 : activeSlider - 1)
        }
        
    return (
        <div className='w-full mt-2' >
            {promos.map((item, index) => {
                const { name, description, categories } = item
                return <div key={index} className={activeSlider === index ? 'flex justify-between items-center' : 'hidden'}>
                    <button className='text-6xl absolute left-0 bg-white rounded-full text-blue-600 hover:bg-blue-600 hover:text-white' 
                            onClick={prevSliderHandler}>
                        <FiChevronLeft/>
                    </button>
                    <div className='text-3xl w-full'>
                        <img src={'https://cdn.pixabay.com/photo/2017/12/20/16/49/christmas-3030279__340.jpg'} alt='' className='h-80 w-screen'/>
                        <h5 className='text-center'>
                            <b className='text-purple-700'>{name.toUpperCase()}</b> : {description} on our volumes of the categories <b className='text-purple-700'>{categories[0].title.toUpperCase()}</b> 
                        </h5>
                    </div>
                    <button className='text-6xl absolute right-0 bg-white rounded-full text-blue-600 hover:bg-blue-600 hover:text-white' 
                            onClick={nextSliderHandler}>
                        <FiChevronRight/>
                    </button>
                </div>
            })}
        </div>
    )
}
