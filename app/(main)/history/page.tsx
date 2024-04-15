"use client"
import HistroyCarousel from '@/components/HistroyCarousel'
import MobileContainer from '@/components/MobileContainer'
import { useRouter } from 'next/navigation'
import React from 'react'
import { MdArrowBackIosNew } from 'react-icons/md'

function History() {
    const router = useRouter()
    return (
        <>
            <MobileContainer>
                <div className="history w-full min-h-screen flex flex-col justify-start items-center relative" style={{ backgroundImage: "url('/images/backimg.jpeg')", backgroundSize: "cover" }}>
                    <div className='w-full h-20 bg-white flex items-center flex-col justify-center'>
                    <MdArrowBackIosNew className='text-xl cursor-pointer absolute top-8 left-4 text-black' onClick={() => router.back()} />
                    <h1 className=' text-xl text-center font-bold my-7  drop-shadow-lg text-black mt-9'>History</h1>
                    </div>
                    <div className="history-container w-80  bg-white shadow-lg p-5 m-8 rounded-xl flex flex-col justify-center items-center">
                        <h2 className='text-xl font-bold'>History of DCC</h2>
                        <p className='text-sm my-2 font-semibold'>The industrial revolution that started in Britain in the 1770s spread to India, which was their colony. In 1817, a British industrialist started a textile mill in Howrah, Calcutta, where the industrial revolution began. The establishment of tea and coffee plantations in 1839 and the start of train service in 1853 fueled industrial growth.</p>
                        <p className='text-sm my-2 mb-10 font-semibold'>This industrial growth gave rise to widespread labor exploitation here as elsewhere. The daily wage was 3 annas or 18 nayapaisa even if he worked for fourteen to eighteen hours. Starvation, disease and death were daily occurrences. The inhumane condition of hiding the body, like burying a dead worker, also prevailed.</p>
                        <div className=''>
<button onClick={()=> window.open("https://dccthrissur.com/history.php")} className='bg-[#ef7f1a] rounded-2xl text-sm text-white p-2 pl-4 pr-4 hover:bg-orange-400 '>See More</button>
                            {/* <HistroyCarousel /> */}
                        </div>
                    </div>
                </div>
            </MobileContainer>
        </>
    )
}

export default History