import React from "react";
import "./Filter.css";

export default function Filter({ filters, setFilters }) {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      minPrice: "",
      maxPrice: "",
      rating: "",
      sort: "",
    });
  };

  return (
    <div className="filter-container">
      <div className="filter-header">
        <h2>Filter</h2>
        <button onClick={clearFilters}>Clear</button>
      </div>

      <div className="filter-content">
        <div className="filter-section">
          <h3>Price:</h3>
          <div className="price-inputs">
            <input
              type="number"
              name="minPrice"
              placeholder="Min"
              value={filters.minPrice}
              onChange={handleFilterChange}
            />
            <span>-</span>
            <input
              type="number"
              name="maxPrice"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={handleFilterChange}
            />
          </div>
        </div>

        <div className="filter-section">
          <h3>Rating:</h3>
          <div className="filter-options">
            <label>
              <input
                type="radio"
                name="rating"
                value=""
                checked={filters.rating === ""}
                onChange={handleFilterChange}
              />
              Any
            </label>
            <label>
              <input
                type="radio"
                name="rating"
                value="5"
                checked={filters.rating === "5"}
                onChange={handleFilterChange}
              />
              5★
            </label>
            {[4, 3, 2, 1].map((rating) => (
              <label key={rating}>
                <input
                  type="radio"
                  name="rating"
                  value={rating}
                  checked={filters.rating === rating.toString()}
                  onChange={handleFilterChange}
                />
                {rating}+★
              </label>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h3>Sort:</h3>
          <div className="filter-options">
            <label>
              <input
                type="radio"
                name="sort"
                value=""
                checked={filters.sort === ""}
                onChange={handleFilterChange}
              />
              Default
            </label>
            <label>
              <input
                type="radio"
                name="sort"
                value="price-asc"
                checked={filters.sort === "price-asc"}
                onChange={handleFilterChange}
              />
              Price ↑
            </label>
            <label>
              <input
                type="radio"
                name="sort"
                value="price-desc"
                checked={filters.sort === "price-desc"}
                onChange={handleFilterChange}
              />
              Price ↓
            </label>
            <label>
              <input
                type="radio"
                name="sort"
                value="rating-desc"
                checked={filters.sort === "rating-desc"}
                onChange={handleFilterChange}
              />
              Top Rated
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
