import axios from 'axios';
import apiClient from './ApiConfiguration';
import { handleApiResponse, handleApiError, LoginResponse } from './ApiResponseHandler';

// GET TOP DEALS
export const fetchTopDeals = async () => {
  const response = await axios
    .get('https://react-admin-ui-v1-api.vercel.app/topdeals')
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

// GET TOTAL USERS
export const fetchTotalUsers = async () => {
  const response = await axios
    .get('https://react-admin-ui-v1-api.vercel.app/totalusers')
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

// GET TOTAL RATIO
export const fetchTotalRatio = async () => {
  const response = await axios
    .get('https://react-admin-ui-v1-api.vercel.app/totalratio')
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

// GET TOTAL REVENUE
export const fetchTotalRevenue = async () => {
  const response = await axios
    .get('https://react-admin-ui-v1-api.vercel.app/totalrevenue')
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

// GET TOTAL SOURCE
export const fetchTotalSource = async () => {
  const response = await axios
    .get('https://react-admin-ui-v1-api.vercel.app/totalsource')
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

// GET TOTAL VISIT
export const fetchTotalVisit = async () => {
  const response = await axios
    .get('https://react-admin-ui-v1-api.vercel.app/totalvisit')
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};


// GET TOTAL PROFIT
export const fetchTotalProfit = async () => {
  const response = await axios
    .get('https://react-admin-ui-v1-api.vercel.app/totalprofit')
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

// GET SINGLE USER
export const fetchSingleUser = async (id: string) => {
  const response = await axios
    .get(`https://react-admin-ui-v1-api.vercel.app/users/${id}`)
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

//ACTIVATE USER
export const activateUser = async (id: string) => {
  const response = await axios
    .put(`https://react-admin-ui-v1-api.vercel.app/users/${id}/activate`)
    .then((res) => {
      console.log('axios put:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

// DEACTIVATE USER
export const deactivateUser = async (id: string) => {
  const response = await axios
    .put(`https://react-admin-ui-v1-api.vercel.app/users/${id}/deactivate`)
    .then((res) => {
      console.log('axios put:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};


// GET ALL ORDERS
export const fetchOrders = async () => {
  const response = await axios
    .get('https://react-admin-ui-v1-api.vercel.app/orders')
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};


// GET ALL NOTES
export const fetchNotes = async () => {
  const response = await axios
    .get(`https://react-admin-ui-v1-api.vercel.app/notes?q=`)
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

// GET ALL LOGS
export const fetchLogs = async () => {
  const response = await axios
    .get(`https://react-admin-ui-v1-api.vercel.app/logs`)
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};








////////////////New API Collection////////////////////









export const changePassword = async (id: string, oldPassword: string, newPassword: string) => {
  try {
    const response = await apiClient.put(`/user/${id}/change-password`, {
      oldPassword,
      newPassword
    });

    return handleApiResponse(response);
  } catch (error) {
    return handleApiError(error);
  }
};


// Giriş API'si: email ve password ile giriş
export const LogInApi = async (email: string, password: string) => {
  try {
    const response = await apiClient.post('/user/login', {
      email,
      password,
    });

    const result = handleApiResponse<LoginResponse>(response);
    if (result.success && result.data) {
      localStorage.setItem("accessToken", result.data.token);
      localStorage.setItem("user", JSON.stringify(result.data.user));
      // LOG: Login sonrası user objesi ve user_type
      console.log("Login sonrası user:", result.data.user);
      console.log("Login sonrası user_type:", result.data.user?.user_type);
    }

    return result;
  } catch (error) {
    return handleApiError(error);
  }
};

export const SignUpApi = async (
  first_name: string,
  last_name: string,
  student_first_name: string,
  student_last_name: string,
  email: string,
  phone: string,
  password: string
) => {
  try {
    const response = await apiClient.post('/user/register', {
      first_name,
      last_name,
      student_first_name,
      student_last_name,
      email,
      phone,
      password,
    });

    return handleApiResponse(response);
  } catch (error) {
    return handleApiError(error);
  }
};

export const ForgotPasswordApi = async (email: string) => {
  try {
    const response = await apiClient.post('/auth/forgot-password', {
      email: email
    });

    return handleApiResponse(response);
  } catch (error) {
    return handleApiError(error);
  }
};

//export const deleteUser = async (id: string) => {
//  try {
//    const response = await apiClient.delete(`/user/${id}`);
//    return handleApiResponse(response);
//  } catch (error) {
//    return handleApiError(error);
//  }
//};




// Destek talebi sil
export const deleteSupportTicket = async (id: string) => {
  try {
    const response = await apiClient.delete(`/support/${id}`);
    return handleApiResponse(response);
  } catch (error) {
    return handleApiError(error);
  }
};

// Randevu (appointments) listeleme
export const fetchAppointments = async (filters: { name: string; status: string }) => {
  try {
    const params: Record<string, string> = {};
    if (filters.name) params.name = filters.name;
    if (filters.status) params.status = filters.status;
    const response = await apiClient.get('/service/getAllServicesForAdmin', { params });
    return handleApiResponse<{ appointments: any[] }>(response);
  } catch (error) {
    return handleApiError(error);
  }
};

// Kullanıcının eklediği hizmetleri çek
export const fetchUserServices = async () => {
  try {
    const response = await apiClient.get('/work/getServices');
    return handleApiResponse(response);
  } catch (error) {
    return handleApiError(error);
  }
};

// Kullanıcının hizmetlerini kaydet/güncelle
export const saveUserServices = async (services: { label: string; value: number }[]) => {
  try {
    const response = await apiClient.post('/work/addOrUpdateServices', { services });
    return handleApiResponse(response);
  } catch (error) {
    return handleApiError(error);
  }
};

// Randevu talebi gönder
export const sendAppointmentRequest = async ({
  user_id,
  randevu_tarihi,
  randevu_saati,
  token,
}: {
  user_id: number;
  randevu_tarihi: string;
  randevu_saati: string;
  token: string;
}) => {
  try {
    const response = await apiClient.post(
      '/service/appointment-request',
      {
        user_id,
        randevu_tarihi,
        randevu_saati,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return handleApiResponse(response);
  } catch (error) {
    return handleApiError(error);
  }
};

// Randevu isteklerini getir (admin için)
export const fetchAppointmentRequests = async (token: string) => {
  try {
    const response = await apiClient.get('/service/appointment-requests', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return handleApiResponse<{ appointments: any[] }>(response);
  } catch (error) {
    return handleApiError(error);
  }
};

// Takvim için: Belirli yıl ve ayın randevularını getir (apiClient ile)
export const fetchAppointmentsByMonth = async ({
  year,
  month,
  user_id,
}: {
  year: number;
  month: number;
  user_id?: number;
}) => {
  try {
    const params: Record<string, any> = { year, month };
    if (user_id) params.user_id = user_id;
    const response = await apiClient.get('service/appointments/month', { params });
    return response.data; // { success: true, data: [...] }
  } catch (error) {
    return { success: false, message: "Randevular alınamadı.", data: [] };
  }
};

// Firma için: Belirli yıl ve ayın tüm randevularını getir (query string ile)
export const fetchAllCompanyAppointmentsByMonth = async ({
  year,
  month,
  company_id,
}: {
  year: number;
  month: number;
  company_id: number;
}) => {
  try {
    // Query string elle oluşturuluyor
    const query = `year=${encodeURIComponent(year)}&month=${encodeURIComponent(month)}&company_id=${encodeURIComponent(company_id)}`;
    const response = await apiClient.get(`service/appointments/company/all?${query}`);
    return response.data; // { success: true, data: [...] }
  } catch (error) {
    return { success: false, message: "Firma randevuları alınamadı.", data: [] };
  }
};

