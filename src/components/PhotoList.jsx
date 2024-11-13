import Photo from "./Photo";
import NoPhotos from "./NoPhotos";



const PhotoList = ({data, title}) => {
    // Converted into a tenary
    const photos = data.length > 0 ? data.map((photo) => <Photo key={photo.id} photo={photo} />) : <NoPhotos />
    return (
        <div className="photo-container">
            <h2>{title}</h2>
            <ul>
            {photos}
            </ul>
        </div>
    );
};

export default PhotoList;
