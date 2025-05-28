import React from 'react';
import '../Styles/Filter.css';

const FilterNavbar: React.FC = () => {

  return (
    <nav className="filter-wrapper">
      <ul className="filter-nav">
        <li className="filter-item">Coding</li>
        <li className="filter-item">Engineering</li>
        <li className="filter-item">Food</li>
        <li className="filter-item">LifeStyle</li>
        <li className="filter-item">Technology</li>
      </ul>
    </nav>
  );
};

export default FilterNavbar;