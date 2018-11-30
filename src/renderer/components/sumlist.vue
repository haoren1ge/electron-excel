<template>
  <Content style="padding: 30px 50px;text-align:center;">
      <font style="font-size:24px;">{{this.$store.state.mindate}}至{{this.$store.state.maxdate}}汇总数据列表</font>
          
      <Card>
            <div style="min-height: 200px;">
                <Table  border :columns="columns" :data="data"  stripe ></Table > 
            </div>
      </Card>
   </Content>
</template>

<script>
export default {
  name: "sumlist",
  data(){
      return{
          columns:[ 
                    {
                        title: '序号',
                        key: 'id'
                    },{
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
                        title: '周六加班时间',
                        key: 'sday'
                    },
                    {
                        title: '周日加班时间',
                        key: 'sunday'
                    },
                    {
                        title: '汇总时间',
                        key: 'allday'
                    }
                    ],
          data:[]
      }
  },
  mounted(){

     this.data= this.$store.state.sumlist
  }
 
};
</script>

<style>
</style>
