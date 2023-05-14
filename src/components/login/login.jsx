import React, { useEffect, useState } from 'react';
import './login.css';
import SendOTP from '../../services/SendOtp';
import OTPTimer from './otptimer';

function LoginPageComponent({ questions, onHandleOTPCheck, otpSettings }) {
    const questionsArray = Object.keys(questions);
    const [formData, setFormData] = useState({});
    const [OTP, setOTP] = useState(0);
    const [otpValue, setOtpValue] = useState();
    const [showTimer, setShowTimer] = useState(true);
    const [sheetId, setSheetId] = useState("");
    const generateOTP = () => {
        let otp = "";
        for (let i = 0; i < 6; i++) {
            otp += Math.floor(Math.random() * 10);
        }
        return otp;
    }

    const handleData = (event, index, test) => {
        const value = event.target.value;
        setFormData({ ...formData, [test]: value });
    }

    const handleClick = () => {
        const otp = generateOTP();
        const responsePromise = SendOTP(otp, formData, otpSettings);
        responsePromise
            .then(response => {
                setOTP(otp);
                setSheetId(response.data.id);
                console.log(response.data.id);
            })
            .catch(error => {
                console.error(error);
            });
    }

    const otpHandle = (e) => {
        setOtpValue(e.target.value);
    }

    const verifyOTP = () => {
        if (otpValue == OTP) {
            onHandleOTPCheck(sheetId);
        } else {
            console.log('Otp not matched');
        }
    }

    const handleTimeout = () => {
        setShowTimer(false);
    };

    return <>
        <div className='container'>
            <div className='row mainRow'>
                {
                    OTP === 0 ?
                        <div className='col-md-5 loginCol'>
                            <div className='questionHeader row  align-items-center'>
                                <div className="col-md-12 mainHead">
                                    <h3> Login Form</h3>
                                </div>
                            </div>
                            {
                                questionsArray.map((question, index) => {
                                    if (question == 'Select Test') {
                                        return <div className='questionHeader row align-items-center' key={index}>
                                            <div className="col-md-6">
                                                <label htmlFor="dropdown">{question}</label>
                                            </div>
                                            <div className="col-md-6">
                                                <select className='form-control' onChange={(e) => { handleData(e, index, 'Select Test'); }} >
                                                    <option>Select Option</option>
                                                    {
                                                        Object.keys(questions[question]).map((option, index) => {
                                                            if (option !== '') {
                                                                return <option key={index} value={`${questions[question][option]}|${option}`}>{option}</option>
                                                            }
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    } else {
                                        return <div className='questionHeader row  align-items-center' key={index}>
                                            <div className="col-md-6">
                                                <label htmlFor="name" className='col-form-label'>{question}</label>
                                            </div>
                                            <div className="col-md-6">
                                                <input type={questions[question]} className='form-control' onChange={(e) => { handleData(e, index, question) }} />
                                            </div>
                                        </div>
                                    }
                                })
                            }
                            <div className='questionHeader row align-items-center '>
                                <div className="col-md-12 btnRow">
                                    <button className='success' onClick={handleClick}>Send Otp</button>
                                </div>
                            </div>
                        </div>
                        :
                        <div className='col-md-5 loginCol'>
                            <div className='questionHeader row align-items-center'>
                                <div className="col-md-12 mainHead">
                                    <h3>Login Form</h3>
                                </div>
                            </div>
                            <div>
                                <input type='number' placeholder='Verify OTP' onChange={otpHandle} />
                                <button onClick={verifyOTP}>OTP Verify</button>
                                <div>
                                    {showTimer && <OTPTimer time={300} onTimeout={handleTimeout} />}
                                </div>
                            </div>
                        </div>
                }
            </div>
        </div>
    </>

}

export default LoginPageComponent;
