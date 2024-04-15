"use client"
import BottomNav from '@/components/BottomNav';
import MobileContainer from '@/components/MobileContainer';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { MdArrowBackIosNew } from 'react-icons/md';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import SERVER_URL from '@/config/SERVER_URL';
import moment from 'moment';
import './events.css'
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
function Events() {
    const router = useRouter();
    const [value, onChange] = useState<Value>(new Date());
    const [events, setEvents] = useState([]);
    const handleDateChange = (date: any) => {
        onChange(date);
        // Format the date as "YYYY-MM-DD" using Moment.js
        const formattedDate = moment(date).format('YYYY-MM-DD');
       axios.get(SERVER_URL + '/admin/calendar-events/' + formattedDate).then((response) => {
           setEvents(response.data)
       })
    }
    return (
        <>
            <MobileContainer>
                <div className="profile-container w-full min-h-screen flex flex-col justify-start items-center relative" style={{ backgroundImage: "url('/images/backimg.jpeg')", backgroundSize: "cover" }}>
                    <MdArrowBackIosNew className='text-2xl cursor-pointer absolute top-5 left-5 top-text' onClick={() => router.back()} />
                    <h1 className=' text-2xl text-center font-bold my-7 top-text text-white'>Events</h1>
                    <div className='w-80 bg-white shadow-lg p-1 rounded-xl m-2 justify-center items-center'>
                        <Calendar onChange={handleDateChange} value={value} />
                    </div>
                    <div className="calendar-list w-full flex flex-col justify-center items-center mt-3 gap-3 pb-20" >
                        {
                            events.map((item: any) => (
                                <div className="calendar-list-card w-80 flex flex-col justify-center items-center bg-white rounded-lg shadow-lg p-2" >
                                    <h3 className='text-lg font-semibold place-content-center' >{item.title}</h3>
                                    <p className='text-sm '>{item.description}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <BottomNav activeItem='events' />
            </MobileContainer>
        </>
    )
}

export default Events;