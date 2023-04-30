import React, { useState } from 'react';
import './header.css';

function Headerstop({ sectionName, sectionDescription }) {
    return <>
        <div className='headerstop'>
            <div className='headline'></div>
            <div>
                <div>
                    <h2 style={{ fontWeight: '400' }}>{sectionName}</h2>
                </div>
                <div className='textdiscriptins'>{sectionDescription}</div>
            </div>
        </div>
    </>

}



export default Headerstop;
