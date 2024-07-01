import csrfFetch from './csrf';

const RECEIVE_RESERVATIONS = "reservations/RECEIVE_RESERVATIONS";
const RECEIVE_RESERVATION = "reservations/RECEIVE_RESERVATION";
const REMOVE_RESERVATION = "reservations/REMOVE_RESERVATION";

const receiveReservations = (reservations) => {
  // debugger
  return {
    type: RECEIVE_RESERVATIONS,
    reservations
  }
};

const receiveReservation = (reservation) => ({
  type: RECEIVE_RESERVATION,
  reservation
});

const removeReservation = (reservationId) => {
  // debugger
  return {
    type: REMOVE_RESERVATION,
    reservationId
  }
};

export const selectReservation = (reservationId) => (state) => {
  return state.reservations[reservationId] || null
}

export const selectReservationsArray = (state) => {
  // debugger
  return Object.values(state.reservations) || []
}

export const fetchReservations = () => async (dispatch) => {
  const res = await csrfFetch("/api/reservations");
  // debugger
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
  // debugger
  if(res.ok){
    const data = await res.json();
    dispatch(receiveReservation(data));
    dispatch(fetchReservations());
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
  // debugger
  if (res.ok){
    dispatch(removeReservation(reservationId));
  }
};

const reservationsReducer = (state = {}, action) => {
  Object.freeze(state);
  const newState = { ...state };
  switch(action.type) {
    case RECEIVE_RESERVATIONS:
      // debugger
      // return { ...state, ...action.reservations };
      return action.reservations
    case RECEIVE_RESERVATION:
      return { ...newState, [action.reservation.id]: action.reservation };
    case REMOVE_RESERVATION:
      // debugger
      delete newState[action.reservationId];
      return newState;
    default:
      return state;
  }
};

export default reservationsReducer;
