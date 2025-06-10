import axios from "axios";

const URL_CardDetails = "carddetails";

export const CardDetailsApi = async (id:string) => {
    const response = await axios.get(`https://homefu.azurewebsites.net/api/${URL_CardDetails}/${id}`);
    
    return response.data;
}