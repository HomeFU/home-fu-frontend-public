import axios from "axios";

const URL_Delete_Location = "https://homefuserverback.azurewebsites.net/api/locations/";

export const DeleteLocationForAdmin = async (id: number) => {
    await axios.delete(URL_Delete_Location + `${id}`);
}