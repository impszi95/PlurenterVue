<template>
  <div class="RegisterPage">
    <img alt="Vue logo" src="../assets/logo.png" />  
    <div v-show="!isLogged">
      <Register />
    </div>      
     
  </div>
</template>

<script>
import Register from "@/components/Register.vue";

export default {
  name: "RegisterPage",
  data(){
    return{
  }},
  components: {
    Register
  },
  computed:{
    isLogged() {
    return this.$store.state.auth.status.loggedIn
  }
  }
};
</script>
