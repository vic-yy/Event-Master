import React from 'react';

interface FiltersProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ activeCategory, setActiveCategory }) => {
  const categories = ['All','DCC', 'ICEX', 'CC', 'SI', 'MatComp', 'Eng Sistemas', 'Eng Elétrica'];

  return (
    <div className="filters">
      {categories.map((category) => (
        <button 
          key={category}
          className={activeCategory === category ? 'active' : ''}
          onClick={() => setActiveCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Filters;
