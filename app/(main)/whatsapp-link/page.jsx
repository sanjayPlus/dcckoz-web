
"use client";
import React, { useEffect, useState } from 'react'
import './whatsapp.css';
import MobileContainer from '@/components/MobileContainer';
import { FaArrowLeft } from "react-icons/fa6";
import toast from "react-hot-toast";
import SERVER_URL from "@/config/SERVER_URL";
import VOLUNTEER_URL from "@/config/VOLUNTEER_URL";
import Loading from "@/components/Loading";
import axios from "axios";
import { useRouter } from "next/navigation";
import { MdArrowBackIosNew } from 'react-icons/md';
function page() {
  const [booth, setBooth] = useState("");
  const [district, setDistrict] = useState("");
  const [assembly, setAssembly] = useState("");
  const [constituency, setConstituency] = useState("");
  const [phone, setPhone] = useState("");
  const [districtList, setDistrictList] = useState([]);
  const [ward, setWard] = useState("");
  const [constituencyList, setConstituencyList] = useState([]);
  const [whatsappPublic, setWhatsappPublic] = useState([]);
  const [assemblyList, setAssemblyList] = useState([]);
  const [showText, setShowText] = useState(false);
  const [boothList, setBoothList] = useState([]);
  const [userData, setUserData] = useState({});
  const [power, setPower] = useState("");
  const [showMessage, setShowMessage] = useState(true);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
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
               ` ${VOLUNTEER_URL}/admin/state-districtV1?district=${response.data.district}&constituency=${response.data.assembly}`,
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
        axios
          .get(`${VOLUNTEER_URL}/admin/whatsapp-public`, {
            headers: {
              "x-access-token": localStorage.getItem("token"),
            },
          })
          .then((linkResponse) => {
            if (linkResponse.status === 200) {
              setWhatsappLink(linkResponse.data);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
  }, []);

  const handleAssemblyChange = (e) => {
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
        `${VOLUNTEER_URL}/admin/state-districtV1?district=${district}&constituency=${constituency}&assembly=${selectedAssembly}&booth=${booth}`,
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

  const handleSubmit = (event) => {
    const token = localStorage.getItem("token");
    let query = ""

    if (assembly) {
      query += `&assembly=${assembly}`
    }
    if (booth) {
      query +=` &booth=${booth}`
    }

    axios.get(`${VOLUNTEER_URL}/admin/whatsapp-public?page=1&perPage=10${query}`, {
      headers: {
        "x-access-token": token,
      }
    }).then((res) => {
      setWhatsappPublic(res.data);
      setTotalPage(res.data.totalPages);
      if (res.data.data.length === 0) {
        setPage(1);
      }
    }).catch((err) => {
      console.log(err);
    });
    setShowWhatsApp(true);
  }
  const handlePublicWhatsapp = () => {
    setShowText(true);
  };

  if (loading) {
    return <Loading />
  }


  return (
    <>
      <MobileContainer>

        <div className='contri-margin'>

          <div className='flex relative contri-top shadow-lg shadow-black-500/40'>
            <MdArrowBackIosNew className='text-black w-[20px] h-[20px]' style={{ paddingLeft: '5px' }} 
                      onClick={() => router.back()}

            />
            <div className='absolute left-[40%] ' >
                            <h1 className='text-base text-center font-bold'>WhatsApp Link</h1>
                        </div>
          </div>


          {/* <div style={{ display: 'flex', flexDirection: 'column' }}>

                        <img src="/images/imagecontri.png" className='img-contri' alt="noImage" style={{ width: '200px', height: '200px', display: 'flex', alignSelf: 'center' }} />

                        <input type="text" placeholder='₹0' style={{ display: 'flex', alignSelf: 'center', textAlign: 'center', width: 'max-content', border: 'none', outline: 'none' }} />

                        <button className='bg-blue-800 button-contri' style={{ display: 'flex', alignSelf: 'center' }}>Pay Now</button>

                    </div> */}

          <div className='bg-whatsapp'>

            <div className='firstDiv-whatsapp'>

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
                  {assemblyList.map((assembly) => (
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
                  {boothList.map((booth) => (
                    <option key={booth} value={booth.number}>
                      {booth.number}
                    </option>
                  ))}
                </select>
              </div>

              <div className='buttonDiv-whatsapp'>
                <button className='button-whatsapp' onClick={handleSubmit}>Submit</button>
              </div>

            </div>


            <div className='firstDiv-whatsapp'>
              {showWhatsApp && (
                <div style={{ display: 'flex', gap: '5px' }}>
                  <div style={{ background: '#E6E6E6', width: '75%', display: 'flex', justifyContent: 'space-between', padding: '5px 20px', borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px' }}>
                    <div>
                      <span style={{ fontSize: '14px' }}>WhatsApp <br /> Group</span>
                    </div>
                    <div >
                      <img src="/images/whatsapp-icon.png" alt="noImage" style={{ width: '48px', height: '48px' }} />
                    </div>
                  </div>


                  <div style={{ background: '#E6E6E6', width: '25%',display:'flex',alignItems:'center',justifyContent:'center' }}>
                    <button onClick={handlePublicWhatsapp}>
                      <img src="/images/whatsappLink-1.png" alt="noImage" />
                    </button>
                  </div>


                </div>
              )}


              <div className="table-list-group my-2">
              {showText && (
                <div className="relative overflow-x-auto rounded-lg">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
                      <tr>
                        <th className="pl-5">link</th>

                      </tr>
                    </thead>
                    <tbody>
                      {whatsappPublic?.map((item) => (
                        <tr className="bg-white  dark:bg-gray-800 text-gray-700 dark:text-white">
                          <td className="px-6 py-4">{item.link}</td>



                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              </div>


            </div>

          </div>
        </div>






      </MobileContainer>
    </>
  )
}

export default page
