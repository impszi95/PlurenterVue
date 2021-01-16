import axios from 'axios';
import authHeader from './AuthHeader';
import IPs from '../Enviroment'

class TinderService{
    async like(){
        return await axios.post(IPs.API_URL + 'likeUser',{}, {
            headers: authHeader()
        });  
    }
    async dislike(){
        return await axios.post(IPs.API_URL + 'dislikeUser',{}, {
            headers: authHeader()
        });  
    }
    async actualMeet(){
        return await axios.get(IPs.API_URL + 'actualMeet',{
            headers: authHeader()
        }).then(res => {
            return res.data;
        }); 
    }
}
export default new TinderService();