// @ts-nocheck

/* eslint-disable */
import PropTypes from 'prop-types';
import React from 'react';
import { Dimensions, Platform, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Styles } from "../../resources";
import TouchableView from "../touchableView/TouchableView";
import Separator from "../separator/Separator";
import Switch from "../switch/Switch";
import { PopButton } from "../popButton";
import CheckBox from "../checkbox/Checkbox";
import Images from "../../resources/Images";
import { ConfigContext } from "../configProvider";
import DynamicColor from "../../styles/DynamicColor";
import { AccessibilityPropTypes, AccessibilityRoles, getAccessibilityConfig } from "../../utils/accessibility-helper";
import { referenceReport } from "../../decorators/reportDecorator";
const {
  width
} = Dimensions.get('window');
const THIN_HEIGHT = 58;
const PADDING = 29;
const checkboxSize = 22;
const Line_Height = 24; // 开关左侧分隔线默认的高度

/**
 * @description ListItem右侧图标的类型, 默认开关
 * @enum {string}
 */

const TYPE = {
  /**
   * 开关
   */
  SWITCH: 'switch',

  /**
   * 单选
   */
  CHOICE: 'choice',

  /**
   * 按钮
   */
  BUTTON: 'button',

  /**
   * 排序
   */
  SORT: 'sort'
};
Object.freeze(TYPE);
/**
 * @export public
 * @doc_name 列表控件
 * @doc_index 2
 * @doc_directory ui
 * @author Geeook
 * @since 10004
 * @module ListItemWithSwitch
 * @description 右侧带四种控件的列表项
 * @property {string} type - 右侧的图标类型，默认为开关
 * @property {string} title - 左侧主标题
 * @property {string} subtitle - 左侧副标题，主标题下方
 * @property {string} valueText - 主标题右侧文案
 * @property {bool} value - 开关状态，默认值 false
 * @property {bool} disabled - 是否禁用右侧控件，默认值 false
 * @property {function} onPress - note: IMPORTANT 列表项点击事件，不传则不具有点击态（disabled）
 * @property {function} onValueChange - 开关切换事件
 * @property {bool} showSeparator - 是否显示分割线，默认值 true
 * @property {component} separator - 自定义分割线，不传将显示默认样式的分割线
 * @property {style} containerStyle - 列表项的自定义样式
 * @property {style} titleStyle - 主标题的自定义样式
 * @property {style} subtitleStyle - 副标题的自定义样式
 * @property {style} valueTextStyle - 主标题右侧文案的自定义样式
 * @property {style} switchStyle - 开关的自定义样式
 * @property {bool} allowFontScaling - 10040新增 设置字体是否随系统设置的字体大小的设置改变而改变 默认为true。
 * @property {bool} unlimitedHeightEnable - 10040新增 设置控件高度是否自适应。 默认为false，即默认高度
 * @property {number} titleNumberOfLines - 10040新增 设置title字体显示的最大行数 默认为1
 * @property {number} subtitleNumberOfLines - 10040新增 设置subtitle字体显示的最大行数 默认为2
 * @property {number} valueNumberOfLines - 10040新增 设置value字体显示的最大行数 默认为1
 * @property {string} onTintColor - 开关按钮打开时的背景颜色
 * @property {string} tintColor - 开关按钮关闭时的背景颜色
 * @property {ImageSourcePropType} leftIcon - 10045新增 左侧自定义图标
 * @property {object} buttonOption - 按钮的样式
 * @property {object} choiceOption - 单选的样式
 * @property {bool} useNewType - 10045新增 是否使用新样式 10045以后*!必须!*使用新样式
 * @property {bool} showVerticalLine - 是否显示开关左侧的分割线，默认值 false
 */

/**
 * 单选
 * @typedef {object} choiceOption
 * @property {string} checkedColor - 背景颜色
 * @property {function} onValueChange - 切换事件
 * @property {bool} checked - 是否勾选
 */

/** 按钮
 * @typedef {object} buttonOption
 * @property {string} title - 按钮文字
 * @property {Object} backgroundColor - 10047新增 控制按钮背景颜色{ bgColorNormal: string; bgColorPressed: string };详情请参阅组件PopButton
 * @property {style} titleStyle - 10047新增 按钮标题样式,设置字体大小无效
 * @property {function} onPress - 按钮方法
 */

/**
 * 排序
 * @typedef {object} sortOption
 * @property {function} onPress - 点击事件
 * @property {function} onLongPress - 长按点击事件
 */

class ListItemWithSwitch extends React.Component {
  static contextType = ConfigContext;
  static propTypes = {
    type: PropTypes.oneOf([TYPE.SWITCH, TYPE.BUTTON, TYPE.CHOICE, TYPE.SORT]),
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    valueText: PropTypes.string,
    value: PropTypes.bool,
    disabled: PropTypes.bool,
    onPress: PropTypes.func,
    onValueChange: PropTypes.func.isRequired,
    showSeparator: PropTypes.bool,
    separator: PropTypes.element,
    containerStyle: PropTypes.object,
    titleStyle: PropTypes.object,
    subtitleStyle: PropTypes.object,
    valueTextStyle: PropTypes.object,
    switchStyle: PropTypes.object,
    tintColor: PropTypes.string,
    onTintColor: PropTypes.string,
    allowFontScaling: PropTypes.bool,
    unlimitedHeightEnable: PropTypes.bool,
    titleNumberOfLines: PropTypes.number,
    subtitleNumberOfLines: PropTypes.number,
    valueNumberOfLines: PropTypes.number,
    accessible: AccessibilityPropTypes.accessible,
    accessibilityLabel: AccessibilityPropTypes.accessibilityLabel,
    accessibilityHint: AccessibilityPropTypes.accessibilityHint,
    buttonOption: PropTypes.object,
    choiceOption: PropTypes.object,
    sortOption: PropTypes.object,
    showVerticalLine: PropTypes.bool
  };
  static defaultProps = {
    type: TYPE.SWITCH,
    title: '',
    subtitle: '',
    valueText: '',
    value: false,
    disabled: false,
    showSeparator: true,
    containerStyle: {},
    titleStyle: {},
    subtitleStyle: {},
    valueTextStyle: {},
    switchStyle: {},
    unlimitedHeightEnable: false,
    allowFontScaling: true,
    leftIcon: null,
    useNewType: false,
    showVerticalLine: false
  };
  static TYPE = TYPE;
  static contextType = ConfigContext;

  constructor(props, context) {
    super(props, context);
    referenceReport('ListItemWithSwitch');
  }

  colorForVerticalLine = new DynamicColor('#E5E5E5', 'rgba(255,255,255,0.15)');

  renderRight() {
    let rightView;
    let rightSortView;

    if (this.props.type === TYPE.SORT) {
      const source = this.context.colorScheme === 'dark' ? Images.sort.dark.normal : Images.sort.light.normal; // const highlightedSource = this.context.colorScheme === 'dark' ? Images.sort.dark.press : Images.sort.light.press;

      rightSortView = <TouchableOpacity disabled={this.props.disabled} activeOpacity={0.8} style={{
        width: 35,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-end'
      }} onPress={this.props.sortOption?.onPress} onLongPress={this.props.sortOption?.onLongPress} {...!this.props.onPress ? {} : getAccessibilityConfig({
        accessible: this.props.accessible,
        accessibilityLabel: this.props.accessibilityLabel || this.props.title,
        accessibilityHint: this.props.accessibilityHint
      })}>
        {<Image source={source} />}
      </TouchableOpacity>;
    }

    switch (this.props.type) {
      case TYPE.SWITCH:
        rightView = <Switch style={this.props.switchStyle} value={this.props.value} disabled={this.props.disabled} tintColor={this.props.tintColor} onTintColor={this.props.onTintColor} onValueChange={value => this._onValueChange(value)} {...!this.props.onPress ? {} : getAccessibilityConfig({
          accessible: this.props.accessible,
          accessibilityLabel: this.props.accessibilityLabel || this.props.title,
          accessibilityHint: this.props.accessibilityHint
        })} />;
        break;

      case TYPE.BUTTON:
        rightView = <PopButton sizeLevel={'small'} title={this.props.buttonOption?.title} disabled={this.props.disabled} backgroundColor={this.props.buttonOption?.backgroundColor} titleStyle={this.props.buttonOption?.titleStyle} titleColor={this.props.buttonOption?.titleStyle?.color} allowFontScaling={this.props.allowFontScaling} onPress={this.props.buttonOption?.onPress} {...!this.props.onPress ? {} : getAccessibilityConfig({
          accessible: this.props.accessible,
          accessibilityLabel: this.props.accessibilityLabel || this.props.title,
          accessibilityHint: this.props.accessibilityHint
        })} />;
        break;

      case TYPE.CHOICE:
        rightView = <CheckBox style={{
          width: checkboxSize,
          height: checkboxSize,
          borderRadius: checkboxSize / 2
        }} disabled={this.props.disabled} checked={this.props.choiceOption?.checked} checkedColor={this.props.choiceOption?.checkedColor} onValueChange={this.props.choiceOption?.onValueChange} {...!this.props.onPress ? {} : getAccessibilityConfig({
          accessible: this.props.accessible,
          accessibilityLabel: this.props.accessibilityLabel || this.props.title,
          accessibilityHint: this.props.accessibilityHint
        })} />;
        break;

      case TYPE.SORT:
        rightView = rightSortView;
        break;

      default:
        rightView = null;
        break;
    }

    return rightView;
  }

  render() {
    let extraContainerStyle = {};

    if (this.props.subtitle) {
      extraContainerStyle = {
        paddingVertical: this.props.leftIcon ? 8 : 15,
        height: 77
      };
    }

    let leftIconContainerStyle = {};

    if (this.props.leftIcon) {
      leftIconContainerStyle = {
        height: 70,
        paddingLeft: 22
      };
    }

    const extraStyle = {};

    if (this.props.valueText) {
      extraStyle.maxWidth = (width - PADDING * 2) * 0.4;

      if (this.props.containerStyle.width) {
        extraStyle.maxWidth = (this.props.containerStyle.width - PADDING * 2) * 0.4;
      }
    }

    if (Platform.OS === 'android') {
      extraStyle.fontFamily = 'KMedium';
    }

    let adaptedFontStyle = {};
    let adaptedContainerStyle = {};

    if (this.props.unlimitedHeightEnable) {
      adaptedFontStyle = {
        height: undefined
      };
      adaptedContainerStyle = {
        height: undefined,
        paddingVertical: 10
      };
    }

    let titleLine = this.props.titleNumberOfLines == undefined ? 1 : this.props.titleNumberOfLines;
    let subtitleLine = this.props.subtitleNumberOfLines == undefined ? 2 : this.props.subtitleNumberOfLines;
    let valueLine = this.props.valueNumberOfLines == undefined ? 1 : this.props.valueNumberOfLines;
    if (titleLine < 0) titleLine = 0;
    if (subtitleLine < 0) subtitleLine = 0;
    if (valueLine < 0) valueLine = 0;
    let titleHeight, subtitleHeight;

    if (this.props.titleStyle) {
      titleHeight = this.props.titleStyle.fontSize ? this.props.titleStyle.fontSize + 6 : 22;
    }

    if (this.props.subtitleStyle) {
      subtitleHeight = this.props.subtitleStyle.fontSize ? this.props.titleStyle.fontSize + 5 : 18;
    }

    let showVerticalLine = false;

    if (this.props.type == TYPE.SWITCH && this.props.showVerticalLine) {
      showVerticalLine = true;
    }

    return <View>
        <TouchableView disabled={!this.props.onPress} underlayColor={Styles.common.underlayColor} onPress={this.props.onPress} viewStyle={[styles.container, {
        backgroundColor: this.context.theme?.colorWhite
      }, this.props.containerStyle, leftIconContainerStyle, extraContainerStyle, adaptedContainerStyle]} {...this.props.onPress ? getAccessibilityConfig({
        accessible: false
      }) : getAccessibilityConfig({
        accessible: this.props.accessible,
        accessibilityRole: AccessibilityRoles.switch,
        accessibilityLabel: this.props.accessibilityLabel,
        accessibilityHint: this.props.accessibilityHint,
        accessibilityState: {
          disabled: this.props.disabled,
          checked: this.props.value
        }
      })} accessibilityActions={this.props.onPress ? [] : [{
        name: 'activate'
      }]} onAccessibilityAction={this.props.onPress ? null : this.onAccessibilityAction}>
          {this.props.leftIcon ? <Image style={styles.leftIcon} source={this.props.leftIcon} /> : null}
          <View style={styles.left} {...!this.props.onPress ? {} : getAccessibilityConfig({
          accessible: this.props.accessible,
          accessibilityRole: AccessibilityRoles.button,
          accessibilityLabel: this.props.accessibilityLabel,
          accessibilityHint: this.props.accessibilityHint,
          accessibilityState: {
            disabled: this.props.disabled
          }
        })} accessibilityActions={!this.props.onPress ? [] : [{
          name: 'activate'
        }]} onAccessibilityAction={!this.props.onPress ? null : this.onAccessibilityAction}>
            <View style={[styles.up]}>
              <Text numberOfLines={titleLine} allowFontScaling={this.props.allowFontScaling} ellipsizeMode="tail" style={[Styles.common.title, this.props.useNewType ? {
              fontWeight: 'bold'
            } : {}, {
              lineHeight: titleHeight,
              color: this.context.theme?.colorBlack
            }, extraStyle, this.props.titleStyle, adaptedFontStyle]} {...getAccessibilityConfig({
              accessible: false
            })}>
                {this.props.title}
              </Text>
              {this.props.valueText ? <View style={{
              flexDirection: 'row',
              flex: 1
            }}>
                    {
                /* <View style={[styles.separatorCol, !this.props.allowFontScaling ? {
                 alignSelf: 'stretch', width: 0.5, height: undefined, marginVertical: 8,
                } : {}]} /> */
              }
                    <View style={[styles.separatorCol]} />
                    <Text numberOfLines={valueLine} ellipsizeMode="tail" allowFontScaling={this.props.allowFontScaling} style={[Styles.common.subtitle, {
                color: this.context.theme?.colorGrayLighter
              }, this.props.valueTextStyle, adaptedFontStyle]} {...getAccessibilityConfig({
                accessible: false
              })}>
                      {this.props.valueText}
                    </Text>
                  </View> : null}
            </View>
            {this.props.subtitle ? <Text numberOfLines={subtitleLine} ellipsizeMode="tail" allowFontScaling={this.props.allowFontScaling} style={[Styles.common.subtitle, {
            lineHeight: subtitleHeight,
            color: this.context.theme?.colorGrayLighter
          }, this.props.subtitleStyle, adaptedFontStyle]} {...getAccessibilityConfig({
            accessible: false
          })}>
                  {this.props.subtitle}
                </Text> : null}
          </View>
          <View style={[styles.right, showVerticalLine ? {
          flexDirection: 'row',
          justifyContent: 'space-between'
        } : {}]}>
            {showVerticalLine ? <View style={[styles.verticalLine, {
            backgroundColor: this.colorForVerticalLine[this.context.colorScheme]
          }]} /> : null}
            {this.renderRight()}
          </View>
          {
          /* </View> */
        }
        </TouchableView>
        {this.renderSeparator()}
      </View>;
  }

  renderSeparator() {
    if (!this.props.showSeparator || this.props.useNewType) return null;
    return this.props.separator || <Separator style={{
      marginLeft: Styles.common.padding
    }} />;
  } // // 父组件更新数据
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.value !== this.state.value) {
  //     this.setState({ value: nextProps.value });
  //   }
  // }


  _onValueChange(value) {
    // this.setState({ value });
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
      disabled,
      onValueChange,
      onPress,
      value
    } = this.props;

    if (disabled) {
      return;
    }

    if (actionName === 'activate' && typeof onValueChange === 'function') {
      onValueChange(!value);
    }

    if (actionName === 'activate' && typeof onPress === 'function') {
      onPress();
    }
  };
}

const styles = StyleSheet.create({
  container: {
    width,
    height: THIN_HEIGHT,
    paddingHorizontal: PADDING,
    flexDirection: 'row',
    alignItems: 'center'
  },
  left: {
    flex: 3
  },
  right: {
    flex: 1,
    alignItems: 'flex-end',
    maxWidth: 80
  },
  up: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2
  },
  separatorCol: {
    height: 14,
    width: 0.5,
    marginHorizontal: 5,
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  leftIcon: {
    resizeMode: 'contain',
    width: 56,
    height: 56,
    marginRight: 2
  },
  verticalLine: {
    height: Line_Height,
    width: 0.5,
    marginLeft: 15,
    marginRight: 5
  }
});
export default ListItemWithSwitch;