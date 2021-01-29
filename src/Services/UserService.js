import axios from 'axios';
import authHeader from './AuthHeader';
import IPs from '../Enviroment'

class UserService {
    async getUsersCount() {
        return await axios
            .get(IPs.API_URL + "usersCount")
            .then((res) => {
                return res.data;
            })
    }

    async getAllUsers() {
        return await axios.get(IPs.API_URL + 'getAlluser', {
            headers: authHeader()
        }).then(res => {
            return res.data;
        });
    }
   async getAllMatches(){
        return await axios.get(IPs.API_URL + 'getAllMatches', {
            headers: authHeader()
        }).then(res => {
            return res.data;
        });
   } 
    async getMatch(matchId) {
        return await axios.get(IPs.API_URL + 'match/'+matchId, {
            headers: authHeader()
        }).then(res=>{            
            return res.data;
        })        
    }
    async saveTenantInfos(infos) {
        return await axios.post(IPs.API_URL + 'tenant/save', infos,{
            headers: authHeader()
        }).then(res => {
            return res.data
        });
    }
    async saveLandlordInfos(infos) {
        return await axios.post(IPs.API_URL + 'landlord/save', infos,{
            headers: authHeader()
        }).then(res => {
            return res.data
        });
    }
    async getTenantInfos(){
        return await axios.get(IPs.API_URL + 'getTenantInfo', {
            headers: authHeader()
        }).then(res=>{            
            return res.data;
        })
    }
    async getLandlordInfos(){
        return await axios.get(IPs.API_URL + 'getLandlordInfo', {
            headers: authHeader()
        }).then(res=>{            
            return res.data;
        })
    }
}

export default new UserService();