import React from 'react'
import { MdArrowBackIosNew } from 'react-icons/md'
import { useRouter } from 'next/navigation'
export default function GalleryTopNavbar({active,setActive}) {
    const router = useRouter();
    const handleButtonClickImage = () => {
        router.push('/gallery');
    };
    return (
        <div className='w-full flex flex-col justify-center items-center bg-white/90'>
            <MdArrowBackIosNew className='text-lg cursor-pointer absolute top-5 left-5 text-black' onClick={() => router.back()} />
            <h1 className='text-black text-xl font-bold text-center my-6 '>Party Book</h1>
            <div className='flex flex-row justify-center'>
                <button className='p-3 font-semibold' style={{ text: active === "image" ? "black" : "transparent", color: active === "image" ? "darkblue" : "black" }} onClick={() => setActive("image") }>Image</button>
                <button className='p-3 font-semibold' style={{ text: active === "video" ? "black" : "transparent", color: active === "video" ? "darkblue" : "black" }} onClick={() => setActive("video")}>Video</button>
                <button className='p-3 font-semibold' style={{ text: active === "reels" ? "black" : "transparent", color: active === "reels" ? "darkblue" : "black" }} onClick={() => setActive("reels")}>Reels</button>
                <button className='p-3 font-semibold' style={{ text: active === "memes" ? "black" : "transparent", color: active === "memes" ? "darkblue" : "black" }} onClick={() => setActive("memes")}>Trolls</button>
            </div>
        </div>
    )
}

