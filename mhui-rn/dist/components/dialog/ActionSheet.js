/* eslint-disable  */
// @ts-nocheck
import PropTypes from 'prop-types';
import React from 'react';
import { FlatList } from 'react-native';
import ChoiceItem from "../listItem/ChoiceItem";
import AbstractDialog from "./AbstractDialog";
import { AccessibilityPropTypes, AccessibilityRoles, getAccessibilityConfig } from "../../utils/accessibility-helper";
import { referenceReport } from "../../decorators/reportDecorator";
/**
 * 可点击的选项
 * @typedef {Object} Opiton
 * @property {string} title - 主文案
 * @property {string} subtitle - 副文案
 * @property {function} onPress - 点击回调函数
 */

/**
 * 按钮
 * @typedef {Object} Button
 * @property {string} text - 按钮的文字
 * @property {style} style - 按钮的样式
 * @property {bool} allowFontScaling - text是否支持大字体显示，即是否随系统字体大小变化而变化, 默认`true`
 * @property {number} numberOfLines - text文字的行数， 默认 undefined (兼容旧版)
 * @property {function} callback - 点击按钮的回调函数
 * @property {object} backgroundColor - 10045新增 自定义按钮背景颜色 { bgColorNormal: string; bgColorPressed: string }
 * @property {string} titleColor - 10045新增 文字颜色
 */

/**
 * @export
 * @author Geeook
 * @since 10022
 * @module ActionSheet
 * @description 选项弹窗，无选择态，点击后弹窗消失
 * @param {string} animationType - modal 显示动效, 默认`'fade'`，参考 https://facebook.github.io/react-native/docs/0.54/modal#animationtype
 * @param {bool} visible - 是否显示 modal, 默认`false`，参考 https://facebook.github.io/react-native/docs/0.54/modal#visible
 * @param {Opiton[]} options - 可点击的选项
 * @param {Button[]} buttons - 按钮数组，定义底部按钮的属性，只能显示1～2个按钮，多传将失效。默认左取消右确定，左灰右蓝，点击回调都是隐藏 Modal
 * @param {Object} dialogStyle - 控制dialog 一些特有的样式
 * @param {bool} dialogStyle.allowFontScaling - dialog中text是否支持大字体显示，即是否随系统字体大小变化而变化, 默认`true`
 * @param {bool} dialogStyle.unlimitedHeightEnable - 设置控件高度是否自适应。 默认为false，即默认高度
 * @param {style} dialogStyle.itemTitleStyle - 控制item  title 样式
 * @param {style} dialogStyle.itemSubtitleStyle - 控制item  subtitle 样式
 * @param {bool} dialogStyle.itemTitleNumberOfLines - 控制item  title 行数 默认为1
 * @param {bool} dialogStyle.itemSubtitleNumberOfLines - 控制item  subtitle 行数 默认为1
 * @param {function} onDismiss - Modal 隐藏时的回调函数
 * @param {bool} canDismiss - 点击背景时是否隐藏，默认ture
 * @param {string} title - 标题
 */

class ActionSheet extends React.Component {
  static propTypes = {
    animationType: PropTypes.string,
    visible: PropTypes.bool,
    dialogStyle: PropTypes.object,
    options: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      subtitle: PropTypes.string,
      onPress: PropTypes.func,
      accessibilityLabel: AccessibilityPropTypes.accessibilityLabel,
      accessibilityHint: AccessibilityPropTypes.accessibilityHint
    })),
    buttons: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string,
      style: PropTypes.any,
      callback: PropTypes.func,
      accessibilityLabel: AccessibilityPropTypes.accessibilityLabel,
      accessibilityHint: AccessibilityPropTypes.accessibilityHint
    })),
    onDismiss: PropTypes.func,
    canDismiss: PropTypes.bool,
    accessible: AccessibilityPropTypes.accessible
  };
  static defaultProps = {
    options: [],
    canDismiss: true,
    dialogStyle: {
      allowFontScaling: true,
      unlimitedHeightEnable: false,
      itemTitleStyle: {},
      itemSubtitleStyle: {},
      itemTitleNumberOfLines: 1,
      itemSubtitleNumberOfLines: 1
    }
  };

  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.visible !== this.state.visible) {
      this.setState({
        visible: newProps.visible
      });
    }
  }

  constructor(props, context) {
    super(props, context);
    referenceReport('ActionSheet');
    this.state = {
      visible: props.visible
    };
  }

  renderItem(item) {
    return <ChoiceItem title={item.title || ''} titleStyle={[{
      textAlign: 'left',
      fontSize: 16,
      color: '#000000',
      fontWeight: 'bold',
      lineHeight: 22,
      fontFamily: 'MILanPro_MEDIUM--GB1-4',
      marginLeft: 30
    }, this.props.dialogStyle.itemTitleStyle]} subtitle={item.subtitle || ''} subtitleStyle={[{
      textAlign: 'left',
      marginLeft: 30
    }, this.props.dialogStyle.itemSubtitleStyle]} allowFontScaling={this.props.dialogStyle.allowFontScaling} unlimitedHeightEnable={this.props.dialogStyle.unlimitedHeightEnable} titleNumberOfLines={this.props.dialogStyle.itemTitleNumberOfLines} subtitleNumberOfLines={this.props.dialogStyle.itemSubtitleNumberOfLines} onPress={() => this._onPress(item.onPress)} {...getAccessibilityConfig({
      accessible: this.props.accessible,
      accessibilityRole: AccessibilityRoles.button,
      accessibilityLabel: item.accessibilityLabel,
      accessibilityHint: item.accessibilityHint
    })} />;
  }

  render() {
    const showTitle = !!this.props.title;
    const paddingTop = showTitle ? 0 : 14; // 有标题的时候，去掉顶部边距

    const maxHeight = this.props.options && this.props.options[0] && this.props.options[0].subtitle ? 576 : 594;
    return <AbstractDialog animationType={this.props.animationType} visible={this.state.visible} dialogStyle={this.props.dialogStyle} showTitle={showTitle} title={this.props.title} buttons={this.props.buttons} onDismiss={() => this._onDismiss()} useNewTheme canDismiss={this.props.canDismiss} {...getAccessibilityConfig({
      accessible: this.props.accessible
    })}>
        <FlatList style={{
        marginBottom: 16,
        paddingTop,
        maxHeight
      }} data={this.props.options} renderItem={({
        item
      }) => this.renderItem(item)} keyExtractor={(item, index) => (item.title || '') + index}>
        </FlatList>
      </AbstractDialog>;
  }

  _onPress(callback) {
    callback && callback();
    this.setState({
      visible: false
    });

    this._onDismiss();
  }

  _onDismiss() {
    this.props.onDismiss && this.props.onDismiss();
  }

}

export default ActionSheet;