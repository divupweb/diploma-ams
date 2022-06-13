import axios from "axios";

const axiosServer = axios.create();

axiosServer.interceptors.request.use(function (config: any) {
  config.headers.Authorization = `Bearer ${localStorage.getItem("access")}`;
  return config;
});

axiosServer.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error.response.status == 401) {
      const refreshToken = localStorage.getItem("refresh");

      if (refreshToken) {
        const refresh: any = await axios.post(`/api/auth/refresh`, {
          refresh: refreshToken,
        });
        localStorage.setItem("access", refresh.data.access);
        return axiosServer(error.config);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosServer;
