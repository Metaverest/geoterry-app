import { CommonActions, useNavigation } from '@react-navigation/native';
import CustomSafeArea from 'App/components/CustomSafeArea';
import CustomText from 'App/components/CustomText';
import Header from 'App/components/Header';
import { AppBackgroundImage } from 'App/components/image';
import { EDataStorageKey } from 'App/enums';
import { EColor } from 'App/enums/color';
import { ESettingNavigator } from 'App/enums/navigation';
import AboutIcon from 'App/media/About';
import BatterySaverIcon from 'App/media/BatterySaver';
import KeyIcon from 'App/media/KeyIcon';
import LanguageIcon from 'App/media/LanguageIcon';
import NextIcon from 'App/media/NextIcon';
import RuleIcon from 'App/media/RuleIcon';
import SecurityPolicyIcon from 'App/media/SecurityPolicy';
import VersionUpgradeIcon from 'App/media/VersionUpgrade';
import { getStoredProperty, setPropertyInDevice } from 'App/utils/storage/storage';
import { isEmpty } from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Switch, TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from './styles';
interface IMenuItem {
  title: string;
  subtitle: string;
  onPress: () => void;
  RenderIcon: () => JSX.Element;
  shouldUseSwithButton?: boolean;
  isSwitchEnable?: boolean;
  setIsSwitchEnable?: (value: boolean) => void;
}
const MenuScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const MenuItem = useCallback(
    ({ RenderIcon, onPress, title, subtitle, shouldUseSwithButton, isSwitchEnable, setIsSwitchEnable }: IMenuItem) => {
      return (
        <TouchableOpacity onPress={onPress}>
          <View style={styles.menuItemContainer}>
            <View style={styles.menuItemIcon}>{<RenderIcon />}</View>
            <View style={styles.menuItemMainAndActionButtonContainer}>
              <View style={styles.menuItemMain}>
                {!isEmpty(title) && <CustomText style={styles.menuItemTitle}>{title}</CustomText>}
                {!isEmpty(subtitle) && <CustomText style={styles.menuItemSubtitle}>{subtitle}</CustomText>}
              </View>
              <View style={styles.menuItemActionButton}>
                {shouldUseSwithButton ? (
                  <View
                    style={[
                      styles.switchButtonContainer,
                      isSwitchEnable ? styles.swithButtonContainerEnable : styles.switchButtonContainerDisable,
                    ]}>
                    <Switch
                      trackColor={{ false: EColor.color_333333, true: EColor.color_0BFF6C }}
                      thumbColor={isSwitchEnable ? EColor.color_FAFAFA : EColor.color_FAFAFA}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={setIsSwitchEnable}
                      value={isSwitchEnable}
                    />
                  </View>
                ) : (
                  <NextIcon />
                )}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    },
    [],
  );

  const [isSwitchEnable, setIsSwitchEnable] = useState(false);
  useEffect(() => {
    (async () => {
      const isSaveBatterryMode = await getStoredProperty(EDataStorageKey.IS_SAVE_BATTERY_MODE);
      setIsSwitchEnable(isSaveBatterryMode as boolean);
    })();
  }, []);
  const menuItems: IMenuItem[] = useMemo(() => {
    return [
      {
        title: t('Nâng cấp phiên bản Pro'),
        subtitle: t('Mở khoá tính năng cao cấp'),
        onPress: () => {},
        RenderIcon: () => <VersionUpgradeIcon />,
      },
      {
        title: t('Vai trò'),
        subtitle: t('Thay đổi vai trò người chơi'),
        onPress: () => {
          navigation.dispatch(CommonActions.navigate(ESettingNavigator.RULE_SCREEN));
        },
        RenderIcon: () => <RuleIcon />,
      },
      {
        title: t('Ngôn ngữ'),
        subtitle: t('Thay đổi ngôn ngữ'),
        onPress: () => {
          navigation.dispatch(CommonActions.navigate(ESettingNavigator.LANGUAGE_SCREEN));
        },
        RenderIcon: () => <LanguageIcon />,
      },
      {
        title: t('Mật khẩu'),
        subtitle: t('Thay đổi mật khẩu'),
        onPress: () => {},
        RenderIcon: () => <KeyIcon />,
      },
      {
        title: t('Tiết kiệm PIN'),
        subtitle: t('Tắt trình đồ hoạ nâng cao'),
        onPress: () => {},
        RenderIcon: () => <BatterySaverIcon />,
        shouldUseSwithButton: true,
        isSwitchEnable: isSwitchEnable,
        setIsSwitchEnable: value => {
          setIsSwitchEnable(value);
          setPropertyInDevice(EDataStorageKey.IS_SAVE_BATTERY_MODE, value);
        },
      },
      {
        title: t('Chính sách bảo mật'),
        onPress: () => {
          navigation.dispatch(CommonActions.navigate(ESettingNavigator.POLICY_SCREEN));
        },
        RenderIcon: () => <SecurityPolicyIcon />,
      },
      {
        title: t('Về Terriana'),
        onPress: () => {
          navigation.dispatch(CommonActions.navigate(ESettingNavigator.ABOUT_SCREEN));
        },
        RenderIcon: () => <AboutIcon />,
      },
    ] as IMenuItem[];
  }, [t, isSwitchEnable, navigation]);
  return (
    <CustomSafeArea style={styles.container} backgroundImageSource={AppBackgroundImage}>
      <Header title={t('Cài đặt')} />
      <View style={styles.listItemContainer}>
        {menuItems.map((item, index) => {
          return (
            <MenuItem
              key={index}
              RenderIcon={item.RenderIcon}
              onPress={item.onPress}
              title={item.title}
              subtitle={item.subtitle}
              shouldUseSwithButton={item.shouldUseSwithButton}
              isSwitchEnable={item.isSwitchEnable}
              setIsSwitchEnable={item.setIsSwitchEnable}
            />
          );
        })}
      </View>
    </CustomSafeArea>
  );
};

export default MenuScreen;
