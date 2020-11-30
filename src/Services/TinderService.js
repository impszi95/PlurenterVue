import axios from 'axios';
import authHeader from './AuthHeader';

const API_URL = 'http://194.156.81.191:8080/tinder-api/';

class TinderService{

    async like(id){
        return await axios.post(API_URL + 'likeUser?userId='+id,{}, {
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