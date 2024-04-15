"use client"
import MobileContainer from '@/components/MobileContainer'
import SERVER_URL from '@/config/SERVER_URL'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaStar } from 'react-icons/fa'
import { MdArrowBackIosNew } from 'react-icons/md'

function FeedBack() {
    const router = useRouter();
    const [feedback, setFeedback] = useState("");
    const [star, setStar] = useState(0);
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            router.push("/login");
        }
        axios.get(SERVER_URL + '/user/protected', {
            headers: {
                'x-access-token': localStorage.getItem("token")
            }
        }).then((res) => {
            if (res.status !== 200) {
                router.push("/login");
            }
        }).catch((err) => {
            router.push("/login");
            localStorage.removeItem("token");
        })
    }, []);
    const handleSubmit = () => {
        if (!feedback) {
            toast.error("Please enter your feedback");
            return;
        }
        try {
            axios.post(SERVER_URL + '/user/feedback', {
                feedback: feedback,
                star: star
            }, {
                headers: {
                    'x-access-token': localStorage.getItem("token")
                }
            }).then((res) => {
                if (res.status === 200) {
                    toast.success("Feedback submitted successfully");
                }
            })
        } catch (error) {
            console.log(error);
            toast.error("Error submitting feedback");
        }
    }
    return (
        <>
            <MobileContainer>
                <div className="disclaimer w-full min-h-screen flex flex-col justify-start items-center relative" style={{ backgroundImage: "url('images/backimg.jpeg')", backgroundSize: "cover" }}>
                <div className="SocialMedia-header w-full bg-white/100 mb-7 box-shodow-lg box-shagow-black flex flex-col  ">
                        <MdArrowBackIosNew className='text-lg cursor-pointer absolute top-6 left-5 text-black z-50'   onClick={() => router.back()} />
                        <h1 className=' text-xl text-center font-bold mt-5 drop-shadow-lg text-black mb-4'>Feedback</h1>
                </div>

                    <div className="disclaimer-container w-auto flex flex-col justify-center items-center gap-2 bg-white shadow-lg p-3 rounded-xl m-4 ">
                        <p className='text-base font-semibold mt-2'>Share Your Feedback</p>
                        <img src="/images/feedback.jpg" className='w-full rounded-xl' alt="" />
                        <p className='text-base font-semibold mt-2'>Your Feedback Helps Us To Improve</p>
                        <div className="feedback-star-container w-full flex justify-start items-center py-3 pl-5 gap-2">
                            <FaStar size={25} className={star >= 1 ? `cursor-pointer text-yellow-500` : `cursor-pointer text-gray-300`} onClick={() => setStar(1)} />
                            <FaStar size={25} className={star >= 2 ? `cursor-pointer text-yellow-500` : `cursor-pointer text-gray-300`} onClick={() => setStar(2)} />
                            <FaStar size={25} className={star >= 3 ? `cursor-pointer text-yellow-500` : `cursor-pointer text-gray-300`} onClick={() => setStar(3)} />
                            <FaStar size={25} className={star >= 4 ? `cursor-pointer text-yellow-500` : `cursor-pointer text-gray-300`} onClick={() => setStar(4)} />
                            <FaStar size={25} className={star >= 5 ? `cursor-pointer text-yellow-500` : `cursor-pointer text-gray-300`} onClick={() => setStar(5)} />
                        </div>
                        <div className='w-full flex flex-col justify-start items-start mt-2'>
                        <p className=' font-semibold text-sm'>Please Leave Your Feedback</p>
                        <textarea className='w-full p-4 rounded-lg bg-gray-100 shadow-sm my-4' placeholder='Write Your Feedback' value={feedback} onChange={(e) => setFeedback(e.target.value)} />
                        </div>
                        <div className='w-full flex justify-center items-center'>
                            <button onClick={handleSubmit} className='bg-amber-500 text-white w-32  text-xl py-2 rounded-xl font-semibold'>Submit</button>
                        </div>
                    </div>
                </div>
            </MobileContainer>
        </>
    )
}

export default FeedBack