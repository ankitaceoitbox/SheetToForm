import httpService from "./httpService";
import config from "../config.json";
const URL = config.appScript.domainUrl;
export const getMcqData = () => {
    if (URL == '') {
        return;
    }
    const { appScript } = config;
    let url = URL + appScript.getEndPoint;
    let id = sessionStorage.getItem('google_sheet_id') ? sessionStorage.getItem('google_sheet_id') : '';
    return httpService.get(`${url}?page=McqQuestions&sheetid=${id}`);
}

const AllMcqData = {
    getMcqData
};

export default AllMcqData;