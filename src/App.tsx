import React, { useEffect, useState, useMemo } from 'react';
import 'antd/dist/antd.css';
import ReactECharts from 'echarts-for-react';
import LazyLoad from 'react-lazyload';
import PropTypes from 'prop-types';
import {Button, Card} from 'antd'

const gridStyle = {
  width: '50%',
  textAlign: 'center',
};



const xbarOption = {
  tooltip: {
    trigger: "axis",
    // formatter: '详情：<br />系列名称: {a}<br />类目值：{b}<br />数值：{c}<br />'

  },
  legend: {
    show: true,
    bottom: "0%",
  },
  grid: {},
  xAxis: [{
    type: "category",
    data: ["股票A股", "股票H股", "基金", "债券", "混合型", "打新", "其它"],

  }],
  yAxis: [{
    type: "value"
  }],
  series: [{
    name: "投资偏好",
    type: "bar",
    barWidth: "60%",
    data: []
  }]
}

const ybarOption = {
  tooltip: {
    trigger: "axis",
    // formatter: '详情：<br />系列名称: {a}<br />类目值：{b}<br />数值：{c}<br />'

  },
  legend: {
    show: true,
    bottom: "0%",
  },
  grid: {},
  yAxis: [{
    type: "category",
    data: ["营业部A", "营业部A", "营业部B", "营业部C", "营业部D", "营业部E", "营业部F"],

  }],
  xAxis: [{
    type: "value",
    position: "top"
  }],
  series: [{
    name: "营业部分布",
    type: "bar",
    barWidth: "60%",
    data: []
  }]
}

// 圆环
const ringOption = {
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
  },
  series: [
    {
      type: 'pie',
      data: [],
      radius: ['50%', '70%'],
    }
  ]
};

// 圆形
const roundOption = {
  title: {
    text: '账户资产规模分布',
    // left: 'center',
    // top: 'center'
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
  },
  series: [
    {
      type: 'pie',
      data: [],
      radius: '50%',
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
  const getRandomNum = ():number => {
    return Math.floor(Math.random()*500)
  }
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
                  value: 635+getRandomNum(),
                  name: '中等收入'
                },
                {
                  value: 89+getRandomNum(),
                  name: '高净值'
                },
                {
                  value: 1548+getRandomNum(),
                  name: '普通收入'
                },
                {
                  value: 600+getRandomNum(),
                  name: '未知'
                }
              ],
            }
          ]
        });
      } else if(props.type === 'bar') {
        charts.setOption({
          series: [
            {
              data: [820+getRandomNum(), 932+getRandomNum(), 901+getRandomNum(), 934+getRandomNum(), 1290+getRandomNum(), 1330+getRandomNum(), 1320+getRandomNum()]
            }
          ]
        });
      }

      charts.hideLoading();
    }, 500);
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

const renderCharts = () => [...new Array(10).keys()].map((i) => (
    <React.Fragment>
      <Card.Grid style={gridStyle}>
        <LazyLoad
          // scrollContainer="#custReact-layout-content" // 需要知道是哪个div在滚动才能正常懒加载
          height={400}
        >
          <CustChart option={xbarOption} type="bar" />
        </LazyLoad>
      </Card.Grid>
      <Card.Grid style={gridStyle}>
        <LazyLoad
          // scrollContainer="#custReact-layout-content"
          height={400}
        >
          <CustChart option={ringOption} type="pie" />
        </LazyLoad>
      </Card.Grid>

      <Card.Grid style={gridStyle}>
        <LazyLoad
          // scrollContainer="#custReact-layout-content"
          height={400}
        >
          <CustChart option={roundOption} type="pie" />
        </LazyLoad>
      </Card.Grid>
      <Card.Grid style={gridStyle}>
        <LazyLoad
          // scrollContainer="#custReact-layout-content"
          height={400}
        >
          <CustChart option={ybarOption} type="bar" />
        </LazyLoad>
      </Card.Grid>
    </React.Fragment>

    
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
