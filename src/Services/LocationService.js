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
    async getStates(country){
        return await axios.get(IPs.API_URL + 'location/getStates/'+country, {
            headers:authHeader()
        }).then(res=>{            
            return res.data;
        })        
    }   
    async getCities(country,state){
        return await axios.get(IPs.API_URL + 'location/getCities/'+country+'/'+state, {
            headers:authHeader()
        }).then(res=>{            
            return res.data;
        })        
    }   
}
export default new LocationService();