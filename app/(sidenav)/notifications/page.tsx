"use client"
import BottomNav from '@/components/BottomNav'
import MobileContainer from '@/components/MobileContainer'
import SERVER_URL from '@/config/SERVER_URL'
import { laborUnions } from '@/contants/labourUnion'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { AiFillLike } from 'react-icons/ai'
import { MdArrowBackIosNew } from 'react-icons/md'


function Notification() {
    const router = useRouter();
    const [Notification, setNotification] = useState<any>([]);
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
        });
        axios.get(SERVER_URL + '/admin/notifications?page=1&limit=10').then((response) => {
            setNotification(response.data)
        })

    }, []);

    return (
        <>
            <MobileContainer>
                <div className="Notification-container w-full min-h-screen  flex flex-col justify-start items-center relative bg-blue-50">
                <div className="SocialMedia-header w-full bg-white/100 mb-7 box-shodow-lg box-shagow-black flex flex-col  ">
                        <MdArrowBackIosNew className='text-lg cursor-pointer absolute top-6 left-5 text-black z-50'   onClick={() => router.back()} />
                        <h1 className=' text-xl text-center font-bold mt-5 drop-shadow-lg text-black mb-4'>Notification</h1>
                </div>
                    <div className='w-full flex flex-col justify-center items-center pt-1 rounded-md  pb-16'>
                        {
                            Notification.map((item: any, index: any) => (
                                <>
                                    <div className="Notification-card w-[80%] flex flex-col gap-2 justify-center items-center bg-gradient-to-r from-orange-100/50 to-green-100/50 shadow-lg p-3 rounded-xl my-2" key={index}>
                                        {
                                            item.image&&  <img src={item.image} className='w-16 h-16 rounded-full' alt="" />
                                        }
                                      
                                        <p className='text-sm font-semibold my-2'>{item.title}</p>
                                        <Link href={item.url}>
                                            {item.url && <button className='bg-amber-700 text-white px-3 py-1 text-sm rounded-lg'>View</button> }
                                        </Link>
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

export default Notification