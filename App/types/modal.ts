import { ImageSourcePropType } from 'react-native';

export interface ISwipeUpModalProps {
  title?: string;
  content?: JSX.Element;
  children?: JSX.Element;
  shouldShowTopMostLine?: boolean;
  shouldShowHeaderTitle?: boolean;
}

export interface IPopupModalParamsProps {
  image: ImageSourcePropType;
  title?: string;
  subtitle?: string;
  confirmButtonTitle?: string;
  cancelButtonTitle?: string;
  closeModalBeforeActiom?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
}
