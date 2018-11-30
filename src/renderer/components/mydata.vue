<template>
  <Content style="padding: 30px 50px;text-align:center;">
          <font style="font-size:24px;">原始数据列表</font>

      <Card>
            <div style="min-height: 200px;">
                <Table  :loading="loading" border :columns="columns" :data="data"  stripe ></Table > 
            </div>
      </Card>
   </Content>
</template>

<script>
// import SystemInformation from './LandingPage/SystemInformation'

export default {
  name: "mydata",
  data() {
    return {
      loading: true,
      columns: [],
      data: [],
      tempdata: [],
      keydata:[],
      mindate:"",
      maxdate:""
    };
  },
  methods: {
      gethours(m){
        let half=m%60
        let all=parseInt(m/60)
        if (half>0) {
             half=parseFloat(half/60)
             half=Math.round(half*100)/100;
        }
        return Math.round((all+half)*100)/100;
        },
    isoffday(day) {
      //  if (new Date(day).getDay() != 0 && new Date(day).getDay() != 6) {
      //   return false;
      // } else {
      //   return true;
      // }
      return new Date(day).getDay()
    },
    getfiledata() {
      this.columns = [];
      this.data = [];
      for (let i = 0; i < this.$store.state.data.length; i++) {
        if (i == 0) {
          for (
            let index = 0;
            index < this.$store.state.data[i].length;
            index++
          ) {
            this.columns.push({
              title: this.$store.state.data[i][index],
              key: "N" + index
            });
          }
        } else {
          let res = {};
          let chres = {
            name: "",
            code: "",
            dep: "",
            wday: 0,
            wwday: 0,
            sday: 0,
            sunday:0
          };
          let arrs = [];
          for (
            let index = 0;
            index < this.$store.state.data[i].length;
            index++
          ) {
              if (i==1) {
                  this.mindate=this.$store.state.data[i][3]
                  this.maxdate=this.$store.state.data[i][3]
              }
            res["N" + index] = this.$store.state.data[i][index];
            switch (index) {
              case 0:
                chres.code = this.$store.state.data[i][index];
                this.keydata.push(chres.code)
                break;
              case 1:
                chres.name = this.$store.state.data[i][index];
                break;
              case 2:
                chres.dep = this.$store.state.data[i][index];
                break;
              case 3:
                chres.date = this.$store.state.data[i][index];
                if (new Date(chres.date)< new Date(this.mindate)) {
                    this.mindate=chres.date
                }
                if (new Date(chres.date)> new Date(this.maxdate)) {
                    this.maxdate=chres.date
                }

                break;
              case 4:
                let arr = this.$store.state.data[i][index].split(" ").sort();
                if (arr.length) {
                  arrs = arr.map(element => {
                    return (
                      this.$store.state.data[i][index - 1] +" " +element +":00"
                    );
                  });
                //   console.log(arrs);
                }
                if (arrs.length>1) {
                    let hours
                    let minutes
                    let start
                    let end=new Date(arrs[arrs.length-1]).getTime()

                    if (new Date(this.$store.state.data[i][index - 1] +" 08:40:00")>new Date(arrs[0])) {
                        start=new Date(this.$store.state.data[i][index - 1] +" 08:30:00").getTime()
                    }else{
                        start=new Date(arrs[0]).getTime()
                    }
                    minutes=parseInt((end-start) / 1000 / 60)

                    if (this.isoffday(this.$store.state.data[i][index - 1])==6) {
                        if (minutes>275) {
                            minutes-=60
                        }
                        if (minutes>500) {
                          minutes-=20
                        }
                        chres.sday=this.gethours(minutes)
                        
                    }

                     else if (this.isoffday(this.$store.state.data[i][index - 1])==0) {
                        if (minutes>275) {
                            minutes-=60
                        }
                        if (minutes>500) {
                          minutes-=20
                        }
                        chres.sunday=this.gethours(minutes)
                        
                    }else{
                     if (minutes>275) {
                        minutes-=60
                    }else{
                      chres.wday= this.gethours(minutes)
                    }
                    if (minutes>480 && minutes<=500) {
                        chres.wday= this.gethours(480)
                        chres.wwday=0
                    }
                    else if(minutes>500){
                        chres.wday= this.gethours(480)
                        chres.wwday=this.gethours(minutes-500)
                    }
                    else{
                      chres.wday= this.gethours(minutes)
                    }

                    }
                }
                break;
            }
            if (index == 4) {
            }
          }
          this.data.push(res);
          this.tempdata.push(chres)
        }
      }
      this.loading = false;
      let a=new Set(this.keydata)
      this.keydata= [...a]
      console.log(this.maxdate)
      this.$store.commit('getmin',this.mindate)
      this.$store.commit('getmax',this.maxdate)
      this.$store.commit('getdatalist',this.tempdata)
      this.$store.commit('getkeylist',this.keydata)

      let sdata=[]
      let ind=1
       this.$store.state.keylist.forEach(i => {
          let data={
              id:ind,
              code:i,
              wday:0,
              wwday:0,
              sday:0,
              sunday:0,
              allday:0
          }
          this.$store.state.datalist.forEach(item=>{
              if (item.code==data.code) {
                  data.name=item.name
                  data.dep=item.dep
                  data.wday=Math.round((data.wday+item.wday)*100)/100;
                  data.wwday=Math.round((data.wwday+item.wwday)*100)/100;
                  data.sday=Math.round((data.sday+item.sday)*100)/100;
                  data.sunday=Math.round((data.sunday+item.sunday)*100)/100;
                  data.allday=Math.round((data.wday+data.wwday+data.sday+data.sunday)*100)/100;
              }
          })
          sdata.push(data)
          ind++
         
      });
       this.$store.commit('getsumlist',sdata)
       let exdata=[]
       let chdata={
           data1:[],
           data2:[],
           data3:[],
           data4:[],
           data5:[]
       }
      exdata.push([ '序号','工号','姓名','班组','正常工作时间','日常加班时间','周六加班时间','周日加班时间','汇总时间'])
      sdata.forEach(i=>{
          chdata.data1.push(i.name+"("+i.code+")")
           chdata.data2.push(i.wday)
            chdata.data3.push(i.wwday)
             chdata.data4.push(i.sday)
             chdata.data5.push(i.sunday)

          exdata.push([i.id,i.code,i.name,i.dep,i.wday,i.wwday,i.sday,i.sunday,i.allday])
      })
     this.$store.commit('getex',exdata)
     this.$store.commit('getchdata',chdata)
    },

  },

  mounted() {
    this.getfiledata();
  }
};
</script>

<style>
</style>
