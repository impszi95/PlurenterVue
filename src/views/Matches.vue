<template>
  <div>
    <div class="users">
      <div class="user" v-for="user in this.allMatches" :key="user.id">
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

export default {
  data() {
    return {
    //  received_messages: [],
    //  connected: false

    };
  },
  async created() {
      this.LoadAllMatches();
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
  margin-top: 1rem;
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
.username{
  font-size: 1.2rem;
  height: 30px;
}
.container{
  width: 300px;
  height: 300px;
}
.img {
  object-fit: contain;  
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>