<template>
  <div class="chatlist">
    <div class="chatlist-content">
      <div class="header">
        <div v-b-toggle.my-sidebar class="icon">
          <i class="fas fa-bars"></i>
        </div>
        <b-sidebar id="my-sidebar" title="Sidebar" shadow>
          <div class="px-3 py-2">
            <div
              v-for="(user, index) in listUser"
              :key="index"
              class="user-content"
              style=""
            >
              <img
                class="img-user"
                src="http://windows79.com/wp-content/uploads/2021/02/Thay-the-hinh-dai-dien-tai-khoan-nguoi-dung-mac.png"
                alt=""
                style=""
              />
              <p>{{ user.name }}</p>
              <div class="status" style="">
                <div class="dot-blue"></div>
                <button
                  class="button"
                  style="width: 50px; height: 20px; font-size: 10px"
                  @click="handleCreateConversion(user._id)"
                >
                  Nhắn
                </button>
              </div>
            </div>
          </div>
        </b-sidebar>
        <input class="input-search" type="search" placeholder="Tìm kiếm ..." />
      </div>
      <div class="chat-list">
        <div v-for="user in users" :key="user.id">
          <div
            class="users"
            v-if="user.position == 1"
            style="background: #3390ec; border-radius: 10px"
          >
            <img src="../assets/images/cat.jpg" alt="" />
            <div class="content">
              <div class="content-top">
                <div class="name" style="color: white">{{ user.name }}</div>
                <div class="time" style="color: white">{{ user.time }}</div>
              </div>
              <div class="content-bot">
                <div class="message">
                  <div style="color: white">{{ user.latestUser }}:</div>
                  <div style="color: white">{{ user.latestMessage }}</div>
                </div>
                <div class="unread-message" style="background-color: white">
                  <div class="number" style="color: #3390ec">
                    {{ user.unreadMessage }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="users" v-else>
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
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      listUser: [],
      users: [
        {
          image: "../assets/images/cat.jpg",
          name: "Nguyen",
          time: "2:39 PM",
          latestUser: "Manh",
          latestMessage: "AhihiAhihiAhihiAhihiAhihiAhihiAhihiAhihi",
          unreadMessage: 150,
          position: 1,
        },
      ],
    };
  },
  async created() {
    this.checkToken();
    this.getAllUser();
  },
  methods: {
    ...mapMutations(["setUser"]),
    async getAllUser() {
      try {
        const res = await axios.get(`${process.env.VUE_APP_URL}/user/list`);
        if (res.data.success) {
          this.listUser = res.data.data.filter(
            (val) => val._id != this.$store.state.user.id
          );
        }
        //    console.log('res', res.data)
      } catch (error) {
        console.error(error.response);
      }
    },
    async checkToken() {
      try {
        let token = localStorage.getItem("tokenSocket");
        if (token) {
          let response = await axios.get(
            `${process.env.VUE_APP_URL}/user/check-token`,
            {
              headers: { Authorization: "Bearer " + token },
            }
          );
          if (response.data.success) {
            let user = {
              name: response.data.data.name,
              role: response.data.data.role,
              id: response.data.data._id,
              auth: true,
            };
            this.setUser(user);
            return response.data;
          }
        } else {
          this.$router.push({ path: "/login" });
        }
      } catch (error) {
        console.error(error.response);
        if (!error.response.data.success) {
          this.$router.push({ path: "/login" });
        }
      }
    },
    async handleCreateConversion(id) {
      try {
        let token = localStorage.getItem("tokenSocket");
        let res = await axios.post(
          `${process.env.VUE_APP_URL}/conversion/create`,
          {
            type: "private",
            members: [id, this.$store.state.user.id],
            created_by: this.$store.state.user.id,
          },
          {
            headers: { Authorization: "Bearer " + token },
          }
        );
        if(res.data.success) {
          this.$emit('loadMess', res.data.data)
        }
        console.log('res-create', res.data)
      } catch (error) {
        console.error(error.response);
      }
    },
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
  padding-left: 20px;
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
  padding-left: 10px;
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
  width: 85%;
}

.message div:last-child {
  color: rgba(128, 128, 128, 0.877);
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
  text-overflow: ellipsis;
  padding: 0 5px;
}

.unread-message {
  background: #00c73e;
  border-radius: 50%;
  height: 30px;
  width: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.number {
  color: white;
}
.img-user {
  width: 30px;
  height: 30px;
  border-radius: 5px;
  margin-right: 5px;
}
.dot-blue {
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: green;
  margin-right: 10px;
}
.user-content {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
p {
  margin: 0;
}
.button {
  width: 50px;
  height: 20px;
  font-size: 10px;
  border-radius: 5px;
  background: #00c73e;
}
.status {
  display: flex;
  margin-left: auto;
  justify-content: center;
  align-items: center;
}
</style>
