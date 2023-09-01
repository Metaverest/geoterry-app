/* eslint-disable react/react-in-jsx-scope */
import BackIcon from 'App/media/BackIcon';
import { useCallback } from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from './styles';
import { CommonActions, useNavigation } from '@react-navigation/native';

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
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.rightButtonContainer} onPress={handlePressBackButton}>
        <></>
      </TouchableOpacity>
    </View>
  );
};
export default Header;
