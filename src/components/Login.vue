<template>
  <div class="LoginPage">
    <h1>Let's start it</h1>
    <div class="Login">
      <b-field label="Email">
        <b-input v-model="user.email"></b-input>
      </b-field>
      <b-field label="Password">
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
import UserLogin from "../Model/UserLogin";

export default {
  name: "Login",
  data() {
    return {
      user: new UserLogin("",""),
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
      if (this.user.email && this.user.password) {
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
    register() {
      this.$router.push("register");
    },
    invalidLogin() {
      this.$buefy.toast.open({
        message: `Invalid email or password</b>`,
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
  margin-top: 12px;
  margin-left: auto;
  margin-right: auto;
}
.LoginPage {
  margin-top: 25px;
  background-color: rgb(243, 243, 243);
  padding: 20px;
  padding-top: 0px;
  width: 50%;
  max-width: 400px;
  box-shadow: 0 0px 6px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin-left: auto;
  margin-right: auto;
}
@media only screen and (max-width: 768px) {
  .LoginPage {
    width: 90%;
  }
}
</style>