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

  return (
    <div className="listing-show">
      <div className="listing-header">
        <h1>{listing.title}</h1>
      </div>

      <div className="image-gallery">
        <img src="https://www.contemporist.com/wp-content/uploads/2020/10/modern-house-architecture-white-exterior-181020-559-02.jpg" alt="Listing image 1" className="large-image" />
        <div className="small-images">
          <img src="https://www.contemporist.com/wp-content/uploads/2020/10/modern-house-architecture-white-exterior-181020-559-03.jpg" alt="Listing image 2" />
          <img src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXRpZnVsJTIwaG91c2V8ZW58MHx8MHx8fDA%3D" alt="Listing image 3" />
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2FEev6wC1zR8e90yrzM5NCosLt_F70k3RmA&s" alt="Listing image 4" />
          <img src="https://ychef.files.bbci.co.uk/624x351/p0h9k5dl.jpg" alt="Listing image 5" />
        </div>
      </div>

      <div className="listing-owner">
        <p className="listing-location">{listing.address}</p>
        <div className="listing-host">
          <img src="https://www.wolfhooker.com/wp-content/uploads/2019/02/176-1763433_user-account-profile-avatar-person-male-icon-icon-user-account.png.jpeg" alt={listing.host.full_name} className="host-avatar" />
          <span className="host-name">Hosted by {listing.host.full_name}</span>
        </div>
      </div>

      <div className="listing-details">
        <h2>About this space</h2>
        <p>{listing.description}</p>

        <div className="amenities">
          {listing.amenities.split(',').map((amenity, index) => (
            <div className="amenity" key={index}>
              <i className="icon"></i>
              <span>{amenity}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pricing-booking">
        <div className="pricing">${listing.price} per night</div>
        <button className="booking-button">Book Now</button>
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
