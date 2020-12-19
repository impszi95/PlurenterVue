<template>
  <div class="home">
    <div class="welcome_page" v-if="!isLogged">
      <img class="logo" alt="Vue logo" src="../assets/logo.png" />
      <div class="activeUsers">Active users: {{ usersCount }}</div>
      <div>
        <Login />
      </div>
    </div>
    <div v-if="isLogged" class="Tinder">
      <ActualMeet v-if="!isEmptyMeet" @empty="onEmptyMeet" />
       <Loading />
    </div>   
  </div>
</template>

<script>
import Login from "@/components/Login.vue";
import ActualMeet from "@/components/ActualMeet.vue";
import Loading from "@/components/Loading.vue";
import UserService from "@/Services/UserService";
//import authHeader from "../Services/AuthHeader";

export default {
  data() {
    return {
      usersCount: "",
      isEmptyMeet:false
    };
  },
  methods:{
    onEmptyMeet(isEmptyMeet){
      this.isEmptyMeet=isEmptyMeet;
    }
  },
  components: {
    Login,
    ActualMeet,
    Loading,
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
@media only screen and (max-width: 768px) {
  .logo {
    height: 160px;
  }
}

</style>