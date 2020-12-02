import axios from 'axios';
import API_URL from '../Enviroment'

class AuthService {

    login(user) {
        return axios
            .post(API_URL + 'auth/signin',{
                username: user.username,
                password: user.password
            })
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(user) {
        return axios.post(API_URL + 'auth/signup', {
            username: user.username,
            password: user.password
        });
    }
}

export default new AuthService();