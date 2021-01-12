<template>
  <div class="LoginPage">
    <h1>Let's start it!</h1>
    <div class="Login">
      <b-field type="is-dark" label="Username">
        <b-input  v-model="user.username"></b-input>
      </b-field>
      <b-field type="is-dark" label="Password">
        <b-input type="password" v-model="user.password"></b-input>
      </b-field>
      <div class="login_b">
        <b-button @click="login()" type="is-success">Login</b-button>
      </div>
      <p>or</p>
      <div class="reg_b">
        <b-button @click="register()" type="is-info">Register</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import User from "../Model/User";

export default {
  name: "Login",
  data() {
    return {
      user: new User("", ""),
      message: "",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },

  methods: {
    login() {
      if (this.user.username && this.user.password) {
        this.$store.dispatch("auth/login", this.user).then(
          () => {
            this.$router.push("/").catch((err) => {
              err;
            });
          },
          (error) => {
            this.loading = false;
            this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();

            this.invalidLogin();
          }
        );
      }
    },
    register(){
      this.$router.push("register");
    },
    invalidLogin() {
      this.$buefy.toast.open({
        message: `Invalid username or password</b>`,
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
.Login {
  padding-top: 0.5rem;
  display: inline-block;
  margin-left: auto;
  margin-right: auto;
}
</style>