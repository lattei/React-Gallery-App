import React, { useState, useEffect } from 'react'
import apiKey from './config';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';


//App components
import SearchForm from './components/SearchForm';
// import Nav from './components/Nav';
import Photo from './components/Photo';
import PhotoList from './components/PhotoList';


function App() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("dogs");

  const fetchData = (query) => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        /* API response + Loading state */
        setPhotos(response.data.photos.photo);
        setLoading(false);

      })
      .catch(error =>  {
        console.log(error, "There's been an error getting your photos..");
        setLoading(false);
      }); 
  };

const handleQueryChange = searchText => {
  setQuery(searchText);
}

  return (
    <div className="container">
      <SearchForm changeQuery={handleQueryChange} />
      {(loading) ? <p>Loading...</p> : <PhotoList data={photos} />}
      <Routes>
        <Route path="/" element={} />
        <Route path="/dogs" element={} />
        <Route path="/cats" element={} />
        <Route path="/beach" element={} />
        <Route path="/search/:query" element={} />
      </Routes>
    </div>
  );
}

export default App
