import {StyleSheet, Dimensions, Platform, StatusBar} from 'react-native';

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window');
const STATUSBAR_HEIGHT = StatusBar.currentHeight || 0;

const isPortrait = SCREEN_HEIGHT > SCREEN_WIDTH;
console.log('isPortrait:', isPortrait);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: '#BCC5D5',
  },
  mainWrapper: {
    flex: 1,
    height: Platform.select({
      ios: SCREEN_HEIGHT,
      android: SCREEN_HEIGHT - STATUSBAR_HEIGHT - 20, // Adjust for Android status bar
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
      ios: 300,
      android: isPortrait ? 20 : 300, // More padding for Android
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
      android: 40, // Taller handle for Android
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
    // ...(Platform.OS === 'android' && {
    //   backgroundColor: '#011e3e', // Add background color for Android shadow
    // }),
  },
  img: {
    // width: Platform.select({
    //   ios: SCREEN_WIDTH * 0.4,
    //   android: SCREEN_WIDTH * 0.35, // Slightly smaller for Android
    // }),
    // height: Platform.select({
    //   ios: SCREEN_WIDTH * 0.4,
    //   android: SCREEN_WIDTH * 0.35,
    // }),
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
      android: 14, // Slightly smaller font for Android
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
});

export default styles;
