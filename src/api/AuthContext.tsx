import { createContext, useContext, useEffect, useState, useRef } from "react";
import apiClient from "./ApiConfiguration";
import { User } from "../pages/Interfaces/Models";

/*interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  profileImage: string;
  role: string;
  bankIban: string;
  bankOwnerName: string;
  accountType: string;
}*/

interface AuthContextType {
  user: User | null;
  loading: boolean;
  fetchUser: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const initialFetchDone = useRef(false);

  // Kullanıcı bilgilerini getiren fonksiyon
  const fetchUser = async () => {
    try {
      const response = await apiClient.get("/user/user");
      console.log("fetchUser response", response);

      const userData = response.data.user;
      console.log("fetchUser response.data.user:", userData);

      // Yeni API'ya uygun şekilde dönüştür
      const transformedUser = {
        id: userData.id,
        first_name: userData.ad || userData.first_name,
        last_name: userData.soyad || userData.last_name,
        email: userData.email,
        phone: userData.telefon || userData.phone,
        created_at: userData.created_at,
        user_type: userData.user_type ?? 1, // default 1
      };

      setUser(transformedUser as any);
      localStorage.setItem('user', JSON.stringify(transformedUser));
      console.log("fetchUser setUser & localStorage user:", transformedUser);
    } catch (error) {
      console.error("fetchUser error", error);
      setUser(null);
      window.location.href = '/login';
    } finally {
      setLoading(false);
    }
  };

  // Çıkış işlemi
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  // Sayfa yüklendiğinde ve token varsa auth/me çağrılır
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    console.log("AuthContext useEffect accessToken:", accessToken);
    if (accessToken && !initialFetchDone.current) {
      initialFetchDone.current = true;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log("AuthProvider user state changed:", user);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, loading, fetchUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
