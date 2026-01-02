import './SortControls.css'; // ← Add this at the top

const SortControls = ({ displayed, setDisplayed }) => {
  const sort = (type) => {
    let sorted = [...displayed];
    if (type === 'priceAsc') sorted.sort((a, b) => a.price - b.price);
    if (type === 'priceDesc') sorted.sort((a, b) => b.price - a.price);
    if (type === 'rating') sorted.sort((a, b) => b.rating.rate - a.rating.rate);
    if (type === 'nameAsc') sorted.sort((a, b) => a.title.localeCompare(b.title));
    if (type === 'nameDesc') sorted.sort((a, b) => b.title.localeCompare(a.title));
    setDisplayed(sorted);
  };

  return (
    <div className="sort-buttons">
      <button onClick={() => sort('priceAsc')}>Price ↑</button>
      <button onClick={() => sort('priceDesc')}>Price ↓</button>
      <button onClick={() => sort('rating')}>Rating</button>
      <button onClick={() => sort('nameAsc')}>A-Z</button>
      <button onClick={() => sort('nameDesc')}>Z-A</button>
    </div>
  );
};

export default SortControls;
