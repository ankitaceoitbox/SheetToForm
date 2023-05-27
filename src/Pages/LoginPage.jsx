import React from 'react'
import { LoginContextData } from '../common/utils/context_loginquestion'
import LoginPageComponent from '../components/login/login';
import { ColorRing } from 'react-loader-spinner';

function LoginPage({ onHandleOTPCheck }) {
    const [loginQuestionContextAPI, otpSettings] = LoginContextData(); // get the login questions
    const handleOTPCheck = (sheetId, passingPercentage) => {
        onHandleOTPCheck(sheetId, passingPercentage);
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
                    : <div style={styles.loaderContainer}>
                        <ColorRing color="#00BFFF" height={80} width={80} />
                    </div>
            }
        </>
    )
}

export const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
    loaderContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
};

export default LoginPage