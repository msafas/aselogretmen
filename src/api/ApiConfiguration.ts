import axios from 'axios';

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

const apiClient = axios.create({
  // baseURL: "http://localhost:3000/", 
  baseURL:"https://yuzmeakademi-api.onrender.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor'ı ekle
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    console.log("Request interceptor token:", token);
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor'ı ekle
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Eğer 401 hatası alındıysa ve refresh token işlemi devam etmiyorsa
    if (error.response?.status === 401 && !isRefreshing) {
      if (originalRequest._retry) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await apiClient.post('/auth/refresh-token', {
          refreshToken
        });

        if (response.data?.data?.token) {
          localStorage.setItem('accessToken', response.data.data.token);
          processQueue();
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        processQueue(refreshError);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        //window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient; 