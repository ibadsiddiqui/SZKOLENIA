import AuthServices from "../services/AuthService";
import {Alert} from 'react-native'
export default class AuthController {
    static async hanldeRegistration(props) {
        const { email, password, confirmPassword, name } = props;
        if (password === confirmPassword) {
            await AuthServices.registerUser(email, password);
        }else {
            return Alert.alert('', "Passwords does not match.")
        }
    }
}