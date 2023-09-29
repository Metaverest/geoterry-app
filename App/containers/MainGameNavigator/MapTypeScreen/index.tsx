import CustomText from 'App/components/CustomText';
import CustomSwipeUpModal from 'App/components/SwipeUpModal';
import { DefaultMap, SatelliteMap } from 'App/components/image';
import { EMapType } from 'App/enums/map';
import CheckMark from 'App/media/CheckMark';
import { reduxAppAction } from 'App/redux/actions/appAction';
import { reduxSelector } from 'App/redux/selectors';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, View } from 'react-native';
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import { MAP_TYPES } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './styles';

const MapTypeScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const mapType = useSelector(reduxSelector.getAppMapType);
  const onChange = useCallback(
    (type: EMapType) => {
      dispatch(reduxAppAction.setMapType(type));
    },
    [dispatch],
  );
  const renderItem = useCallback(
    ({ item }: { item: EMapType }) => {
      return (
        <TouchableHighlight underlayColor={'transparent'} onPress={() => onChange(item)} style={styles.itemContainer}>
          <>
            <View style={styles.itemImageTitleContainer}>
              <Image
                resizeMode="contain"
                style={styles.itemImage}
                source={item === MAP_TYPES.STANDARD ? DefaultMap : SatelliteMap}
              />
              <CustomText style={styles.itemTitle}>
                {item === MAP_TYPES.STANDARD ? t('Mặc định') : t('Vệ tinh')}
              </CustomText>
            </View>
            {item === mapType && <CheckMark />}
          </>
        </TouchableHighlight>
      );
    },
    [t, onChange, mapType],
  );
  const ItemSeparatorComponent = useCallback(() => {
    return <View style={styles.separator} />;
  }, []);
  return (
    <CustomSwipeUpModal title={t('Bản đồ')}>
      <View style={styles.container}>
        <FlatList
          renderItem={renderItem}
          data={[EMapType.STANDARD, EMapType.SATELLITE]}
          ItemSeparatorComponent={ItemSeparatorComponent}
        />
      </View>
    </CustomSwipeUpModal>
  );
};

export default MapTypeScreen;
