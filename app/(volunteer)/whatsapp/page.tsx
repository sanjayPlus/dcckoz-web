"use client";
import React, { useEffect, useState } from "react";
import MobileContainer from "@/components/MobileContainer";
import { useRouter } from "next/navigation";
import { MdArrowBackIosNew } from "react-icons/md";
import axios from "axios";
import SERVER_URL from "@/config/SERVER_URL";
import VOLUNTEER_URL from "@/config/VOLUNTEER_URL";

function Whatsapp() {
    const [Whatsapp, setWhatsapp] = useState([]);
    useEffect(() => {
      if (!localStorage.getItem("volunteer-token")) {
        router.push("/dmc");
      }
      axios
        .get(`${VOLUNTEER_URL}/volunteer/protected`, {
          headers: {
            "x-access-token": localStorage.getItem("volunteer-token"),
          },
        })
        .then(async (response) => {
          if (response.status === 200) {
            axios.get(`${VOLUNTEER_URL}/volunteer/whatsapp`,{
              headers: {
                  'x-access-token': localStorage.getItem("volunteer-token")
              }
          }).then((response) => {
              setWhatsapp(response.data.whatsapp) 
          })
          } else {
            localStorage.removeItem("volunteer-token");
            router.push("/dmc");
          }
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("volunteer-token");
          router.push("/dmc");
        });
    }, []);
    
  const router = useRouter();
  return (
    <MobileContainer>
      <div className="w-full h-full bg-[#F1F4FF] flex flex-col items-center relative">
        <div className=" w-full  bg-white/100 mb-7 box-shodow-lg box-shagow-black flex flex-col border-[#C0C2CB)] shadow-lg shadow-[#C0C2CB)]   ">
          <MdArrowBackIosNew
            className=" text-lg cursor-pointer absolute left-4 mt-3   text-black z-50"
            onClick={() => router.back()}
          />
          <h1 className=" text-xl text-center font-bold mt-5 drop-shadow-lg text-black mb-4">
            Whatsapp{" "}
          </h1>
        </div>
        <div className="w-[92%] h-[80%] bg-white p-2  flex flex-col ">
          <div className="w-full flex  justify-center">
            <h1>
              {" "}
              <b>WhatsApp</b>
            </h1>
          </div>
          {
              Whatsapp?.map((whatsapp:any,index:number)=>{
                  return(
                      <div className="w-full mt-7 border-b-4 border-[#F2F4F7] p-2">
                        <a href={whatsapp.link} >Group {index+1} <span className="text-blue underline">Click Here</span></a>
                      </div>
                  )
              })
          }

        
        </div>
      </div>
    </MobileContainer>
  );
}

export default Whatsapp;
