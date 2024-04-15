import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/bundle';
import { Autoplay, EffectCoverflow, Zoom } from 'swiper/modules';
import Link from 'next/link';
function AdsCarousel({ carousel }) {
    const slides = [];
    carousel.map((ads) => {

        slides.push(<SwiperSlide key={ads._id} >

            <Link href={ads.href===null?"/":ads.href}>
                <img src={ads.image} className='w-[100%] bg-cover rounded-lg' alt="" />
            </Link>
        </SwiperSlide>);
    })


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

                    {slides}
                </Swiper>
            </div>
        </>
    )
}

export default AdsCarousel