import CustomSwipeUpModal from 'App/components/SwipeUpModal';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, TouchableOpacity, View } from 'react-native';

import { CommonActions, StackActions, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import CustomButton from 'App/components/Button';
import CustomText from 'App/components/CustomText';
import { SmileImage } from 'App/components/image';
import { EButtonType } from 'App/enums';
import { EColor } from 'App/enums/color';
import { EMainGameNavigatorParams, EMainGameScreen } from 'App/enums/navigation';
import ActiveStartIcon from 'App/media/ActiveStartIcon';
import StartIcon from 'App/media/StartIcon';
import { reduxAppAction } from 'App/redux/actions/appAction';
import { sagaUserAction } from 'App/redux/actions/userAction';
import { reduxSelector } from 'App/redux/selectors';
import { range } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './styles';

const CheckinTerryVoteScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<StackNavigationProp<EMainGameNavigatorParams>>();
  const dispatch = useDispatch();
  const onChangeVote = useCallback(
    (value: number) => {
      dispatch(reduxAppAction.setCheckinTerryData({ rate: value }));
    },
    [dispatch],
  );
  const rateValue = useSelector(reduxSelector.getAppTerryCheckinInputRate);

  const onSubmit = useCallback(() => {
    dispatch(
      sagaUserAction.hunterCheckinTerryAsync(navigation, {
        onSuccess: () => {
          navigation.dispatch(CommonActions.navigate(EMainGameScreen.MAP_SCREEN));
        },
        onError: () => {
          navigation.dispatch(StackActions.pop(2));
        },
      }),
    );
  }, [dispatch, navigation]);
  return (
    <CustomSwipeUpModal>
      <View style={styles.container}>
        <Image style={styles.image} source={SmileImage} />
        <CustomText style={styles.title}>{t('Đánh giá kho báu')}</CustomText>
        <CustomText style={styles.subtitle}>{t('Chúng tôi rất mong nhận được đánh giá của bạn!')}</CustomText>
        <View style={styles.startsContainer}>
          {range(1, 6).map(value => {
            return (
              <TouchableOpacity onPress={() => onChangeVote(value)} key={value}>
                {value === rateValue ? <ActiveStartIcon /> : <StartIcon />}
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            onPress={onSubmit}
            linearGradient={[EColor.color_727BFD, EColor.color_51F1FF]}
            buttonType={EButtonType.SOLID}
            title={t('Xong')}
          />
        </View>
      </View>
    </CustomSwipeUpModal>
  );
};

export default CheckinTerryVoteScreen;
