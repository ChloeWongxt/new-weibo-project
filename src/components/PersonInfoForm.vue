<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="昵称" prop="name">
            <Input v-model="formValidate.nickName" placeholder="请输入你的昵称"/>
        </FormItem>
        <FormItem label="电子邮箱" prop="mail">
            <Input v-model="formValidate.emailAddress" placeholder="请输入你的电子邮箱"/>
        </FormItem>
        <FormItem label="居住地" prop="city">
            <Select v-model="formValidate.userPlace" placeholder="请输入你的居住地">
                <Option value="北京">北京</Option>
                <Option value="上海">上海</Option>
                <Option value="深圳">深圳</Option>
            </Select>
        </FormItem>
        <FormItem label="出生日期">
            <Row>
                <Col span="11">
                    <FormItem prop="date">
                        <DatePicker type="date" placeholder="请输入你的出生日期" v-model="formValidate.userBirthday"></DatePicker>
                    </FormItem>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="性别" prop="gender">
            <RadioGroup v-model="formValidate.userGender">
                <Radio label="男">男</Radio>
                <Radio label="女">女</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="个性签名" prop="desc">
            <Input v-model="formValidate.userPerSignature" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入个性签名"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </FormItem>
    </Form>
</template>

<script>
export default {
    name: "PersonInfoForm",
    data () {
        return {
            formValidate: {
                userId:'',
                nickName: '',
                emailAddress: '',
                userPlace: '',
                userGender: '',
                userBirthday: '',
                userPerSignature: ''
            },
            ruleValidate: {
                nickName: [
                    { required: true, message: '昵称不能为空', trigger: 'blur' }
                ],
                emailAddress: [
                    { required: true, message: '电子邮箱不能为空', trigger: 'blur' },
                    { type: 'email', message: '电子邮箱格式不正确', trigger: 'blur' }
                ],
                userPlace: [
                    { required: true, message: '请选择居住地', trigger: 'change' }
                ],
                userGender: [
                    { required: true, message: '请选择性别', trigger: 'change' }
                ],
                userBirthday: [
                    { required: true, type: 'date', message: '请选择出生日期', trigger: 'change' }
                ],
                userPerSignature: [
                    { required: true, message: '请输入个性签名', trigger: 'blur' },
                    { type: 'string', min: 10, message: '个性签名不能少于10个字', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$axios.post('/api/update-user',this.formValidate)
                        .then(
                            response => {
                                let result = response.data;
                                console.log("当前用户",result);
                                if (result.success) {
                                    let user = result.data
                                    // this.formValidate=user
                                    this.$store.commit('setUser', user);
                                    console.log("登录用户信息",user);
                                    this.getOrgPerInfo();
                                }
                            }
                        )
                    this.$Message.success('Success!');
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        handleReset (name) {
            this.$refs[name].resetFields();
        },
        getOrgPerInfo(){
            this.formValidate.userId=this.$store.state.user.userId;
            this.formValidate.nickName=this.$store.state.user.nickName;
            this.formValidate.emailAddress=this.$store.state.user.emailAddress;
            this.formValidate.userPlace=this.$store.state.user.userPlace;
            this.formValidate.userGender=this.$store.state.user.userGender;
            this.formValidate.userBirthday=this.$store.state.user.userBirthday;
            this.formValidate.userPerSignature=this.$store.state.user.userPerSignature;
        }
    },
    mounted(){
        this.getOrgPerInfo();
    }
}
</script>

<style scoped>

</style>
