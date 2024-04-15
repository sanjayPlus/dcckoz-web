"use client"
import MobileContainer from "@/components/MobileContainer";
import SERVER_URL from "@/config/SERVER_URL";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      const token = localStorage.getItem("token");
      if (token) {
        axios
          .get(SERVER_URL + "/user/protected", {
            headers: {
              "x-access-token": token,
            },
          })
          .then((response) => {
            if (response.status === 200) {
              router.push("/home");
            }
          })
          .catch((error) => {
            localStorage.removeItem("token");
            router.push("/login");
          });
      } else {
        router.push("/login");
      }
      setLoading(false);
    }, 2000);

  }, []);

  return (
    <>
      <MobileContainer>
        <div className="relative items-start justify-center">
          <div className="z-20">
            <img
              src="/Kozhikode.jpg"
              className="w-screen h-screen object-cover"
              alt=""
            />
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center p-4">
              <img
                src="./images/splash-screen2.png"
                className="w-60"
                alt=""
              />
            </div>
          </div>
        </div>

      </MobileContainer>
    </>
  );
}
