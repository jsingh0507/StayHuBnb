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

  const calculateTotalPrice = (startDate, endDate, price) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = (end - start) / (1000 * 60 * 60 * 24);
    return days * price;
  };

  return (
    <div className="reservation-index">
      <h1>Your Reservations</h1>
      <table>
        <thead>
          <tr>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Booked</th>
            <th>Listing ID</th>
            <th>Listing Title</th>
            <th>Guests</th>
            <th>Total Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map(reservation => (
            new Date(reservation.createdAt).toString() !== "Invalid Date" &&
            <tr key={reservation.id}>
              <td>{(reservation.startDate)}</td>
              <td>{reservation.endDate}</td>
              <td>{new Date(reservation.createdAt).toLocaleDateString()}</td>
              <td>{reservation.listingId}</td>
              <td>{reservation.title}</td>
              <td>{reservation.guest}</td>
              <td>${calculateTotalPrice(reservation.startDate, reservation.endDate, reservation.price).toFixed(2)}</td>
              <td>
                <button className="delete-button" onClick={() => handleDelete(reservation.id)}>Delete</button>
                <Link to={`/reservations/${reservation.id}/edit`}><button className="edit-button">Edit</button></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationIndex;
