import * as axios from 'axios';
import authHeader from './AuthHeader';
import API_URL from '../Enviroment'

class PhotoService {
    async upload(formdata) {
        return await axios.post(API_URL + 'photos/add', formdata, {
            headers: authHeader()
        }).then(res => {
            return res.data
        });
    }

    async delete(imgId) {
        await axios.delete(API_URL + 'deletePhoto/' + imgId, {
            headers: authHeader()
        });
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