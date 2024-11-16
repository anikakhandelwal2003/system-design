import React, { useEffect, useState } from "react";
import "../styles/autoSearch.css"

function AutoCompleteSearch() {
  const [suggestionList, setSuggestionList] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query) {
        search(query);
      } else {
        setSuggestionList([]);
      }
    }, 1000); 
    
    return () => clearTimeout(delayDebounceFn); 
  }, [query]);

  const search = async (query) => {    
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://dummyjson.com/recipes/search?q=${query}`
      );
      if (response.ok) {
        const result = await response.json();
        setSuggestionList(result.recipes || []);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="autocomplete-search">
      <h1>AutoComplete Search</h1>
      <input
        className="search-input"
        placeholder="Enter fruit to search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {isLoading && <p className="loading-text">Loading...</p>}
      {error && <p className="error-text">{error}</p>}
      <ul className="suggestion-list">
        {suggestionList.length > 0 &&
          suggestionList.map((item) => (
            <li key={item.id} className="suggestion-item">
              {item.name}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default AutoCompleteSearch;
