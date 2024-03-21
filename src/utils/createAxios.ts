import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const API_KEY = 'http://localhost:7090/api';

const refreshToken = async (resToken, setAccount: any) => {
   try {
      const resfreshtoke = {
         refreshToken: resToken,
      };
      const res = await axios.post(`${API_KEY}/auth/refresh-token`, resfreshtoke);
      return res.data;
   } catch (err) {
      setAccount(null);
      console.log(err);
   }
};

export const createAxios = (user: any, setAccount: any) => {
   const newInstance = axios.create({
      baseURL: API_KEY,
      headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
      },
   });
   newInstance.interceptors.request.use(
      async config => {
         let date = new Date();
         const decodedToken: any = jwtDecode(user?.access_token);

         if (new Date(decodedToken.exp * 1000) < date) {
            const data = await refreshToken(user?.refresh_token, setAccount);
            const refreshUser = {
               ...user,
               access_token: data?.access_token,
            };
            setAccount(refreshUser);
            config.headers['Authorization'] = 'Bearer ' + data?.access_token;
         }
         return config;
      },
      err => {
         return Promise.reject(err);
      }
   );
   return newInstance;
};
