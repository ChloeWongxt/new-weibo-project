<template>
  <v-container fluid class="reg-back">
    <v-layout pa-2 row justify-center>
      <v-flex d-flex xs12 sm6 md4>
        <v-card color="white" style="padding: 20px 20px 20px 20px">
          <v-card-title class="title" style="display: inherit">账号注册</v-card-title>
          <v-card-text>
            <v-form
              ref="form"
              lazy-validation
            >
              <v-text-field
                v-model="telephone"
                :rules="telephoneRules"
                label="手机号"
                required
              ></v-text-field>

              <v-text-field
                v-model="password"
                :append-icon="show1 ? 'visibility' : 'visibility_off'"
                :rules="passwordRules"
                :type="show1 ? 'text' : 'password'"
                label="密码"
                required
                @click:append="show1 = !show1"
              ></v-text-field>

              <v-text-field
                v-model="vcc"
                :rules="vccRules"
                label="验证码"
                required
              ></v-text-field>

              <v-btn
                style="color: #fff;"
                color='#ff8140'
                block
                :disabled="isDisable"
                @click="register"
              >
                <span v-if="loading"><v-progress-circular
                  indeterminate
                  color="#fff"
                  :size="20"
                  :width="2"
                ></v-progress-circular></span>
                立即注册
              </v-btn>
            </v-form>

            <v-snackbar
              v-model="snackbar"
              color="error"
              top
              :timeout="2000"
            >
              注册失败
              <v-btn
                dark
                flat
                @click="snackbar = false"
              >
                知道了
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
    name: "Register",
    data: () => ({
            info: null,
            loading: false,
            isDisable: false,
            snackbar: false,
            telephone: '',
            password: '',
            vcc:'',
            show1:false,
            telephoneRules: [
          v => !!v || '请输入手机号',
          v => (v && v.length == 11) || '手机号为11位数字'
        ],
        passwordRules: [
          v => !!v || '请输入密码',
          v => (v && v.length >= 8 && v.length <= 32) || '密码为8-32位字符',
          v => /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_+]$)\S{8,20}$/.test(v) || '密码必须包含大小写字符、数字以及特殊字符中的两种'
        ],
        vccRules:[
          v => !!v || '请输入验证码',
          v => (v && v.length === 5) || '验证码格式错误',
          v => /^[0-9-()（）]{5}$/.test(v) || '验证码错误'
        ]
      }
    ),
    methods:{
      register(){
        if (this.$refs.form.validate()) {
            // this.$Message.success('注册按钮被点击');
          this.$axios.post('/api/add-user', {
                logName: this.telephone,
                userPassword: this.password,
                nickName:"用户"+this.telephone
              // vcc:this.vcc
            })
            .then(response => {
                // this.$Message.success('axios请求发送');
                this.isDisable = true;
                this.info = response.data
                if (this.info.success){
                    this.$Message.success('注册成功');
                    this.$router.push('/login');
                } else {
                    this.$Message.error('注册失败');
                }
                console.log(this.info)
            })
            .catch(error => {
              console.log(error);
              this.isDisable = false;
              this.snackbar = true;
            })
            .finally(() => this.loading = false)
        }
      }
    }
  }
</script>

<style scoped>
  .reg-back {
    background: url("../assets/reg-back.png") no-repeat center;
    background-size: cover;
  }

</style>
