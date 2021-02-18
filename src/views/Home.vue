<template>
  <div class="home">
    <div class="welcome_page" v-if="!isLogged">
        <div>
        <img class="background_wide" src="../assets/background_wide.jpg" />
        <img class="background" src="../assets/background.jpg" />
        </div>  
      <div>
        <Login />
      </div>
    </div>
    <div v-if="isLogged">
      <ActualMeet />
    </div>
  </div>
</template>

<script>
import Login from "@/components/Login.vue";
import ActualMeet from "@/components/ActualMeet.vue";
//import ActiveUsers from "../components/ActiveUsers";

export default {
  data() {    return {      
    };
  },
  methods: {},
  components: {
    Login,
    ActualMeet,
    //ActiveUsers,
  },
  computed: {
    isLogged() {
      return this.$store.state.auth.status.loggedIn;
    },
  },  
};
</script>

<style scoped >
.background_wide {
  width: 100%;
}
.background {
  visibility: hidden;
  width: 0px;
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
  .background_wide {
  visibility: hidden;
  width: 0px;
  }
  .background {
  width: 100%;  
  visibility:visible;
  }
}
</style>