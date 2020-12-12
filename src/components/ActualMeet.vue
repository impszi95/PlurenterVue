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
            <img class="image" :src="'data:image/jpg;base64,' + photo.image.data" />
          </div>
        </b-carousel-item>
      </b-carousel>
      <img class="blank_img" v-else src="../assets/default.png" />  
      <div class="buttons">
        <b-button class="btn_like" @click="Like(user.id)" type="is-info">Like</b-button>
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
.user {
  background-color: gainsboro;
  height: 600px;
  max-width: 500px;
  width: 100%;
  display: inline-block;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

}
.username {
  font-size: 2rem;
  font: bold;
  height: 50px;
}
.image_container{  
  height: 500px;
  width: 500px;
}
.image {
  object-fit: contain;
  margin-left: auto;  
  margin-right: auto;
  top: 50%;
  transform: translateY(-50%);
}
.blank_img{
  height: 500px;
  width: 500px;
}
.buttons{
  position: relative;
  height: 50px;
}
.btn_like{  
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>