## 米家电暖器-摆角范围调节器-CircularSlider

### 背景
我们以前是设置好一个固定的数值列表，然后用户通过点击来选择摆角范围。这种方式限定了摆角范围，显然是不够灵活的。我们希望可以任意选择和调整摆角范围，要是配上新奇的交互方式，那就更棒棒了。
### 预览

![](/docImages/circularslider_preview_240_h.jpeg)

![](/docImages/circularslider_preview_240_v.jpeg)

![](/docImages/circularslider_preview_360_v.jpeg)

### 基本信息

| 基本信息  |                                         |
| --------- | --------------------------------------- |
| 中文名称  | 米家插件摆角范围调节器                  |
| 描述      | 符合米家插件设计规范的摆角范围调节器，摆角可上下方向也可以左右方向 |
|功能|1.可以自定义环内内容；2.支持数值滑动和按档滑动；3.自定义刻度列表（或数值列表）；4.丰富的自定义样式   |
| 位置      | `miot/ui/circularSlider/CircularSlider` |
| SDK_Level | `10042`                                      |
| 注意事项  | \                                       |
| 存在问题  | 数值可能不是很精准 |

### 使用方法
```jsx
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Alert,
} from 'react-native';

import CircularSlider from './CircularSlider';

export default class RangeAdjuster extends Component {
  static propTypes = {
    horizontalDirection: PropTypes.bool,
    verticalDirection: PropTypes.bool,
    minValue: PropTypes.number,
    maxValue: PropTypes.number,
    initValue: PropTypes.number,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    horizontalDirection: true,
    verticalDirection: false,
    minValue: 0,
    maxValue: 360,
    initValue: 60,
  }

  state = {
    // direction: this.props.horizontalDirection ? this.props.horizontalDirection : this.props.verticalDirection,
    value: 60,
    visible: true,
    valueList: [0, 30, 60, 120, 180, 240, 300, 360],
  }

  createTitle = () => {
    const {
      horizontalDirection,
      verticalDirection,
    } = this.props;
    const isHorizontal = verticalDirection ? horizontalDirection : true;
    const name = isHorizontal ? '左右' : '上下';
    return `${name}摆角范围调节`;
  }

  createSubTitle = () => {
    const { value } = this.state;
    return ` ${value}°`;
  }

  onValueChange = ({ value }) => {
    this.setState({ value });
    // this.setState({ value: currentLeftValue + currentRightValue });
    // this.setState({ value:  (currentLeftValue + currentRightValue) +  Math.round(Math.abs(Math.random())) % 2});
    // this.props.onChange && this.props.onChange();
  }

  onSubmit = () => {
    const { value, visible } = this.state;
    console.log(value);
    this.setState({
      visible: !visible,
    });
  }

  onCancel = () => {
    this.setState({
      visible: !this.state.visible,
    });
    Alert.alert('取消');
  }


  render() {
    const { value, visible } = this.state;
    const {
      horizontalDirection,
      verticalDirection,
      minValue,
      // maxValue,
      initValue,

    } = this.props;
    const { valueList } = this.state;
    // const maxValue = Math.max(...valueList);
    const maxValue = 180;
    return (
      <View style={styles.container}>
        <CircularSlider
          useMoveValueList
          valueList={valueList}
          // synSliding={false}
          step={10}
          initLeftValue={initValue}
          initRightValue={initValue}
          minLeftValue={minValue}
          minRightValue={minValue}
          maxLeftValue={maxValue}
          maxRightValue={maxValue}
          horizontalDirection
          // verticalDirection
          // onChange={this.onValueChange}
          // onComplete={this.onValueChange}
          onChange={this.onValueChange}
          contentContainerStyle={styles.contentContainerStyle}
          strokeWidth={40}
            // buttonBorderColor="#fff"
            // buttonFillColor="#fff"
          buttonStrokeWidth={10}
            // openingRadian={0}
          buttonRadius={10}
        >
          <Text style={styles.topValue}>{value}</Text>

        </CircularSlider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  contentContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialogStyle: {

  },
  titleStyle: {
    fontSize: 16,
    color: '#000000',
  },
  subTitleStyle: {
    fontSize: 40,
    color: '#000000',
  },
  topValue: {
    fontWeight: '500',
    fontSize: 32,
    color: '#3FE3EB',
  },
});

```
### 参数
| Param         | Type                                            | Description                                                  |
| ------------- | ----------------------------------------------- | ------------------------------------------------------------ |
|align|<code>`'center'|'origin'`|关于原点对齐还是关于视觉中心对齐。默认关于原点对齐|
|useMoveValueList| <code>boolean</code>|是否开启按档滑动。开启后，滑动数值始终在数值列表中，默认不开启|
|valueList|<code>Array</code> | 数值列表，也是刻度列表。当开启useMoveValueList时，滑动值始终为列表中的数值。强烈建议数值全是偶数，并为10的倍数。|
|synSliding | <code>boolean</code>| 是否开启同步滑动，默认开启，开启后onChange函数回调传入的仅有value参数，如果不开启，则返回leftValue和rightValue两个参数 |
| step | <code>number</code> | 步长，默认1，建议step数值设置在5以内，稍微大一点可以改用useMoveValueList|
| radius        | <code>number</code>                             | 圆环的半径，默认100 |
| strokeWidth   | <code>number</code>                  | 圆环的宽度，默认20 |
| backgroundPaddingTrackColor         | <code>string</code>       | 填充部分的背景颜色，默认为'#e8e8e8' |
| backgroundRangeTrackColor         | <code>string</code>         | 圆环部分的背景颜色，默认为'#FFA626'                                  |
| buttonRadius     | <code>number</code>                          | 按钮半径，默认为12                                            |
| buttonFillColor     | <code>string</code>                     | 按钮填充颜色，默认米家颜色 |
| buttonBorderColor     | <code>string</code>                     | 按钮边框颜色，默认米家颜色 |
| buttonStrokeWidth  | <code>number</code>                        | 按钮线宽                                |
| initLeftValue    | <code>number</code>                          | 最开始的当前左侧（或上侧）刻度值            |
| initRightValue    | <code>number</code>                         | 最开始的当前右侧（或下侧）刻度值            |
| minLeftValue    | <code>number</code>                         | 最小的左侧（或上侧）刻度值            |
| minRightValue    | <code>number</code>                         | 最小的右侧（或下侧）刻度值            |
| maxLeftValue    | <code>number</code>                         | 最大的左侧（或上侧）刻度值            |
| maxRightValue    | <code>number</code>                         | 最大的右侧（或下侧）刻度值            |
| horizontalDirection | <code>bool</code>                        |  组件处于水平方向，默认为false |
| verticalDirection | <code>bool</code>                        |  组件处于垂直方向，需要注意的是如果同时开启（或同时关闭）horizontal和vertical，也会处于水平状态  |
|children| <code>Component</code>|子组件|
|style |<code>style</code>|组件样式，需要注意的是组件的中心始终是整个圆环的中心，如果你要改变位置，你可能需要计算样式的偏移量|
|contentContainerStyle| <code>style</code>|children样式|
| dialNumStyle      |  <code>style</code> |刻度盘数值样式，此样式需要参考SVG Text样式。默认为{ fill: '#CCCCCC', textAnchor: "middle"}|
| onChange     | <code>function</code>                           | 滑块移动时的回调函数，({currentLeftValue, currentRightValue}) => { 这里填写要做的事}。需要注意的是在开启useMoveValueList的情况下， onChange在滑动完成时也会触发。为了使得移动值始终在数组列表，我们在滑动完成后又对滑动进行位移 |
| onComplete    | <code>function</code>                           | 滑块移动完成后的回调函数，({currentLeftValue, currentRightValue}) => { 这里填写要做的事} |
