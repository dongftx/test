/* eslint-disable  */
// @ts-nocheck

/* eslint-disable react/no-array-index-key */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useCallback, useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Line from "./Line";
import DynamicColor from "../../styles/DynamicColor";
import { ConfigContext } from "../configProvider";

const YAxis = props => {
  const {
    axisHeight = 200,
    nameGap = 0,
    nameWidth = 20,
    axisLineShow = true,
    axisLineStyle = {
      width: 2 * StyleSheet.hairlineWidth,
      height: 100,
      backgroundColor: 'black'
    },
    // axisLabelStyle = {},
    // axisTickStyle = {},
    name = '',
    splitNum = 2,
    // scaleGap = 100,
    nameTextStyle,
    // labels = ['Mon', 'Tu', 'Wed', 'Fri', 'Sat'],
    // scale,
    data = [50, 100, 150, 200],
    dataTextStyle,
    axisStyle,
    // = {},
    splitLineShow = true,
    splitLineStyle = {
      width: 200
    }
  } = props;
  /** 计算每个label（或刻度）所占的宽度 */

  const autoScaleGap = Math.floor(axisHeight / data.length); // const axisLineWidth = axisLineStyle ? axisLineStyle.width || 0 : 0;
  // const splitLineWidth = splitLineStyle ?  new splitLineStyle.width || 0 : 0;

  const context = useContext(ConfigContext);
  /** 分割线颜色 */

  const splitLineColor = new DynamicColor("rgba(0,0,0,0.20)", "rgba(255,255,255,0.30)");
  /** y轴数据标签颜色 */

  const yAxisDataTextColor = new DynamicColor('#B2B2B2', 'rgba(255,255,255,0.30)');
  /**
   * 绘制坐标轴线
   *
   */

  const memoizedCreateAxisLine = useCallback(() => {
    // 先判断是否需要显示轴线
    if (!axisLineShow) {
      return null;
    }

    const style = [styles.axisLine, axisLineStyle, {
      height: axisHeight
    }];
    const line = <View style={style} />;
    return line;
  }, [axisHeight, axisLineShow, axisLineStyle]);
  /**
   * 绘制坐标轴在 grid 区域中的分隔线
   *
   */

  const memoizeCreateSplitLine = useCallback(() => {
    if (!splitLineShow) {
      return null;
    }

    const itemGap = 5; // 虚线段间隔

    const itemSize = 10; // 虚线段长度

    const itemHeight = 0.5; // 虚线段高度

    const splitLines = Array.from({
      length: splitNum
    }).map((_, idx) => <Line key={idx} style={[styles.splitLine, splitLineStyle, {
      // backgroundColor: 'red',
      position: 'absolute',
      left: 0,
      //axisLineShow ? 0 : axisLineStyle?.width || 0, // 距离左侧轴线宽度
      bottom: autoScaleGap * (idx + 1) // StyleSheet.hairlineWidth,

    }]} type="dashed" // "dashed"
    direction="row" width={splitLineStyle?.width || 0} // width={splitLineWidth}
    backgroundColor={splitLineColor.color(context.colorScheme)} itemGap={itemGap} itemSize={itemSize} height={StyleSheet.hairlineWidth} //{itemHeight}
    />);
    return <View style={styles.splitLineContainer}>
      {splitLines}
       </View>;
  }, [splitNum, autoScaleGap, axisLineShow, splitLineStyle]);
  /**
   * 绘制坐标轴数据
   */

  const memoizedCreateAxisData = useCallback(() => {
    // console.log('*******label******', data);
    const containerStyle = [styles.axisDataContainer, // { left: 18},
    {
      height: axisHeight
    }];
    const dataStyle = [styles.axisData, {
      color: yAxisDataTextColor.color(context.colorScheme)
    }, dataTextStyle, {
      height: autoScaleGap
    }]; // const reversedData = data.reverse();
    // const reversedData = Array.from({ length: splitNum }).map((_, idx: number) => scale * (idx + 1)).reverse(); // Array(splitNum).fill(0).map((_, idx) => (idx + 1) * scaleGap).reverse();

    const labels = data.map((label, idx) => <Text key={idx} style={dataStyle}>
        {label}
      </Text>);
    return <View style={containerStyle}>{labels}</View>;
  }, [splitNum, autoScaleGap, dataTextStyle, data]);
  return <View style={[styles.container, axisStyle, {
    height: nameGap + axisHeight // flex: 1,
    // backgroundColor: 'red',
    // backgroundColor: 'black',
    // marginLeft: ,

  }]}>
      <View style={[styles.axisContent, // { backgroundColor: 'red'},
    {
      height: axisHeight
    }]}>
        {// 垂直时，需要互换data和line位置
      }
        {memoizedCreateAxisData()}
        {memoizedCreateAxisLine()}
        {
        /* {memoizedCreateAxisTick()} */
      }
        {memoizeCreateSplitLine()}
      </View>
      <View style={[styles.name, {
      height: nameWidth,
      marginBottom: nameGap
    }]}>
        <Text style={nameTextStyle}>{name}</Text>
      </View>
    </View>;
};
/**
 * @export
 * @author Xu Liang
 * @since 10042
 * @module BarChart
 * @description y轴属性
 * @param {number} axisWidth - 坐标轴宽度
 * @param {number} axisHeight - 坐标轴高度
 * @param {Array<Array<number | string>} data - 坐标轴数据
 * @param {TextStyle} dataTextStyle - 坐标轴数据的文字样式
 * @param {string} name - 坐标轴名称
 * @param {ViewStyle} nameTextStyle - 坐标轴名称的文字样式
 * @param {number} nameWidth - 坐标轴名称的宽度
 * @param {number} nameGap - 坐标轴名称与轴线之间的距离。默认值0。
 * @param {boolean} axisLineShow - 是否显示轴线。默认显示。
 * @param {ViewStyle} axisLineStyle - 坐标轴线样式
 * @param {StyleProp<ViewStyle>} axisStyle - 坐标轴样式
 * @param {number} scale - 坐标轴刻度大小，对于y轴即为坐标轴数据
 * @param {number} splitNum - 坐标轴的分割段数
 * @param {boolean} splitLineShow - 是否显示坐标轴在 grid 区域中的分隔线。默认显示。
 * @param {ViewStyle} splitLineStyle 坐标轴在 grid 区域中的分隔线的样式
 * @example
 * data: [50, 100, 150, 200],
   splitNum: 2,
   axisWidth: 30,
   axisHeight: 300,
   nameGap: 0,
   nameWidth: 0,
   axisStyle: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: 30,
   },
   axisLineShow: false,
 */


const MemoYAxis = React.memo(YAxis);
export default MemoYAxis;
const styles = StyleSheet.create({
  container: {// flex: 1,
    // width: 20,
    // flexDirection: 'column',
    // flexDirection: 'column',
    // justifyContent: 'center',
  },
  axisContent: {
    // flex: 1,
    height: 200,
    flexDirection: 'row',
    // justifyContent: 'center',
    justifyContent: 'flex-end'
  },
  axisLine: {
    width: 2 * StyleSheet.hairlineWidth,
    // StyleSheet.hairlineWidth,
    height: 100,
    backgroundColor: 'black' // '#33000000',

  },
  axisDataContainer: {
    // padding: 0,
    // backgroundColor: 'gray',
    flexDirection: 'column-reverse',
    justifyContent: 'space-around'
  },
  axisData: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'MILanPro--GB1-4',
    color: '#B2B2B2' // marginLeft: 20,

  },
  axisTickContainer: {// backgroundColor: 'black',
  },
  axisTick: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: 200
  },
  splitLine: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: 200
  },
  splitLineContainer: {// backgroundColor: 'black',
  },
  name: {
    height: 12 // backgroundColor: 'red',

  }
});