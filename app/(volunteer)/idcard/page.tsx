"use client";
import React, { useEffect, useState } from "react";
import MobileContainer from "@/components/MobileContainer";
import { MdArrowBackIosNew } from "react-icons/md";
import { useRouter } from "next/navigation";
import SERVER_URL from "@/config/SERVER_URL";
import axios from "axios";
import VOLUNTEER_URL from "@/config/VOLUNTEER_URL";
import toast from "react-hot-toast";

function IdCreation() {
  const router = useRouter();
  const [image, setImage] = useState<string | undefined>();
  const [booth, setBooth] = useState("");
  const [district, setDistrict] = useState("");
  const [assembly, setAssembly] = useState("");
  const [constituency, setConstituency] = useState("");
  const [assemblyList, setAssemblyList] = useState([]);
  const [constituencyList, setConstituencyList] = useState([]);
  const [boothList, setBoothList] = useState([]);

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
          axios
            .get(`${SERVER_URL}/user/details`, {
              headers: {
                "x-access-token": localStorage.getItem("token"),
              },
            })
            .then((userResponse) => {
              if (userResponse.status === 200) {
                setDistrict(userResponse.data.district);
                setConstituency(userResponse.data.assembly);
                axios
                  .get(
                    `${VOLUNTEER_URL}/admin/state-districtV1?district=${userResponse.data.district}`,
                    {
                      // Use the updated district value
                      headers: {
                        "x-access-token": localStorage.getItem("token"),
                      },
                    }
                  )
                  .then((response) => {
                    if (response.status === 200) {
                      setConstituencyList(response.data);
                    }
                  })
                  .catch((err) => {
                    console.log(err.response.data);
                  });
              }
            });
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
  const handleConstitunecyChange = (e: any) => {
    if (district == "") {
      toast.error("Select The District");
    }
    const selectedConstitunecy = e.target.value; // Get the selected district from the event

    setConstituency(selectedConstitunecy); // Update the district state with the selected district

    axios
      .get(
        `${VOLUNTEER_URL}/admin/state-districtV1?district=${district}&constituency=${selectedConstitunecy}`,
        {
          // Use the updated district value
          headers: { "x-access-token": localStorage.getItem("token") },
        }
      )
      .then((userResponse) => {
        if (userResponse.status === 200) {  
            setAssemblyList(userResponse.data);
            setBoothList([]);
            setAssembly("");
            setBooth("");
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  const handleAssemblyChange = (e: any) => {
    if (district == "") {
      toast.error("Select The District");
    }
    if (constituency == "") {
      toast.error("Select The Constituency");
    }
    const selectedAssembly = e.target.value; // Get the selected district from the event

    setAssembly(selectedAssembly); // Update the district state with the selected district

    axios
      .get(
        `${VOLUNTEER_URL}/admin/state-districtV1?district=${district}&constituency=${constituency}&assembly=${selectedAssembly}`,
        {
          // Use the updated district value
          headers: { "x-access-token": localStorage.getItem("token") },
        }
      )
      .then((userResponse) => {
        if (userResponse.status === 200) {
          setBoothList(userResponse.data);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  const callImageApi = async () => {
    axios
      .get(`${VOLUNTEER_URL}/volunteer/download-logo?constituency=${constituency}&assembly=${assembly}&booth=${booth}`, {
        headers: {
          "x-access-token": localStorage.getItem("volunteer-token"),
        },
        responseType: "arraybuffer", // Set response type to arraybuffer
      })
      .then((response) => {
        // Convert the arraybuffer to base64
        const base64Image = Buffer.from(response.data, "binary").toString(
          "base64"
        );
        setImage(base64Image);
        const link = document.createElement("a");
        link.href = `data:image/png;base64,${base64Image}`;
        link.download = "logo.png";
        link.click();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDownloadImage = async () => {
    await callImageApi();
    if (image) {
      const link = document.createElement("a");
      link.href = `data:image/png;base64,${image}`;
      link.download = "logo.png";
      link.click();
    }
  };

  return (
    <MobileContainer>
      <div className="w-full bg-[##F1F4FF] flex flex-col items-center relative bg-slate-100">
        <div className=" w-full bg-white/100 mb-7 box-shodow-lg box-shagow-black flex flex-col   ">
          <MdArrowBackIosNew
            className=" text-lg cursor-pointer absolute left-4 mt-3   text-black z-50"
            onClick={() => router.back()}
          />
          <h1 className=" text-xl text-center font-bold mt-5 drop-shadow-lg text-black mb-4">
            {" "}
            DMC
          </h1>
        </div>
        <div className="w-[80%] gap-4 flex flex-col items-center justify-center ">
          {image ? <img src={`data:image/png;base64,${image}`} alt="Logo" />:<img src='/images/id-logo.png' alt="Logo" />}
          <div className="max-w-sm mx-auto">
            <label
              htmlFor="constitunecy"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Select Assembly
            </label>
            <select
              id="constitunecy"
              onChange={(e) => handleConstitunecyChange(e)}
              className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-900 focus:border-blue-900 block w-full p-3 dark:bg-white dark:border-gray-600 dark:placeholder-black dark:text-black dark:focus:ring-blue-800 dark:focus:border-blue-900"
            >
              <option>Select an option</option>
              {constituencyList.map((assembly: any) => (
                <option key={assembly} value={assembly}>
                  {assembly}
                </option>
              ))}
            </select>
          </div>
          <div className="max-w-sm mx-auto">
            <label
              htmlFor="assembly"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Select Mandlam
            </label>
            <select
              id="assembly"
              onChange={(e) => handleAssemblyChange(e)}
              className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-900 focus:border-blue-900 block w-full p-3 dark:bg-white dark:border-gray-600 dark:placeholder-black dark:text-black dark:focus:ring-blue-800 dark:focus:border-blue-900"
            >
              <option>Select an option</option>
              {assemblyList.map((assembly: any) => (
                <option key={assembly} value={assembly}>
                  {assembly}
                </option>
              ))}
            </select>
          </div>
          <div className="max-w-sm mx-auto">
            <label
              htmlFor="booth"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Select Booth
            </label>
            <select
              id="booth"
              onChange={(e) => setBooth(e.target.value)}
              className="bg-gray-50 mb-2 border border-gray-300 text-sm rounded-xl overflow-x-scroll focus:ring-blue-900 focus:border-blue-800 block w-full p-3 dark:bg-white dark:border-gray-600 dark:placeholder-black dark:text-black dark:focus:ring-blue-800 dark:focus:border-blue-900"
            >
              <option>Select an option</option>
              {boothList.map((booth: any) => (
                <option key={booth} value={booth.number}>
                  {booth.number}
                </option>
              ))}
            </select>
          </div>
          <button
            className="w-[80%] p-2 bg-blue-400 text-white rounded-lg mb-5"
            onClick={handleDownloadImage}
          >
            ID Creation
          </button>
        </div>
      </div>
    </MobileContainer>
  );
}

export default IdCreation;
