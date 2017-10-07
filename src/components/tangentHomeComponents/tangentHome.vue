<template>
    <div>
        <h1>Tangent Home</h1>

        <!--content-->
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
        data(){
          return {
              db : this.$store.state.db.db,
              whoLoggedIn : this.$store.state.auth.whoLoggedIn
          }
        },
        methods:{
            schoolLogin(){
                this.whoLoggedIn = 'school'
                this.gSignIn()
            },
            principalLogin(){
                this.whoLoggedIn = 'principal'
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
                this.whoLoggedIn = 'student'
                this.gSignIn()
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
                    vm.$router.push({name : 'schoolHome', params : {id:'default' , whoLoggedIn:vm.whoLoggedIn } })
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