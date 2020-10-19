<template>
  <div>
    <div v-if="haveMeets" class="user">
      <div class="username">
        {{ user.username }}
      </div>
      <div class="img">
        <img
          v-if="actualPhoto != ''"
          v-bind:src="'data:image/jpg;base64,' + actualPhoto.image.data"
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
        photos: [],
      },
      actualPhoto: "",
      haveMeets: false,
    };
  },
  methods: {
    async loadActualMeet() {
      let user = await TinderService.actualMeet();

      if (user.id == "" && user.username == "" && user.photos.length == 0) {
        this.haveMeets = false;
      } else {
        this.haveMeets = true;
      }

      if (user.photos.length != 0) {
        this.actualPhoto = user.photos[0];
        console.log("kiabállj ha nemüres");
      }
      else{
         this.actualPhoto= "";
      }
      
      console.log(user.photos);
      this.user = user;
    },
    async Like(id) {
      await TinderService.like(id);
      await this.loadActualMeet();
    },
  },
  async created() {
    await this.loadActualMeet();
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