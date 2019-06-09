import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    ActivityIndicator,
    View,
    TextInput,
    TouchableHighlight,
    Dimensions,
    Image,
    Alert
} from 'react-native';
import Images from '../../assets/Images';
import AuthController from '../../controllers/AuthControllers';
const { height, width } = Dimensions.get('window')

export default class LoginView extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            attemptingLogin: false
        }
    }

    resetState = () => this.setState({
        email: '',
        password: '',
    })

    toggleLoader = () => this.setState(prevState => ({
        attemptingLogin: !prevState.attemptingLogin
    }))

    onClickListener = async (viewId) => {
        const { navigate } = this.props.navigation;

        const helper = {
            toggleLoader: () => this.toggleLoader(),
            resetState: () => this.resetState(),
            navigate: (route) => navigate(route)
        };

        switch (viewId) {
            case "restore_password":
                Alert.alert("", "Please contact your school administration department.");
                break;
            case "login":
                await AuthController.hanldeSignIn(this.state, helper);
                break;
            default:
                break;
        }
    }

    render() {
        const { attemptingLogin, email, password } = this.state;
        if (!attemptingLogin)
            return (
                <View style={styles.container}>
                    <View style={styles.backgroundContainer}>
                        <Image source={Images.background} resizeMode="cover" style={{ opacity: 0.4,  width:width, height:height }} />
                    </View>

                    <View style={styles.inputContainer}>
                        <Image style={styles.inputIcon} source={Images.username} />
                        <TextInput style={styles.inputs}
                            placeholder="Please enter username"
                            placeholderTextColor="black"
                            maxLength={30}
                            value={email}
                            keyboardType="email-address"
                            underlineColorAndroid='transparent'
                            onChangeText={(email) => this.setState({ email })} />
                    </View>

                    <View style={styles.inputContainer}>
                        <Image style={styles.inputIcon} source={Images.password} />
                        <TextInput style={styles.inputs}
                            placeholder="Please enter PIN"
                            placeholderTextColor="black"
                            secureTextEntry={true}
                            value={password}
                            maxLength={30}
                            underlineColorAndroid='transparent'
                            onChangeText={(password) => this.setState({ password })} />
                    </View>

                    <TouchableHighlight underlayColor="transparent"
                        style={[styles.buttonContainer, styles.loginButton]}
                        onPress={() => this.onClickListener('login')}
                    >
                        <Text style={styles.loginText}>Login</Text>
                    </TouchableHighlight>

                    <TouchableHighlight underlayColor="transparent"
                        style={styles.buttonContainer}
                        onPress={() => this.onClickListener('restore_password')}
                    >
                        <Text>Forgot your PIN? Click here.</Text>
                    </TouchableHighlight>
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
    backgroundContainer: {
        position: 'absolute',
        alignSelf: 'center',
        justifyContent: 'center',
        width: width * 0.5,
        left: 0,
        height,
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
