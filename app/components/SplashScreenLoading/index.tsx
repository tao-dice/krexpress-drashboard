import React from 'react';
import Wrapper from './Wrapper';
import logo from '../logo-nude.png';

const SplashLoadingScreen = () => {
  return (
    <Wrapper>
      <img src={logo} alt="logo" />
      <div className="content">
        กำลังโหลดข้อมูล....
      </div>
    </Wrapper>
  );
};
export default SplashLoadingScreen;
