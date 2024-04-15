"use client";
import BottomNav from "@/components/BottomNav";
import MobileContainer from "@/components/MobileContainer";
import SERVER_URL from "@/config/SERVER_URL";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { AiFillLike } from "react-icons/ai";
import { FaHeart, FaPlay } from "react-icons/fa";
import "./gallery.css";
import GalleryTopNavbar from "@/components/GalleryTopNavbar";
// import YouTubePlayer from '@/components/youtube'
import ReactPlayer from 'react-player';

function Gallery() {
  const router = useRouter();
  const [gallery, setGallery] = useState<any>([]);
  const [likes, setLikes] = useState<any>([]);
  const [active, setActive] = useState<string>("image");
  const [video, setVideo] = useState<any>([]);
  const [reels, setReels] = useState<any>([]);
  const [Trolls, setMemes] = useState<any>([]);
  


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
    axios
      .get(SERVER_URL + "/user/gallery")
      .then((response) => {
        setGallery(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    if (active === "image") {
      axios
        .get(SERVER_URL + "/user/gallery-likes", {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        })
        .then((response) => {
          setLikes(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const handleSetLike = () => {
    axios
      .get(SERVER_URL + "/user/gallery-likes", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setLikes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (active === "video") {
      axios.get(SERVER_URL + "/admin/videogallery").then((response) => {
        setVideo(response.data);
      });
    } else if (active === "reels") {
      axios.get(SERVER_URL + "/admin/reels").then((response) => {
        setReels(response.data);
      });
    } else if (active === "memes") {
      axios.get(SERVER_URL + "/admin/meme").then((response) => {
        setMemes(response.data);
      });
    } else if (active === "image") {
      axios.get(SERVER_URL + "/user/gallery").then((response) => {
        setGallery(response.data);
      });
    }
  }, [active]);
  const addLike = (id: any) => {
    //add if no id else remove

    axios
      .post(
        SERVER_URL + "/user/add-like-to-image",
        { imageId: id },
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          handleSetLike();
        }
      })
      .catch((error) => {
        axios
          .post(
            SERVER_URL + "/user/remove-like-from-image",
            { imageId: id },
            {
              headers: {
                "x-access-token": localStorage.getItem("token"),
              },
            }
          )
          .then((response) => {
            if (response.status === 200) {
              handleSetLike();
            }
          });
      });
  };

  return (
    <>
      <MobileContainer>
        <div
          className="gallery-container w-full  flex flex-col justify-start items-center relative"
          style={{
            backgroundImage: "url('/images/backimg.jpeg')",
            backgroundSize: "cover",
          }}
        >
          <GalleryTopNavbar active={active} setActive={setActive} />
          <div className="w-full flex flex-col justify-center items-center pt-1 rounded-md  pb-16 ">
            {active === "image" &&
              gallery.map((item: any, index: any) => (
                <>
                  <div
                    className="galery-card w-[86%] flex flex-col justify-center items-center bg-white shadow-lg p-5 rounded-xl my-2 border-2  border-black"
                    key={index}
                    onClick={() => item?.link && window.open(item?.link)}
                  >
                    <div
                      className="gallery-image w-[260px] h-[320px] relative"
                      style={{
                        backgroundImage: `url(${item.image})`,
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    >
                      <div
                        className="text-xl absolute bottom-2 right-3 w-10 h-10 flex justify-center items-center bg-white rounded-full cursor-pointer"
                        onClick={() => addLike(item._id)}
                      >
                        <div className="bg-zinc-500 rounded-3xl w-10 flex items-center justify-center h-10">
                          <FaHeart
                            size={18}
                            className={
                              likes?.find((like: any) => like._id === item._id)
                                ? `text-red-500`
                                : `text-white`
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold my-2">{item.name}</h3>
                    <p className="text-sm">{item.description}</p>
                    {item?.link && (
                      <button
                        className="text-center font-semibold text-sm bg-amber-500 rounded-2xl px-5 py-2 border-2 border-black mt-2"
                        onClick={() => window.open(item?.link)}
                      >
                        Open
                      </button>
                    )}
                  </div>
                </>
              ))}
         {active === "video" && (
  <div>
        {video?.map((item: any, index: any) => (
      <div
        className="gallery-card w-[86%] mx-auto flex flex-col justify-center items-center bg-white shadow-lg p-5 rounded-xl my-2 border-2  border-black"
        key={index}
      >
        <div className="gallery-image w-[260px] h-[320px] relative">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${item.url}`}
            width="100%"
            height="100%"
            controls
          />
        </div>
        <h3 className="text-xl font-semibold my-2">{item?.title}</h3>
        <p className="text-sm">{item?.description}</p>
        {item?.url && (
          <button
            className="text-center font-semibold text-sm bg-amber-500 rounded-2xl px-5 py-2 border-2 border-black mt-2"
            onClick={() => window.open(item?.url)}
          >
            Open
          </button>
        )}
      </div>
    ))}
  </div>
)}

            {active === "reels" &&
              reels.map((item: any, index: any) => (
                <>
                  <div
                    className="galery-card w-[86%] flex flex-col justify-center items-center bg-white shadow-lg p-5 rounded-xl my-2 border-2  border-black"
                    key={index}
                    onClick={() => item?.link && window.open(item?.link)}
                  >
                    <div
                      className="gallery-image w-[260px] h-[320px] relative"
                      style={{
                        backgroundImage: `url(${item.image})`,
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    >
                      <div
                        className="text-xl absolute bottom-2 right-3 w-10 h-10 flex justify-center items-center bg-white rounded-full cursor-pointer"
                        onClick={() => addLike(item._id)}
                      ></div>
                    </div>

                    <h3 className="text-xl font-semibold my-2">{item.name}</h3>
                    <p className="text-sm">{item.description}</p>
                    {item?.link && (
                      <button
                        className="text-center font-semibold text-sm bg-amber-500 rounded-2xl px-5 py-2 border-2 border-black mt-2"
                        onClick={() => window.open(item?.link)}
                      >
                        Open
                      </button>
                    )}
                  </div>
                </>
              ))}
            {active === "Trolls" &&
              Trolls.map((item: any, index: any) => (
                <>
                  <div
                    className="galery-card w-[86%] flex flex-col justify-center items-center bg-white shadow-lg p-5 rounded-xl my-2 border-2  border-black"
                    key={index}
                    onClick={() => item?.link && window.open(item?.link)}
                  >
                    <div
                      className="gallery-image w-[260px] h-[320px] relative"
                      style={{
                        backgroundImage: `url(${item.image})`,
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    >
                      <div
                        className="text-xl absolute bottom-2 right-3 w-10 h-10 flex justify-center items-center bg-white rounded-full cursor-pointer"
                        onClick={() => addLike(item._id)}
                      ></div>
                    </div>

                    <h3 className="text-xl font-semibold my-2">{item.name}</h3>
                    <p className="text-sm">{item.description}</p>
                    {item?.link && (
                      <button
                        className="text-center font-semibold text-sm bg-amber-500 rounded-2xl px-5 py-2 border-2 border-black mt-2"
                        onClick={() => window.open(item?.link)}
                      >
                        Open
                      </button>
                    )}
                  </div>
                </>
              ))}
          </div>
        </div>
        <BottomNav activeItem="gallery" />
      </MobileContainer>
    </>
  );
}

export default Gallery;