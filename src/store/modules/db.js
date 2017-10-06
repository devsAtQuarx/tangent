const state = {
    db : {}
}

const getters = {
    db : state => {
        return state.db
    }
}

export default {
    state,
    getters
}