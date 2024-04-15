"use client"
import { useState, useRef } from 'react';
import MobileContainer from '@/components/MobileContainer';
import { useRouter } from "next/navigation";
import React from 'react';
import { MdArrowBackIosNew } from 'react-icons/md';

function Page() {
    // const routers = useRouter();

    const musicData = [
        { id: 1, name: 'Music 1', url: '/congressmusic7.mpeg' },
        { id: 2, name: 'Music 2', url: '/congressmusic3.mpeg' },
        { id: 3, name: 'Music 3', url: '/congressmusic4.mpeg' },
        { id: 4, name: 'Music 4', url: '/congressmusic6.mpeg' },
        { id: 5, name: 'Music 5', url: '/test2music.mpeg' },
        { id: 6, name: 'Music 6', url: '/congressmusic7.mpeg' },
        { id: 7, name: 'Music 7', url: '/congressmusic3.mpeg' },
        { id: 8, name: 'Music 8', url: '/congressmusic6.mpeg' },
    ];

    const router = useRouter();

    const [currentMusic, setCurrentMusic] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [playIconIndex, setPlayIconIndex] = useState<number | null>(null); // Track the index of the currently playing music
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const handleMusicClick = (musicUrl: string, index: number) => {
        if (audioRef.current) {
            if (currentMusic === musicUrl) {
                if (isPlaying) {
                    audioRef.current.pause();
                    setIsPlaying(false);
                    setPlayIconIndex(null);
                } else {
                    audioRef.current.play();
                    setIsPlaying(true);
                    setPlayIconIndex(index);
                }
            } else {
                audioRef.current.pause();
                audioRef.current.src = musicUrl;
                audioRef.current.play();
                setCurrentMusic(musicUrl);
                setIsPlaying(true);
                setPlayIconIndex(index);
            }
        }
    };

    return (
        <>
            <MobileContainer>
                <div className="leadership-container w-full min-h-screen flex flex-col justify-start object-scale-down items-center relative"
                    style={{
                        backgroundImage: "url('/images/backimg.jpeg')",
                        backgroundSize: "cover",
                    }}
                >
                    <div className="SocialMedia-header w-full bg-white/100 mb-7 box-shodow-lg box-shagow-black flex flex-col  ">
                        <MdArrowBackIosNew className='text-lg cursor-pointer absolute top-6 left-5 text-black z-50' onClick={() => router.back()} />
                        <h1 className=' text-xl text-center font-bold mt-5 drop-shadow-lg text-black mb-4'>Congress Songs</h1>
                    </div>
                    

                    <div className='w-full mx-auto flex items-center justify-center flex-col gap-3'>
                        {musicData.map((music, index) => (
                            <div key={music.id} className='w-[90%] h-16 bg-white/60  rounded-xl flex items-center pl-5 space-x-5 p-5 ' onClick={() => handleMusicClick(music.url, index)}>
                                <img src="/images/imagecontri.png" className='object-cover w-[18%]' alt="" />
                                <h1 className='text-black text-xl'>{music.name}</h1>
                                {playIconIndex === index ? (
                                    isPlaying ? (
                                        <svg key={music.id} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                                        </svg>
                                    ) : (
                                        <svg key={music.id} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                                        </svg>
                                    )
                                ) : null}
                            </div>
                        ))}
                    </div>
                    <div className='w-full p-2 flex items-center justify-center'>
<button className='p-2 bg-white text-black rounded-full'                   onClick={() =>
                    window.open("https://soundcloud.com/keralapcc")
                  }
>see more songs</button>
                    </div>
                </div>
            </MobileContainer>
            <audio ref={audioRef} />
        </>
    );
}

export default Page;