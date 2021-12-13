import React, { useRef, useState } from "react";

import SearchResult from "../../components/search-result/SearchResult";

let debounceTimeout;

export default function Search() {
  const searchInput = useRef(null);
  const [searchResults, setSearchResults] = useState([]);

  searchInput.current?.focus();

  async function searchMovies(searchTerm) {
    const resp = await fetch(
      `http://www.omdbapi.com/?apikey=dde3f76d&t=${searchTerm}y&plot=full`
    );
    const json = await resp.json();
    const { results } = json;

    setSearchResults(results || []);
  }

  return (
    <div className='route-Search'>
      <h2 className='route-Search__page-title'>Search for Movie by Title</h2>

      <input
        ref={searchInput}
        placeholder='Movie title'
        onInput={(ev) => {
          clearTimeout(debounceTimeout);

          debounceTimeout = setTimeout(() => {
            searchMovies(ev.target.value);
          }, 250);
        }}
      />

      {!!searchResults.length &&
        searchResults.map((searchResult, i) => (
          <SearchResult searchResult={searchResult} key={i} />
        ))}
    </div>
  );
}
