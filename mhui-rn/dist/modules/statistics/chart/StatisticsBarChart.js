// @ts-nocheck

/* eslint-disable  */
import React, { useContext } from 'react';
import { BarChart } from "../../../components/barChart";
import { ConfigContext } from "../../../components/configProvider";
import DynamicColor from "../../../styles/DynamicColor";

/** 柱形条未选中时的背景颜色 */
const barChartRawItemColor = new DynamicColor('#FFE4BD', 'rgba(230,142,16,0.30)');
/** 柱形条被选中时的背景颜色 */

const barChartCheckedItemColor = new DynamicColor('#FFA626', '#E68E10');
const defaultXAxisProps = {
  data: ['Mon', 'Tu', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  axisWidth: 306,
  axisHeight: 20,
  nameGap: 0,
  nameWidth: 0,
  dataTextStyle: {
    fontFamily: 'MILanPro--GB1-4',
    fontSize: 11,
    color: '#B2B2B2',
    textAlign: 'center'
  },
  axisStyle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 20 // backgroundColor: 'gray',

  }
};
const defaultYAxisProps = {
  data: [50, 100, 150, 200],
  splitNum: 2,
  axisWidth: 30,
  axisHeight: 314,
  // window.height - 180 - 66,//
  nameGap: 0,
  nameWidth: 0,
  dataTextStyle: {
    left: 18
  },
  axisStyle: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    // marginBottom: 100,
    // top: 200,
    // top: 0,
    width: 30 // backgroundColor: 'blue',

  },
  // axisLineShow: true,
  axisLineShow: false
};

const StatisticsBarChart = props => {
  const {
    style,
    chartData = [],
    selectedIndex = 3,
    onPress
  } = props;
  const context = useContext(ConfigContext);
  const {
    colorScheme
  } = context;

  const onChangeSelectedIndex = (index, value) => {
    onPress && onPress(index, value);
  };

  const xAxisData = chartData.map(({
    formatTime
  }) => formatTime);
  const seriesData = chartData.map(({
    value
  }) => value);
  const seriesProps = {
    data: seriesData,
    itemStyle: {
      backgroundColor: barChartRawItemColor.color(colorScheme),
      width: 29 // adjustSize(87),

    }
  };
  const heighLightProps = {
    barStyle: {
      backgroundColor: barChartCheckedItemColor.color(colorScheme)
    },
    xAxisDataStyle: {
      color: barChartCheckedItemColor.color(colorScheme)
    }
  };
  return <BarChart style={style} series={seriesProps} xAxisProps={{ ...defaultXAxisProps,
    data: xAxisData
  }} yAxisProps={defaultYAxisProps} heighLight={heighLightProps} selectedIndex={selectedIndex} onPress={onChangeSelectedIndex} />;
};

export default React.memo(StatisticsBarChart);