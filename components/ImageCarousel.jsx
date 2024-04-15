import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/bundle';
import { Autoplay, EffectCoverflow, Zoom } from 'swiper/modules';
import Link from 'next/link';
function ImageCarousel({ carousel }) {
    const slides = [];
    carousel.map((image) => {

        slides.push(<SwiperSlide key={image._id} >
            <Link href={image.href}>
                <img src={image.image} className='w-[100%] bg-cover rounded-lg' alt="" />
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

export default ImageCarousel