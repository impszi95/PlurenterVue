<template>
  <div>
    <div v-if="haveMeets" class="user">
      <div class="username">
        {{ user.username }}
      </div>
      <div class="img">
        <img
          v-if="user.photos != null"
          v-bind:src="'data:image/jpg;base64,' + user.photos[0].image.data"
        />
        <img v-else src="../assets/default.png" />
      </div>
      <div class="likes">
        <br />
        <b-button @click="Like(user.id)" type="is-info">Like</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import TinderService from "@/Services/TinderService";

export default {
  data() {
    return {
      user: {
        id: "",
        username: "",
        photos: null,
      },
      haveMeets: false,
    };
  },
  methods: {
    async actualMeet() {
      let user = await TinderService.actualMeet();
      if (user.id == "" && user.username == "" && user.photos == null) {
        this.haveMeets = false;
      } else {
        this.haveMeets = true;
      }
      return user;
    },
    async Like(id) {
      await TinderService.like(id);
      this.user = await this.actualMeet();
    },
  },
  async created() {
    this.user = await this.actualMeet();
  },
};
</script>

<style scoped>
.username {
  font-size: 2rem;
  font: bold;
}
.user {
  background-color: gainsboro;
  margin-top: 1rem;
  vertical-align: middle;
  padding: 0.2rem;
  width: 90%;
  max-width: 600px;
  display: inline-block;
  border-style: solid;
}
.img {
  margin-left: auto;
  margin-right: auto;
  width: 80%;
  max-width: 500px;
}
</style>