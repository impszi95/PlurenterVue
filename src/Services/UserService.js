import axios from 'axios';
import authHeader from './AuthHeader';

const API_URL = 'http://localhost:8081/';

class UserService {

    getUsersCount() {

        return axios.get(API_URL + 'countUsers');
    }

    getAllUsers() {
       return axios.get(API_URL + 'user', {headers: authHeader()}).then(res => {
            return res.data;
        });
    }

}

export default new UserService();