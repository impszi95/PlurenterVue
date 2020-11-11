import AuthService from '../Services/AuthService';
import PhotoService from '../Services/PhotoService';
import UserService from '../Services/UserService';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? {
    status: {
        loggedIn: true
    },
    user,
    userPhotos:[],
    allMatches:[]
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
        async cacheUserPhotos({
            commit
        }) {
            return await PhotoService.loadAll().then(
                photos => {
                    commit('cacheUserPhotos', photos);
                    return Promise.resolve(photos);
                }
            );
        },
        cacheAllMatches({
            commit
        }) {
            return UserService.getAllMatches().then(
                allMatches => {
                    commit('cacheAllMatches', allMatches);
                    return Promise.resolve(allMatches);
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
            state.allMatches = [];
        },
        registerSuccess(state) {
            state.status.loggedIn = false;
        },
        registerFailure(state) {
            state.status.loggedIn = false;
        },
        cacheUserPhotos(state, photos) {
            state.userPhotos = photos
        },
        cacheAllMatches(state, allMatches){
            state.allMatches = allMatches;
        }
    }
}