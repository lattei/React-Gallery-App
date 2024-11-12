import React, { useState, useEffect } from 'react'
import apiKey from './config';
import axios from 'axios';

//App components
import Search from './components/Search';
import Nav from './components/Nav';
import Photo from './components/Photo';
import PhotoList from './components/PhotoList';


function App() {
  const [photos, setPhotos] = useState([])

  const fetchData = (query) => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        setPhotos(response.data.photos.photo);
      })
      .catch(error =>  {
        console.log(error, "There's been an error getting your photos..");
      }); 
  };

  return (
    <div className="container">
      <Search onSearch={fetchData} />
      <Nav />
      <Routes>
        
      </Routes>

    </div>
  );
}

export default App
