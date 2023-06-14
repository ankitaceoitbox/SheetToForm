import httpService from "./httpService";
import config from "../config.json";
const URL = config.OTP.domainUrl;
export const SendOTP = (otp_generator, userDetails, otpSettings) => {
    if (URL == '') {
        return;
    }
    let params = {
        otp_generator,
        userDetails,
        otpSettings
    }
    const url = `${URL}${config.OTP.getEndPoint}`
    return httpService.post(url, params);
}

export default SendOTP;
