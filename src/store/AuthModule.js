import AuthService from '../Services/AuthService';
import PhotoService from '../Services/PhotoService';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? {
    status: {
        loggedIn: true
    },
    user,
    userPhotos: [],
} : {
    status: {
        loggedIn: false
    },
};

export const auth = {
    namespaced: true,
    state: initialState,    
    actions: {
        login({
            commit
        }, user) {
            return AuthService.login(user).then(
                user => {
                    commit('loginSuccess', user);
                    return Promise.resolve(user);
                },
                error => {
                    commit('loginFailure');
                    return Promise.reject(error);
                }
            );
        },
        logout({
            commit
        }) {
            AuthService.logout();
            commit('logout');
        },
        register({
            commit
        }, user) {
            return AuthService.register(user).then(
                response => {
                    commit('registerSuccess');
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('registerFailure');
                    return Promise.reject(error);
                }
            );
        },
        cacheUserPhotos({
            commit
        }) {
            return PhotoService.loadAll().then(
                photos => {
                    commit('cacheUserPhotos', photos);
                    return Promise.resolve(photos);
                }
            );
        }
    },
    mutations: {
        loginSuccess(state, user) {
            state.status.loggedIn = true;
            state.user = user;
        },
        loginFailure(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        logout(state) {
            state.status.loggedIn = false;
            state.user = null;
            state.userPhotos = [];
        },
        registerSuccess(state) {
            state.status.loggedIn = false;
        },
        registerFailure(state) {
            state.status.loggedIn = false;
        },
        cacheUserPhotos(state, photos) {
            state.userPhotos = photos
        }
    }
}