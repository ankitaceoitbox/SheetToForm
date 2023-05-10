import React from 'react';
import './login.css';
import SendOTP from '../../services/SendOtp';
function LoginPAge() {

    const generateOTP = () => {
        let otp = "";
        for (let i = 0; i < 6; i++) {
            otp += Math.floor(Math.random() * 10);
        }
        return otp;
    }

    return <>
        <div className='container'>
            <div className='row mainRow'>
                <div className='col-md-5 loginCol'>
                    <div className='questionHeader row  align-items-center'>
                        <div className="col-md-12 mainHead">
                            <h3> Login Form</h3>
                        </div>
                    </div>
                    <div className='questionHeader row  align-items-center'>
                        <div className="col-md-6">
                            <label htmlFor="name" className='col-form-label'> Name</label>
                        </div>
                        <div className="col-md-6">
                            <input type='text' id='name' className='form-control' />
                        </div>
                    </div>
                    <div className='questionHeader  row  align-items-center'>
                        <div className="col-md-6">
                            <label htmlFor="email"> Email</label>
                        </div>
                        <div className="col-md-6">
                            <input type='email' id='email' className='form-control' />
                        </div>
                    </div>
                    <div className='questionHeader  row  align-items-center'>
                        <div className="col-md-6">
                            <label htmlFor="Position"> Position Applied For</label>
                        </div>
                        <div className="col-md-6">
                            <input type='text' id='Position' className='form-control' />
                        </div>
                    </div>
                    <div className='questionHeader  row align-items-center'>
                        <div className="col-md-6">
                            <label htmlFor="dropdown">  Select Test dropdown</label>
                        </div>
                        <div className="col-md-6">
                            <select id='dropdown' className='form-control'>
                                <option>DME Text</option>
                            </select>
                        </div>
                    </div>
                    <div className='questionHeader row align-items-center '>
                        <div className="col-md-12 btnRow">
                            <button className='success' onClick={() => {
                                SendOTP(generateOTP());
                            }}>Send Otp</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>

}

export default LoginPAge;
