import React, { useEffect, lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import ReactDOM from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';

import { GlobalStyle } from './globalStyles';
import Contact from './components/Contact/index';
import Header from './components/Header/index';
import HeaderMain from './components/HeaderMain/index';
import TermsAndConditions from './Pages/TermsAndConditions/index';
import PrivacyPolicy from './Pages/PrivacyPolicy/index';
import Home from './Pages/Home';
import Main from './Pages/Main';
import BlogInfo from './Pages/BlogInfo/BlogInfo';
import CreateBlog from './Pages/CreateBlog/CreateBlog';
import Profile from './Pages/Profile/Profile';

const RootApp = () => {
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       const response = await fetch(
  //         'https://ping-server-2.onrender.com/auth/authCheck',
  //         {
  //           method: 'GET',
  //           credentials: 'include',
  //         }
  //       );

  //       if (response.ok) { 
  //         toast.success('Happy to see you again Logged');
  //       } else { 
  //         toast.success(`Welcome To Ng's Blog. SignUp`);
  //       }
  //     } catch (error) {
  //       console.error('Error checking auth:');
  //     }
  //   };

  //   checkAuth();
  // }, []);

  return (
    <>
      <GlobalStyle />
      <Suspense fallback={null}>
        <Outlet />
        <Contact />
      </Suspense>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <RootApp />,
    children: [
      {
        path: '/',
        element: (
          <>
            <Header />
            <Home />
          </>
        ),
      },
      {
        path: '/home',
        element: (
          <>
            <HeaderMain />
            <Main />
          </>
        ),
      },
      {
        path: '/blog/:id',
        element: (
          <>
            <HeaderMain />
            <BlogInfo />
          </>
        ),
      },
      {
        path: '/CreateBlog',
        element: (
          <>
            <HeaderMain />
            <CreateBlog />
          </>
        ),
      },
      {
        path: '/Profile',
        element: (
          <>
            <HeaderMain />
            <Profile />
          </>
        ),
      },
      {
        path: '/termsofservice',
        element: <TermsAndConditions />,
      },
      {
        path: '/privacypolicy',
        element: <PrivacyPolicy />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={appRouter} />
  </React.StrictMode>
);
