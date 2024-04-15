"use client"
import React, { useEffect, useState } from 'react'
import { IoIosLogOut, IoIosNotifications, IoMdContact } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";

import { IoClose } from "react-icons/io5";
import { FaLaptop, FaQuestion, FaStore } from "react-icons/fa";
import "./styles/TopNav.css"
import axios from 'axios';
import SERVER_URL from '@/config/SERVER_URL';
import { useRouter } from 'next/navigation';
import { MdDelete, MdOutlinePayment, MdOutlinePrivacyTip, MdStore } from 'react-icons/md';
import { AiFillQuestionCircle } from 'react-icons/ai';
import { HiComputerDesktop } from "react-icons/hi2";
import { RiFeedbackFill } from "react-icons/ri";
import { SiGoogleforms } from "react-icons/si";


function Topnav() {
    const [Sidenav, setSidenav] = React.useState(false);
    const [profile, setProfile] = useState([]);
    const [Sidescreen, setSidescreen] = React.useState(false);

    useEffect(() => {

        function getProfile() {

            if (!localStorage.getItem('token')) {
                router.push('/login')
            }

            axios.get(SERVER_URL + '/user/details', {
                headers: {
                    'x-access-token': localStorage.getItem("token")
                }
            }).then((res) => {
                setProfile(res.data.profileImage);
                // console.log(profile);
            }).catch((error) => {
                console.log(error)
            })

        }

        getProfile();

    })

    const router = useRouter();
    const handleStoreLogin = () => {

        axios.get(SERVER_URL + '/user/auto-login', {
            headers: {
                'x-access-token': localStorage.getItem("token")
            }
        }).then((response) => {
            if (response.status === 200) {
                window.open(response.data.url)
            }
        }).catch((error) => {
            toast.error("Store Login Falied")
        })
    }
    const closeNavbar = () => {
        if (Sidenav || Sidescreen) {
            setSidenav(false);
            setSidescreen(false);
        }
    };

    return (
        <>
            <div className="topnav sticky top-0 z-50 w-full h-16 flex justify-between items-center bg-white pl-5 pr-5">
            <div className='sidebar-close absolute w-60 h-screen right-0 top-0'style={{ display: Sidenav ? "block" : "none" }} onClick={() => { closeNavbar(false) }}></div>
                <GiHamburgerMenu size={24} onClick={() => { setSidenav(!Sidenav) }} className='cursor-pointer' />
                {/* <img src="/images/logo-1.png" alt="noImage" className='w-14' /> */}
                <IoIosNotifications size={23} className='cursor-pointer' onClick={() => router.push("/notifications")} />
            </div>

            {/* Meanu icon started open started */}

            <div style={{ display: Sidenav ? "block" : "none" }} className="sidenav fixed w-64 h-screen bg-white top-0 z-50 overflow-y-scroll overflow-x-hidden scrollbar-container pb-56 ">

                <div className="profile-img w-full flex justify-center items-center relative mt-0">
                    <img src={profile?profile:"/images/imagecontri.png"} alt="noImage" className='w-80% h-[180px] object-cover rounded-lg p-2'/>
                    <IoClose size={24} onClick={() => { setSidenav(!Sidenav) }} className='absolute right-[5px] top-[5px] cursor-pointer bg-[#082282] text-[#fff] rounded-full p-[5px]'/>
                </div>

                <div className="nav-items cursor-pointer flex flex-row justify-start items-center pl-2 gap-x-2 mt-10 border-b border-b-gray-400 pb-3" onClick={() => { router.push("/RmcRegister") }}>
                    {/* <HiComputerDesktop size={22} /> */}
                    <img src="/images/imagecontri.png" className='w-[15%] h-[15%]' alt="" />
                    <p className='m-0' style={{ userSelect: "none" }}>എൻ്റെ ബൂത്തിൽ കോൺഗ്രസ്</p>
                </div>
                <div className="nav-items cursor-pointer flex flex-row justify-start items-center pl-2 gap-x-3 mt-6 border-b border-b-gray-400 pb-3" onClick={() => { router.push("/social-media") }}>
                    <HiComputerDesktop size={22} />
                    <p className='m-0' style={{ userSelect: "none" }}>Social Media</p>
                </div>
                {/* <div className="nav-items cursor-pointer flex flex-row justify-start items-center pl-2 gap-x-2 mt-4 border-b border-b-gray-400 pb-3" onClick={() => { router.push("/membership-form") }}>
                    <SiGoogleforms size={22} />
                    <p className='m-0' style={{ userSelect: "none" }}>Membership Forms</p>
                </div> */}
                <div onClick={handleStoreLogin} className="nav-items cursor-pointer flex flex-row justify-start items-center pl-2 gap-x-3 mt-4 border-b border-b-gray-400 pb-3">
                    <MdStore size={24} />
                    <p className='m-0' style={{ userSelect: "none" }}>Store</p>
                </div>
                <div onClick={() => router.push("/payment-history")} className="nav-items cursor-pointer flex flex-row justify-start items-center pl-2 gap-x-3 mt-4 border-b border-b-gray-400 pb-3">
                    <MdOutlinePayment size={24} />
                    <p className='m-0' style={{ userSelect: "none" }}>Payment History</p>
                </div>
                <div onClick={() => router.push("/disclaimer")} className="nav-items cursor-pointer flex flex-row justify-start items-center pl-2 gap-x-3 mt-4 border-b border-b-gray-400 pb-3">
                    <AiFillQuestionCircle size={23} />
                    <p className='m-0' style={{ userSelect: "none" }}>Disclaimer</p>
                </div>
                <div onClick={() => router.push("/privacy")} className="nav-items cursor-pointer flex flex-row justify-start items-center pl-2 gap-x-3 mt-4 border-b border-b-gray-400 pb-3">
                    <MdOutlinePrivacyTip size={23} />
                    <p className='m-0' style={{ userSelect: "none" }}>Privacy policy</p>
                </div>
                <div onClick={() => router.push("/contact")} className="nav-items cursor-pointer flex flex-row justify-start items-center pl-2 gap-x-3 mt-4 border-b border-b-gray-400 pb-3">
                    <IoMdContact size={23} />
                    <p className='m-0' style={{ userSelect: "none" }}>Contact Us</p>
                </div>
                <div onClick={() => router.push("/feedback")} className="nav-items cursor-pointer flex flex-row justify-start items-center pl-2 gap-x-3 mt-4 border-b border-b-gray-400 pb-3">
                    <RiFeedbackFill />
                    <p className='m-0' style={{ userSelect: "none" }}>Feedback</p>
                </div>
                <div onClick={() => {
                    localStorage.removeItem("token");
                    router.push("/login");
                    localStorage.removeItem("volunteer-token");
                }} className="nav-items cursor-pointer flex flex-row justify-start items-center pl-2 gap-x-3 mt-4 border-b border-b-gray-400 pb-3 ">
                    <IoIosLogOut size={23} />
                    <p className='m-0' style={{ userSelect: "none" }}>Log Out</p>
                </div>
                {/* <div onClick={()=>router.push("/contact")} className="nav-items cursor-pointer flex flex-row justify-start items-center pl-2 gap-x-3 mt-4 border-b-2 border-b-gray-400 pb-3">
                <MdDelete size={23} />
                    <p className='m-0'>Delete Account</p>
                </div> */}

            </div>
        </>
    )
}

export default Topnav