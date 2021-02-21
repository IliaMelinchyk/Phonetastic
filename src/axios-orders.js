import axios from "axios";
const instance = axios.create({
  baseURL: "https://phone-market-76651-default-rtdb.firebaseio.com/",
});
export default instance;
