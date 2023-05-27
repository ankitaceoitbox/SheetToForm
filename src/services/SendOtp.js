import httpService from "./httpService";
const URL = 'http://64.227.133.158:3001/send-otp';

export const SendOTP = (otp_generator, userDetails, otpSettings) => {
    if (URL == '') {
        return;
    }
    let params = {
        otp_generator,
        userDetails,
        otpSettings
    }
    return httpService.post(URL, params);
}

export default SendOTP;
