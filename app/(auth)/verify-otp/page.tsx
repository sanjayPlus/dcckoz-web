"use client";
import React, { useEffect, useState } from "react";

import axios from "axios";
import toast from "react-hot-toast";
import MobileContainer from "@/components/MobileContainer";
import OTPInput from "@/components/OTPInput";
import SERVER_URL from "@/config/SERVER_URL";
import { useRouter } from "next/navigation";
import { MdArrowBackIosNew } from "react-icons/md";

function VerifyOTP() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(0);
  const [sendingOTP, setSendingOTP] = useState(false); // State to track sending OTP status
  const [verifyingOTP, setVerifyingOTP] = useState(false); // State to track verifying OTP status
  const [otpState, setOtpState] = useState(false);
  useEffect(() => {
    // Implement your OTP verification logic here
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(SERVER_URL + "/user/details", {
          headers: {
            "x-access-token": token,
          },
        })
        .then(async (res) => {
          if (!res.data) {
            router.push("/login");
            localStorage.removeItem("token");
          }
          if (res.data.verified) {
            router.push("/home");
          } else {
            setEmail(res.data.email);
            // Send OTP on component load
            handleOTPRequest();
          }
        })
        .catch(() => {
          router.push("/login");
          localStorage.removeItem("token");
        });
    } else {
      router.push("/login");
    }
  }, []); // The empty dependency array ensures this effect runs only once on component mount

  // Function to handle OTP request
  const handleOTPRequest = () => {
    if (!email || sendingOTP) return;
    setSendingOTP(true);
    axios
      .post(SERVER_URL + "/user/sendOTP", {
        email: email,
      })
      .then(() => {
        toast.success("OTP sent successfully");
        setOtpState(true);
      })
      .catch(() => {
        toast.error("Error sending OTP");
      })
      .finally(() => {
        setSendingOTP(false);
      });
  };

  // Function to handle OTP verification
  const handleOTPVerification = (otp: any) => {
    // Implement your OTP verification logic here
    setOtp(Number(otp));
  };

  const handleVerifySubmit = () => {
    if (!otp || verifyingOTP) return;
    setVerifyingOTP(true);
    axios
      .post(SERVER_URL + "/user/verifyOTP", {
        email: email,
        otp: Number(otp),
      })
      .then((response) => {
        if (response.status === 200) {
          router.replace("/home");
        }
      })
      .catch(() => {
        toast.error("Invalid OTP");
      })
      .finally(() => {
        setVerifyingOTP(false);
      });
  };

  return (
    <MobileContainer>
      <div
        className="w-full h-full flex flex-col relative"
        style={{
          backgroundImage: "url('/images/bg_main.jpg')",
          backgroundSize: "cover",
        }}
      >
        <MdArrowBackIosNew
          className="text-lg cursor-pointer absolute top-6 left-5 text-black z-50"
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/login");
          }}
        />
        <div className="w-full h-20 flex justify-center items-center mt-28">
          <img src="/images/imagecontri.png" alt="" className="w-24" />
        </div>
        <div className="flex-1 justify-center items-center bg-neutral-900 rounded-t-3xl mt-20">
          <div className="input-container pt-10 pb-5 flex flex-col w-full justify-center items-center">
            <OTPInput length={6} onVerify={handleOTPVerification} />
            <p
              className="text-white/20 mt-4 cursor-pointer"
              onClick={handleOTPRequest}
            >
              Resend
            </p>
          </div>
          <div className="w-full flex justify-center items-center ">
            {otpState ? (
              <>
                <button
                  className={`bg-white text-blue-900 w-80 text-xl py-2 rounded-xl font-semibold ${
                    verifyingOTP ? "opacity-50 pointer-events-none" : ""
                  }`}
                  onClick={handleVerifySubmit}
                  disabled={verifyingOTP}
                >
                  {verifyingOTP ? "Verifying..." : "Verify"}
                </button>
              </>
            ) : (
              <>
                <button
                  className={`bg-white text-blue-900 w-80 text-xl py-2 rounded-xl font-semibold ${
                    sendingOTP ? "opacity-50 pointer-events-none" : ""
                  }`}
                  onClick={handleOTPRequest}
                  disabled={sendingOTP}
                >
                  {sendingOTP ? "Sending..." : "Send"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </MobileContainer>
  );
}

export default VerifyOTP;
