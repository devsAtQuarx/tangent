<template>
  <div class="hello">

    <!--options-->
    <span @click="goToTangentHome">Home</span>
    <span @click="goToTangentContact">Contact</span>
    <span @click="goToTangentAbout">About</span>

    <!--content-->
    <router-view></router-view>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'hello',
  methods:{
    goToTangentHome(){
      this.$router.push('/')
    },
    goToTangentContact(){
      this.$router.push('/tangentContact')
    },
    goToTangentAbout(){
      this.$router.push('/tangentAbout')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
