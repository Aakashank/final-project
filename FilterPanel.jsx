import React from 'react';
import './FilterPanel.css'; // ← Import the CSS file

const FilterPanel = ({ filters, setFilters, products }) => {
  const categories = [...new Set(products.map(p => p.category))];

  return (
    <div className="filter-panel">
      <label>Category</label>
      <select
        value={filters.category}
        onChange={e => setFilters({ ...filters, category: e.target.value })}
      >
        <option value="">All</option>
        {categories.map(c => <option key={c}>{c}</option>)}
      </select>

      <label>Price Range</label>
      <div className="price-range">
        <input
          type="number"
          value={filters.price[0]}
          onChange={e => setFilters({ ...filters, price: [Number(e.target.value), filters.price[1]] })}
          placeholder="Min"
        />
        <input
          type="number"
          value={filters.price[1]}
          onChange={e => setFilters({ ...filters, price: [filters.price[0], Number(e.target.value)] })}
          placeholder="Max"
        />
      </div>

      <label>Minimum Rating</label>
      <select
        value={filters.rating}
        onChange={e => setFilters({ ...filters, rating: Number(e.target.value) })}
      >
        {[0, 1, 2, 3, 4].map(r => (
          <option key={r} value={r}>{r}+ stars</option>
        ))}
      </select>
    </div>
  );
};

export default FilterPanel;
