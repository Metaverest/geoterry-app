/* eslint-disable react/react-in-jsx-scope */
import { ActivityIndicator } from 'react-native';
import { styles } from './styles';
import CustomSafeArea from 'App/components/CustomSafeArea';

const LoadingModal = () => {
  return (
    <CustomSafeArea style={styles.container} shouldUseFullScreenView isModal>
      <ActivityIndicator />
    </CustomSafeArea>
  );
};
export default LoadingModal;
