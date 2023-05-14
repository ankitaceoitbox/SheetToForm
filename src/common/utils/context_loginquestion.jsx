import { useContext } from "react";
import LoginQuestionContext from "../../context/loginquestion.context";

export function LoginContextData() {
    const { loginQuestionContextAPI, otpSettings } = useContext(LoginQuestionContext);
    return [loginQuestionContextAPI, otpSettings];
}