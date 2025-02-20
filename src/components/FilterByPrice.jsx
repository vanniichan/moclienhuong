import React, { useState } from "react";

const FilterByPrice = ({ filterProductsByPrice }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(200000);

  const handleFilter = () => {
    filterProductsByPrice(minPrice, maxPrice);
  };

  return (
    <div className="">
      <h5>Filter by Price</h5>
      <div className="d-flex justify-content-between">
        <span>Min: {minPrice}</span>
        <span>Max: {maxPrice}</span>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <input
          type="range"
          className="form-range price-range"
          min="0"
          max="200000"
          step="10"
          value={minPrice}
          onChange={(e) => setMinPrice(Number(e.target.value))}
        />
        <input
          type="range"
          className="form-range price-range"
          min="0"
          max="200000"
          step="10"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
        />
      </div>
      <button className="btn btn-primary btn-sm mt-3" onClick={handleFilter}>
        Apply Filter
      </button>
    </div>
  );
};

export default FilterByPrice;

