"use client"
import MobileContainer from '@/components/MobileContainer'
import SERVER_URL from '@/config/SERVER_URL';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { MdArrowBackIosNew } from 'react-icons/md'
import { FaArrowLeft } from "react-icons/fa6";
import './leaderboard.css';


function Leaderboard() {
    const router = useRouter();
    const [payments, setPayments] = useState([]);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            router.push('/login')
        }
        axios.get(SERVER_URL + '/payment/top-payments/1/10').then((response) => {
            setPayments(response.data.data)
        })
        axios.get(SERVER_URL + '/payment/total-amount').then((response) => {
            setTotal(response.data.totalAmount)
        })
    }, [])

    const handlePayment = (amount: number) => {
        const token = localStorage.getItem('token');
        axios.get(SERVER_URL + '/payment/checkout/' + amount + '/' + token).then((response) => {
            if (response.status === 200) {
                window.open(response.data.url, '_blank', 'noopener,noreferrer')
            }
        })
    }
    return (
        <>
            <MobileContainer>


                <div className='mt-[30px] mx-[20px] '>

                    <div className='flex relative leaderHead'>
                        <FaArrowLeft className='text-black w-[20px] h-[20px]' onClick={() => router.back()} />
                        <div className='absolute left-[40%] ' >
                            <h1 className='text-base text-center font-bold'>Leader Board</h1>
                        </div>
                    </div>


                    <div className="leaderboard-container w-auto ml-4 mr-4 min-h-screen bg-white rounded-xl  mb-5 mainDiv">

                        <div className='m-[5px] toppersDiv'>
                            <h3 className='text-center text-[15px] font-bold text-[#1a369b]'>Toppers of this collection</h3>
                        </div>

                        <div className="leaderboard-cards w-full flex flex-col justify-start items-center gap-3 p-5">
                            {
                                payments?.map((item: any, index: number) => (
                                    <div className="leaderboard-card w-full flex justify-between items-center" key={item.id}>
                                        <div className='w-16 h-16 flex justify-center items-center relative ' style={{ background: 'url(./images/ribbon.png)', backgroundSize: 'cover ' }}> <p className='text-sm font-medium text-white absolute mb-3'>{index + 1}</p> </div>
                                        <div className='text-center mr-2 '>
                                            <h4 className='font-semibold text-blue-900'>{item.name}</h4>
                                            <p className='text-xs'>{item.district}</p>
                                            <p className='text-xs'>{item.assembly}</p>
                                            <p className='text-xs'>{item.local}</p>
                                        </div>
                                        <p className='font-bold'>{item.totalAmount}</p>
                                    </div>
                                ))
                            }

                        </div>


                        <div className="main-button-container w-full flex flex-col justify-center items-center mt-4 " >
                            <div className='w-full mx-10 bg-white p-2 rounded-2xl justify-center items-center mainDiv'>
                                <div className="main-buttons grid grid-cols-3 sm:grid-cols-4 bg-white rounded-3xl gap-2 justify-center place-items-center  contributeTotal">

                                    <div onClick={() => handlePayment(50)} className="main-button bg-blue-800 flex justify-center items-center cursor-pointer oneDiv">
                                        <p className='m-0' >
                                            &#8377;50</p>
                                    </div>
                                    <div onClick={() => handlePayment(100)} className="main-button bg-blue-800 flex justify-center items-center cursor-pointer oneDiv">
                                        <p className='m-0' > &#8377;100</p>
                                    </div>
                                    <div onClick={() => handlePayment(200)} className="main-button bg-blue-800 flex justify-center items-center cursor-pointer oneDiv">
                                        <p className='m-0'> &#8377;200</p>
                                    </div>
                                    <div onClick={() => handlePayment(500)} className="main-button bg-blue-800 flex justify-center items-center cursor-pointer oneDiv">
                                        <p className='m-0'> &#8377;500</p>
                                    </div>
                                    <div onClick={() => handlePayment(1000)} className="main-button bg-blue-800 flex justify-center items-centercursor-pointer oneDiv">
                                        <p className='m-0'> &#8377;100</p>
                                    </div>
                                    <div onClick={() => handlePayment(1500)} className="main-button bg-blue-800 flex justify-center items-centecursor-pointer oneDiv">
                                        <p className='m-0'> &#8377;150</p>
                                    </div>
                                    <div onClick={() => handlePayment(2000)} className="main-button bg-blue-800 flex justify-center items-centercursor-pointer oneDiv">
                                        <p className='m-0'>&#8377;200</p>
                                    </div>
                                    <div onClick={() => handlePayment(5000)} className="main-button bg-blue-800 flex justify-center items-centercursor-pointer oneDiv">
                                        <p className='m-0'> &#8377;500</p>
                                    </div>


                                </div>
                                <div className=' flex justify-center items-center mt-2'>
                                    <button onClick={() => router.push("/contribute")} className='bg-blue-800 p-2 w-72 rounded-[8px] text-white font-bold'>Contribute Now</button>
                                </div>
                            </div>


                        </div>


                    </div>



                </div>

            </MobileContainer>
        </>
    )
}

export default Leaderboard