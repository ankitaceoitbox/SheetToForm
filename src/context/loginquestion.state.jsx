import React, { useEffect, useState } from "react";
import GetLoginQuestion from "../services/loginQuestionFetch";
import LoginQuestionContext from "./loginquestion.context";
const LoginQuestionState = (props) => {
    const [loginQuestionContextAPI, setLoginQuestionContextAPI] = useState({});
    const [otpSettings, setOtpSettings] = useState({});
    useEffect(() => {
        (async () => {
            try {
                const response = await GetLoginQuestion();
                setLoginQuestionContextAPI(response.data[0]);
                setOtpSettings(response.data[1]);
            } catch (error) {
                console.error("Error : ", error);
            }
        })()
    }, []);

    return (
        <LoginQuestionContext.Provider value={{ loginQuestionContextAPI, otpSettings }}>
            {props.children}
        </LoginQuestionContext.Provider>
    );
}

export default LoginQuestionState;
