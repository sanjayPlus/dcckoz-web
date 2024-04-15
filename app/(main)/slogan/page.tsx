"use client"
import BottomNav from '@/components/BottomNav'
import MobileContainer from '@/components/MobileContainer'
import SERVER_URL from '@/config/SERVER_URL'
import { laborUnions } from '@/contants/labourUnion'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { AiFillLike } from 'react-icons/ai'
import { MdArrowBackIosNew } from 'react-icons/md'


function Slogan() {
    const router = useRouter();
    const [slogan, setSlogan] = useState<any>([]);
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
        axios.get(SERVER_URL + '/admin/slogan').then((response) => {
            setSlogan(response.data)
        })

    }, []);

    return (
        <>
            <MobileContainer>
                <div className="slogan-container w-full min-h-screen  flex flex-col justify-start items-center relative" style={{ backgroundImage: "url('/images/backimg.jpeg')", backgroundSize: "cover" }}>
                <div className='w-full h-20 bg-white flex items-center flex-col justify-center'>
                    <MdArrowBackIosNew className='text-lg cursor-pointer absolute top-9 left-4 text-black' onClick={() => router.back()} />
                    <h1 className=' text-xl text-center font-bold my-7  drop-shadow-lg text-black mt-9'>Solgan</h1>
                    </div>
                    <div className='w-80 flex flex-col justify-center items-center pt-1 rounded-md  pb-16'>
                        {
                            slogan.map((item: any, index: any) => (
                                <>
                                    <div className="slogan-card w-[86%] flex gap-2 justify-center items-center bg-gradient-to-r from-orange-100 to-green-100 shadow-lg p-3 rounded-xl my-2 " key={index}>
                                        <p className='text-sm font-semibold my-2'>{item.slogan}</p>
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

export default Slogan