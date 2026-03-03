// import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  ScrollRestoration,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Menu from './components/menu/Menu';
import Error from './pages/Error';
import ToasterProvider from './components/ToasterProvider';
//import Login from './pages/Login';
import LogIn from './pages/login/Login';
import SignUp from './pages/signup/Signup';
import Homepage from './pages/Homepage/Homepage';
import Contact from './pages/Contact';
import ProtectedRoute from './ProtectedRoute';
import { AuthProvider } from './api/AuthContext';


import './i18n';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import ReservationCalendar from './pages/ReservationCalendar';
import AdminAppointments from './pages/AdminAppointments';
import Appointment from './pages/Appointment';


function App() {

  const Layout = () => {
    return (
      <div
        id="rootContainer"
        className="w-full p-0 m-0 overflow-visible min-h-screen flex flex-col justify-between"
      >
        <ToasterProvider />
        <ScrollRestoration />
        <div>
          <Navbar />
          <div className="w-full flex gap-0 pt-20 xl:pt-[96px] 2xl:pt-[112px] mb-auto">
            <div className="hidden xl:block xl:w-[250px] 2xl:w-[280px] 3xl:w-[350px] border-r-2 border-base-300 dark:border-slate-700 px-3 xl:px-4 xl:py-1">
              <Menu />
            </div>
            <div className="w-full px-4 xl:px-4 2xl:px-5 xl:py-2 overflow-clip">
              <Outlet />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/contact",
      element: <Contact />,
    },
    {
      path: "/randevu",
      element: <Appointment />,
    },
    {
      path: "/login",
      element: <LogIn />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/dashboard",
      element: <ProtectedRoute allowedRoles={[1, 2]} />,
      children: [
        {
          element: <Layout />,
          children: [
            {
              path: "reservation",
              element: <ReservationCalendar />,
            },
            {
              path: "admin-appointments",
              element: <ProtectedRoute allowedRoles={[2]} />,
              children: [
                {
                  path: "",
                  element: <AdminAppointments />,
                },
              ],
            },
          ],
        },
      ],
      errorElement: <Error />,
    },

  ]);


  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
