"use client";
import MobileContainer from '@/components/MobileContainer'
import { useRouter } from "next/navigation";
import React from 'react'
import { MdArrowBackIosNew } from 'react-icons/md'

function page() {
    const router = useRouter();
  return (
   <>
   <MobileContainer>
   <div     className="leadership-container w-full min-h-screen flex flex-col justify-start object-scale-down items-center relative"
          style={{
            backgroundImage: "url('/images/backimg.jpeg')",
            backgroundSize: "cover",
          }}
        >
             <div className="SocialMedia-header w-full bg-white/100 mb-7 box-shodow-lg box-shagow-black flex flex-col  ">
            <MdArrowBackIosNew className='text-lg cursor-pointer absolute top-6 left-5 text-black z-50' onClick={() => router.back()} />
            <h1 className=' text-xl text-center font-bold mt-5 drop-shadow-lg text-black mb-4'> Store</h1>
          </div>

          <div className='w-[90%] bg-white  rounded-xl flex items-center justify-center'>
        <h1>Store will be available soon</h1>

          </div>
          </div>
   </MobileContainer>
   </>

  )
}

export default page