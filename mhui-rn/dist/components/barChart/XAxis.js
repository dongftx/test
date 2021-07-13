/* eslint-disable react/no-array-index-key */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useCallback, useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native'; // import { Background } from '@modules/';

import Line from "./Line";
import DynamicColor from "../../styles/DynamicColor";
import { ConfigContext } from "../configProvider";

const XAxis = props => {
  const {
    axisWidth = 200,
    // axisHeight = 20,
    // width = 200,
    nameGap = 0,
    nameWidth = 20,
    axisStyle = {},
    axisLineShow = true,
    axisLineStyle = {},
    axisLabelStyle = {},
    // axisTickStyle = {},
    name = '',
    nameTextStyle,
    data = ['Mon', 'Tu', 'Wed', 'Fri', 'Sat'],
    dataTextStyle,
    selectedIndex = 0,
    heighLightStyle
  } = props; // console.log('xAxis Change');

  /** 计算每个label（或刻度）所占的宽度 */

  const scaleGap = Math.floor(axisWidth / data.length);
  const context = useContext(ConfigContext);
  const axisLineColor = new DynamicColor('rgba(0,0,0,0.20)', 'rgba(255,255,255,0.30)');
  /**
   * 绘制坐标轴线
   *
   */
  // @refresh reset

  const memoizedCreateAxisLine = useCallback(() => {
    // 先判断是否需要显示轴线
    if (!axisLineShow) {
      return null;
    }

    const style = [styles.axisLine, axisLineStyle, {
      width: axisWidth
    }]; // const line2 = <View style={[style, { backgroundColor: 'red' }]} />;

    const line = <Line style={style} type="dashed" // "dashed"
    direction="row" width={axisWidth} // backgroundColor="rgba(255,255,255,0.30)"
    backgroundColor={axisLineColor.color(context.colorScheme)} itemGap={5} itemSize={10} // height={0.5}
    height={StyleSheet.hairlineWidth} />;
    return line;
  }, [axisWidth, axisLineShow, axisLineStyle]);
  /**
   * 绘制坐标轴刻度标签
   */

  const memoizedCreateAxisData = useCallback(() => {
    const containerStyle = [styles.axisLabelContainer, {
      width: axisWidth
    }];
    const labels = data.map((label, idx) => {
      // 如果当前标签设置了高亮，则添加高亮的样式
      const labelStyle = idx === selectedIndex ? [styles.axisLabel, // axisLabelStyle,
      dataTextStyle, heighLightStyle] : [styles.axisLabel, dataTextStyle];
      return <Text key={idx} style={[labelStyle, {
        width: scaleGap
      } // 始终保持标签宽度为刻度宽度
      // { backgroundColor: idx % 2 === 0 ? 'blue' : 'green' },
      ]}>
          {label}
        </Text>;
    });
    return <View style={containerStyle}>{labels}</View>;
  }, [axisWidth, scaleGap, axisLabelStyle, selectedIndex, heighLightStyle]);
  return <View style={[styles.container, axisStyle, {
    width: nameGap + axisWidth
  }]}>
      <View style={[styles.axisContent, {
      width: axisWidth
    }]}>
        {memoizedCreateAxisLine()}
        {memoizedCreateAxisData()}
      </View>
      <View style={[styles.name, {
      width: nameWidth,
      marginLeft: nameGap
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
 * @description x轴属性
 * @param {number} axisWidth - 坐标轴宽度
 * @param {number} axisHeight - 坐标轴高度
 * @param {Array<number | string>} data - 坐标轴数据
 * @param {TextStyle} dataTextStyle - 坐标轴数据的文字样式
 * @param {string} name - 坐标轴名称
 * @param {ViewStyle} nameTextStyle - 坐标轴名称的文字样式
 * @param {number} nameWidth - 坐标轴名称的宽度
 * @param {number} nameGap - 坐标轴名称与轴线之间的距离。默认值0。
 * @param {boolean} axisLineShow - 是否显示轴线。默认显示。
 * @param {ViewStyle} axisLineStyle - 坐标轴线样式
 * @param {StyleProp<ViewStyle>} axisStyle - 坐标轴样式
 * @param {Map<number, StyleProp<ViewStyle>>} dataHeighLightMap - 坐标轴数据高亮映射
 *
 * @example
 * data: ['Mon', 'Tu', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
   axisWidth: 300,
   axisHeight: 20,
   nameGap: 0,
   nameWidth: 0,
   axisStyle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 20,
  },
 */


const MemoXAxis = React.memo(XAxis);
export default MemoXAxis;
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // width: 200,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  axisContent: {
    // flex: 1,
    width: 200,
    flexDirection: 'column',
    justifyContent: 'flex-start' // 'center', //

  },
  axisLine: {
    height: 2 * StyleSheet.hairlineWidth,
    // StyleSheet.hairlineWidth,
    width: 100 // backgroundColor: 'red', // '#33000000',

  },
  axisLabelContainer: {
    // backgroundColor: 'gray',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  axisLabel: {
    // fontSize: 12,
    // textAlign: 'center',
    fontFamily: 'MILanPro--GB1-4',
    fontSize: 10,
    color: '#B2B2B2',
    textAlign: 'center'
  },
  axisTick: {},
  name: {
    width: 12 // backgroundColor: 'red',

  },
  nameTextStyle: {},
  axisData: {}
});