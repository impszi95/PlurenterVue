<template>
  <div>
      <div class="datas">
      <div class="user_infos">            
        <div>
          <b-field class="field" label="Location">
            <div>
              <p class="loc">{{ user.location.state }}, {{ user.location.city }}</p>
            </div>
          </b-field>
        </div>  
        <div>
          <b-field class="field" label="Minimum renting time">
            <div>
              <p>{{ user.minRentTime }}</p>
            </div>
          </b-field>
        </div>
          <b-field class="field" label="Rent">
            <div>
              <p>{{ user.rent }}</p>
            </div>
        </b-field>  
        <div>
          <b-field class="field" label="Description">
            <div>
              <p class="desc">{{ user.description }}</p>
            </div>
          </b-field>
        </div>
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
}
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
}
.desc {
  min-height: 35px;
  width: 100%;
  white-space: pre-line;
}
@media only screen and (max-width: 768px) {
  .datas {
    width: 90%;
  }
}
</style>