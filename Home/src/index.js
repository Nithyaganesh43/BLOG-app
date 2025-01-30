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
import Editblog from './Pages/Editblog/Editblog';
import Profile from './Pages/Profile/Profile';
const RootApp = () => {

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
        path: '/Editblog',
        element: (
          <>
            <HeaderMain />
            <Editblog />
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
