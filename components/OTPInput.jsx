import React, { useState, useRef } from 'react';

const OTPInput = ({ length, onVerify }) => {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const inputRefs = useRef(new Array(length).fill(null).map(() => React.createRef()));

  const handleInputChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input field on input
    if (value !== '' && index < length - 1) {
      inputRefs.current[index + 1].current.focus();
    }

    // If all OTP digits are filled, trigger the verification callback
    if (newOtp.every((digit) => digit !== '')) {
      onVerify(newOtp.join(''));
    }
  };

  const handleKeyDown = (index, event) => {
    // Move to the previous input field on Backspace if the current field is empty
    if (event.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs.current[index - 1].current.focus();
    }
  };

  return (
    <div className="flex space-x-2">
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          value={digit}
          maxLength={1}
          onChange={(e) => handleInputChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          ref={inputRefs.current[index]}
          className="w-10 h-10 text-center border rounded-md focus:outline-none focus:border-blue-500"
        />
      ))}
    </div>
  );
};

export default OTPInput;
