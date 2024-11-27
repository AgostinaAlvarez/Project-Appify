// components/Buttons/SearchBtn.jsx
import React, { useState } from 'react';
import { CiSearch  } from 'react-icons/ci';
import './SearchBtn.css';
import { GrPowerReset } from "react-icons/gr";
const SearchBtn = ({ onSearch }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleSearchSubmit = () => {
    onSearch(searchTerm);
    setShowSearch(false);
    setSearchTerm('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="search-container">
      {showSearch ? (
        <div className="search-input">
          <CiSearch size={20} style={{ color: "#000" }} />
          <input
            type="text"
            placeholder="Buscar por razón social"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <button onClick={handleClearSearch} className='reset-client-btn'><GrPowerReset/><span>Limpiar</span></button>
        </div>
      ) : (
        <button
          onClick={() => setShowSearch(!showSearch)}
          className="search-btn"
        >
          <CiSearch size={20} style={{ color: "#000" }} />
        </button>
      )}
    </div>
  );
};

export default SearchBtn;
