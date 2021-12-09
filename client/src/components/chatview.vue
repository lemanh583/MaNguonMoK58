<template>
  <div class="chatview">
    <div class="background">
      <img src="../assets/images/green.png" alt="" />
    </div>
    <div class="header">
      <img src="../assets/images/cat.jpg" alt="" />
      <div class="box-infor" v-for="user in users" :key="user.id">
        <div class="information">
          <div class="name">{{ user.name }}</div>
          <div class="member">{{ user.member }} members</div>
        </div>
        <div v-b-toggle.my-collapse><i class="fas fa-ellipsis-v"></i></div>
        <b-collapse id="my-collapse">
          <b-card title="Collapsible card"> Hello world! </b-card>
        </b-collapse>
      </div>
    </div>
    <div class="boxchat">
      <input type="text" class="input-text" placeholder="Nhập tin nhắn" />
      <div class="chat">AhihiAhihiAhihiAhihiAhihiAhihiAhihiAhihiAhihiAhihi</div>
      <div class="your-text">AhihiAhihiAhihiAhihiAhihiAhihiAhihiAhihiAhihiAhihi</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      users: [
        {
          image: "../assets/images/cat.jpg",
          name: "Nguyen",
          time: "2:39 PM",
          latestUser: "Manh",
          latestMessage: "AhihiAhihiAhihiAhihiAhihiAhihiAhihiAhihi",
          unreadMessage: 150,
          member: 10,
        },
      ],
    };
  },
};
</script>
<style scoped>
.chatview {
  width: 100%;
  height: 100%;
  position: relative;
}
.background img {
  width: 100%;
  height: 100vh;
  z-index: -9999999;
}
.header {
  display: flex;
  width: 100%;
  border-bottom: 1px solid black;
  align-items: center;
  padding: 5px 10px 5px 10px;
  position: fixed;
  top: 0;
  z-index: 999999999;
  background: #ffffff;
}
.header img {
  height: 45px;
  width: 45px;
  border-radius: 50%;
}
.box-infor {
  padding-left: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.boxchat {
  padding: 0 100px 0 100px;
  position: absolute;
  top: 58px;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  height: 90%;
}
.input-text {
  position: absolute;
  bottom: 0;
  width: 75%;
  height: 50px;
  overflow: hidden;
  border-radius: 22px;
  z-index: 99;
}
.chat {
  position: absolute;
  display: flex;
  align-items: center;
  background: #fff;
  left: 15%;
  padding: 3px;
  border-radius: 5px;
}
.your-text {
  position: absolute;
  display: flex;
  align-items: center;
  background: #fff;
  right: 15%;
  padding: 3px;
  border-radius: 5px;
  margin-top: 70px;
}
</style>
