import axios from "axios";
import { toast } from "react-toastify";
import API_URL_ENV from "../config/api";

const API_URL = API_URL_ENV + `/room`;

const initialData = [];
class RoomService {
  static async getRoom(id) {
    try {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("token")}`;
      const response = await axios.get(`${API_URL}`);
      if (response.data.onSuccess) {
        return response.data.data;
      } else {
        toast.error(response.data.message);
        return initialData;
      }
    } catch (error) {
      toast.error("error server");
      return initialData;
    }
  }
  static async joinRoom(id) {
    try {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("token")}`;
      const response = await axios.post(`${API_URL}/join`, { roomId: id });
      if (response.data.onSuccess) {
        return response.data.data;
      } else {
        toast.error(response.data.message);
        return initialData;
      }
    } catch (error) {
      toast.error("error server");
      return initialData;
    }
  }
}
export { RoomService as default };
