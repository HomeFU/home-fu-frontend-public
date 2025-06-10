import axios from "axios";

const UPL_AmenityCategoty = 'amenities';

export const AmenityCategoty = async () => {
    const response = await axios.get(`https://homefu.azurewebsites.net/api/${UPL_AmenityCategoty}`);
    return response.data;
}