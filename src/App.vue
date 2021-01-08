<template>
  <div id="app">
    <div id="nav">
      <b-navbar>
        <template slot="brand">
          <b-navbar-item tag="router-link" :to="{ path: '/' }">
            <img src="./assets/logo.png" />
          </b-navbar-item>
        </template>
        <template slot="start">
          <b-navbar-item class="nav-item" tag="router-link" :to="{ path: '/' }">
            Home
          </b-navbar-item>
          <b-navbar-item
            class="nav-item"
            v-show="isLogged"
            tag="router-link"
            :to="{ path: '/profile' }"
          >
            Profile
          </b-navbar-item>
          <b-navbar-item
            class="nav-item"
            v-show="isLogged"
            tag="router-link"
            :to="{ path: '/matches' }"
          >
            Matches
          </b-navbar-item>
        </template>
        <template slot="end">
          <b-navbar-item tag="div">
            <div class="buttons">
              <a
                v-show="!isLogged"
                id="bt"
                class="button is-success"
                @click="goToRegister()"
              >
                <strong>Sign up</strong>
              </a>
              <a
                v-show="isLogged"
                id="bt"
                class="button is-success"
                @click="logout()"
              >
                <strong>Logout</strong>
              </a>
            </div>
          </b-navbar-item>
        </template>
      </b-navbar>
    </div>
    <WebSocket v-if="isLogged" />
    <router-view />
    <div class="foot">
      <p>© 2020 MyTinder. All Rights Reserved</p>
    </div>
  </div>
</template>

<script>
import WebSocket from "./components/WebSocket.vue";
export default {
  components: {
    WebSocket,
  },
  computed: {
    isLogged() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/").catch((err) => {
        err;
      });
    },
    goToRegister() {
      this.$router.push("/register");
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  padding: 0rem;
  padding-bottom: 0px;
}

#nav a :scope {
  font-weight: bold;
  font-size: 1.5rem;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.Logout {
  position: absolute;
  top: 1.1rem;
  right: 1.2rem;
}

.foot {
  position: unset;
  margin-top: 3rem;
  bottom: 0;
  height: 40px;
  font-family: "Open Sans", sans-serif;
}
.nav_e {
  padding: 1rem;
}
#logo {
  position: absolute;
  top: 0.6rem;
  left: 1rem;
  width: 3rem;
}
.nav-item {
  font-size: 1.5rem;
  font-weight: bold;
}
#bt {
  font-size: 1.2rem;
  width: 90px;
  margin-left: auto;
  margin-right: auto;
  height: 45px;
}
</style>
