<template>
  <div>
    <h1>About</h1>
    <div class="container">
      <b-button class="terms_b" @click="Terms()" outlined type="is-info is-light">Terms and conditions</b-button>
      </div>
  </div>
</template>

<script>
export default {
  methods:{
    Terms(){
      this.$router.push('terms');
    }
  }
}
</script>

<style scoped>
h1{
  font-size: 2.1rem;
  margin-top: 20px;
  margin-bottom: 40px;
}
.terms_b{  
  margin-left: auto;
  margin-right: auto;
}
.container{
  padding: 20px;
  margin: 20px;
  background-color: rgb(243, 243, 243);
  box-shadow: 0 0px 6px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  display: flex;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}
</style>