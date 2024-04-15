import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/bundle';
import SwiperCore from 'swiper';
import { Autoplay, EffectCoverflow, Zoom } from 'swiper/modules';
import axios from 'axios';
import SERVER_URL from '@/config/SERVER_URL';
import jwt from 'jsonwebtoken';

// Install Swiper modules
SwiperCore.use([Autoplay, EffectCoverflow, Zoom]);

function PollingCarousel() {
  const [polls, setPolls] = useState([]);
  const [userId, setUserId] = useState<any>('');
  const [state, setState] = useState<boolean>(false);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const pollsResponse = await axios.get(`${SERVER_URL}/admin/poll`);
        setPolls(pollsResponse.data);
      } catch (error: any) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchPolls();
  }, [state]);

  useEffect(() => {
    try {
      // Decode the JWT
      const token: any = localStorage.getItem('token');
      const decoded: any = jwt.decode(token);

      // Set the decoded token in the state
      setUserId(decoded.userId);
      console.log(decoded.userId);
    } catch (error: any) {
      console.error('Error decoding JWT:', error.message);
    }
  }, []);

  const handleAfter = (percentage: number): any => ({
    content: "''",
    position: 'absolute',
    bottom: 0,
    left: '15px',
    width: `${percentage}%`,
    height: '2px',
    background: 'blue',
  });

  const handlePoll = (pollId: string, optionId: string) => {
    axios
      .post(
        SERVER_URL + '/user/add-vote',
        { pollId: pollId, optionId: optionId },
        {
          headers: {
            'x-access-token': localStorage.getItem('token'),
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setState(!state);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className='w-full'>
        <Swiper
     
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
          centeredSlides={true}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          loop={true}
          grabCursor={true}
          slidesPerView={'auto'}
        >
          {polls.map((poll: any) => (
            <SwiperSlide key={poll._id}>
              <div className="polling-card poll-1 w-[96%] flex flex-col justify-center items-center shadow-lg rounded-xl py-9 px-1 my-3 bg-white">
                <h2 className="text-center text-sm font-bold">{poll.title}</h2>
                {poll.options.map((option: any) => (
                  <div
                    key={option._id}
                    onClick={() => handlePoll(poll._id, option._id)}
                    className="opinion-option relative rounded-3xl flex justify-center items-center w-[90%] shadow-md my-2 cursor-pointer active:scale-95"
                  >
                    <p className="text-center m-0 p-2 font-semibold">{option.option}</p>
                    {poll?.users?.includes(userId) && (
                      <>
                        <p className="text-end self-end m-0 p-2 font-medium">{option.percentage}%</p>
                        <span style={handleAfter(option.percentage)}></span>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default PollingCarousel;
