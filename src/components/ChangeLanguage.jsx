import React, { useEffect, useRef, useState } from 'react'

import usFlag from '@assets/images/us.png';
import faFlag from '@assets/images/fa.png';


import { useAppContext } from '../contexts/app/AppProvider';
import { changeLanguage } from 'i18next';


function ChangeLanguage() {

    const [show, setShow] = useState(false);

        // تغییر زبان با کانتکست

        const {language, changeLanguage} = useAppContext();

        // ساید افکت برای تغییر زبان دراپ داوون بسته شود
    useEffect(() => {
        setShow(false)
    }, [language])

    //برای اینکه هر جایی غیر از دراپ دام کیلیک کردیم آن بسته شود باید از یوزرف و یوزافکت استفاده کنیم


    const ref = useRef();

    useEffect(() => {

        // یعنی اگر شو درست بود و رف کارنت درست بود و کیلیک در محل دراپ داون که با کانتینس و ای تارگت مشخص کردیم نبود ست شو فالز شود یعنی دراپ دامن بسته شود

        const handleClickOutside = (event) => {
            if ( ref.current && !ref.current.contains(event.target)) {
                setShow(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    },[show])





  return (
    <>  
      <div className='dropdown'>
        <a className='nav-flag dropdown-toggle' onClick={() => setShow(!show)}>
            <img src={language === 'fa' ? faFlag : usFlag} alt='English'/>
        </a>
        <div ref={ref} className={`dropdown-menu dropdown-menu-end ${show ? 'show' : null}`}>
            <a className='dropdown-item fw-bolder d-flex align-items-center gap-2' style={{textAlign: language ===  'fa' ? 'right' : 'left'}} onClick={() => changeLanguage('fa')}>
                <img src={faFlag} width='20' className='ms-2'/>
                <span className='align-middle'>فارسی</span>
            </a>
            <a className='dropdown-item fw-bolder d-flex align-items-center gap-2' style={{textAlign: language ===  'fa' ? 'right' : 'left'}} onClick={() => changeLanguage('en')}>
                <img src={usFlag} width='20' className='ms-2'/>
                <span className='align-middle'>English</span>
            </a>
        </div>
      </div>

    </>
  )
}

export default ChangeLanguage
