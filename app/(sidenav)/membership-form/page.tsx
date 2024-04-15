"use client"
import MobileContainer from '@/components/MobileContainer'
import { useRouter } from 'next/navigation'

import React from 'react'
import { IoIosMail } from 'react-icons/io'
import { IoLocationSharp } from 'react-icons/io5'
import { MdArrowBackIosNew, MdLocalPhone } from 'react-icons/md'

function membership() {
    const router = useRouter()
    const downloadImage = (imageUrl:any) => {
        // Create a new anchor element
        const link = document.createElement('a');
        link.href = imageUrl;
        link.setAttribute('download', 'image.jpg'); // Set the name of the downloaded file
  
        // Simulate click on the anchor element to trigger download
        document.body.appendChild(link);
        link.click();
  
        // Clean up the anchor element
        document.body.removeChild(link);
      };
  
    return (
        <>
            <MobileContainer>
                <div className="contact w-full min-h-screen flex flex-col justify-start items-center relative" style={{ backgroundImage: "url('images/backimg.jpeg')')", backgroundSize: "cover" }}>
                    <MdArrowBackIosNew className='text-2xl cursor-pointer absolute top-5 left-5 top-text' onClick={() => router.back()} />
                    <h3 className="text-2xl font-bold text-center mt-14 mb-2 top-text">Membership Form</h3>
                    <div className="member-container min-h-screen w-auto grid grid-cols-2 justify-items-center bg-white rounded-xl gap-2 mb-5 mx-2 p-2 mt-5">
                        <div className=' flex flex-col justify-center items-center w-full h-auto border-2 border-spacing-2 border-black rounded-2xl p-2 gap-2 '>
                            <div className='w-full p-2'><img src="/forms/1.jpeg" /></div>
                            <h2 className=' text-center font-semibold text-sm mt-3'>Real-Estate Membership</h2>
                            <button onClick={() => downloadImage('./forms/1.jpeg')} className='text-center font-semibold text-sm bg-amber-500 rounded-2xl px-5 py-2 border-2 border-black mt-2'>Button</button>
                        </div>
                        <div className=' flex flex-col justify-center items-center w-full h-auto border-2 border-spacing-2 border-black rounded-2xl p-2 gap-2'>
                            <div className='w-full p-2'><img  className='w-full'src="./forms/2.jpeg" /></div>
                            <h2 className=' text-center font-semibold text-sm mt-3'>Taxi Drivers Membership</h2>
                            <button onClick={() => downloadImage('./forms/2.jpeg')} className='text-center font-semibold text-sm bg-amber-500 rounded-2xl px-5 py-2 border-2 border-black mt-2'>Button</button>
                        </div>
                        <div className='flex flex-col justify-center items-center w-full h-auto border-2 border-spacing-2 border-black rounded-2xl p-2 gap-2'>
                            <div className='w-full p-2'><img className='w-full' src="./forms/3.jpeg" /></div>
                            <h2 className=' text-center font-semibold text-sm mt-3'>Private Bus Membership</h2>
                            <button onClick={() => downloadImage('./forms/3.jpeg')} className='text-center font-semibold text-sm bg-amber-500 rounded-2xl px-5 py-2 border-2 border-black mt-2'>Button</button>
                        </div>
                        <div className='flex flex-col justify-center items-center w-full h-auto border-2 border-spacing-2 border-black rounded-2xl p-2 gap-2'>
                            <div className='w-full p-2'><img className='w-full' src="./forms/4.jpeg" /></div>
                            <h2 className=' text-center font-semibold text-sm mt-3'>Thozhiluruppu Membership</h2>
                            <button onClick={() => downloadImage('./forms/4.jpeg')} className='text-center font-semibold text-sm bg-amber-500 rounded-2xl px-5 py-2 border-2 border-black mt-2'>Button</button>
                        </div>
                        <div className='flex flex-col justify-center items-center w-full h-auto border-2 border-spacing-2 border-black rounded-2xl p-2 gap-2'>
                            <div className='w-full p-2'><img className='w-full' src="./forms/5.jpeg" /></div>
                            <h2 className=' text-center font-semibold text-sm mt-3'>Tripper & Lorry Membership</h2>
                            <button onClick={() => downloadImage('./forms/5.jpeg')} className='text-center font-semibold text-sm bg-amber-500 rounded-2xl px-5 py-2 border-2 border-black mt-2'>Button</button>
                        </div>
                        <div className='flex flex-col justify-center items-center w-full h-auto border-2 border-spacing-2 border-black rounded-2xl p-2 gap-2'>
                            <div className='w-full p-2'><img className='w-full' src="./forms/6.jpeg" /></div>
                            <h2 className=' text-center font-semibold text-sm mt-3'>All Kerala Thayyal Membership</h2>
                            <button onClick={() => downloadImage('./forms/6.jpeg')} className='text-center font-semibold text-sm bg-amber-500 rounded-2xl px-5 py-2 border-2 border-black mt-2'>Button</button>
                        </div>
                        <div className='flex flex-col justify-center items-center w-full h-auto border-2 border-spacing-2 border-black rounded-2xl p-2 gap-2'>
                            <div className='w-full p-2'><img className='w-full' src="./forms/7.jpeg" /></div>
                            <h2 className=' text-center font-semibold text-sm mt-3'>Anganavadi Membership</h2>
                            <button onClick={() => downloadImage('./forms/7.jpeg')} className='text-center font-semibold text-sm bg-amber-500 rounded-2xl px-5 py-2 border-2 border-black mt-2'>Button</button>
                        </div>
                        <div className='flex flex-col justify-center items-center w-full h-auto border-2 border-spacing-2 border-black rounded-2xl p-2 gap-2'>
                            <div className='w-full p-2'><img className='w-full' src="./forms/8.jpeg" /></div>
                            <h2 className=' text-center font-semibold text-sm mt-3'>Ashaworkers Membership</h2>
                            <button onClick={() => downloadImage('./forms/8.jpeg')} className='text-center font-semibold text-sm bg-amber-500 rounded-2xl px-5 py-2 border-2 border-black mt-2'>Button</button>
                        </div>
                        <div className='flex flex-col justify-center items-center w-full h-auto border-2 border-spacing-2 border-black rounded-2xl p-2 gap-2'>
                            <div className='w-full p-2'><img className='w-full' src="./forms/9.jpeg" /></div>
                            <h2 className=' text-center font-semibold text-sm mt-3'>Automobile Membership</h2>
                            <button onClick={() => downloadImage('./forms/9.jpeg')} className='text-center font-semibold text-sm bg-amber-500 rounded-2xl px-5 py-2 border-2 border-black mt-2'>Button</button>
                        </div>
                        <div className='flex flex-col justify-center items-center w-full h-auto border-2 border-spacing-2 border-black rounded-2xl p-2 gap-2'>
                            <div className='w-full p-2'><img className='w-full' src="./forms/10.jpeg" /></div>
                            <h2 className=' text-center font-semibold text-sm mt-3'>Autodrivers Membership</h2>
                            <button onClick={() => downloadImage('./forms/10.jpeg')} className='text-center font-semibold text-sm bg-amber-500 rounded-2xl px-5 py-2 border-2 border-black mt-2'>Button</button>
                        </div>
                    </div>


                </div>
            </MobileContainer>
        </>
    )
}

export default membership