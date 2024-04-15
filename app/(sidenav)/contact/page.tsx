"use client"
import MobileContainer from '@/components/MobileContainer'
import { useRouter } from 'next/navigation'

import React from 'react'
import { IoIosMail } from 'react-icons/io'
import { IoLocationSharp } from 'react-icons/io5'
import { MdArrowBackIosNew, MdLocalPhone } from 'react-icons/md'

function Contact() {
    const router = useRouter()
    return (
        <>
            <MobileContainer>
                <div className="contact w-full min-h-screen flex flex-col justify-start items-center relative " style={{ backgroundImage: "url('images/backimg.jpeg')", backgroundSize: "cover" }}>
                <div className="SocialMedia-header w-full bg-white/100 mb-7 box-shodow-lg box-shagow-black flex flex-col  ">
                        <MdArrowBackIosNew className='text-lg cursor-pointer absolute top-6 left-5 text-black z-50'   onClick={() => router.back()} />
                        <h1 className=' text-xl text-center font-bold mt-5 drop-shadow-lg text-black mb-4'>Contact Us</h1>
                </div>

                    <div className="contact-container w-[95%]  flex flex-col gap-4 justify-center items-center  bg-white shadow-lg p-3  m-4 rounded-3xl">

                        <div className="contact-info w-full flex flex-col justify-center items-center">
                            <img className="w-16" alt="" src="/images/imagecontri.png" />
                            <h6 className="font-bold text-sm text-blue-800 text-center ">District congress committe</h6>
                            <p className="text-xs text-center text-blue-700">Kozhikode District</p>
                        </div>
                        <div className="contact-info w-full flex flex-col justify-start gap-1 items-center p-1">
                            <h5 className="text-sm font-bold self-start">Kozhikode District Congress Committe Office</h5>
                            <div className="contact-info w-full flex flex-col justify-start  ">
                                <div className="contact-info w-full flex flex-col justify-start   ">
                                    <div className="flex w-52  gap-2 ">
                                        <div className="flex  text-blue-800 p-3 ">
                                            <MdLocalPhone size={21} />
                                        </div>
                                        <div className="flex flex-col  items-start w-64 mt-2  ">
                                            {/* <p className="text-xs font-semibold ">0487 2335454</p> */}
                                            <p className="text-xs font-semibold ">+91 9447186850</p>
                                            {/* <p className="text-xs font-semibold " >: 0487 2422151</p> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="contact-info w-full flex flex-col my-4 justify-start ">
                                    <div className="flex w-full h-5 gap-1 ">
                                        <div className="flex  text-blue-800 p-1 justify-center items-start">
                                            <IoLocationSharp size={21} />
                                        </div>
                                        <div className="flex flex-col justify-center items-start w-64">
                                            <p className="text-xs font-semibold p-5"> 7Q8H+R72, Wayanad Rd, West Nadakkave, P.O, Nadakkave, Kozhikode, Kerala 673011</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="contact-info w-full flex flex-col my-4 justify-start ">
                                    <div className="flex w-full h-5  gap-1">
                                        <div className="flex justify-center items-center text-blue-800  p-1">
                                            <IoIosMail size={21} />
                                        </div>
                                        <div className="flex flex-col justify-center items-start w-64  ">
                                            <p className="text-xs font-semibold p-5 "> chairmanpups@gmail.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className='w-full text-grey-400' />
                        <div className="contact-info w-full flex flex-col justify-start gap-2 items-center p-3 ">
                            <h5 className="text-sm font-bold self-start text-blue-800">PLUS IT BUSINESS PARK</h5>
                            <h6 className="text-sm font-bold self-start text-black">JOVIN C VARGUESE</h6>
                            <div className="contact-info w-full flex flex-col justify-start  mb-1 ">
                                <div className='flex w-full h-5 gap-1 '>
                                    <div className="flex justify-center  text-blue-800 p-1 ">
                                        <MdLocalPhone size={19} />
                                    </div>
                                    <div className="flex flex-col justify-center items-start w-64 ">
                                        <p className="text-xs  font-semibold p-2">: +91 9745077717</p>
                                    </div>
                                </div>
                            </div>
                            <div className="contact-info w-full flex flex-col justify-start my-4  ">
                                <div className="flex w-full h-5 gap-1">
                                    <div className="flex justify-center items-center text-blue-800 p-1">
                                        <IoLocationSharp size={21} />
                                    </div>
                                    <div className="flex flex-col justify-center items-start w-64">
                                        <p className="text-xs font-semibold p-2">RVK Tower, High Road South Bazar, Erinjery Angady, Pallikkulam, Thrissur, Kerala 680001 </p>
                                    </div>
                                </div>
                            </div>
                            <div className="contact-info w-full flex flex-col justify-start  ">
                                <div className="flex w-full h-5 gap-1">
                                    <div className="flex justify-center items-center text-blue-800 p-1">
                                        <IoIosMail size={21} />
                                    </div>
                                    <div className="flex flex-col justify-center items-start w-64">
                                        <p className="text-xs font-semibold p-2"> info@plusitpark.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </MobileContainer>
        </>
    )
}

export default Contact