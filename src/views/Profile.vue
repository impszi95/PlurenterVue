<template>
  <div>
    <div class="userInfos">
      <div class="datas">
        <div>Username: {{ currentUser.username }}</div>
        <div>Likes: {{ usersLikes }}</div>
      </div>
      <div class="upload_img">
        <div class="upload_container">
          <b-field class="file is-success">
            <b-upload @input="onUpload" accept="image/*" class="file-label">
              <span class="file-cta">
                <b-icon class="file-icon" icon="upload"></b-icon>
                <span class="file-label">Upload image</span>
              </span>
            </b-upload>
          </b-field>
        </div>
      </div>
      <div class="images">
        <div class="image_container" v-for="photo in photos" :key="photo.id">
          <img
            class="image"
            v-bind:src="'data:image/jpg;base64,' + photo.image.data"
          />
        </div>
      </div>
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
      usersLikes: null,
      photos: null,
    };
  },
  methods: {
    async onUpload(file) {
      let selectedPhoto = file;
      if (selectedPhoto != null) {
        let formdata = new FormData();
        formdata.append("name", "file");
        formdata.append("userId", this.currentUser.id);
        formdata.append("file", selectedPhoto);

        try {
          await PhotoService.upload(formdata);
          this.LoadAllPic();
          this.ImageUploaded();
        } catch (error) {
          this.ImageUploadError();
        }
      }
    },
    LoadAllPic() {
      this.$store.dispatch("auth/cacheUserPhotos").then((res) => {
        this.photos = res;
      });
    },
    ImageUploadError() {
      this.$buefy.toast.open({
        message: `Image may be larger than the allowed size </b>`,
        type: "is-danger",
      });
    },
    ImageUploaded() {
      this.$buefy.toast.open({
        message: `New image uploaded </b>`,
        type: "is-success",
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

    if (this.userPhotos == null || this.userPhotos.length == 0) {
      this.LoadAllPic();
      console.log("load");
    } else {
      this.photos = this.userPhotos;
      console.log("cache");
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
    },
  },
};
</script>

<style scoped>
.userInfos {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  font-size: 1.2rem;
}
.datas {
  margin-bottom: 20px;
  background-color: gainsboro;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.file.is-success {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
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
@media only screen and (max-width: 768px) {
  [class*="image_container"] {
    width: 50%;
    height: 0;
    padding-bottom: 50%;
    position: relative;
    margin-left: auto;
    margin-right: auto;
  }
}
@media only screen and (max-width: 768px) {
  [class*="image"] {   
  }
}
</style>