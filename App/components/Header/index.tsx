/* eslint-disable react/react-in-jsx-scope */
import BackIcon from 'App/media/BackIcon';
import { useCallback } from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from './styles';

const Header = ({ navigation, title }: { navigation: any; title?: string }) => {
  const handlePressBackButton = useCallback(() => {
    navigation.goBack();
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
