import { CommonActions } from '@react-navigation/native';
import { StackActions } from '@react-navigation/routers';
import {
  CannotCreateQRImage,
  CannotFindProfileImage,
  CannotRefreshNotiTokenImage,
  FoundProfileImage,
  InvalidAccessErrorImage,
  UndefinedErrorImage,
  UploadFileFailedImage,
} from 'App/components/image';
import { EErrorCode, EStatusCode } from 'App/enums/error';
import { EMainGameScreen, ENavigationScreen, EPopUpModalType } from 'App/enums/navigation';
import { IPopupModalParamsProps } from 'App/types/modal';
import i18next from 'i18next';
const t = i18next.t;
export const PopUpModalParams = {
  [EPopUpModalType.UNDEFINED_ERROR]: {
    title: t('Lỗi không xác định'),
    subtitle: t('Vui lòng thử lại sau'),
    image: UndefinedErrorImage,
    confirmButtonTitle: t('Ok'),
  } as IPopupModalParamsProps,
  [EPopUpModalType.INVALID_ACCESS]: {
    title: t('Truy cập không hợp lệ'),
    subtitle: t('Vui lòng thử lại sau'),
    image: InvalidAccessErrorImage,
    confirmButtonTitle: t('Ok'),
  } as IPopupModalParamsProps,
  [EPopUpModalType.CANNOT_FOUND_PROFILE]: {
    title: t('Không tìm thấy hồ sơ'),
    subtitle: t('Vui lòng thử lại sau'),
    image: CannotFindProfileImage,
    confirmButtonTitle: t('Ok'),
  } as IPopupModalParamsProps,
  [EPopUpModalType.FOUND_PROFILE]: {
    title: t('Đã tìm thấy hồ sơ'),
    subtitle: t('Bấm tiếp tục để truy cập'),
    image: FoundProfileImage,
    confirmButtonTitle: t('Tiếp tục'),
  } as IPopupModalParamsProps,
  [EPopUpModalType.UPLOAD_FILE_FAILED]: {
    title: t('Thất bại'),
    subtitle: t('Tải lên tệp không thành công, vui lòng thử lại'),
    image: UploadFileFailedImage,
    confirmButtonTitle: t('Thử lại'),
  } as IPopupModalParamsProps,
  [EPopUpModalType.FILE_SIZE_NOT_VALID]: {
    title: t('Thất bại'),
    subtitle: t('Kích thước ảnh không được chấp nhận, vui lòng thử lại'),
    image: UploadFileFailedImage,
    confirmButtonTitle: t('Thử lại'),
  } as IPopupModalParamsProps,
  [EPopUpModalType.CANNOT_REFRESH_NOTIFICATION_TOKEN]: {
    title: t('Lỗi'),
    subtitle: t('Không làm mới được mã thông báo'),
    image: CannotRefreshNotiTokenImage,
    confirmButtonTitle: t('Thử lại'),
  } as IPopupModalParamsProps,
  [EPopUpModalType.PROFILE_EXISTED]: {
    title: t('Hồ sơ đã tồn tại'),
    subtitle: t('Vui lòng sử dụng số điện thoại khác để đăng ký'),
    image: UndefinedErrorImage,
    confirmButtonTitle: t('Thử lại'),
  } as IPopupModalParamsProps,
  [EPopUpModalType.CANNOT_CREATE_QR_CODE]: {
    title: t('Không thể tạo mã QR'),
    subtitle: t('Vui lòng thử lại sau'),
    image: CannotCreateQRImage,
    confirmButtonTitle: t('Ok'),
  } as IPopupModalParamsProps,
  [EPopUpModalType.VERIFY_OFFICIAL_TERRY_FAILED]: {
    title: t('Xác minh kho báu không thành công'),
    subtitle: t('Vui lòng thử lại'),
    image: CannotCreateQRImage,
    confirmButtonTitle: t('Ok'),
  } as IPopupModalParamsProps,
  [EPopUpModalType.DISTANCE_ERROR]: {
    title: t('Lỗi ngoài khoảng cách'),
    subtitle: t('Vui lòng thử lại sau'),
    image: UndefinedErrorImage,
    confirmButtonTitle: t('Ok'),
  } as IPopupModalParamsProps,
  [EPopUpModalType.CREATE_TERRY_SUCCESS]: {
    title: t('Tạo kho báu thành công'),
    subtitle: t('Giờ đây Hunter đã có thể nhìn thấy kho báu của bạn trên bản đồ'),
    image: UndefinedErrorImage,
    confirmButtonTitle: t('Ok'),
  } as IPopupModalParamsProps,
  [EPopUpModalType.TERRY_INFORMATION_CAN_BE_DISCLOSED]: {
    title: t('Cảnh báo'),
    subtitle: t('Thông tin về kho báu có thể sẽ bị tiết lộ, gây mất trải nghiệm khi chơi game. Bạn vẫn muốn tiếp tục?'),
    image: UndefinedErrorImage,
    confirmButtonTitle: t('Tiếp tục'),
    cancelButtonTitle: t('Thoát'),
  } as IPopupModalParamsProps,
};
export const getPopupModalParamsFromErrorCodeAndStatusCode = (
  errorCode: EErrorCode,
  statusCode: EStatusCode,
  additionalPopupModalParams?: IPopupModalParamsProps,
) => {
  let resultPopupModalParams = null;
  if (errorCode === EErrorCode.UNKNOWN_ERROR) {
    resultPopupModalParams = PopUpModalParams[EPopUpModalType.UNDEFINED_ERROR];
  } else if (errorCode === EErrorCode.PROFILE_NOT_FOUND) {
    resultPopupModalParams = PopUpModalParams[EPopUpModalType.CANNOT_FOUND_PROFILE];
  } else if (errorCode === EErrorCode.OUT_OF_DISTANCE) {
    resultPopupModalParams = PopUpModalParams[EPopUpModalType.DISTANCE_ERROR];
  } else if (errorCode === EErrorCode.INCORRECT_TERRY_CODE) {
    resultPopupModalParams = PopUpModalParams[EPopUpModalType.VERIFY_OFFICIAL_TERRY_FAILED];
  }
  if (!resultPopupModalParams) {
    return;
  }
  return { ...resultPopupModalParams, ...additionalPopupModalParams };
};

export const navigateToPopUpModal = (navigation: any, params: IPopupModalParamsProps) => {
  navigation.dispatch(
    StackActions.push(ENavigationScreen.POPUP_SCREEN, {
      ...params,
    }),
  );
};

export const resetAndNavigateToScreen = (navigation: any, screenName: ENavigationScreen | EMainGameScreen) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: screenName }],
    }),
  );
};
