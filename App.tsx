import React, {useEffect} from 'react';
import PlayerScreen from './src/components/PlayerScreen/PlayerScreen';
import {getFcmToken, registerListenerWithFCM} from './src/utils/fcmHelper';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NativeModules, Platform} from 'react-native';

const {CarPlayManager} = NativeModules;

const App = () => {
  useEffect(() => {
    if (Platform.OS === 'ios') {
      CarPlayManager.setupCarPlay();
    }
  }, []);

  useEffect(() => {
    getFcmToken();
  }, []);

  useEffect(() => {
    const unsubscribe = registerListenerWithFCM();
    return unsubscribe;
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <PlayerScreen />
    </GestureHandlerRootView>
  );
};

export default App;
