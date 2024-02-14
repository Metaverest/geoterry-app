import { EImageSize, getResizedImageUrl } from 'App/utils/images';
import React, { useState } from 'react';
import { Image, ImageProps } from 'react-native';

interface CustomImageProps extends Omit<ImageProps, 'source'> {
  imageUrl: string;
  imageSize?: EImageSize;
}

// CustomImage component to handle image resizing and error handling when resized image is not available
const CustomImage: React.FC<CustomImageProps> = ({ imageUrl, imageSize, ...otherProps }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Image
      {...otherProps}
      source={{ uri: imageError ? imageUrl : getResizedImageUrl(imageUrl, imageSize || EImageSize.SIZE_100) }}
      onError={handleImageError}
    />
  );
};

export default CustomImage;
