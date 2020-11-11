<template>
  <div class="ProfilePage">
    <div v-show="isLogged">
      <div class="userInfos">
        <div>Username: {{ currentUser.username }}</div>
        <div>Likes: {{ usersLikes }}</div>
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
      <b-button type="is-success" @click="BrowseAll">Browse all</b-button>
    </div>
  </div>
</template>

<script>
//import Register from "@/components/Register.vue";
import PhotoService from "../Services/PhotoService";
import UserService from "@/Services/UserService";

export default {
  data() {
    return {
      selectedPhoto: null,
      usersLikes: null,
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

        try {
          await PhotoService.upload(formdata);
          this.LoadAllPic();
        } catch (error) {
          this.ImageUploadError();
        }
      }
    },
    async LoadAllPic() {
      this.$store.dispatch("auth/cacheUserPhotos");
    },
    ImageUploadError() {
      this.$buefy.toast.open({
        message: `Image may be larger than the allowed size </b>`,
        type: "is-danger",
      });
    },
    BrowseAll() {
      this.$router.push("/browseAll").catch((err) => {
        err;
      });
    },
  },
  async created() {
    if (!this.isLogged) {
      this.$router.push("/");
    }

    //Loggedin section
    if (this.userPhotos.length == 0) {
      this.LoadAllPic();
    }
    this.usersLikes = await UserService.getUsersLikes();
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
    }
  },
};
</script>

<style scoped>
.userInfos {
  margin: 0.5%;
  padding: 0.5%;
  text-align: center;
  font-size: 1.2rem;
}
.image {
  padding: 0.5%;
  width: 380px;
  display: inline-block;
}
.images {
  text-align: center;
}
</style>