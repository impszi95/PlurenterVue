<template>
  <div class="RegisterPage">
    <h1>Register</h1>
    <div class="Register">
      <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
        <b-field label="Username">
          <b-input type="isSuccess" required v-model="user.username"></b-input>
        </b-field>
        <ValidationInput
          class="mainpass"
          rules="required"
          type="password"
          label="Password"
          vid="password"
          v-model="user.password"
        />
        <ValidationInput
          rules="required|confirmed:password"
          name="Password"
          type="password"
          label="Confirm Password"
          v-model="confirmation"
        />
        <div class="type">
          <b-field label="Which one is you?">
            <b-radio v-model="user.type" name="name" native-value="tenant">
              Tenant
            </b-radio>
            <div class="divider"></div>
            <b-radio v-model="user.type" name="name" native-value="landlord">
              Landlord
            </b-radio>
          </b-field>
        </div>
        <div class="reg_b">
          <b-button @click="handleSubmit(register)" type="is-info"
            >Register</b-button>
        </div>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import User from "../Model/User";
import { ValidationObserver } from "vee-validate";
import ValidationInput from "../Inputs/ValidationInput";

export default {
  components: {
    ValidationObserver,
    ValidationInput,
  },

  data() {
    return {
      user: new User("", "", ""),
      confirmation: "",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },

  methods: {
    register() {
      if (this.user.username && this.user.password && this.user.type) {
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
.Register {
  margin-top: 12px;
}
.RegisterPage {
  margin-top: 1rem;
  padding: 20px;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  max-width: 400px;
  padding-top: 0px;
  box-shadow: 0 0px 6px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  background-color: rgb(243, 243, 243);
}
.reg_b {
  margin-top: 10px;
}
.type {
  margin-top: 10px;
  margin-bottom: 10px;
  display: inline-flex;
}
.divider {
  width: 20px;
}
@media only screen and (max-width: 768px) {
  .RegisterPage {
    width: 90%;
  }
}
</style>
