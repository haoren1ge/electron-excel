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
      keydata: [],
      mindate: "",
      maxdate: ""
    };
  },
  methods: {
    checkofdata(start, end, da) {
       let timeup = this.$store.state.timeup + ":00";
      let timedown = this.$store.state.timedown + ":00";
      let nw1 = "17:30:00";
      let nw2 = "17:50:00";
      let end1
      let end2
      let end3
      let res={
        minutes:0,
        awork:0
      }
      if (new Date(da + " 08:40:00") >= new Date(start)) {
        
        start = new Date(da + " 08:30:00").getTime();
          if ( new Date(da + " " + timeup) >= new Date(end)) {
             end=new Date(end).getTime();
             res.minutes=parseInt((end - start) / 1000 / 60)
          }else if ( new Date(da + " " + timeup) < new Date(end) && new Date(da + " " + timedown) >= new Date(end)) {
             end=new Date(da + " " + timeup).getTime();
             res.minutes=parseInt((end - start) / 1000 / 60)
          }else if ( new Date(da + " " + timedown) < new Date(end) ) {
            end=new Date(end).getTime();
            res.minutes=parseInt((end - start) / 1000 / 60)-60
          }

      } else if (
        new Date(da + " 08:40:00") < new Date(start) &&
        new Date(da + " " + timeup) >= new Date(start)
      ) {
        
        start = new Date(start).getTime();
             if ( new Date(da + " " + timeup) >= new Date(end)) {
             end=new Date(end).getTime();
             res.minutes=parseInt((end - start) / 1000 / 60)
          }else if ( new Date(da + " " + timeup) < new Date(end) && new Date(da + " " + timedown) >= new Date(end)) {
             end=new Date(da + " " + timeup).getTime();
             res.minutes=parseInt((end - start) / 1000 / 60)
          }else if ( new Date(da + " " + timedown) < new Date(end) ) {
            end=new Date(end).getTime();
            res.minutes=parseInt((end - start) / 1000 / 60)-60
          }


      } else if (
        new Date(da + " " + timeup) < new Date(start) &&
        new Date(da + " " + timedown) >= new Date(start)
      ) {
        
        start = new Date(da + " " + timedown).getTime();
          if ( new Date(da + " " + timeup) >= new Date(end)) {
             end=new Date(end).getTime();
             res.minutes=parseInt((end - start) / 1000 / 60)
          }else if ( new Date(da + " " + timeup) < new Date(end) && new Date(da + " " + timedown) >= new Date(end)) {
             end=new Date(da + " " + timeup).getTime();
             res.minutes=parseInt((end - start) / 1000 / 60)
          }else if ( new Date(da + " " + timedown) < new Date(end) ) {
            end=new Date(end).getTime();
            res.minutes=parseInt((end - start) / 1000 / 60)
          }
      

      } else if (
        new Date(da + " " + timedown) > new Date(start) 
      ) {
            start = new Date(start).getTime();
            end=new Date(end).getTime();
            res.minutes=parseInt((end - start) / 1000 / 60)

      } 
      if (res.minutes<0) {
           res.minutes=0        
      }
      if (res.awork<0) {
           res.awork=0        
      }
      
      return res
    },
    checkdata(start, end, da) {
      let timeup = this.$store.state.timeup + ":00";
      let timedown = this.$store.state.timedown + ":00";
      let nw1 = "17:30:00";
      let nw2 = "17:50:00";
      let end1
      let end2
      let end3
      let res={
        minutes:0,
        awork:0
      }
      if (new Date(da + " 08:40:00") >= new Date(start)) {
        
        start = new Date(da + " 08:30:00").getTime();
          if ( new Date(da + " " + timeup) >= new Date(end)) {
             end=new Date(end).getTime();
             res.minutes=parseInt((end - start) / 1000 / 60)
          }else if ( new Date(da + " " + timeup) < new Date(end) && new Date(da + " " + timedown) >= new Date(end)) {
            end=new Date(da + " " + timeup).getTime();
             res.minutes=parseInt((end - start) / 1000 / 60)
          }else if ( new Date(da + " " + timedown) < new Date(end) && new Date(da + " " + nw1) >= new Date(end)) {
            end=new Date(end).getTime();
            res.minutes=parseInt((end - start) / 1000 / 60)-60
          }else if ( new Date(da + " " + nw1) < new Date(end) && new Date(da + " " + nw2) >= new Date(end)) {
            end=new Date(da + " " + nw1).getTime();
            res. minutes=parseInt((end - start) / 1000 / 60)-60
          }else if ( new Date(da + " " + nw2) < new Date(end) ) {
            end1=new Date(da + " " + nw1).getTime();
            end2=new Date(da + " " + nw2).getTime();
            end3=new Date(end).getTime();
            res.minutes=parseInt((end1 - start) / 1000 / 60)-60
            res.awork=parseInt((end3 - end2) / 1000 / 60)
          }

      } else if (
        new Date(da + " 08:40:00") < new Date(start) &&
        new Date(da + " " + timeup) >= new Date(start)
      ) {
        
        start = new Date(start.getTime());
               if ( new Date(da + " " + timeup) >= new Date(end)) {
             end=new Date(end).getTime();
             res.minutes=parseInt((end - start) / 1000 / 60)
          }else if ( new Date(da + " " + timeup) < new Date(end) && new Date(da + " " + timedown) >= new Date(end)) {
            end=new Date(da + " " + timeup).getTime();
             res.minutes=parseInt((end - start) / 1000 / 60)
          }else if ( new Date(da + " " + timedown) < new Date(end) && new Date(da + " " + nw1) >= new Date(end)) {
            end=new Date(end).getTime();
            res.minutes=parseInt((end - start) / 1000 / 60)-60
          }else if ( new Date(da + " " + nw1) < new Date(end) && new Date(da + " " + nw2) >= new Date(end)) {
            end=new Date(da + " " + nw1).getTime();
            res.minutes=parseInt((end - start) / 1000 / 60)-60
          }else if ( new Date(da + " " + nw2) < new Date(end) ) {
            end1=new Date(da + " " + nw1).getTime();
            end2=new Date(da + " " + nw2).getTime();
            end3=new Date(end).getTime();
            res.minutes=parseInt((end1 - start) / 1000 / 60)-60
            res.awork=parseInt((end3 - end2) / 1000 / 60)
          }


      } else if (
        new Date(da + " " + timeup) < new Date(start) &&
        new Date(da + " " + timedown) >= new Date(start)
      ) {
        
        start = new Date(da + " " + timedown).getTime();
              if ( new Date(da + " " + timeup) >= new Date(end)) {
             end=new Date(end).getTime();
             res.minutes=parseInt((end - start) / 1000 / 60)
          }else if ( new Date(da + " " + timeup) < new Date(end) && new Date(da + " " + timedown) >= new Date(end)) {
            end=new Date(da + " " + timeup).getTime();
            res. minutes=parseInt((end - start) / 1000 / 60)
          }else if ( new Date(da + " " + timedown) < new Date(end) && new Date(da + " " + nw1) >= new Date(end)) {
            end=new Date(end).getTime();
            res.minutes=parseInt((end - start) / 1000 / 60)
          }else if ( new Date(da + " " + nw1) < new Date(end) && new Date(da + " " + nw2) >= new Date(end)) {
            end=new Date(da + " " + nw1).getTime();
            res.minutes=parseInt((end - start) / 1000 / 60)
          }else if ( new Date(da + " " + nw2) < new Date(end) ) {
            end1=new Date(da + " " + nw1).getTime();
            end2=new Date(da + " " + nw2).getTime();
            end3=new Date(end).getTime();
            res.minutes=parseInt((end1 - start) / 1000 / 60)
            res.awork=parseInt((end3 - end2) / 1000 / 60)
          }
      

      } else if (
        new Date(da + " " + timedown) > new Date(start) &&
        new Date(da + " " + nw1) <= new Date(start)
      ) {
        start = new Date(start).getTime();
              if ( new Date(da + " " + timeup) >= new Date(end)) {
             end=new Date(end).getTime();
            res. minutes=parseInt((end - start) / 1000 / 60)
          }else if ( new Date(da + " " + timeup) < new Date(end) && new Date(da + " " + timedown) >= new Date(end)) {
            end=new Date(da + " " + timeup).getTime();
             res.minutes=parseInt((end - start) / 1000 / 60)
          }else if ( new Date(da + " " + timedown) < new Date(end) && new Date(da + " " + nw1) >= new Date(end)) {
            end=new Date(end).getTime();
            res.minutes=parseInt((end - start) / 1000 / 60)
          }else if ( new Date(da + " " + nw1) < new Date(end) && new Date(da + " " + nw2) >= new Date(end)) {
            end=new Date(da + " " + nw1).getTime();
            res.minutes=parseInt((end - start) / 1000 / 60)
          }else if ( new Date(da + " " + nw2) < new Date(end) ) {
            end1=new Date(da + " " + nw1).getTime();
            end2=new Date(da + " " + nw2).getTime();
            end3=new Date(end).getTime();
            res.minutes=parseInt((end1 - start) / 1000 / 60)
            res.awork=parseInt((end3 - end2) / 1000 / 60)
          }


      } else if (
        new Date(da + " " + nw1) > new Date(start) &&
        new Date(da + " " + nw2) <= new Date(start)
      ) {
        start = new Date(da + " " + nw1).getTime();
         if ( new Date(da + " " + nw1) < new Date(end) && new Date(da + " " + nw2) >= new Date(end)) {
            end=new Date(da + " " + nw1).getTime();
            res.minutes=parseInt((end - start) / 1000 / 60)
          }else if ( new Date(da + " " + nw2) < new Date(end) ) {
           end1=new Date(da + " " + nw1).getTime();
            end2=new Date(da + " " + nw2).getTime();
            end3=new Date(end).getTime();
            res.minutes=parseInt((end1 - start) / 1000 / 60)
            res.awork=parseInt((end3 - end2) / 1000 / 60)
          }


       } else if (new Date(da + " " + nw2) > new Date(start)) {
         start = new Date(start).getTime();
         end=new Date(end).getTime();
         res.awork=parseInt((end3 - end2) / 1000 / 60)
      }
      if (res.minutes<0) {
           res.minutes=0        
      }
      if (res.awork<0) {
           res.awork=0        
      }
      
      return res
    },
    gethours(m) {
      let half = m % 60;
      let all = parseInt(m / 60);
      if (half > 0) {
        half = parseFloat(half / 60);
        half = Math.round(half * 100) / 100;
      }
      return Math.round((all + half) * 100) / 100;
    },
    isoffday(day) {
      return new Date(day).getDay();
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
            sunday: 0
          };
          let arrs = [];
          for (
            let index = 0;
            index < this.$store.state.data[i].length;
            index++
          ) {
            if (i == 1) {
              this.mindate = this.$store.state.data[i][3];
              this.maxdate = this.$store.state.data[i][3];
            }
            res["N" + index] = this.$store.state.data[i][index];
            switch (index) {
              case 0:
                chres.code = this.$store.state.data[i][index];
                this.keydata.push(chres.code);
                break;
              case 1:
                chres.name = this.$store.state.data[i][index];
                break;
              case 2:
                chres.dep = this.$store.state.data[i][index];
                break;
              case 3:
                chres.date = this.$store.state.data[i][index];
                if (new Date(chres.date) < new Date(this.mindate)) {
                  this.mindate = chres.date;
                }
                if (new Date(chres.date) > new Date(this.maxdate)) {
                  this.maxdate = chres.date;
                }

                break;
              case 4:
                let arr = this.$store.state.data[i][index].split(" ").sort();
                if (arr.length) {
                  arrs = arr.map(element => {
                    return (
                      this.$store.state.data[i][index - 1] +
                      " " +
                      element +
                      ":00"
                    );
                  });
                 
                }
                if (arrs.length > 1) {
                  console.log(2)
                  let hours=0

                  if (this.isoffday(this.$store.state.data[i][index - 1])==6) {
                      hours= this.checkofdata(arrs[0],arrs[arrs.length-1],this.$store.state.data[i][index - 1])
                       chres.sday=this.gethours(hours.minutes)
                  }
                    else if (this.isoffday(this.$store.state.data[i][index - 1])==0) {
                       hours= this.checkofdata(arrs[0],arrs[arrs.length-1],this.$store.state.data[i][index - 1])
                       chres.sunday=this.gethours(hours.minutes)
                  }else{
                    console.log(3)
                   hours= this.checkdata(arrs[0],arrs[arrs.length-1],this.$store.state.data[i][index - 1])
                      chres.wday= this.gethours(hours.minutes)
                      chres.wwday=this.gethours(hours.awork)
                  }

                  //  else if (this.isoffday(this.$store.state.data[i][index - 1])==0) {
                  //     if (minutes>275) {
                  //         minutes-=60
                  //     }
                  //     if (minutes>500) {
                  //       minutes-=20
                  //     }
                  //     chres.sunday=this.gethours(minutes)

                  // }else{
                  //  if (minutes>275) {
                  //     minutes-=60
                  // }else{
                  //   chres.wday= this.gethours(minutes)
                  // }
                  // if (minutes>480 && minutes<=500) {
                  //     chres.wday= this.gethours(480)
                  //     chres.wwday=0
                  // }
                  // else if(minutes>500){
                  //     chres.wday= this.gethours(480)
                  //     chres.wwday=this.gethours(minutes-500)
                  // }
                  // else{
                  //   chres.wday= this.gethours(minutes)
                  // }

                  // }

                  // if (new Date(this.$store.state.data[i][index - 1] +" 08:40:00")>=new Date(arrs[0])) {
                  //     start=new Date(this.$store.state.data[i][index - 1] +" 08:30:00").getTime()
                  // }else if( new Date(this.$store.state.data[i][index - 1] +" 08:40:00") <new Date(arrs[0]) && new Date(this.$store.state.data[i][index - 1] +" 08:40:00") >=new Date(arrs[0])){
                  //      start=new Date(arrs[0]).getTime()
                  // }
                  // else{
                  //     start=new Date(arrs[0]).getTime()
                  // }
                  // minutes=parseInt((end-start) / 1000 / 60)

                  // if (this.isoffday(this.$store.state.data[i][index - 1])==6) {
                  //     if (minutes>275) {
                  //         minutes-=60
                  //     }
                  //     if (minutes>500) {
                  //       minutes-=20
                  //     }
                  //     chres.sday=this.gethours(minutes)

                  // }

                  //  else if (this.isoffday(this.$store.state.data[i][index - 1])==0) {
                  //     if (minutes>275) {
                  //         minutes-=60
                  //     }
                  //     if (minutes>500) {
                  //       minutes-=20
                  //     }
                  //     chres.sunday=this.gethours(minutes)

                  // }else{
                  //  if (minutes>275) {
                  //     minutes-=60
                  // }else{
                  //   chres.wday= this.gethours(minutes)
                  // }
                  // if (minutes>480 && minutes<=500) {
                  //     chres.wday= this.gethours(480)
                  //     chres.wwday=0
                  // }
                  // else if(minutes>500){
                  //     chres.wday= this.gethours(480)
                  //     chres.wwday=this.gethours(minutes-500)
                  // }
                  // else{
                  //   chres.wday= this.gethours(minutes)
                  // }

                  // }
                }
                break;
            }
          }
          this.data.push(res);
          this.tempdata.push(chres);
        }
      }
      this.loading = false;
      let a = new Set(this.keydata);
      this.keydata = [...a];
      
      this.$store.commit("getmin", this.mindate);
      this.$store.commit("getmax", this.maxdate);
      this.$store.commit("getdatalist", this.tempdata);
      this.$store.commit("getkeylist", this.keydata);

      let sdata = [];
      let ind = 1;
      this.$store.state.keylist.forEach(i => {
        let data = {
          id: ind,
          code: i,
          wday: 0,
          wwday: 0,
          sday: 0,
          sunday: 0,
          allday: 0
        };
        this.$store.state.datalist.forEach(item => {
          if (item.code == data.code) {
            data.name = item.name;
            data.dep = item.dep;
            data.wday = Math.round((data.wday + item.wday) * 100) / 100;
            data.wwday = Math.round((data.wwday + item.wwday) * 100) / 100;
            data.sday = Math.round((data.sday + item.sday) * 100) / 100;
            data.sunday = Math.round((data.sunday + item.sunday) * 100) / 100;
            data.allday =
              Math.round(
                (data.wday + data.wwday + data.sday + data.sunday) * 100
              ) / 100;
          }
        });
        sdata.push(data);
        ind++;
      });
      this.$store.commit("getsumlist", sdata);
      let exdata = [];
      let chdata = {
        data1: [],
        data2: [],
        data3: [],
        data4: [],
        data5: []
      };
      exdata.push([
        "序号",
        "工号",
        "姓名",
        "班组",
        "正常工作时间",
        "日常加班时间",
        "周六加班时间",
        "周日加班时间",
        "汇总时间"
      ]);
      sdata.forEach(i => {
        chdata.data1.push(i.name + "(" + i.code + ")");
        chdata.data2.push(i.wday);
        chdata.data3.push(i.wwday);
        chdata.data4.push(i.sday);
        chdata.data5.push(i.sunday);

        exdata.push([
          i.id,
          i.code,
          i.name,
          i.dep,
          i.wday,
          i.wwday,
          i.sday,
          i.sunday,
          i.allday
        ]);
      });
      this.$store.commit("getex", exdata);
      this.$store.commit("getchdata", chdata);
    }
  },

  mounted() {
    this.getfiledata();
  }
};
</script>

<style>
</style>
