<template>
  <div>
    <div class="datas">
      <div class="user_infos">
        <div>
          <b-field class="field" label="Username">
            <div class="username_input">{{ currentUser.username }}</div>
          </b-field>
        </div>
        <div>
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
          <b-field class="field" label="Description">
            <b-input
              placeholder="Write any additional information."
              class="desc_input"
              maxlength="500"
              type="textarea"
              v-model="description"
            ></b-input>
          </b-field>
          <b-button class="save_btn" @click="Save()" type="is-success"
            >Save</b-button
          >
        </div>
      </div>
      <div class="second_tab">
        <div class="likes_div">
          <div>
            <strong class="likes_text">Likes</strong>
          </div>
          <div class="likes">
            <div class="likes_val_div">
              <strong class="likes_val">{{ likes }}</strong>
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
  </div>
</template>

<script>
import UserService from "@/Services/UserService";
const currencies = require("@/assets/currencies.json");

export default {
  data() {
    return {
      active: null,
      likes: null,
      description: null,
      year: 0,
      month: 0,
      day: 0,
      amount: null,
      period: null,
      currency: null,
      currencies: currencies,
      canActivate: null,
    };
  },
  async created() {
    let landlordInfos = await UserService.getLandlordInfos();
    this.active = landlordInfos.active;
    this.canActivate = landlordInfos.canActivate;
    this.description = landlordInfos.description;
    this.likes = landlordInfos.likes;

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
        this.openToast("Set a minimum renting time!", "is-danger", 2000);
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

      let landlordInfos = {
        description: this.description,
        minRentTime: {
          year: this.year,
          month: this.month,
          day: this.day,
        },
        rent: {
          amount: this.amount,
          currency: this.currency,
          period: this.period,
        },
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
      try{
      this.active = await UserService.activateUser();
        this.openToast(
          "Your profile is activated<br>Tenants are able to see your profile.",
          "is-success",
          4000
        );
      } catch(error) {
        this.openToast("Cant activate!", "is-danger", 2000);
      }
    },
    async Deactivate() {
      try{
     this.active = await !UserService.deactivateUser();
        this.openToast(
          "Your profile is deactivated<br>Tenants won't see your profile until you activate it back.",
          "is-danger",
          4000
        );
      } catch(error) {
        this.openToast("Can't deactivate!", "is-danger", 2000);
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
.user_infos {
  width: 50%;
}
.field {
  text-align: left;
}
.username_input {
  margin-bottom: 10px;
}
.likes_div {
  width: 150px;
  height: 178px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  margin-bottom: 20px;
}
.likes {
  border-radius: 90px;
  background-color: cornflowerblue;
  width: 150px;
  height: 150px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2), 0 1px 10px 0 rgba(0, 0, 0, 0.19);
}
.likes_text {
  font-size: 18px;
}
.likes_val_div {
  font-size: 50px;
  padding-top: 35px;
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
.likes_val {
  color: white;
}
.help:hover {
  box-shadow: 0 0px 2px 0 rgba(0, 0, 0, 0.2), 0 2px 5px 0 rgba(0, 0, 0, 0.14);
}
.help {
  border-radius: 90px;
  background-color: cornflowerblue;
  width: 20px;
  height: 20px;
  margin-left: 5px;
  color: white;
  margin-top: 2px;
  font-size: 0.9rem;
}
.datas {
  padding: 20px;
  margin: 20px;
  background-color: rgb(243, 243, 243);
  box-shadow: 0 0px 6px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  display: flex;
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
@media only screen and (max-width: 768px) {
  .datas {
    display: block;
  }
  .user_infos {
    width: 100%;
    border: transparent;
    border-bottom: rgb(201, 200, 200);
    border-style: solid;
    border-width: 1px;
  }
  .save_btn {
    margin-bottom: 20px;
  }
  .active_c {
    border: transparent;
    border-top: rgb(201, 200, 200);
    border-style: solid;
    border-width: 1px;
    padding-top: 10px;
  }
  .second_tab {
    width: 100%;
  }
}
</style>