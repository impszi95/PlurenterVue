<template>
  <div>
    <form action="">
      <div class="modal-card" >
        <div class="modal-card-head">
          <div class="modal-card-title">
            <p>New match</p>
            <p class="matchName">{{ match.matchName }}</p>
          </div>
        </div>     
          <div class="image_container modal-card-foot">
            <img
              class="image"
              v-if="match.matchthumbnail != ''"
              v-bind:src="
                'data:image/jpg;base64,' + match.matchthumbnail"/>
            <img v-else class="image" src="../assets/default.png" />
          </div>
          <button class="button" type="button" @click="$emit('close')">
            Back
          </button>
          <div class="divider" />
          <button class="button is-danger" type="button" @click="$emit('viewMatches')">
            View matches
          </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: ["match"],

  data() {
    return {
    };
  },
};
</script>

<style scoped>
.button {
  width: 120px;
  height: 3rem;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
}
.divider {
  height: auto;
  width: 10px;
  display: inline-block;
}
.modal-card-title {
  margin-left: auto;
  margin-right: auto; 
}
.modal-card {  
  width: 400px;
  max-width: 90%;
  margin-left: auto;
  margin-right: auto;
  height: auto;
  display: inline-block;
  position: relative;
}
.image_container{
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    position: relative;
    margin-left: auto;
    margin-right: auto;
    background-color: whitesmoke;
}
.image{
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
.matchName{
  font-weight: bold;
  margin-top: 10px;
}
</style>