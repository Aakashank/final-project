import React, { useEffect, useState } from 'react';
import ProductCard from './components/ProductCard';
import FilterPanel from './components/FilterPanel';
import SearchBar from './components/SearchBar';
import SortControls from './components/SortControls';
import { getWishlist, saveWishlist } from './utils/localStorage';
import './style.css';


const App = () => {
  const [products, setProducts] = useState([]);
  const [displayed, setDisplayed] = useState([]);
  const [filters, setFilters] = useState({ category: '', price: [0, 1000], rating: 0 });
  const [search, setSearch] = useState('');
  const [wishlist, setWishlist] = useState(getWishlist());
  const [loading, setLoading] = useState(true);
  const [showWishlist, setShowWishlist] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const PRODUCTS_PER_PAGE = 6;

  useEffect(() => {
    setLoading(true);
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setDisplayed(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    saveWishlist(wishlist);
  }, [wishlist]);

  useEffect(() => {
    let filtered = products.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase()) &&
      (filters.category ? p.category === filters.category : true) &&
      p.price >= filters.price[0] &&
      p.price <= filters.price[1] &&
      p.rating?.rate >= filters.rating
    );

    if (showWishlist) {
      filtered = filtered.filter(p => wishlist.includes(p.id));
    }

    setDisplayed(filtered);
    setCurrentPage(1); // reset to first page
  }, [search, filters, products, wishlist, showWishlist]);

  const toggleWishlist = id => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(wid => wid !== id) : [...prev, id]
    );
  };

  const clearFilters = () => {
    setFilters({ category: '', price: [0, 1000], rating: 0 });
    setSearch('');
  };

  // Pagination Logic
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const paginatedProducts = displayed.slice(startIndex, endIndex);
  const totalPages = Math.ceil(displayed.length / PRODUCTS_PER_PAGE);

  return (
    <div className="container">
      <h1>🛍️ Product Catalogue</h1>

      <div className="controls">
        <SearchBar value={search} onChange={setSearch} />
        <SortControls displayed={displayed} setDisplayed={setDisplayed} />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={() => setShowWishlist(!showWishlist)}>
            {showWishlist ? '🔁 Show All Products' : '❤️ Show Wishlist'}
          </button>
          <button onClick={clearFilters}>❌ Clear All Filters</button>
        </div>
      </div>

      <div className="main">
        <div className="sidebar">
          <FilterPanel filters={filters} setFilters={setFilters} products={products} />
        </div>

        <div className="products">
          {loading ? (
            <p>Loading products...</p>
          ) : paginatedProducts.length === 0 ? (
            <p>No products found.</p>
          ) : (
            paginatedProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlist.includes(product.id)}
                toggleWishlist={() => toggleWishlist(product.id)}
              />
            ))
          )}
        </div>
      </div>

      {!loading && totalPages > 1 && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              style={{
                margin: '0 5px',
                padding: '5px 10px',
                backgroundColor: currentPage === i + 1 ? '#1976d2' : '#eee',
                color: currentPage === i + 1 ? 'white' : 'black',
                border: 'none',
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
