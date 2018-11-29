<template>
  <Content style="padding: 30px 50px;text-align:center;">
          <font style="font-size:24px;">数据列表</font>

      <Card>
            <div style="min-height: 200px;">
                <Table  border :columns="columns" :data="data"  stripe ></Table > 
            </div>
      </Card>
   </Content>
</template>

<script>
// import SystemInformation from './LandingPage/SystemInformation'

export default {
  name: "datalist",
  data(){
      return{
          columns:[
               {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '工号',
                        key: 'code'
                    },
                    {
                        title: '班组',
                        key: 'dep'
                    },
                    {
                        title: '日期',
                        key: 'date'
                    }
                    ,
                    {
                        title: '正常工作时间',
                        key: 'wday'
                    }
                    ,
                    {
                        title: '日常加班时间',
                        key: 'wwday'
                    }
                    ,
                    {
                        title: '周末加班时间',
                        key: 'offday'
                    }
          ],
          data:[]
      }
  },
  mounted(){
      this.data=this.$store.state.datalist
  }
};
</script>

<style>
</style>
