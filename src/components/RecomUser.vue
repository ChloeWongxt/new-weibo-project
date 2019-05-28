<template>
    <div>
        <sui-card>
            <sui-card-content>
                <sui-card-header>
                    推荐用户
                </sui-card-header>
            </sui-card-content>
            <sui-card-content>
                <sui-feed>
                    <sui-feed-event
                            :image="this.$store.state.user.userAvatar"
                            content="大月月" />
                    <sui-feed-event>
                        <sui-feed-label
                                :image="this.$store.state.user.userAvatar" />
                        <sui-feed-content
                                content="谱蓝真棒" />
                    </sui-feed-event>
                    <sui-feed-event
                            :image="this.$store.state.user.userAvatar"
                            content="明天真的" />
                    <sui-feed-event>
                        <sui-feed-label
                                :image="this.$store.state.user.userAvatar" />
                        <sui-feed-content
                                content="天气很好" />
                    </sui-feed-event>
                </sui-feed>
            </sui-card-content>
            <sui-card-content extra>
                <sui-button>查看更多</sui-button>
            </sui-card-content>
        </sui-card>
    </div>
</template>

<script>
export default {
    name:'RecomUser',
}
</script>
<style scoped>

</style>