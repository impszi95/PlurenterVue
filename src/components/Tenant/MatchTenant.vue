<template>
  <div>
    <div class="username">{{ match.username }}</div>
    <DatasTenant :user="match" />
    <div class="images">
      <div
        class="image_container"
        v-for="photo in match.photos"
        @
        :key="photo.id"
        @click="SelectPhoto(photo)"
      >
        <img
          class="image"
          v-bind:src="'data:image/jpg;base64,' + photo.image.data"
        />
      </div>
    </div>
    <b-modal
      class="fullImagePopUp"
      v-model="isFullImageModalActive"
      has-modal-card
      trap-focus
      :destroy-on-hide="true"
      aria-role="dialog"
      aria-modal
      :can-cancel="false"
    >
      <FullImageOnlyView
        v-if="selectedPhoto != null"
        :photo="selectedPhoto"
        @close="Cancel()"
      />
    </b-modal>
  </div>
</template>

<script>
import FullImageOnlyView from "../FulImageOnlyView";
import DatasTenant from "../Tenant/DatasTenant";
export default {
  props: ["match"],
  components: {
    FullImageOnlyView,
    DatasTenant,
  },
  data() {
    return {
      isFullImageModalActive: false,
      selectedPhoto: null,
    };
  },
  methods: {
    Cancel() {
      this.isFullImageModalActive = false;
      this.selectedPhoto = null;
    },
    SelectPhoto(photo) {
      this.selectedPhoto = photo;
      this.isFullImageModalActive = true;
    },
  },
};
</script>

<style scoped>
.image_container {
  position: relative;
  background-color: gainsboro;
  display: inline-block;
  width: 400px;
  height: 400px;
  margin-top: -0.5rem;
  margin: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.image {
  object-fit: contain;
  top: 50%;
  transform: translateY(-50%);
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
}
.username {
  margin-top: 20px;
  font-size: 2rem;
}
@media only screen and (max-width: 768px) {
  .image_container {
    width: 50%;
    height: 0;
    padding-bottom: 50%;
    position: relative;
    margin-left: auto;
    margin-right: auto;
  }
}
@media only screen and (min-width: 769px) {
  .image_container:hover {
    width: 410px;
    height: 410px;
    margin-bottom: 0px;
    margin-left: 5px;
    margin-right: 5px;
  }
  .image_container:hover {
    visibility: visible;
  }
}
</style>