import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
// import LoginForm from './components/session/LoginForm';
// import SignupForm from './components/session/SignupForm';
import SessionModal from './components/SessionModal/SessionModal';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import ListingsIndex from './components/ListingsIndex/ListingsIndex';
import ListingShow from './components/ListingShow/ListingShow';
import ReservationIndex from './components/ReservationIndex/ReservationIndex';
import ReservationEdit from './components/ReservationEdit/ReservationEdit';
import * as sessionActions from './store/session';
import { ProtectedRoute } from './components/Routes/Routes';


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
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <ListingsIndex />
      },
      {
        path: "/:listingId",
        element: <ListingShow/>
      },
      {
        path: '/reservations',
        element: <ProtectedRoute component={ReservationIndex} />
      },
      {
        path: '/reservations/:reservationId/edit',
        element: <ProtectedRoute component={ReservationEdit} />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

