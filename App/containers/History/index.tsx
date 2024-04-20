import { View, FlatList, Text, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import CustomSafeArea from 'App/components/CustomSafeArea';
import { AppBackgroundImage, UploadFileFailedImage } from 'App/components/image';
import Header from 'App/components/Header';
import { useTranslation } from 'react-i18next';
import ItemHistory from 'App/components/ItemHistory';
import { styles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { reduxSelector } from 'App/redux/selectors';
import { sagaUserAction } from 'App/redux/actions/userAction';
import { IResponseTerryCheckins } from 'App/types/terry';
import { ESagaUserAction } from 'App/enums/redux';
import CustomText from 'App/components/CustomText';
import { EColor } from 'App/enums/color';
import { EButtonType } from 'App/enums';
import CustomButton from 'App/components/Button';
import { navigateToPopUpModal } from 'App/utils/navigation';
import { isEmpty } from 'lodash';
import { requestHunterFilterTerryCheckins } from 'App/utils/axios';
import { CHECKIN_HISTORY_PAGINATION_PAGE_SIZE } from 'App/constants/common';
import { reduxAppAction } from 'App/redux/actions/appAction';
import { responsiveByWidth as rw } from 'App/helpers/common';
import useBoolean from 'App/hooks/useBoolean';

const NUMBER_OF_SKELETONS = 5;

const HistoryScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const terryCheckins = useSelector(reduxSelector.getAppTerryCheckins);
  const loadingStates = useSelector(reduxSelector.getLoadingStates);
  const user = useSelector(reduxSelector.getUser);
  const [isEdit, setIsEdit] = useState(false);
  const [selectItems, setSelectItems] = useState<Record<string, boolean>>({});
  const [callOnScrollEnd, triggerCallOnScrollEnd, preventCallOnScrollEnd] = useBoolean(false);
  const [loadMore, setLoadMore] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);

  const onRefresh = useCallback(() => {
    preventCallOnScrollEnd();
    setRefresh(true);
    setPageNumber(1);
    dispatch(
      sagaUserAction.filterTerryCheckinsAsyns(
        {},
        {
          page: 1,
          pageSize: CHECKIN_HISTORY_PAGINATION_PAGE_SIZE,
          includeTerryData: true,
        },
        navigation,
      ),
    );
  }, [dispatch, navigation, preventCallOnScrollEnd]);

  useEffect(() => {
    if (refresh) {
      setRefresh(false);
    }
    if (firstLoad && !isEmpty(terryCheckins)) {
      setFirstLoad(false);
    }
    // set refresh to false when chats are updated
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [terryCheckins]);

  const onEndReached = useCallback(async () => {
    if (callOnScrollEnd) {
      try {
        setLoadMore(true);
        const response = await requestHunterFilterTerryCheckins(
          {},
          {
            page: pageNumber + 1,
            pageSize: CHECKIN_HISTORY_PAGINATION_PAGE_SIZE,
            includeTerryData: true,
          },
          user.id,
        );
        if (!isEmpty(response)) {
          dispatch(reduxAppAction.mergeTerryCheckins(response));
          setPageNumber(pageNumber + 1);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoadMore(false);
        preventCallOnScrollEnd();
      }
    }
  }, [callOnScrollEnd, dispatch, pageNumber, preventCallOnScrollEnd, user.id]);

  const renderItem = useCallback(
    ({ item }: { item: IResponseTerryCheckins }) => {
      return (
        <ItemHistory
          {...item}
          isEditMode={isEdit}
          isSelected={selectItems[item.id]}
          onPress={
            isEdit
              ? () => {
                  setSelectItems(prev => ({ ...prev, [item.id]: !prev[item.id] }));
                }
              : undefined
          }
        />
      );
    },
    [isEdit, selectItems],
  );
  const ItemSeparatorComponent = useCallback(() => {
    return <View style={styles.separator} />;
  }, []);

  const ListEmptyComponent = useCallback(() => {
    return <CustomText style={styles.textEmpty}>{t('Bạn chưa tìm thấy kho báu nào cả!')}</CustomText>;
  }, [t]);

  const LoadingSkeleton = (
    <View style={[styles.containHistory, { marginHorizontal: rw(25) }]}>
      {Array.from({ length: NUMBER_OF_SKELETONS }).map((_, index) => (
        <ItemHistory key={`loading_${index}`} isLoading />
      ))}
    </View>
  );

  useEffect(() => {
    dispatch(
      sagaUserAction.filterTerryCheckinsAsyns(
        {},
        {
          page: pageNumber,
          pageSize: CHECKIN_HISTORY_PAGINATION_PAGE_SIZE,
          includeTerryData: true,
        },
        navigation,
      ),
    );
    // This hook only be executed when mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePressDeleteHistory = useCallback(() => {
    const selectedIds = Object.keys(selectItems).filter(key => selectItems[key]);

    navigateToPopUpModal(navigation, {
      title: t('Xác nhận'),
      subtitle: t('Bạn có chắn chắn muốn xoá lịch sử không?'),
      image: UploadFileFailedImage,
      confirmButtonTitle: t('Xoá'),
      cancelButtonTitle: t('Huỷ'),
      onConfirm: () => {
        dispatch(sagaUserAction.deleteTerryCheckinsAsync(selectedIds, navigation));
        setIsEdit(false);
      },
    });
  }, [dispatch, navigation, selectItems, t]);

  return (
    <CustomSafeArea style={styles.container} backgroundImageSource={AppBackgroundImage}>
      <Header
        title={t('Lịch sử')}
        rightButton={
          !isEmpty(terryCheckins) ? (
            <TouchableOpacity
              onPress={() => {
                setSelectItems({});
                setIsEdit(prev => !prev);
              }}>
              <Text style={styles.headerRightBtn}>{isEdit ? t('Huỷ') : t('Sửa')}</Text>
            </TouchableOpacity>
          ) : undefined
        }
      />
      {(loadingStates?.[ESagaUserAction.GET_TERRY_CHECKINS] ||
        loadingStates?.[ESagaUserAction.DELETE_TERRY_CHECKINS]) &&
      firstLoad ? (
        LoadingSkeleton
      ) : (
        <FlatList
          refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refresh} />}
          data={terryCheckins}
          renderItem={renderItem}
          style={styles.containHistory}
          ItemSeparatorComponent={ItemSeparatorComponent}
          ListEmptyComponent={ListEmptyComponent}
          showsVerticalScrollIndicator={false}
          scrollEnabled
          onMomentumScrollBegin={onEndReached}
          onEndReached={triggerCallOnScrollEnd}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loadMore ? <ActivityIndicator size={rw(50)} color={EColor.white} animating={loadMore} /> : null
          }
        />
      )}
      {isEdit && (
        <View style={styles.bottom}>
          <View style={styles.buttonContainer}>
            <CustomButton
              onPress={handlePressDeleteHistory}
              linearGradient={[EColor.color_727BFD, EColor.color_51F1FF]}
              buttonType={EButtonType.SOLID}
              title={`${t('Xoá')} (${Object.values(selectItems).filter(selected => selected).length})`}
              disabled={!Object.values(selectItems).some(val => val === true)}
            />
          </View>
        </View>
      )}
    </CustomSafeArea>
  );
};

export default HistoryScreen;
