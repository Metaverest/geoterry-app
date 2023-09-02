/* eslint-disable react/react-in-jsx-scope */
import { CommonActions, useNavigation } from '@react-navigation/native';
import BackIcon from 'App/media/BackIcon';
import { useCallback } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomText from '../CustomText';
import { styles } from './styles';

const Header = ({ title }: { title?: string }) => {
  const navigation = useNavigation();
  const handlePressBackButton = useCallback(() => {
    navigation.dispatch(CommonActions.goBack());
  }, [navigation]);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButtonContainer} onPress={handlePressBackButton}>
        <BackIcon />
      </TouchableOpacity>
      <CustomText style={styles.title}>{title}</CustomText>
      <TouchableOpacity style={styles.rightButtonContainer} onPress={handlePressBackButton}>
        <></>
      </TouchableOpacity>
    </View>
  );
};
export default Header;
