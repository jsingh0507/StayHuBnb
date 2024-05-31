import csrfFetch from "./csrf";

const RECEIVE_LISTINGS = "listings/RECEIVE_LISTINGS";
const RECEIVE_LISTING = "listings/RECEIVE_LISTING";

const receiveListings = (listings) => ({
    type: RECEIVE_LISTINGS,
    listings
});

const receiveListing = (listing) => ({
    type: RECEIVE_LISTING,
    listing
});

export const fetchListings = () => async (dispatch) => {
    const res = await csrfFetch("/api/listings");
    const data = await res.json();
    dispatch(receiveListings(data));
};

export const fetchListing = (listingId) => async (dispatch) => {
    const res = await csrfFetch(`/api/listings/${listingId}`);
    const data = await res.json();
    dispatch(receiveListing(data));
};

export default function listingsReducer(state = {}, action){
    switch(action.type){
        case RECEIVE_LISTINGS:
            return {...state, ...action.listings};
        case RECEIVE_LISTING:
            return {...state, [action.listing.id]: action.listing};
        default:
            return state;
    }
}