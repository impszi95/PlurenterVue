<template>
  <div>
    <form action="">
      <div class="modal-card">
        <header @click="$emit('close')" class="modal-card-head">
          <img
            class="image"
            v-bind:src="'data:image/jpg;base64,' + photo.image.data"
          />
        </header>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: ["photo"],
};
</script>

<style scoped>
.modal-card {
  height: auto;
  display: inline-block;
  position: relative;
}
.modal-card-head {
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  border: none;
  background-color: transparent;
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
</style>