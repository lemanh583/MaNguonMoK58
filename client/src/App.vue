<template>
  <div id="app">
    <ChatList style="width: 25%"/>
    <ChatView style="width: 75%"/>
  </div>
</template>

<script>
import ChatList from './components/chatlist.vue'
import ChatView from './components/chatview.vue'

export default {
  name: 'App',
  components: {
    ChatList,
    ChatView
  }
}
</script>

<style>
#app{
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  display: flex;
}
</style>
