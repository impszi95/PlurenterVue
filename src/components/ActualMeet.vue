<template>
  <div>
    <div v-if="haveMeets" class="user">
      <div class="username">
        {{ user.username }}
      </div>
      <div class="img">
        <b-carousel
          v-if="actualPhoto != ''"
          :indicator-inside="true"
          :autoplay="false"
        >
          <b-carousel-item v-for="photo in user.photos" :key="photo.id">
            <span class="image">
              <img :src="'data:image/jpg;base64,' + photo.image.data" />
            </span>
          </b-carousel-item>
        </b-carousel>
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
      } else {
        this.actualPhoto = "";
      }
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
  width: auto;
  max-width: 100%;
}
</style>