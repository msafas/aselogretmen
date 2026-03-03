import { Outlet } from "react-router-dom";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "./api/AuthContext";

interface ProtectedRouteProps {
  allowedRoles: number[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  // API bağlantısı kapalı - tüm kullanıcılara izin ver
  return <Outlet />;

  /* API bağlantısı açık olduğunda kullanılacak kod:
  const { user, loading } = useAuth();
  console.log("Permission check:", user, allowedRoles, user?.user_type);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.user_type)) {
    return <Navigate to="/dashboard/unauthorized" />;
  }

  return <Outlet />;
  */
};

export default ProtectedRoute;