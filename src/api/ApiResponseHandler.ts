interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

interface LoginResponse {
  token: string;
  refreshToken: string;
  user: any; // Burada user interface'iniz varsa onu kullanabilirsiniz
}

export const handleApiResponse = <T>(response: any): ApiResponse<T> => {

  
  // HTTP durum koduna göre başarılı/başarısız kontrolü
  const isSuccess = response?.status >= 200 && response?.status < 300;
  
  if (isSuccess) {
    return {
      success: true,
      data: response?.data
    };
  }

  // API'den gelen hata mesajı varsa
  if (response?.data?.errors && response.data.errors.length > 0) {
    return {
      success: false,
      error: response.data.errors[0]
    };
  }

  // Varsayılan hata durumu
  return {
    success: false,
    error: 'Operation failed'
  };
};

export const handleApiError = (error: any): ApiResponse<never> => {
  // API'den gelen hata yanıtını kontrol et
  if (error.response?.data?.errors && error.response.data.errors.length > 0) {
    return {
      success: false,
      error: error.response.data.errors[0]
    };
  }

  // Varsayılan hata mesajı
  return {
    success: false,
    error: 'An error occurred'
  };
};

export type { ApiResponse, LoginResponse }; 