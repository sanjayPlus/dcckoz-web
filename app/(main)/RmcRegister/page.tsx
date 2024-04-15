"use client";
// import BottomNav from '@/components/BottomNav';
// import Sidebar from "@/components/sidebar";
import MobileContainer from "@/components/MobileContainer";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaPhone, FaUser } from "react-icons/fa";

import { MdArrowBackIosNew, MdOutlineMailOutline } from "react-icons/md";
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import axios from "axios";

import { FaPhoneAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import SERVER_URL from "@/config/SERVER_URL";
import VOLUNTEER_URL from "@/config/VOLUNTEER_URL";
import Loading from "@/components/Loading";

// import moment from 'moment';
// import './events.css'
// type ValuePiece = Date | null;

// type Value = ValuePiece | [ValuePiece, ValuePiece];
function Rmc() {
  const [booth, setBooth] = useState("");
  const [district, setDistrict] = useState("");
  const [assembly, setAssembly] = useState("");
  const [constituency, setConstituency] = useState("");
  const [phone, setPhone] = useState("");
  const [districtList, setDistrictList] = useState([]);
  const [ward, setWard] = useState("");
  const [constituencyList, setConstituencyList] = useState([]);

  const [assemblyList, setAssemblyList] = useState([]);

  const [boothList, setBoothList] = useState([]);
  const [boothRule, setBoothRule] = useState<any[]>([]);
  const [userData, setUserData] = useState<any>({});
  const [power, setPower] = useState("");
  const [showMessage, setShowMessage] = useState(true);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
    axios
      .get(`${SERVER_URL}/user/protected`, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
        axios
          .get(SERVER_URL + "/user/details", {
            headers: {
              "x-access-token": localStorage.getItem("token"),
            },
          })
          .then((response) => {
            setUserData(response.data);
            setDistrict(response.data.district);
            setConstituency(response.data.assembly);
            setLoading(false)
            if (response.data.volunteer.applied) {
              setShowMessage(false);
            }
            if (response.data.volunteer.status) {
              router.push("/dmc");
            }
            axios
              .get(
                `${VOLUNTEER_URL}/admin/state-districtV1?district=${response.data.district}&constituency=${response.data.assembly}`,
                {
                  // Use the updated district value
                  headers: { "x-access-token": localStorage.getItem("token") },
                }
              )
              
              .then((userResponse) => {
                if (userResponse.status === 200) {
                  setAssemblyList(userResponse.data);
                }
              })
              .catch((err) => {
                console.log(err.response.data);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      });
  }, []);

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
  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!power) {
      toast.error("Please Select Power");
      return;
    }
    if (!booth) {
      toast.error("Please Select Booth");
      return;
    }
    if (!assembly) {
      toast.error("Please Select Mandalam");
      return;
    }
    if(!ward){
      toast.error("Please Select Ward");
      return;
    }
    const token = localStorage.getItem("token");
    axios
      .post(
        `${SERVER_URL}/user/apply-as-volunteer`,
        {
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          district: district,
          assembly,
          booth,
          boothRule: [booth],
          constituency: constituency,
          power: power,
          ward: ward,
        },
        {
          headers: {
            "x-access-token": token,
          },
        }
      )
      .then((res) => {
        toast.success("Registered Successfully");
        setShowMessage(false);
      })
      .catch((err) => {
        toast.error("Already Registered");
      });
  };
  if(loading){
    return <Loading/>
  }
  return (
    <MobileContainer>
      <div
        className="profile-container w-full min-h-screen flex flex-col justify-start items-center relative "
        style={{
          backgroundImage: "url('/backimg.jpeg')",
          backgroundSize: "cover",
        }}
      >
        {showMessage ? (
          <>
        <div className='w-full h-20 bg-white flex items-center flex-col justify-center'>
        <MdArrowBackIosNew
          className="text-lg cursor-pointer absolute top-7 left-3"
          onClick={() => router.back()}
        />
        
            <h1 className="text-xl text-center font-bold my-7 ">
              Register as DMC Member
            </h1>
            </div>
            <div className="flex   justify-center items-center bg-white p-6 m-4 rounded-3xl h-min shadow-xl shadow-black w-[85%]">
              <div className="input-container  pb-5 flex flex-col w-full justify-center items-center ">
                {/* <div className="max-w-sm mx-auto">
              <label
                htmlFor="district"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Select District
              </label>
              <select
                id="district"
                className=" mb-2 border text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-white dark:border-gray-600 dark:placeholder-black dark:text-black dark:focus:ring-blue-800 dark:focus:border-blue-900"
                onChange={(e) => handleDistrictChange(e)}
              >
                <option>Select an option</option>
                {districtList.map((district: any) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>
            <div className="max-w-sm mx-auto">
              <label
                htmlFor="constituency"
                className="block mb-2  text-sm font-medium text-gray-900 dark:text-black"
              >
                Select Constituency
              </label>
              <select
                id="constituency"
                onChange={(e) => handleConstituencyChange(e)}
                className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-white dark:border-gray-600 dark:placeholder-black dark:text-black dark:focus:ring-blue-800 dark:focus:border-blue-900"
              >
                <option>Select an option</option>
                {constituencyList.map((constituency: any) => (
                  <option key={constituency} value={constituency}>
                    {constituency}
                  </option>
                ))}
              </select>
            </div> */}
                <div className="max-w-sm mx-auto">
                  <label
                    htmlFor="power"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Select Task Force
                  </label>
                  <select
                    id="power"
                    onChange={(e) => setPower(e.target.value)}
                    className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-900 focus:border-blue-900 block w-full p-3 dark:bg-white dark:border-gray-600 dark:placeholder-black dark:text-black dark:focus:ring-blue-800 dark:focus:border-blue-900"
                  >
                    <option>Select an option</option>
                    <option value="DTF">DTF</option>
                    <option value="ATF">ATF</option>
                    <option value="MTF">MTF</option>
                    <option value="BTF">BTF</option>
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
                <div className="max-w-sm mx-auto">
                  <input
                    type="text"
                    onChange={(e) => setWard(e.target.value)}
                    className="bg-transparent border border-gray-300 text-sm rounded-xl outline-none text-black block w-full p-3"

                    placeholder="Ward"
                  />
                </div>
                {/* <div className="max-w-sm mx-auto">
              <label
                htmlFor="booth"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Select Booth Rule
              </label>
              {boothList.map((booth: any) => (
                <div key={booth.number}>
                  <input
                    type="checkbox"
                    id={`booth-${booth.number}`}
                    value={booth.number}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setBoothRule((prev) => [...prev, booth.number]);
                      } else {
                        setBoothRule((prev) =>
                          prev.filter((num) => num !== booth.number)
                        );
                      }
                    }}
                  />
                  <label
                    htmlFor={`booth-${booth.number}`}
                    style={{ color: "black" }}
                  >
                    {booth.number} {booth.name}
                  </label>
                </div>
              ))}
            </div> */}

                <div className="w-full mx-auto my-5 px-6">
                  <button
                    className="bg-primary text-white p-4 w-full py-3 rounded-lg bg-indigo-800"
                    onClick={handleSubmit}
                  >
                    Add Volunteer
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-2xl text-center font-bold my-7 top-text d3 text-black">
              Register as DMC Member
            </h1>
            <div className="flex   justify-center items-center bg-white p-6 m-4 rounded-3xl h-min shadow-xl shadow-black ">
              <h1>We Will Update Your Status Within 48 hours</h1>
            </div>
          </>
        )}
      </div>
    </MobileContainer>
  );
}

export default Rmc;
