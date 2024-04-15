'use client'
import DeveloperCarousel from '@/components/DeveloperCarousel'
import MobileContainer from '@/components/MobileContainer'
import { useRouter } from 'next/navigation'
import React from 'react'
import { MdArrowBackIosNew } from 'react-icons/md'
import './text-animation.css'
import TextWave from '@/components/TextWave'
import Image from 'next/image'

function Developers() {
    const router = useRouter()
    return (
        <>
            <MobileContainer>
                <div className='w-full min-h-screen flex flex-col justify-start items-center relative bg-slate-800 bg-blur-lg'>
                    <MdArrowBackIosNew className='text-xl cursor-pointer absolute top-5 left-6 top-text' onClick={() => router.back()} />
                    <TextWave/>
                    <div className="dev-container w-auto p-2">
                        <DeveloperCarousel/>
                    </div>
                    <div className='flex flex-col justify-center items-center mt-1 p-2'>
                        <img className='w-auto' src="/images/Frame.png" />
                    </div>
                </div>
            </MobileContainer>
        </>
    )
}

export default Developers