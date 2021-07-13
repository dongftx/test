/* eslint-disable  */
// @ts-nocheck
import React, { PureComponent } from 'react';
import Svg, { Text as SVGText // Circle,
} from 'react-native-svg';
import { StyleSheet, View, PanResponder // Text,
} from 'react-native';
import { ConfigContext } from "../configProvider";
import CircularPathSVG from "./CircularPathSVG";
import { getCartesianByAngle // polarToCartesian,
// getRadianByAngle,
, cartesianToPolar, getArcByValue, getValueByArc } from "./coordUtils";

/**
 * @export
 * @author Xu Liang
 * @since 10043
 * @module CircularSlider
 * @description 摆角范围调节器（滑动圆环），可以自定义环内内容。目前，开启数值列表时，必须同步滑动
 * @param {boolean} useMoveValueList -是否让滑动数值始终在数值列表中
 * @param {Array<number>} valueList - 数值列表，也是刻度列表。当开启useMoveValueList时，滑动值始终为列表中的数值。强烈建议数值全是偶数，并为10的倍数。
 * @param {boolean} synSliding - 是否开启同步滑动，默认开启，开启后onChange函数回调传入的仅有value参数，如果不开启，则返回leftValue和rightValue两个参数
 * @param {number} radius - 圆环的半径，默认100
 * @param {number} step - 步长，默认1，建议step数值设置在5以内，稍微大一点可以改用useMoveValueList
 * @param {number} radius - 圆环的半径，默认100
 * @param {number} strokeWidth - 圆环的宽度，默认20
 * @param {string} backgroundPaddingTrackColor - 填充部分的背景颜色，默认为'#e8e8e8'
 * @param {string} backgroundRangeTrackColor - 圆环部分的背景颜色，默认为'#FFA626'
 * @param {number} buttonRadius - 按钮半径，默认为12
 * @param {string} buttonFillColor - 按钮填充颜色，默认为米家颜色
 * @param {string} buttonBorderColor - 按钮边框颜色，默认为米家颜色
 * @param {string} buttonStrokeWidth - 按钮线宽
 * @param {number} initLeftValue - 最开始的当前左侧（或上侧）刻度值
 * @param {number} initRightValue - 最开始的当前右侧（或下侧）刻度值
 * @param {number} minLeftValue - 最小的左侧（或上侧）刻度值
 * @param {number} minRightValue - 最小的右侧（或下侧）刻度值
 * @param {number} maxLeftValue - 最大的左侧（或上侧）刻度值
 * @param {number} maxRightValue - 最大的右侧（或下侧）刻度值
 * @param {bool} horizontalDirection - 组件处于水平方向，默认为false
 * @param {bool} verticalDirection - 组件处于垂直方向，需要注意的是如果同时开启（或同时关闭）horizontal和vertical，也会处于水平状态
 * @param {Component} children 子组件
 * @param {object} style 组件样式
 * @param {object} contentContainerStyle children样式
 * @param {Object} dialNumStyle - 刻度盘数值样式，此样式需要参考SVG Text样式。默认为{ fill: '#CCCCCC', textAnchor: "middle"}
 * @param {boolean} disabled - 默认false，如果开启后，将会忽略onChange和onComplete
 * @param {func} onChange - 滑块移动时的回调函数，({currentLeftValue, currentRightValue}) => { 这里填写要做的事}
 * @param {func} onComplete - 滑动移动完成的回调函数，({currentLeftValue, currentRightValue}) => { 这里填写要做的事}
 */
export default class CircularSlider extends PureComponent {
  static contextType = ConfigContext;
  static defaultProps = {
    align: 'origin',
    useMoveValueList: false,
    valueList: [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360],
    synSliding: true,
    step: 1,
    radius: 100,
    strokeWidth: 20,
    backgroundPaddingTrackColor: '#e8e8e8',
    // '#e8e8e8',
    backgroundRangeTrackColor: '#FFA626',
    linearGradient: [{
      stop: '0%',
      color: '#1890ff'
    }, {
      stop: '100%',
      color: '#f5222d'
    }],
    // 渐变色
    buttonRadius: 12,
    buttonFillColor: '#fff',
    buttonBorderColor: '#fff',
    buttonStrokeWidth: 1,
    initLeftValue: 40,
    initRightValue: 40,
    minLeftValue: 0,
    minRightValue: 0,
    maxLeftValue: 90,
    maxRightValue: 90,
    horizontalDirection: false,
    verticalDirection: false,
    dialNumStyle: {
      fill: '#CCCCCC',
      textAnchor: 'middle'
    },
    disabled: false,
    onChange: () => {},
    onComplete: () => {}
  };
  /** 组件是否处于水平状态 */

  // 记录触摸过程中左滑块的值

  /** 记录触摸过程中左滑块的有效值 */
  // _panRespondValidLeftValue = 0;

  /**  是否需要开启检查重叠情况 */
  isCheckOverlap = false; // //

  /** 重叠偏差，因为只需要在接近完全重叠时，就可以了 */

  offsetOverlap = 2;
  /** 左滑块触摸响应配置 */

  /** 左滑块在当前位置的笛卡尔坐标 */
  currentLeftCartesian = {
    x: 0,
    y: 0
  };
  /** 右滑块在当前位置的笛卡尔坐标 */

  currentRightCartesian = {
    x: 0,
    y: 0
  };

  constructor(props) {
    super(props);
    const {
      initLeftValue,
      initRightValue,
      minLeftValue,
      minRightValue,
      maxLeftValue,
      maxRightValue,
      strokeWidth,
      buttonRadius,
      buttonStrokeWidth
    } = props;

    if (initLeftValue > maxLeftValue || initLeftValue < minLeftValue || initRightValue > maxRightValue || initRightValue < minRightValue) {
      throw new RangeError('The initial value must not exceed the maximum value or be less than the minimum value');
    } // 如果开启，但是左右两侧初始值和最值不同，则会报错
    // 或者接下来搞默认相同 ？


    if (props.synSliding && (props.initLeftValue !== props.initRightValue || props.maxLeftValue !== props.maxRightValue)) {
      throw new RangeError('开启同步滑动时，左右两侧初始值（或最大值）必须相等');
    } // if (props.synSliding
    //   && (props.initLeftValue % 2 !== 0 || props.maxLeftValue % 2 !== 0)) {
    //   throw new Error('开启同步滑动时，左右两侧初始值（或最大值）必须是偶数');
    // }
    // 检查valueList


    if (props.useMoveValueList) {
      if (!props.synSliding) {
        throw new Error('目前，开启数值列表时，必须同步滑动');
      }

      if (props.valueList === undefined || props.valueList?.length < 1) {
        throw new Error('valueList必须是数值类型的数组且不能为空数组；如果你想使用默认的valueList，请不要设置这个属性');
      }
    }

    this._leftPanResponder = this.createPanResponder('leftPoint');
    this._rightPanResponder = this.createPanResponder('rightPoint');
    this.state = {
      currentRightValue: this._parseLogical(props.initLeftValue),
      currentLeftValue: this._parseLogical(props.initRightValue)
    }; // 组件是否处于水平状态

    this.isComponentHorizontal = props.verticalDirection ? props.horizontalDirection : true; // 除半径外额外的大小，返回线宽和按钮直径中较大的

    this._extraSize = Math.max(strokeWidth, (buttonRadius + buttonStrokeWidth) * 2);
    const {
      currentLeftAngle: maxLeftAngle,
      currentRightAngle: maxRightAngle
    } = getArcByValue({
      currentLeftValue: this._parseLogical(props.maxLeftValue),
      currentRightValue: this._parseLogical(props.maxRightValue)
    }, this.isComponentHorizontal);
    this.maxLeftAngle = maxLeftAngle;
    this.maxRightAngle = maxRightAngle;
    const offset = this._extraSize / 2;
    this.maxLeftPoint = getCartesianByAngle(maxLeftAngle, props.radius, offset);
    this.maxRightPoint = getCartesianByAngle(maxRightAngle, props.radius, offset); // 记录触摸前左滑块的值

    this._panRespondBeforeLeftValue = this._parseLogical(props.initLeftValue); // props.initLeftValue;
    // 记录触摸过程中左滑块的值

    this._panRespondMovingLeftValue = this._parseLogical(props.initLeftValue); // props.initLeftValue;
  }
  /**
   * 将输入值转为实际值
   * @description 设计的左边半圆数为360，但实际上半圆的度数只有180
   * @param value 输入值
   */


  _parseLogical = value => value / 2;
  /**
   * 将实际值转为输出值（与输入值对应）
   */

  _parseValue = (value, minValue = 0, maxValue = 360) => Math.max(minValue, Math.min(Math.round(2 * value), maxValue));
  /**
   * 寻找与目标值距离最近的值
   * @param target 目标值
   * @param valueList 数值列表
   */

  findPointByMinValue = (target, valueList) => {
    let minDistance = Number.MAX_SAFE_INTEGER;
    let result = target;
    valueList.forEach(value => {
      const logicalValue = this._parseLogical(value);

      const distance = Math.abs(target - logicalValue);

      if (minDistance > distance) {
        result = logicalValue;
        minDistance = distance;
      }
    }); // console.log(result);

    return result;
  };
  /**
   * 配置PanResponder
   * @param {string} elementKey 可触摸组件的key
   */

  createPanResponder = elementKey => {
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: (event, gestureState) => this._handlePanResponderMove(elementKey, gestureState),
      onPanResponderRelease: this._handlePanResponderEnd,
      // this._handlePanResponderRelease,
      onPanResponderTerminationRequest: () => false,
      onPanResponderTerminate: this._handlePanResponderEnd // this._onPanResponderTerminate,

    });
    return panResponder;
  };
  /**
   * 记录开始滑动开始时的滑块值、弧度和坐标，用户后续值的计算
   */

  _handlePanResponderGrant = () => {
    const {
      currentLeftValue,
      currentRightValue
    } = this.state;
    const {
      currentLeftAngle,
      currentRightAngle
    } = getArcByValue({
      currentLeftValue,
      currentRightValue
    }, this.isComponentHorizontal);
    const {
      radius
    } = this.props;
    const offset = this._extraSize / 2;
    this.currentLeftCartesian = getCartesianByAngle(currentLeftAngle, radius, offset);
    this.currentRightCartesian = getCartesianByAngle(currentRightAngle, radius, offset); // 是否需要开启检查重叠情况

    this.isCheckOverlap = currentLeftValue + currentRightValue <= this.offsetOverlap || 360 - (currentLeftValue + currentRightValue) <= this.offsetOverlap; // 记录上次有效位置
    // this._panRespondValidLeftValue = currentLeftValue;
  };
  /**
   * 滑块移动时的处理函数
   * @description 在左右两侧滑块位置重合时，你想要移动的是左滑块，但是实际上的触摸点是右滑块（右滑块会覆盖左滑块）。
   * 我们的方案是使用_panRespondBeforeLeftValue记录触摸前左侧滑块的值， 然后结合{dx,dy}（gestureState）来判断是否想要移动左滑块，移动完毕后记录_panRespondBeforeLeftValue值。
   * 需要注意的是：1.这方案基于左右滑块有各自运动的区域，且运动区域不重合
   *              2.使用触摸前滑块的值而不是滑块在移动时的值，因为移动时的值不能判断滑块重合
   * @param elementKey 触摸元素key值
   * @param gestureState 手势状态
   */

  _handlePanResponderMove = (elementKey, gestureState) => {
    const {
      minLeftValue,
      minRightValue,
      maxLeftValue,
      maxRightValue,
      radius,
      synSliding,
      step,
      disabled // useValueList,

    } = this.props;

    const totalRange = this._parseLogical(maxLeftValue) + this._parseLogical(maxRightValue); // 总范围


    const {
      currentLeftValue,
      currentRightValue
    } = this.state;
    let {
      x: leftX,
      y: leftY
    } = this.currentLeftCartesian;
    let {
      x: rightX,
      y: rightY
    } = this.currentRightCartesian;
    let leftDx = 0;
    let leftDy = 0;
    let rightDx = 0;
    let rightDy = 0;
    const componentHorizontalFlag = this.isComponentHorizontal ? 1 : -1; // 在左右两侧滑块位置重合时，判断想要移动的是否是左滑块
    // 在0左右范围内就可以判定为想要移动左滑块，不一定就是刚好为0的位置

    let isWantLeftMove = false;

    if (this.isCheckOverlap) {
      // 保证只有在重合时，才会检测；否则会干扰正常运动
      if (this.isComponentHorizontal) {
        isWantLeftMove = this._panRespondBeforeLeftValue <= this._parseLogical(minLeftValue) + this.offsetOverlap && gestureState.dx <= 0 && gestureState.dy >= 0 || this._panRespondBeforeLeftValue >= this._parseLogical(maxLeftValue) - this.offsetOverlap && gestureState.dx <= 0 && gestureState.dy <= 0;
      } else {
        isWantLeftMove = this._panRespondBeforeLeftValue <= this._parseLogical(minLeftValue) + this.offsetOverlap && gestureState.dx <= 0 && gestureState.dy <= 0 || this._panRespondBeforeLeftValue >= this._parseLogical(maxLeftValue) - this.offsetOverlap && gestureState.dx >= 0 && gestureState.dy <= 0;
      }
    } // 首先要判断当前触摸点是左侧滑块还是右侧滑块


    if (elementKey === 'leftPoint' || isWantLeftMove) {
      leftDx = gestureState.dx;
      leftDy = gestureState.dy;

      if (synSliding) {
        rightDx = -gestureState.dx * componentHorizontalFlag;
        rightDy = gestureState.dy * componentHorizontalFlag;
      }
    } else {
      rightDx = gestureState.dx;
      rightDy = gestureState.dy;

      if (synSliding) {
        leftDx = -gestureState.dx * componentHorizontalFlag;
        leftDy = gestureState.dy * componentHorizontalFlag;
      }
    }

    leftX += leftDx;
    leftY += leftDy;
    rightX += rightDx;
    rightY += rightDy; // gestureState.dy;
    // 计算两侧移动弧度

    const distance = radius + this._extraSize / 2;
    const leftRadian = cartesianToPolar({
      x: leftX,
      y: leftY
    }, distance); // (leftRadian + rightRadian)
    // 使用另一侧弧度来同步会出现当前侧不正常运动
    // const rightRadian = leftRadian > Math.PI ? Math.PI + (2 * Math.PI - leftRadian) : Math.PI - leftRadian;

    const rightRadian = cartesianToPolar({
      x: rightX,
      y: rightY
    }, distance); // 当前弧度

    let newLeftValue;
    let newRightValue; // 首先弧度转角度
    // eslint-disable-next-line no-mixed-operators

    const newLeftAngle = 180 * leftRadian / Math.PI;
    const newRightAngle = 180 * rightRadian / Math.PI; // 角度转转化为对应的范围数值
    // const newValue = this.getValueByArc({ leftAngle: newLeftAngle, rightAngle: newRightAngle });

    const newValue = getValueByArc({
      leftAngle: newLeftAngle,
      rightAngle: newRightAngle
    }, this.isComponentHorizontal); // newLeftValue = Math.round(newValue.leftValue * step) / step;
    // newRightValue = Math.round(newValue.rightValue * step) / step;
    // 调整值为step/2的整数倍数，由于刻度盘180显示360度，所以是step/2的整数倍数，而不是step的整数倍数

    newLeftValue = Math.round(newValue.leftValue / (step / 2)) * (step / 2);
    newRightValue = Math.round(newValue.rightValue / (step / 2)) * (step / 2); // 处理极值

    newLeftValue = Math.max(this._parseLogical(minLeftValue), Math.min(this._parseLogical(maxLeftValue), newLeftValue)); // // 处理极值

    newRightValue = Math.max(this._parseLogical(minRightValue), Math.min(this._parseLogical(maxRightValue), newRightValue)); // 判断先后值是否发生突变,避免直接从最小值变为最大值
    // 避免计算后的数值出现越界

    newLeftValue = Math.abs(newLeftValue - currentLeftValue) > totalRange / 4 ? currentLeftValue : newLeftValue;
    newRightValue = Math.abs(newRightValue - currentRightValue) > totalRange / 4 ? currentRightValue : newRightValue; // 记录触摸过程中左滑块的值

    this._panRespondMovingLeftValue = newLeftValue;
    this.setState({
      currentLeftValue: newLeftValue,
      // Math.round(newLeftValue),
      currentRightValue: newRightValue // Math.round(newRightValue),

    });

    if (disabled) {
      return;
    } // 对于非数值列表，触摸过程中每次上报数值
    // this._fireChangeEvent('onChange');


    if (synSliding) {
      this._fireChangeEvent('onChange', {
        value: this._parseValue(newLeftValue, minLeftValue, maxLeftValue)
      });
    } else {
      this._fireChangeEvent('onChange', {
        currentLeftValue: this._parseValue(newLeftValue, minLeftValue, maxLeftValue),
        currentRightValue: this._parseValue(newRightValue, minRightValue, maxRightValue)
      });
    }
  };
  /**
   * 滑块移动完成时的处理函数
   */

  _handlePanResponderEnd = () => {
    const {
      useMoveValueList,
      valueList = [],
      minLeftValue,
      maxLeftValue // step,

    } = this.props;

    if (useMoveValueList) {
      // 如果使用数值列表，则会向最近的刻度移动
      const {
        currentLeftValue,
        currentRightValue
      } = this.state; // let newLeftValue: number;
      // let newRightValue: number;

      const newLeftValue = this.findPointByMinValue(currentLeftValue, valueList); //  const newRightValue = this.findPointByMinValue(currentRightValue, valueList);
      // }

      this.setState({
        currentLeftValue: newLeftValue,
        // Math.round(newLeftValue),
        currentRightValue: newLeftValue // Math.round(newRightValue),

      }); // 触摸完毕后，更新触摸前左滑块的值

      this._panRespondBeforeLeftValue = newLeftValue; // this._panRespondMovingLeftValue;

      if (this.props.disabled) {
        return;
      }

      this._fireChangeEvent('onChange', {
        value: this._parseValue(newLeftValue, minLeftValue, maxLeftValue)
      });

      this._fireChangeEvent('onComplete', {
        value: this._parseValue(newLeftValue, minLeftValue, maxLeftValue)
      });
    } else {
      this._panRespondBeforeLeftValue = this._panRespondMovingLeftValue;

      if (this.props.disabled) {
        return;
      }

      this._fireChangeEvent('onComplete');
    }
  };
  _fireChangeEvent = (event, params) => {
    if (this.props[event]) {
      const {
        currentLeftValue,
        currentRightValue
      } = this.state;
      const {
        synSliding,
        minLeftValue,
        minRightValue,
        maxLeftValue,
        maxRightValue
      } = this.props;

      if (synSliding) {
        this.props[event](params || {
          value: this._parseValue(currentLeftValue, minLeftValue, maxLeftValue)
        });
      } else {
        this.props[event](params || {
          currentLeftValue: this._parseValue(currentLeftValue, minLeftValue, maxLeftValue),
          currentRightValue: this._parseValue(currentRightValue, minRightValue, maxRightValue)
        });
      }
    }
  };
  /**
   * 通过valueList创建刻度盘数组
   * 刻度盘会受到左右侧的最大值的限制；无最小值限制，可能为了美观吧
   */

  createDialByValueList = () => {
    const {
      valueList,
      radius,
      dialNumStyle,
      maxLeftValue,
      maxRightValue
    } = this.props;
    const finalDialNumList = [];
    valueList && valueList.forEach(value => {
      const newValue = this._parseLogical(value);

      const {
        currentLeftAngle,
        currentRightAngle
      } = getArcByValue({
        currentLeftValue: newValue,
        currentRightValue: newValue
      }, this.isComponentHorizontal);
      const {
        x: leftX,
        y: leftY
      } = getCartesianByAngle(currentLeftAngle, radius, this._extraSize / 2);
      const {
        x: rightX,
        y: rightY
      } = getCartesianByAngle(currentRightAngle, radius, this._extraSize / 2); // 左侧或右侧的最大值限制

      if (value <= maxLeftValue) {
        finalDialNumList.push({
          point: {
            x: leftX,
            y: leftY
          },
          value
        });
      }

      if (value <= maxRightValue) {
        finalDialNumList.push({
          point: {
            x: rightX,
            y: rightY
          },
          value
        });
      }
    });
    const dialNumComponents = finalDialNumList.map(({
      point: {
        x,
        y
      },
      value: dialNum
    }, idx) => <SVGText // eslint-disable-next-line react/no-array-index-key
    key={idx} x={x} y={y} {...dialNumStyle}>
        {dialNum}
      </SVGText>);
    return dialNumComponents;
  };

  componentDidUpdate(prevProps) {
    const {
      initLeftValue,
      initRightValue,
      synSliding // minLeftValue, maxLeftValue, minRightValue, maxRightValue,

    } = this.props;

    if (prevProps.initLeftValue !== initLeftValue || prevProps.initRightValue !== initRightValue) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        currentLeftValue: this._parseLogical(initLeftValue),
        currentRightValue: this._parseLogical(initRightValue)
      });

      if (synSliding) {
        this._fireChangeEvent('onChange', {
          value: initLeftValue
        });
      } else {
        this._fireChangeEvent('onChange', {
          currentLeftValue: initLeftValue,
          currentRightValue: initLeftValue
        });
      }
    }
  }

  createCircleButtonStyle = ({
    x,
    y
  }) => {
    const {
      buttonRadius,
      buttonBorderColor,
      buttonFillColor,
      buttonStrokeWidth
    } = this.props;
    const buttonWidth = buttonStrokeWidth + buttonRadius * 2;
    return {
      position: 'absolute',
      left: x - buttonWidth / 2,
      top: y - buttonWidth / 2,
      width: buttonWidth,
      height: buttonWidth,
      borderRadius: buttonWidth / 2,
      backgroundColor: this.context.theme?.colorForeground || buttonFillColor || buttonBorderColor,
      borderColor: this.context.theme?.colorForeground || buttonBorderColor,
      borderWidth: buttonRadius
    };
  };
  /**
   * 计算视觉上的宽高
   */

  calculateVisualSvgSize = (maxLeftPoint, maxRightPoint) => {
    const {
      radius
    } = this.props;
    const svgSize = radius * 2 + this._extraSize;
    const origin = {
      x: svgSize / 2,
      y: svgSize / 2
    }; // + this._extraSize / 2;

    const calculateVerticalHeightFromPoint = point => {
      if (point.x > origin.x) {
        return Math.abs(origin.y - point.y);
      }

      return origin.y;
    };

    const calculateHorizontalWidthFromPoint = point => {
      if (point.y < origin.y) {
        return Math.abs(origin.x - point.x);
      }

      return origin.x;
    }; // 如果组件处于水平状态，则高度为Math.max(left.y, right.y);
    // 如果处于垂直状态，则要考虑是否在原点左右侧：对于左侧点，如果在原点左侧，高度为origin.y；否则为origin.y - left.y


    const svgHeight = this.isComponentHorizontal ? Math.max(maxLeftPoint.y, maxRightPoint.y) : calculateVerticalHeightFromPoint(maxLeftPoint) + calculateVerticalHeightFromPoint(maxRightPoint); // 如果组件处于水平状态，则要考虑在原点上下侧：对于左侧点，如果在原点下侧，宽度为origin.x；否则为origin.x - left.x
    // 如果组件处于垂直状态，则宽度为Math.max(2* radius - left.x, 2 * radius - right.x)

    const svgWidth = this.isComponentHorizontal ? calculateHorizontalWidthFromPoint(maxLeftPoint) + calculateHorizontalWidthFromPoint(maxRightPoint) : Math.max(svgSize - maxLeftPoint.x, svgSize - maxRightPoint.x);
    return {
      // 由于origin只有一半的额外宽度，所以需要补上另一半额外宽度
      svgWidth: svgWidth + this._extraSize / 2,
      svgHeight: svgHeight + this._extraSize / 2
    };
  };

  render() {
    const {
      radius = 100,
      strokeWidth,
      backgroundPaddingTrackColor,
      backgroundRangeTrackColor,
      style,
      contentContainerStyle,
      children,
      align
    } = this.props;
    const {
      currentLeftValue,
      currentRightValue
    } = this.state; // 刻度盘上的范围值需要转为极坐标上的角度值
    // 两侧滑块在极坐标下对应的角度

    const {
      currentLeftAngle,
      currentRightAngle
    } = getArcByValue({
      currentLeftValue,
      currentRightValue
    }, this.isComponentHorizontal);
    const svgSize = radius * 2 + this._extraSize;
    const offset = this._extraSize / 2;
    const currentLeftPoint = getCartesianByAngle(currentLeftAngle, radius, offset);
    const currentRightPoint = getCartesianByAngle(currentRightAngle, radius, offset);
    const contentStyle = [styles.content, contentContainerStyle];
    const {
      svgHeight,
      svgWidth
    } = this.calculateVisualSvgSize(this.maxLeftPoint, this.maxRightPoint); //  console.log(svgHeight, svgSize);

    const svgContainerStyle = align === 'center' ? {
      width: svgSize,
      // svgSize,
      height: this.isComponentHorizontal ? svgHeight : svgSize,
      marginLeft: this.isComponentHorizontal ? 0 : svgWidth - svgSize
    } : {
      width: svgSize,
      height: svgSize
    };
    return <View style={[styles.container, style]}>
         <View style={contentStyle}>
           {children}
         </View>

         <View style={svgContainerStyle}>
           <Svg width={svgSize} height={svgSize}>
             <CircularPathSVG key="paddingTrack" radius={radius} strokeWidth={strokeWidth} offset={offset} stroke={backgroundPaddingTrackColor} fill="none" strokeLinecap="round" rightAngle={this.maxRightAngle} midAngle={this.isComponentHorizontal ? 90 : 0} leftAngle={this.maxLeftAngle} />

             <CircularPathSVG key="rangeTrack" radius={radius} strokeWidth={strokeWidth} offset={offset} stroke={backgroundRangeTrackColor} fill="none" strokeLinecap="round" rightAngle={currentRightAngle} midAngle={this.isComponentHorizontal ? 90 : 0} leftAngle={currentLeftAngle} />
             {
            /* {this.createDial()} */
          }
             {this.createDialByValueList()}


             {
            /*
            // 在IOS中不支持
            <Circle
            key="leftPoint"
            cx={currentLeftPoint.x}
            cy={currentLeftPoint.y}
            r={buttonRadius}
            fill={this.context.theme?.colorForeground || buttonFillColor || buttonBorderColor}
            stroke={this.context.theme?.colorForeground || buttonBorderColor}
            strokeWidth={buttonStrokeWidth}
            // {...this._panResponder.panHandlers}
            {...this._leftPanResponder.panHandlers}
            />
            <Circle
            key="rightPoint"
            cx={currentRightPoint.x}
            cy={currentRightPoint.y}
            r={buttonRadius}
            fill={this.context.theme?.colorForeground || buttonFillColor || buttonBorderColor}
            stroke={this.context.theme?.colorForeground || buttonBorderColor}
            strokeWidth={buttonStrokeWidth}
            // {...this._panResponder.panHandlers}
            {...this._rightPanResponder.panHandlers}
            /> */
          }
           </Svg>

           <View key="leftPoint" style={this.createCircleButtonStyle(currentLeftPoint)} {...this._leftPanResponder.panHandlers} />

           <View key="rightPoint" style={this.createCircleButtonStyle(currentRightPoint)} {...this._rightPanResponder.panHandlers} />
         </View>
       </View>;
  }

}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0
  }
});