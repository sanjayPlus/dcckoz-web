"use client";
import MobileContainer from "@/components/MobileContainer";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdArrowBackIosNew, MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import axios from "axios";
import SERVER_URL from "@/config/SERVER_URL";
interface Data {
  _id:       string;
  name:      string;
  address:   string;
  image:     string;
  phone:     string[];
  email:     string[];
  position:  string;
  category:  string;
  createdAt: Date;
  __v:       number;
}

function LeaderShip() {
  const [tab, setTab] = useState(1);
  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(0);
const [data,setData] = useState<any>({})
  const router = useRouter();

  const handleTouchStart = (event: any) => {
    setStartX(event.touches[0].clientX);
  };

  const handleTouchMove = (event: any) => {
    setEndX(event.touches[0].clientX);
  };
  useEffect(() => {
    if(tab === 1){
    axios.get(`${SERVER_URL}/admin/leadership?category=AICC`).then((response) => {
        setData(response.data[0])
    })
  }else if(tab === 2){
    axios.get(`${SERVER_URL}/admin/leadership?category=KPCC`).then((response) => {
        setData(response.data[0])
    })
  }else if(tab === 3){
    axios.get(`${SERVER_URL}/admin/leadership?category=DCC`).then((response) => {
        setData(response.data[0])
    })
  }else if(tab === 4){
    axios.get(`${SERVER_URL}/admin/leadership?category=UDF`).then((response) => {
        setData(response.data[0])
    })
  }else{
    setData({})
  }
  console.log(data)
},[tab])
  const handleTouchEnd = () => {
    const deltaX = endX - startX;

    if (deltaX > 50 && tab > 1) {
      // Swipe right to decrease tab number
      setTab(tab - 1);
    } else if (deltaX < -50 && tab < 4) {
      // Swipe left to increase tab number
      setTab(tab + 1);
    }
  };

  return (
    <>
      <MobileContainer>
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="leadership-container w-full min-h-screen flex flex-col justify-start object-scale-down items-center relative"
          style={{
            backgroundImage: "url('/images/backimg.jpeg')",
            backgroundSize: "cover",
          }}
        >
          <div className="SocialMedia-header w-full bg-white/100 mb-7 box-shodow-lg box-shagow-black flex flex-col  ">
            <MdArrowBackIosNew className='text-lg cursor-pointer absolute top-6 left-5 text-black z-50' onClick={() => router.back()} />
            <h1 className=' text-xl text-center font-bold mt-5 drop-shadow-lg text-black mb-4'>Leadership</h1>
          </div>
          <div className="leadership-tabs w-[90%] h-auto  rounded-3xl shadow-lg p-9 bg-white  ">
            <div className="tab-nav flex h-auto justify-between items-center cursor-pointer ">
              <p
                className="font-semibold relative tab-1"
                onClick={() => setTab(1)}
              >
                AICC{" "}
                {tab === 1 && (
                  <span className="w-full h-[2px] bg-blue-700 rounded-full absolute -bottom-1 left-0"></span>
                )}
              </p>
              <p
                className="font-semibold relative tab-2"
                onClick={() => setTab(2)}
              >
                KPCC{" "}
                {tab === 2 && (
                  <span className="w-full h-[2px] bg-blue-700 rounded-full absolute -bottom-1 left-0"></span>
                )}
              </p>
              <p
                className="font-semibold relative tab-3"
                onClick={() => setTab(3)}
              >
                DCC{" "}
                {tab === 3 && (
                  <span className="w-full h-[2px] bg-blue-700 rounded-full absolute -bottom-1 left-0"></span>
                )}
              </p>
              <p
                className="font-semibold relative tab-3"
                onClick={() => setTab(4)}
              >
                UDF{" "}
                {tab === 4 && (
                  <span className="w-full h-[2px] bg-blue-700 rounded-full absolute -bottom-1 left-0"></span>
                )}
              </p>
            </div>
            <div className="tab-content flex flex-col mt-2  scrollbar-container ">
              {tab === 1 && (
                <>
                  <div className="tab-1-content flex flex-col mt-1 gap-3 pt-2">
                    <img
                      src={data?.image}
                      className="rounded-lg w-full  object-cover"
                      alt=""
                    />
                    <h2 className="text-xl font-bold">
                    {data?.name}
                    </h2>
                    <h3 className="text-base font-semibold">
                      position:{data?.position}
                    </h3>
                    <h3 className="text-base font-semibold">Address:</h3>
                    <div className="text-sm flex flex-col gap-3">
                      <h4>{data?.address}</h4>
                      <h4 className="flex gap-3 items-center">
                        <span>
                          <FaPhoneAlt className="text-blue-700" />
                        </span>
                       {
                         data?.phone?.map((phone:any,index:number) => <p key={index}>{phone}</p>)
                       }
                      </h4>
                      <h4 className="flex gap-3 items-center">
                        <span className="text-blue-700">
                          <MdEmail />
                        </span>
                      {
                        data?.email?.map((email:any,index:number) => <p key={index}>{email}</p>)
                      }
                      </h4>
                    </div>
                    <div className="flex justify-center w-full items-center mt-3">
                      <a href={data?.link}>
                        <button
                          type="button"
                          className="bg-amber-500 rounded-xl p-2 text-white w-28 font-semibold"
                        >
                          See more
                        </button>
                      </a>
                    </div>
                  </div>
                </>
              )}
              {tab === 2 && (
                <>
                <div className="tab-1-content flex flex-col mt-1 gap-3 pt-2">
                  <img
                    src={data?.image}
                    className="rounded-lg w-full  object-cover"
                    alt=""
                  />
                  <h2 className="text-xl font-bold">
                  {data?.name}
                  </h2>
                  <h3 className="text-base font-semibold">
                    position:{data?.position}
                  </h3>
                  <h3 className="text-base font-semibold">Address:</h3>
                  <div className="text-sm flex flex-col gap-3">
                    <h4>{data?.address}</h4>
                    <h4 className="flex gap-3 items-center">
                      <span>
                        <FaPhoneAlt className="text-blue-700" />
                      </span>
                     {
                       data?.phone?.map((phone:any,index:number) => <p key={index}>{phone}</p>)
                     }
                    </h4>
                    <h4 className="flex gap-3 items-center">
                      <span className="text-blue-700">
                        <MdEmail />
                      </span>
                    {
                      data?.email?.map((email:any,index:number) => <p key={index}>{email}</p>)
                    }
                    </h4>
                  </div>
                  <div className="flex justify-center w-full items-center mt-3">
                    <a href={data?.link}>
                      <button
                        type="button"
                        className="bg-amber-500 rounded-xl p-2 text-white w-28 font-semibold"
                      >
                        See more
                      </button>
                    </a>
                  </div>
                </div>
              </>
              )}
              {tab === 3 && (
               <>
               <div className="tab-1-content flex flex-col mt-1 gap-3 pt-2">
                 <img
                   src={data?.image}
                   className="rounded-lg w-full  object-cover"
                   alt=""
                 />
                 <h2 className="text-xl font-bold">
                 {data?.name}
                 </h2>
                 <h3 className="text-base font-semibold">
                   position:{data?.position}
                 </h3>
                 <h3 className="text-base font-semibold">Address:</h3>
                 <div className="text-sm flex flex-col gap-3">
                   <h4>{data?.address}</h4>
                   <h4 className="flex gap-3 items-center">
                     <span>
                       <FaPhoneAlt className="text-blue-700" />
                     </span>
                    {
                      data?.phone?.map((phone:any,index:number) => <p key={index}>{phone}</p>)
                    }
                   </h4>
                   <h4 className="flex gap-3 items-center">
                     <span className="text-blue-700">
                       <MdEmail />
                     </span>
                   {
                     data?.email?.map((email:any,index:number) => <p key={index}>{email}</p>)
                   }
                   </h4>
                 </div>
                 <div className="flex justify-center w-full items-center mt-3">
                   <a href={data?.link}>
                     <button
                       type="button"
                       className="bg-amber-500 rounded-xl p-2 text-white w-28 font-semibold"
                     >
                       See more
                     </button>
                   </a>
                 </div>
               </div>
             </>
              )}

              {tab === 4 && (
               <>
               <div className="tab-1-content flex flex-col mt-1 gap-3 pt-2">
                 <img
                   src={data?.image}
                   className="rounded-lg w-full  object-cover"
                   alt=""
                 />
                 <h2 className="text-xl font-bold">
                 {data?.name}
                 </h2>
                 <h3 className="text-base font-semibold">
                   position:{data?.position}
                 </h3>
                 <h3 className="text-base font-semibold">Address:</h3>
                 <div className="text-sm flex flex-col gap-3">
                   <h4>{data?.address}</h4>
                   <h4 className="flex gap-3 items-center">
                     <span>
                       <FaPhoneAlt className="text-blue-700" />
                     </span>
                    {
                      data?.phone?.map((phone:any,index:number) => <p key={index}>{phone}</p>)
                    }
                   </h4>
                   <h4 className="flex gap-3 items-center">
                     <span className="text-blue-700">
                       <MdEmail />
                     </span>
                   {
                     data?.email?.map((email:any,index:number) => <p key={index}>{email}</p>)
                   }
                   </h4>
                 </div>
                 <div className="flex justify-center w-full items-center mt-3">
                   <a href={data?.link}>
                     <button
                       type="button"
                       className="bg-amber-500 rounded-xl p-2 text-white w-28 font-semibold"
                     >
                       See more
                     </button>
                   </a>
                 </div>
               </div>
             </>
              )}
            </div>
          </div>
        </div>
      </MobileContainer>
    </>
  );
}

export default LeaderShip;
