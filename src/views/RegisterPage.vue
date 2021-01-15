<template>
  <div class="RegisterPage">    
    <img class="logo" src="../assets/logo.png" /> 
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
<style scoped>

.logo {
  width: 400px;
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>
