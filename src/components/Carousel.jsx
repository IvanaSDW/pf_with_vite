import data from '../data/data'
import {FiChevronRight, FiChevronLeft} from 'react-icons/fi'
import { useState } from 'react';

export const Carousel = () => {
    const slider = data;
    const [activeSlider, setActiveSlider] = useState(1);

    const prevSliderHandler = (id) => {
        if (id === 1) {
            setActiveSlider(slider.length)
        } else if (id > 1){
            setActiveSlider(activeSlider - 1)
        } else {
            setActiveSlider(slider.length - 1)
        }
    }

    const nextSliderHandler = (id) => {
        if (id === slider.length) {
            setActiveSlider(1)
        } else if (id < slider.length){
            setActiveSlider(activeSlider + 1)
        } else {
            setActiveSlider(slider.length - 1)
        }
    }

    return (
        <div className='w-full mt-2' >
            {slider.map((item) => {
                const { id, image } = item
                return <div key={id} className={activeSlider === id ? 'flex justify-between items-center' : 'hidden'}>
                    <button className='text-6xl absolute left-0 bg-white rounded-full text-blue-600 hover:bg-blue-600 hover:text-white' 
                            onClick={() => prevSliderHandler(id)}>
                        <FiChevronLeft/>
                    </button>
                    <div className='text-6xl w-full'>
                        <img src={image} alt='' className='h-80 w-screen'/>
                    </div>
                    <button className='text-6xl absolute right-0 bg-white rounded-full text-blue-600 hover:bg-blue-600 hover:text-white' 
                            onClick={() => nextSliderHandler(id)}>
                        <FiChevronRight/>
                    </button>
                </div>
            })}
        </div>
    )
}
