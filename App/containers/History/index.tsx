import { View, FlatList } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
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

  const [page, setPage] = useState(1);
  const scroll = useRef(false);

  const renderItem = useCallback(({ item }: { item: IResponseTerryCheckins }) => {
    return <ItemHistory {...item} />;
  }, []);
  const ItemSeparatorComponent = useCallback(() => {
    return <View style={styles.separator} />;
  }, []);
  const ListEmptyComponent = useCallback(() => {
    return <CustomText style={styles.textEmpty}>{t('Bạn chưa tìm thấy kho báu nào cả!')}</CustomText>;
  }, [t]);

  console.log(page);
  const onEndReached = useCallback(() => {
    console.log('ccc');
    if (scroll.current) {
      setPage(page + 1);
    }
    scroll.current = false;
  }, [page]);

  useEffect(() => {
    dispatch(
      sagaUserAction.filterTerryCheckinsAsyns(
        {},
        {
          page,
          pageSize: 10,
          includeTerryData: true,
        },
        navigation,
      ),
    );
  }, [dispatch, navigation, page]);

  return (
    <CustomSafeArea style={styles.container} backgroundImageSource={AppBackgroundImage}>
      <Header title={t('Lịch sử')} />
      <FlatList
        data={terryCheckins}
        renderItem={renderItem}
        style={styles.containHistory}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListEmptyComponent={ListEmptyComponent}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        onMomentumScrollBegin={() => {
          scroll.current = true;
        }}
      />
    </CustomSafeArea>
  );
};

export default HistoryScreen;
