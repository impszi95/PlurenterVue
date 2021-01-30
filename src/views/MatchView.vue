<template>
  <div>
    <div v-if="!loading">
      <MatchTenant v-if="match.tenant" :match="match" />
      <MatchLandlord v-else :match="match"/>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import UserService from "../Services/UserService";
import MatchTenant from "../components/MatchTenant";
import MatchLandlord from "../components/MatchLandlord";

export default {
  components: {
    MatchTenant,
    MatchLandlord
  },
  data() {
    return {
      matchId: this.$route.params.matchId,
      match: null,
      loading: true,
    };
  },
  methods: {
    async LoadUser() {
      this.match = await UserService.getMatch(this.matchId).then();
      this.loading=false;
    },
  },
  computed: {
    isLogged() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (!this.isLogged) {
      this.$router.push("/");
    }
    this.LoadUser();
  },
};
</script>

<style scoped>

</style>