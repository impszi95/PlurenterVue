import axios from 'axios';
import authHeader from './AuthHeader';

const API_URL = 'http://localhost:8081/';

class UserService {

    async getUsersCount() {
        return await axios
            .get(API_URL + "usersCount")
            .then((res) => {
                return res.data;
            });
    }

    async getAllUsers() {
        return await axios.get(API_URL + 'getAlluser', {
            headers: authHeader()
        }).then(res => {
            return res.data;
        });
    }

    async like(id){
        return await axios.post(API_URL + 'likeUser?userId='+id,{}, {
            headers: authHeader()
        });  
    }

    async getUsersLikes(){
        return await axios.get(API_URL + 'getUsersLikes',{
            headers: authHeader()
        }).then(res => {
            return res.data;
        });
    }
}

export default new UserService();