<template>
  <div>
    <div class="users">
      <div class="user" v-for="user in this.allMatches" :key="user.id">
        <div class="username">
          {{ user.username }}
        </div>
        <img
          v-if="user.photos.length != 0"
          class="img"
          v-bind:src="'data:image/jpg;base64,' + user.photos[0].image.data"
        />
        <img v-else src="../assets/default.png" />
      </div>
    </div>
  </div>
</template>

<script>
//import SockJS from 'sockjs-client';
//import Stomp from 'webstomp-client';
//import authHeader from '@/Services/AuthHeader';

export default {
  data() {
    return {
    //  received_messages: [],
    //  connected: false

    };
  },
  async created() {
    if (this.allMatches.length == 0) {
      this.LoadAllMatches();
    }
  },
  methods:{
    LoadAllMatches(){
       this.$store.dispatch("auth/cacheAllMatches");
    }
  },
  computed:{    
    allMatches(){
      return this.$store.state.auth.allMatches;
    }
  }
};
//    this.connect();
//  },
//  methods: {
//       connect () {
//      this.socket = new SockJS('http://localhost:8081/websocket-endpoint')
//      this.stompClient = Stomp.over(this.socket)
//      this.stompClient.connect(authHeader(), (frame) => {
//        this.connected = true
//        console.log(frame)
//        this.stompClient.subscribe('/global-message/tick', (tick) => {
//          console.log(tick)
//          this.received_messages.push(tick)
//        })
//     }, (error) => {
 //       console.log(error)
 //       this.connected = false
  //    })
  //  },
 // },
</script>

<style scoped>
.users {
  background-color: slategray;
  margin-top: 1rem;
}
.user {
  background-color: gainsboro;
  margin: 0.1rem;
  vertical-align: middle;
  padding: 0.2rem;
  width: 300px;
  height: 325px;
  display: inline-block;
  border-style: solid;
}
.img {
  max-width: 100%;
  height: auto;
}
</style>