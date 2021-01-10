<template>
  <div>
    <form action="">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">New match</p>
        </header>
        <body>
          <div class="matchName">
            <p>{{ match.matchName }}</p>
          </div>
          <div class="image">
            <img
              v-if="match.matchthumbnail != ''"
              v-bind:src="
                'data:image/jpg;base64,' + match.matchthumbnail"/>
            <img v-else src="../assets/default.png" />
          </div>
        </body>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="$emit('close')">
            Back
          </button>
          <div class="divider" />
          <button class="button is-danger" @click="$emit('viewMatches')">
            View matches
          </button>
        </footer>
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

<style>
.button {
  width: 130px;
  margin-left: auto;
  margin-right: auto;
}
.divider {
  height: auto;
  display: inline-block;
}
.modal-card-foot {
  display: inline-block;
  width: 100%;
}
.modal-card-title {
  margin-left: auto;
  margin-right: auto;
  display: inline-block;
}
.modal-card {
  width: 280px;
  display: inline-block;
  margin-left: auto;
  margin-right: auto;
}
.matchName {
  font-size: 2rem;
  background-color: white;
}
</style>