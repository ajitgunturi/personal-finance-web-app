import React from 'react';
import './Footer.css'; // Assuming you will create a Footer.css file for styling

const Footer = () => {
  return (
    <footer className="footer-container" >
      <div className="footer-content">
        <p>Developed by Ajit Kumar Gunturi</p>
        <p>Contact us: <a href="mailto:ajit.gunturi@gmail.com">ajit.gunturi@gmail.com</a></p>
        <p>API Docs: <a href="http://localhost:8080/swagger-ui/index.html" target="_blank" rel="noopener noreferrer">Swagger UI</a></p>
      </div>
    </footer>
  );
};

export default Footer;
