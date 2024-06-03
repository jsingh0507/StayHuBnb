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

    return (
        <div className="listings-container">
            <ul className="listings-grid">
                {listings.map((listing) => (
                    <li key={listing.id} className="listing-card">
                        <Link to={`/${listing.id}`} className="listing-link">
                        <img 
                            src="https://t3.ftcdn.net/jpg/01/18/46/52/360_F_118465200_0q7Of6UnbA8kDlYEe3a4PuIyue27fbuV.jpg" 
                            alt={listing.title} 
                            className="listing-image"
                        />
                        <div className="listing-info">
                            <p className="listing-title">{listing.title}</p> 
                            <p className="listing-address">{listing.address}</p> 
                            <p className="listing-price">${listing.price} per night</p>
                        </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ListingsIndex;