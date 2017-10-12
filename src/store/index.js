import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import db from './modules/db'
import feature from './modules/feature'

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules:{
        auth,
        db,
        feature
    }
})