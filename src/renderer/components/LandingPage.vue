<template>
 <Content :style="{padding: '30px 50px'}">
                   <Card>
                    <div style="min-height: 600px;text-align:center">
                      <font class="myfont">考勤统计<span style="color:#2b85e4;">V1.0</span></font>
                    </div>
                </Card>
            </Content>
</template>

<script>
  // import SystemInformation from './LandingPage/SystemInformation'

  export default {
    name: 'landing-page',
     created(){
        this.$store.commit('getdata',[])
        this.$store.commit('getdatalist',[])
        this.$store.commit('getsumlist',[])
        this.$store.commit('getkeylist',[])
    }
  }
</script>

<style>
 .myfont{
   align-content: center;
   text-align: center;
   line-height: 600px;
   font-size: 55px;

 }
</style>
