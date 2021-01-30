<template>
  <div>
    <div class="haveMeet" v-if="!isEmpty">
      <div class="user">
      <div class="username">
        {{ user.username }}
      </div>
      <b-carousel
        v-if="actualPhoto != null"
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
    <div class="buttons">
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
    <div class="details_label">Details</div>
    <DatasTenant v-if="user.tenant" :user="user" />
    <DatasLandlord v-else :user="user"/>
    </div>
    <div v-if="isEmpty" class="loading">
      <Loading/>
    </div>
  </div>
</template>

<script>
import PlurenterService from "@/Services/PlurenterService";
import Loading from "./Loading.vue";
import DatasLandlord from "./Landlord/DatasLandlord";
import DatasTenant from "./Tenant/DatasTenant";

export default {
  data() {
    return {
      user: null,
      isEmpty:true,
      actualPhoto: null,
    };
  },
  components: {
    Loading,
    DatasLandlord,
    DatasTenant
    },
  methods: {
    async loadActualMeet() {
      let user = await PlurenterService.actualMeet();

      if (user.id == null && user.username == null && user.photos == null) {
        this.isEmpty = true;
      }
      else{
        this.isEmpty = false;
      }

      if (user.photos != null) {
        this.actualPhoto = user.photos[0];
      } else {
        this.actualPhoto = null
      }
      this.user = user;
    },
    async Like() {
      await PlurenterService.like();
      await this.loadActualMeet();
    },
    async Dislike() {
      await PlurenterService.dislike();
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
.details_label{
  font-size: 1.4rem;
  margin-bottom: -20px;
}
</style>