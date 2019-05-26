import AuthServices from "../services/AuthService";
import { Alert, ToastAndroid } from 'react-native'
export default class AuthController {
    static async hanldeRegistration(props, helper) {
        const { email, password, confirmPassword, name } = props;
        const { navigate, resetState, toggleLoader } = helper
        if (password === confirmPassword) {
            toggleLoader()
            try {
                const response = await AuthServices.registerUser(email, password, name);
                if (response === true)
                    return navigate('MainTabNavigator');
            } catch (error) {
                ToastAndroid.show(error, ToastAndroid.SHORT)
                toggleLoader()
                resetState();
                return;
            }
        } else {
            return Alert.alert('', "Passwords does not match.")
        }
    }
}