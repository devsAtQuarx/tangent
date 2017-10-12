const state = {
    library : [],
    libraryBooksCount : 0
}

const getters = {
    library : state => {
        return state.library
    },
    libraryBooksCount : state => {
        return state.libraryBooksCount
    },
}

export default {
    state,
    getters
}