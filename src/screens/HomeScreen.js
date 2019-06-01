import React from 'react';
import {
  Platform,
  Dimensions,
  StyleSheet,
  Image,
  AsyncStorage,
  Text,
  View,
} from 'react-native';
import * as firebase from "firebase";
import Images from '../assets/Images';
const { height, width } = Dimensions.get('window')

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      currentWord: {
        Word: "",
        Translation: "",
        Sentence: "",
        Meaning: "",
      }
    }
  }

  async componentDidMount() {
    const uid = await AsyncStorage.getItem('uid');
    const db = firebase.database();
    db.ref('/users/' + uid).on('value', (snapshot) => {
      this.setState(snapshot.val());

    })
  }

  render() {
    const { Word, Meaning, Sentence, Translation } = this.state.currentWord
    return (
      <View style={styles.container}>
        <Image source={Images.background} resizeMode="cover" style={{ position: 'absolute', width, height }} />
        <View style={{ flex: 1 }} />
        <View style={{ flex: 3, alignItems: 'center', height: height * 0.5, justifyContent: 'center', borderWidth: 1, borderColor: "rgb(208,229,255)", marginHorizontal: 5 }}>
          <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', borderWidth: 1, borderColor: "rgb(208,229,255)", }}>
            <View style={{ flex: 0.75, alignSelf: 'stretch', borderWidth: 1, backgroundColor: "rgb(241,248,255)", borderColor: "rgb(208,229,255)", justifyContent: 'center' }}>
              <Text style={{ fontSize: 16, color: 'purple', paddingLeft: 10, textAlignVertical: 'center' }}>Today's Word: </Text>
            </View>
            <View style={{ flex: 1.5, alignSelf: 'stretch', borderWidth: 1, backgroundColor: "rgb(241,248,255)", borderColor: "rgb(208,229,255)", justifyContent: 'center' }}>
              <Text style={{ fontSize: 17, color: '#2e78b7', marginLeft: 5, }}>{Word}</Text>
            </View>
          </View>
          <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', borderWidth: 1, borderColor: "rgb(208,229,255)", }}>
            <View style={{ flex: 0.75, alignSelf: 'stretch', borderWidth: 1, backgroundColor: "rgb(241,248,255)", borderColor: "rgb(208,229,255)", justifyContent: 'center' }}>
              <Text style={{ fontSize: 16, color: 'purple', paddingLeft: 10 }}>Translation: </Text>
            </View>
            <View style={{ flex: 1.5, alignSelf: 'stretch', borderWidth: 1, backgroundColor: "rgb(241,248,255)", borderColor: "rgb(208,229,255)", justifyContent: 'center' }}>
              <Text style={{ fontSize: 17, color: '#2e78b7', marginLeft: 5, }}>{Translation}</Text>
            </View>
          </View>
          <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', borderWidth: 1, borderColor: "rgb(208,229,255)", }}>
            <View style={{ flex: 0.75, alignSelf: 'stretch', borderWidth: 1, backgroundColor: "rgb(241,248,255)", borderColor: "rgb(208,229,255)", justifyContent: 'center' }}>
              <Text style={{ fontSize: 16, color: 'purple', paddingLeft: 10 }}>Meaning: </Text>
            </View>
            <View style={{ flex: 1.5, alignSelf: 'stretch', borderWidth: 1, backgroundColor: "rgb(241,248,255)", borderColor: "rgb(208,229,255)", justifyContent: 'center' }}>
              <Text style={{ fontSize: 17, color: '#2e78b7', marginLeft: 5, }}>{Meaning}</Text>
            </View>
          </View>
          <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', borderWidth: 1, borderColor: "rgb(208,229,255)", }}>
            <View style={{ flex: 0.75, alignSelf: 'stretch', borderWidth: 1, backgroundColor: "rgb(241,248,255)", borderColor: "rgb(208,229,255)", justifyContent: 'center' }}>
              <Text style={{ fontSize: 16, color: 'purple', paddingLeft: 10 }}>Sentence: </Text>
            </View>
            <View style={{ flex: 1.5, alignSelf: 'stretch', borderWidth: 1, backgroundColor: "rgb(241,248,255)", borderColor: "rgb(208,229,255)", justifyContent: 'center' }}>
              <Text style={{ fontSize: 17, color: '#2e78b7', marginLeft: 5, }}>{Sentence}</Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 1 }} />

      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    justifyContent: 'center'
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'center',
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
