import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  Root, ErrorPage, Home, RequireAuth, requireAuthLoader, RequireNoAuth, requireNoAuthLoader,
  Index, Login, loginAction, Signup, signupAction,
} from './routes/routes';

export const network = process.env.REACT_APP_API_HOST;

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
      {
        element: <RequireAuth />,
        loader: requireAuthLoader,
        children: [
          {
            index: true,
            element: <Index />,
          },
        ],
      },
      {
        element: <RequireNoAuth />,
        loader: requireNoAuthLoader,
        children: [
          {
            path: '/login',
            element: <Login />, 
            action: loginAction,
          },
          {
            path: '/signup',
            element: <Signup />,
            action: signupAction, 
          },
        ],
      },
    ],
  },
]);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
