import React from 'react'
import './footer.css'
import logo from './amazon_PNG25.png'

const Footer = () => {
  return (
    <footer>
        <div className='footer_container'>
            <div className='footr_details_one'>
                <h3>Get to know us</h3>
                <p>About us</p>
                <p>Careers</p>
                <p>Press Releases</p>
                <p>Gift a smile</p>
            </div>
            <div className='footr_details_one'>
                <h3>Facebook</h3>
                <p>Twitter</p>
                <p>Instagram</p>
                
                
            </div>
            <div className='footr_details_one forres'>
                <h3>Make money with us</h3>
                <p>About us</p>
                <p>Careers</p>
                <p>Press Releases</p>
                <p>Gift a smile</p>
            </div>
            <div className='footr_details_one forres'>
                <h3>Let us help you</h3>
                <p>About us</p>
                <p>Careers</p>
                <p>Press Releases</p>
                <p>Gift a smile</p>
            </div>
        </div>
        <div className='lastdetails'>
            <img src={logo} alt='logo' />
            <p>Conditions of Use & Sale &nbsp;&nbsp;&nbsp;      Privacy Notice &nbsp;&nbsp;&nbsp;       Interest-Based Ads &nbsp;&nbsp;&nbsp;      © 1996-2022, Amazon.com, Inc. or its affiliates</p>
        </div>
    </footer>
  )
}

export default Footer