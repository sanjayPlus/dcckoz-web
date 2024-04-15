"use client"
import BottomNav from '@/components/BottomNav'
import MobileContainer from '@/components/MobileContainer'
import SERVER_URL from '@/config/SERVER_URL'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { AiFillLike } from 'react-icons/ai'
import { CiShare2 } from 'react-icons/ci'
import { MdArrowBackIosNew } from 'react-icons/md'


function Gallery() {
    const router = useRouter();
    const [gallery, setGallery] = useState<any>([]);
  
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            router.push('/login')
        }
        axios.get(SERVER_URL + '/user/protected', {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        }).catch((error) => {
            router.push('/login')
            localStorage.removeItem('token')
        })
        axios.get(SERVER_URL + '/admin/events').then((response) => {
            setGallery(response.data)
        });

    }, []);


    const shareContent = (item:any) => {
        if (navigator.share) {
          navigator.share({
            title: item.title,
            text: item.description,
            url: item.url,
          })
            .then(() => console.log('Shared successfully'))
            .catch((error) => console.error('Error sharing:', error));
        } else {
          console.log('Web Share API not supported.');
          // Fallback to other methods like opening a share modal or using other social media SDKs.
        }
      };
      

    return (
        <>
            <MobileContainer>
                <div className="gallery-container w-full min-h-screen flex flex-col justify-start items-center relative" style={{ backgroundImage: "url('images/backimg.jpeg')", backgroundSize: "cover" }}>
                    <MdArrowBackIosNew className='text-xl cursor-pointer absolute top-4 left-4 top-text' onClick={() => router.back()} />
                    <h1 className='text-black text-2xl font-bold text-center my-7 top-text'>Events Gallery</h1>
                    <div className='w-80 flex flex-col justify-center items-center pt-1 rounded-md  pb-16'>
                        {
                            gallery.map((item: any, index: any) => (
                                <>
                                    <div className="galery-card w-[86%] flex flex-col justify-center items-center bg-white shadow-lg p-5 rounded-xl my-2" key={index}>
                                        <div className="gallery-image w-[260px] h-28 relative" style={{ backgroundImage: `url(${item.image})`, backgroundSize: "contain", backgroundPosition: "center", backgroundRepeat: "no-repeat" }} onClick={() => window.open(item.url)}>
                                            <div className='text-xl absolute top-32 bottom-1 right-3 w-10 h-10 flex justify-center items-center  rounded-full cursor-pointer shadow-md' onClick={() => shareContent(item)} >
                                            <CiShare2 size={18} className='text-gray-500'   />
                                                
                                            </div>
                                        </div>

                                        <h3 className='text-xl font-semibold my-2'>{item.title}</h3>
                                        <p className='text-sm'>{item.description}</p>
                                    </div>
                                </>
                            ))
                        }
                    </div>
                </div>

            </MobileContainer>
        </>
    )
}

export default Gallery