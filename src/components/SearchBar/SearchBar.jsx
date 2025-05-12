import PropTypes from 'prop-types';
import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <form className="d-flex" role="search">
        <input
            type="search"
            placeholder="Search"
            value={ searchTerm }
            onChange={ handleInputChange }
            className="form-control me-2" aria-label="Search"
        />
    </form>
  );
}

export default SearchBar;

SearchBar.propstypes = {
  onSearch: PropTypes.func.isRequired
}
