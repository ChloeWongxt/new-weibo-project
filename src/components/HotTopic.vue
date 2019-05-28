<template>
    <div>
        <sui-card>
            <sui-card-content>
                <sui-card-header>
                    热门话题
                </sui-card-header>
            </sui-card-content>
            <sui-card-content>
                <sui-feed>
                    <sui-feed-event
                            image="/local-storage/avatar/54.jpg"
                            content="大月月" />
                    <sui-feed-event>
                        <sui-feed-label
                                image="/local-storage/avatar/55.jpg" />
                        <sui-feed-content
                                content="谱蓝真棒" />
                    </sui-feed-event>
                    <sui-feed-event
                            image="/local-storage/avatar/56.jpg"
                            content="明天真的" />
                    <sui-feed-event>
                        <sui-feed-label
                                image="/local-storage/avatar/57.jpg" />
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
    name:'HotTopic',
}
</script>
<style scoped>

</style>