import axios from 'axios';
import authHeader from './AuthHeader';
import API_URL from '../Enviroment'

class TinderService{
    
    API_URL = IPs.API_URL;

    async like(){
        return await axios.post(API_URL + 'likeUser',{}, {
            headers: authHeader()
        });  
    }
    async dislike(){
        return await axios.post(API_URL + 'dislikeUser',{}, {
            headers: authHeader()
        });  
    }
    async actualMeet(){
        return await axios.get(API_URL + 'actualMeet',{
            headers: authHeader()
        }).then(res => {
            return res.data;
        }); 
    }
}
export default new TinderService();