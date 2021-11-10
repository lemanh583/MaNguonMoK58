var vm = new Vue({
    // các tùy chọn 
    el: '#app',

    // dùng el để quản lý phần tử cần sử dụng
    data: {
        dangnhap: {
            email: '',
            password: '',
        },
        valiemail: false,
        valipassword: false,

    },

    methods: {
        login(email, password) {
            const self = this;
            window.location = "/client/resources/views/viewweb/viewchat.html";
            // axios.get("").then(function(response) {
            //     console.log(1);
            //     // window.location = "/";
            // });
        },
    },

    computed: {

    }

})