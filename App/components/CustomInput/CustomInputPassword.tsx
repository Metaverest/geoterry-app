/* eslint-disable react/react-in-jsx-scope */
import EyeSplash from 'App/media/EyeSplash';
import CustomInput from './index';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IInputProps } from 'App/types/input';
import { useCallback, useState } from 'react';
import Eye from 'App/media/Eye';

const CustomInputPassword = (props: IInputProps) => {
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);
  const toggleSecureTextEntry = useCallback(() => {
    setIsSecureTextEntry(_isSecureTextEntry => !_isSecureTextEntry);
  }, []);
  return (
    <CustomInput
      secureTextEntry={isSecureTextEntry}
      icon={
        <TouchableOpacity onPress={toggleSecureTextEntry}>
          {isSecureTextEntry ? <EyeSplash /> : <Eye />}
        </TouchableOpacity>
      }
      {...props}
    />
  );
};
export default CustomInputPassword;
