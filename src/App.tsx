import React, { useEffect, useState, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import LazyLoad from 'react-lazyload';
import PropTypes from 'prop-types';

const barOption = {
  // color: ["#3398DB"],
  tooltip: {
    trigger: "axis",
    // axisPointer: {
    //   label: {
    //     show:true
    //   },
    //   type: "shadow"
    // }
    formatter: '详情：<br />系列名称: {a}<br />类目值：{b}<br />数值：{c}<br />'

  },
  legend: {
    show: true
  },
  grid: {},
  xAxis: [{
    type: "category",
    // data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],

  }],
  yAxis: [{
    type: "value"
  }],
  series: [{
    name: "直接访问",
    type: "bar",
    barWidth: "60%",
    data: [10, 52, 200, 334, 390, 330, 220]
  }]
}

const pieOption = {
  title: {
    text: '账户资产规模分布',
    left: 'center',
    top: 'center'
  },
  tooltip: {
    trigger: "item",
    axisPointer: {
      type: "shadow",
      label: {
        show:true
      },
    }
  },
  legend: {
    show: true,
    bottom: "0%",
    // padding: [40, 0, 0, 0]
  },
  series: [
    {
      type: 'pie',
      data: [],
      radius: ['50%', '70%'],
    }
  ]
};

/**
 * 画像图表
 * @param
 * @returns
 */
const CustChart = (props) => {
  const [chartIns, setChartIns] = useState(null);
  const [option, setOption] = useState(props.option);

  const loadingOption = {
    text: '加载中...',
    color: '#4413c2',
    textColor: '#270240',
    // maskColor: 'rgba(194, 88, 86, 0.3)',
    zlevel: 0
  };

  // useEffect(() => { // 解决画像左侧菜单栏的展开与收缩功能会导致echarts重新渲染引发的bug
  //   console.log('collapsed...');
  //   if (chartIns) {
  //     console.log('chartIns', chartIns);
  //     chartIns.hideLoading();
  //   }
  // }, [collapsed]);

  useEffect(() => {
    console.log('effect...');
  }, []);
  const getData = (echarts) => {
    const charts = echarts;
    setTimeout(() => {
      if (props.type === 'pie') {
        charts.setOption({
          series: [
            {
              data: [
                {
                  value: 635,
                  name: '中等收入'
                },
                {
                  value: 89,
                  name: '高净值'
                },
                {
                  value: 1548,
                  name: '普通收入'
                },
                {
                  value: 600,
                  name: '未知'
                }
              ],
            }
          ]
        });
      } else {
        charts.setOption({
          series: [
            {
              data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
          ]
        });
      }

      charts.hideLoading();
    }, 1000);
  };
  const onChartReady = (echarts) => {
    console.log('onChartReady....');
    setChartIns(echarts);
    getData(echarts);
  };

  const barChart = useMemo(() => (
    <ReactECharts
      style={{ width: '600px', height: '400px' }}
      loadingOption={loadingOption}
      showLoading
      onChartReady={onChartReady}
      option={option}
    />
  ), []);

  return (
    <span> { barChart }</span>
  );
};

CustChart.propTypes = {
  option: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired
};

const renderCharts = () => [...new Array(1).keys()].map((i) => (
  <div style={{ display: 'flex' }}>
    <LazyLoad
      // scrollContainer="#custReact-layout-content" // 需要知道是哪个div在滚动才能正常懒加载
      height={400}
    >
      <CustChart option={barOption} type="bar" />
    </LazyLoad>
    <LazyLoad
      // scrollContainer="#custReact-layout-content"
      height={400}
    >
      <CustChart option={pieOption} type="pie" />
    </LazyLoad>
  </div>
));

/**
 * 模拟生成40张图表，异步加载数据+懒加载 demo
 * @returns
 */
const Page = () => (
  <div id="chartPage">
    {renderCharts()}
  </div>
);

export default Page;
