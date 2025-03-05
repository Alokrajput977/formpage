// src/component/footer.jsx
import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} Sunic Copyright © All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
