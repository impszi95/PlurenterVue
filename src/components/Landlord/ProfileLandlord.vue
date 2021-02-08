<template>
  <div>
    <div class="stats">
      <div class="likes_div">
        <div>
          <strong class="stats_text">Likes</strong>
        </div>
        <div class="likes">
          <div class="stats_val_div">
            <strong class="stats_val">{{ likes }}</strong>
          </div>
        </div>
      </div>
      <div class="matches_div">
        <div>
          <strong class="stats_text">Matches</strong>
        </div>
        <div class="matches">
          <div class="stats_val_div">
            <strong class="stats_val">{{ matches }}</strong>
          </div>
        </div>
      </div>
    </div>
    <div class="datas">
      <div class="user_infos">
        <div class="first_tab">
          <div>
            <b-field label="Name">
              <b-input placeholder="e.g., John" v-model="name"></b-input>
            </b-field>
            <div class="email_container">
              <div class="email">
                <p class="email_label">Email</p>
                <p>{{ currentUser.email }}</p>
              </div>
              <b-field class="phone" label="Phone">
                <b-input v-model="phone" placeholder="+36 20 1111111"></b-input>
              </b-field>
            </div>
            
            <b-field class="field" label="Description">
              <b-input
                placeholder="Write something about yourself."
                class="desc_input"
                maxlength="500"
                type="textarea"
                v-model="description"
              ></b-input>
            </b-field>
          </div>
        </div>
        <div class="second_tab">
          <LocationSkeleton v-if="locationLoading" />
          <Location v-else :location.sync="location" />
          <div class="field_c">
            <b-field label="Minimum renting time" />
            <div class="help" @click="snackbar">
              <span class="q_icon">?</span>
            </div>
          </div>
          <div class="minRentTime">
            <div class="container">
              <p>Year</p>
              <b-field>
                <b-numberinput
                  v-model="year"
                  min="0"
                  type="is-success"
                  class="time_input"
                  controls-position="compact"
                  controls-rounded
                ></b-numberinput
              ></b-field>
            </div>
            <div class="container">
              <p>Month</p>
              <b-field>
                <b-numberinput
                  v-model="month"
                  min="0"
                  type="is-success"
                  class="time_input"
                  controls-position="compact"
                  controls-rounded
                ></b-numberinput
              ></b-field>
            </div>
            <div class="container">
              <p>Day</p>
              <b-field>
                <b-numberinput
                  v-model="day"
                  min="0"
                  type="is-success"
                  class="time_input"
                  controls-position="compact"
                  controls-rounded
                ></b-numberinput
              ></b-field>
            </div>
          </div>
          <b-field label="Rent">
              <b-numberinput
                class="amount_i"
                :controls="false"
                placeholder="Amount"
                v-model="amount"
              ></b-numberinput>
              <b-select placeholder="Currency" v-model="currency">
                <option
                  v-for="currency in currencies"
                  :value="currency"
                  :key="currency"
                >
                  {{ currency }}
                </option>
              </b-select>
              <b-select class="select" placeholder="Period" v-model="period">
                <option value="Yearly">Yearly</option>
                <option value="Monthly">Monthly</option>
                <option value="Weekly">Weekly</option>
                <option value="Daily">Daily</option>
              </b-select>
            </b-field>
          <div class="save_div">
            <b-button class="save_btn" @click="Save()" type="is-success"
              >Save</b-button
            >
          </div>
        </div>
      </div>
      <div class="active_c">
        <div class="active_container">
          <div v-if="active">
            <div class="active">
              <h1>Your profile is active.</h1>
              <b-icon
                class="file-icon"
                size="is-medium"
                icon="check-circle"
                type="is-success"
              ></b-icon>
            </div>
            <b-button
              class="deactivate_btn"
              @click="Deactivate()"
              type="is-danger"
              >Turn off</b-button
            >
          </div>
          <div v-else>
            <div class="active">
              <h1>Your profile is not active.</h1>
              <b-icon
                class="file-icon"
                size="is-medium"
                icon="close-circle"
                type="is-danger"
              ></b-icon>
            </div>
            <b-button
              :disabled="canActivate != true"
              class="activate_btn"
              @click="Activate()"
              type="is-success"
              >Activate</b-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "@/Services/UserService";
import Location from "../Location";
import LocationSkeleton from "../LocationSkeleton";
const currencies = require("@/assets/currencies.json");

export default {
  components: {
    Location,
    LocationSkeleton,
  },
  data() {
    return {
      active: null,
      likes: null,
      matches: null,
      name: null,
      phone:null,
      description: null,
      location: null,
      year: 0,
      month: 0,
      day: 0,
      amount: null,
      period: null,
      currency: null,
      currencies: currencies,
      canActivate: null,
      locationLoading: true,
    };
  },
  async created() {
    let landlordInfos = await UserService.getLandlordInfos();
    this.active = landlordInfos.active;
    this.name = landlordInfos.name;
    this.canActivate = landlordInfos.canActivate;
    this.description = landlordInfos.description;
    this.phone = landlordInfos.phone;
    this.location = landlordInfos.location;
    this.locationLoading = false;
    this.likes = landlordInfos.likes;
    this.matches = landlordInfos.matches;
    this.year = landlordInfos.minRentTime.year;
    this.month = landlordInfos.minRentTime.month;
    this.day = landlordInfos.minRentTime.day;
    this.amount =
      landlordInfos.rent.amount == 0 ? null : landlordInfos.rent.amount;
    this.currency =
      landlordInfos.rent.currency == "" ? null : landlordInfos.rent.currency;
    this.period =
      landlordInfos.rent.period == "" ? null : landlordInfos.rent.period;
  },
  methods: {
    async Save() {
      if (this.year === 0 && this.month === 0 && this.day === 0) {
        this.openToast("Set a minimum renting time.", "is-danger", 2000);
        return;
      }
      if (this.name == "") {
        this.openToast("Name can't be empty.", "is-danger", 2000);
        return;
      }
      if (
        this.amount === null ||
        this.currency === null ||
        this.period === null
      ) {
        this.openToast("Fill all rent fields!", "is-danger", 2000);
        return;
      }
      if (this.amount < 0) {
        this.openToast("Rent amount can't be negativ!", "is-danger", 2000);
        return;
      }
      if (
        this.location.country == "" ||
        this.location.state == "" ||
        this.location.city == "" ||
        this.location.city_id == ""
      ) {
        this.openToast("Choose location.", "is-danger", 2000);
        return;
      }
      let landlordInfos = {
        name: this.name,
        description: this.description,
        phone: this.phone,
        minRentTime: {
          year: this.year,
          month: this.month,
          day: this.day,
        },
        location: this.location,
       rent: {
          amount: this.amount,
          currency: this.currency,
          period: this.period,
        }
      };
      try {
        await UserService.saveLandlordInfos(landlordInfos);
        this.openToast("Saved", "is-success", 2000);
        this.canActivate = true;
      } catch (error) {
        this.openToast("Something went wrong!", "is-danger", 2000);
        console.log(error);
      }
    },
    async Activate() {
      try {
        this.active = await UserService.activateUser();
        this.openToast(
          "Your profile is activated<br>Tenants are able to see your profile.",
          "is-success",
          3500
        );
      } catch (error) {
        this.openToast("Can't activate!", "is-danger", 2000);
        console.log(error);
      }
    },
    async Deactivate() {
      try {
        this.active = await UserService.deactivateUser();
        this.openToast(
          "Your profile is deactivated<br>Tenants won't see your profile until you activate it back.",
          "is-danger",
          3500
        );
      } catch (error) {
        this.openToast("Can't deactivate!", "is-danger", 2000);
        console.log(error);
      }
    },
    openToast(message, type, duration) {
      this.$buefy.toast.open({
        duration: duration,
        message: message,
        type: type,
      });
    },
    snackbar() {
      this.$buefy.snackbar.open({
        message: "Minimum time which the apartment can be rented.",
        type: "is-info",
        position: "is-bottom",
      });
    },
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
};
</script>

<style scoped>
.datas {
  padding: 20px;
  padding-bottom: 20px;
  margin: 20px;
  background-color: rgb(243, 243, 243);
  box-shadow: 0 0px 6px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.user_infos {
  display: flex;
}
.first_tab {
  width: 50%;
}
.field {
  text-align: left;
}
.email_input {
  margin-bottom: 10px;
}
.stats {
  display: flex;
  width: 40%;
  min-width: 390px;
  margin-left: auto;
  margin-right: auto;
}
.likes_div {
  width: 50%;
}
.matches_div {
  width: 50%;
}
.likes {
  border-radius: 90px;
  background-color: cornflowerblue;
  width: 150px;
  height: 150px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2), 0 1px 10px 0 rgba(0, 0, 0, 0.19);
  margin-left: auto;
  margin-right: auto;
}
.matches {
  border-radius: 90px;
  background-color: #ed6464;
  width: 150px;
  height: 150px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2), 0 1px 10px 0 rgba(0, 0, 0, 0.19);
  margin-left: auto;
  margin-right: auto;
}
.stats_text {
  font-size: 18px;
}
.stats_val_div {
  font-size: 50px;
  padding-top: 35px;
}
.stats_val {
  color: white;
}
.container {
  display: flex;
  margin-left: 0;
  width: 260px;
  margin-bottom: 10px;
}
p {
  font-size: 1rem;
  margin-bottom: auto;
  margin-top: auto;
  margin-right: 5px;
  text-align: left;
  width: 50px;
}
.field_c {
  display: flex;
}
.time_input {
  width: 130px;
  margin-right: 0px;
}
.minRentTime {
  display: block;
}
.help:hover {
  box-shadow: 0 0px 2px 0 rgba(0, 0, 0, 0.2), 0 2px 5px 0 rgba(0, 0, 0, 0.14);
}
.help {
  border-radius: 90px;
  background-color: #167df0;
  width: 20px;
  height: 20px;
  margin-left: 5px;
  color: white;
  margin-top: 2px;
  font-size: 0.9rem;
}
.save_btn {
  width: 80px;
}
.second_tab {
  display: block;
  width: 50%;
}
.active {
  margin-top: 10px;
  margin-bottom: 0px;
  display: flex;
}
.active_container {
  margin-left: auto;
  margin-right: auto;
  width: fit-content;
}
.file-icon {
  transform: translateY(-10%);
}
.phone {
  width: 50%;
}
.email_label {
  font-weight: bold;
  margin-bottom: 5px;
}
.email_container {
  margin-bottom: 12px;
}
.email {
  width: 50%;
  margin-bottom:10px;
}
.save_div {
  margin-top: 10px;
  margin-bottom: 10px;
}
.active_c {
  padding-top: 10px;

  border: transparent;
  border-top: rgb(201, 200, 200);
  border-style: solid;
  border-width: 1px;
}
@media only screen and (min-width: 768px) {
  .first_tab {
    padding-right: 20px;
    border: transparent;
    border-right: rgb(201, 200, 200);
    border-style: solid;
    border-width: 1px;
  }
  .second_tab {
    padding-left: 20px;
  }
}
@media only screen and (max-width: 768px) {
  .stats {
    width: 80%;
  }
  .user_infos {
    display: block;
  }
  .first_tab {
    width: 100%;
    border: transparent;
    border-bottom: rgb(201, 200, 200);
    border-style: solid;
    border-width: 1px;
    margin-bottom: 10px;
  }
  .save_div {
    border: transparent;
    border-top: rgb(201, 200, 200);
    border-style: solid;
    border-width: 1px;
    margin-bottom: 10px;
    margin-top: 20px;
    padding-top: 10px;
    width: 100%;
  }
  .second_tab {
    width: 100%;
  }
  .email_container {
    display: block;
  }
  .phone {
    margin-top: 12px;
    width: 100%;
  }
  .email_label {
    margin-bottom: 8px;
  }
  .location {
    margin-top: 10px;
  }
  .active_c {
    border: transparent;
    border-top: rgb(201, 200, 200);
    border-style: solid;
    border-width: 1px;
  }
}
</style>