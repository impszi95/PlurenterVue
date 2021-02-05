<template>
  <div class="RegisterPage">
    <h1>Register</h1>
    <div class="Register">
      <ValidationObserver ref="observer" v-slot="{ handleSubmit }">        
        <ValidationInput
          class="mainpass"
          rules="required"
          type="name"
          label="Name"
          v-model="user.name"
        />
        <ValidationInputEmail
          class="mainpass"
          rules="required|email"
          type="email"
          label="Email"
          v-model="user.email"
        />
        <ValidationInputPassword
          class="mainpass"
          rules="required|min:8"
          type="password"
          label="Password"
          vid="password"
          v-model="user.password"
        />
        <ValidationInputPassword
          rules="required|confirmed:password|min:8"
          name="Password"
          type="password"
          label="Confirm Password"
          v-model="confirmation"
        />
        <div class="type">
          <b-field required label="Which one is you?">
            <b-radio v-model="user.type" name="name" native-value="tenant">
              Tenant
            </b-radio>
            <div class="divider"></div>
            <b-radio v-model="user.type" name="name" native-value="landlord">
              Landlord
            </b-radio>
          </b-field>
        </div>
        <div class="terms">
          <ValidationSwitch
          name="terms"
          rules="required"
          v-model="user.terms"
          />
          <router-link to="/terms">terms and conditions.</router-link>
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
import UserRegister from "../Model/UserRegister";
import { ValidationObserver } from "vee-validate";
import ValidationInput from "../Inputs/ValidationInput";
import ValidationInputEmail from "../Inputs/ValidationInputEmail";
import ValidationInputPassword from "../Inputs/ValidationInputPassword";
import ValidationSwitch from "../Inputs/ValidationSwitch";

export default {
  components: {
    ValidationObserver,
    ValidationInput,
    ValidationInputEmail,
    ValidationInputPassword,
    ValidationSwitch
  },

  data() {
    return {
      user: new UserRegister("", "", "",false),
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
      if (this.user.name, this.user.email && this.user.password && this.user.type && this.user.terms) {
        this.$store.dispatch("auth/register", this.user).then(
          () => {
            this.login(); 
          },
          () => {
            this.invalidLogin();
          }
        );
      }
    },

    login() {
      if (this.user.email && this.user.password) {
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
        message: `Email is already used or invalid</b>`,
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
.terms{
  border: transparent;
    border-top: rgb(201, 200, 200);
    border-style: solid;
    border-width: 1px;
    padding-top: 20px;
    margin-top:10px;
    display: flex;
  justify-content: center;

    
}
@media only screen and (max-width: 768px) {
  .RegisterPage {
    width: 90%;
  }
}
</style>
