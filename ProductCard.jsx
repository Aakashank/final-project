import React from 'react';
import './ProductCard.css'; 


const ProductCard = ({ product, isWishlisted, toggleWishlist }) => (
  <div className="card">
    <img src={product.image} alt={product.title} />
    <h3>{product.title}</h3>
    <p>{product.category}</p>
    <p><strong>₹{product.price}</strong></p>
    <p>⭐ {product.rating?.rate}</p>
    <button
      onClick={toggleWishlist}
      className={isWishlisted ? 'remove' : ''}
    >
      {isWishlisted ? '💔 Remove from Wishlist' : '❤️ Add to Wishlist'}
    </button>
  </div>
);

export default ProductCard;
