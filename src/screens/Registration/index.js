import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    ActivityIndicator,
    ToastAndroid,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    Alert
} from 'react-native';
import Images from '../../assets/Images';
import AuthController from '../../controllers/AuthControllers';

export default class RegistrationView extends Component {
    static navigationOptions = {
        header: null,
    };
    
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            attemptingRegister: false
        }
    }

    toggleLoader = () => this.setState(prevState => ({
        attemptingRegister: !prevState.attemptingRegister
    }))

    resetState = () => {
        this.setState({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        })
    }

    onClickListener = async (viewId) => {
        const { navigate } = this.props.navigation;
        const helper = {
            navigate: (route) => navigate(route),
            resetState: () => this.resetState(),
            toggleLoader: () => this.toggleLoader()
        }
        switch (viewId) {
            case "restore_password":
                Alert.alert("", "Please contact your school administration department.");
                break;
            case "register":
                await AuthController.hanldeRegistration(this.state, helper);
                break;
            case "login":
                this.props.navigation.navigate('Login');
                break;

            default:
                break;
        }
    }

    render() {
        const { attemptingRegister } = this.state;
        if (attemptingRegister === false)
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
        else
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#00b5ec" />
                </View>
            )
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
