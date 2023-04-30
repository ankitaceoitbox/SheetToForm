import httpService from "./httpService";
import config from "../config.json";
const URL = config.appScript.domainUrl;
export const getMcqData = () => {
    if (URL == '') {
        return;
    }
    const { appScript } = config;
    let url = URL + appScript.getEndPoint;
    return httpService.get(url);
}

const AllMcqData = {
    getMcqData
};

export default AllMcqData;