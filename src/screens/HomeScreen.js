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
        <Image source={Images.background} resizeMode="cover" style={{ opacity: 0.4, width: width, height: height, position:'absolute' }} />
        <View style={{ flex: 1 }} />
        <View style={styles.table}>
          <View style={styles.row}>
            <View style={styles.headingCell}>
              <Text style={[styles.heading, { textAlignVertical: 'center' }]}>Today's Word: </Text>
            </View>
            <View style={styles.wordContainer}>
              <Text style={styles.word}>{Word === "" ? "Wait while we send you the word" : Word}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.headingCell}>
              <Text style={styles.heading}>Translation: </Text>
            </View>
            <View style={styles.wordContainer}>
              <Text style={styles.word}>{Translation === "" ? "Wait while we send you the translation" : Translation}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.headingCell}>
              <Text style={styles.heading}>Meaning: </Text>
            </View>
            <View style={styles.wordContainer}>
              <Text style={styles.word}>{Meaning === "" ? "Wait while we send you the meaning" : Meaning}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.headingCell}>
              <Text style={styles.heading}>Sentence: </Text>
            </View>
            <View style={styles.wordContainer}>
              <Text style={styles.word}>{Sentence === "" ? "Wait while we send you the sentence" : Sentence}</Text>
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
  table: {
    flex: 3,
    alignItems: 'center',
    height: height * 0.5,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: "rgb(208,229,255)",
    marginHorizontal: 5
  },
  row: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: "rgb(208,229,255)",
  },
  headingCell: {
    flex: 0.75,
    alignSelf: 'stretch',
    borderWidth: 1,
    backgroundColor: "rgb(241,248,255)",
    borderColor: "rgb(208,229,255)",
    justifyContent: 'center'
  },
  heading: {
    fontSize: 16,
    color: 'purple',
    paddingLeft: 10
  },
  wordContainer: {
    flex: 1.5,
    alignSelf: 'stretch',
    borderWidth: 1,
    backgroundColor: "rgb(241,248,255)",
    borderColor: "rgb(208,229,255)",
    justifyContent: 'center'
  },
  word: {
    fontSize: 17,
    color: '#2e78b7',
    marginLeft: 5,
  },
});
