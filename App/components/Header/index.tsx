/* eslint-disable react/react-in-jsx-scope */
import { CommonActions, useNavigation } from '@react-navigation/native';
import { EMainGameScreen } from 'App/enums/navigation';
import BackIcon from 'App/media/BackIcon';
import { useCallback } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomText from '../CustomText';
import { styles } from './styles';

const Header = ({
  title,
  rightButton,
  shouldHideBackButton,
  headerContainerStyle,
}: {
  title?: string;
  rightButton?: any;
  shouldHideBackButton?: boolean;
  headerContainerStyle?: StyleProp<ViewStyle>;
}) => {
  const navigation = useNavigation();
  const handlePressBackButton = useCallback(() => {
    if (!navigation.canGoBack()) {
      navigation.dispatch(CommonActions.navigate(EMainGameScreen.MAP_SCREEN));
      return;
    }
    navigation.dispatch(CommonActions.goBack());
  }, [navigation]);
  return (
    <View style={[styles.container, headerContainerStyle]}>
      <TouchableOpacity style={styles.backButtonContainer} onPress={handlePressBackButton}>
        {!shouldHideBackButton && <BackIcon />}
      </TouchableOpacity>
      <CustomText style={styles.title}>{title}</CustomText>
      <TouchableOpacity style={styles.rightButtonContainer} onPress={handlePressBackButton}>
        {rightButton && rightButton}
      </TouchableOpacity>
    </View>
  );
};
export default Header;
