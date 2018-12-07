<template>
  <div id="app">
    <!-- <div class="layout"> -->
        <Layout>
            
       <Menu mode="horizontal" theme="light" :style="{margin:'40px  20px 0 20px'}">
        
        <MenuItem name="1" @click.native="openfile" v-if="!this.$store.state.data.length">
            <Icon type="ios-paper" />
            打开文件
        </MenuItem>
          <MenuItem name="2">
            <Icon type="ios-construct" />
            <router-link to="/">关闭文件</router-link>
        </MenuItem>
        </MenuItem>
          <MenuItem name="3"  @click.native="act=3" v-if="this.$store.state.data.length">
            <Icon type="md-list" />
          <router-link to="/mydata">初始数据</router-link>
          
        </MenuItem>
        </MenuItem>
          <MenuItem name="4" v-if="this.$store.state.datalist.length">
            <Icon type="md-list" />
          <router-link to="/datalist">数据列表</router-link>
          
        </MenuItem>
        </MenuItem>
          <MenuItem name="5" v-if="this.$store.state.sumlist.length">
            <Icon type="md-paper" />
            <router-link to="/sumlist">汇总列表</router-link>
        </MenuItem>

        </MenuItem>
          <MenuItem name="6" v-if="this.$store.state.chdata">
            <Icon type="md-podium" />
            <router-link to="/chlist">数据图表</router-link>
        </MenuItem>


        </MenuItem>
          <MenuItem name="7"  @click.native="savefile" v-if="this.$store.state.sumlist.length">
            <Icon type="md-paper" />
            导出数据
        </MenuItem>
        </MenuItem>
          <MenuItem name="8" >
            <Icon type="md-paper" />
            <router-link to="/setting">设&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置</router-link>
            
        </MenuItem>
        </MenuItem>
          <MenuItem name="9" @click.native="full">
            <Icon type="md-qr-scanner" />
            全屏/恢复
        </MenuItem>
          </MenuItem>
          <MenuItem name="10" @click.native="min">
            <Icon type="md-remove" />
            最小化
        </MenuItem>
        <MenuItem name="11" @click.native="about">
            <Icon type="md-help" />
            关&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;于
        </MenuItem>
        
        <MenuItem name="12" @click.native="exit">
            <Icon type="md-close" />
            退&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;出
        </MenuItem>
       </Menu>
             <router-view></router-view>
            
            <Footer class="layout-footer-center">2018-2019 &copy; 中航电测仪器股份有限公司-汉中分公司</Footer>
        </Layout>

 

   
  </div>
</template>

<script>
import xlsx from "node-xlsx";
import fs from 'fs'
import path from 'path'
export default {
  name: "mmain",
  data() {
    return {
       timeup:"",
       timedown:""
    };
  },
  mounted(){
           let da;
           fs.readFile(path.join(this.$electron.remote.app.getPath('userData'), '/seeting.json'),(err,data)=>{
           da=JSON.parse(data.toString())
           this.$store.commit("gettimeup", da.timeup);
           this.$store.commit("gettimedown", da.timedown);
        })
  },
  methods:{
     about() {
      this.$Modal.info({
        title: "关于本软件",
        content: "基于nodejs、vue和electron开发。"
      });
    
    },
    full() {
      this.$electron.ipcRenderer.send("full");
    },
    exit() {
      this.$electron.ipcRenderer.send("exit");
    },
    min() {
      this.$electron.ipcRenderer.send("min");
    },
    openfile() {
     
      let that = this;
      this.$electron.remote.dialog.showOpenDialog(
        {
          filters: [{ name: "excel", extensions: ["xls", "xlsx"] }],
          properties: ["openFile"]
        },
        function(e) {
          if (e) {
            that.$store.commit("getdata", []);
            var obj = xlsx.parse(e[0]);
            that.$store.commit("getdata", obj[0].data);
            that.$router.push("/mydata");
            
          }
        }
      );
    },
    savefile() {
      let that = this;
      this.$electron.remote.dialog.showSaveDialog(
        {
          filters: [{ name: "excel", extensions: ["xls", "xlsx"] }]
          // properties: ["openFile"]
        },
        function(e) {
          if (e) {
            let data1=[{
              name:"sheet1",
              data:that.$store.state.exdata
            }]
            
            var buffer = xlsx.build(data1);
            fs.writeFile(e, buffer, function(err) {
              if (err) that.$Message.error('保存文件失败！'+err);
               that.$Message.success('保存文件成功！');
            });
          }
        }
      );
    }
  }
};
</script>

<style scoped>
a {
  color: #515a6e;
}
.ivu-menu-light {
  background-color: rgba(255, 255, 255, 0);
}
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #2b85e4;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
.layout-footer-center {
  text-align: center;
}
</style>
