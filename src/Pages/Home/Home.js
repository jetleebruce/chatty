import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../../Components/Header";



export default class HomePage extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className='flex m-6 justify-center'>
          <p style={{ fontSize: `40px`, color: `black` }}>
            Welcome to ChattyApp
          </p>
        </div>
        <div className='flex justify-center flex-col m-6'>
          <span style={{ marginLeft: `43%` }}>Don't have an account?</span>
          <Link to='/signup'>
            <button
              className='m-4 cursor-pointer font-bold rounded-lg self-center text-xl border-solid border-2 border-gray-600'
              style={{ color: `#203152`, width: `180px`, marginLeft: `43%` }}
            >
              <p className='p-2'>Sign Up</p>
            </button>
          </Link>

          <span style={{ marginLeft: `43%` }}>Already have an account?</span>
          <Link to='/login'>
            <button
              className='m-4 cursor-pointer font-bold rounded-lg self-center text-xl border-solid border-2 border-gray-600'
              style={{ color: `#203152`, width: `180px`, marginLeft: `43%` }}
            >
              <p className='p-2'>Login</p>
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
