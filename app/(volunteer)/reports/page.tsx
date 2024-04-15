"use client";
import React, { useEffect, useState } from "react";
import MobileContainer from "@/components/MobileContainer";
import { useRouter } from "next/navigation";
import { MdArrowBackIosNew } from "react-icons/md";
import axios from "axios";
import SERVER_URL from "@/config/SERVER_URL";
import VOLUNTEER_URL from "@/config/VOLUNTEER_URL";
import toast from "react-hot-toast";

function Reports() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const router = useRouter();
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
        if (response.status !== 200) {
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
  const handleSubmit = () => {
    axios
      .post(
        `${VOLUNTEER_URL}/volunteer/add-report`,
        {
          title,
          description,
        },
        {
          headers: {
            "x-access-token": localStorage.getItem("volunteer-token"),
          },
        }
      )
      .then((response) => {
        toast.success("Report added successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <MobileContainer>
      <div className="w-full h-full bg-[#F1F4FF] flex flex-col items-center relative">
        <div className=" w-full  bg-white/100 mb-7 box-shodow-lg box-shagow-black flex flex-col border-[#C0C2CB)] shadow-lg shadow-[#C0C2CB)]   ">
          <MdArrowBackIosNew
            className=" text-lg cursor-pointer absolute left-4 mt-3   text-black z-50"
            onClick={() => router.back()}
          />
          <h1 className=" text-xl text-center font-bold mt-5 drop-shadow-lg text-black mb-4">
            Reports{" "}
          </h1>
        </div>
        <div className="w-[92%] h-[80%] bg-white p-2  flex flex-col ">
          <div className="w-full flex  justify-center">
            <h1>
              {" "}
              <b>Add Report</b>
            </h1>
          </div>
          <div className="max-w-sm mx-auto">
            <div className="mb-5">
              <label
                htmlFor="base-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Title
              </label>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                id="base-input"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="large-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <textarea
                id="message"
                rows={4}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your thoughts here..."
                defaultValue={""}
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>
            <div className="mb-5 flex justify-center items-center">
              <button
                onClick={handleSubmit}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </MobileContainer>
  );
}

export default Reports;
