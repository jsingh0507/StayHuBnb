import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchListing } from '../../store/listings';
import { createReservation } from '../../store/reservations';
import { useParams, useNavigate} from 'react-router-dom';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import './ListingShow.css';
import { FaWifi } from "react-icons/fa";
import { MdOutlinePool } from "react-icons/md";
import { IoSnow, IoCarOutline } from "react-icons/io5";
import { TbToolsKitchen2 } from "react-icons/tb";
import { PiBathtub } from "react-icons/pi";

const ListingShow = () => {
  const { listingId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const listing = useSelector(state => state.listings[listingId]);
  const currentUser = useSelector(state => state.session.user);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guest, setGuest] = useState(1);

  // Dummy reviews data
  const dummyReviews = [
    { id: 1, author: { name: 'John Doe', avatar: 'https://icons.iconarchive.com/icons/martz90/circle/256/pictures-icon.png' }, text: 'Great place to stay!' },
    { id: 2, author: { name: 'Jane Smith', avatar: 'https://icons.iconarchive.com/icons/blackvariant/button-ui-requests-12/256/Photos-icon.png' }, text: 'Amazing experience, highly recommended!' },
    { id: 3, author: { name: 'Alice Johnson', avatar: 'https://icons.iconarchive.com/icons/designbolts/free-multimedia/256/Photo-icon.png' }, text: 'Very clean and comfortable.' }
  ];

  // const amenities = listing.amenities.split(',');

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

    // debugger
    dispatch(createReservation(reservation));
    navigate('/reservations');  // Redirect to reservations page
  };

  const calculateTotalPrice = () => {
    if (startDate && endDate) {
      const days = (endDate - startDate) / (1000 * 60 * 60 * 24);
      return days * listing.price;
    }
    return listing.price;
  };

  const generateRandomRating = () => {
    return (Math.floor(Math.random() * (500 - 400 + 1)) + 400) / 100;
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
            <p className="listing-location">Entire house in {listing.address}</p>
            <p className='info-tg'>Studio · 4 beds · 2 bath</p>
            <p id='rating'>&#9733; {generateRandomRating().toFixed(2)}</p>
            <div className='divider'></div>
            <div className="listing-host">
              <img src="https://cdn.britannica.com/82/156482-131-AEEBFEFC/New-York-York.jpg?w=840&h=460&c=crop" alt={listing.host.full_name} className="host-avatar" />
              <div className='flex'>
              <span className="host-name">Hosted by {listing.host.fullName}</span>
              <p id='rat'>Superhost · 2 years hosting</p>
              </div>
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
                  {amenity == 'WiFi' ? <><FaWifi /><span className="amenity-text">WiFi</span></> : null}
                  {amenity == 'Pool' ? <><MdOutlinePool/> <span className="amenity-text">Pool</span></> : null}
                  {amenity == 'Air Conditioning' ? <><IoSnow/> <span className="amenity-text">A/C</span></> : null}
                  {amenity == 'Parking' ? <><IoCarOutline/> <span className="amenity-text">Parking</span></> : null}
                  {amenity == 'Kitchen' ? <><TbToolsKitchen2/><span className="amenity-text">Kitchen</span></> : null}
                  {amenity == 'Bathub' ? <><PiBathtub/> <span className="amenity-text">Bathtub</span></> : null}
                  
                </div>
              ))}
            </div>

            <div className='divider'></div>
          </div>
        </div>

        <div className='split right'>
          <div className="pricing-reservation">
            <div className="pricing">${listing.price/1} night</div>
            <form className="reservation-form" onSubmit={handleReserve}>
              <div className='res-grid'>
              <div className='lbl-box'>
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
              </div>
              <div className='lbl-box '>
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
              </div>
              <div className='lbl-box guest-col guest-row'>
              <label>
              Guests:
                <input 
                  type="number" 
                  value={guest} 
                  min="1" 
                  onChange={(e) => setGuest(parseInt(e.target.value, 10))} 
                />
              </label>
              </div>
              </div>
              <div className="total-price">
                Total: ${calculateTotalPrice()/1}
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
        {dummyReviews.map(review => (
          <div className="review" key={review.id}>
            <img src={review.author.avatar} alt={review.author.name} className="review-avatar" />
            <div className="review-content">
              <span className="review-author">{review.author.name}</span>
              <p className="review-text">{review.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListingShow;
