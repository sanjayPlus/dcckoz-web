"use client"
import MobileContainer from '@/components/MobileContainer';
import SERVER_URL from '@/config/SERVER_URL';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { IoEye, IoEyeOff, IoLockClosed } from 'react-icons/io5';
import { MdArrowBackIosNew } from 'react-icons/md';

function ChangePassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();
    useEffect(() => {
        if(!localStorage.getItem("token")){
            router.push("/login");
        }
        axios.get(SERVER_URL + '/user/protected', {
            headers: {
                'x-access-token': localStorage.getItem("token")
            }
        }).then((res) => {
            if(res.status !== 200){
                router.push("/login");
            }
        }).catch((err) => {
            router.push("/login");
            localStorage.removeItem("token");
        })
    },[])
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };
    const handleChangePassword = () => {
        if(!password){
            toast.error("Please enter your password");
            return;
        }
        if(!confirmPassword){
            toast.error("Please confirm your password");
            return;
        }
        if(password !== confirmPassword){
            toast.error("Passwords do not match");
            return;
        }
        try {
            axios.post(SERVER_URL + '/user/resetPassword', {
                password: password
            },{
                headers: {
                    'x-access-token': localStorage.getItem("token")
                }
            }).then((res) => {
                if(res.status === 200){
                    toast.success("Password changed successfully");
                    localStorage.removeItem("token");
                    router.push("/login");
                }
            })
        } catch (error) {
            console.log(error);
            toast.error("Error changing password");
        }
    }
    return (
        <>
            <MobileContainer>
                <div className='w-full h-full flex flex-col relative ' style={{ backgroundImage: "url('/images/bg_main.jpg')", backgroundSize: "cover" }}>
                <div className="absolute inset-0 bg-neutral-900 bg-opacity-50 backdrop-blur-none -z-0"></div>
                    <div className='w-full h-16 flex justify-center items-center  mb-1 relative z-10'>
                    <MdArrowBackIosNew className='text-xl cursor-pointer absolute top-5 left-5 top-text' onClick={() => router.back()} />
                    </div>
                    <div className='w-full h-auto flex justify-center relative mt-4'>
                         <img src="/images/logo.png" alt="" className='w-24'/>
                    </div>
                    <div className='flex-1 justify-center items-center bg-neutral-900 rounded-3xl mx-10 my-11 relative z-10 '>
                        <div className="input-container pt-10 pb-1 flex flex-col w-full justify-center items-center">
                            <p className='font-medium text-white mb-3'>Change Your Password </p>
                            <div style={{ width: "80%", height: "50px" }} className="my-2 rounded-lg flex justify-start items-center border border-white/20 pl-5 relative">
                            <IoLockClosed size={18} color='white' />
                            <input 
                                type={showPassword ? "text" : "password"} 
                                placeholder="Password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                className='bg-transparent border-none outline-none text-white pl-2 w-full' 
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                {showPassword ? (
                                    <IoEyeOff size={18} color='white' onClick={togglePasswordVisibility} />
                                ) : (
                                    <IoEye size={18} color='white' onClick={togglePasswordVisibility} />
                                )}
                            </div>
                        </div>
                        
                        {/* Confirm Password field */}
                        <div style={{ width: "80%", height: "50px" }} className="mb-5 rounded-lg flex justify-start items-center border border-white/20 pl-5 relative">
                            <IoLockClosed size={18} color='white' />
                            <input 
                                type={showConfirmPassword ? "text" : "password"} 
                                placeholder="Confirm Password" 
                                value={confirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                                className='bg-transparent border-none outline-none text-white pl-2 w-full' 
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                {showConfirmPassword ? (
                                    <IoEyeOff size={18} color='white' onClick={toggleConfirmPasswordVisibility} />
                                ) : (
                                    <IoEye size={18} color='white' onClick={toggleConfirmPasswordVisibility} />
                                )}
                            </div>
                        </div>

                        </div>
                        <div className='w-full flex justify-center items-center '>
                            <button className='bg-white text-blue-900 w-60 text-xl py-2  rounded-xl font-semibold' onClick={handleChangePassword}>Submit</button>
                        </div>
                        <div className='w-full flex justify-start items-start mt-3'>
                        <p className='text-white/60 text-sm pl-10 cursor-pointer' onClick={() => router.push("/home")}>Skip</p>
                        </div>


                    </div>
                </div>

            </MobileContainer>
        </>
    )
}

export default ChangePassword;