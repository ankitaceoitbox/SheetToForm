import httpService from "./httpService";
import config from "../config.json";
const URL = config.appScript.domainUrl;

export const SaveFormData = (formResponse) => {
    if (URL == '') {
        return;
    }
    const { appScript } = config;
    let url = URL + appScript.getEndPoint;
    return httpService.post(url, JSON.stringify(formResponse));
}


export default SaveFormData;