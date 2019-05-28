<template>
    <div>
        <sui-card>
            <sui-card-content>
                <sui-card-header>
                    热门用户
                </sui-card-header>
            </sui-card-content>
            <sui-card-content>
                <sui-feed>
                    <sui-feed-event
                            image="/local-storage/avatar/60.jpg"
                            content="郭富城" />
                    <sui-feed-event>
                        <sui-feed-label
                                image="/local-storage/avatar/62.jpg" />
                        <sui-feed-content
                                content="黎明" />
                    </sui-feed-event>
                    <sui-feed-event
                            image="/local-storage/avatar/67.jpg"
                            content="吴彦祖" />
                    <sui-feed-event>
                        <sui-feed-label
                                image="/local-storage/avatar/69.jpg" />
                        <sui-feed-content
                                content="时间煮雨" />
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
    name:'HotUser',
}
</script>
<style scoped>

</style>