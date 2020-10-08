<template>
  <div class="ProfilePage">
    <div v-show="isLogged">
      <div class="userInfos">
        <div>Username: {{ currentUser.username }}</div>
        <div>Likes: {{ currentUser.like }}</div>
        <div class="images">
          <div class="image" v-for="photo in this.userPhotos" :key="photo.id">
            <img v-bind:src="'data:image/jpg;base64,' + photo.image.data" />
          </div>
        </div>
      </div>
      <div class="upload_img">
        <input
          class="input-file"
          type="file"
          @change="onPhotoSelected"
          accept="image/*"
        />
        <b-button @click="onUpload">Upload</b-button>
      </div>
    </div>
  </div>
</template>

<script>
//import Register from "@/components/Register.vue";
import PhotoService from "../Services/PhotoService";

export default {
  data() {
    return {
      selectedPhoto: null,
    };
  },
  methods: {
    onPhotoSelected(event) {
      this.selectedPhoto = event.target.files[0];
    },
    async onUpload() {
      if (this.selectedPhoto != null) {
        let formdata = new FormData();
        formdata.append("name", "file");
        formdata.append("userId", this.currentUser.id);
        formdata.append("file", this.selectedPhoto);
        await PhotoService.upload(formdata);
        this.LoadAllPic();
      }
    },
    async LoadAllPic() {
      let loadedPhotos = await PhotoService.loadAll();
      this.$store.dispatch("auth/cacheUserPhotos", loadedPhotos);
      console.log("loadedall");
    },
  },
  created() {
    if (!this.isLogged) {
      this.$router.push("/");
    }
    if (this.userPhotos.length == 0) {
      this.LoadAllPic();
    }
  },
  components: {
    // Register
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    isLogged() {
      return this.$store.state.auth.status.loggedIn;
    },
    userPhotos() {
      return this.$store.state.auth.userPhotos;
    },
  },
};
</script>

<style scoped>
.userInfos {
  margin: 1rem;
  padding: 1rem;
  text-align: left;
  font-size: 1.2rem;
}
.image {
  padding: 0.2rem;
  width: 400px;
  display: inline-block;
}
.images {
  text-align: center;
}
</style>