<template>
    <div class="fluid">
        <sui-card class="weibocard">
            <sui-card-content >
                <span class="right floated">
                <Dropdown style="margin-left: 20px" placement="bottom-end" @on-click="weiboOperation">
                    <a href="javascript:void(0)">
                        <Icon type="ios-arrow-down"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem name="deleteWeibo">删除</DropdownItem>
                        <DropdownItem name="modifyWeibo">编辑微博</DropdownItem>
                        <DropdownItem name="changeFriendCanSee">转换为好友圈可见</DropdownItem>
                        <DropdownItem name="changeOnlyMeCanSee">转换为仅自己可见</DropdownItem>
                        <!--<DropdownItem><modify-dialog></modify-dialog></DropdownItem>-->
                    </DropdownMenu>
                </Dropdown>
                </span>
                <sui-image class="left floated" size="mini" :circular="true" src="/api/avatar/1.jpg"/>
                <sui-card-header>王雪婷</sui-card-header>
                <sui-card-meta>2019.5.17</sui-card-meta>
                <sui-card-description>
                    今天又是美好的一天呢！
                </sui-card-description>
            </sui-card-content>
            <sui-card-content extra>
                <span>
                  <sui-icon name="star"/> 收藏
                </span>
                <span>
                    <sui-icon name="like"/>转发110
                </span>
                <span>
                  <sui-icon name="star"/> 评论20
                </span>
                <span>
                    <sui-icon name="like"/>点赞50
                </span>

            </sui-card-content>
            <sui-card-content extra>
                <Input placeholder="Enter text" style="width: 100%">
                    <Icon type="ios-search" slot="suffix" @click="handleAddComClick" />
                </Input>
            </sui-card-content>
        </sui-card>
        <modify-dialog :modal1.sync="modifydialog"></modify-dialog>
        <repost-dialog :modal1.sync="repostdialog"></repost-dialog>
    </div>
</template>

<script>
import RepostDialog from './RepostDialog'
import ModifyDialog from './ModifyDialog'
export default {
    name:'HomeCard',
    data:() => ({
        weibo:[],
        weibotext: '',
        repostdialog:false,
        modifydialog:false
    }),
    components:{
        RepostDialog,
        ModifyDialog
    },
    mounted(){
    },
    methods:{
        handleAddComClick(){
            this.$Message.success("添加评论成功")
        },
        ok () {
            this.$Message.info('Clicked ok');
        },
        cancel () {
            this.$Message.info('Clicked cancel');
        },
        weiboOperation(name){
            switch (name) {
                case 'deleteWeibo' :this.deleteWeibo();break;
                case 'modifyWeibo':this.modifyWeibo();break;
                case 'changeFriendCanSee':;break;
                case 'changeOnlyMeCanSee':;break;
            }
        },
        modifyWeibo(){
            this.modifydialog=true
        },
        deleteWeibo(){
            this.repostdialog=true
        }
    }
}
</script>

<style>
.weibocard{
    text-align: left;
    width: 100% !important;
}
</style>
