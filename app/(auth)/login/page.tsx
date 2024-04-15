"use client"
import MobileContainer from '@/components/MobileContainer'
import SERVER_URL from '@/config/SERVER_URL';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import './login.css'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { IoEye, IoEyeOff, IoLockClosed } from 'react-icons/io5';
import { MdOutlineMailOutline } from "react-icons/md";
import { auth } from '@/app/firebase/config'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';


// import { auth, provider } from "@/config/firebase";
// import { signInWithPopup } from "firebase/auth";
function Login() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            axios.get(SERVER_URL + '/user/protected', {
                headers: {
                    'x-access-token': localStorage.getItem("token")
                }
            }).then((res) => {
                if (res.status === 200) {
                    router.push("/home");
                }
            })
        }
    }, []);
    const handleGoogleSubmit = async () => {
        try {
            const result = await signInWithGoogle();
            const user = result?.user;
            const idToken = await user?.getIdToken();
            const loginResponse = await axios.post(SERVER_URL + "/user/google-login", {
                user: user,
                token: idToken,
            });
            if (loginResponse.status === 200) {
                localStorage.setItem('token', loginResponse.data.token);

                router.push("/home");

            } else {
                toast.error("User Desn't Exist Please Sign Up");
                router.push("/register");
            }
        } catch (error) {
            console.log(error);
            // Handle the error here
            toast.error("User Desn't Exist Please Sign Up");
            router.push("/register");
        }
        // try {
        //     const result = await signInWithPopup(auth, provider);
        //     const user = result.user;
        //     const idToken = await user.getIdToken();

        //     const loginResponse = await axios.post(SERVER_URL + "/user/google-login", {
        //         user: user,
        //         token: idToken,
        //     });

        //     if (loginResponse.status === 200) {
        //         localStorage.setItem('token', loginResponse.data.token);

        //         router.push("/home");

        //     }else{
        //         toast.error("User Desn't Exist Please Sign Up");
        //         router.push("/register");
        //     }
        // } catch (error) {
        //     console.log(error);
        //     // Handle the error here
        //     toast.error("User Desn't Exist Please Sign Up");
        //     router.push("/register");
        // }
    };
    const handleLogin = () => {
        if (!email || !password) {
            toast.error("Please fill all the fields");
            return;
        }
        axios.post(SERVER_URL + '/user/login', {
            email: email,
            password: password
        }).then((res) => {
            if (res.status === 200) {
                localStorage.setItem("token", res.data.token);
                router.push("/home");
            }
        }).catch((err) => {
            toast.error("email or password is incorrect");
        })
    }
    return (
        <>

            <MobileContainer>
                <div className='w-full h-full flex flex-col' style={{ backgroundImage: "url('/images/bg_main.jpg')", backgroundSize: "cover" }}>
                    <div className='w-full h-64 flex justify-center items-end mt-32 mb-4'>
                        <img src="/images/imagecontri.png" alt="" className='w-32' />
                    </div>
                    <div className='flex-1 justify-center items-center bg-zinc-900 rounded-t-3xl'>
                        <div className="input-container pt-10 pb-5  flex flex-col w-full justify-center items-center px-5 ">
                            <div className=" w-full h-16 mx-10  rounded-lg flex  justify-start items-center border border-zinc-700 p-3">
                                <div className='flex justify-center items-center w-10 '>
                                    <MdOutlineMailOutline size={22} color='white' className='mr-2' />
                                </div>
                                <div className='flex w-full'>
                                    <input type="text" onChange={(e) => setEmail(e.target.value)} placeholder="Email" className='bg-transparent border-none  outline-none text-white w-[90%]' />
                                </div>
                            </div>
                            <div className=" w-full   h-16 mx-10 mt-4 mb-2 rounded-lg flex justify-between items-center border border-zinc-700  p-2">
                                <div className='flex  justify-between items-center w-10 '>
                                    <IoLockClosed size={22} color='white' className='mr-2' />
                                </div>
                                <div className='flex flex-grow mr-4'>
                                    <input
                                    type={showPassword ? "text" : "password"} // Conditionally set input type
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='bg-transparent  border-none outline-none text-white w-[90%]'/>
                                </div>
                                <div className='flex justify-center  w-10 items-center'>
                                    {/* Toggle password visibility */}
                                    {showPassword ? (
                                        <IoEyeOff size={18} color='white' onClick={() => setShowPassword(false)} />
                                    ) : (
                                        <IoEye size={18} color='white' onClick={() => setShowPassword(true)} />
                                    )}
                                </div>
                            </div>

                        </div>
                        <p className='text-white text-sm pl-52 cursor-pointer w-[100%]' onClick={() => router.push("/forgot-password")}>Forgot Password ?</p>
                        <div className='w-full flex justify-center items-center my-5'>

                            <button onClick={handleLogin} className='bg-white text-blue-900 w-80 text-xl py-2 rounded-2xl font-semibold mx-8'>Log In</button>
                        </div>
                        <div className='w-full flex justify-center items-center p-4'>
    <div className="flex-grow  relative">
        <span className="absolute  left-0 right-0 top-1/2 transform -translate-y-1/2 h-0.5 bg-white"></span>
    </div>
    <p onClick={() => router.push("/register")} className='text-white text-sm mb-2 relative'>
        <span className='text-white font-bold cursor-pointer pl-2'>or Sign in with</span>
    </p>
    <div className="flex-grow relative">
        <span className="absolute left-0 ml-2 right-0 top-1/2 transform -translate-y-1/2 h-0.5 bg-white"></span>
    </div>
</div>

                        <div className='w-full  flex justify-center items-center  rounded-full'>

                            <button className="google-button bg-white rounded-full" onClick={handleGoogleSubmit}>
                                <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" className='bg-white rounded-full'  viewBox="0 0 256 262">
                                    <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
                                    <path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
                                    <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path>
                                    <path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
                                </svg>
                            </button>
                            
                        </div>
                        <p onClick={() => router.push("/register")} className='text-gray-400  p-2 text-base pl-8 mb-2'>Dont't have an account? <span className='text-white font-bold cursor-pointer' >Create an account</span></p>

                    </div>
                </div>

            </MobileContainer>
        </>
    )
}

export default Login