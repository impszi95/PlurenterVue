<template>
  <div>
    <div v-if="this.matches.length!=0" class="users">
      <div class="user" v-for="user in this.matches"  @click="ViewMatch(user.id)" :key="user.id">
        <div class="name">
          {{ user.displayName }}
        </div>
        <div class="container">
          <img
            v-if="user.thumbnail != null"
            class="img"
            v-bind:src="'data:image/jpg;base64,' + user.thumbnail.image.data"
          />
          <img v-else src="../assets/default.png" />
        </div>
      </div>
    </div>
    <div v-else>
      <h1>No matches yet.</h1>
    </div>
  </div>
</template>

<script>
import UserService from "@/Services/UserService";
export default {
  data() {
    return {
      matches:[],
    };
  },
  async created() {
    this.matches = await UserService.getAllMatches();
  },
  methods: {
    ViewMatch(matchId){
      this.$router.push({name: 'match', params: { matchId: matchId}});
    }
  },
  computed: {},
};
</script>

<style scoped>
h1{
  margin-top: 20px;
  font-size: 1.5rem;
}
.users {
  margin-top: 1rem;
}
.users :hover{  
  background-color: rgb(232, 232, 232);
  }

.user {
  background-color: gainsboro;
  margin: 10px;
  vertical-align: middle;
  width: 300px;
  height: 330px;
  display: inline-block;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.name {
  font-size: 1.2rem;
  height: 30px;
}
.container {
  width: 300px;
  height: 300px;
}
.img {
  object-fit: contain;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
}
</style>