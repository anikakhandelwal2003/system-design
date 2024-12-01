import React, { useState } from 'react';

function LoginOtp() {
  const [otp, setOtp] = useState({
    1: '',
    2: '',
    3: '',
    4: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(otp, 'otp');
    
    const otpValue = Object.values(otp).join('');
    console.log(otpValue);

    if (otpValue === '1234') {
      console.log('OTP is correct!');
    } else {
      console.log('OTP is incorrect!');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          min={0}
          max={9}
          onChange={(e) => setOtp({ ...otp, 1: e.target.value })}
        />
        <input
          type="number"
          min={0}
          max={9}
          onChange={(e) => setOtp({ ...otp, 2: e.target.value })}
        />
        <input
          type="number"
          min={0}
          max={9}
          onChange={(e) => setOtp({ ...otp, 3: e.target.value })}
        />
        <input
          type="number"
          min={0}
          max={9}
          onChange={(e) => setOtp({ ...otp, 4: e.target.value })}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default LoginOtp;
