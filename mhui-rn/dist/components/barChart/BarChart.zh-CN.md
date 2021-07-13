## 米家弹窗-摆角范围调节器-CircularSlider

### 背景
一个未基于react-native-svg的柱形统计图罢了。
### 预览

![](/docImages/barchart_preview.jpeg)


### 基本信息

| 基本信息  |                                  |
| --------- | -------------------------------- |
| 中文名称  | 米家插件柱形统计图               |
| 描述      | 符合米家插件设计规范的柱形统计图 |
| 位置      | `miot/ui/barChart/BarChart`      |
| SDK_Level | `10042`                          |
| 注意事项  | \                                |
| 存在问题  | 接口不太清晰；暂时就这样         |

### 使用方法
```jsx
import React, { Component } from 'react';
import {
  StyleSheet, View,
} from 'react-native';
import BarChart from './BarChart';

export default class Demo extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.defaultXAxisProps = {
      data: ['Mon', 'Tu', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisWidth: 300,
      axisHeight: 20,
      nameGap: 0,
      nameWidth: 0,
      axisStyle: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 20,
        // backgroundColor: 'gray',
      },
    };
    this.defaultYAxisProps = {
      data: [50, 100, 150, 200],
      splitNum: 2,
      axisWidth: 30,
      axisHeight: 315,
      nameGap: 0,
      nameWidth: 0,
      axisStyle: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        // marginBottom: 100,
        // top: 200,
        // top: 0,
        width: 30,
      },
      axisLineShow: false,
    };

    this.defaultSeries = {
      data: [100, 80, 20, 130, 50, 167, 87],
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <BarChart
            series={this.defaultSeries}
            xAxisProps={this.defaultXAxisProps}
            yAxisProps={this.defaultYAxisProps}
            heighLight={this.state.heighLight}
            heighLight={{
              barStyle: { backgroundColor: '#FFA626' },
              xAxisDataStyle: { color: '#FFA626' },
            }}
          />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  }
});


```
### 参数
####  BarChart参数
| Param      | Type                                    | Description                                                                                                   |
| ---------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| style      | <code>ViewStyle</code>                  | 柱状图总体样式                                                                                                |
| XAxisProps | <code>XAxisPropsType</code>             | x轴属性。如{ data: ['Mon', 'Tu', 'Wed'],axisWidth: 300, axisHeight: 20, nameGap: 0 }                          |
| YAxisProps | <code>YAxisProps</code>                 | x轴属性。如y轴属性 { data: [50, 100, 200], splitNum: 2, axisWidth: 30, axisHeight: 300, axisLineShow: false } |
| series     | <code>SeriesPropsType</code>            | 系列列表                                                                                                      |
| onPress    | <code>function</code>                   | 点击事件回调。目前仅在bar被点击时触发。                                                                       |
| heighLight | <code><HeighLightPropsType></code> | 高亮属性设置。                                                                                                |

#### XAxisPropsType类型参数
| Param               | Type                                             | Description                           |
| ------------------- | ------------------------------------------------ | ------------------------------------- |
| axisWidth           | <code>number</code>                              | 坐标轴宽度，自适应了，所以目前没啥用  |
| axisHeight          | <code>number</code>                              | 坐标轴高度                            |
| data                | <code>Array<number                               | string></code>                        | 坐标轴数据 |
| dataTextStyle       | <code>TextStyle</code>                           | 坐标轴数据的文字样式                  |
| name                | <code>string</code>                              | 坐标轴名称                            |
| nameTextStyle       | <code>ViewStyle</code>                           | 坐标轴名称的文字样式                  |
| nameWidth           | <code>number</code>                              | 坐标轴名称的宽度                      |
| nameGap             | <code>number</code>                              | 坐标轴名称与轴线之间的距离。默认值0。 |
| axisLineShow        | <code>boolean</code>                             | 是否显示轴线。默认显示。              |
| axisLineStyle       | <code>ViewStyle</code>                           | 坐标轴线样式                          |
| axisStyle           | <code>StyleProp<ViewStyle></code>                | 坐标轴线样式                          |


#### YAxisPropsType类型参数
| Param          | Type                              | Description                                                                 |
| -------------- | --------------------------------- | --------------------------------------------------------------------------- |
| axisWidth      | <code>number</code>               | 坐标轴宽度                                                                  |
| axisHeight     | <code>number</code>               | 坐标轴高度，自适应了，所以目前没啥用                                        |
| data           | <code>Array<number                | string></code>                                                              | 坐标轴数据 |
| dataTextStyle  | <code>TextStyle</code>            | 坐标轴数据的文字样式                                                        |
| name           | <code>string</code>               | 坐标轴名称                                                                  |
| nameTextStyle  | <code>ViewStyle</code>            | 坐标轴名称的文字样式                                                        |
| nameWidth      | <code>number</code>               | 坐标轴名称的宽度                                                            |
| nameGap        | <code>number</code>               | 坐标轴名称与轴线之间的距离。默认值0。                                       |
| axisLineShow   | <code>boolean</code>              | 是否显示轴线。默认显示。                                                    |
| axisLineStyle  | <code>ViewStyle</code>            | 坐标轴线样式                                                                |
| axisStyle      | <code>StyleProp<ViewStyle></code> | 坐标轴线样式                                                                |
| scale          | <code>number</code>               | 坐标轴刻度大小，对于y轴即为坐标轴数据，但事实上并不会以此为事实上的刻度大小 |
| splitNum       | <code>number</code>               | 坐标轴的分割段数                                                            |
| splitLineShow  | <code>boolean</code>              | 是否显示坐标轴在grid 区域中的分隔线。默认显示。                             |
| splitLineStyle | <code>ViewStyle</code>            | 坐标轴在 grid 区域中的分隔线的样式                                          |

#### SeriesPropsType参数
| Param         | Type                               | Description                          |
| ------------- | ---------------------------------- | ------------------------------------ |
| data          | <code>Array<number></code>         | 系列数据                             |
| labelShow     | <code>boolean</code>               | 是否显示系列列表的标签               |
| labelStyle    | <code>StyleProp<ViewStyle> </code> | 系列列表的标签样式                   |
| underlayColor | <code>string</code>                | 系列列表被触摸时显示出来的底层的颜色 |
| itemStyle     | <code>ViewStyle</code>             | 系列的图形样式                       |
#### HeighLightPropsType参数
| Param          | Type                               | Description                |
| -------------- | ---------------------------------- | -------------------------- |     
| xAxisDataStyle | <code>boolean</code>               | 第idx处的x轴数据的高亮样式 |
| barStyle       | <code>StyleProp<ViewStyle> </code> | 第idx处的bar的高亮样式     |

