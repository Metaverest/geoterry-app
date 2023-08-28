/* eslint-disable react/react-in-jsx-scope */
import EyeSplash from 'App/media/EyeSplash';
import CustomInput from './index';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IInputProps } from 'App/types/input';

const CustomInputPassword = (props: IInputProps) => {
  return (
    <CustomInput
      secureTextEntry
      icon={
        <TouchableOpacity>
          <EyeSplash />
        </TouchableOpacity>
      }
      {...props}
    />
  );
};
export default CustomInputPassword;
