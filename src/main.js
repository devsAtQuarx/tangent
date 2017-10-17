// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import {config} from './firebase/config'
import {store} from './store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  created(){
      const firebaseApp = firebase.initializeApp(config)
      firebase.auth().onAuthStateChanged((user) => {
          if (user) {
              console.log('Logged In', user.uid)
              store.state.auth.user = user
              store.state.auth.isLoggedIn = true
              store.state.db.db = firebaseApp.database()
              store.state.db.storage = firebaseApp.storage()

          } else {
              console.log('Not LoggedIn')
              store.state.auth.isLoggedIn = false
              this.$router.push({name: 'tangentHome', params:{
                    whoIsLoggedIn : 'notLoggedIn'
                }
              })
          }
      });
  },
  template: '<App/>',
  components: { App }
})
