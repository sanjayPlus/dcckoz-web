"use client"
import MobileContainer from '@/components/MobileContainer'
import SERVER_URL from '@/config/SERVER_URL';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';
import { FaGift, FaPhone, FaUser } from 'react-icons/fa';
import { laborUnions } from '@/contants/labourUnion'
import { MdArrowBackIosNew, MdOutlineMailOutline } from 'react-icons/md'

function EditProfile() {
    const router = useRouter();

    const [selectedDate, setSelectedDate] = useState<any>(null);
    const [localSelect, setLocalSelect] = useState<any>(null);
    const [data, setData] = useState({
        name: '',
        phone: '',
    });
    const [assembly, setAssembly] = useState('');
    const [local, setLocal] = useState('');
    const [district, setDistrict] = useState('');
    const [districtList, setDistrictList] = useState([]);
    const [constituencyList, setConstituencyList] = useState([]);
    const [localList, setLocalList] = useState([]);
    const [constituency, setConstituency] = useState('');
    const [union, setUnion] = useState('');
    const [assemblyList, setAssemblyList] = useState([]);
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            router.push('/login')
        }
        axios.get(SERVER_URL + '/user/details', {
            headers: {
                'x-access-token': localStorage.getItem("token")
            }
        }).then((response) => {
            setData((prev) => {
                return {
                    ...prev,
                    name: response.data.name,

                    phone: response.data.phoneNumber
                }
            })
            setAssembly(response.data.assembly);
            setConstituency(response.data.constituency);
            setUnion(response.data.union);
            setDistrict(response.data.district);
            setSelectedDate(new Date(response.data.date_of_birth));
            let local1 = ""
            if (response.data.panchayath !== "") {
                setLocal(response.data.panchayath);
                setLocalSelect('panchayath')
                local1 = 'panchayath'
            } else if (response.data.municipality !== "") {
                setLocal(response.data.municipality);
                setLocalSelect('municipality');
                local1 = 'municipality'
            } else if (response.data.corporation !== "") {
                setLocal(response.data.corporation);
                setLocalSelect('corporation');
                local1 = 'corporation'
            }
           
            axios.get(SERVER_URL + '/admin/districtV4?district=' + response.data.district + '&constituency=' + response.data.constituency).then((res) => {
                console.log(res.data)
                setAssemblyList(res.data)
            })
            axios.get(SERVER_URL + '/admin/districtV4?district=' + response.data.district + '&constituency=' + response.data.constituency+ '&assembly=' + response.data.assembly + '&local=' + local1).then((res) => {
                console.log(res.data)
                setLocalList(res.data)
            })
        }).catch((error) => {
            console.log(error)
        })

    }, []);
    useEffect(() => {
        handleDistrictChange({ target: { value: "Thrissur" } })
    },[])
    const handleDateChange = (date: any) => {
        setSelectedDate(date);
    };

    const handleRadioChange = (event: any) => {
        setLocalSelect(event.target.value);
        axios.get(SERVER_URL + '/admin/districtV4?district=' + district + '&constituency=' + constituency + '&assembly=' + assembly + '&local=' + event.target.value).then((response) => {
            setLocalList(response.data)

        })
    };
    useEffect(() => {
        axios.get(SERVER_URL + '/admin/districtV4').then((response) => {
            setDistrictList(response.data)
        });
        if(district === '') return
        axios.get(SERVER_URL + '/admin/districtV4'+'?district=' + district).then((response) => {
            setConstituencyList(response.data)
        });

    }, [])
    const handleDistrictChange = (event: any) => {
        setDistrict(event.target.value);
        axios.get(SERVER_URL + '/admin/districtV4?district=' + event.target.value).then((response) => {
            setConstituencyList(response.data)
            setLocalList([]);
            setLocal('')
            setLocalSelect(null)
        })
    }

    const handleConstituencyChange = (event: any) => {
        setConstituency(event.target.value);
        axios.get(SERVER_URL + '/admin/districtV4?district=' + district + '&constituency=' + event.target.value).then((response) => {
            setAssemblyList(response.data)
            setLocal('')
            setLocalSelect(null)
        })
    }
    const handleSubmit = (e: any) => {
        e.preventDefault();

        //validate data
        if (!data.name || !data.phone || assembly === '' || district === '' || constituency === '' || local === '') {
            return toast.error('Please fill all the fields');
        }
        //email format check 

        let panchayath = localSelect === 'panchayath' ? local : ''
        let municipality = localSelect === 'municipality' ? local : ''
        let corporation = localSelect === 'corporation' ? local : ''
        axios.put(SERVER_URL + '/user/update', {
            name: data.name,
            phoneNumber: data.phone,
            date_of_birth: selectedDate,
            assembly: assembly,
            district: district,
            constituency: constituency,
            panchayath: panchayath,
            municipality: municipality,
            corporation: corporation,
            union: union,
        }, {
            headers: {
                'x-access-token': localStorage.getItem("token")
            }
        }).then((response) => {
            if (response.status === 200) {
                toast.success("Profile updated successfully");
                router.push("/profile");
            }

        }).catch((err) => {
            toast.error(err.response.data.message);

        })

    }
    return (
        <>
            <MobileContainer>
                <div className="edit-profile w-full min-h-screen flex flex-col justify-start items-center relative " style={{ backgroundImage: "url('/images/backimg.jpeg')", backgroundSize: "cover" }}>
                    <div className="SocialMedia-header w-full bg-white/100 mb-7 box-shodow-lg box-shagow-black flex flex-col  ">
                        <MdArrowBackIosNew className='text-lg cursor-pointer absolute top-6 left-5 text-black z-50' onClick={() => router.back()} />
                        <h1 className=' text-xl text-center font-bold mt-5 drop-shadow-lg text-black mb-4'>Edit Profile</h1>
                    </div>
                    <div className='flex-1 w-[90%] justify-center items-center bg-white rounded-3xl m-5 '>
                        <div className="input-container pt-10 pb-5 flex flex-col w-full justify-center items-center ">
                            
                            {/*  */}
                            <div style={{ width: "80%", height: "50px" }} className="my-3 rounded-lg flex justify-start items-center border border-black pl-5">
                                <FaUser size={24} color='black' />
                                <input type="text" placeholder="Name" onChange={(e) => setData({ ...data, name: e.target.value })} value={data.name} className='bg-transparent border-none outline-none text-black pl-2 w-full' />
                            </div>
                            {/*  */}
                            <div style={{ width: "80%", height: "50px" }} className="my-3 rounded-lg flex justify-start items-center border border-black pl-5">
                                <FaPhone size={24} color='black' />
                                <input type="number" placeholder="Phone Number" onChange={(e) => setData({ ...data, phone: e.target.value })} value={data.phone} className='bg-transparent border-none outline-none text-black pl-2 w-full' />
                            </div>
                            <div style={{ width: '80%', height: '50px' }} className="my-3 rounded-lg flex justify-start items-center border border-black pl-5">
                                <FaGift size={24} color="black" className="mr-2" />
                                <ReactDatePicker
                                    selected={selectedDate}
                                    onChange={handleDateChange}
                                    placeholderText="Birthday"
                                    dateFormat="MM/dd/yyyy"

                                    className="text-black bg-transparent border-none outline-none w-full"
                                />
                            </div>

                            {/* <select id="district" onChange={handleDistrictChange} style={{ width: '80%', height: '50px' }} value={district} className="my-3 rounded-lg flex justify-start items-center border border-black pl-5 bg-white text-black">
                                <option selected value="">District</option>
                                {districtList?.map((district) => (
                                    <option key={district} value={district}>{district}</option>
                                ))}
                            </select> */}
                            {
                                constituencyList.length > 0 && (
                                    <>
                                        <select id="constituency" onChange={handleConstituencyChange} style={{ width: '80%', height: '50px' }} value={constituency} className="my-3 rounded-lg flex justify-start items-center border border-black pl-5 bg-white text-black">
                                            <option selected value="">Loka Sabha</option>
                                            {constituencyList?.map((constituency: any) => (
                                                <option key={constituency} value={constituency}>{constituency}</option>
                                            ))}
                                        </select>
                                    </>
                                )
                            }
                            {
                                assemblyList.length > 0 && (
                                    <>
                                        <select id="assembly" onChange={(e) => setAssembly(e.target.value)} value={assembly} style={{ width: '80%', height: '50px' }} className="my-3 rounded-lg flex justify-start items-center border border-black pl-5 bg-white text-black">
                                            <option selected value="">Legislative Assembly</option>
                                            {
                                                assemblyList?.map((assembly: any) => (
                                                    <option key={assembly} value={assembly}>{assembly}</option>
                                                ))
                                            }
                                        </select>
                                    </>
                                )
                            }

                            {
                                assembly && (
                                    <>
                                        <div className='w-full mx-5 px-5'>
                                            <label htmlFor="panchayath" className='flex pl-10 text-black'>
                                                <input
                                                    type="radio"
                                                    id="panchayath"
                                                    value="panchayath"
                                                    checked={localSelect === 'panchayath'}
                                                    onChange={handleRadioChange}
                                                    className="mr-2"
                                                />
                                                <p className='text-black'>Panchayath</p>
                                            </label>

                                            <label htmlFor="municipality" className='flex pl-10 text-black'>
                                                <input
                                                    type="radio"
                                                    id="municipality"
                                                    value="municipality"
                                                    checked={localSelect === 'municipality'}
                                                    onChange={handleRadioChange}
                                                    className="mr-2"
                                                />
                                                <p className='text-black'>Municipality</p>
                                            </label>

                                            <label htmlFor="corporation" className='flex pl-10 text-black'>
                                                <input
                                                    type="radio"
                                                    id="corporation"
                                                    value="corporation"
                                                    checked={localSelect === 'corporation'}
                                                    onChange={handleRadioChange}
                                                    className="mr-2"
                                                />
                                                <p className='text-black'>Corporation</p>
                                            </label>
                                        </div>
                                        {
                                            localList.length > 0 && (
                                                <>
                                                    <select id="local" onChange={(e) => setLocal(e.target.value)} value={local} style={{ width: '80%', height: '50px' }} className="my-3 rounded-lg flex justify-start items-center border border-black pl-5 bg-white text-black">
                                                        <option selected>{localSelect}</option>
                                                        {
                                                            localList?.map((loc: any, index: any) => (
                                                                <option key={index} value={loc}>{loc}</option>
                                                            ))
                                                        }

                                                    </select>
                                                </>
                                            )
                                        }



                                    </>
                                )
                            }

                        </div>
                        <div className='w-full flex justify-center items-center '>

                            <button onClick={handleSubmit} className='bg-indigo-900 text-white w-80 text-xl m-7  py-2 rounded-xl font-semibold '>Update</button>
                        </div>

                    </div>
                </div>
            </MobileContainer>
        </>
    )
}

export default EditProfile