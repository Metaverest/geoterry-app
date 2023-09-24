import CustomSwipeUpModal from 'App/components/SwipeUpModal';
import { useTranslation } from 'react-i18next';
import React from 'react';

const MapTypeScreen = () => {
  const { t } = useTranslation();
  return <CustomSwipeUpModal title={t('Bản đồ')} />;
};

export default MapTypeScreen;
