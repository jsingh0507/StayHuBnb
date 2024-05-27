// function App() {
//   return <h1> Hello from App </h1>;
// }

// export default App;

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginForm from './components/session/LoginForm';
import * as sessionActions from './store/session';

const Layout = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreSession()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded ? <Outlet /> : null;
};

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <h1>Welcome!</h1>
      },
      {
        path: 'login',
        element: <LoginForm />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

