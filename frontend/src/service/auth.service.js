import axios from "axios";
import { toast } from "react-toastify";
import API_URL_ENV from "../config/api";

const API_URL = API_URL_ENV + `/auth`;

class AuthenticationService {
  static async Login(inputs) {
    try {
      const response = await axios.post(`${API_URL}/login`, inputs);
      if (response.data.onSuccess) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.data.token);
        return response.data;
      } else {
        toast.error(response.data.message);
        return false;
      }
    } catch (error) {
      toast.error("error server");
      return false;
    }
  }
  static async Register(inputs) {
    try {
      const response = await axios.post(`${API_URL}/signup`, inputs);
      if (response.data.onSuccess) {
        toast.success(response.data.message);
        return true;
      } else {
        toast.error(response.data.message);
        return false;
      }
    } catch (error) {
      toast.error("error server");
      return false;
    }
  }
  static async Logout() {
    try {
      const response = await axios.post(`${API_URL}/logout`);
      if (response.data.onSuccess) {
        toast.success(response.data.message);
        return true;
      } else {
        toast.error(response.data.message);
        return false;
      }
    } catch (error) {
      toast.error("error server");
      return false;
    }
  }
}
export { AuthenticationService as default };
