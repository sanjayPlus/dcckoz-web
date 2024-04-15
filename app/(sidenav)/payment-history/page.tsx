"use client"
import MobileContainer from '@/components/MobileContainer'
import SERVER_URL from '@/config/SERVER_URL';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { MdArrowBackIosNew } from 'react-icons/md'

function PaymentHistory() {
    const router = useRouter();
    const [payments, setPayments] = useState([]);
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            router.push('/login')
        }
        axios.get(SERVER_URL + '/user/details',{
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        }).then((response) => {
            setPayments(response.data.payments)
        })
    }, [])
    return (
        <>
            <MobileContainer>
                <div className="PaymentHistory w-full min-h-screen flex flex-col justify-start items-center relative" style={{ backgroundImage: "url('/images/backimg.jpeg')", backgroundSize: "cover" }}>
                    <MdArrowBackIosNew size={20} className='text-2xl cursor-pointer absolute top-5 left-5 top-text' onClick={() => router.back()} />
                    <h1 className=' text-2xl text-center font-bold my-7 text-black drop-shadow-lg top-text'>Payment History</h1>

                    <div className="PaymentHistory-container w-80 min-h-screen bg-white shadow-lg p-5 mb-3 rounded-xl">
                       
                        <div className="PaymentHistory-cards w-full flex flex-col justify-start items-center gap-3">
                            {
                                payments?.length == 0 && <p className='text-center font-semibold text-lg'>No Payments Found</p>
                            }
                            {
                                payments?.map((item: any,index:number) => (
                                    <div className="PaymentHistory-card w-full flex justify-between items-center p-5 rounded-lg bg-zinc-100 shadow-md" key={item.id}>
                                       
                                        <div className='text-center '>
                                            <h4 className='font-semibold text-blue-900'> &#x20B9; {item.amount}</h4>
                                        
                                        </div>
                                        <p className='font-bold'>{item.date}</p>
                                    
                                    </div>
                                ))
                            }

                        </div>
                    </div>

                </div>
            </MobileContainer>
        </>
    )
}

export default PaymentHistory