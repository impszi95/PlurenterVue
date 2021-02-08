<template>
  <div>
     <div class="field_c">
            <b-field label="Location" />
            <b-button
            rounded
            size="is-small"
            outlined
            :disabled="modifyLocation"
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
    <div v-if="!modifyLocation">     
      <div class="country_state">
        <input class="cs" disabled v-model="country" placeholder="Country"/>
        <input class="cs" disabled v-model="state" placeholder="State" />
        </div>
        <input class="city" disabled v-model="city" placeholder="City"/>
  </div>
  <div v-else>
 <b-field>
      <b-field>
        <b-autocomplete
          v-model="country"
          placeholder="Country"
          :keep-first="true"
          :open-on-focus="false"
          :data="filteredCountry"
          field="name"
          @select="(option) => (country_selected = option.id)"
          :clearable="false"
        >
        </b-autocomplete>
      </b-field>
      <b-field>
        <b-autocomplete
        class="state"
          v-model="state"
          placeholder="State"
          :keep-first="true"
          :open-on-focus="false"
          :data="filteredState"
          field="name"
          @select="(option) => (state_selected = option.id)"
          :clearable="false"
        >
        </b-autocomplete>
      </b-field>
    </b-field>
      <b-field>
        <b-autocomplete
          v-model="city"
          placeholder="City"
          :keep-first="true"
          :open-on-focus="false"
          :data="filteredCity"
          field="name"
          @select="(option) => (SelectCity(option.name, option.id))"
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
      city_selected: null,
      state_selected: null,
      modifyLocation:false,
      loading : false
    };
  },
  computed: {
    filteredCountry() {
      if(this.loading){
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
      if(this.loading){
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
      if(this.loading){
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
    await this.LoadLocations();    
    this.country = this.location.country;
    this.state = this.location.state;
    this.city = this.location.city;
    this.modifyLocation = true;
    },
    async LoadLocations(){
    this.loading = true;
    this.countries = await LocationService.getCountries();
    this.states = await LocationService.getStates();
    this.cities = await LocationService.getCities();
    this.loading = false;
    },
    SelectCity(city, city_id){
      this.location.country = this.country;
      this.location.country_id = this.country_selected;
      this.location.state = this.state;
      this.location.state_id = this.state_selected;
      this.location.city = city;
      this.location.city_id = city_id;
      this.$emit('update:location', this.location);
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
.country_state{
  widows: 100%;
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
</style>