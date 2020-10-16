<template>
  <div class="home">
    <div class="welcome_page" v-if="!isLogged">
      <img alt="Vue logo" src="../assets/logo.png" />
      <div class="activeUsers">Active users: {{ usersCount }}</div>
      <div>
        <Login />        
      </div>
    </div>
    <div v-if="isLogged" class="BrowseUsers">
      <BrowseUsers />
    </div>
  </div>
</template>

<script>
import Login from "@/components/Login.vue";
import BrowseUsers from "@/components/BrowseUsers.vue"
import UserService from "@/Services/UserService";
//import authHeader from "../Services/AuthHeader";

export default {
  data() {
    return {
      usersCount:null,
    };
  },
  components: {
    Login,
    BrowseUsers,
  },
  computed: {
    isLogged() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  async created() {
    if (!this.isLogged) {
      this.usersCount = await UserService.getUsersCount();
    } else {
      // akk töltse be a tindert ha bevagy jelentkezve csak pneding megy és nem asyn még
      //   let nextUser = axios
      //     .get("http://localhost:8081/" + "nextUser", { headers: authHeader() })
      //     .then((res) => {
      //       return res.data;
      //     });
      
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