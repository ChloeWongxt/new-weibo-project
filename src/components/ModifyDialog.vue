<template>
    <div>
        <Modal
                v-model="isAvailable"
                title="编辑微博"
                @on-ok="ok"
                @on-cancel="cancel">
            <Input v-model="value8" type="textarea" :autosize="{minRows: 5,maxRows: 10}"
                   placeholder="Enter something..."/>
        </Modal>
    </div>
</template>

<script>
export default {
    name: 'ModifyDialog',
    props: ['modal1'],
    data() {
        return {
            weibotext: '',
            isAvailable: this.modal1
        }
    },
    components: {},
    mounted() {

    },
    methods: {
        ok() {
            this.$Message.info('修改微博成功');
        },
        cancel() {
            this.$Message.info('取消修改');
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
