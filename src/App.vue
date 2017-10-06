<template>
  <div id="app">
    <header>
      <span v-show="isLoggedIn" @click="gSignOut">LogOut</span>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import firebase from 'firebase'
import {mapGetters} from 'vuex'

export default {
  name: 'app',
  methods:{
    gSignOut(){
      firebase.auth().signOut().then(function() {
          // Sign-out successful.
          console.log("Sucessfully Logged Out")
      }).catch(function(error) {
          // An error happened.
          console.log("Failed to LogOut", error)
      });
    }
  },
  computed:{
      ...mapGetters([
          'isLoggedIn'
      ])
  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}
</style>
