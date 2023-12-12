import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://distrowave.test/api/',
});

export default axiosInstance;
