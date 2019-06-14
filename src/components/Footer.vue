<template>
    <div>
    <v-footer  height="100%" width="2954.94px">
        <v-card flat tile class="white text-xs-center" style="padding-top: 10px;text-align: center;width:2954.94px ">
            <v-card-text class=" pt-0">
                友情链接：@新浪微博 @QQ空间 @人人网
            </v-card-text>

            <v-divider></v-divider>

            <v-card-text>
                &copy;2019 — <strong>大数据学院-王雪婷Chloe</strong>
            </v-card-text>
        </v-card>
    </v-footer>
    </div>
</template>

<script>
export default {
    name:'Footer',
    data() {
        return{
            icons: [
                'fab fa-facebook',
                'fab fa-twitter',
                'fab fa-google-plus',
                'fab fa-linkedin',
                'fab fa-instagram'
            ]
        }
    }
}
</script>
<style scoped>

</style>