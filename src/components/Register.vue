<template>
  <div class="RegisterPage">
    <h1>Register</h1>
    <div class="Register">
      <b-field label="Username">
        <b-input type="isSuccess" required v-model="user.username"></b-input>
      </b-field>
      <b-field label="Password">
        <b-input type="password" password-reveal required v-model="user.password"></b-input>
      </b-field>
      <div class="logout_b">
        <b-button @click="register()" type="is-info">Register</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import User from "../Model/User";

export default {
  data() {
    return {
      user: new User("", ""),
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },

  methods: {
    register() {
      if (this.user.username && this.user.password) {
        this.$store.dispatch("auth/register", this.user).then(
          () => {
            this.login(); //Egyből login reg után
          },
          () => {
            this.invalidLogin();
          }
        );
      }
    },

    login() {
      if (this.user.username && this.user.password) {
        this.$store.dispatch("auth/login", this.user).then(
          () => {
            this.$router.push("/profile").catch((err) => {
              err;
            });
          },
          (error) => {
            this.loading = false;
            this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
          }
        );
      }
    },

    invalidLogin() {
      this.$buefy.toast.open({
        message: `Username is already used or invalid</b>`,
        type: "is-danger",
      });
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 2rem;
}
.RegisterPage {
  padding-top: 1rem;
  width: 50%;
  margin-left: 25%;
}
</style>
