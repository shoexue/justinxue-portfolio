import React from 'react';
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const Image = ({ data, alt = "" }) => {
  const image = getImage(data);
  
  if (!image) return null;
  
  return (
    <GatsbyImage 
      image={image} 
      alt={alt} 
    />
  );
};

export default Image; 