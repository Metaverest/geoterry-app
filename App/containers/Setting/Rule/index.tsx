import CustomSafeArea from 'App/components/CustomSafeArea';
import CustomText from 'App/components/CustomText';
import Header from 'App/components/Header';
import ItemSelectorSetting, { IItemSelectorSettingProps } from 'App/components/ItemSelectorSetting';
import { AppBackgroundImage } from 'App/components/image';
import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { reduxSelector } from 'App/redux/selectors';
import { EUserRole, ETitleUserRole, EUseRoleRequestStatus } from 'App/enums';
import ModalReasonRequestRole from './ModalReasonRequestRole';
import { useNavigation } from '@react-navigation/native';
import { EMainGameNavigatorParams, ESettingNavigator } from 'App/enums/navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { sagaUserAction } from 'App/redux/actions/userAction';

const RuleScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<StackNavigationProp<EMainGameNavigatorParams, ESettingNavigator.RULE_SCREEN>>();
  const dispatch = useDispatch();
  const user = useSelector(reduxSelector.getUser);
  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(user.role);
  const [reason, setReason] = useState('');

  const options: IItemSelectorSettingProps[] = useMemo(() => {
    return [
      {
        title: t(ETitleUserRole.HUNTER),
        isSelected: selectedRole === EUserRole.hunter,
        onPress: () => {
          if (selectedRole !== EUserRole.hunter) {
            setSelectedRole(EUserRole.hunter);
          }
        },
      },
      {
        title: t(ETitleUserRole.BUILDER),
        isSelected: selectedRole === EUserRole.builder,
        onPress: () => {
          if (selectedRole !== EUserRole.builder) {
            setSelectedRole(EUserRole.builder);
          }
        },
      },
    ] as IItemSelectorSettingProps[];
  }, [t, selectedRole]);

  const hanldeSubmitRole = useCallback(() => {
    if (selectedRole === EUserRole.builder) {
      setShowModal(true);
    } else {
      dispatch(sagaUserAction.switchRoleUserAsync(EUserRole.hunter, reason, navigation));
    }
  }, [dispatch, navigation, reason, selectedRole]);

  const RightButton = useCallback(() => {
    const isSelectedNewRole =
      selectedRole !== user.role ||
      (selectedRole === user.role &&
        user.roleRequestingStatus &&
        user.roleRequestingStatus !== EUseRoleRequestStatus.ACCEPTED);
    return (
      <TouchableOpacity disabled={!isSelectedNewRole} onPress={hanldeSubmitRole}>
        <CustomText numberOfLines={1} style={[styles.saveText, isSelectedNewRole && styles.saveTextHighlight]}>
          {t('Lưu')}
        </CustomText>
      </TouchableOpacity>
    );
  }, [hanldeSubmitRole, selectedRole, t, user.role, user.roleRequestingStatus]);

  return (
    <CustomSafeArea style={styles.container} backgroundImageSource={AppBackgroundImage}>
      <Header rightButton={<RightButton />} title={t('Vai trò')} />
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
        onSubmit={() => {
          setShowModal(false);
          dispatch(sagaUserAction.switchRoleUserAsync(EUserRole.builder, reason, navigation));
        }}
      />
    </CustomSafeArea>
  );
};

export default RuleScreen;
