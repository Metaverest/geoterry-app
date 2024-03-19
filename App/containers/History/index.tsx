import { View, FlatList, Text } from 'react-native';
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
import { TouchableOpacity } from 'react-native-gesture-handler';
import { EColor } from 'App/enums/color';
import { EButtonType } from 'App/enums';
import CustomButton from 'App/components/Button';
import { navigateToPopUpModal } from 'App/utils/navigation';

const NUMBER_OF_SKELETONS = 5;

const HistoryScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const terryCheckins = useSelector(reduxSelector.getAppTerryCheckins);
  const loadingStates = useSelector(reduxSelector.getLoadingStates);
  const [isEdit, setIsEdit] = useState(false);
  const [selectItems, setSelectItems] = useState<Record<string, boolean>>({});

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
    <View style={styles.containHistory}>
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
          includeTerryData: true,
        },
        navigation,
      ),
    );
  }, [dispatch, navigation]);

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
          <TouchableOpacity
            onPress={() => {
              setSelectItems({});
              setIsEdit(prev => !prev);
            }}>
            <Text style={styles.headerRightBtn}>{isEdit ? t('Huỷ') : t('Sửa')}</Text>
          </TouchableOpacity>
        }
      />
      {loadingStates?.[ESagaUserAction.GET_TERRY_CHECKINS] || loadingStates?.[ESagaUserAction.DELETE_TERRY_CHECKINS] ? (
        LoadingSkeleton
      ) : (
        <FlatList
          data={terryCheckins}
          renderItem={renderItem}
          style={styles.containHistory}
          ItemSeparatorComponent={ItemSeparatorComponent}
          ListEmptyComponent={ListEmptyComponent}
        />
      )}
      {isEdit && (
        <View style={styles.bottom}>
          <View style={styles.buttonContainer}>
            <CustomButton
              onPress={handlePressDeleteHistory}
              linearGradient={[EColor.color_727BFD, EColor.color_51F1FF]}
              buttonType={EButtonType.SOLID}
              title={t('Xoá')}
              disabled={!Object.values(selectItems).some(val => val === true)}
            />
          </View>
        </View>
      )}
    </CustomSafeArea>
  );
};

export default HistoryScreen;
