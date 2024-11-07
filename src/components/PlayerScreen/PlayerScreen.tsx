import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import TrackPlayer, {
  Event,
  State,
  Capability,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
  AppKilledPlaybackBehavior,
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

  const sheetRef = useRef<BottomSheet>(null);

  // Function to open the Bottom Sheet
  const openBottomSheet = () => {
    sheetRef.current?.snapToIndex(0);
  };

  const streamUrl = 'https://ais-sa3.cdnstream1.com/2600_128.aac';
  const donateUrl = 'https://medjugorje.com/donate/';

  useEffect(() => {
    setupPlayer();

    return () => {
      TrackPlayer.reset();
    };
  }, []);

  const setupPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();

      await TrackPlayer.updateOptions({
        android: {
          // This is the default behavior
          appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback,
        },
        capabilities: [Capability.Play, Capability.Pause, Capability.Stop],
        notificationCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.Stop,
        ],
        compactCapabilities: [Capability.Play, Capability.Pause],
      });

      await TrackPlayer.add({
        id: 1,
        url: streamUrl,
        title: 'Live Stream',
        // artist: 'Artist Name',
      });

      await TrackPlayer.play();
    } catch (error) {
      // Handle error
    }
  };

  const togglePlayback = async () => {
    try {
      const currentState = await TrackPlayer.getState();
      if (currentState === State.Playing) {
        await TrackPlayer.pause();
      } else {
        await TrackPlayer.play();
      }
    } catch (error) {
      // Handle error
    }
  };

  const openDonateLink = () => {
    Linking.openURL(donateUrl);
  };

  useTrackPlayerEvents([Event.MetadataTimedReceived], async event => {
    if (event && event.metadata[0].title) {
      const titleWithArtist = event.metadata[0].title;
      const title = titleWithArtist.split(' - ')[0];
      setStreamName(title);
      await TrackPlayer.updateMetadataForTrack(0, {
        title: title,
      });
    } else {
      setStreamName('Live Stream');
    }
  });

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
