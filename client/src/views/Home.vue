<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
     <!-- {{this.$store.state.user}} -->
     <ChatList style="width: 25%" @loadMess="loadMess" :isLoad="isLoad"/>
    <ChatView style="width: 75%" @loadConver="loadConver" :conversion="conversion"/>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import ChatList from '@/components/chatlist.vue'
import ChatView from '@/components/chatview.vue'

export default {
  name: 'Home',
  components: {
    // HelloWorld,
    ChatList,
    ChatView
  },
  data(){
    return {
      conversion: {},
      isLoad: true
    }
  },
  methods: {
    loadMess(data) {  
      this.conversion = data
      console.log('conversion', this.conversion)
    },
    loadConver() {
      this.isLoad = !this.isLoad
    }
  }
}
</script>
<style scoped>
.home {
  display: flex;
}
</style>