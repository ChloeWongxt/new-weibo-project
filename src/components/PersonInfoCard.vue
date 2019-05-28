<template>
    <div class="W_person_info">
        <div class="cover" id="skin_cover_s" style="background-image:url(//img.t.sinajs.cn/t5/skin/public/profile_cover/001_s.jpg?version=53830d4156ad61ab)" >
            <div class="headpic">
                <a bpfilter="page_frame" href="#" :title="this.$store.state.user.nickName">
                    <!--个人头像-->
                    <img class="W_face_radius" :src="this.$store.state.user.userAvatar" width="60" height="60" :alt="this.$store.state.user.nickName">
                </a>
            </div>
        </div>
        <div class="WB_innerwrap">
            <div class="nameBox">
                <a bpfilter="page_frame" :href="'/personhome/'+this.$store.state.user.userId" class="name S_txt1" :title="this.$store.state.user.nickName">{{this.$store.state.user.nickName}}</a>
            </div>
            <ul class="user_atten clearfix W_f18" style="list-style-type:none;margin-left: 22px">
                <li class="S_line1">
                    <a bpfilter="page_frame" href="#" class="S_txt1">
                        <strong node-type="follow">{{this.$store.state.userdata.followAmount}}</strong>
                        <span class="S_txt2">关注</span>
                    </a>
                </li>
                <li class="S_line1">
                    <a bpfilter="page_frame" href="#" class="S_txt1">
                        <strong node-type="fans">{{this.$store.state.userdata.beFollowedAmount}}</strong>
                        <span class="S_txt2">粉丝</span>
                    </a>
                </li>
                <li class="S_line1">
                    <a bpfilter="page_frame" href="#" class="S_txt1">
                        <strong node-type="weibo">{{this.$store.state.userdata.weiboAmount}}</strong>
                        <span class="S_txt2">微博</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "PersonInfoCard",
    data() {
        return{

        }
    },
    methods: {
    }
}
</script>

<style scoped>

.W_person_info {
    position: relative;
    height: 165px;
    width: 100%;
}
.W_person_info .cover {
    position: relative;
    height: 75px;
    width: 100%!important;
    background-repeat: no-repeat;
    z-index: 1;
}
.W_person_info .cover .headpic {
    width: 60px;
    height: 60px;
    padding: 3px;
    background: rgba(255,255,255,0.3);
    border-radius: 50%;
    position: absolute;
    bottom: -5px;
    left: 50%;
    margin-left: -30px;
}
a, a.S_txt1:hover, a.current .S_txt1, a.S_txt2:hover{
    color: #eb7350;
}
.W_face_radius {
    border-radius: 50%;
}
.W_person_info .WB_innerwrap {
    padding: 16px 10px 9px;
}
.WB_innerwrap {
    padding: 16px;
}
.W_person_info .nameBox {
    height: 16px;
    line-height: 16px;
    text-align: center;
}
.W_person_info .nameBox .name{
    vertical-align: middle;
}
.user_atten {
    height: 34px;
    overflow: hidden;
    margin: 10px 0 0 0;
}
.user_atten li {
    float: left;
    width: 50px;
    text-align: center;
    border-right-width: 1px;
    border-right-style: solid;
    ist-style-type:none;
}
.S_line1{
    border-color: #d9d9d9;
}
li {
    margin: 0;
    padding: 0;
    display: list-item;
    text-align: -webkit-match-parent;
}
a {
    -webkit-tap-highlight-color: rgba(0,0,0,0);
}
.S_txt1{
    color: #333;
}
.user_atten li .S_txt2 {
    display: block;
    font-size: 12px;
}
.S_txt2{
    color: #808080;
}
</style>
