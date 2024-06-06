import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchListing } from '../../store/listings';
import { createReservation } from '../../store/reservations';
import { useParams, useNavigate} from 'react-router-dom';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import './ListingShow.css';

const ListingShow = () => {
  const { listingId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const listing = useSelector(state => state.listings[listingId]);
  const currentUser = useSelector(state => state.session.user);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guest, setGuest] = useState(1);

  useEffect(() => {
    dispatch(fetchListing(listingId));
  }, [dispatch, listingId]);

  if (!listing) {
    return <div>Loading...</div>;
  }

  if (!listing.host) {
    return <div>Loading host information...</div>;
  }

  const handleReserve = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert('You must be logged in to make a reservation.');
      return;
    }

    const reservation = {
      listing_id: listingId,
      start_date: startDate.toISOString().split('T')[0],
      end_date: endDate.toISOString().split('T')[0],
      guest,
      user_id: currentUser.id,
    };

    await dispatch(createReservation(reservation));
    navigate('/reservations');  // Redirect to reservations page
  };

  const calculateTotalPrice = () => {
    if (startDate && endDate) {
      const days = (endDate - startDate) / (1000 * 60 * 60 * 24);
      return days * listing.price;
    }
    return 0;
  };

  return (
    <div className="listing-show">
      <div className="listing-header">
        <h1>{listing.title}</h1>
      </div>

      <div className='image-grid'>
      <img className='large-image-col large-image-row' src={listing.photos[0].url} alt="Listing image 1"/>
        {listing.photos.slice(1).map((photo, index) => (
            <img src={photo.url} alt={`Listing image ${index + 2}`} key={index} />
        ))}
      </div>

      <div className="split-container">
        <div className='split left'>
          <div className="listing-owner">
            <p className="listing-location">{listing.address}</p>
            <div className='divider'></div>
            <div className="listing-host">
              <img src="https://www.wolfhooker.com/wp-content/uploads/2019/02/176-1763433_user-account-profile-avatar-person-male-icon-icon-user-account.png.jpeg" alt={listing.host.full_name} className="host-avatar" />
              <span className="host-name">Hosted by {listing.host.fullName}</span>
            </div>
            <div className='divider'></div>
          </div>

          <div className="listing-details">
            <h2>About this space</h2>
            <p>{listing.description}</p>

            <div className='divider'></div>

            <h3>What this place offers</h3>
            <div className="amenities">
              {listing.amenities.split(',').map((amenity, index) => (
                <div className="amenity" key={index}>
                  <i className="icon"></i>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>

            <div className='divider'></div>
          </div>
        </div>

        <div className='split right'>
          <div className="pricing-reservation">
            <div className="pricing">${listing.price} per night</div>
            <form className="reservation-form" onSubmit={handleReserve}>
              <label>
                Check-in:
                <DatePicker 
                  selected={startDate} 
                  onChange={(date) => setStartDate(date)} 
                  selectsStart 
                  startDate={startDate} 
                  endDate={endDate} 
                  minDate={new Date()}
                />
              </label>
              <label>
                Check-out:
                <DatePicker 
                  selected={endDate} 
                  onChange={(date) => setEndDate(date)} 
                  selectsEnd 
                  startDate={startDate} 
                  endDate={endDate} 
                  minDate={startDate}
                />
              </label>
              <label>
                Guests:
                <input 
                  type="number" 
                  value={guest} 
                  min="1" 
                  onChange={(e) => setGuest(parseInt(e.target.value, 10))} 
                />
              </label>
              <div className="total-price">
                Total: ${calculateTotalPrice()}
              </div>
              <button className="reserve-button" type="submit">
                Reserve
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="reviews">
        <h2>Reviews</h2>
        {/* {listing.reviews.map(review => (
          <div className="review" key={review.id}>
            <img src={review.author.avatar} alt={review.author.name} className="review-avatar" />
            <div className="review-content">
              <span className="review-author">{review.author.name}</span>
              <p className="review-text">{review.text}</p>
            </div>
          </div>
        ))} */}
      </div>
    </div>
  );
  };

export default ListingShow;
