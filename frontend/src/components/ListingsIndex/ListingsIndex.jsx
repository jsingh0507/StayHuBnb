import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchListings } from "../../store/listings";
import { Link } from "react-router-dom";
import './ListingsIndex.css'

const ListingsIndex = () => {
    const dispatch = useDispatch();
    const listings = useSelector((state) => Object.values(state.listings));

    useEffect(() => {
        dispatch(fetchListings());
    }, [dispatch]);

    const generateRandomMiles = () => {
        return Math.floor(Math.random() * (50 - 2 + 1)) + 2;
    };

    const generateRandomRating = () => {
        return (Math.floor(Math.random() * (500 - 400 + 1)) + 400) / 100;
    };

    const generateRandomDateRange = () => {
        const startDay = Math.floor(Math.random() * 31) + 1; // Random day between 1 and 31
        const endDay = Math.min(startDay + Math.floor(Math.random() * (31 - startDay + 1)), 31); // Random day between startDay and 31
        return `Jun ${startDay}-${endDay}`;
    };

    return (
        <div className="listings-container">
            <ul className="listings-grid">
                {listings.map((listing) => (
                    <li key={listing.id} className="listing-card">
                        <Link to={`/${listing.id}`} className="listing-link">
                        <img 
                            src={`${listing?.photoUrl}`} 
                            alt={listing.title} 
                            className="listing-image"
                        />
                        <div className="listing-info">
                            <p className="listing-title">{listing.address}</p> 
                            <p className="listing-miles">{generateRandomMiles()} miles away</p>
                            <p className="listing-date">{generateRandomDateRange()}</p> 
                            <p className="listing-rating">&#9733; {generateRandomRating().toFixed(2)}</p>
                            {/* <p className="listing-price">$<span className="price-value">{listing.price/10}</span> night</p> */}
                            <p className="listing-price">
                                    <span className="price-value">${listing.price/1}</span> 
                                    <span className="per-night"> night</span>
                            </p>
                        </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ListingsIndex;