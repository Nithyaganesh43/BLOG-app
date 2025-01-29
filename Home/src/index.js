import React, { useEffect, lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import ReactDOM from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';

import { GlobalStyle } from './globalStyles';
import Contact from './components/Contact/index';

const Header = lazy(() => import('./components/Header/index'));
const TermsAndConditions = lazy(() =>
  import('./Pages/TermsAndConditions/index')
);
const PrivacyPolicy = lazy(() => import('./Pages/PrivacyPolicy/index'));
const Home = lazy(() => import('./Pages/Home'));
const Main = lazy(() => import('./Pages/Main'));

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
        path: '/Home',
        element: (
          <>
            <Header />
            <Home />
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
