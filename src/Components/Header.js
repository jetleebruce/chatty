import React from "react";
import {Link} from 'react-router-dom'
import "./Header.css";

function Header() {
  return (
    <header className='flex m-6'>
      <div className='py-6'>
        <h2>Chatty App</h2>
      </div>
      <div className='w-full flex py-6 mr-6 justify-end'>
        <Link to='/signup'>
          <span className='mr-12'>SignUp</span>
        </Link>
        <Link to='/login'>
          <span className=''>Login</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
