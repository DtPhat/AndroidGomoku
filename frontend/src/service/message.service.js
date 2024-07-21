import axios from "axios";
import { toast } from "react-toastify";
import API_URL_ENV from "../config/api";

const API_URL = API_URL_ENV + `/message`;

const initialData = [];
class MessageService {
  static async getMessages(idUser) {
    try {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("token")}`;
      const response = await axios.get(`${API_URL}/${idUser}`);
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
  static async sendMessages(text, id) {
    try {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("token")}`;
      const response = await axios.post(`${API_URL}/send/${id}`, {
        message: text,
      });
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
export { MessageService as default };
