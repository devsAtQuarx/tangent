const state = {
    user : {},
    isLoggedIn : false,
    whoLoggedIn : '',
    schoolId : ''
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
    },
    schoolId:state =>{
        return state.schoolId
    }
}

export default {
    state,
    getters
}