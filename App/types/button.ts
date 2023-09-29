import { EButtonType } from 'App/enums';

export interface IButtonProps {
  title?: string;
  renderIcon?: JSX.Element;
  disabled?: boolean;
  linearGradient?: string[];
  customStyleContainer?: object;
  customStyleText?: object;
  buttonType: EButtonType;
  onPress: () => void;
}
export interface IButtonIconProps {
  renderIcon: JSX.Element;
  disabled?: boolean;
  buttonColor?: string[] | string;
  customStyleContainer?: object;
  customStyleText?: object;
  buttonType: EButtonType;
  onPress: () => void;
}

export interface ILanguageItemProps {
  value: string;
  label: string;
}
