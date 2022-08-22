import React from 'react'
import './index.css';

export default function Footer() {
  return (
    <div className='footer bg-dark'>
        <div className='container'>
            <div className='row'>
                <div className='col-12 col-md-9'>
                ©2022 Spoonacular All rights reserved
                </div>
                <div className='mt-3 mt-md-0 col-12 col-md-3 icons-container d-flex justify-content-between flex-wrap'>
                <a className='footer-icon' href='https://www.facebook.com' target='_blank'>
                <i className="bi bi-facebook"></i>
                </a>
                <a className='footer-icon' href='https://www.instagram.com' target='_blank'>
                <i className="bi bi-instagram"></i>
                </a>
                <a className='footer-icon' href='https://www.twitter.com' target='_blank'>
                <i className="bi bi-twitter"></i>
                </a>
                <a className='footer-icon' href='https://www.linkedin.com' target='_blank'>
                <i className="bi bi-linkedin"></i>
                </a>
                <a className='footer-icon' href='https://www.youtube.com' target='_blank'>
                <i className="bi bi-youtube"></i>
                </a>
                </div>
            </div>
        </div>
    </div>
  )
}
