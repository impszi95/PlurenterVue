<template>
  <div>
    <div v-if="haveMeets" class="user">
      <div class="username">
        {{ user.username }}
      </div>
      <img
        v-if="user.photo != null"
        class="img"
        v-bind:src="'data:image/jpg;base64,' + user.photo.image.data"
      />
      <img v-else src="../assets/default.png" />
      <div class="likes">
        <br />
        <b-button @click="Like(user.photo.userId)" type="is-info"
          >Like</b-button
        >
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
        username: "",
        photo: null,
      },
      haveMeets: false,
    };
  },
  methods: {
   async nextMeet() {
      let user = await TinderService.nextMeet();
      console.log(user);
      if (user.username == "" && user.photo == null) {
        this.haveMeets = false;
      } else {
        this.haveMeets = true;
      }

      return user;
    },
    async Like(id) {
      await TinderService.like(id);
      this.user = await this.nextMeet();
    },
  },
  async created() {
    this.user = await this.nextMeet();
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
  height: 80%;
  max-width: 600px;
  display: inline-block;
  border-style: solid;
}
.img {
  max-width: 90%;
  max-height: 90%;
}
</style>