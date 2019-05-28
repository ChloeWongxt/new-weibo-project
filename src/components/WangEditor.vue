<template>
  <div>
    <div ref="div2" class="text"></div>

    <v-layout row align-center style="height: 45px;margin-bottom: -10px">
      <v-flex sm3>
        <div ref="div1" class="toolbar">
        </div>
      </v-flex>
      <v-flex sm3 offset-sm7>
        <v-btn color="warning" depressed @click="wbSubmit" :disabled="isDisable">发布</v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import E from 'wangeditor'

  export default {
    name: "WangEditor",
    data: () => ({
      editor: null,
      editorContent: '',
      isDisable:true
    }),
    props: ['catchData', 'content'],    // 接收父组件的方法
    watch: {
      content() {
        this.editor.txt.html(this.content);
        //上传图片必须带文字
        this.isDisable = this.editor.txt.text() === '';
      }
    },
    mounted() {
      this.editor = new E(this.$refs.div1, this.$refs.div2);
      this.editor.customConfig.onchange = (html) => {
        this.editorContent = html;
        this.catchData(this.editorContent);  // 把这个html通过catchData的方法传入父组件
        //上传图片必须带文字
        this.isDisable = this.editor.txt.text() === '';
      };

      // 下面两个配置，使用其中一个即可显示“上传图片”的tab。但是两者不要同时使用！！！
      this.editor.customConfig.uploadImgShowBase64 = true;   // 使用 base64 保存图片;
      this.editor.customConfig.uploadImgServer = '你的上传图片的接口';
      // this.editor.customConfig.uploadFileName = '你自定义的文件名';
      this.editor.customConfig.menus = [          // 菜单配置
        'link',  // 插入链接
        'emoticon',  // 表情
        'image',  // 插入图片
      ];
      // 下面是最重要的的方法
      this.editor.customConfig.uploadImgHooks = {
        before: function (xhr, editor, files) {
          // 图片上传之前触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件

          // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
          return {
              prevent: true,
              msg: '放弃上传'
          }
        },
        success: function (xhr, editor, result) {
          // 图片上传并返回结果，图片插入成功之后触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
          this.imgUrl = Object.values(result.data).toString()
        },
        fail: function (xhr, editor, result) {
          // 图片上传并返回结果，但图片插入错误时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
            this.$Message.info("插入图片错误")
        },
        error: function (xhr, editor) {
          // 图片上传出错时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
            this.$Message.info("图片上传出错")
        },
        timeout: function (xhr, editor) {
          // 图片上传超时时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
            this.$Message.info("图片上传超时")
        },

        // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
        // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
        customInsert: function (insertImg, result, editor) {
          // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
          // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

          // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
          let url = Object.values(result.data)      // result.data就是服务器返回的图片名字和链接
          JSON.stringify(url);   // 在这里转成JSON格式
          insertImg(url)
          // result 必须是一个 JSON 格式字符串！！！否则报错
        }
      };

      this.editor.create();   // 创建富文本实例
    },
    methods:{
      wbSubmit(){
          this.$Message.info("点击事件触发")
          this.$axios.post('/api/add-weibo',{
              userId:this.$store.state.user.userId,
              weiboContent:this.editor.txt.text()
          }).then(response =>{
              let result=response.data;
              if (result.success){
                  this.$Message.success(result.msg);
              }else {
                  this.$Message.error('发送微博失败');
              }
          })
        var json=this.editor.txt.getJSON();
        var jsonStr=JSON.stringify(json);
        // console.info(json[0].children[0].attrs==='')
        // console.info(jsonStr)
      }
    }
  }
</script>

<style scoped>
  .toolbar {
    border: 1px solid #ccc;
  }

  .text {
    height: 100px;
    border: 1px solid #ccc;
    text-align: left;
  }
</style>
