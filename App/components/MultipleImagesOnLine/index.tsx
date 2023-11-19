import { View, Image, ViewStyle } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native';
import ArrowMaximize from 'App/media/ArrowMaximize';
import CustomText from '../CustomText';
import { styles } from './styles';
import ImageView from 'react-native-image-viewing';
import { ImageSource } from 'react-native-image-viewing/dist/@types';

interface Props {
  images: string[];
  numColumns: number;
  showIconMaximize?: boolean;
  containerImageStyle?: ViewStyle;
  containerItemImageStyle: ViewStyle;
}
const MultipleImagesOnLine = (props: Props) => {
  const [visible, setIsVisible] = useState(false);
  const [listImagesView, setListImagesView] = useState<ImageSource[]>([]);
  const [indexImage, setIndexImage] = useState(0);

  const renderItem = useCallback(
    ({ item, index }: { item: string; index: number }) => {
      return (
        <>
          {index < props.numColumns - 1 ? (
            <TouchableOpacity
              style={props.images.length <= props.numColumns - 1 ? props.containerItemImageStyle : null}
              onPress={() => {
                setIndexImage(index);
                setIsVisible(true);
              }}>
              <Image source={{ uri: item }} style={styles.image} resizeMode="cover" />
              {props.showIconMaximize && <ArrowMaximize style={styles.iconArrowMaximize} />}
            </TouchableOpacity>
          ) : index === props.numColumns - 1 ? (
            <TouchableOpacity
              onPress={() => {
                setIndexImage(index);
                setIsVisible(true);
              }}>
              <Image source={{ uri: item }} style={styles.image} resizeMode="cover" />
              {props.images.length > 6 && (
                <View style={styles.lastImage}>
                  <CustomText style={styles.textLastImage}>+{props.images.length - (props.numColumns - 1)}</CustomText>
                </View>
              )}
            </TouchableOpacity>
          ) : null}
        </>
      );
    },
    [props.containerItemImageStyle, props.images.length, props.numColumns, props.showIconMaximize],
  );
  useEffect(() => {
    setListImagesView(props.images.map(e => ({ uri: e })));
  }, [props.images]);
  return (
    <View style={props.containerImageStyle}>
      <FlatList
        numColumns={props.numColumns}
        data={props.images}
        renderItem={renderItem}
        scrollEnabled={false}
        columnWrapperStyle={props.images.length > 5 ? styles.columnWrapperStyle : null}
      />
      <ImageView
        images={listImagesView}
        keyExtractor={(_, index) => index.toString()}
        imageIndex={indexImage}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    </View>
  );
};

export default MultipleImagesOnLine;
