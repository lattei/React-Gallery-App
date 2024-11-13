import React from "react";

const Photo = ({ photo }) => {
    
    const url = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;

    return (
        <li>
            <img src= {url} alt= {photo.title} />
        </li>
    );
};

export default Photo;

/* What a url is supposed to look like
 <li>
            <img src="https://farm5.staticflickr.com/4334/37032996241_4c16a9b530.jpg" alt="" />
          </li>
*/