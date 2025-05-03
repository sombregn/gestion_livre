import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-dark text-white mt-5 p-4 text-center'>
      <div className='container'>
        <p>BiblioApp &copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;