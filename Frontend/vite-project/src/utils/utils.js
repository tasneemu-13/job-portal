import axios from 'axios';

export const axiosClient = axios.create({  // ✅ Use lowercase 'create'
  //  baseURL: 'http://localhost:1234/api/v1' // ✅ Fixed baseURL format
      baseURL : 'https://job-portal-qxix.onrender.com/api/v1', // ✅ Fixed baseURL format
});
