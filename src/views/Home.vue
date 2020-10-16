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
      <NextMeet />
    </div>
  </div>
</template>

<script>
import Login from "@/components/Login.vue";
import NextMeet from "@/components/NextMeet.vue";
import UserService from "@/Services/UserService";
//import authHeader from "../Services/AuthHeader";

export default {
  data() {
    return {
      usersCount: "",
    };
  },
  components: {
    Login,
    NextMeet,
  },
  computed: {
    isLogged() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  async created() {
    this.usersCount = await UserService.getUsersCount();
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