/* eslint-disable  */
// @ts-nocheck

/* eslint-disable @typescript-eslint/explicit-function-return-type */

/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import BarItem from "./BarItemHooks";
import XAxis from "./XAxis";
import YAxis from "./YAxis";
import { ConfigContext } from "../configProvider";
import { adjustSize } from "../../utils/sizes";

/**
 * @export
 * @author Xu Liang
 * @since 10042
 * @module BarChart
 * @description 柱状图属性
 * @param {ViewStyle} style - 柱状图总体样式
 * @param {XAxisProps} XAxisProps - x轴属性 { data: ['Mon', 'Tu', 'Wed'],axisWidth: 300, axisHeight: 20, nameGap: 0 }
 * @param {YAxisProps} YAxisProps - y轴属性 { data: [50, 100, 200], splitNum: 2, axisWidth: 30, axisHeight: 300, axisLineShow: false }
 * @param {boolean} autoScale - 是否开启自动刻度
 * @param {SeriesPropsType} series - 系列列表
 * @param {function} onPress - 点击事件回调。目前仅在bar被点击时触发。
 * @param {Array<HeighLightPropsType>} heighLight - 高亮属性设置。
 */
export default class BarChart extends PureComponent {
  static contextType = ConfigContext;
  static defaultProps = {
    autoScale: true,
    // axisWidth: 300,
    // axisHeight: 300,
    xAxisProps: {
      data: ['Mon', 'Tu', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisWidth: 300,
      axisHeight: 20,
      nameGap: 0,
      nameWidth: 0,
      axisStyle: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 20 // backgroundColor: 'gray',

      }
    },
    yAxisProps: {
      data: [50, 100, 150, 200],
      splitNum: 2,
      axisWidth: 30,
      axisHeight: 300,
      nameGap: 0,
      nameWidth: 0,
      axisStyle: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        // marginBottom: 100,
        // top: 200,
        // top: 0,
        width: 30
      },
      axisLineShow: false
    },
    series: {
      data: [100, 80, 20, 130, 50, 167, 87] // itemStyle: {
      //   width: 76,
      //   backgroundColor: 'red',
      // },

    }
  };

  constructor(props) {
    super(props); // 做校验

    const {
      yAxisProps: {
        splitNum
      }
    } = this.props;

    if (splitNum < 1) {
      throw new RangeError('splitNum must be greater than 1');
    }

    const {
      axisWidth: xAxisWidth = 200,
      axisHeight: xAxisHeight = 30
    } = props.xAxisProps;
    const {
      axisWidth: yAxisWidth = 30,
      axisHeight: yAxisHeight = 200
    } = props.yAxisProps;
    this.state = {
      isOnLayoutCall: false,
      width: xAxisWidth + yAxisWidth,
      height: xAxisHeight + yAxisHeight,
      selectedIndex: props.selectedIndex || 0
    };
  }

  componentDidUpdate(prevProps) {
    const {
      selectedIndex
    } = this.props;

    if (prevProps.selectedIndex !== selectedIndex && selectedIndex !== undefined) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        selectedIndex
      });
    }
  }
  /**
   * 为y轴创建刻度
   * @description 方案是表格上最大值应该占最上方虚线值的80%；我调整了刻度最大值，使得最大刻度值能被splitNum整除
   * @param {Array} data - 系列中的数据内容数组
   * @param {splitNum} splitNum - 坐标轴的分割段数
   */


  _createYAxisData = (data, splitNum = 2) => {
    // 如果数据为空时，我们设定y轴数据为[5, 10]
    if (data.length < 1) {
      return [5, 10];
    }

    const maxData = data.reduce((cur, prev) => Math.max(Math.abs(prev), Math.abs(cur)));

    if (maxData <= 0) {
      return [5, 10];
    }

    const maxValue = Math.floor(maxData / 0.8);
    const maxScale = maxValue % splitNum + maxValue;
    const increment = maxScale / splitNum; // return increment;

    const scales = [];

    for (let i = increment; i <= maxScale; i += increment) {
      scales.push(i);
    } // for (let i = -maxScale; i <= maxScale; i += increment) {
    //   scales.push(i);
    // }


    return scales;
  };
  /**
   * 为y轴创建样式
   */

  _createYAxisStyle = (yAxisStyle, bottom, yAxisWidth) => [styles.yAxisStyle, yAxisStyle, {
    // 始终保持bar和x轴线最左侧对齐
    marginLeft: -(yAxisWidth || 0),
    // 始终保持bottom距离x轴宽的距离
    bottom // xAxisStyle?.height,

  }];
  /**
   * 为y轴创建分割线样式
   * @param xAxisWidth
   */

  _createYAxisSplitLineStyle = width => ({
    width
  });
  onPress = (idx, value) => {
    const {
      onPress
    } = this.props;
    this.setState({
      selectedIndex: idx
    });
    onPress && onPress(idx, value);
  };
  /**
   * 创建柱形图的所有bar
   * @description （1）每个bar都处于长度为x轴刻度大小的View内，并居于其中间位置；（2）每个bar的实际高度和y轴刻度大小有关
   */

  createBarItems = (ratio, heighLight) => {
    const {
      series: {
        data: barValues,
        labelShow,
        labelStyle,
        underlayColor,
        itemStyle
      },
      xAxisProps: {
        data: xAxisLabels
      }
    } = this.props;
    const {
      width: chartWidth,
      selectedIndex
    } = this.state;
    /** 缩放比例 - 否则，y轴每个刻度所占据大小和bar高度不一致 */
    // const ratio = (yAxisHeight / yAxisSplitNum) / 104;

    /** 计算每个刻度的宽度 */

    const gap = Math.floor(chartWidth / xAxisLabels.length);
    const barItemContentStyle = [styles.barItemContent, {
      width: gap
    }]; // console.log('itemStyle: ', this.props.series, barValues, labelShow, labelStyle, underlayColor, itemStyle);

    /** 创建bar，并用宽度为刻度大小的View包裹之，始终保持bar位于刻度中间 */

    const items = barValues.map((value, idx) => {
      const barItemStyle = idx === selectedIndex ? [styles.barItem, itemStyle, heighLight] : [styles.barItem, itemStyle];
      return <View key={idx} style={barItemContentStyle}>
          <BarItem label={value} labelShow={labelShow} labelStyle={labelStyle} underlayColor={underlayColor} // target={idx}
        onPress={() => this.onPress(idx, value)} height={value * ratio} style={barItemStyle} />
        </View>;
    });
    return items;
  };
  /**
   * 当组件挂载或者布局变化的时候调用
   * 这个事件会在布局计算完成后立即调用一次，不过收到此事件时新的布局可能还没有在屏幕上呈现，尤其是一个布局动画正在进行中的时候
   */

  onLayout = ({
    nativeEvent: {
      layout: {
        width,
        height
      }
    }
  }) => {
    this.setState({
      isOnLayoutCall: true,
      width,
      height
    });
  };

  render() {
    const {
      autoScale = true,
      style,
      xAxisProps,
      yAxisProps,
      series: {
        data
      },
      heighLight: {
        xAxisDataStyle: heighLightXAxisDataStyle,
        barStyle: heighLightBarStyle
      } = {}
    } = this.props; // console.log(heighLight);

    const {
      data: xAxisData,
      axisStyle: xAxisStyle,
      nameGap: xAxisNameGap,
      nameWidth: xAxisNameWidth,
      axisHeight: xAxisHeight,
      dataTextStyle: xAxisDataTextStyle,
      axisLineShow: xAxisLineShow
    } = xAxisProps;
    const {
      // data: yAxisData,
      axisStyle: yAxisStyle,
      nameGap: yAxisNameGap,
      nameWidth: yAxisNameWidth,
      // axisHeight: yAxisHeight,
      axisWidth: yAxisWidth,
      splitNum: yAxisSplitNum,
      // axisLabelStyle: yAxisLabelStyle,
      splitLineShow: yAxisSplitLineShow,
      dataTextStyle: yAxisDataTextStyle,
      axisLineShow: yAxisLineShow
    } = yAxisProps;
    const {
      height: chartHeight,
      width: chartWidth,
      isOnLayoutCall,
      selectedIndex
    } = this.state;
    /**
     * barItemsContainerStyle
     * 1.将bar和x轴线最左侧对齐，这需要考虑x轴名称距轴线的距离和名称宽度
     * 2.将bar最底部和y轴最底部对齐
     * 2.需要给marginBottom设置x轴宽的距离
     */

    const barItemsContainerStyle = [styles.barItemsContainer, {
      marginBottom: xAxisHeight,
      // xAxisStyle?.height, // 30,
      marginRight: xAxisNameGap + xAxisNameWidth
    }]; // 自动计算y轴数据

    const yAxisData = autoScale || yAxisProps.data === undefined ? this._createYAxisData(data, yAxisSplitNum) : yAxisProps.data;
    /** 缩放比例 - 否则，y轴每个刻度所占据大小和bar高度不一致 */

    const ratio = (chartHeight - xAxisHeight) / yAxisSplitNum / yAxisData[0]; // // y轴分割线样式
    // const yAxisSplitLineStyle = { width: xAxisWidth };
    // // y轴样式
    // const newyAxisStyle = this.memoizeYAxisStyle(yAxisStyle, xAxisHeight);

    return <View style={[styles.container, style]} onLayout={this.onLayout}>
        {isOnLayoutCall ? <>
              <YAxis splitNum={yAxisSplitNum} data={yAxisData} axisLineShow={yAxisLineShow} name="" nameGap={yAxisNameGap} nameWidth={yAxisNameWidth} axisWidth={yAxisWidth} //  axisHeight={yAxisHeight}
        axisHeight={chartHeight - xAxisHeight} // axisHeight={yAxisData[-1]}
        // axisLabelStyle={yAxisLabelStyle}
        dataTextStyle={yAxisDataTextStyle} splitLineShow={yAxisSplitLineShow} splitLineStyle={this._createYAxisSplitLineStyle(chartWidth)} // 保持y轴分割线和x轴宽度相等
        axisStyle={this._createYAxisStyle(yAxisStyle, xAxisHeight, yAxisWidth)} />

              <View style={{
          justifyContent: 'flex-end' // 将bar最底部和y轴最底部对齐
          // marginLeft: yAxisWidth, // 将bar和x轴线最左侧对齐
          // backgroundColor: 'green',

        }}>
                <View style={[barItemsContainerStyle, {
            // 始终保证BarItem宽度和x轴线宽度相等
            width: chartWidth // width: xAxisWidth,

          }]}>
                  {this.createBarItems(ratio, heighLightBarStyle)}
                </View>

                <XAxis // axisWidth={xAxisWidth}
          axisWidth={chartWidth} axisHeight={xAxisHeight} data={xAxisData} name="" nameGap={xAxisNameGap} nameWidth={xAxisNameWidth} axisLineShow={xAxisLineShow} // axisLabelStyle={xAxisLabelStyle}
          dataTextStyle={xAxisDataTextStyle} axisStyle={[styles.xAxisStyle, xAxisStyle]} // dataHeighLightArray={xAxisDataHeighLightArray}
          heighLightStyle={heighLightXAxisDataStyle} selectedIndex={selectedIndex} />
              </View>
            </> : <View style={{
        flex: 1
      }} />}
      </View>;
  }

}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1
  },
  content: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0
  },
  barItemsContainer: {
    padding: 0,
    width: 200,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  barItemContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200
  },
  barItem: {
    backgroundColor: '#FFE4BD',
    // ，'#FFA626',
    width: adjustSize(87) // x / 1080 * 360 = 29* 3 = 87

  },
  yAxisStyle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 30
  },
  xAxisStyle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 20
  }
});