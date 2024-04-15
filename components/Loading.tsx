import React from "react";
import MobileContainer from "./MobileContainer";
import "./styles/Loading.css";

function Loading() {
  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="three-body">
          <div className="three-body__dot"></div>
          <div className="three-body__dot"></div>
          <div className="three-body__dot"></div>
        </div>
      </div>
    </>
  );
}

export default Loading;
