import React, { useState } from 'react';
import '../Styles/Filter.css';

const FilterNavbar: React.FC = () => {
  const [showMore, setShowMore] = useState(false);
  const items = ['Education', 'Tech', 'Skill', 'Health', 'Fitness', 'Finance', 'Science', 'Travel', 'Food', 'Art'];

  return (
    <nav className="filter_bar">
      <div className="filter_wrapper">
        <ul className="filter_ul">
          {(showMore ? items : items.slice(0, 3)).map((item, i) => (
            <li className="filter_item" key={i}>{item}</li>
          ))}
          <li
            className="filter_item show_switch"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? 'Show Less' : 'Show More'}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default FilterNavbar;
