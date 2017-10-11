const state = {
    db : {},
    storage : {}
}

const getters = {
    db : state => {
        return state.db
    },
    storage : state =>{
        return state.storage
    }
}

export default {
    state,
    getters
}