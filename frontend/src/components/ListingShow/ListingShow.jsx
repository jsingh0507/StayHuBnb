import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchListing } from '../../store/listings';
import { useParams } from 'react-router-dom';
import './ListingShow.css';

const ListingShow = () => {
  const { listingId } = useParams();
  const dispatch = useDispatch();
  const listing = useSelector(state => state.listings[listingId]);

  useEffect(() => {
    dispatch(fetchListing(listingId));
  }, [dispatch, listingId]);

  if (!listing) {
    return <div>Loading...</div>;
  }

  if (!listing.host) {
    return <div>Loading host information...</div>;
  }

  return (
    <div className="listing-show">
      <div className="listing-header">
        <h1>{listing.title}</h1>
      </div>

      <div className="image-gallery">
        <img src={listing.photos[0].url} alt="Listing image 1" className="large-image" />
        <div className="small-images">
          <img src={listing.photos[1].url} alt="Listing image 2" />
          <img src={listing.photos[2].url} alt="Listing image 3" />
          <img src={listing.photos[3].url} alt="Listing image 4" />
          <img src={listing.photos[4].url} alt="Listing image 5" />
        </div>
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
        <button className="reserve-button">Book Now</button>
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
