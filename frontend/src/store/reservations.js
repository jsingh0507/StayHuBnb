import csrfFetch from './csrf';

const RECEIVE_RESERVATIONS = "reservations/RECEIVE_RESERVATIONS";
const RECEIVE_RESERVATION = "reservations/RECEIVE_RESERVATION";
const REMOVE_RESERVATION = "reservations/REMOVE_RESERVATION";

const receiveReservations = (reservations) => ({
  type: RECEIVE_RESERVATIONS,
  reservations
});

const receiveReservation = (reservation) => ({
  type: RECEIVE_RESERVATION,
  reservation
});

const removeReservation = (reservationId) => ({
  type: REMOVE_RESERVATION,
  reservationId
});

export const selectReservationsArray = (state) => {
  return Object.values(state.reservations) || []
}

export const fetchReservations = () => async (dispatch) => {
  const res = await csrfFetch("/api/reservations");
  const data = await res.json();
  dispatch(receiveReservations(data));
};

export const fetchReservation = (reservationId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reservations/${reservationId}`);
  const data = await res.json();
  dispatch(receiveReservation(data));
};

export const createReservation = (reservation) => async (dispatch) => {
  const res = await csrfFetch("/api/reservations", {
    method: "POST",
    body: JSON.stringify({ reservation })
  });
  const data = await res.json();
  dispatch(receiveReservation(data));
};

export const updateReservation = (reservation) => async (dispatch) => {
  const res = await csrfFetch(`/api/reservations/${reservation.id}`, {
    method: "PATCH",
    body: JSON.stringify({ reservation })
  });
  const data = await res.json();
  dispatch(receiveReservation(data));
};

export const deleteReservation = (reservationId) => async (dispatch) => {
  await csrfFetch(`/api/reservations/${reservationId}`, {
    method: "DELETE"
  });
  dispatch(removeReservation(reservationId));
};

const reservationsReducer = (state = {}, action) => {
  const newState = { ...state };
  switch(action.type) {
    case RECEIVE_RESERVATIONS:
      return { ...state, ...action.reservations };
    case RECEIVE_RESERVATION:
      return { ...state, [action.reservation.id]: action.reservation };
    case REMOVE_RESERVATION:
      delete newState[action.reservationId];
      return newState;
    default:
      return state;
  }
};

export default reservationsReducer;
