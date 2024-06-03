import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
// import LoginForm from './components/session/LoginForm';
// import SignupForm from './components/session/SignupForm';
import SessionModal from './components/SessionModal/SessionModal';
import Navigation from './components/Navigation/Navigation';
import ListingsIndex from './components/ListingsIndex/ListingsIndex';
import ListingShow from './components/ListingShow/ListingShow';
import * as sessionActions from './store/session';


function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreSession()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation />
      {isLoaded && <Outlet />}
      <SessionModal />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        // element: <h1></h1>
        element: <ListingsIndex />
      },
      {
        path: "/:listingId",
        element: <ListingShow />
      }
      // {
      //   path: 'login',
      //   element: <LoginForm />
      // },
      // {
      //   path: 'signup',
      //   element: <SignupForm />
      // }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

