import axios from 'axios';
import authHeader from './AuthHeader';
import API_URL from '../Enviroment'

class UserService {

    async getUsersCount() {
        return await axios
            .get(API_URL + "usersCount")
            .then((res) => {
                return res.data;
            })
    }

    async getAllUsers() {
        return await axios.get(API_URL + 'getAlluser', {
            headers: authHeader()
        }).then(res => {
            return res.data;
        });
    }
   async getAllMatches(){
        return await axios.get(API_URL + 'getAllMatches', {
            headers: authHeader()
        }).then(res => {
            return res.data;
        });
   }
    async getUsersLikes(){
        return await axios.get(API_URL + 'getUsersLikes',{
            headers: authHeader()
        }).then(res => {
            return res.data;
        });
    }    
    async getMatch(matchId) {
        return await axios.get(API_URL + 'match/'+matchId, {
            headers: authHeader()
        }).then(res=>{            
            return res.data;
        })        
    }
    async saveUserInfos(infos) {
        return await axios.post(API_URL + 'user/save', infos,{
            headers: authHeader()
        }).then(res => {
            return res.data
        });
    }
    async getDescription() {
        return await axios.get(API_URL + 'description', {
            headers: authHeader()
        }).then(res=>{            
            return res.data;
        })        
    }
}

export default new UserService();