import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    // justifyContent: 'flex-start',
    // alignItems: 'center',
    // paddingVertical: 20,
    backgroundColor: 'none',
  },
  container: {
    flex: 1,
    // backgroundColor: '#BCC5D5',
    paddingBottom: 20,
    // paddingHorizontal: 20,
  },
  safeView: {
    flex: 1,
  },
  mainView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  logoView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  logo: {
    width: 150,
    height: 100,
    resizeMode: 'contain',
  },
  infoIcon: {
    marginTop: 12,
  },
  middleContent: {
    flex: 1,
    justifyContent: 'center',
  },
  imageContainer: {
    alignSelf: 'center',
    shadowColor: '#011e3e',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 50,
    borderRadius: 125,
  },
  radioWaveLogo: {
    width: 240,
    height: 240,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 30,
  },
  streamName: {
    fontSize: 20,
    marginHorizontal: 15,
    textAlign: 'left',
    marginBottom: 10,
    color: '#f1f1f1',
  },
  separator: {
    height: 2,
    width: '98%',
    backgroundColor: '#9e9e9e',
    alignSelf: 'center',
  },
  timeline: {
    fontSize: 16,
    marginHorizontal: 15,
    marginTop: 10,
    color: '#f1f1f1',
  },
  playPauseButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  icons: {
    color: '#fff',
  },
  donateButton: {
    backgroundColor: '#ce0101',
    paddingVertical: 10,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 7,
    borderRadius: 50,
    alignSelf: 'center',
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
  },
  donateText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 10,
  },
});
