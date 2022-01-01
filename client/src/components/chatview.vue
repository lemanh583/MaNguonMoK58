<template>
  <div class="chatview">
    <div class="header">
      <img src="../assets/images/cat.jpg" alt="" />
      <div>
        <div class="information">
          <div class="name">{{ detailUser.name }}</div>
          <!-- <div class="member">{{ detailUser.member }} members</div> -->
        </div>
        <!-- <div v-b-toggle.my-collapse><i class="fas fa-ellipsis-v"></i></div> -->
        <b-collapse id="my-collapse">
          <b-card title="Collapsible card"> Hello world! </b-card>
        </b-collapse>
      </div>
    </div>
    <div class="boxchat">
      <div class="boxchat-content">
        <div class="list-chat">
          <span v-for="(m, i) in messages" :key="i">
            <div :class="[user.id == m.sender_id ? 'your-text' : 'chat']">
              <div
                :class="[
                  user.id == m.sender_id ? 'your-content' : 'chat-content',
                ]"
              >
                <div
                  :class="[
                    user.id == m.sender_id ? 'content-right' : 'content',
                  ]"
                >
                  {{ m.message }}
                </div>
                <div :class="[user.id == m.sender_id ? 'your-time' : 'time']">
                  {{ new Date(m.created_time).toLocaleString() }}
                </div>
              </div>
            </div>
          </span>
        </div>

        <form v-if="active" method="POST">
          <div class="message-footer">
            <div class="message-footer-left">
              <div class="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style="color: #7d8185"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-smile"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                  <line x1="9" y1="9" x2="9.01" y2="9"></line>
                  <line x1="15" y1="9" x2="15.01" y2="9"></line>
                </svg>
              </div>
              <div class="message-input">
                <input
                  type="text"
                  class="input-content"
                  placeholder="Nhập tin nhắn"
                  v-model="text"
                />
              </div>
              <div class="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style="color: #7d8185"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-paperclip"
                >
                  <path
                    d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"
                  ></path>
                </svg>
              </div>
            </div>
            <div class="message-footer-right">
              <button
                class="message-footer-right-content"
                type="submit"
                style="border: none"
                @click="createMessage"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style="color: #3390ec"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-send"
                >
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
export default {
  props: ["conversion"],
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
      messages: [
        {
          sender_id: "61cdf718eb771b1b32b73a32",
          conversion_id: "conversion_id",
          receiver_id: "received_id",
          message: "Xin chào Việt Nam",
          type: "private",
          created_time: "4567890",
          updated_time: "4567887",
        },
        {
          sender_id: "7y43hf98137t58y9gr3",
          conversion_id: "conversion_id",
          receiver_id: "received_id",
          message: "friend message",
          type: "private",
          created_time: "4567890",
          updated_time: "4567887",
        },
        {
          sender_id: "7y43hf98137t58y9gr3",
          conversion_id: "conversion_id",
          receiver_id: "received_id",
          message: "friend message",
          type: "private",
          created_time: "4567890",
          updated_time: "4567887",
        },
      ],
      cvs_id: "",
      text: "",
      active: false,
      detailUser: {},
    };
  },
  watch: {
    conversion() {
      this.cvs_id = this.conversion._id;
      this.fetchMessages();
      this.active = true;
      this.fetchDetaiUser();
    },
  },
  sockets: {
    getMessage: function (data) {
      this.messages.push(data);
    },
  },
  mounted() {
    //   this.$options.sockets['getMessage'] = (data) => {
    //       console.log('data', data)
    //   }
    //   this.$socket.on('getMessage', data => {
    //       console.log('data', data)
    //       this.messages.push(data)
    //   })
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    async createMessage(e) {
      e.preventDefault();
      try {
        if (!this.text) return;
        let res = await axios.post(
          `${process.env.VUE_APP_URL}/message/create`,
          {
            sender_id: this.user.id,
            conversion_id: this.cvs_id,
            receiver_id:
              this.user.id == this.conversion.sender_id
                ? this.conversion.receiver_id
                : this.conversion.sender_id,
            message: this.text,
          }
        );
        //send message

        if (res.data.success) {
          let updateConve = await axios.post(
            `${process.env.VUE_APP_URL}/conversion/update/${this.cvs_id}`,
            {
              last_message: res.data.data._id,
              updated_time: Date.now(),
            }
          );
          this.messages.push(res.data.data);
          this.$socket.emit("sendMessage", res.data.data);
          console.log("updateConve", updateConve);
          this.text = "";
          this.$emit("loadConver", true);
        }
        console.log("res", res.data);
      } catch (error) {
        console.error(error.response);
      }
    },
    async fetchMessages() {
      try {
        let list = await axios.get(
          `${process.env.VUE_APP_URL}/message/list/${this.cvs_id}`
        );
        console.log("listMess", list.data);
        this.messages = list.data.data;
      } catch (error) {
        console.error(error.response);
      }
    },
    async fetchDetaiUser() {
      try {
        let idRe =
          this.conversion.sender_id == this.user.id
            ? this.conversion.receiver_id
            : this.conversion.sender_id;
        let user = await axios.get(
          `${process.env.VUE_APP_URL}/user/get/${idRe}`
        );
        if (user.data.success) {
          this.detailUser = user.data.data;
        }
        console.log("user", user.data);
      } catch (error) {
        console.error(error.response);
      }
    },
  },
};
</script>

<style scoped>
/* message-footer */
.boxchat .message-footer {
  width: 90%;
  margin: 1% 5%;
  display: flex;
}

.boxchat .message-footer .message-footer-left {
  width: 80%;
  background-color: white;
  display: flex;
  align-items: center;
  border-radius: 10px;
  height: 50px;
  margin-left: 6%;
}

.boxchat .message-footer .message-footer-right {
  width: 20%;
}

.boxchat .message-footer .message-footer-right .message-footer-right-content {
  width: 35%;
  height: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  margin-left: 10%;
}
.boxchat
  .message-footer
  .message-footer-right
  .message-footer-right-content:hover {
  background-color: #3390ec;
}
.boxchat
  .message-footer
  .message-footer-right
  .message-footer-right-content
  svg:hover {
  fill: white;
  color: white;
}

.boxchat .message-footer .icon {
  width: 5%;
  display: flex;
  justify-content: space-around;
}

.boxchat .message-footer .message-input {
  width: 90%;
}

.boxchat .message-footer .message-input .input-content {
  width: 100%;
  border: none;
}

.boxchat .message-footer .message-input .input-content:focus-visible {
  outline: none;
  border: none;
}

.boxchat .boxchat-content .chat {
  width: 80%;
  /* height: 100%; */
  margin: 1% 10%;
}

.boxchat .boxchat-content .your-text {
  width: 80%;
  /* height: 100%; */
  margin: 1% 10%;
}

.boxchat .boxchat-content .chat .chat-content {
  width: max-content;
  max-width: 80%;
  background-color: #ffffff;
  height: auto;
  max-height: 60%;
  padding: 5px;
  border-radius: 10px;
  position: relative;
  /* display: flex; */
}
.chat-content:hover .time {
  display: block;
}
.boxchat .boxchat-content .your-text .your-content {
  margin-left: auto;
  width: max-content;
  max-width: 80%;
  background-color: #e0fdc4;
  height: auto;
  max-height: 60%;
  padding: 5px;
  border-radius: 10px;
  /* display: flex; */
  margin-right: 15%;
  position: relative;
}

.content {
  /* width: 90%; */
}

.time {
  /* width: 10%;
  display: flex;
  align-items: end; */
  position: absolute;
  width: max-content;
  background-color: white;
  border-radius: 5px;
  color: red;
  box-shadow: 0px 2px 12px -4px black;
  padding: 5px;
  top: -35px;
  left: 0;
  display: none;
}

/*  */
.chatview {
  background-image: url("../assets/images/green.png");
  width: 100%;
  height: 100vh;
}

.header {
  display: flex;
  width: 100%;
  /* border-bottom: 1px solid black; */
  box-shadow: 0 2px 2px #726f702b;
  align-items: center;
  padding: 5px 10px 5px 10px;
  position: fixed;
  top: 0;
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
  display: flex;
  width: 100%;
  height: 100%;
  align-items: end;
}

.boxchat .boxchat-content {
  width: 100%;
}
.content-right {
  text-align: left;
}
.your-time {
  text-align: right;
  display: none;
  position: absolute;
  top: -35px;
  right: 0;
  width: max-content;
  background-color: white;
  border-radius: 5px;
  color: red;
  box-shadow: 0px 2px 12px -4px black;
  padding: 5px;
}
.your-content:hover .your-time {
  display: block;
}
.list-chat {
  height: 530px;
  overflow-y: scroll;
}
</style>
