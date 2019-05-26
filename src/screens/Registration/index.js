import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    Alert
} from 'react-native';
import Images from '../../assets/Images';
import AuthController from '../../controllers/AuthControllers';

export default class RegistrationView extends Component {

    constructor(props) {
        super(props);
        state = {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
    }

    onClickListener = async (viewId) => {
        switch (viewId) {
            case "restore_password":
                Alert.alert("", "Please contact your school administration department.");
                break;
            case "register":
                await AuthController.hanldeRegistration(this.state);
                break;
            case "login":
                this.props.navigation.navigate('Login');
                break;

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
                        placeholder="Name"
                        placeholderTextColor="black"
                        maxLength={30}
                        keyboardType="email-address"
                        underlineColorAndroid='transparent'
                        onChangeText={(name) => this.setState({ name })} />
                </View>

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

                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} source={Images.password} />
                    <TextInput style={styles.inputs}
                        placeholder="Confirm Password"
                        placeholderTextColor="black"
                        secureTextEntry={true}
                        maxLength={30}
                        underlineColorAndroid='transparent'
                        onChangeText={(confirmPassword) => this.setState({ confirmPassword })} />
                </View>
                <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('register')}>
                    <Text style={styles.loginText}>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonContainer} onPress={() => this.onClickListener('restore_password')}>
                    <Text>Forgot your password?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonContainer} onPress={() => this.onClickListener('login')}>
                    <Text>Already registered? Click here.</Text>
                </TouchableOpacity>
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
