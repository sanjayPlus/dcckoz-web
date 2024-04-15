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


function LabourUnion() {
    const router = useRouter();
    
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
    
    }, []);

    return (
        <>
            <MobileContainer>
                <div className="galler-container w-full  flex flex-col justify-start items-center relative" style={{ backgroundImage: "url('images/backimg.jpeg')", backgroundSize: "cover" }}>
                    <MdArrowBackIosNew className='text-xl cursor-pointer absolute top-5 left-5 top-text' onClick={() => router.back()} />
                    <h1 className='text-black text-2xl font-bold text-center my-7 top-text'>Trade Union</h1>
                    <div className='w-80 flex flex-col justify-center items-center pt-1 rounded-md  pb-16'>
                        {
                            laborUnions.map((item: any, index: any) => (
                                <>
                                    <div className="union-card w-fit flex gap-2 justify-center items-center bg-white shadow-lg p-3 rounded-xl mx-10 my-2" key={index}>
                                     
                                        <img src="/images/Logo.png" alt="" className='w-10 h-10'  />
                                        <p className='text-sm font-semibold my-2'>{item}</p>
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

export default LabourUnion