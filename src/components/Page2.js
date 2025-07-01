import React from 'react';
import './Page2.css';

const Page2 = ({ activeButton }) => {
  return (
    <div className="page-2">
      <div className="page-header">
        <h2>Welcome to IMKON</h2>
        <p>Your personal study abroad assistant</p>
      </div>
      
      <div className="page-content">
        <div className="content-section">
          <h3>Welcome</h3>
          <p>
            Hello World! This is your gateway to studying abroad from Uzbekistan.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page2; 