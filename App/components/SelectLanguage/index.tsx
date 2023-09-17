import { ELanguageCode } from 'App/enums';
import ArrowDown from 'App/media/ArrowDown';
import UsaFlag from 'App/media/UsaFlag';
import VietnamFlag from 'App/media/VietnamFlag';
import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomText from '../CustomText';
import { styles } from './styles';

const SelectLanguage = ({
  language,
  setLanguage,
}: {
  language: ELanguageCode;
  setLanguage: (e: ELanguageCode) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const LanguageIcon = useCallback(({ languageParam }: { languageParam: ELanguageCode }) => {
    switch (languageParam) {
      case ELanguageCode.EN:
        return <UsaFlag />;
      case ELanguageCode.VN:
        return <VietnamFlag />;
    }
  }, []);
  const RenderItem = useCallback(
    ({ languageParam }: { languageParam: ELanguageCode }) => {
      return (
        <TouchableOpacity
          onPress={() => {
            setLanguage(languageParam);
            setIsOpen(false);
          }}
          style={styles.itemContainer}>
          <LanguageIcon languageParam={languageParam} />
          <CustomText style={styles.itemText}>{languageParam}</CustomText>
        </TouchableOpacity>
      );
    },
    [LanguageIcon, setLanguage],
  );
  const RenderSelectedLanguage = useCallback(() => {
    return (
      <TouchableOpacity onPress={() => setIsOpen(_isOpen => !_isOpen)}>
        <View style={styles.selectedLanguageContainer}>
          <LanguageIcon languageParam={language as ELanguageCode} />
          <ArrowDown />
        </View>
      </TouchableOpacity>
    );
  }, [language, LanguageIcon]);

  return (
    <View style={styles.container}>
      <RenderSelectedLanguage />
      {isOpen && (
        <View style={styles.dropdownContainer}>
          <View style={styles.triangleContainer}>
            <View style={styles.triangle} />
          </View>
          {Object.values(ELanguageCode).map(item => {
            return <RenderItem key={item} languageParam={item} />;
          })}
        </View>
      )}
    </View>
  );
};

export default SelectLanguage;
