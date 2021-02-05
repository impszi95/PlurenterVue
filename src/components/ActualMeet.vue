<template>
  <div>
    <div v-if="isActive">
      <div class="haveMeet" v-if="!isEmpty">
        <div class="user">
          <div class="name">
            {{ user.name }}
          </div>
          <b-button
            rounded
            class="btn_info"
            type="is-info"
            @click="Info()"
            inverted
          >
            <b-icon
              class="file-icon"
              size="is-medium"
              icon="information"
            ></b-icon>
          </b-button>
          <b-carousel
            v-if="actualPhoto != null"
            :indicator-inside="true"
            :autoplay="false"
            icon-size="is-medium"
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
          <div v-else class="image_container">
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
        <div id="datas" class="details_label">Details</div>
        <DatasTenant v-if="user.tenant" :user="user" />
        <DatasLandlord v-else :user="user" />
      </div>
      <div v-if="isEmpty" class="loading">
        <Loading />
      </div>
    </div>
    <div class="notActive" v-else>
      <p>Your profile must be activated.</p>
    </div>
  </div>
</template>

<script>
import PlurenterService from "@/Services/PlurenterService";
import Loading from "./Loading.vue";
import DatasLandlord from "./Landlord/DatasLandlord";
import DatasTenant from "./Tenant/DatasTenant";
import $ from "jquery";
import UserService from "../Services/UserService";
export default {
  data() {
    return {
      user: null,
      isEmpty: true,
      actualPhoto: null,
      isActive: false,
    };
  },
  components: {
    Loading,
    DatasLandlord,
    DatasTenant,
  },
  methods: {
    async loadActualMeet() {
      let user = await PlurenterService.actualMeet();
      if (user.id == null && user.name == null && user.photos == null) {
        this.isEmpty = true;
      } else {
        this.isEmpty = false;
      }

      if (user.photos != null) {
        this.actualPhoto = user.photos[0];
      } else {
        this.actualPhoto = null;
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
    Info() {
      $([document.documentElement, document.body]).animate(
        {
          scrollTop: $("#datas").offset().top,
        },
        800
      );
    },
  },
  async created() {
    await this.loadActualMeet();
    this.isActive = await UserService.getIsActive();
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
.name {
  display: block;
  margin-left: auto;
  margin-right: auto;
  font-size: 2rem;
  font: bold;
  height: 50px;
  width: 100%;
  border: transparent;
  border-bottom: rgb(201, 200, 200);
  border-style: solid;
  border-width: 1px;
}
.image_container {
  width: 500px;
  height: 500px;
  position: relative;
  background-color: #cecece;
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
.btn_info {
  width: 50px;
  height: 50px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 5px 15px 0 rgba(0, 0, 0, 0.14);
  margin: 0;
  padding: 0;
  position: absolute;
  bottom: 8px;
  right: 8px;
  font-size: 18px;
  z-index: 10;
}
.details_label {
  font-size: 1.4rem;
  margin-bottom: -20px;
}
.notActive{
  margin-top: 140px;
  font-size: 1rem;
}
</style>