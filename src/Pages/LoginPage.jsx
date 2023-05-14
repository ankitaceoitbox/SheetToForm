import React from 'react'
import { LoginContextData } from '../common/utils/context_loginquestion'
import LoginPageComponent from '../components/login/login';

function LoginPage({ onHandleOTPCheck }) {
    const [loginQuestionContextAPI, otpSettings] = LoginContextData(); // get the login questions
    const handleOTPCheck = (sheetId) => {
        onHandleOTPCheck(sheetId);
    }
    return (
        <>
            {
                Object.keys(loginQuestionContextAPI).length > 0 ?
                    <LoginPageComponent
                        questions={loginQuestionContextAPI}
                        onHandleOTPCheck={handleOTPCheck}
                        otpSettings={otpSettings}
                    />
                    : <div>Loading...</div>
            }
        </>
    )
}

export default LoginPage