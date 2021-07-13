// @ts-nocheck

/* eslint-disable */
import PropTypes from 'prop-types';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Slider from 'react-native-slider';
import { Styles } from "../../resources";
import Separator from "../separator/Separator";
import { FontDefault } from "../../constants/font";
import { ConfigContext } from "../configProvider";
import SlideGear from "../gear/SlideGear";
import { AccessibilityPropTypes, AccessibilityRoles, getAccessibilityConfig } from "../../utils/accessibility-helper";
import { referenceReport } from "../../decorators/reportDecorator";
const {
  width
} = Dimensions.get('window');
const HEIGHT = 104;
const PADDING = 29;
const THUMB_SIZE = 24;
const THUMB_TOUCH_SIZE = {
  width: 50,
  height: 50
};
/**
 * @export public
 * @doc_name 列表控件
 * @doc_index 2
 * @doc_directory ui
 * @author Geeook
 * @since 10004
 * @module ListItemWithSlider
 * @description 带滑动条的列表项
 * @property {string} title - 标题
 * @property {string} subtitle - 副标题，优先级高于自动计算的值
 * @property {object} sliderProps - slider的属性值，默认值 {minimumValue:0,maximumValue:100,step:1,value:50}
 * minimumValue：最小值；maximumValue：最大值；step：步长；value：当前值
 * @property {bool} showWithPercent - 是否以百分比显示当前值，默认值 true
 * @property {string} unit - 当前值的单位。`showWithPercent = true` 将不显示单位
 * @property {object} sliderStyle - slider 的自定义样式
 * 默认值
 * {
 *   minimumTrackTintColor: "#32BAC0", // slider 左侧已填充颜色
 *   maximumTrackTintColor: "rgba(0,0,0,0.15)", // slider 右侧未填充颜色
 *   thumbTintColor: "#32BAC0", // 可移动圆圈的填充颜色
 *   style: {}, // slider 容器的自定义样式 --10045新版不可用
 *   trackStyle: { height: 2, borderRadius: 1 }, // 轨 的自定义样式 --10045新版不可用
 *   thumbStyle: { width: 24, height: 24, borderRadius: 12 }, // 可移动圆圈 的自定义样式 --10045新版不可用
 * }
 * @property {function} onValueChange - 滑动回调函数，返回实时的滑动值
 * @property {function} onSlidingComplete - 滑动结束回调函数
 * @property {bool} disabled - 是否禁用滑动，默认值 false
 * @property {style} containerStyle - 列表项的自定义样式
 * @property {style} titleStyle - 标题的自定义样式
 * @property {style} valueStyle - value的自定义样式
 * @property {bool} showSeparator - 是否显示分割线，默认值 false
 * @property {component} separator - 自定义分割线，不传将显示默认样式的分割线
 * @property {bool} allowFontScaling - 10040新增 设置字体是否随系统设置的字体大小的设置改变而改变 默认为true。
 * @property {bool} unlimitedHeightEnable - 10040新增 设置控件高度是否自适应。 默认为false，即默认高度
 * @property {number} titleNumberOfLines - 10040新增 设置title字体显示的最大行数 默认为1
 * @property {number} valueNumberOfLines - 10040新增 设置value字体显示的最大行数 默认为1
 * @property {bool} useNewType - 10045新增 是否使用新版滑条, 10045后 * 必须 * 使用新版滑条 老版滑条将被废弃
 */

class ListItemWithSlider extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    sliderProps: PropTypes.object,
    showWithPercent: PropTypes.bool,
    unit: PropTypes.string,
    sliderStyle: PropTypes.object,
    onValueChange: PropTypes.func,
    onSlidingComplete: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    containerStyle: PropTypes.object,
    titleStyle: PropTypes.object,
    valueStyle: PropTypes.object,
    showSeparator: PropTypes.bool,
    separator: PropTypes.element,
    allowFontScaling: PropTypes.bool,
    unlimitedHeightEnable: PropTypes.bool,
    titleNumberOfLines: PropTypes.number,
    valueNumberOfLines: PropTypes.number,
    accessible: AccessibilityPropTypes.accessible,
    accessibilityLabel: AccessibilityPropTypes.accessibilityLabel,
    accessibilityHint: AccessibilityPropTypes.accessibilityHint,
    useNewType: PropTypes.bool
  };
  static defaultProps = {
    title: '',
    subtitle: '',
    showWithPercent: true,
    unit: '',
    disabled: false,
    containerStyle: {},
    titleStyle: {},
    valueStyle: {},
    showSeparator: false,
    onSlidingComplete: () => {},
    unlimitedHeightEnable: false,
    allowFontScaling: true,
    useNewType: false
  };
  static contextType = ConfigContext;

  constructor(props, context) {
    super(props, context);
    referenceReport('ListItemWithSlider');
    this.sliderProps = Object.assign({
      minimumValue: 0,
      maximumValue: 100,
      step: 1,
      value: 50
    }, this.props.sliderProps);
    this.sliderStyle = Object.assign({
      minimumTrackTintColor: this.context.theme?.colorPrimary,
      maximumTrackTintColor: this.context.theme?.colorBtnGrayNor,
      thumbTintColor: this.context.theme?.colorPrimary
    }, this.props.sliderStyle);
    this.state = {
      value: this.sliderProps.value,
      valueStr: this.format(this.sliderProps.value)
    };
  }

  renderGear() {
    let gear;

    if (this.props.useNewType) {
      gear = <SlideGear value={this.state.value} containerStyle={{
        height: 26
      }} showEndText={false} optionMin={this.sliderProps.minimumValue} optionMax={this.sliderProps.maximumValue} optionStep={this.sliderProps.step} onValueChange={value => this._onValueChange(value)} onSlidingComplete={value => this._onSlidingComplete(value)} minimumTrackTintColor={this.sliderStyle.minimumTrackTintColor} maximumTrackTintColor={this.sliderStyle.maximumTrackTintColor} disabled={this.props.disabled} {...getAccessibilityConfig({
        accessible: false
      })} />;
    } else {
      gear = <Slider disabled={this.props.disabled} style={[this.sliderStyle.style]} maximumValue={this.sliderProps.maximumValue} minimumValue={this.sliderProps.minimumValue} step={this.sliderProps.step} minimumTrackTintColor={this.sliderStyle.minimumTrackTintColor} maximumTrackTintColor={this.sliderStyle.maximumTrackTintColor} thumbTintColor={this.sliderStyle.thumbTintColor} thumbTouchSize={THUMB_TOUCH_SIZE} trackStyle={[styles.trackStyle, this.sliderStyle.trackStyle]} thumbStyle={[styles.thumbStyle, this.sliderStyle.thumbStyle]} value={this.state.value} onValueChange={value => this._onValueChange(value)} onSlidingComplete={value => this._onSlidingComplete(value)} {...getAccessibilityConfig({
        accessible: false
      })} />;
    }

    return gear;
  }

  render() {
    let extraStyle = {
      maxWidth: (width - PADDING * 2) * 0.7,
      fontFamily: FontDefault
    };

    if (this.props.containerStyle.width) {
      extraStyle = {
        maxWidth: (this.props.containerStyle.width - PADDING * 2) * 0.7
      };
    }

    let adaptedFontStyle = {};

    if (this.props.unlimitedHeightEnable) {
      adaptedFontStyle = {
        height: undefined
      };
    }

    let titleLine = this.props.titleNumberOfLines == undefined ? 1 : this.props.titleNumberOfLines;
    let valueLine = this.props.valueNumberOfLines == undefined ? 1 : this.props.valueNumberOfLines;
    if (titleLine < 0) titleLine = 0;
    if (valueLine < 0) valueLine = 0;
    let titleHeight, subtitleHeight;

    if (this.props.titleStyle) {
      titleHeight = this.props.titleStyle.fontSize ? this.props.titleStyle.fontSize + 6 : 22;
    }

    if (this.props.subtitleStyle) {
      subtitleHeight = this.props.valueStyle.fontSize ? this.props.valueStyle.fontSize + 5 : 18;
    }

    return <View style={{
      backgroundColor: '#fff'
    }}>
        <View style={[styles.container, {
        backgroundColor: this.context.theme?.colorWhite
      }, this.props.containerStyle, adaptedFontStyle]} {...getAccessibilityConfig({
        accessible: this.props.accessible,
        accessibilityRole: AccessibilityRoles.adjustable,
        accessibilityLabel: this.props.accessibilityLabel,
        accessibilityHint: this.props.accessibilityHint,
        accessibilityState: {
          disabled: !!this.props.disabled
        },
        accessibilityValue: {
          min: this.sliderProps.minimumValue,
          max: this.sliderProps.maximumValue,
          now: this.state.value
        }
      })} accessibilityActions={[{
        name: 'increment'
      }, {
        name: 'decrement'
      }]} onAccessibilityAction={this.onAccessibilityAction}>
          <View style={[styles.up]}>
            <Text numberOfLines={titleLine} ellipsizeMode="tail" allowFontScaling={this.props.allowFontScaling} style={[Styles.common.title, {
            fontWeight: 'bold',
            lineHeight: titleHeight,
            color: this.context.theme?.colorBlack
          }, this.props.titleStyle, extraStyle, adaptedFontStyle]} {...getAccessibilityConfig({
            accessible: false
          })}>
              {this.props.title}
            </Text>
            <View style={[styles.separatorCol, this.props.unlimitedHeightEnable ? {
            height: '80%'
          } : {}]} />
            <Text style={[styles.value, {
            color: this.context.theme?.colorGrayLighter,
            lineHeight: subtitleHeight
          }, this.props.valueStyle, adaptedFontStyle]} numberOfLines={valueLine} allowFontScaling={this.props.allowFontScaling} {...getAccessibilityConfig({
            accessible: false
          })}>
              {this.props.subtitle || this.state.valueStr}
            </Text>
          </View>
          <View style={styles.down}>
            {this.renderGear()}
          </View>
        </View>
        {this.renderSeparator()}
      </View>;
  }

  renderSeparator() {
    if (!this.props.showSeparator) return null;
    return this.props.separator || <Separator />;
  }

  format(val) {
    if (this.props.showWithPercent) {
      const {
        minimumValue: min,
        maximumValue: max
      } = this.sliderProps;
      return `${Math.round((val - min) / (max - min) * 100)} %`;
    }

    return `${val} ${this.props.unit}`;
  } // 父组件更新数据


  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.sliderProps === undefined) return;

    if (typeof nextProps.sliderProps.value !== 'number') {
      if (__DEV__ && console.warn) {
        console.warn('sliderProps.value is not a number');
      }

      return;
    }

    const {
      value,
      minimumValue,
      maximumValue
    } = nextProps.sliderProps;

    if (minimumValue !== undefined && minimumValue !== this.sliderProps.minimumValue) {
      this.sliderProps.minimumValue = minimumValue;
    }

    if (maximumValue !== undefined && maximumValue !== this.sliderProps.maximumValue) {
      this.sliderProps.maximumValue = maximumValue;
    }

    if (value !== this.state.value) {
      this.setState({
        value,
        valueStr: this.format(value)
      });
    }
  }

  _onValueChange(value) {
    this.setState({
      value,
      valueStr: this.format(value)
    });

    if (this.props.onValueChange) {
      this.props.onValueChange(value);
    }
  }

  onAccessibilityAction = ({
    nativeEvent: {
      actionName
    }
  }) => {
    const {
      minimumValue,
      maximumValue,
      step
    } = this.sliderProps;
    const {
      disabled
    } = this.props;

    if (disabled) {
      return;
    }

    const {
      value
    } = this.state;
    const totalSteps = (maximumValue - minimumValue) / step;
    const everyStep = totalSteps >= 10 ? Math.floor(totalSteps / 10) : 1;
    const currentStep = (value - minimumValue) / step;
    let actionStep = currentStep;

    switch (actionName) {
      case 'increment':
        actionStep += everyStep;
        break;

      case 'decrement':
        actionStep -= everyStep;
        break;
    }

    const targetValue = Math.min(maximumValue, Math.max(minimumValue, actionStep * step + minimumValue));

    this._onValueChange(targetValue, () => {
      this._onSlidingComplete(targetValue);
    });
  };

  _onSlidingComplete(value) {
    if (this.props.onSlidingComplete) {
      this.props.onSlidingComplete(value);
    }
  }

}

const styles = StyleSheet.create({
  container: {
    width: width,
    backgroundColor: '#fff',
    paddingHorizontal: PADDING,
    height: HEIGHT
  },
  up: {
    marginTop: 13,
    flexDirection: 'row',
    alignItems: 'center'
  },
  down: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 21
  },
  separatorCol: {
    height: 14,
    width: 0.5,
    marginHorizontal: 8,
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  value: {
    fontSize: 13,
    color: '#999999',
    lineHeight: 16,
    flex: 1
  },
  trackStyle: {
    height: 2,
    borderRadius: 1
  },
  thumbStyle: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2
  }
});
export default ListItemWithSlider;