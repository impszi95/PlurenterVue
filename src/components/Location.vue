<template>
  <div v-if="!loading">
    <b-field>
      <b-field>
        <b-autocomplete
          v-model="country"
          placeholder="Country"
          :keep-first="true"
          :open-on-focus="false"
          :data="filteredCountry"
          field="name"
          @select="(option) => (country_selected = option.iso2)"
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
          @select="(option) => (city_selected = option.name)"
          :clearable="false"
        >
        </b-autocomplete>
      </b-field>
  </div>
</template>

<script>
import LocationService from "../Services/LocationService";
export default {
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
      loading: true,
    };
  },
  computed: {
    filteredCountry() {
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
      return this.states.filter((option) => {
        return (
          option.country_code == this.country_selected &&
          option.name
            .toString()
            .toLowerCase()
            .indexOf(this.state.toLowerCase()) >= 0
        );
      });
    },
    filteredCity() {
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
  async created() {
    this.loading = true;
    this.countries = await LocationService.getCountries();
    this.states = await LocationService.getStates();
    this.cities = await LocationService.getCities();
    this.loading = false;
  },
};
</script>

<style scoped>
.field-body .field .field{
    width: 50%;
}
</style>