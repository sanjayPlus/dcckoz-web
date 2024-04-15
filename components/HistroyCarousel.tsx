import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/bundle';
import { Autoplay, EffectCoverflow, Zoom } from 'swiper/modules';
function HistroyCarousel() {
    const slides = [];
    for (let i = 1; i <= 14; i++) {
        slides.push(<SwiperSlide key={i} ><img src={`./history/${i}.jpeg`} className='w-[100%] h-[300px] bg-cover rounded-lg' alt="" /></SwiperSlide>);
      }

    return (
        <>
            <div className='w-full h-50'>
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

                    {slides}
                </Swiper>
            </div>
        </>
    )
}

export default HistroyCarousel