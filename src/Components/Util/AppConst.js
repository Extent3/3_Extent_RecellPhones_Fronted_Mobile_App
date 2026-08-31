// const BASE_URL = "https://3-extent-sales-app-backend.vercel.app/api";
//  const BASE_URL = "http://localhost:5000/api";
const BASE_URL = "http://10.68.55.148:5000/api";

export const API_URLS = {
    BRANDS: `${BASE_URL}/brands`,
    MODELS: `${BASE_URL}/models`,
    DEFECTS: `${BASE_URL}/defects`,
    LOGIN: `${BASE_URL}/users/login`,
    ACTIVITIES: `${BASE_URL}/activity`,
    SEND_OTP: `${BASE_URL}/users/send`,
    PARTNER: `${BASE_URL}/partners`,
    BRANDLIST: `${BASE_URL}/brands/list`,
    MODELLIST: `${BASE_URL}/models/list`,
    MODELNAMELIST: `${BASE_URL}/models/search`,
    GET_ADDRESS: `${BASE_URL}/users`,
    UPDATE_ADDRESS: `${BASE_URL}/users`,
    USERS: `${BASE_URL}/users`,
    UPDATE_PERSONAL_DETAILS:
        `${BASE_URL}/users/personal-details`,
};