import React, { useState } from 'react';
import axios from 'axios';

const SearchCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [centers, setCenters] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.post('http://localhost:8000/bookings/user/search_centers/', { search_query: searchQuery });
      setCenters(response.data);
    } catch (error) {
      console.error('Search centers error:', error);
    }
  };

  return (
    <div>
      <h2>Search Centers</h2>
      <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search Query" />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {centers.map((center) => (
          <li key={center.id}>{center.name} - {center.working_hours}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchCenter;
