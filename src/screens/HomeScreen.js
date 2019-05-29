import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  AsyncStorage,
  Text,
  View,
} from 'react-native';
import * as firebase from "firebase";

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
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Text style={{ fontSize: 18, color: 'purple' }}>Today's Word: </Text>
            <Text style={{ fontSize: 30, color: '#2e78b7' }}>{Word}</Text>
          </View>
          <View style={styles.welcomeContainer}>
            <Text style={{ fontSize: 18, color: 'purple' }}>Translation: </Text>
            <Text style={{ fontSize: 30, color: '#2e78b7' }}>{Translation}</Text>
          </View>
          <View style={styles.welcomeContainer}>
            <Text style={{ fontSize: 18, color: 'purple' }}>Meaning: </Text>
            <Text style={{ fontSize: 20, color: '#2e78b7', textAlign: 'center', width: 250 }}>{Meaning}</Text>
          </View>
          <View style={styles.welcomeContainer}>
            <Text style={{ fontSize: 18, color: 'purple' }}>Sentence: </Text>
            <Text style={{ fontSize: 20, color: '#2e78b7', textAlign: 'center', width: 250 }}>{Sentence}</Text>
          </View>

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40
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
