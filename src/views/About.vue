<template>
  <div>
    <div class="header_container">      
    <h1>About</h1>
    </div>
    <div class="container">
      <p class="about_t">It's becoming more and more difficult for landlords to find good tenants. On a traditional renting website, you get a ton of tenant requests, which results in a bunch of time consuming on-site interviews by the time you filter out the right person whom you are willing to rent your apartment.
<br /><br />
With Plurenter you can filter tenants and view their profile before you get contacted, which helps you save time by only contacting those tenants who already fit your requirements.</p>
    </div>
    <div class="container">
      <b-button class="terms_b" @click="Terms()" outlined type="is-info is-light">Terms and conditions</b-button>
      </div>
      <p class="created">Created by Bence Varga <br /> theplurenter@gmail.com </p>
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
.header_container{
  background-color:rgb(72, 199, 116);
  padding-top: 20px;
  padding-bottom: 20px;
}
h1{
  font-size: 2.1rem;
  color:white;
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
  width: 60%;
  margin-left: auto;
  margin-right: auto;
}
.about_t{
  text-align: left;
}
.created{
  margin-top: 50px;
}
@media only screen and (max-width: 768px) {
  .container {
    width: 90%;
  }
}
</style>