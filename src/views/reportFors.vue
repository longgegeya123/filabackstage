<template>
  <div class="report">
    <Crumbs></Crumbs>
    <el-card>
      <div id="main" style="width:100%;height:850px;"></div>
    </el-card>
  </div>
</template>
<script>
import echarts from "echarts";
import Crumbs from "@/components/crumbs.vue";
import { mapActions } from "vuex";
import _ from "lodash";
export default {
  name: "ReportFors",
  components: { Crumbs },
  data() {
    return {
      result: "",
      option: {
        title: {
          text: "用户来源"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#E9EEF3"
            }
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ]
      }
    };
  },
  async mounted() {
    var myChart = echarts.init(document.getElementById("main"));
    let { data: res } = await this.getMyChartFn();
    this.result = _.merge(res.data, this.option);
    myChart.setOption(this.result);
  },
  methods: {
    ...mapActions("lxlVuex", ["getMyChartFn"])
  }
};
</script>
<style lang="scss" scoped>
</style>