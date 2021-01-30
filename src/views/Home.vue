<template>
  <div class="home">
    <div class="welcome_page" v-if="!isLogged">
      <img class="logo" src="../assets/logo.png" />
      <ActiveUsers v-if="!isLogged"/>
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
import ActiveUsers from "../components/ActiveUsers";

export default {
  data() {    return {      
    };
  },
  methods: {},
  components: {
    Login,
    ActualMeet,
    ActiveUsers,
  },
  computed: {
    isLogged() {
      return this.$store.state.auth.status.loggedIn;
    },
  },  
};
</script>

<style scoped >

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