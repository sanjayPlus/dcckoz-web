import React from 'react'
import { Toaster } from 'react-hot-toast'

function MobileContainer({children}: {children: React.ReactNode}) {
    return (
        <>
            <div className='w-screen h-screen flex justify-center items-center overflow-x-hidden'>
                <div className="md:w-[30%] w-full h-screen ">
                    {children}
                </div>
            </div>
            <Toaster/>
        </>
    )
}

export default MobileContainer