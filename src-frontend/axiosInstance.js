import axios from 'axios';
export const axiosInstance = axios.create({
	  timeout: 4000,
	  headers: {'X-Custom-Header': 'foobar'}
});

export default axiosInstance;
