<template>
  <div class="home">
    <div class="welcome_page" v-show="!isLogged">
    <img  alt="Vue logo" src="../assets/logo.png" />
    <div class="activeUsers">Active users: {{ usersCount }}</div>
    <div>
      <Login />
    </div>
    </div>   
  </div>
</template>

<script>
import Login from "@/components/Login.vue";
import axios from "axios";

export default {
  data() {
    return {
      //usersCount : UserService.getUsersCount(),
      users: [],
      usersCount: 0,
    };
  },
  components: {
    Login,
  },
  computed: {
    isLogged() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if(!this.isLogged){
    this.usersCount = axios
      .get("http://localhost:8081/" + "usersCount")
      .then((res) => {
        this.usersCount = res.data;
      });
    }
  },
};
</script>

<style scoped >
.activeUsers {
  background-color: rgb(72, 199, 116);
  padding: 0.6rem;
  width: max-content;
  font-size: 1rem;
  color: white;
  margin-left: auto;
  margin-right: auto;
  border-radius: 25px;
}
</style>