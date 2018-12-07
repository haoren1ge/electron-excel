<template>
 <Content :style="{padding: '30px 50px'}">
                   <Card>
                    <div style="min-height: 600px;text-align:center">
                     <div style="font-size:20px;line-height: 400px">午休时间<Input  style="width:60px;" v-model="timeup" size="large"/>--<Input  style="width:60px" v-model="timedown" size="large"/> 
                    
                     <Button type="primary"  @click.native="save">确  定</Button>
                     </div>
                    
                    </div>
                </Card>
            </Content>
</template>

<script>

import fs from "fs";
import path from 'path'
export default {
  name: "setting",
  data() {
    return {
      timeup: "",
      timedown: ""
    };
  },
  created() {
    this.timeup = this.$store.state.timeup;
    this.timedown = this.$store.state.timedown;
  },
  methods: {
    save(){


        this.$store.commit("gettimeup", this.timeup);
        this.$store.commit("gettimedown", this.timedown);
        let ss={
            timeup:this.timeup,
            timedown:this.timedown
        }
      fs.writeFile(path.join(this.$electron.remote.app.getPath('userData'), '/seeting.json'),JSON.stringify(ss),(e)=>{
          if (!e) {
              this.$Message.success('设置成功！');
          }
          else{
            this.$Message.success(e);
          }
      })
    }
  },
  mounted() {}
};
</script>

<style>
.myfont {
  align-content: center;
  text-align: center;
  line-height: 600px;
  font-size: 55px;
}
</style>
