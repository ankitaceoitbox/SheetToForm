import React, { useState } from 'react';
import './login.css';
import SendOTP from '../../services/SendOtp';
import OTPTimer from './otptimer';
import { ColorRing } from 'react-loader-spinner';
import { styles } from '../../Pages/LoginPage';

function LoginPageComponent({ questions, onHandleOTPCheck, otpSettings, declaration }) {
    const questionsArray = Object.keys(questions);
    const [formData, setFormData] = useState({});
    const [OTP, setOTP] = useState(0);
    const [otpValue, setOtpValue] = useState();
    const [showTimer, setShowTimer] = useState(true);
    const [sheetId, setSheetId] = useState("");
    const [passingPercentage, setPassingPercentage] = useState();
    const [isTimeout, setIsTimeout] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [declarationVal, setDeclarationVal] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const generateOTP = () => {
        let otp = "";
        for (let i = 0; i < 6; i++) {
            otp += Math.floor(Math.random() * 10);
        }
        return otp;
    }

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

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
                setDeclarationVal(false);
                setSheetId(response.data.id);
                setPassingPercentage(response.data.percent);
                setShowLoader(false);
            })
            .catch(error => {
                setShowLoader(true);
                console.error(error);
            });
    }

    const openDeclaration = () => {
        setDeclarationVal(true);
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
        {
            showLoader === false &&
            <div className='container'>
                <div className='row mainRow'>
                    {
                        OTP === 0 && declarationVal === false ?
                            <div className='col-md-5 loginCol'>
                                <div className='questionHeader row  align-items-center'>
                                    <div className="col-md-12 mainHead">
                                        <h3>Login Form</h3>
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
                                        <button className='success' onClick={openDeclaration} disabled={showLoader}
                                        >Next</button>
                                    </div>
                                </div>
                            </div>
                            :
                            declarationVal === false ?
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
                                                    <div className="col-md-12 resend">
                                                        <button
                                                            onClick={handleResendOTP}
                                                            className="btn btn-primary resendbtn"
                                                        >
                                                            Resend OTP
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className='container declaration'>
                                    <div className='termsAndCondition'><h3>Terms and Conditions</h3></div>
                                    <div dangerouslySetInnerHTML={{ __html: declaration }} ></div>
                                    <div>
                                        <div>
                                            <input
                                                type="checkbox"
                                                checked={isChecked}
                                                onChange={handleCheckboxChange}
                                            />
                                            <label> I hereby confirm that I have thoroughly read and understood the terms and conditions</label>
                                        </div>
                                        <div className='confirmBox'>
                                            <button onClick={handleClick} disabled={!isChecked}>Send OTP</button>
                                        </div>
                                    </div>
                                </div>
                    }
                </div>
            </div>
        }
        {showLoader && <div style={styles.loaderContainer}>
            <ColorRing color="#00BFFF" height={80} width={80} />
        </div>}
    </>

}


export default LoginPageComponent;
