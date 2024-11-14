import { useEffect, useState } from 'react';
import apiKey from './config';
import axios from 'axios';
import { Route, Routes, Navigate, useLocation, useParams } from 'react-router-dom';


//App components
import SearchForm from './components/SearchForm';
import Nav from './components/Nav';
import PhotoList from './components/PhotoList';
import ErrorHandling from './components/ErrorHandling';



function App() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { query } = useParams();
  console.log("Query:", query);
  

  const fetchData = (query) => {
    setLoading(true);
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        console.log('API', response.data.photos); //Ensuring that I am receiving an array of photos
        /* API response + Loading state */
        setPhotos(response.data.photos.photo);
        setLoading(false);

      })
      .catch(error =>  {
        console.log(error, "There's been an error getting your photos.."); //Do not remove pertaining to error handling
        setPhotos([]);
        setLoading(false);
      }); 
  };

  /* Keeps state of previous searches as well. EE*
  In order to access and populate photos from paths
  Create a dictionary holding pathname to -> query
  fetchdata to said path name
  */
  
  useEffect(() => {
    const pathDict = {
      "/dogs": "dogs",
      "/cats": "cats",
      "/beach": "beach",
    };
    console.log(`Location is now ${location.pathname}`);
    console.log(`Query param: ${query}`);
    setPhotos([]);
     //Making sure that the previous state is cleared out so when users press the back or forward button it works.
    const path = location.pathname;

    if (pathDict[path]) {
      fetchData(pathDict[path]);
    }
    else if (query) {
      
      fetchData(query);
    }
    
  }, [location.pathname, query]);


//Routes created as well as Search Form on display.
  return (
    <div className="container">
      <SearchForm onSearch={fetchData} />
      <Nav />
      <Routes>
        <Route path="/" element={<Navigate to="/dogs" />} />
        <Route path="/dogs" element={ loading ? <p>Loading... please wait</p> : <PhotoList title="Dogs" data={photos} /> }/>
        <Route path="/cats" element={loading ? <p>Loading... please wait</p>:<PhotoList title="Cats" data={photos}/>}/>
        <Route path="/beach" element={loading ? <p>Loading... please wait</p> :<PhotoList title="Beach"  data={photos} />}/>
        <Route path="/search/:query" element={loading ? <p>Loading... please wait</p> :<PhotoList title="Results" data={photos} />}/>
        {/* Exceeds Expectations criteria - 404 */}
        <Route path="*" element={<Navigate replace to="/404" />}/>
        <Route path="/404" element={<ErrorHandling />} />
      </Routes>
    </div>
  );
}

export default App;
