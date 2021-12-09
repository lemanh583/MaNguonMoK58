<template>
  <div class="chatlist">
    <div class="chatlist-content">
      <div class="header">
        <div  v-b-toggle.my-sidebar class="icon"
          ><i class="fas fa-bars"></i
        ></div>
        <b-sidebar id="my-sidebar" title="Sidebar" shadow>
          <div class="px-3 py-2">
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </div>
        </b-sidebar>
        <input class="input-search" type="search" placeholder="Tìm kiếm ..." />
      </div>
      <div class="chat-list">
        <div class="users" v-for="user in users" :key="user.id">
          <img src="../assets/images/cat.jpg" alt="" />
          <div class="content">
            <div class="content-top">
              <div class="name">{{ user.name }}</div>
              <div class="time">{{ user.time }}</div>
            </div>
            <div class="content-bot">
              <div class="message">
                <div>{{ user.latestUser }}:</div>
                <div>{{ user.latestMessage }}</div>
              </div>
              <div class="unread-message">
                <div class="number">{{ user.unreadMessage }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
        },
        {
          image: "../assets/images/cat.jpg",
          name: "Nguyen",
          time: "2:39 PM",
          latestUser: "Manh",
          latestMessage: "AhihiAhihiAhihiAhihiAhihiAhihiAhihiAhihi",
          unreadMessage: 150,
        },
        {
          image: "../assets/images/cat.jpg",
          name: "Nguyen",
          time: "2:39 PM",
          latestUser: "Manh",
          latestMessage: "AhihiAhihiAhihiAhihiAhihiAhihiAhihiAhihi",
          unreadMessage: 150,
        },
        {
          image: "../assets/images/cat.jpg",
          name: "Nguyen",
          time: "2:39 PM",
          latestUser: "Manh",
          latestMessage: "AhihiAhihiAhihiAhihiAhihiAhihiAhihiAhihi",
          unreadMessage: 150,
        },
        {
          image: "../assets/images/cat.jpg",
          name: "Nguyen",
          time: "2:39 PM",
          latestUser: "Manh",
          latestMessage: "AhihiAhihiAhihiAhihiAhihiAhihiAhihiAhihi",
          unreadMessage: 150,
        },
        {
          image: "../assets/images/cat.jpg",
          name: "Nguyen",
          time: "2:39 PM",
          latestUser: "Manh",
          latestMessage: "AhihiAhihiAhihiAhihiAhihiAhihiAhihiAhihi",
          unreadMessage: 150,
        },
        {
          image: "../assets/images/cat.jpg",
          name: "Nguyen",
          time: "2:39 PM",
          latestUser: "Manh",
          latestMessage: "AhihiAhihiAhihiAhihiAhihiAhihiAhihiAhihi",
          unreadMessage: 150,
        },
      ],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chatlist {
  height: 100%;
  width: 100%;
  overflow-y: hidden;
}
.chatlist-content {
  padding: 10px 10px 10px 10px;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.icon {
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
}
.icon:hover {
  background: gray;
  border-radius: 50%;
}

.input-search {
  width: 90%;
  height: 45px;
  overflow: hidden;
  border-radius: 22px;
}

.chat-list {
  width: 100%;
  margin-top: 5px;
}
.users {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 5px 5px 5px 5px;
}
.users:hover {
  background: #dfe1e5;
  border-radius: 10px;
}
.users img {
  width: 15%;
  border-radius: 50%;
}
.content {
  width: 85%;
  margin-left: 10px;
}
.content-top {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 0px;
}
.content-bot {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}
.name {
  font-weight: bold;
  font-size: 18px;
}
.time {
  color: rgba(128, 128, 128, 0.877);
  font-size: 14px;
}
.message {
  display: flex;
  font-size: 16px;
}
.message div:last-child {
  color: rgba(128, 128, 128, 0.877);
  white-space: nowrap;
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-left: 2px;
}
.unread-message {
  background: green;
  border-radius: 50%;
  height: 30px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.number {
  color: white;
}
</style>
