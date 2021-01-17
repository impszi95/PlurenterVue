<template>
  <div>
      <b-modal
      class="notification"
      v-model="haveNotification"
      has-modal-card
      trap-focus
      :destroy-on-hide="true"
      animation="zoom-out"
      aria-role="dialog"
      aria-modal
      :can-cancel="false"
    >
      <Notification :match="this.match" @close="Cancel()" @viewMatches="goToMatches()"/>
    </b-modal>
  </div>
</template>
<script>
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import Notification from './Notification';
import IPs from '../Enviroment'

export default {
  data() {
    return {
      match: null,
      haveNotification:false,
      send_message: null,
      connected: false,
    };
  },
  components:{
    Notification,
  },
  methods: {
    send() {
      //console.log("Send message:" + this.send_message);
      if (this.stompClient && this.stompClient.connected) {
        const msg = {
          userId: this.currentUser.id,
          message: this.send_message,
        };

        //console.log(JSON.stringify(msg));
        this.stompClient.send("/app/notification", JSON.stringify(msg), {});
      }
    },
    connect() {
      this.socket = new SockJS(IPs.WS_URL + "/gs-guide-websocket");
      this.stompClient = Stomp.over(this.socket);      
      this.stompClient.debug = () => {};
      this.stompClient.connect(
        {},
        () => {
          this.connected = true;
          //console.log(frame);
          this.stompClient.subscribe(
            "/queue/newMatch/" + this.currentUser.id,
            (tick) => {
              this.match = JSON.parse(tick.body);
              this.haveNotification = true;
            }
          );
        },
        (error) => {
          console.log(error);
          this.connected = false;
        }
      );
    },
    disconnect() {
      if (this.stompClient) {
        this.stompClient.disconnect();
      }
      this.connected = false;
    },
    tickleConnection() {
      this.connected ? this.disconnect() : this.connect();
    },
    Cancel(){
      this.haveNotification = false;
    },
    goToMatches(){       
      this.Cancel();
      setTimeout(() => this.$router.push("matches"), 300);
    }
  },
  mounted() { 
    this.connect();
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
};
</script>
<style scoped>
  
</style>