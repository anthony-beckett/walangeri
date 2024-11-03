import axios from 'axios';
const baseUrl = 'http://192.168.1.7:3001/api/users';

const register = async (userDetails) => {
    const response = await axios.post(baseUrl, userDetails);
    return response.data;
};

export default { register };