import httpService from "./httpService";
import config from "../config.json";
const URL = config.appScript.domainUrl;

export const SendOTP = (otp_generator, userDetails) => {
    if (URL == '') {
        return;
    }
    const { appScript } = config;
    let url = URL + appScript.getEndPoint;
    let params = {
        otp_generator,
        userDetails
    }
    return httpService.post(url, JSON.stringify(params));
}

export default SendOTP;
