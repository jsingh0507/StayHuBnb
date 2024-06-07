import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchReservation, updateReservation } from '../../store/reservations';
import { selectReservation } from '../../store/reservations';
import './ReservationEdit.css';

const ReservationEdit = () => {
  const { reservationId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reservation = useSelector(selectReservation(reservationId));

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [guest, setGuest] = useState(1);

  useEffect(() => {
    dispatch(fetchReservation(reservationId));
  }, [dispatch, reservationId]);

  useEffect(() => {
    if (reservation) {
      setStartDate(reservation.start_date);
      setEndDate(reservation.end_date);
      setGuest(reservation.guest);
    }
  }, [reservation]);

  const handleUpdate = async () => {
    const updatedReservation = {
      id: reservation.id,
      start_date: startDate,
      end_date: endDate,
      guest,
    };

    await dispatch(updateReservation(updatedReservation));
    navigate('/reservations');
  };

  if (!reservation) {
    return <div>Loading reservation details...</div>;
  }

  return (
    <div className="reservation-edit-container">
      <h1>Edit Reservation</h1>
      <div className="form-group">
        <label htmlFor="startDate">Check-in</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="endDate">Check-out</label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="guest">Guests</label>
        <input
          type="number"
          id="guest"
          value={guest}
          min="1"
          onChange={(e) => setGuest(parseInt(e.target.value, 10))}
        />
      </div>
      <button className="update-button" onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default ReservationEdit;
