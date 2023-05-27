import React, { useEffect, useState } from 'react';
import './login.css';
import SendOTP from '../../services/SendOtp';
import OTPTimer from './otptimer';
import { ColorRing } from 'react-loader-spinner';
import { styles } from '../../Pages/LoginPage';

function LoginPageComponent({ questions, onHandleOTPCheck, otpSettings }) {
    const questionsArray = Object.keys(questions);
    const [formData, setFormData] = useState({});
    const [OTP, setOTP] = useState(0);
    const [otpValue, setOtpValue] = useState();
    const [showTimer, setShowTimer] = useState(true);
    const [sheetId, setSheetId] = useState("");
    const [passingPercentage, setPassingPercentage] = useState();
    const [isTimeout, setIsTimeout] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
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
        setShowLoader(true);
        const otp = generateOTP();
        const responsePromise = SendOTP(otp, formData, otpSettings);
        responsePromise
            .then(response => {
                setOTP(otp);
                setSheetId(response.data.id);
                setPassingPercentage(response.data.percent);
                setShowLoader(false);
            })
            .catch(error => {
                setShowLoader(true);
                console.error(error);
            });
    }

    const otpHandle = (e) => {
        setOtpValue(e.target.value);
    }

    const verifyOTP = () => {
        if (otpValue == OTP) {
            onHandleOTPCheck(sheetId, passingPercentage);
        } else {
            console.log('Otp not matched');
        }
    }

    const handleTimeout = () => {
        setShowTimer(false);
        setIsTimeout(true);
    };

    const handleResendOTP = () => {
        const otp = generateOTP();
        const responsePromise = SendOTP(otp, formData, otpSettings);
        responsePromise
            .then(response => {
                setOTP(otp);
                setSheetId(response.data.id);
                setShowTimer(true);
                setIsTimeout(false);
            })
            .catch(error => {
                console.error(error);
            });
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
                                    }
                                    else if (typeof questions[question] == 'object') {
                                        return <div className='questionHeader row align-items-center' key={index}>
                                            <div className="col-md-6">
                                                <label htmlFor="dropdown">{question}</label>
                                            </div>
                                            <div className="col-md-6">
                                                <select className='form-control' onChange={(e) => { handleData(e, index, question); }} >
                                                    <option>Select Option</option>
                                                    {
                                                        questions[question][1].split(",").map((option, index) => {
                                                            if (option !== '') {
                                                                return <option key={index} value={option}>{option}</option>
                                                            }
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    }
                                    else {
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
                                    <button className='success' onClick={handleClick} disabled={showLoader}
                                    >Send Otp</button>
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

                            <div className='row verifyOtp'>
                                <div className='col-md-6' >
                                    <input type='number' className='form-control' placeholder='Verify OTP' onChange={otpHandle} />
                                </div>
                                <div className='col-md-6' >
                                    <button onClick={verifyOTP} className='form-control'>OTP Verify</button>
                                </div>
                                <div>
                                    {showTimer && <OTPTimer time={300} onTimeout={handleTimeout} />}
                                    {isTimeout && (
                                        <div className="row">
                                            <div className="col-md-12">
                                                <button
                                                    onClick={handleResendOTP}
                                                    className="btn btn-primary"
                                                >
                                                    Resend OTP
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                }
            </div>
        </div>
        {showLoader && <div style={styles.loaderContainer}>
            <ColorRing color="#00BFFF" height={80} width={80} />
        </div>}
    </>

}


export default LoginPageComponent;
