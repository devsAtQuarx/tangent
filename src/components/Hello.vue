<template>
  <div class="hello">
    <h1>Home Page</h1>

    <span @click="goToTangentContact">Contact</span>
    <span @click="goToTangentAbout">About</span>

    <br>
    <br>

    <span @click="schoolLogin">School's Login</span>
    <span @click="principalLogin">Principal's Login</span>
    <span @click="vpLogin">Vice-Principal's Login</span>
    <span @click="teacherlogin">Teacher's Login</span>
    <span @click="ctLogin">Class Teacher Login</span>
    <span @click="accountantLogin">Accountant's Login</span>
    <span @click="studentLogin">Student's Login</span>
    <span @click="parentLogin">Parent's Login</span>

  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'hello',
  methods:{
    goToTangentContact(){
      this.$router.push('/tangentContact')
    },
    goToTangentAbout(){
      this.$router.push('/tangentAbout')
    },

    //
    schoolLogin(){
      this.gSignIn()
    },
    principalLogin(){

    },
    vpLogin(){

    },
    teacherlogin(){

    },
    ctLogin(){

    },
    accountantLogin(){

    },
    studentLogin(){

    },
    parentLogin(){

    },

    //
    gSignIn(){
      let vm = this
      var provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider)
      firebase.auth().getRedirectResult().then(function(result) {
          if (result.credential) {
              // This gives you a Google Access Token. You can use it to access the Google API.
              var token = result.credential.accessToken;
              console.log(token)
              // ...
          }
          // The signed-in user info.
          var user = result.user;
          vm.$router.push('/schoolHome/default')
      }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          console.log(error)
          // ...
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
