<template>
  <div class="hello">

    {{$route.params}}

    <!--options-->
    <span @click="goToTangentHome">Home</span>
    <span @click="goToTangentContact">Contact</span>
    <span @click="goToTangentAbout">About</span>

    <!--content-->
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'hello',
  methods:{
    goToTangentHome(){
        this.$router.push({name : 'tangentHome' , params: {
            whoisLoggedIn : this.$route.params.whoisLoggedIn
        }
        })
    },
    goToTangentContact(){
      this.$router.push({name : 'tangentContact' , params: {
          whoisLoggedIn : this.$route.params.whoisLoggedIn
        }
      })
    },
    goToTangentAbout(){
        this.$router.push({name : 'tangentAbout' , params: {
            whoisLoggedIn : this.$route.params.whoisLoggedIn
        }
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
