import * as axios from 'axios';
import authHeader from './AuthHeader';

const API_URL = 'http://192.168.0.105:8081/';

class PhotoService {
    async upload(formdata) {
        return await axios.post(API_URL + 'photos/add', formdata, {
            headers: authHeader()
        }).then(res => {
            return res.data
        });
    }

    async load(imgId) {
        const response = await axios.get(API_URL + 'photos/' + imgId, {
            headers: authHeader()
        }).then(res => {
            return res.data
        });
        return response.image;
    }

    async loadAll() {
        return await axios.get(API_URL + 'photos', {
            headers: authHeader()
        }).then(res=>{
            return res.data;
        })        
    }
}
export default new PhotoService();