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
            <div class="help" @click="snackbar"><span class="q_icon">?</span></div>
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
          <b-field label="Job">
            <b-input placeholder="e.g., Assistant, Student" v-model="job"></b-input>
          </b-field>
          <b-field class="field" label="Description">
            <b-input
              placeholder="Write something about yourself."
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
      <div>
        <h1 v-if="active"> Active </h1>
        <h1 v-else>Not active</h1>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "@/Services/UserService";

export default {
  data() {
    return {
      active:null,
      likes: null,
      description: null,
      year: 0,
      month: 0,
      day: 0,
      job:null
    };
  },
  async created() {
    let tenantInfos = await UserService.getTenantInfos();
    this.active = tenantInfos.active;
    this.description = tenantInfos.description.replaceAll(/<br>/g,"\n");
    this.likes = tenantInfos.likes;

    this.year = tenantInfos.minRentTime.year;
    this.month = tenantInfos.minRentTime.month;
    this.day = tenantInfos.minRentTime.day;

    this.job = tenantInfos.job;
  },
  methods: {
    async Save() {
      if (this.year === 0 && this.month === 0 && this.day === 0) {
        this.openToast("Set a minimum renting time!", "is-danger");
        return;
      }

      let tenantInfos = {
        description: this.description.replaceAll("\n", "<br>"),
        minRentTime: {
          year: this.year,
          month: this.month,
          day: this.day,
        },
        job: this.job
      };
      try {
        await UserService.saveTenantInfos(tenantInfos);
        this.openToast("Saved", "is-success");
      } catch (error) {
        this.openToast("Something went wrong!", "is-danger");
        console.log(error);
      }
    },
    openToast(message, type) {
      this.$buefy.toast.open({
        message: message,
        type: type,
      });
    },
    snackbar() {
      this.$buefy.snackbar.open(
        {
                    message: "Minimum time which your are willing to rent.",
                    type: 'is-info',
                    position: 'is-bottom',                    
                })
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
.help:hover{
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
@media only screen and (max-width: 768px) {
  .datas {
    display: block;
  }
  .user_infos {
    width: 100%;
  }
  .save_btn {
    margin-bottom: 20px;
  }
}
</style>