import { EButtonType } from 'App/enums';

export interface IButtonProps {
  title: string;
  disabled?: boolean;
  linearGradient?: string[];
  customStyleContainer?: object;
  customStyleText?: object;
  buttonType: EButtonType;
  onPress: () => void;
}
export interface ILanguageItemProps {
  value: string;
  label: string;
}
