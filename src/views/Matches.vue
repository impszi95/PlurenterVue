<template>
  <div>
    <div class="users">
      <div class="user" v-for="user in this.matches"  @click="ViewMatch(user.id)" :key="user.id">
        <div class="username">
          {{ user.username }}
        </div>
        <div class="container">
          <img
            v-if="user.photos.length != 0"
            class="img"
            v-bind:src="'data:image/jpg;base64,' + user.photos[0].image.data"
          />
          <img v-else src="../assets/default.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import SockJS from 'sockjs-client';
//import Stomp from 'webstomp-client';
//import authHeader from '@/Services/AuthHeader';
import UserService from "@/Services/UserService";
export default {
  data() {
    return {
      matches: [],
    };
  },
  async created() {
    this.matches = await UserService.getAllMatches();
  },
  methods: {
    ViewMatch(matchId){
      this.$router.push({name: 'matchView', params: { matchId: matchId}});
    }
  },
  computed: {},
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
  margin-top: 1rem;
}
.users :hover{  
  background-color: rgb(232, 232, 232);
  }

.user {
  background-color: gainsboro;
  margin: 10px;
  vertical-align: middle;
  width: 300px;
  height: 330px;
  display: inline-block;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.username {
  font-size: 1.2rem;
  height: 30px;
}
.container {
  width: 300px;
  height: 300px;
}
.img {
  object-fit: contain;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
}
</style>