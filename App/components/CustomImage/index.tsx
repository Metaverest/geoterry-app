import React, { useState } from 'react';
import { Image, ImageProps } from 'react-native';

interface FallbackImageProps extends Omit<ImageProps, 'source'> {
  imageUrl: string;
  fallbackUrl: string;
}

const FallbackImage: React.FC<FallbackImageProps> = ({ imageUrl, fallbackUrl, ...otherProps }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return <Image {...otherProps} source={{ uri: imageError ? fallbackUrl : imageUrl }} onError={handleImageError} />;
};

export default FallbackImage;
