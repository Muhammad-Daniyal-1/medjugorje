import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  AppState,
  AppStateStatus,
  useWindowDimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import TrackPlayer, {
  Event,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import {styles} from './styles';
import images from '../../assets/img';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InfoBottomSheet from '../BottomSheet/BottomSheet';
import BottomSheet from '@gorhom/bottom-sheet';
import LinearGradient from 'react-native-linear-gradient';

const PlayerScreen = () => {
  const playbackState = usePlaybackState();
  const progress = useProgress();
  const [streamName, setStreamName] = useState('Loading...');
  const [isPlaying, setIsPlaying] = useState(false);
  const appState = useRef<AppStateStatus>(AppState.currentState);

  const sheetRef = useRef<BottomSheet>(null);
  const {width, height} = useWindowDimensions();
  const isPortrait = height >= width;

  // Function to open the Bottom Sheet
  const openBottomSheet = () => {
    sheetRef.current?.snapToIndex(0);
  };

  const streamUrl = 'https://ais-sa3.cdnstream1.com/2600_128.aac';
  const donateUrl = 'https://medjugorje.com/donate/';

  useEffect(() => {
    setupPlayer();

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      TrackPlayer.reset();
      subscription.remove();
    };
  }, []);

  const setupPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add({
        id: 1,
        url: streamUrl,
        title: 'Live Stream',
        artist: 'Artist Name',
      });
      await TrackPlayer.play();
    } catch (error) {
      // console.warn('Error setting up player:', error);
    }
  };

  const togglePlayback = async () => {
    try {
      const currentState = await TrackPlayer.getPlaybackState();
      if (currentState.state === State.Playing) {
        await TrackPlayer.pause();
        setIsPlaying(false);
      } else {
        await TrackPlayer.play();
        setIsPlaying(true);
      }
    } catch (error) {
      // console.warn('Error toggling playback:', error);
    }
  };

  const openDonateLink = () => {
    Linking.openURL(donateUrl);
  };

  useTrackPlayerEvents([Event.PlaybackMetadataReceived], async event => {
    if (event && event.artist && event.title) {
      setStreamName(`${event.title}`);
      await TrackPlayer.updateMetadataForTrack(1, {
        title: event.title,
        artist: event.artist,
      });
    } else {
      setStreamName('Live Stream');
    }
  });

  useTrackPlayerEvents([Event.PlaybackError, Event.PlaybackState], event => {
    if (event.type === Event.PlaybackError) {
      setIsPlaying(false);
    } else if (event.type === Event.PlaybackState) {
      if (event.state === State.Playing) {
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
    }
  });

  const handleAppStateChange = async (nextAppState: AppStateStatus) => {
    if (appState.current.match(/active/) && nextAppState === 'background') {
      await TrackPlayer.pause();
      setIsPlaying(false);
    }
    appState.current = nextAppState;
  };

  return (
    <LinearGradient
      colors={['#011e3e', '#85abe6']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <SafeAreaView style={styles.safeView}>
          <View style={styles.mainView}>
            <View style={styles.logoView}>
              <Image source={images.logo} style={styles.logo} />
              <Ionicons
                name="information-circle-outline"
                size={30}
                color="#f1f1f1"
                onPress={openBottomSheet}
                style={styles.infoIcon}
              />
            </View>
            <View style={styles.middleContent}>
              <View style={styles.imageContainer}>
                <Image
                  source={images.radio_wave_logo}
                  style={styles.radioWaveLogo}
                />
              </View>
              <Text style={styles.streamName}>{streamName}</Text>
              <View style={styles.separator} />
              <Text style={styles.timeline}>
                {new Date(progress.position * 1000).toISOString().slice(14, 19)}
              </Text>
              <TouchableOpacity
                onPress={togglePlayback}
                style={styles.playPauseButton}>
                <Ionicons
                  name={
                    playbackState.state === State.Playing
                      ? 'pause-circle-outline'
                      : 'play-circle-outline'
                  }
                  size={80}
                  color="#f1f1f1"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={openDonateLink}
              style={styles.donateButton}>
              <Text style={styles.donateText}>Donate</Text>
              <Ionicons name="heart" size={28} color="#fff" />
            </TouchableOpacity>
          </View>
          <InfoBottomSheet ref={sheetRef} />
        </SafeAreaView>
      </ScrollView>
    </LinearGradient>
  );
};

export default PlayerScreen;
