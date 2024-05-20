import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroText,
  ViroTrackingReason,
  ViroTrackingStateConstants,
} from '@viro-community/react-viro';
import React, { useState } from 'react';
import { styles } from './styles';

const AboutScreen = () => {
  const [text, setText] = useState('Initializing AR...');

  function onInitialized(state: any, reason: ViroTrackingReason) {
    console.log('onInitialized', state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText('Hello World!');
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      // Handle loss of tracking
    }
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroText text={text} scale={[0.5, 0.5, 0.5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
    </ViroARScene>
  );
};

export default () => {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: AboutScreen,
      }}
      style={styles.f1}
    />
  );
};
