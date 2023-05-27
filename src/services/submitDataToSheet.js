import httpService from "./httpService";
import config from "../config.json";
const URL = config.appScript.domainUrl;

export const SaveFormData = (formResponse, screenshotsURL, userSwitchTab) => {
    console.log(screenshotsURL);
    if (URL == '') {
        return;
    }
    const { appScript } = config;
    const sheetId = sessionStorage.getItem('google_sheet_id');
    const passingPercent = sessionStorage.getItem('google_passing_percent');
    let url = URL + appScript.getEndPoint + "?sheet_id=" + sheetId + "&passingPercent=" + passingPercent + "&userSwitchTab=" + userSwitchTab;
    return httpService.post(url, JSON.stringify([formResponse, screenshotsURL]));
}


export default SaveFormData;
