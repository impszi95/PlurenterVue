<template>
  <div>
     <div class="field_c">
            <b-field label="Location" />
            <b-button
            rounded
            size="is-small"
            outlined
            :disabled="editCountry"
            :loading="loading == true"
            class="btn_edit"
            type="is-info"
            @click="EditLocation()"
          >
            <b-icon
              class="file-icon"
              icon="pencil"
            ></b-icon>
          </b-button>
      </div>
    <div v-if="!editCountry">     
      <div class="country_state">
        <input class="cs" disabled v-model="country" placeholder="Country"/>
        <input class="cs" disabled v-model="state" placeholder="State" />
        </div>
        <input class="city" disabled v-model="city" placeholder="City"/>
  </div>
  <div v-else>
 <div class="casa">
      <b-field class="casa_field">
        <b-autocomplete
          v-model="country"
          placeholder="Country"
          :keep-first="true"
          :open-on-focus="false"
          :data="filteredCountry"
          field="name"
          @select="(country) => (SelectCountry(country))"
          :clearable="false"
        >
        </b-autocomplete>
      </b-field>
      <b-field class="casa_field"
>
        <b-autocomplete
          v-model="state"
          :disabled="!editState"
          placeholder="State"
          :keep-first="true"
          :open-on-focus="false"
          :data="filteredState"
          field="name"
          @select="(state) => (SelectState(state))"
          :clearable="false"
        >
        </b-autocomplete>
      </b-field>
    </div>
      <b-field>
        <b-autocomplete
          v-model="city"
          placeholder="City"
          :disabled="!editCity"
          :keep-first="true"
          :open-on-focus="false"
          :data="filteredCity"
          field="name"
          @select="(city) => (SelectCity(city))"
          :clearable="false"
        >
        </b-autocomplete>
      </b-field>
  </div>   
  </div>
</template>

<script>
import LocationService from "../Services/LocationService";
export default {
   props: ["location"],

  data() {
    return {
      countries: null,
      states: null,
      cities: null,
      city: "",
      state: "",
      country: "",
      country_selected: null,
      state_selected: null,
      editCountry:false,
      editState:false,
      editCity:false,
      loading : false
    };
  },
  computed: {
    filteredCountry() {
      if(!this.editCountry){
        return [];
      }
      return this.countries.filter((option) => {
        return (
          option.name
            .toString()
            .toLowerCase()
            .indexOf(this.country.toLowerCase()) >= 0
        );
      });
    },
    filteredState() {
      if(!this.editState){
        return []
      }
      return this.states.filter((option) => {
        return (
          option.country_id == this.country_selected &&
          option.name
            .toString()
            .toLowerCase()
            .indexOf(this.state.toLowerCase()) >= 0
        );
      });
    },
    filteredCity() {
      if(!this.editCity){
        return []
      }
      return this.cities.filter((option) => {
        return (
          option.state_id == this.state_selected &&
          option.name
            .toString()
            .toLowerCase()
            .indexOf(this.city.toLowerCase()) >= 0
        );
      });
    },
  },
  methods:{
   async EditLocation(){
    await this.LoadCountries();    
    if(this.location.country != "" && this.location.state != "" && this.location.city!=""){
    await this.LoadStates();    
    await this.LoadCities();    
    }    
    this.editCountry = true; 
    },
    async LoadCountries(){
    this.loading = true;
    this.countries = await LocationService.getCountries();
    this.loading = false;    
    },
    async LoadStates(){
    this.loading = true;
    this.states = await LocationService.getStates(this.country);
    this.loading = false;    
    },
    async LoadCities(){
    this.loading = true;
    this.cities = await LocationService.getCities(this.country, this.state);
    this.loading = false;    
    },
    
    async SelectCountry(country){
      if(country!=null){
      this.country_selected = country.id;
      this.country = country.name;
      await this.LoadStates();         
      this.state_selected = null;
      this.state = "";   
      this.city_selected=null;
      this.city="";
      this.editState = true; 
      }
    },
    async SelectState(state){
      if(state!=null){
      this.state_selected = state.id;
      this.state = state.name;
      await this.LoadCities();            
      this.city_selected=null;
      this.city="";
      this.editCity = true; 
      }
    },
    SelectCity(city){
      if(city != null){
      this.location.country = this.country;
      this.location.country_id = this.country_selected;
      this.location.state = this.state;
      this.location.state_id = this.state_selected;
      this.location.city = city.name;
      this.location.city_id = city.id;
      this.$emit('update:location', this.location);
      }
    }
  },
  async created() {
    if(this.location.country != "" && this.location.state != "" && this.location.city!=""){
    this.loading = false;
    this.country = this.location.country;
    this.state = this.location.state;
    this.city = this.location.city;
    this.country_selected = this.location.country_id;
    this.state_selected = this.location.state_id;
    this.city_selected = this.location.city_id;
    this.editState = true;
    this.editCity = true;
    }
  },
};
</script>

<style scoped>
.field-body .field .field{
    width: 50%;
}
.location{
  text-align: left;
}
input{
  height: 40px;
  padding-bottom: 7px;
  padding-top: 7px;
  padding-left: 11px;
  padding-right: 11px;
  border-radius: 4px;
  font-size: 1rem;  
  margin-bottom:10px;
  border-width: 1px;
}
.btn_edit{
  width: 30px;
  height: 30px;
  margin-left: 10px;
  padding-bottom: 5px;  
  margin-top: -3px;
}
.cs{
  width: 50%;
}
.city{
  width:100%;
}
.field{
  margin-bottom: 10px;
}
.field_c {
  display: flex;
}
.casa{
  display:flex;
  width:100%;
}
.casa_field{
  width:50%;
}
@media only screen and (max-width: 768px) {
  .cs {
    width: 100%;
  }
  .country_state{
    display: block;
  }
  .casa{
    display: block;
  }
  .casa_field{
    width: 100%;
  }
}
</style>