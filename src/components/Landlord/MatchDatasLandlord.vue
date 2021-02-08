<template>
  <div>
    <div class="datas">
      <div class="user_infos">     
          <b-field class="field" label="Email">
            <div>
              <p>{{ user.email }}</p>
            </div>
          </b-field>
           <b-field class="field" label="Phone">
            <div>
              <p>{{ user.phone }}</p>
            </div>
          </b-field>  
          <div class="divider"></div>   
          <b-field class="field" label="Location">
            <div>
              <p>{{ user.location.state }}, {{ user.location.city }}</p>
            </div>
          </b-field>
          <b-field class="field" label="Minimum renting time">
            <div>
              <p>{{ user.minRentTime }}</p>
            </div>
          </b-field>
        <b-field class="field" label="Rent">
            <div>
              <p>{{ user.rent }}</p>
            </div>
        </b-field>  
          <b-field class="field" label="Description">
            <div>
              <p class="desc">{{ user.description }}</p>
            </div>
          </b-field>           
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["user"],
  data(){
    return{
    };
  }
};
</script>

<style scoped>
.datas {
  padding: 20px;
  margin: 20px;
  background-color: rgb(243, 243, 243);
  box-shadow: 0 0px 6px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  display: flex;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
}
.user_infos {
  width: 100%;
}
.field {
  text-align: left;
  width: 100%;
  margin-bottom: 10px;  
}
p{  
  padding: 5px;
  border: gainsboro;
  border-style: solid;
  border-width: thin;
  border-radius: 4px;
  background-color: white;
  min-height: 36px;
}
.desc {
  min-height: 35px;
  width: 100%;
  white-space: pre-line;
}
.divider{    
  border: transparent;
  border-top: rgb(201, 200, 200);
  border-style: solid;
  border-width: 1px;
  margin-bottom: 10px;
  margin-top: 20px;
}
.job{
    min-height: 35px;
}
@media only screen and (max-width: 768px) {
  .datas {
    width: 90%;
  }
}
</style>