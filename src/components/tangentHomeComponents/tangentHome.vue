<template>
    <div>
        <h1>Tangent Home</h1>

        <!--content-->
        <p @click="schoolLogin">I am School</p>
        <p @click="principalLogin">I am Principal</p>
        <p @click="vpLogin">I am Vice-principal</p>
        <p @click="teacherlogin">I am Teacher</p>
        <p @click="ctLogin">I am Class Teacher</p>
        <p @click="accountantLogin">I am Accountant</p>
        <p @click="studentLogin">I am Student</p>
        <p @click="parentLogin">I am Parent</p>

    </div>
</template>

<script>
    import firebase from 'firebase'

    export default {
        data(){
          return {
              whoIsLoggedIn : ''
          }
        },
        methods:{
            schoolLogin(){
                this.whoIsLoggedIn = 'school'
                this.gSignIn()
            },
            principalLogin(){
                this.whoIsLoggedIn = 'principal'
                this.gSignIn()
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
                this.whoIsLoggedIn = 'student'
                this.gSignIn()
            },
            parentLogin(){

            },
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
                    vm.$router.push('gLogin/' + vm.whoIsLoggedIn)
                    // The signed-in user info.
                    var user = result.user;
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
            },
        }
    }
</script>