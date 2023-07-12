import TerryInput from 'App/Components/UI/Input';
import { isIOSDevice } from 'App/helpers/common';
import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const OnboardingScreen = () => {
  const { top } = useSafeAreaInsets();

  return (
    <View>
      <KeyboardAvoidingView behavior={isIOSDevice() ? 'padding' : 'height'}>
        <SafeAreaView style={[styles.container, { marginTop: top }]}>
          <TerryInput
            label="Enter your name"
            required={true}
            errorMessage="You must enter your name"
            isPasswordHide={true}
          />
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    margin: 10,
    marginTop: 100,
  },
  textPrimary: {
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 20,
  },
  textSecondary: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 17,
  },
});

export default OnboardingScreen;
