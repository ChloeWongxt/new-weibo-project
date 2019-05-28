<template>
    <div>
        <Modal
                v-model="isAvailable"
                title="转发微博"
                @on-ok="ok"
                @on-cancel="cancel">
            <sui-card class="fluid" style="background-color: #EEEEEE">
                <sui-card-content>
                    <sui-card-description>
                        @王雪婷：Elliot Fu is a film-maker from New York.
                    </sui-card-description>
                </sui-card-content>
            </sui-card>
            <Input v-model="value8" type="textarea" :autosize="{minRows: 5,maxRows: 10}"
                   placeholder="Enter something..."/>
        </Modal>
    </div>
</template>

<script>
export default {
    name: 'RepostDialog',
    props: ['modal1'],
    data() {
        return {
            weibotext: '',
            isAvailable: this.modal
        }
    },
    components: {},
    mounted() {

    },
    methods: {
        ok() {
            this.$Message.info('转发微博成功');
        },
        cancel() {
            this.$Message.info('取消转发');
        }
    },
    watch: {
        modal1(value) {
            this.isAvailable = value;
        },
        isAvailable(value) {
            this.$emit('update:modal1', value)
        }
    }
}
</script>

<style>

</style>
