<template>
  <div class="home">
    <div class="welcome_page" v-if="!isLogged">
      <img class="logo" src="../assets/logo.png" />
      <div class="activeUsers">Active users: {{ usersCount }}</div>
      <div>
        <Login />
      </div>
    </div>
    <div v-if="isLogged" class="Tinder">
      <ActualMeet />
    </div>
  </div>
</template>

<script>
import Login from "@/components/Login.vue";
import ActualMeet from "@/components/ActualMeet.vue";
import UserService from "@/Services/UserService";
//import authHeader from "../Services/AuthHeader";

export default {
  data() {
    return {
      usersCount: "",
    };
  },
  methods: {},
  components: {
    Login,
    ActualMeet,
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
  font-size: 1.3rem;
  color: white;
  margin-left: auto;
  margin-right: auto;
  border-radius: 45px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.logo {
  width: 400px;
  margin-top: 20px;
  margin-bottom: 10px;
}
.welcome {
  visibility: hidden;
}

@media only screen and (max-width: 768px) {
  .logo {
    visibility: hidden;
    margin-top: 0px;
    width: 0px;
  }
  .welcome {
    width: 0px;
    visibility: visible;
  }
}
</style>