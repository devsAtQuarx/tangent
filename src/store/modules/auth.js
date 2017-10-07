const state = {
    user : {},
    isLoggedIn : false,
    whoLoggedIn : ''
}

const getters = {
    user : state => {
        return state.user
    },
    isLoggedIn: state=>{
        return state.isLoggedIn
    },
    whoLoggedIn:state =>{
        return state.whoLoggedIn
    }
}

export default {
    state,
    getters
}