<template>
  <div>
    <div class="users">
      <div class="user" v-for="user in this.users" :key="user.id">
        <div class="username">
          {{ user.username }}
        </div>
        <img
          v-if="user.photos.length != 0"
          class="img"
          v-bind:src="'data:image/jpg;base64,' + user.photos[0].data"
        />
        <img v-else src="../assets/default.png" />
        <div class="likes">
          Likes: {{ user.likes }}
          <br />
          <b-button @click="Like(user.id)" type="is-info">Like</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "@/Services/UserService";

export default {
  data() {
    return {
      users: [],
    };
  },
  async created() {
    this.users = await UserService.getAllUsers();
  },
  methods: {
    Like(id) {
      UserService.like(id).then(() => {
        let likedUser = this.users.find((x) => x.id === id);
        likedUser.likes++;
      });
    },
  },
};
</script>

<style scoped>
.users {
  background-color: slategray;
  margin-top: 1rem;
}
.user {
  background-color: gainsboro;
  margin: 0.1rem;
  vertical-align: middle;
  padding: 0.2rem;
  width: 300px;
  height: 400px;
  display: inline-block;
  border-style: solid;
}
.img {
  max-width: 90%;
  max-height: 70%;
}
</style>