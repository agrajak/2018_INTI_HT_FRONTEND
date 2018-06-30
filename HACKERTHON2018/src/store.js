import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
/* eslint-disable */
export const store = new Vuex.Store({
    state:{
        isLogged: false,
        id: '',
        token: ''
    },
    getters:{
        isLogged: function(state){
            return state.isLogged
        },
        getId: function(state){
            return state.id
        },
        getToken: function(state){
            return state.token
        }
    },
    mutations: {
        logIn: function(state, payload){
            state.isLogged = true
            state.id = payload.id
            state.token = payload.token
        },
        logOut: function(state, payload){
            state.isLogged = false
            state.id = ''
            state.token = ''
        }
    }
});