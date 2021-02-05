<template>
  <div id="app">
    <div id="nav">
      <b-navbar :shadow="true">
        <template slot="brand">
          <b-navbar-item tag="router-link" :to="{ path: '/' }">
            <img class="home_logo" src="./assets/logo.png" />
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
           <b-navbar-item
            class="nav-item"
            tag="router-link"
            :to="{ path: '/about' }"
          >
            About
          </b-navbar-item>
          <b-navbar-item tag="div">
            <div class="buttons">
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
.home_logo{
  height: 25px;
}
.nav_e {
  padding: 1rem;
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
