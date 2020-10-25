<template>
  <div id="app">
    <div id="nav">
      <router-link id="logo" to="/"
        ><img src="./assets/logo.png"
      /></router-link>
      <router-link class="nav_e" to="/">Home</router-link>
      <router-link v-show="isLogged" class="nav_e" to="/profile"
        >Profile</router-link
      >
      <router-link class="nav_e" v-show="isLogged" to="/Matches">Matches</router-link>

      <div v-show="isLogged" class="Logout">
        <b-button size="is-small" type="is-success" @click="logout()"
          >Logout</b-button
        >
      </div>
    </div>
    <router-view />
    <div class="foot">
      <p>© 2020 MyTinder. All Rights Reserved</p>
    </div>
  </div>
</template>

<script>
export default {
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
  color: #2c3e50;
}

#nav {
  padding: 1rem;
  padding-bottom: 0px;
}

#nav a {
  font-weight: bold;
  font-size: 1.5rem;
  color: #2c3e50;
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
</style>
