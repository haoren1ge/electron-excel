<template>
  <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
  

  <Content style="padding: 30px 50px;text-align:center;">
      <font style="font-size:24px;">数据图表</font>
          
      <Card>
            <div id="myChart" style="width: 100%;height:5000px;"></div>
      </Card>
      
   </Content>
</template>
 
<script>
export default {
  name: "chlist",
  data() {
    return {};
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ["正常工作时间", "日常加班时间", "周六加班时间","周日加班时间"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value"
        },
        yAxis: {
          type: "category",
          data: this.$store.state.chdata.data1
        },
        series: [
          {
            name: "正常工作时间",
            type: "bar",
            stack: "1",
            label: {
              normal: {
                show: true,
                position: "insideRight"
              }
            },
            itemStyle: {
              normal: {
                color: "#2b85e4"
              }
            },
            data: this.$store.state.chdata.data2
          },
          {
            name: "日常加班时间",
            type: "bar",
            stack: "1",
            label: {
              normal: {
                show: true,
                position: "insideRight"
              }
            },
             itemStyle: {
              normal: {
                color: "#19be6b"
              }
            },
            data: this.$store.state.chdata.data3
          },
          {
            name: "周六加班时间",
            type: "bar",
            stack: "1",
            label: {
              normal: {
                show: true,
                position: "insideRight"
              }
            },
             itemStyle: {
              normal: {
                color: "#ff9900"
              }
            },
            data:this.$store.state.chdata.data4
          }
          ,
          {
            name: "周日加班时间",
            type: "bar",
            stack: "1",
            label: {
              normal: {
                show: true,
                position: "insideRight"
              }
            },
             itemStyle: {
              normal: {
                color: "#ed4014"
              }
            },
            data:this.$store.state.chdata.data5
          }
        ]
      });
    }
  }
};
</script>
 
<style scoped>
</style>