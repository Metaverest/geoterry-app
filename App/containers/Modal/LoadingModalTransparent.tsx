/* eslint-disable react/react-in-jsx-scope */
import { ActivityIndicator } from 'react-native';
import { styles } from './styles';

const LoadingModalTransparent = () => {
  return <ActivityIndicator style={styles.loadingTransparent} />;
};
export default LoadingModalTransparent;
