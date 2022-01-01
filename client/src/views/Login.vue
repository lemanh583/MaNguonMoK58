<template>
    <div>
        {{this.$store.state.user}}
        <form method="POST">
            <label for="">Nhap sdt</label>
            <input type="text" v-model="phone">
            <label for="">Nhap mk</label>
            <input type="text"  v-model="password">
            <input type="submit" @click="handleLogin">          
        </form>
    </div>
</template>
<script>
import axios from "axios"
import { mapMutations } from "vuex"
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
                if(response.data.success) {
                    let user = {
                        name: response.data.data.name,
                        role: response.data.data.role,
                        id: response.data.data._id,
                        auth: true
                    }
                    this.setUser(user)
                    localStorage.setItem('tokenSocket', response.data.token)
                    this.$router.push({path: "/"})
                }
            } catch (error) {
                console.error(error.response)
            }
        }
    }
}
</script>