/* eslint-disable react/react-in-jsx-scope */
import { View, ActivityIndicator } from 'react-native';
import { styles } from './styles';

const LoadingModal = () => {
  return (
    <View style={styles.container}>
      <View style={styles.loadingIndicatorContainer}>
        <ActivityIndicator />
      </View>
    </View>
  );
};
export default LoadingModal;
