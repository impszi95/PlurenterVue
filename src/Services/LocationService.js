import axios from 'axios';
import authHeader from './AuthHeader';
import IPs from '../Enviroment'

class LocationService {
    async getCountries(){
        return await axios.get(IPs.API_URL + 'location/getCountries', {
            headers:authHeader()
        }).then(res=>{            
            return res.data;
        })        
    }    
    async getStates(){
        return await axios.get(IPs.API_URL + 'location/getStates', {
            headers:authHeader()
        }).then(res=>{            
            return res.data;
        })        
    }   
    async getCities(){
        return await axios.get(IPs.API_URL + 'location/getCities', {
            headers:authHeader()
        }).then(res=>{            
            return res.data;
        })        
    }   
}
export default new LocationService();