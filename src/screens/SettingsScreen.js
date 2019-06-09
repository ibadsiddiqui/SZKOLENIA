import React from 'react';
import { TouchableOpacity, View, Text, Image, AsyncStorage, Dimensions } from 'react-native';
import * as firebase from "firebase";
import { ScrollView } from 'react-native-gesture-handler';
import Images from '../assets/Images';

const { width, height } = Dimensions.get('window')
export default class SettingsScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      receivedWords: []
    }
  }

  async componentDidMount() {
    console.log(this.state.receivedWords.length)
    const uid = await AsyncStorage.getItem('uid');
    const db = firebase.database();
    await db.ref('/users/' + uid).on('value', (snapshot) => {
      this.setState(snapshot.val());
    })
  }

  renderRow = (item, key) => {
    console.log(item);

    return (
      <TouchableOpacity key={key} style={{ marginLeft: 20, marginTop: 20 }}>
        <View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: "black", fontSize: 15, marginTop: 5 }}>Word: </Text>
            <Text style={{ color: "black", fontSize: 20, }}>{item.Word}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginLeft: 20 }}>
            <Text style={{ color: "black", fontSize: 13, }}>translation: </Text>
            <Text style={{ color: "black", fontSize: 15, }}>{item.Translation}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginLeft: 20 }}>
            <Text style={{ color: "black", fontSize: 13, }}>meaning: </Text>
            <Text style={{ color: "black", fontSize: 15, }}>{item.Meaning}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginLeft: 20 }}>
            <Text style={{ color: "black", fontSize: 13, }}>sentence: </Text>
            <Text style={{ color: "black", fontSize: 15, }}>{item.Sentence}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View>
        <Image source={Images.background} resizeMode="cover" style={{ opacity: 0.4, width: width, height: height, position: 'absolute' }} />
        <Text style={{ fontSize: 20, color: "#2e78b7", textAlign: 'center', marginTop: 40 }}>Previous Words:</Text>
        <ScrollView automaticallyAdjustContentInsets={true} contentInsetAdjustmentBehavior='always'>
          {
            this.state.receivedWords.map((item, key) => (
              <TouchableOpacity key={key} style={{ marginLeft: 20, marginTop: 20 }}>
                <View>
                  <Text style={{ color: "black", fontSize: 20, }}>{item.Word}</Text>
                  <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 5 }}>
                    <Text style={{ color: "black", fontSize: 13, marginTop: 2 }}>translation: </Text>
                    <Text style={{ color: "black", fontSize: 15, width: 275 }}>{item.Translation}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 5 }}>
                    <Text style={{ color: "black", fontSize: 13, marginTop: 5 }}>meaning: </Text>
                    <Text style={{ color: "black", fontSize: 15, width: 275 }}>{item.Meaning}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 5 }}>
                    <Text style={{ color: "black", fontSize: 13, marginTop: 5 }}>sentence: </Text>
                    <Text style={{ color: "black", fontSize: 15, width: 275 }}>{item.Sentence}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          }
        </ScrollView>
      </View>
    );
  }
}
