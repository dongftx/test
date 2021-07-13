// @ts-nocheck

/* eslint-disable */
import PropTypes from 'prop-types';
import React from 'react';
import { Dimensions, Image, Platform, StyleSheet, Text, View } from 'react-native';
import TouchableView from "../touchableView/TouchableView";
import { Images, Styles } from "../../resources";
import Separator from "../separator/Separator";
import { ConfigContext } from "../configProvider";
import { AccessibilityRoles, AccessibilityPropTypes, getAccessibilityConfig } from "../../utils/accessibility-helper";
import { referenceReport } from "../../decorators/reportDecorator";
const {
  width
} = Dimensions.get('window');

const dot = require("../../resources/title/dot.png");

const THIN_HEIGHT = 58;
const PADDING = 29;
const dotSize = 8;
const ICON_SIZE = Platform.select({
  android: 26,
  ios: 24
}); // 当android设置24的时候，图形会挤压形成锯齿

/**
 * @export public
 * @doc_name 列表控件
 * @doc_index 2
 * @doc_directory ui
 * @author Geeook
 * @since 10004
 * @module ListItem
 * @description 普通列表项
 * @property {string} title - 左侧主标题
 * @property {string} subtitle - 下侧副标题
 * @property {string} value - 右侧文案
 * @property {function} onPress - 点击事件
 * @property {function} onLongPress - onLongPress 事件
 * @property {number} delayLongPress - 10047新增 longPress回调触发延时
 * @property {bool} disabled - 是否禁用点击，默认值 false
 * @property {bool} showSeparator - 是否显示分割线，默认值 true
 * @property {bool} hideArrow - 是否隐藏右侧箭头图片，默认值 `false`
 * @property {bool} showDot - 是否显示小红点，默认值 `false`
 * @property {component} separator - 自定义分割线，不传将显示默认样式的分割线
 * @property {style} containerStyle - 列表项的自定义样式
 * @property {style} titleStyle - 标题的自定义样式
 * @property {style} subtitleStyle - 副标题的自定义样式
 * @property {style} valueStyle - 右侧文案的自定义样式
 * @property {bool} dotStyle - 10040新增 title右上角红点的style  建议设置宽高为8，以免图片失真
 * @property {bool} allowFontScaling - 10040新增 设置字体是否随系统设置的字体大小的设置改变而改变 默认为true。
 * @property {bool} unlimitedHeightEnable - 10040新增 设置控件高度是否自适应。 默认为false，即默认高度
 * @property {number} titleNumberOfLines - 10040新增 设置title字体显示的最大行数 默认为1
 * @property {number} subtitleNumberOfLines - 10040新增 设置subtitle字体显示的最大行数 默认为2
 * @property {number} valueNumberOfLines - 10040新增 设置value字体显示的最大行数 默认为1
 * @property {ImageSourcePropType} leftIcon - 10045新增 左侧自定义图标
 * @property {bool} useNewType - 10045新增 是否使用新样式 10045以后*!必须!*使用新样式
 */

class ListItem extends React.Component {
  static contextType = ConfigContext;
  static propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    value: PropTypes.string,
    onPress: PropTypes.func.isRequired,
    onLongPress: PropTypes.func,
    disabled: PropTypes.bool,
    showSeparator: PropTypes.bool,
    hideArrow: PropTypes.bool,
    showDot: PropTypes.bool,
    separator: PropTypes.element,
    containerStyle: PropTypes.object,
    titleStyle: PropTypes.object,
    subtitleStyle: PropTypes.object,
    valueStyle: PropTypes.object,
    dotStyle: PropTypes.object,
    allowFontScaling: PropTypes.bool,
    unlimitedHeightEnable: PropTypes.bool,
    titleNumberOfLines: PropTypes.number,
    subtitleNumberOfLines: PropTypes.number,
    valueNumberOfLines: PropTypes.number,
    accessible: AccessibilityPropTypes.accessible,
    accessibilityLabel: AccessibilityPropTypes.accessibilityLabel,
    accessibilityHint: AccessibilityPropTypes.accessibilityHint
  };
  static defaultProps = {
    title: '',
    subtitle: '',
    value: '',
    onPress: () => {},
    onLongPress: () => {},
    disabled: false,
    showSeparator: true,
    hideArrow: false,
    showDot: false,
    containerStyle: {},
    titleStyle: {},
    subtitleStyle: {},
    valueStyle: {},
    dotStyle: {},
    unlimitedHeightEnable: false,
    allowFontScaling: true,
    leftIcon: null,
    useNewType: false
  };

  constructor(props, context) {
    super(props, context);
    referenceReport('ListItem');
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

    let extraRightStyle = {};

    if (!this.props.hideArrow) {
      extraRightStyle = {
        maxWidth: '30%'
      }; //10.16加宽确保大部分能一行显示
    } else {
      extraRightStyle = {
        maxWidth: '35%'
      };
    } // if (this.props.value) {
    //   extraRightStyle.flex = 8;
    // }


    const valueStyle = {
      marginRight: 7,
      textAlignVertical: 'center',
      textAlign: 'right'
    };
    let adaptedFontStyle = {};

    if (this.props.unlimitedHeightEnable) {
      adaptedFontStyle = {
        height: undefined
      };
    }

    let titleLine = this.props.titleNumberOfLines == undefined ? 1 : this.props.titleNumberOfLines;
    let subtitleLine = this.props.subtitleNumberOfLines == undefined ? 2 : this.props.subtitleNumberOfLines;
    let valueLine = this.props.valueNumberOfLines == undefined ? 2 : this.props.valueNumberOfLines;
    if (titleLine < 0) titleLine = 0;
    if (subtitleLine < 0) subtitleLine = 0;
    if (valueLine < 0) valueLine = 0; // 如果不设置英文字体，那么外文字符串将显示不全（Android）

    let fontFamily = {};

    if (Platform.OS === 'android') {
      fontFamily = {
        fontFamily: 'Kmedium'
      };
      valueStyle.height = THIN_HEIGHT;
    }

    let titleHeight, subtitleHeight;

    if (this.props.titleStyle) {
      titleHeight = this.props.titleStyle.fontSize ? this.props.titleStyle.fontSize + 6 : 22;
    }

    if (this.props.subtitleStyle) {
      subtitleHeight = this.props.subtitleStyle.fontSize ? this.props.titleStyle.fontSize + 5 : 18;
    }

    return <View>
        <TouchableView disabled={this.props.disabled} underlayColor={Styles.common.underlayColor} onPress={this.props.onPress} onLongPress={this.props.onLongPress} delayLongPress={this.props.delayLongPress} viewStyle={[styles.container, {
        backgroundColor: this.context.theme?.colorWhite
      }, this.props.containerStyle, leftIconContainerStyle, extraContainerStyle, adaptedFontStyle]} {...getAccessibilityConfig({
        accessible: this.props.accessible,
        accessibilityRole: AccessibilityRoles.button,
        accessibilityLabel: this.props.accessibilityLabel,
        accessibilityHint: this.props.accessibilityHint,
        accessibilityState: {
          disabled: this.props.disabled
        }
      })}>
          {this.props.leftIcon ? <Image style={styles.leftIcon} source={this.props.leftIcon} /> : null}
          <View style={[styles.left]}>
            <View style={{
            flexDirection: 'row',
            paddingBottom: 1
          }}>
              <Text numberOfLines={titleLine} allowFontScaling={this.props.allowFontScaling} style={[Styles.common.title, this.props.useNewType ? {
              fontWeight: 'bold'
            } : {}, {
              lineHeight: titleHeight,
              color: this.context.theme?.colorBlack
            }, fontFamily, this.props.titleStyle, adaptedFontStyle]} {...getAccessibilityConfig({
              accessible: false
            })}>
                {this.props.title}
              </Text>
            </View>
            {this.props.subtitle ? <Text numberOfLines={subtitleLine} allowFontScaling={this.props.allowFontScaling} style={[Styles.common.subtitle, {
            lineHeight: subtitleHeight,
            color: this.context.theme?.colorGrayLighter
          }, this.props.subtitleStyle, adaptedFontStyle]} {...getAccessibilityConfig({
            accessible: false
          })}>
                  {this.props.subtitle}
                </Text> : null}
          </View>
          <View style={{
          width: 10
        }} />
          <View style={[styles.right, extraRightStyle]}>
            {this.props.value ? <Text numberOfLines={valueLine} allowFontScaling={this.props.allowFontScaling} ellipsizeMode="tail" style={[Styles.common.subtitle, {
            color: this.context.theme?.colorGrayLighter
          }, this.props.valueStyle, valueStyle, adaptedFontStyle]} {...getAccessibilityConfig({
            accessible: false
          })}>
                  {this.props.value}
                </Text> : null}
          </View>
          {this.props.showDot ? <Image style={[styles.dot, this.props.dotStyle]} resizeMode="contain" source={dot} /> : null}
          {!this.props.hideArrow ? <Image style={styles.icon} source={Images.common.right_arrow} /> : null}
        </TouchableView>
        {this.renderSeparator()}
      </View>;
  }

  renderSeparator() {
    if (!this.props.showSeparator || this.props.useNewType) return null;
    return this.props.separator || <Separator style={{
      marginLeft: Styles.common.padding
    }} />;
  }

}

const styles = StyleSheet.create({
  container: {
    width,
    height: THIN_HEIGHT,
    paddingHorizontal: PADDING,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  left: {
    flex: 1
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE
  },
  dot: {
    width: dotSize,
    height: dotSize
  },
  leftIcon: {
    resizeMode: 'contain',
    width: 56,
    height: 56,
    marginRight: 2
  }
});
export default ListItem;