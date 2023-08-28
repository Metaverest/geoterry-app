import { ELanguageCode } from 'App/enums';
import ArrowDown from 'App/media/ArrowDown';
import UsaFlag from 'App/media/UsaFlag';
import VietnamFlag from 'App/media/VietnamFlag';
import React, { useCallback, useState } from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
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
      case ELanguageCode.US:
        return <UsaFlag />;
      case ELanguageCode.VIETNAMESE:
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
          <Text style={styles.itemText}>{languageParam}</Text>
        </TouchableOpacity>
      );
    },
    [LanguageIcon, setLanguage],
  );
  const RenderSelectedLanguage = useCallback(() => {
    return (
      <View style={styles.selectedLanguageContainer}>
        <LanguageIcon languageParam={language as ELanguageCode} />
        <ArrowDown />
      </View>
    );
  }, [language, LanguageIcon]);
  return (
    <TouchableOpacity style={styles.container} onPress={() => setIsOpen(_isOpen => !_isOpen)}>
      <RenderSelectedLanguage />
      {isOpen && (
        <View style={styles.dropdownContainer}>
          {Object.values(ELanguageCode).map(item => {
            return <RenderItem key={item} languageParam={item} />;
          })}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default SelectLanguage;
