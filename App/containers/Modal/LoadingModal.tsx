/* eslint-disable react/react-in-jsx-scope */
import { View, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import CustomSafeArea from 'App/components/CustomSafeArea';

const LoadingModal = () => {
  return (
    <CustomSafeArea style={styles.container} isModal>
      <View>
        <ActivityIndicator />
      </View>
    </CustomSafeArea>
  );
};
export default LoadingModal;
