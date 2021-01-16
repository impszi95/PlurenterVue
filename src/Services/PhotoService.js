import * as axios from 'axios';
import authHeader from './AuthHeader';
import IPs from '../Enviroment'

class PhotoService {
    async upload(formdata) {
        return await axios.post(IPs.API_URL + 'photos/add', formdata, {
            headers: authHeader()
        }).then(res => {
            return res.data
        });
    }

    async delete(imgId) {
        await axios.delete(IPs.API_URL + 'deletePhoto/' + imgId, {
            headers: authHeader()
        });
    }

    async loadAll() {
        return await axios.get(IPs.API_URL + 'photos', {
            headers: authHeader()
        }).then(res=>{            
            return res.data;
        })        
    }
    async getThumbnailForMatch(){
        return await axios.get(IPs.API_URL + 'photo/userThumbnail', {
            headers:authHeader()
        }).then(res=>{            
            return res.data;
        })        
    }
}
export default new PhotoService();