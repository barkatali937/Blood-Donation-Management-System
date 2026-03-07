import axios from "axios"; 
const api = axios.create(
    {baseURL: 'https://blood-donation-management-system-8y4j.onrender.com'}
); 
export default api; 
