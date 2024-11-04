import React, {useMemo, forwardRef, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Platform,
  Dimensions,
  StatusBar,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import images from '../../assets/img';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

interface InfoBottomSheetProps {}

const InfoBottomSheet = forwardRef<BottomSheet, InfoBottomSheetProps>(
  (props, ref) => {
    const snapPoints = useMemo(
      () => [Platform.OS === 'ios' ? '92%' : '97%'],
      [],
    );

    const renderBackdrop = (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.7}
      />
    );

    const closeSheet = useCallback(() => {
      if (ref && 'current' in ref) {
        ref.current?.close();
      }
    }, [ref]);

    const renderHandle = useCallback(
      () => (
        <TouchableOpacity
          onPress={closeSheet}
          activeOpacity={1}
          style={styles.customHandle}>
          <View style={styles.handleBar} />
        </TouchableOpacity>
      ),
      [closeSheet],
    );

    const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} =
      Dimensions.get('window');
    const STATUSBAR_HEIGHT = StatusBar.currentHeight || 0;
    const isPortrait = SCREEN_HEIGHT > SCREEN_WIDTH;

    const styles = StyleSheet.create({
      contentContainer: {
        flex: 1,
        backgroundColor: '#BCC5D5',
      },
      mainWrapper: {
        flex: 1,
        height: Platform.select({
          ios: SCREEN_HEIGHT,
          android: SCREEN_HEIGHT - STATUSBAR_HEIGHT - 20,
        }),
      },
      scrollViewStyle: {
        flex: 1,
        ...(Platform.OS === 'android' && {
          marginBottom: 20,
        }),
      },
      scrollContainer: {
        flexGrow: 1,
        paddingBottom: Platform.select({
          ios: isPortrait ? 20 : 300,
          android: isPortrait ? 20 : 300,
        }),
      },
      mainContent: {
        paddingHorizontal: 20,
        paddingTop: Platform.select({
          ios: 10,
          android: 15,
        }),
      },
      customHandle: {
        width: '100%',
        height: Platform.select({
          ios: 30,
          android: 40,
        }),
        backgroundColor: '#011e3e',
        justifyContent: 'center',
        alignItems: 'center',
      },
      handleBar: {
        width: 40,
        height: 5,
        backgroundColor: '#85abe6',
        borderRadius: 3,
      },
      imageContainer: {
        alignSelf: 'center',
        shadowColor: '#011e3e',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 1,
        shadowRadius: 40,
        elevation: 50,
        borderRadius: 125,
        marginBottom: 20,
      },
      img: {
        width: 240,
        height: 240,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 10,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#f1f1f1',
        textAlign: 'center',
      },
      text: {
        fontSize: Platform.select({
          ios: 15,
          android: 14,
        }),
        marginBottom: 10,
        color: '#f1f1f1',
        lineHeight: Platform.select({
          ios: 22,
          android: 20,
        }),
      },
      iconsView: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
        ...(Platform.OS === 'android' && {
          paddingHorizontal: 10,
        }),
      },
      icons: {
        marginRight: 15,
      },
      gabIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
      },
      link: {
        fontSize: Platform.select({
          ios: 15,
          android: 14,
        }),
        marginTop: 5,
        marginBottom: Platform.select({
          ios: 20,
          android: 30,
        }),
        color: '#fff',
        textDecorationLine: 'underline',
      },
      textView: {
        width: isPortrait ? '100%' : '90%',
        alignSelf: 'center',
      },
    });

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        handleComponent={renderHandle}
        android_keyboardInputMode="adjustResize">
        <LinearGradient
          colors={['#011e3e', '#85abe6']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.contentContainer}>
          <View style={styles.mainWrapper}>
            <BottomSheetScrollView
              showsVerticalScrollIndicator={true}
              style={styles.scrollViewStyle}
              contentContainerStyle={styles.scrollContainer}
              alwaysBounceVertical={false}
              overScrollMode="never">
              <SafeAreaView style={{flex: 1}}>
                <View style={styles.mainContent}>
                  <View style={styles.imageContainer}>
                    <Image source={images.radio_wave_logo} style={styles.img} />
                  </View>
                  <Text style={styles.title}>Radio Wave</Text>
                  <View style={styles.iconsView}>
                    <TouchableOpacity
                      onPress={() =>
                        Linking.openURL('https://medjugorje.com/')
                      }>
                      <MaterialCommunityIcons
                        name="web"
                        size={30}
                        color="#f1f1f1"
                        style={styles.icons}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() =>
                        Linking.openURL(
                          'https://www.facebook.com/medjugorje.apparitons/',
                        )
                      }>
                      <Ionicons
                        name="logo-facebook"
                        size={30}
                        color="#0094cf"
                        style={styles.icons}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() =>
                        Linking.openURL('https://twitter.com/RealMedjugorje')
                      }>
                      <Ionicons
                        name="logo-twitter"
                        size={30}
                        color="#00acee"
                        style={styles.icons}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() =>
                        Linking.openURL(
                          'https://www.instagram.com/medjugorje_com/',
                        )
                      }>
                      <Ionicons
                        name="logo-instagram"
                        size={30}
                        color="#e4405f"
                        style={styles.icons}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() =>
                        Linking.openURL('https://gab.com/RealMedjugorje')
                      }>
                      <Image source={images.gab} style={styles.gabIcon} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.textView}>
                    <Text style={styles.text}>
                      Your life is about to change. Your thoughts, your
                      emotions, your outlook, your heart, your soul; your's and
                      your family's are about to change, How? A radio station
                      unlike any other in the world, Radio Wave now has an App
                      you can listen to 24 hours, 7 days a week. It is a radio
                      station that you will never want to turn it off. You can
                      use Bluetooth and Listen at home, in the car, at work,
                      etc. You will reflect. You will cry. You will smile. It
                      will help you to realize and expose mistakes you have made
                      so that you can begin to heal. In just 3 songs you hear,
                      you will be hooked, - (A Friend of Medjugorje). A Friend
                      of Medjugorje has changed millions of people, the way they
                      live, into a new way of living. He and Radio Wave is
                      followed by 190 countries in a list that is growing. For
                      decades, a Friend of Medjugorje has picked every song
                      played on Radio Wave. His taste for beauty, for songs,
                      architecture, 360 agrarian Life and more has brought
                      conversion to millions of souls. He has written over 800
                      books, several of which have sold over a million copies.
                      He is known for helping people and his generosity is what
                      has led to many blessings upon the mission he founded. He
                      takes no money for his projects. (Caritas of Birmingham,
                      Inc., Non Profit), P.S. Your tax-exempt donation keeps
                      Radio Wave on the airwaves, You can donate online here:
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        Linking.openURL('https://medjugorje.com/donate/')
                      }>
                      <Text style={styles.link}>
                        https://medjugorje.com/donate/
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </SafeAreaView>
            </BottomSheetScrollView>
          </View>
        </LinearGradient>
      </BottomSheet>
    );
  },
);

export default InfoBottomSheet;
