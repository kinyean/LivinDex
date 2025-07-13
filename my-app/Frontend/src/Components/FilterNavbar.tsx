import React, { useState } from 'react';
import '../Styles/Filter.css';
import { Props } from '../Types/FilterNavbar';


const FilterNavbar: React.FC<Props> = ({ selectedTags, setSelectedTags }) => {
  const [showMore, setShowMore] = useState(false);
  const items = ['Education', 'Tech', 'Skill', 'Health', 'Fitness', 'Finance', 'Science', 'Travel', 'Food', 'Art'];

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <nav className="filter_bar">
      <div className="filter_wrapper">
        <ul className="filter_ul">
          {(showMore ? items : items.slice(0, 3)).map((item, i) => (
            <li
              className={`filter_item ${selectedTags.includes(item) ? 'active' : ''}`}
              key={i}
              onClick={() => toggleTag(item)}
            >
              {item}
            </li>
          ))}
          <li className="filter_item show_switch" onClick={() => setShowMore(!showMore)}>
            {showMore ? 'Show Less' : 'Show More'}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default FilterNavbar;
