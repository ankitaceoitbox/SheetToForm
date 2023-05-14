import httpService from "./httpService";
import config from "../config.json";
const URL = config.appScript.domainUrl;
export const GetLoginQuestion = () => {
    if (URL == '') {
        return;
    }
    const { appScript } = config;
    let url = URL + appScript.getEndPoint;
    return httpService.get(`${url}?page=LoginQuestions`);
}

export default GetLoginQuestion;
