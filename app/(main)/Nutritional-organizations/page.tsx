"use client";
import BottomNav from "@/components/BottomNav";
import MobileContainer from "@/components/MobileContainer";
import SERVER_URL from "@/config/SERVER_URL";
import { laborUnions } from "@/contants/labourUnion";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { MdArrowBackIosNew } from "react-icons/md";

function page() {
  const router = useRouter();
  const [slogan, setSlogan] = useState<any>([]);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
    }
    axios
      .get(SERVER_URL + "/user/protected", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .catch((error) => {
        router.push("/login");
        localStorage.removeItem("token");
      });
    axios.get(SERVER_URL + "/admin/slogan").then((response) => {
      setSlogan(response.data);
    });
  }, []);

  return (
    <>
      <MobileContainer>
        <div
          className="slogan-container w-full min-h-screen  flex flex-col  items-center relative  "
          style={{
            backgroundImage: "url('/images/backimg.jpeg')",
            backgroundSize: "cover",
          }}
        >
          <div className="w-full h-20 bg-white">
            <MdArrowBackIosNew
              className="text-black text-xl cursor-pointer absolute top-8 left-5   "
              onClick={() => router.back()}
            />
            <h1 className=" text-black  font-serif text-center my-7 text-xl ">
              Nutritional Organizations
            </h1>
          </div>
          <div className="w-full p-4 ">
            <div className="w-[100%] h-auto bg-white rounded-t-lg flex gap-4 border border-black  p-6">
              <div className="flex items-center w-20">
                <img
                  className="w-auto h-auto"
                  src="/youth congress.png"
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-4">
                <h1 className="font-bold text-blue-800 text-lg">
                  Youth Congress
                </h1>
                <div className="flex gap-5 w-[20%]">
                  <img
                    onClick={() =>
                      window.open(
                        "https://www.facebook.com/KeralaPradeshYouthCongressOfficial/"
                      )
                    }
                    src="/icons-icons-facebook-facebook-icon-png-and-psd-instagram-facebook-twitter-logo-115628509484rvrbar9nl 2.png"
                    alt=""
                  />
                  <img
                    onClick={() =>
                      window.open(
                        "https://www.instagram.com/indianyouthcongress/"
                      )
                    }
                    src="/icons-icons-facebook-facebook-icon-png-and-psd-instagram-facebook-twitter-logo-115628509484rvrbar9nl 4.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="w-[100%] h-auto bg-white flex gap-4 border border-black  p-6">
              <div className="flex items-center w-20 ">
                <img
                  className="h-20 w-24 rounded-full"
                  src="/Kerala-students-union-flag 1.png"
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-4">
                <h1 className="font-bold text-blue-800 text-lg">
                  Kerala Students Union
                </h1>
                <div className="flex gap-5 w-[20%]">
                  <img
                    onClick={() =>
                      window.open("https://www.facebook.com/myksu/")
                    }
                    src="/icons-icons-facebook-facebook-icon-png-and-psd-instagram-facebook-twitter-logo-115628509484rvrbar9nl 2.png"
                    alt=""
                  />
                  <img
                    onClick={() =>
                      window.open("https://www.instagram.com/ksuinfo/")
                    }
                    src="/icons-icons-facebook-facebook-icon-png-and-psd-instagram-facebook-twitter-logo-115628509484rvrbar9nl 4.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="w-[100%] h-auto bg-white  flex gap-4 border border-black  p-6">
              <div className="flex items-center w-20">
                <img className="w-auto h-auto" src="/Mahila.png" alt="" />
              </div>
              <div className="flex flex-col gap-4">
                <h1 className="font-bold text-blue-800 text-lg">
                  Mahila Congress
                </h1>
                <div className="flex gap-5 w-[20%]">
                  <img
                    onClick={() =>
                      window.open("https://www.facebook.com/MahilaCongress")
                    }
                    src="/icons-icons-facebook-facebook-icon-png-and-psd-instagram-facebook-twitter-logo-115628509484rvrbar9nl 2.png"
                    alt=""
                  />
                  <img
                    onClick={() =>
                      window.open(
                        "https://www.instagram.com/mahilacongres"
                      )
                    }
                    src="/icons-icons-facebook-facebook-icon-png-and-psd-instagram-facebook-twitter-logo-115628509484rvrbar9nl 4.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="w-[100%] h-auto bg-white  flex gap-4 border border-black  p-6">
              <div className="flex items-center w-20">
                <img
                  className="w-auto h-auto"
                  src="/Congress_seva.png"
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-4">
                <h1 className="font-bold text-blue-800 text-lg">
                  Congress Seva Dal
                </h1>
                <div className="flex gap-5 w-[20%]">
                  <img
                    onClick={() =>
                      window.open(
                        "https://www.facebook.com/INCSevaDal"
                      )
                    }
                    src="/icons-icons-facebook-facebook-icon-png-and-psd-instagram-facebook-twitter-logo-115628509484rvrbar9nl 2.png"
                    alt=""
                  />
                  <img
                    onClick={() =>
                      window.open(
                        "https://www.instagram.com/seva_dal"
                      )
                    }
                    src="/icons-icons-facebook-facebook-icon-png-and-psd-instagram-facebook-twitter-logo-115628509484rvrbar9nl 4.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="w-[100%] h-auto bg-white flex gap-4 border border-black  p-6">
              <div className="flex items-center w-20">
                <img className="w-auto h-auto" src="/intuc1.png" alt="" />
              </div>
              <div className="flex flex-col gap-4">
                <h1 className="font-bold text-blue-800 text-lg">INTUC</h1>
                <div className="flex gap-5 w-[30%]">
                  <img
                    onClick={() =>
                      window.open("https://www.facebook.com/INTUCTHRISSUR")
                    }
                    src="/icons-icons-facebook-facebook-icon-png-and-psd-instagram-facebook-twitter-logo-115628509484rvrbar9nl 2.png"
                    alt=""
                  />
                  <img
                    onClick={() =>
                      window.open(
                        "https://www.instagram.com/intuc__thrissur"
                      )
                    }
                    src="/icons-icons-facebook-facebook-icon-png-and-psd-instagram-facebook-twitter-logo-115628509484rvrbar9nl 4.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="w-[100%] h-auto bg-white  flex gap-4 border border-black  p-6">
              <div className="flex items-center w-20">
                <img
                  className="w-auto h-auto"
                  src="/Indian_National_Congress_hand.png"
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-4">
                <h1 className="font-bold text-blue-800 text-lg">
                  Bharat dalith Congress
                </h1>
                {/* <div className="flex gap-5 w-[20%]">
                  <img
                    onClick={() =>
                      window.open(
                        "https://www.facebook.com/KeralaPradeshYouthCongressOfficial/"
                      )
                    }
                    src="/icons-icons-facebook-facebook-icon-png-and-psd-instagram-facebook-twitter-logo-115628509484rvrbar9nl 2.png"
                    alt=""
                  />
                  <img
                    onClick={() =>
                      window.open(
                        "https://www.instagram.com/indianyouthcongress/"
                      )
                    }
                    src="/icons-icons-facebook-facebook-icon-png-and-psd-instagram-facebook-twitter-logo-115628509484rvrbar9nl 4.png"
                    alt=""
                  />
                </div> */}
              </div>
            </div>
            <div className="w-[100%] h-auto bg-white flex gap-4 rounded-b-lg border border-black p-6">
              <div className="flex items-center w-20">
                <img className="w-auto h-auto" src="/jawahar3.png" alt="" />
              </div>
              <div className="flex flex-col gap-4">
                <h1 className="font-bold text-blue-800 text-lg">
                  Jawahar Bal Manch
                </h1>
                <div className="flex gap-5 w-[20%]">
                  <img
                    onClick={() =>
                      window.open("https://www.facebook.com/JawaharBalManch/")
                    }
                    src="/icons-icons-facebook-facebook-icon-png-and-psd-instagram-facebook-twitter-logo-115628509484rvrbar9nl 2.png"
                    alt=""
                  />
                  <img
                    onClick={() =>
                      window.open("https://www.instagram.com/jbm.india/")
                    }
                    src="/icons-icons-facebook-facebook-icon-png-and-psd-instagram-facebook-twitter-logo-115628509484rvrbar9nl 4.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          {/* <div className='w-80 flex flex-col justify-center items-center pt-1 rounded-md  pb-16'>
                        {
                            slogan.map((item: any, index: any) => (
                                <>
                                    <div className="slogan-card w-[86%] flex gap-2 justify-center items-center bg-gradient-to-r from-orange-100 to-green-100 shadow-lg p-3 rounded-xl my-2 " key={index}>
                                        <p className='text-sm font-semibold my-2'>{item.slogan}</p>
                                    </div>
                                </>
                            ))
                        }
                    </div>
                     */}
        </div>
      </MobileContainer>
    </>
  );
}

export default page;
