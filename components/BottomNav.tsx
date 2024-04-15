import React, { useState } from 'react';
import { FaHome, FaUser, FaEnvelope, FaQuestion, FaCog, FaImage } from 'react-icons/fa';
import './styles/BottomNav.css';
import { MdEventNote } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import './nav.css';

function BottomNav({activeItem}: {activeItem: string}) {
  const router = useRouter();



  return (
    <>
      <div className="bottom-nav relative z-50">
        <nav className='md:w-[30%] w-full'>
          <div className="nav-box nav-bg">
            <ul className="nav-container">
              <li className={`nav__item ${activeItem === "home" ? "active" : ""}`}>
                <Link href="/home" className="nav__item-link" >
                  <div className="nav__item-icon">
                    <FaHome size={24} className='text-blue-800' />
                  </div>
                  <span className="nav__item-text nav-text">Home</span>
                </Link>
              </li>

              <li className={`nav__item ${activeItem === "gallery" ? "active" : ""}`}>
                <Link href="/gallery" className="nav__item-link" >
                  <div className="nav__item-icon">
                  <FaImage size={24} className='text-blue-800'/>
                  </div>
                  <span className="nav__item-text nav-text">Gallery</span>
                </Link>
              </li>
              <li className={`nav__item ${activeItem === "events" ? "active" : ""}`}>
                <Link href="/events" className="nav__item-link">
                  <div className="nav__item-icon">
                  <MdEventNote size={24} className='text-blue-800'/>
                  </div>
                  <span className="nav__item-text nav-text">Events</span>
                </Link>
              </li>
              <li className={`nav__item ${activeItem === "profile" ? "active" : ""}`}>
                <Link href="/profile" className="nav__item-link" >
                  <div className="nav__item-icon">
                    <FaUser size={24} className='text-blue-800'/>
                  </div>
                  <span className="nav__item-text nav-text">Profile</span>
                </Link>
              </li>
            
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}

export default BottomNav;
