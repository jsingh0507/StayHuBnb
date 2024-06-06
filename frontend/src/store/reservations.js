import csrfFetch from './csrf';
import {createSelector} from 'reselect';

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

export const selectReservation = (reservationId) => (state) => {
  return state.reservations[reservationId] || null
}

// export const selectReservationsArray = (state) => {
//   return Object.values(state.reservations) || []
// }

// export const selectReservationsArray = createSelector(
//   state => state.reservations, 
//   state => Object.values(state.reservations) ?? []
// )

export const selectReservationsArray = createSelector(
  state => state.reservations, 
  reservations => Object.values(reservations ?? {})
)
export const fetchReservations = () => async (dispatch) => {
  const res = await csrfFetch("/api/reservations");

  if(res.ok){
    const data = await res.json();
    dispatch(receiveReservations(data));
  }
};

export const fetchReservation = (reservationId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reservations/${reservationId}`);

  if(res.ok){
    const data = await res.json();
    dispatch(receiveReservation(data));
  }
  
};

export const createReservation = (reservation) => async (dispatch) => {
  const res = await csrfFetch("/api/reservations", {
    method: "POST",
    body: JSON.stringify(reservation),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if(res.ok){
    const data = await res.json();
    dispatch(receiveReservation(data));
  }
  
};

export const updateReservation = (reservation) => async (dispatch) => {
  const res = await csrfFetch(`/api/reservations/${reservation.id}`, {
    method: "PATCH",
    body: JSON.stringify(reservation),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if(res.ok){
    const data = await res.json();
    dispatch(receiveReservation(data));
  }
  
};

export const deleteReservation = (reservationId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reservations/${reservationId}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (res.ok){
    dispatch(removeReservation(reservationId));
  }
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
