import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReservations, selectReservationsArray, deleteReservation } from '../../store/reservations';
import { Link } from 'react-router-dom';
import './ReservationIndex.css';

const ReservationIndex = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const reservations = useSelector(selectReservationsArray);

  useEffect(() => {
    dispatch(fetchReservations(currentUser.id));
  }, [dispatch, currentUser.id]);

  if (!reservations) {
    return <div>Loading reservations...</div>;
  }

  const handleDelete = (reservationId) => {
    console.log('Deleting reservation with ID:', reservationId);
    dispatch(deleteReservation(reservationId));
  };

  return (
    <div className="reservation-index">
      <h1>Your Reservations</h1>
      <ul>
        {reservations.map(reservation => (
          <li key={reservation.id}>
            <p>Reservation ID: {reservation.id}</p>
            <p>Start Date: {reservation.start_date}</p>
            <p>End Date: {reservation.end_date}</p>
            <p>Guests: {reservation.guest}</p>
            <p>Price per Night: ${reservation.price}</p>
            <button onClick={() => handleDelete(reservation.id)}>Delete</button>
            <Link to={`/reservations/${reservation.id}/edit`}><button>Edit</button></Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservationIndex;
