import CustomSafeArea from 'App/components/CustomSafeArea';
import CustomText from 'App/components/CustomText';
import Header from 'App/components/Header';
import ItemSelectorSetting, { IItemSelectorSettingProps } from 'App/components/ItemSelectorSetting';
import { AppBackgroundImage, FoundProfileImage, NoteImage } from 'App/components/image';
import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { styles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { reduxSelector } from 'App/redux/selectors';
import { requestSwitchRole, requestUserReadProfile } from 'App/utils/axios';
import { EUserRole, EUseRoleRequestStatus, ETitleUserRole } from 'App/enums';
import ModalReasonRequestRole from './ModalReasonRequestRole';
import { StackActions, useNavigation } from '@react-navigation/native';
import { EMainGameNavigatorParams, ENavigationScreen, ESettingNavigator } from 'App/enums/navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { reduxUserAction } from 'App/redux/actions/userAction';

const RuleScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<StackNavigationProp<EMainGameNavigatorParams, ESettingNavigator.RULE_SCREEN>>();
  const dispatch = useDispatch();
  const user = useSelector(reduxSelector.getUser);
  const [showModal, setShowModal] = useState(false);
  const [reason, setReason] = useState('');

  const handleSubmit = useCallback(
    (payload: { role: EUserRole }) => {
      setShowModal(false);
      navigation.dispatch(StackActions.push(ENavigationScreen.LOADING_MODAL));
      requestSwitchRole(payload.role, reason).then(({ status }) => {
        requestUserReadProfile().then(res => {
          dispatch(reduxUserAction.setUser(res));
          navigation.dispatch(StackActions.pop());
          switch (status) {
            case EUseRoleRequestStatus.PENDING:
              navigation.dispatch(
                StackActions.push(ENavigationScreen.POPUP_SCREEN, {
                  image: NoteImage,
                  title: t('Đang gửi xét duyệt'),
                  subtitle: t('Admin đang xét duyệt hồ sơ của bạn'),
                  confirmButtonTitle: t('Đã hiểu'),
                }),
              );
              break;
            case EUseRoleRequestStatus.ACCEPTED:
              navigation.dispatch(
                StackActions.push(ENavigationScreen.POPUP_SCREEN, {
                  image: FoundProfileImage,
                  title: t('Xét duyệt thành công'),
                  subtitle:
                    payload.role === EUserRole.builder
                      ? t('Hồ sơ của bạn đã được xét duyệt để trở thành Builder. Đến giao diện mới ngay!')
                      : t('Thay đổi vai trò Hunter thành công'),
                  confirmButtonTitle: t('Tiếp tục'),
                }),
              );
              break;
            default:
              return;
          }
        });
      });
    },
    [dispatch, navigation, reason, t],
  );

  const options: IItemSelectorSettingProps[] = useMemo(() => {
    return [
      {
        title: t(ETitleUserRole.HUNTER),
        isSelected: user.role === EUserRole.hunter,
        onPress: () => {
          handleSubmit({ role: EUserRole.hunter });
        },
      },
      {
        title: t(ETitleUserRole.BUILDER),
        isSelected: user.role === EUserRole.builder,
        onPress: () => {
          setShowModal(true);
        },
      },
    ] as IItemSelectorSettingProps[];
  }, [handleSubmit, t, user.role]);

  return (
    <CustomSafeArea style={styles.container} backgroundImageSource={AppBackgroundImage}>
      <Header title={t('Vai trò')} />
      <CustomText style={styles.chooseRuleTitle}>{t('Lựa chọn vai trò người chơi')}</CustomText>
      <View style={styles.listItemContainer}>
        {options?.map((item, index) => (
          <View style={styles.itemSelectorContainer} key={index}>
            <ItemSelectorSetting
              disabled={item.isSelected || user.roleRequesting === EUserRole.builder}
              title={item.title}
              isSelected={item.isSelected}
              onPress={item.onPress}
              status={item.title === ETitleUserRole.BUILDER ? user.roleRequestingStatus : undefined}
            />
          </View>
        ))}
      </View>
      <ModalReasonRequestRole
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        reason={reason}
        setReason={setReason}
        onSubmit={() => handleSubmit({ role: EUserRole.builder })}
      />
    </CustomSafeArea>
  );
};

export default RuleScreen;
