export const getWishlist = () => {
  const data = localStorage.getItem('wishlist');
  return data ? JSON.parse(data) : [];
};

export const saveWishlist = (wishlist) => {
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
};
