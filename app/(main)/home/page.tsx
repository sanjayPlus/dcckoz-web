"use client";
import MobileContainer from "@/components/MobileContainer";
import ImageCarousel from "@/components/ImageCarousel";
import TopNav from "@/components/Topnav";
import React, { useEffect, useState } from "react";
import SERVER_URL from "@/config/SERVER_URL";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  FaBook,
  FaBookOpen,
  FaCalendarDay,
  FaPeopleCarryBox,
} from "react-icons/fa6";
import {
  MdGroups,
  MdLeaderboard,
  MdMenuBook,
  MdOutlineArticle,
  MdLibraryBooks,
} from "react-icons/md";
import { IoMdMusicalNote } from "react-icons/io";
import { CgOrganisation } from "react-icons/cg";

import { IoLogoWhatsapp, IoMusicalNotesOutline } from "react-icons/io5";
import { FaFacebook, FaUser } from "react-icons/fa";
// import Polling from '@/components/Polling';
import BottomNav from "@/components/BottomNav";
import AdsCarousel from "@/components/AdsCarousel";
import Link from "next/link";
import { messaging } from "@/app/firebase/config";
import { getToken, onMessage } from "firebase/messaging";
import "./home.css";
import { MdOutlinePersonAddAlt } from "react-icons/md";

// import { getToken } from 'firebase/messaging';
// import { messaging } from '@/config/firebase';
import PollingCarousel from "../../../components/PollingCarousel";

function Home() {
  const [carousel, setCarousel] = useState([]);
  const router = useRouter();
  const [ads, setAds] = useState([]);
  const [token, setToken] = useState<string | null>(null);

  const requestPermission = async () => {
    try {
      const permission = await Notification.requestPermission();

      if (permission === "granted") {
        if (messaging) {
          // Check if messaging is not null
          const newToken = await getToken(messaging, {
            vapidKey:
              "BEVCM2zy9OhN7Udc_U0X1jubP85nXoB__OdXxJGD73Fw79vHdslLEvlyNfr3Q1UwGO9At4CIEDywICPVl8yDaQE",
          });
          console.log(newToken);
          setToken(newToken);

          axios.post(
            SERVER_URL + "/user/add-notification-token",
            { FCMToken: newToken },
            {
              headers: {
                "x-access-token": localStorage.getItem("token") || "", // make sure to handle the case when token is null
              },
            }
          );
        }
      } else if (permission === "denied") {
        console.error("Notification permission denied");
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Firebase messaging initialization and usage
      requestPermission();
    }
    messaging &&
      onMessage(messaging, (payload) => {
        console.log("Message received:", payload);
        // Handle the received message, e.g., show a notification or update UI
      });
  }, []);

  useEffect(() => {
    axios.get(SERVER_URL + "/admin/carousel").then((response) => {
      setCarousel(response.data);
    });
    axios.get(SERVER_URL + "/admin/ad").then((response) => {
      setAds(response.data);
    });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
    axios
      .get(SERVER_URL + "/user/protected", {
        headers: {
          "x-access-token": token,
        },
      })
      .then((response) => {
        if (response.status !== 200) {
          router.push("/login");
        }
      })
      .catch((error) => {
        router.push("/login");
        localStorage.removeItem("token");
      });
  }, []);
  useEffect(() => {
    axios
      .get(SERVER_URL + "/user/details", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (!res.data.verified) {
          router.push("/verify-otp");
        }
      })
      .catch((error) => {
        router.push("/login");
        localStorage.removeItem("token");
      });
  }, []);
  return (
    <>
      <MobileContainer>
        <div className="w-full  flex flex-col relative bg-blue-50">
          <TopNav />
          <div className="w-full p-2 rounded-2xl">
            {carousel.length === 0 ? (
              <>
                <img src="/images/cur_1.jpg" alt="noImage" />
              </>
            ) : (
              <>
                <ImageCarousel carousel={carousel} />
              </>
            )}
          </div>

          {/* //change  component  */}

          {/* <div className="main-button-container w-auto flex justify-center items-center pl-3 pr-3 mt-2">
                        <div className="main-buttons grid grid-cols-4 md:grid-cols-2 lg:grid-cols-4   gap-1 bg-blue-800 p-2 rounded-3xl  ">

                            <div className="main-button py-3 flex flex-col justify-center items-center gap-y-2 border border-inherit text-white rounded-xl p-2 cursor-pointer" onClick={() => router.push("/leadership")}>
                                <FaUser size={22} />
                                <p className='m-0 text-xs' style={{ userSelect: "none" }}>Leadership</p>
                            </div>

                            <div className="main-button flex flex-col justify-center items-center gap-y-3 text-white border border-inherit rounded-xl p-2 cursor-pointer" onClick={() => router.push("/history")}>
                                <FaBookOpen size={22} />
                                <p className='m-0 text-xs' style={{ userSelect: "none" }}>History</p>
                            </div>

                            <div className="main-button flex flex-col justify-center items-center gap-y-3 text-white border border-inherit rounded-xl p-2 cursor-pointer" onClick={() => router.push("/events-gallery")}>
                                <FaCalendarDay size={22} />
                                <p className='m-0 text-xs' style={{ userSelect: "none" }}>Events</p>
                            </div>

                            <div onClick={() => router.push("/leaderboard")} className="main-button flex flex-col justify-center border border-inherit items-center gap-1  text-white  rounded-xl p-1 cursor-pointer">
                                <MdLeaderboard size={24} />
                                <p className='m-0 text-xs text-center break-words' style={{ userSelect: "none" }}>Leader Board</p>
                            </div>

                            <div className="main-button flex flex-col justify-center items-center gap-y-3 text-white border border-inherit rounded-xl p-2 cursor-pointer" onClick={() => router.push("/slogan")}>
                                <FaBook size={22} />

                                <p className='m-0 text-xs' style={{ userSelect: "none" }}>Slogan</p>
                            </div>

                            <div onClick={() => window.open("https://intucthrissur.com/pravarthnagal-samelngal.php")} className="main-button flex flex-col justify-center border border-inherit items-center gap-y-1 text-white  rounded-xl p-2 cursor-pointer">
                                <MdGroups size={26} />
                                <p className='m-0 text-xs text-center break-words' style={{ userSelect: "none" }}>State Convention</p>
                            </div>

                            <div className="main-button flex flex-col justify-center items-center gap-y-1 text-white border border-inherit rounded-xl p-2 cursor-pointer" onClick={() => router.push("/trade-union")}>
                                <FaPeopleCarryBox size={22} />
                                <p className='m-0 text-xs text-center break-words' style={{ userSelect: "none" }} >Trade Union</p>
                            </div>

                            <div onClick={() => window.open("https://soundcloud.com/keralapcc")} className="main-button flex flex-col justify-center items-center border border-inherit gap-y-3 text-white rounded-xl p-2 cursor-pointer">
                                <IoMusicalNotesOutline size={22} />
                                <p className='m-0 text-xs' style={{ userSelect: "none" }}>Music</p>
                            </div>
                        </div>
                    </div> */}

          {/* //change  component  end*/}

          {/* new  start*/}

          <div className="cricle-contDiv ">
            <div className="cricle-mainDiv ">
              {/* <div className='img-Div'> */}
              <img
                src="/images/new-bg.png"
                alt="noImage"
                className="img object-center"
              />

              {/* </div> */}

              <div>
                <div className="textOne flex items-center justify-center w-12 h-12 rounded-full bg-[#082282]">
                  <MdOutlinePersonAddAlt
                    className="icon"
                    onClick={() => router.push("/leadership")}
                  />
                </div>
                <span className="textOne-span">Leadership</span>
              </div>

              <div>
                <div
                  className="textTwo flex items-center justify-center w-12 h-12 rounded-full bg-[#082282]"
                  onClick={() => router.push("/leaderboard")}
                >
                  <MdLeaderboard className="icon" />
                </div>
                <span className="textTwo-span">Leaderboard</span>
              </div>

              <div>
                <div
                  className="textThree flex items-center justify-center w-12 h-12 rounded-full bg-[#082282]"
                  onClick={() =>
                    window.open(
"https://timesofindia.indiatimes.com/city/thiruvananthapuram/chandy-demands-organizational-poll/articleshow/55916341.cms"                      )
                  }
                >
                  <MdGroups className="icon" />
                  <span className="textThree-span">
                    peoples Representatives
                  </span>
                </div>
              </div>

              <div>
                <div
                  className="textFour flex items-center justify-center w-12 h-12 rounded-full bg-[#082282]"
                  onClick={() => router.push("/history")}
                >
                  <MdMenuBook className="icon" />
                  <span className="textFour-span">History</span>
                </div>
              </div>

              <div className="gandi-div">
                <img className="gandi-img" src="/Group.jpg" alt="" />
              </div>

              <div className="article p-3 ">
                <div
                  className="textFive flex items-center justify-center w-12 h-12 rounded-full  bg-[#082282]"
                  onClick={() =>
                    window.open("https://www.thehindu.com/news/cities/Thiruvananthapuram/dcc-stages-protest-march-in-thiruvananthapuram/article65524017.ece")
                  }
                >
                  <MdOutlineArticle className="icon" />
                  <span className="textFive-span">Articles</span>
                </div>
              </div>

              <div>
                <div
                  className="textSix flex items-center justify-center w-12 h-12 rounded-full bg-[#082282]"
                  onClick={() => router.push("/Nutritional-organizations")}
                >
                  <CgOrganisation className="icon" />
                  <span className="textSix-span">
                    Nutritional Organizations
                  </span>
                </div>
              </div>

              <div>
                <div
                  className="textSeven flex items-center justify-center w-12 h-12 rounded-full bg-[#082282]"
                  onClick={() =>
                    router.push("/music")
                  }
                >
                  <IoMdMusicalNote className="icon" />
                  <span className="textSeven-span">Music</span>
                </div>
              </div>

              <div>
                <div
                  className="textEight flex items-center justify-center w-12 h-12 rounded-full bg-[#082282]"
                  onClick={() => router.push("/slogan")}
                >
                  <MdLibraryBooks className="icon" />
                  <span className="textEight-span">Slogans</span>
                </div>
              </div>
            </div>
            <div></div>
          </div>

          {/* new components end */}

          <div className="social-link-container  flex justify-center w-full ">
            <div className="w-80 px-4 p-4 flex justify-between items-center rounded-xl mb-2  bg-white">
              <div>
              <Link
                  href="https://www.facebook.com/dccthiruvananthapuram/"
                  target="_blank"
                >
                  <FaFacebook
                    className="fill-blue-600 gap-y-3 mt-1 mb-1 "
                    size={35}
                  />
                </Link>
              </div>
              {/* <div>
                <Link
                  href="https://www.instagram.com/dccmalappuramofficial/"
                  target="_blank"
                >
                  <img
                    src="/icons/instagram.png"
                    alt=""
                    className="w-14 p-1 mt-1"
                  />
                </Link>
              </div> */}
              {/* <div>
                <Link
                  href="https://www.youtube.com/channel/UCepmw1tTeZytjsVlHUF2FfQ"
                  target="_blank"
                >
                  <img
                    src="/icons/youtube.png"
                    alt=""
                    className="w-14 p-1 mt-1 mb-1"
                  />
                </Link>
              </div> */}
              <div>
                <Link href="https://wa.me/918281749650" target="_blank">
                  <IoLogoWhatsapp
                    className="fill-green-500 gap-y-3 mb-1"
                    size={34}
                  />
                </Link>
              </div>
              <div>
                <Link href="tel:+918281749650" target="_blank">
                  <img
                    src="/icons/customer-care.png"
                    alt=""
                    className="w-10 p-2 mr-1 ml-1"
                  />
                </Link>
              </div>
            </div>
          </div>

          <div
            onClick={() => router.push("/contribute")}
            className="social-link-container w-full px-4 my-2"
          >
            <img src="/images/contrigandi.png" alt="" />
          </div>

          <div
            onClick={() => {
              localStorage.removeItem("volunteer-token");
              router.push("/RmcRegister");
            }}
            className="social-link-container w-full px-4 my-2 cursor-pointer"
          >
            <img src="/images/rmclist.jpg" alt="" />
          </div>

          <div
            onClick={() => router.push("/whatsapp-link")}
            className="social-link-container w-full px-4 my-2  "
          >
            <img className="w-full"  src="/images/volunteer.png" alt="" />
          </div>

          <div className="polling-container-2 w-full flex flex-col justify-center items-center my-7">
            <h2
              className="text-lg font-bold m-0"
              style={{ userSelect: "none" }}
            >
              POLLING
            </h2>
            <h5
              className="text-sm font-semibold text-blue-700"
              style={{ userSelect: "none" }}
            >
              make Your Statement
            </h5>
            {/* <Polling /> */}
            <PollingCarousel />
          </div>
          {/* <div className="banner-image w-full flex justify-center items-center px-2 rounded-lg my-2 mt-1"> */}
          {/* <div className="banner-image-bg w-full p-1 flex justify-center items-center rounded-lg " style={{ backgroundImage: "url('./images/banner-bg1.png')", backgroundSize: "cover" }}> */}
          {/* <Link href="https://intucthrissur.com/">
                                <img src="/images/banner-bg2.png" alt="" className='' />
                            </Link> */}
          {/* </div> */}
          {/* </div> */}
          <div className="w-full p-2 rounded-2xl mb-24">
            <AdsCarousel carousel={ads} />
          </div>
          <div className="banner-image w-full h-full flex justify-center items-center px-2 rounded-lg mt-3 mb-20 cursor-pointer">
            <img
              onClick={() => router.push("/developers")}
              src="/images/dev-banner.jpg"
              alt=""
              className="rounder-lg"
            />
          </div>
        </div>
        <BottomNav activeItem="home" />
      </MobileContainer>
    </>
  );
}

export default Home;