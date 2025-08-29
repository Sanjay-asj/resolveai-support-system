    import axios from 'axios';

    // Create a central instance of axios
    const api = axios.create({
      baseURL: 'https://resolveai-server.onrender.com/api', // <-- PASTE YOUR LIVE SERVER URL HERE
      headers: {
        'Content-Type': 'application/json'
      }
    });

    /*
      This part is a "request interceptor". It will automatically
      attach the authentication token to every single API request
      if a token exists. This is a very clean and professional practice.
    */
    api.interceptors.request.use(config => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['x-auth-token'] = token;
      }
      return config;
    }, error => {
      return Promise.reject(error);
    });

    export default api;
    

    