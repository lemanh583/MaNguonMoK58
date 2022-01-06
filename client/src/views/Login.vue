<template>
<div>
    <div id="" class="container-fluid">
        <!-- Background animtion-->
        <div class="background">
            <div class="cube"></div>
            <div class="cube"></div>
            <div class="cube"></div>
            <div class="cube"></div>
            <div class="cube"></div>
        </div>
        <!-- header -->
        <header>
            <div class="logo"><span>N</span></div>
            <!-- title & content -->
            <section class="header-content">

                <div class="container py-2 ">

                    <div class="row d-flex align-items-center justify-content-center ">
                        <div class="col-md-8 col-lg-7 col-xl-6">
                            <img src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-login-form/draw2.svg" class="img-fluid" alt="Phone image">
                        </div>
                        <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                            <div class="mb-4">
                                <h1>Welcome</h1>
                            </div>
                            <form method="POST">
                                <!-- Email input -->
                                <div class="form-outline mb-4">

                                    <input type="phone" v-model="phone" id="form1Example13" placeholder="Mời nhập số điện thoại" class="form-control form-control-lg" />
                                  
                                </div>

                                <!-- Password input -->
                                <div class="form-outline mb-4">

                                    <input type="password" v-model="password" id="form1Example23" placeholder="Mời nhập mật khẩu" class="form-control form-control-lg" />
                                  
                                </div>

                                <div class="d-flex justify-content-around align-items-center mb-4">
                                    <!-- Checkbox -->
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="form1Example3" checked />
                                        <label class="form-check-label" for="form1Example3"> Remember me </label>
                                    </div>
                                    <a href="#!">Forgot password?</a>
                                </div>

                                <!-- Submit button -->
                                <button type="submit"  @click="handleLogin" class="btn btn-primary btn-lg btn-block">Sign in</button>

                            </form>
                        </div>
                    </div>
                </div>

            </section>
        </header>
    </div>
</div>
</template>

<script>
import axios from "axios"
import {
    mapMutations
} from "vuex"
export default {
    data() {
        return {
            phone: null,
            password: null
        }
    },
    methods: {
        ...mapMutations([
            "setUser"
        ]),
        async handleLogin(event) {
            try {
                event.preventDefault();
                const response = await axios.post(`${process.env.VUE_APP_URL}/auth/login`, {
                    phone: this.phone,
                    password: this.password
                })
                if (response.data.success) {
                    let user = {
                        name: response.data.data.name,
                        role: response.data.data.role,
                        id: response.data.data._id,
                        auth: true
                    }
                    this.setUser(user)
                    localStorage.setItem('tokenSocket', response.data.token)
                    this.$router.push({
                        path: "/"
                    })
                }
            } catch (error) {
                console.error(error.response)
            }
        }
    }
}
</script>

<style scoped>
.container-fluid {
    height: 100%;
    margin: 0;
    padding: 0;
    width: 100%;
    background: #FFF;
}

/* ============= Animation background ========= */

.background {
    background: linear-gradient(132deg, #FC415A, #591BC5, #212335);
    background-size: 400% 400%;
    animation: Gradient 15s ease infinite;
    position: relative;
    height: 100vh;
    width: 100%;
    overflow: hidden;
    padding: 0;
    margin: 0px;
}

.cube {
    position: absolute;
    top: 80vh;
    left: 45vw;
    width: 10px;
    height: 10px;
    border: solid 1px #D7D4E4;
    transform-origin: top left;
    transform: scale(0) rotate(0deg) translate(-50%, -50%);
    animation: cube 12s ease-in forwards infinite;
}

.cube:nth-child(2n) {
    border-color: #FFF;
}

.cube:nth-child(2) {
    animation-delay: 2s;
    left: 25vw;
    top: 40vh;
}

.cube:nth-child(3) {
    animation-delay: 4s;
    left: 75vw;
    top: 50vh;
}

.cube:nth-child(4) {
    animation-delay: 6s;
    left: 90vw;
    top: 10vh;
}

.cube:nth-child(5) {
    animation-delay: 8s;
    left: 10vw;
    top: 85vh;
}

.cube:nth-child(6) {
    animation-delay: 10s;
    left: 50vw;
    top: 10vh;
}

/* ================= Header ============ */

header {
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100%;
    margin: 0;
    padding: 0;
}

/* navbar */

nav {
    color: #FFF;
    float: right;
    margin: 30px 90px;
}

nav ul {
    list-style: none;
}

nav ul li {
    float: left;
    transition: .3s;
}

nav ul li a {
    text-decoration: none;
    color: #EFEEF5;
    transition: .5;
    font-size: 15px;
    margin-left: 16px;
}

nav ul li:hover a {
    text-decoration: none;
    color: #591BC5;
}

nav ul li:hover {
    height: 45px;
    padding-top: 30px;
    margin-top: -30px;
    background: #EFEEF5;
    text-decoration: none;
    transform: skew(15deg);
}

/* Logo */

.logo {
    width: 35px;
    height: 35px;
    background: #EFEEF5;
    margin: 40px 63px;
    float: left;
    transform: rotate(-30deg);
}

.logo span {
    color: #591BC5;
    font-size: 2em;
    line-height: 1.4;
    padding-left: 5px;
    font-weight: bold;
}

/* Header content & title & button*/

.header-content {
    margin-top: 9%;
    text-align: center;
    color: #EFEEF5;
}

.header-content h1 {
    text-transform: uppercase;
    font-size: 3em;
    letter-spacing: 1px;
}

.header-content p {
    font-size: 20px;
    line-height: 1.5;
    margin: 20px auto;
}

.header-content button {
    width: 140px;
    margin: 20px 10px;
    color: #591BC5;
    font-size: 17px;
    border: 1px solid #EFEEF5;
    font-weight: 500;
    background: #EFEEF5;
    border-radius: 20px;
    padding: 10px;
    cursor: pointer;
    transition: .3s;
}

.header-content button:hover {
    border-radius: 0;
}

/* Animate Background*/

@keyframes Gradient {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}

@keyframes cube {
    from {
        transform: scale(0) rotate(0deg) translate(-50%, -50%);
        opacity: 1;
    }

    to {
        transform: scale(20) rotate(960deg) translate(-50%, -50%);
        opacity: 0;
    }
}

/* css view đăng nhập */

.divider:after,
.divider:before {
    content: "";
    flex: 1;
    height: 1px;
    background: #eee;
}
</style>
