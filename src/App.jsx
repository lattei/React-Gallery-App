import { useEffect, useState } from 'react';
import apiKey from './config';
import axios from 'axios';
import { Route, Routes, Navigate } from 'react-router-dom';


//App components
import SearchForm from './components/SearchForm';
import Nav from './components/Nav';
import PhotoList from './components/PhotoList';


function App() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("beach");

  const fetchData = (query) => {
    setLoading(true);
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        console.log('API', response.data.photos);
        /* API response + Loading state */
        setPhotos(response.data.photos.photo);
        setLoading(false);
        setQuery(query);

      })
      .catch(error =>  {
        console.log(error, "There's been an error getting your photos..");
        setLoading(false);
      }); 
  };

  useEffect(() => {
    fetchData(query);
  }, [query]);

  return (
    <div className="container">
      <SearchForm onSearch={fetchData} />
      <Nav />
      <Routes>
        <Route path="/" element={<Navigate to="/dogs" />} />
        <Route path="/dogs" element={<PhotoList title="Dogs"  data={photos} />}/>
        <Route path="/cats" element={<PhotoList title="Cats" data={photos}/>}/>
        <Route path="/beach" element={<PhotoList title="Beach"  data={photos} />}/>
        <Route path="/search/:query" element={<PhotoList title="Results" data={photos} />}/>
      </Routes>
    </div>
  );
}

export default App;
