<template>
  <div>
    <div v-if="haveMeets" class="user">
      <div class="username">
        {{ user.username }}
      </div>
      <b-carousel
        v-if="actualPhoto != ''"
        :indicator-inside="true"
        :autoplay="false"
      >
        <b-carousel-item v-for="photo in user.photos" :key="photo.id">
          <div class="image_container">
            <img
              class="image"
              :src="'data:image/jpg;base64,' + photo.image.data"
            />
          </div>
        </b-carousel-item>
      </b-carousel>
      <div v-else  class="image_container">
      <img class="image" src="../assets/default.png" />
      </div>
    </div>
    <div v-if="haveMeets" class="buttons">
      <b-button
        rounded
        class="btn"
        @click="Dislike()"
        type="is-info"
        icon="upload"
      >
        <b-icon class="file-icon" size="is-medium" icon="close"></b-icon>
      </b-button>
      <b-button rounded class="btn" @click="Like()" type="is-danger">
        <b-icon class="file-icon" size="is-medium" icon="heart"></b-icon>
      </b-button>
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
  components: {},
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
    async Like() {
      await TinderService.like();
      await this.loadActualMeet();
    },
    async Dislike() {
      await TinderService.dislike();
      await this.loadActualMeet();
    },
  },
  async created() {
    await this.loadActualMeet();
  },
};
</script>

<style scoped>
.user {
  background-color: gainsboro;
  position: relative;
  height: 550px;
  width: 500px;
  display: inline-block;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
@media only screen and (max-width: 550px) {
  [class*="user"] {
    width: 90%;
    height: auto;
  }
}
.username {
  display: block;
  margin-left: auto;
  margin-right: auto;
  font-size: 2rem;
  font: bold;
  height: 50px;
}
.image_container {
  width: 500px;
  height: 500px;
  position: relative;
}
@media only screen and (max-width: 550px) {
  [class*="image_container"] {
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    position: relative;
    margin-left: auto;
    margin-right: auto;
  }
}
.image {
  object-fit: contain;
  margin-left: auto;
  margin-right: auto;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  height: 100%;

  position: absolute;
  left: 0;
}
.buttons {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 6px;
}
.btn {
  width: 70px;
  height: 70px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 5px 15px 0 rgba(0, 0, 0, 0.19);
}
</style>