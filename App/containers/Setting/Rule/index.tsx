import CustomSafeArea from 'App/components/CustomSafeArea';
import CustomText from 'App/components/CustomText';
import Header from 'App/components/Header';
import ItemSelectorSetting, { IItemSelectorSettingProps } from 'App/components/ItemSelectorSetting';
import { AppBackgroundImage, FoundProfileImage, NoteImage } from 'App/components/image';
import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { reduxSelector } from 'App/redux/selectors';
import { requestSwitchRole, requestUserReadProfile } from 'App/utils/axios';
import { ROLE_USER, STATUS_ROLE_REQUESTING } from 'App/enums';
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
  const [roleSelect, setRoleSelect] = useState<ROLE_USER>(user.role);
  const [reason, setReason] = useState('');

  const handleSave = useCallback(async () => {}, []);
  const RightButton = useCallback(() => {
    return (
      <TouchableOpacity onPress={handleSave}>
        <CustomText numberOfLines={1} style={styles.saveText}>
          {t('Lưu')}
        </CustomText>
      </TouchableOpacity>
    );
  }, [t, handleSave]);

  const options: IItemSelectorSettingProps[] = useMemo(() => {
    return [
      {
        title: t('Hunter'),
        isSelected: user.role === ROLE_USER.hunter,
        onPress: () => {
          setRoleSelect(ROLE_USER.hunter);
          setShowModal(true);
        },
      },
      {
        title: t('Builder'),
        isSelected: user.role === ROLE_USER.builder,
        onPress: () => {
          setRoleSelect(ROLE_USER.builder);
          setShowModal(true);
        },
      },
    ] as IItemSelectorSettingProps[];
  }, [t, user.role]);

  const handleSubmit = () => {
    setShowModal(false);
    navigation.dispatch(StackActions.push(ENavigationScreen.LOADING_MODAL));
    requestSwitchRole(roleSelect, reason).then(({ status }) => {
      requestUserReadProfile().then(res => {
        dispatch(reduxUserAction.setUser(res));
        navigation.dispatch(StackActions.pop());
        switch (status) {
          case STATUS_ROLE_REQUESTING.PENDING:
            navigation.dispatch(
              StackActions.push(ENavigationScreen.POPUP_SCREEN, {
                image: NoteImage,
                title: t('Đang gửi xét duyệt'),
                subtitle: t('Admin đang xét duyệt hồ sơ của bạn'),
                confirmButtonTitle: t('Đã hiểu'),
              }),
            );
            break;
          case STATUS_ROLE_REQUESTING.ACCEPTED:
            navigation.dispatch(
              StackActions.push(ENavigationScreen.POPUP_SCREEN, {
                image: FoundProfileImage,
                title: t('Xét duyệt thành công'),
                subtitle: t('Hồ sơ của bạn đã được xét duyệt để trở thành Builder. Đến giao diện mới ngay!'),
                confirmButtonTitle: t('Tiếp tục'),
              }),
            );
            break;
          default:
            return;
        }
      });
    });
  };

  return (
    <CustomSafeArea style={styles.container} backgroundImageSource={AppBackgroundImage}>
      <Header title={t('Vai trò')} rightButton={<RightButton />} />
      <CustomText style={styles.chooseRuleTitle}>{t('Lựa chọn vai trò người chơi')}</CustomText>
      <View style={styles.listItemContainer}>
        {options?.map((item, index) => (
          <View style={styles.itemSelectorContainer} key={index}>
            <ItemSelectorSetting
              disabled={item.isSelected}
              title={item.title}
              isSelected={item.isSelected}
              onPress={item.onPress}
              status={item.title === 'Builder' ? user.roleRequestingStatus : undefined}
            />
          </View>
        ))}
      </View>
      <ModalReasonRequestRole
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        reason={reason}
        setReason={setReason}
        onSubmit={handleSubmit}
      />
    </CustomSafeArea>
  );
};

export default RuleScreen;
