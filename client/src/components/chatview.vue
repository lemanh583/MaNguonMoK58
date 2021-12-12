<template>
<div class="chatview">

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
        <div class="boxchat-content">
            <div class="chat">
                <div class="chat-content">
                    <div class="content">
                        AhihiAhihiAhihiAhihiAhihiAhihiAhihiAhihiAhihiAhihi
                    </div>
                    <div class="time">
                        20:54
                    </div>

                </div>

            </div>
            <div class="your-text">

                <div class="your-content">
                    <div class="content">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic amet dignissimos incidunt, doloremque dolorem maxime molestias est omnis natus quod explicabo ducimus unde error eaque similique sequi, officiis iusto minus!

                    </div>
                    <div class="time">
                        20:54
                    </div>

                </div>

            </div>

            <div class="message-footer">
                <div class="message-footer-left">
                    <div class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" style="color: #7d8185;" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-smile">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                            <line x1="9" y1="9" x2="9.01" y2="9"></line>
                            <line x1="15" y1="9" x2="15.01" y2="9"></line>
                        </svg>
                    </div>
                    <div class="message-input">
                        <input type="text" class="input-content" placeholder="Nhập tin nhắn" />
                    </div>
                    <div class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" style="color: #7d8185;" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-paperclip">
                            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                        </svg>
                    </div>
                </div>
                <div class="message-footer-right">
                    <div class="message-footer-right-content">
sadasdasd
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
            users: [{
                image: "../assets/images/cat.jpg",
                name: "Nguyen",
                time: "2:39 PM",
                latestUser: "Manh",
                latestMessage: "AhihiAhihiAhihiAhihiAhihiAhihiAhihiAhihi",
                unreadMessage: 150,
                member: 10,
            }, ],
        };
    },

};
</script>

<style scoped>
/* message-footer */
.boxchat .message-footer {
    width: 80%;
    margin: 1% 10%;
    display: flex;

}

.boxchat .message-footer .message-footer-left{
    width: 80%;
    background-color: white;
    display: flex;
    align-items: center;
    border-radius: 10px;
    height: 50px;
}

.boxchat .message-footer .message-footer-right {
    width: 20%;
}
.boxchat .message-footer .message-footer-right .message-footer-right-content {
    width: 90%;
    margin-left: auto;
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
    height: 100%;
    margin: 1% 10%;

}

.boxchat .boxchat-content .your-text {
    width: 80%;
    height: 100%;
    margin: 1% 10%;

}

.boxchat .boxchat-content .chat .chat-content {
    width: auto;
    max-width: 80%;
    background-color: #ffffff;
    height: auto;
    max-height: 60%;
    padding: 5px;
    border-radius: 10px;
    display: flex;
}

.boxchat .boxchat-content .your-text .your-content {
    margin-left: auto;
    width: auto;
    max-width: 80%;
    background-color: #e0fdc4;
    height: auto;
    max-height: 60%;
    padding: 5px;
    border-radius: 10px;
    display: flex;

}

.content {
    width: 90%;
}

.time {
    width: 10%;
    display: flex;
    align-items: end;
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
</style>
