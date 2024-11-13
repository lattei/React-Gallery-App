import React from "react";
import Photo from "./Photo";
import NoPhotos from "./NoPhotos";



const PhotoList = ({data, title}) => {
    let photos;
    if (data.length > 0) {
        photos = data.map(photo =>
        <Photo key= {photo.id} photo= {photo} />);
    } else {
        photos = <NoPhotos />
    }
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
