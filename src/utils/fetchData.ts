export const getDataAPI = async (url: string, token: string, axiosJWT: any) => {
   const res = await axiosJWT.get(`${url}`, {
      headers: { Authorization: `Bearer ${token}` },
   });
   return res;
};

export const postDataAPI = async (url: string, post: any, token: string, axiosJWT: any) => {
   const res = await axiosJWT.post(`${url}`, post, {
      headers: { Authorization: `Bearer ${token}` },
   });
   return res;
};

export const putDataAPI = async (url: string, post: any, token: string, axiosJWT: any) => {
   const res = await axiosJWT.put(`${url}`, post, {
      headers: { Authorization: `Bearer ${token}` },
   });
   return res;
};

export const patchDataAPI = async (url: string, post: any, token: string, axiosJWT: any) => {
   const res = await axiosJWT.patch(`${url}`, post, {
      headers: { Authorization: `Bearer ${token}` },
   });
   return res;
};

export const deleteDataAPI = async (url: string, token: string, axiosJWT: any) => {
   const res = await axiosJWT.delete(`${url}`, {
      headers: { Authorization: `Bearer ${token}` },
   });
   return res;
};
