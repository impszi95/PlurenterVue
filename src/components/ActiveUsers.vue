<template>
  <div>
    <div class="activeUsers">Active users: {{ usersCount }}</div>
  </div>
</template>

<script>
import UserService from "@/Services/UserService";

export default {
    data(){
        return{
            usersCount: "",
        }
    },
    async created() {
    if(!this.isLogged){
    this.usersCount = await UserService.getUsersCount();
    }
  },    
   computed: {
    isLogged() {
      return this.$store.state.auth.status.loggedIn;
    },
  },  
};
</script>

<style scoped>
.activeUsers {
  background-color: rgb(72, 199, 116);
  padding: 0.6rem;
  width: max-content;
  font-size: 1.3rem;
  color: white;
  margin-left: auto;
  margin-right: auto;
  border-radius: 45px;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>