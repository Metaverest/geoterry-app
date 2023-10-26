import { View, FlatList } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import CustomSafeArea from 'App/components/CustomSafeArea';
import { AppBackgroundImage } from 'App/components/image';
import Header from 'App/components/Header';
import { useTranslation } from 'react-i18next';
import ItemHistory from 'App/components/ItemHistory';
import { styles } from './styles';
import CustomText from 'App/components/CustomText';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { reduxSelector } from 'App/redux/selectors';
import { sagaUserAction } from 'App/redux/actions/userAction';
import { IResponseTerryCheckins } from 'App/types/terry';

const HistoryScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const terryCheckins = useSelector(reduxSelector.getAppTerryCheckins);

  const renderItem = useCallback(({ item }: { item: IResponseTerryCheckins }) => {
    return <ItemHistory {...item} />;
  }, []);
  const ItemSeparatorComponent = useCallback(() => {
    return <View style={styles.separator} />;
  }, []);
  const ListEmptyComponent = useCallback(() => {
    return <CustomText style={styles.textEmpty}>{t('Bạn chưa tìm thấy kho báu nào cả!')}</CustomText>;
  }, [t]);

  useEffect(() => {
    dispatch(
      sagaUserAction.filterTerryCheckinsAsyns(
        {},
        {
          includeTerryData: true,
        },
        navigation,
      ),
    );
  }, [dispatch, navigation]);

  return (
    <CustomSafeArea style={styles.container} backgroundImageSource={AppBackgroundImage}>
      <Header title={t('Lịch sử')} />
      <FlatList
        data={terryCheckins}
        renderItem={renderItem}
        style={styles.containHistory}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListEmptyComponent={ListEmptyComponent}
      />
    </CustomSafeArea>
  );
};

export default HistoryScreen;
