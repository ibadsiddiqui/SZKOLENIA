import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    Image,
    Alert
} from 'react-native';
import Images from '../../assets/Images';

export default class LoginView extends Component {

    constructor(props) {
        super(props);
        state = {
            email: '',
            password: '',
        }
    }

    onClickListener = (viewId) => {
        switch (viewId) {
            case "restore_password":
                Alert.alert("", "Please contact your school administration department.");
                break;
            case "register":
                this.props.navigation.navigate('Register');
                break;
            case "login":

            default:
                break;
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} source={Images.email} />
                    <TextInput style={styles.inputs}
                        placeholder="Email"
                        placeholderTextColor="black"
                        maxLength={30}
                        keyboardType="email-address"
                        underlineColorAndroid='transparent'
                        onChangeText={(email) => this.setState({ email })} />
                </View>

                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} source={Images.password} />
                    <TextInput style={styles.inputs}
                        placeholder="Password"
                        placeholderTextColor="black"
                        secureTextEntry={true}
                        maxLength={30}
                        underlineColorAndroid='transparent'
                        onChangeText={(password) => this.setState({ password })} />
                </View>

                <TouchableHighlight
                    style={[styles.buttonContainer, styles.loginButton]}
                    onPress={() => this.onClickListener('login')}
                >
                    <Text style={styles.loginText}>Login</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.buttonContainer}
                    onPress={() => this.onClickListener('restore_password')}
                >
                    <Text>Forgot your password?</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.buttonContainer}
                    onPress={() => this.onClickListener('register')}
                >
                    <Text>Register</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    inputContainer: {
        borderBottomColor: '#FFFFFF',
        backgroundColor: '#dcf4ff',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 280,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#F5FCFF',
        flex: 1,
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: 'center'
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 280,
        borderRadius: 30,
    },
    loginButton: {
        backgroundColor: "#00b5ec",
    },
    loginText: {
        color: 'white',
    }
});
