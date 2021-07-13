/* eslint-disable  */
// @ts-nocheck
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { BallIndicator } from 'react-native-indicators';
import { Styles } from "../../resources";
import AbstractDialog from "./AbstractDialog";
import { ConfigContext } from "../configProvider";
import { AccessibilityPropTypes, AccessibilityRoles, getAccessibilityConfig } from "../../utils/accessibility-helper";
import { referenceReport } from "../../decorators/reportDecorator";
import { Icons } from "../../resources/Icons";
/**
 * @export
 * @author Geeook
 * @since 10021
 * @module LoadingDialog
 * @description 加载弹窗，显示加载旋转动画和提示信息
 * @param {string} animationType - modal 显示动效, 默认`'fade'`，参考 https://facebook.github.io/react-native/docs/0.54/modal#animationtype
 * @param {bool} visible - 是否显示 modal, 默认`false`，参考 https://facebook.github.io/react-native/docs/0.54/modal#visible
 * @param {string} message - 显示文字
 * @param {number} timeout - Modal 隐藏的超时时间，如果不主动设置隐藏的话
 * @param {Object} dialogStyle - 10040新增 控制dialog 一些特有的样式
 * @param {bool} dialogStyle.allowFontScaling - 10040新增 dialog中text是否支持大字体显示，即是否随系统字体大小变化而变化, 默认`true`
 * @param {number} dialogStyle.textNumberOfLines - 10040新增 控制message 文字的行数， 默认 undefined (兼容旧版)
 * @param {bool} dialogStyle.unlimitedHeightEnable - 10040新增 设置控件高度是否自适应。 默认为false，即默认高度
 * @param {ViewPropTypes.style} dialogStyle.messageStyle - 10040新增 控制message 文字的样式
 * @param {function} onDismiss - Modal隐藏时的回调函数
 */

class LoadingDialog extends React.Component {
  static contextType = ConfigContext;
  static propTypes = {
    animationType: PropTypes.string,
    visible: PropTypes.bool,
    message: PropTypes.string,
    timeout: PropTypes.number,
    dialogStyle: PropTypes.object,
    onDismiss: PropTypes.func,
    accessible: AccessibilityPropTypes.accessible
  };
  static defaultProps = {
    dialogStyle: {
      allowFontScaling: true,
      unlimitedHeightEnable: false,
      messageStyle: {}
    }
  };

  constructor(props, context) {
    super(props, context);
    referenceReport('LoadingDialog');
    this.state = {
      visible: this.props.visible,
      rotate: new Animated.Value(0)
    };
    this.uselesscode = BallIndicator;
  }

  componentDidMount() {
    this.onShowView();
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.visible !== this.state.visible) {
      this.setState({
        visible: newProps.visible
      });
    }
  }

  onShowView = () => {
    this.state.rotate.setValue(0);
    Animated.timing(this.state.rotate, {
      toValue: 1,
      useNativeDriver: true,
      duration: 1000
    }).start(() => this.onShowView());
  };

  render() {
    const timeout = this.props.timeout;
    let paddingTop = 25;

    if (timeout && typeof parseInt(timeout) === 'number') {
      if (!this.state.visible) {
        this.timer = null;
        clearTimeout(this.timer);
      } else if (!this.timer) {
        this.timer = setTimeout(() => {
          this.setState({
            visible: false
          });
          this.props.onDismiss && this.props.onDismiss();
        }, parseInt(timeout));
      }
    }

    const pic = this.context.colorScheme === 'dark' ? Icons.loadingPicDark : Icons.loadingPicLight;
    const imageView = <Animated.Image source={pic} style={{
      marginLeft: 1,
      backgroundColor: 'transparent',
      width: 20,
      height: 20,
      transform: [{
        rotate: this.state.rotate.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg']
        })
      }]
    }} />;
    const heightStyle = {
      height: styles.container.height,
      minHeight: styles.container.height
    };

    if (this.props.dialogStyle && this.props.dialogStyle.hasOwnProperty('textNumberOfLines')) {
      if (this.props.dialogStyle.textNumberOfLines > 1) {
        heightStyle.height = null;
      }
    }

    if (this.props.dialogStyle && this.props.dialogStyle.unlimitedHeightEnable) {
      heightStyle.height = null;
    }

    return <AbstractDialog animationType={this.props.animationType} visible={this.state.visible} showTitle={false} canDismiss={false} showButton={false} accessible={this.props.accessible} useNewTheme>
        <View style={[styles.container, heightStyle, {
        paddingTop
      }]} {...getAccessibilityConfig({
        accessible: this.props.accessible,
        accessibilityRole: AccessibilityRoles.text
      })}>
          {
          /* <BallIndicator
           style={styles.indicator}
           color={this.context.theme?.colorGrayHeavier}
           size={20}
          /> */
        }
          {imageView}
          <Text style={[styles.message, this.props.dialogStyle.messageStyle]} allowFontScaling={this.props.dialogStyle.allowFontScaling} numberOfLines={this.props.dialogStyle.textNumberOfLines}>
            {this.props.message || ''}
          </Text>
        </View>
      </AbstractDialog>;
  }

  componentWillUnmount() {
    this.timer = null;
    clearTimeout(this.timer);
  }

}

const styles = StyleSheet.create({
  container: {
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 27,
    borderTopEndRadius: Styles.dialog.modal.borderTopEndRadius,
    borderTopStartRadius: Styles.dialog.modal.borderTopStartRadius
  },
  // indicator: {
  //   position: 'absolute',
  //   left: 27,
  //   height: 20,
  // },
  message: {
    marginLeft: 15,
    flex: 1,
    fontSize: 16,
    color: '#333333'
  }
});
export default LoadingDialog;