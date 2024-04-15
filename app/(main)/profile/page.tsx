"use client"
import BottomNav from '@/components/BottomNav'
import MobileContainer from '@/components/MobileContainer'
import SERVER_URL from '@/config/SERVER_URL'
import axios from 'axios'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaAddressCard } from 'react-icons/fa'
import { MdCancel, MdDelete, MdEdit } from 'react-icons/md'
import moment from 'moment'
import { log } from 'console'
function Profile() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>([]);
  const [model, setModel] = useState(false);
  const [state, setState] = useState<boolean>(false);
  const [profileModel, setProfileModel] = useState(false);
  const [profileImage, setProfileImage] = useState<any>(null);
  const [deleteModel, setDeleteModel] = useState(false)
  const [idcard, setIdcard] = useState<any>(null);
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/login')
    }
    axios.get(SERVER_URL + '/user/details', {
      headers: {
        'x-access-token': localStorage.getItem("token")
      }
    }).then((response) => {
if(response.data==null){
  localStorage.removeItem('token');
  router.push('/login');
}
      setProfile(response.data)
    }).catch((error) => {
      console.log(error)
      localStorage.removeItem('token');
      router.push('/login');
    })

  }, [state]);
  const handleFileChange = (e: any) => {

    setIdcard(e.target.files[0])
  }
  const handleIdCard = () => {
    const formData = new FormData();
    formData.append('profileImage', idcard);

    axios.post(SERVER_URL + '/user/create-id-card', formData, {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
      responseType: 'arraybuffer', // Set the response type to 'arraybuffer' for binary data
    })
      .then((response) => {
        if (response.status === 200) {
          // Create a Blob from the binary data
          const blob = new Blob([response.data], { type: 'image/*' });

          // Create a download link
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = 'idcard.png';

          // Append the link to the document and trigger a click event to start the download
          document.body.appendChild(link);
          link.click();

          // Remove the link from the document
          document.body.removeChild(link);

          setModel(false);
        }
      })
      .catch((error) => {
        toast.error('Something went wrong');
      });
  };
  const handleProfileImageSubmit = () => {
    if (!profileImage) {
      toast.error("Please select an image");
    }
    const formData = new FormData();
    formData.append('profileImage', profileImage);
    axios.post(SERVER_URL + '/user/profile-image', formData, {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    }).then((response) => {
      console.log(response);

      if (response.status === 200) {
        setProfileModel(false);
        setState(!state);
        toast.success('Profile image uploaded successfully');
      }
    })
  }
  const handleDelete = () => {
    axios.delete(SERVER_URL + '/user/delete', {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      }
    }).then((response) => {
      if (response.status === 200) {
        localStorage.removeItem('token');
        router.push('/login');
      }
    })
  }
  return (
    <>
      <MobileContainer>

        <div className="profile-container w-full min-h-screen flex flex-col justify-center items-center relative" style={{ backgroundImage: "url('/images/backimg.jpeg')", backgroundSize: "cover" }}>

          <div className="profile-card w-[90%] flex flex-col  items-center bg-white rounded-lg shadow-lg mt-9 mb-24 p-3 m-1" >
            <div className="flex flex-col justify-center items-center relative">
              <MdEdit className='text-2xl cursor-pointer absolute top-16 right-11 bg-white rounded-full shadow-md w-8 h-8 p-1' onClick={() => setProfileModel(true)} />
              <img className="w-24 h-24 object-cover rounded-full" src={profile?.profileImage ? profile.profileImage : '/images/profile.jpg'} />
              <h3 className='text-lg font-semibold text-center mt-2'>{profile?.name}</h3>
              <p className='text-sm text-center'>{profile?.email}</p>
            </div>
            <div className="max-w-2xl mx-auto justify-center items-start ">
              <table className="table-fixed border-separate border-spacing-2 p-3 ">
                <tbody>
                  <tr className='tr-profile'>
                    <td className='text-sm '>Phone</td>
                    <td className='text-sm'>: {profile.phoneNumber}</td>
                  </tr >
                  <tr className='tr-profile'>
                    <td className='text-sm '>DOB</td>
                    <td className='text-sm'>: {moment(profile.date_of_birth).format("DD-MM-YYYY")}</td>
                  </tr>
                  <tr className='tr-profile'>
                    <td className='text-sm '>Lok Sabha</td>
                    <td className='text-sm'>: {profile.constituency}</td>
                  </tr>
                  <tr className='tr-profile'>
                    <td className='text-sm '>District</td>
                    <td className='text-sm'>: {profile.district}</td>
                  </tr>
                  <tr className='tr-profile'>
                    <td className='text-sm '>Legislative Assembly</td>
                    <td className='text-sm'>: {profile.assembly}</td>
                  </tr>
                  <tr className='tr-profile'>
                    <td className='text-sm '>panchayath</td>
                    <td className='text-sm'>: {profile.panchayath}</td>
                  </tr>
                </tbody>
              </table>
              <div className='w-full flex gap-2 justify-center items-center'>
                <button onClick={() => setModel(true)} className="flex justify-around gap-2 items-center bg-amber-500 text-white py-2 px-4 mt-4 rounded-md hover:bg-amber-500 focus:outline-none focus:shadow-outline-blue active:bg-amber-500">
                  <FaAddressCard size={19} /><p className='text-sm text-nowrap m-0'>ID Card</p>
                </button>
                <button onClick={() => router.push('/edit-profile')} className="flex justify-around gap-2 items-center bg-amber-500 text-white py-2 px-4  pl-5  pr-5 mt-4 rounded-md hover:bg-amber-500 focus:outline-none focus:shadow-outline-blue active:bg-amber-500">
                  <MdEdit size={19} /> <p className='text-sm text-nowrap m-0' >Edit</p>
                </button>
              </div>
              <div className='w-full flex justify-center items-center '><button onClick={() => setDeleteModel(true)} className="flex  justify-around gap-2  items-center bg-red-500 text-white py-2 px-4 mt-4 rounded-md">
                <MdDelete size={21} /><p className='text-sm text-nowrap m-0'>Delete Account</p>
              </button></div>
            </div>
          </div>
        </div>
        {
          model && (
            <div className='w-80 h-56 bg-white p-2 shadow-lg absolute top-60 ml-8 rounded-lg '>
              <h2 className='text-lg font-semibold text-center'>Add Image To ID Card</h2>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="small_size">Small file input</label>
              <input onChange={handleFileChange} className="block w-full mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="small_size" type="file" />
              <div className='flex justify-around'>
                <button onClick={() => handleIdCard()} className="bg-amber-500 text-white p-2 rounded-md hover:bg-amber-500 focus:outline-none focus:shadow-outline-blue active:bg-amber-500">Upload</button>
                <button onClick={() => setModel(false)} className="bg-amber-500 text-white p-2  rounded-md hover:bg-amber-500 focus:outline-none focus:shadow-outline-blue active:bg-amber-500">Cancel</button>
              </div>
            </div>

          )
        }
        {
          profileModel && (
            <div className='w-80 h-56 bg-white p-2 shadow-lg absolute top-60 ml-8 rounded-lg '>
              <h2 className='text-lg font-semibold text-center'>Add Profile Image</h2>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="small_size">Small file input</label>
              <input onChange={(e: any) => { setProfileImage(e.target.files[0]) }} className="block w-full mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="small_size" type="file" />
              <div className='flex justify-around'>
                <button onClick={handleProfileImageSubmit} className="bg-amber-500 text-white p-2 rounded-md hover:bg-amber-500 focus:outline-none focus:shadow-outline-blue active:bg-amber-500">Upload</button>
                <button onClick={() => setProfileModel(false)} className="bg-amber-500 text-white p-2  rounded-md hover:bg-amber-500 focus:outline-none focus:shadow-outline-blue active:bg-amber-500">Cancel</button>
              </div>
            </div>
          )
        }
        {
          deleteModel && (
            <div className='w-80 h-56 bg-white p-2 shadow-lg absolute top-60 ml-8 rounded-lg '>
              <h2 className='text-lg font-semibold text-center'>Delete Account</h2>
              <div className='w-full flex justify-center items-center '>
                <button onClick={() => handleDelete()} className="flex  justify-around gap-2  items-center bg-red-500 text-white py-2 px-4 mt-4 rounded-md">
                  <MdDelete size={21} /><p className='text-sm text-nowrap m-0'>Delete</p>
                </button>
              </div>
              <div className='w-full flex justify-center items-center '>
                <button onClick={() => setDeleteModel(false)} className="flex  justify-around gap-2  items-center bg-red-500 text-white py-2 px-4 mt-4 rounded-md">
                  <MdCancel size={21} /><p className='text-sm text-nowrap m-0'>Cancel</p>
                </button>
              </div>
            </div>

          )

        }
        <BottomNav activeItem='profile' />
      </MobileContainer>
    </>
  )
}

export default Profile