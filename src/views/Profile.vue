<template>
  <div>
    <div class="profile">
      <ProfileTenant v-if="this.currentUser.tenant" />
      <ProfileLandlord v-else/>
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
        <div
          class="image_container"
          v-for="photo in photos"
          @
          :key="photo.id"
          @click="SelectPhoto(photo)"
        >
          <img
            class="image"
            v-bind:src="'data:image/jpg;base64,' + photo.image.data"
          />
          <b-button
            rounded
            class="btn_delete"
            @click="DeletePopUp()"
            type="is-danger"
          >
            <b-icon class="file-icon" icon="close"></b-icon>
          </b-button>
        </div>
      </div>
    </div>
    <b-modal
      class="confirmPopUp"
      v-model="isDeleteModalActive"
      has-modal-card
      trap-focus
      :destroy-on-hide="true"
      aria-role="dialog"
      aria-modal
      :can-cancel="false"
    >
      <ConfirmPopUp @close="CancelDelete()" @delete="DeletePhoto()" />
    </b-modal>
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
      <FullImage
        v-if="selectedPhoto != null"
        :photo="selectedPhoto"
        @close="CancelDelete()"
        @delete="DeletePopUp()"
      />
    </b-modal>
  </div>
</template>

<script>
//import Register from "@/components/Register.vue";
import PhotoService from "../Services/PhotoService";
import ConfirmPopUp from "../components/ConfirmPopUp.vue";
import FullImage from "../components/FullImage.vue";
import ProfileTenant from "../components/ProfileTenant.vue";
import ProfileLandlord from "../components/ProfileLandlord.vue";
import $ from "jquery";

export default {
  components: {
    ConfirmPopUp,
    FullImage,
    ProfileTenant,
    ProfileLandlord
  },
  data() {
    return {
      photos: null,
      isDeleteModalActive: false,
      isFullImageModalActive: false,
      selectedPhoto: null,
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
        message: `Image may be larger than the allowed size (5MB) </b>`,
        type: "is-danger",
      });
    },
    ImageUploaded() {
      this.$buefy.toast.open({
        message: `New image uploaded </b>`,
        type: "is-success",
      });
    },
    DeletePopUp() {
      this.isFullImageModalActive = false;
      this.isDeleteModalActive = true;
    },
    CancelDelete() {
      this.isDeleteModalActive = false;
      this.isFullImageModalActive = false;
      this.selectedPhoto = null;
    },
    DeletePhoto() {
      PhotoService.delete(this.selectedPhoto.id);

      this.photos = this.photos.filter(
        (photo) => photo.id != this.selectedPhoto.id
      );

      this.$store.dispatch("auth/deleteUserPhoto", this.selectedPhoto.id);

      this.isDeleteModalActive = false;
      this.isFullImageModalActive = false;
      this.selectedPhoto = null;
    },
    SelectPhoto(photo) {
      this.selectedPhoto = photo;

      if ($(window).width() < 768) {
        this.isFullImageModalActive = true;
      }
    },    
  },
  async created() {
    if (!this.isLogged) {
      this.$router.push("/");
    }

    if (this.userPhotos == null || this.userPhotos.length == 0) {
      this.LoadAllPic();
    } else {
      this.photos = this.userPhotos;
    }
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
.profile {
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  font-size: 1.2rem;
}
.file.is-success {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 160px;
}
.images {
  min-height: 200px;
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
.btn_delete {
  width: 40px;
  height: 40px;
  padding: 0;
  margin-right: -100%;
  transform: translateX(-50%);
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2), 0 1px 10px 0 rgba(0, 0, 0, 0.19);
  visibility: hidden;
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
  .image_container:hover .btn_delete {
    visibility: visible;
  }
  .fullImagePopUp {
    display: none;
  }
}
</style>