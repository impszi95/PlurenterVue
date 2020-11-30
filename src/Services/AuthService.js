import axios from 'axios';

const API_URL = 'http://194.156.81.191:8080/tinder-api/api/auth/';

class AuthService {

    login(user) {
        return axios
            .post(API_URL + 'signin',{
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
        return axios.post(API_URL + 'signup', {
            username: user.username,
            password: user.password
        });
    }
}

export default new AuthService();