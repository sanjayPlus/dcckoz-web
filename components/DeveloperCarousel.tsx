import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/bundle';
import { Autoplay, EffectCoverflow, Zoom } from 'swiper/modules';
import axios from 'axios';
import SERVER_URL from '@/config/SERVER_URL';
function DeveloperCarousel() {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get(SERVER_URL + "/admin/developers").then((response) => {
            setData(response.data);
        })
    },[])


    return (
        <>
            <div className='w-full'>
                <Swiper
                          effect={'coverflow'}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                    centeredSlides={true}
                    modules={[
                        Autoplay,
                        Zoom,
                        EffectCoverflow
                    ]}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    grabCursor={true}
                    slidesPerView={'auto'}
                    coverflowEffect={{
                      rotate: 0,
                      stretch: 0,
                      depth: 100,
                      modifier: 2.5,
                    }}
                >

                {
                    data.map((developer:any) => {
                        return (
                            <SwiperSlide key={developer?._id} >
                                <img src={developer?.image} className='w-[100%] bg-cover rounded-lg' alt="" />
                            </SwiperSlide>
                        )
                    })
                }
                </Swiper>
            </div>
        </>
    )
}

export default DeveloperCarousel