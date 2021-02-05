import axios from 'axios';
import IPs from '../Enviroment'

class AuthService {
    login(user) {
        return axios
            .post(IPs.API_URL + 'auth/signin',{
                email: user.email,
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
        return axios.post(IPs.API_URL + 'auth/signup', {
            name: user.name,
            email: user.email,
            password: user.password,
            type: user.type,
            terms: user.terms
        });
    }
}

export default new AuthService();