<template>
    <v-container fluid text-xs-center class="login-back">
        <v-layout pa-2 row justify-center>
            <v-flex d-flex xs12 sm6 md4>
                <v-card color="white" style="padding: 20px 20px 20px 20px">
                    <v-card-title class="title" style="display: inherit">登录</v-card-title>
                    <v-card-text>
                        <v-form ref="form" lazy-validation>
                            <v-text-field v-model="telephone" :rules="telephoneRules" label="电话" required>
                            </v-text-field>
                            <v-text-field v-model="password" :append-icon="show1 ? 'visibility' : 'visibility_off'"
                                          :rules="passwordRules" :type="show1 ? 'text' : 'password'" label="密码"
                                          required @click:append="show1 = !show1"></v-text-field>
                            <CheckboxGroup>
                                <Checkbox label="记住我" style="float: left;margin-bottom:10px; "></Checkbox>
                            </CheckboxGroup>
                            <v-btn style="color: #fff;" color='#ff8140' block :disabled="isDisable" @click="submit">
                                <span v-if="loading">
                                     <v-progress-circular indeterminate color="#fff" :size="20" :width="2"></v-progress-circular>
                                </span>
                                登录
                            </v-btn>
                        </v-form>

                        <v-snackbar v-model="snackbar" color="error" top :timeout="2000">
                            登录失败
                            <v-btn dark flat @click="snackbar = false">
                                Close
                            </v-btn>
                        </v-snackbar>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: "Login",
    data: () => ({
        show1: false,
        loading: false,
        isDisable: false,
        snackbar: false,
        telephone: '',
        password: '',
        telephoneRules: [
            v => !!v || '请输入登录名',
            v => (v && v.length > 1) || '登录名大于2个字符'
        ],
        passwordRules: [
            v => !!v || '请输入密码',
            // v => (v && v.length >= 8 && v.length <= 12) || '密码为8-12位字符',
            // v => /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_+]$)\S{8,20}$/.test(v) || '密码必须包含大小写字符、数字以及特殊字符中的两种'
        ],
        checkbox: false
    }),

    methods: {
        submit() {
            if (this.$refs.form.validate()) {
                this.loading = true;
                this.isDisable = true;
                // setTimeout(() => {
                //   this.isDisable = false
                // }, 1000);
                this.$axios.post('/api/loginUser', {
                    logName: this.telephone,
                    userPassword: this.password
                }).then(response => {
                        this.isDisable = true;
                        let result = response.data;
                        if (result.success) {
                            let user = result.data;
                            this.$store.commit('setUser', user);
                            this.$axios.get('/api/get-user-data?userId='+user.userId).then(
                                response =>{
                                    let result2=response.data;
                                    if (result2.success){
                                        let userdata=result2.data
                                        this.$store.commit('setUserData',userdata);
                                        this.loading = false;
                                        // this.$Message.success('登录成功');
                                        this.$router.push('/home');
                                    }
                                }
                            )
                        } else {
                            this.$Message.error('登录失败');
                            this.loading = false;
                            this.isDisable = false;
                        }
                    }).catch(error => {
                        console.log(error);
                        this.isDisable = false;
                        this.snackbar = true;
                    })
            }
        }
    }
}
</script>

<style scoped>
.login-back {
    background: url("../assets/reg-back.png") no-repeat center;
    background-size: cover;
}
</style>
