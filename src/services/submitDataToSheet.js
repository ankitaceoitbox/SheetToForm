import httpService from "./httpService";
import config from "../config.json";
const URL = config.appScript.domainUrl;

export const SaveFormData = () => {
    if (URL == '') {
        return;
    }
    const { appScript } = config;
    let url = URL + appScript.getEndPoint;
    return httpService.post(url);
}


export default SaveFormData;