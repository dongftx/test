/* eslint-disable  */
// @ts-nocheck
import PropTypes from 'prop-types';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import { Styles } from "../../resources";
import Checkbox from "../checkbox/Checkbox";
import AbstractDialog from "./AbstractDialog";
import { ConfigContext } from "../configProvider";
import InputView from "./InputView";
import { AccessibilityRoles, AccessibilityPropTypes, getAccessibilityConfig } from "../../utils/accessibility-helper";
import { referenceReport } from "../../decorators/reportDecorator";
const paddingHorizontal = 27; // 内容的左右边距

const paddingVertical = 28; // 内容的上下边距

const paddingTop = 9; // 输入框和下方内容的间距

const paddingBottom = 6; // 输入框和上方内容的间距

const {
  height,
  width
} = Dimensions.get('window');
/**
 * @description 输入弹窗的类型
 * @enum {string}
 */

const TYPE = {
  /**
   * 普通，只有输入框
   */
  SIMPLE: 'simple',

  /**
   * 输入框下方有下划线超链接
   */
  UNDERLINE: 'underline',

  /**
   * 输入框下方有勾选框和文字
   */
  CHECKBOX: 'checkbox',

  /**
   * 输入框下方有下划线超链接
   * 输入框下方有勾选框和文字
   */
  BOTH: 'both'
};
Object.freeze(TYPE);
/**
 * 输入框上方的数据 - Deprecated - 10045后必须使用新下划线样式(更改为输入框下方，并且不能添加左侧说明文字）
 * @typedef {Object} UnderlineData
 * @property {boolean} useNewTheme - 10045新增-之后*必须*使用新下划线样式
 * @property {string} leftText - 左侧说明文字
 * @property {number} leftTextNumberOfLines - 10040新增 左侧文字 默认为1
 * @property {ViewPropTypes.style} leftTextStyle - 10040新增 左侧文字的样式
 * @property {string} underlineText - 右侧下划线文字
 * @property {number} underlineTextNumberOfLines - 10040新增 右侧下划线文字能够显示的行数 默认为1
 * @property {ViewPropTypes.style} underlineTextStyle - 10040新增 右侧下划线文字的样式
 * @property {function} onPress - 点击下划线文字的回调函数
 */

/**
 * 输入框
 * @typedef {Object} Input
 * @property {string} placeholder - 占位文字，参考 https://facebook.github.io/react-native/docs/0.54/textinput#placeholder
 * @property {string} defaultValue - 初始默认文字，参考 https://facebook.github.io/react-native/docs/0.54/textinput#defaultvalue
 * @property {function} onChangeText - 文字变化回调，参考 https://facebook.github.io/react-native/docs/0.54/textinput#onchangetext
 * @property {Object} textInputProps - 其他 TextInput 支持的属性，参考 https://facebook.github.io/react-native/docs/0.54/textinput#props
 * @property {boolean} isCorrect - 10045新增 输入框的结果 - 输入框边框变红，下方显示红色警示文字
 */

/**
 * 勾选框相关数据
 * @typedef {Object} CheckboxData
 * @property {boolean} checked - 勾选框的初始勾选状态
 * @property {string} text - 勾选框右侧的说明文字
 * @property {number} numberOfLines - 10040新增 勾选框右侧的说明文字能够显示的行数  默认为1
 * @property {ViewPropTypes.style} textStyle - 10040新增 勾选框右侧说明文字的样式
 */

/**
 * 按钮
 * @typedef {Object} Button
 * @property {string} text - 按钮的文字
 * @property {style} style - 按钮的样式
 * @property {bool} allowFontScaling - 10040新增 text是否支持大字体显示，即是否随系统字体大小变化而变化, 默认`true`
 * @property {number} numberOfLines - 10040新增 text文字的行数， 默认 undefined (兼容旧版)
 * @property {function} callback - 点击按钮的回调函数
 * @property {object} backgroundColor - 10045新增 自定义按钮背景颜色 { bgColorNormal: string; bgColorPressed: string }
 * @property {string} titleColor - 10045新增 文字颜色
 */

/**
 * @export
 * @author Geeook
 * @since 10021
 * @module InputDialog
 * @description 输入弹窗，提示用户录入信息并记录。输入框弹窗的业务场景有时候会很复杂，如果本组件无法满足你的业务需求，请使用 `AbstractDialog` 参考本组件源码自行实现
 * @param {string} animationType - modal 显示动效, 默认`'fade'`，参考 https://facebook.github.io/react-native/docs/0.54/modal#animationtype
 * @param {bool} visible - 是否显示 modal, 默认`false`，参考 https://facebook.github.io/react-native/docs/0.54/modal#visible
 * @param {TYPE} type - 输入弹窗的类型。是否只有输入框，输入框上方是否有下划线超链接，输入框下方是否有勾选项，详见 `TYPE`，默认 `TYPE.SIMPLE`
 * @param {string} color - 下划线超链接的文字颜色 / 勾选框的勾选颜色，默认米家绿
 * @param {string} title - 标题文字
 * @param {UnderlineData} underlineData - 输入框上方的数据，包括左侧说明文字，右侧下划线文字及其点击回调函数，只对 `TYPE.UNDERLINE` 和 `TYPE.BOTH` 有效
 * @param {Input[]} inputs - 输入框数组，定义输入框的属性，对所有的 `TYPE` 有效
 * @param {CheckboxData} checkboxData - 输入框下方的数据，包括勾选状态，描述文字，只对 `TYPE.CHECKBOX` 和 `TYPE.BOTH` 有效
 * @param {Button[]} buttons - 按钮数组，定义底部按钮的属性，只能显示1～2个按钮，多传将失效。默认左取消右确定，左灰右绿，点击回调都是隐藏 Modal
 * @param {Object} dialogStyle - 10040新增 控制dialog 一些特有的样式
 * @param {bool} dialogStyle.allowFontScaling - 10040新增 dialog中text是否支持大字体显示，即是否随系统字体大小变化而变化, 默认`true`
 * @param {number} dialogStyle.titleNumberOfLines - 10040新增 控制title 文字的行数， 默认 1行
 * @param {bool} dialogStyle.unlimitedHeightEnable - 10040新增 设置控件高度是否自适应。 默认为false，即默认高度
 * @param {ViewPropTypes.style} dialogStyle.titleStyle - 10040新增 控制title 文字的样式
 * @param {function} onDismiss - Modal 隐藏时的回调函数
 * @param {boolean} isCorrect - 10045新增 弹窗的结果 - 副标题下会显示红色警示文字
 * @param {string} warnText - 10045新增 副标题下的红色警示文字
 * @param {string} inputWarnText  10045新增 输入框下的红色警示文字
 */

class InputDialog extends React.Component {
  static contextType = ConfigContext;
  static propTypes = {
    animationType: PropTypes.string,
    visible: PropTypes.bool,
    type: PropTypes.oneOf([TYPE.SIMPLE, TYPE.UNDERLINE, TYPE.CHECKBOX, TYPE.BOTH]),
    color: PropTypes.string,
    title: PropTypes.string,
    dialogStyle: PropTypes.object,
    extra: PropTypes.object,
    underlineData: PropTypes.shape({
      useNewTheme: PropTypes.bool,
      leftText: PropTypes.string,
      underlineText: PropTypes.string,
      onPress: PropTypes.func,
      accessibilityLabel: AccessibilityPropTypes.accessibilityLabel,
      accessibilityHint: AccessibilityPropTypes.accessibilityHint
    }),
    inputs: PropTypes.arrayOf(PropTypes.shape({
      placeholder: PropTypes.string,
      defaultValue: PropTypes.string,
      onChangeText: PropTypes.func,
      textInputProps: PropTypes.object,
      accessibilityLabel: AccessibilityPropTypes.accessibilityLabel,
      accessibilityHint: AccessibilityPropTypes.accessibilityHint
    })),
    checkboxData: PropTypes.shape({
      checked: PropTypes.bool,
      text: PropTypes.string,
      accessibilityLabel: AccessibilityPropTypes.accessibilityLabel,
      accessibilityHint: AccessibilityPropTypes.accessibilityHint
    }),
    buttons: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string,
      style: PropTypes.any,
      callback: PropTypes.func,
      accessibilityLabel: AccessibilityPropTypes.accessibilityLabel,
      accessibilityHint: AccessibilityPropTypes.accessibilityHint
    })),
    onDismiss: PropTypes.func,
    accessible: AccessibilityPropTypes.accessible,
    isCorrect: PropTypes.bool,
    inputWarnText: PropTypes.string,
    warnText: PropTypes.string
  };
  static defaultProps = {
    type: TYPE.SIMPLE,
    color: Styles.common.MHGreen,
    underlineData: {},
    checkboxData: {},
    dialogStyle: {
      allowFontScaling: true,
      unlimitedHeightEnable: false,
      titleNumberOfLines: 1,
      titleStyle: {}
    },
    buttons: [{
      text: '取消'
    }, {
      text: '确定'
    }],
    inputs: [{
      placeholder: '自定义占位字符',
      defaultValue: '',
      // type: InputView.TYPE.DELETE,
      textInputProps: {
        autoFocus: true
      }
    }],
    isCorrect: true,
    inputWarnText: '输入错误',
    warnText: '结果错误'
  };
  /**
   * @description 输入弹窗的类型
   * @enum {string}
   */

  static TYPE = TYPE;

  constructor(props, context) {
    super(props, context);
    referenceReport('InputDialog');
    this.state = {
      checked: props.checkboxData.checked || false,
      disButton: true
    };
    this.textInputArray = [];
    this.process(props);
  }

  UNSAFE_componentWillReceiveProps(props) {
    this.setState({
      checked: props.checkboxData.checked || false
    });
    this.processButton(props);
  }

  componentDidUpdate(prevProps) {
    // 外部设置visible为fasle，清空textInputArray缓存并禁用Button
    if (prevProps.visible && !this.props.visible) {
      this.textInputArray = [];
      this.setState({
        disButton: true
      });
    }
  }

  processButton(props) {
    // 拦截确认按钮的回调函数，传入 InputDialog 的一些信息
    const buttons = props.buttons;

    if (buttons instanceof Array) {
      const button = buttons[buttons.length - 1];

      if (button && button.callback) {
        const callbackOrigin = button.callback;

        button.callback = () => {
          callbackOrigin({
            hasPressUnderlineText: this.hasPressUnderlineText,
            checked: this.state.checked,
            textInputArray: this.textInputArray
          });
        };
      }
    }

    this.buttons = buttons;
    this.hasPressUnderlineText = false;
  }

  process(props) {
    // 拦截 onChangeText，记录输入文字
    let inputs = props.inputs;

    if (props.inputs === null || props.inputs === undefined) {
      inputs = [{
        defaultValue: '',
        textInputProps: {
          autoFocus: true
        }
      }];
    }

    for (let i = 0; i < inputs.length; i++) {
      let input = inputs[i];

      if (input !== undefined) {
        this.textInputArray.push(input.defaultValue || '');
        const onChangeTextOrigin = input.onChangeText;

        input.onChangeText = text => {
          this._onChangeText(text, i);

          if (onChangeTextOrigin instanceof Function) {
            onChangeTextOrigin(text);
          }
        };
      }
    }

    this.inputs = inputs; // this.state.checked = props.checkboxData.checked || false;
    // this.setState({
    //   checked: props.checkboxData.checked || false
    // });

    this.processButton(props);
  }
  /**
   * 判断是否有输入内容
   */


  checktextInputArray(arr) {
    let result = false;
    arr.forEach(element => {
      if (element === '' || typeof element === undefined || element === null) result = true;
    });
    return result;
  }
  /**
   * 拦截onChangeText事件，记录输入值
   */


  _onChangeText(text, index) {
    this.textInputArray[index] = text;
    let r = this.checktextInputArray(this.textInputArray);
    if (r !== this.state.disButton) this.setState({
      disButton: r
    });
  }
  /**
   * 输入框上方的文字说明和下划线超链接 - 10045 Deprecated
   */


  renderUpExtra() {
    if ((this.props.type === TYPE.BOTH || this.props.type === TYPE.UNDERLINE) && !this.props.underlineData.useNewTheme) {
      const {
        leftText,
        underlineText,
        accessibilityLabel,
        accessibilityHint
      } = this.props.underlineData;
      let leftTextNumberOfLines = 1;
      let underlineTextNumberOfLines = 1;

      if (this.props.underlineData && this.props.underlineData.hasOwnProperty('leftTextNumberOfLines')) {
        leftTextNumberOfLines = this.props.underlineData.leftTextNumberOfLines;
      }

      if (this.props.underlineData && this.props.underlineData.hasOwnProperty('underlineTextNumberOfLines')) {
        underlineTextNumberOfLines = this.props.underlineData.underlineTextNumberOfLines;
      }

      return <View style={[styles.underlineContainer, {
        paddingBottom: 5,
        paddingTop: 0
      }]}>
          <Text numberOfLines={leftTextNumberOfLines} allowFontScaling={this.props.dialogStyle.allowFontScaling} style={[styles.label, this.props.underlineData.leftTextStyle]} {...getAccessibilityConfig({
          accessible: this.props.accessible,
          accessibilityRole: AccessibilityRoles.text
        })}>
            {leftText || ''}
          </Text>
          <Text style={[styles.underlineText, {
          color: this.props.color
        }, this.props.underlineData.underlineTextStyle]} numberOfLines={underlineTextNumberOfLines} allowFontScaling={this.props.dialogStyle.allowFontScaling} onPress={() => this.onPressUnderlineText()} {...getAccessibilityConfig({
          accessible: this.props.accessible,
          accessibilityRole: AccessibilityRoles.link,
          accessibilityLabel,
          accessibilityHint
        })}>
            {underlineText || ''}
          </Text>
        </View>;
    }

    return null;
  }
  /**
   * 输入框下方的下划线超链接 
   */


  renderDownUnderline() {
    if ((this.props.type === TYPE.BOTH || this.props.type === TYPE.UNDERLINE) && this.props.underlineData.useNewTheme) {
      const {
        underlineText,
        accessibilityLabel,
        accessibilityHint
      } = this.props.underlineData;
      let underlineTextNumberOfLines = 1;

      if (this.props.underlineData && this.props.underlineData.hasOwnProperty('underlineTextNumberOfLines')) {
        underlineTextNumberOfLines = this.props.underlineData.underlineTextNumberOfLines;
      }

      return <View style={[styles.underlineContainer]}>
          <Text style={[styles.underlineText, {
          color: this.props.color,
          textAlign: 'left'
        }, this.props.underlineData.underlineTextStyle]} numberOfLines={underlineTextNumberOfLines} allowFontScaling={this.props.dialogStyle.allowFontScaling} onPress={() => this.onPressUnderlineText()} {...getAccessibilityConfig({
          accessible: this.props.accessible,
          accessibilityRole: AccessibilityRoles.link,
          accessibilityLabel,
          accessibilityHint
        })}>
            {underlineText || ''}
          </Text>
        </View>;
    }

    return null;
  }
  /**
   * 警示文字
   */


  renderWarnText() {
    return <Text style={[styles.inputWarnText]} // numberOfLines={leftTextNumberOfLines}
    allowFontScaling={this.props.dialogStyle.allowFontScaling} {...getAccessibilityConfig({
      accessible: this.props.accessible,
      accessibilityRole: AccessibilityRoles.text
    })}>
        {this.props.inputWarnText}
      </Text>;
  }
  /**
   * 单个输入框
   */


  renderInputView(input, index) {
    if (input === undefined) return null;
    const {
      accessibilityLabel,
      accessibilityHint
    } = input;
    const marginTop = index === 0 ? 0 : 7; //input.onChangeText = this.inputs[index].onChangeText;
    //fix 绿米

    const onChangeTextOrigin = input.onChangeText;

    input.onChangeText = text => {
      this._onChangeText(text, index);

      if (onChangeTextOrigin instanceof Function) {
        onChangeTextOrigin(text);
      }
    };

    return <InputView key={index + (input.placeholder || '')} style={{
      marginTop
    }} placeholder={input.placeholder || ''} onChangeText={input.onChangeText} defaultValue={input.defaultValue || ''} textInputProps={input.textInputProps || {}} type={input.type} isCorrect={input.isCorrect} {...getAccessibilityConfig({
      accessible: this.props.accessible,
      accessibilityLabel,
      accessibilityHint
    })} />;
  }
  /**
   * 一组输入框
   */


  renderInputGroup() {
    const input0 = this.props.inputs ? this.props.inputs[0] : [{
      defaultValue: '',
      textInputProps: {
        autoFocus: true
      }
    }];
    const input1 = this.props.inputs ? this.props.inputs.length > 1 ? this.props.inputs[1] : undefined : undefined;
    return <View flexDirection={'column'} alignItems={'center'} justifyContent={'center'} backgroundColor='white'>
      {this.renderInputView(input0, 0)}
      {input0.hasOwnProperty('isCorrect') && !input0.isCorrect ? this.renderWarnText() : null}
      {this.renderInputView(input1, 1)}
    </View>;
  }
  /**
   * 输入框下方的勾选框和文字
   */


  renderDownExtra() {
    if (this.props.type === TYPE.BOTH || this.props.type === TYPE.CHECKBOX) {
      const {
        text,
        accessibilityLabel,
        accessibilityHint
      } = this.props.checkboxData;
      let numberOfLines = 1;

      if (this.props.checkboxData && this.props.checkboxData.hasOwnProperty('numberOfLines')) {
        numberOfLines = this.props.checkboxData.numberOfLines;
      }

      return <TouchableOpacity onPress={() => this.onPressCheckbox()} activeOpacity={1} style={{
        paddingTop,
        backgroundColor: 'white',
        marginHorizontal: 13
      }} {...getAccessibilityConfig({
        accessible: this.props.accessible,
        accessibilityRole: AccessibilityRoles.checkbox,
        accessibilityLabel: accessibilityLabel || text,
        accessibilityHint,
        accessibilityState: {
          disabled: false,
          checked: this.state.checked
        }
      })}>
          <View style={[styles.checkboxContainer, {
          backgroundColor: 'white'
        }]}>
            <Checkbox checked={this.state.checked} checkedColor={this.props.color} style={{
            width: 22,
            height: 22,
            borderRadius: 11
          }} onValueChange={checked => {
            this.setState({
              checked
            });
          }} />
            <Text style={[styles.checkboxText, this.props.checkboxData.textStyle]} numberOfLines={numberOfLines} allowFontScaling={this.props.dialogStyle.allowFontScaling}>
              {text || ''}
            </Text>
          </View>
        </TouchableOpacity>;
    }

    return null;
  }

  render() {
    if (!this.props.visible) return null;
    const buttons = this.buttons;

    if (buttons instanceof Array) {
      let button = buttons[buttons.length - 1];
      button.disabled = this.state.disButton;
      button.colorType = this.state.disButton ? 'grayLayerBlack' : 'blueLayerWhite';
    }

    const absDialogStyle = Platform.OS === 'ios' ? {
      bottom: ~~(height * 0.45),
      borderRadius: 20,
      marginHorizontal: 10,
      width: width - 20
    } : {};
    return <AbstractDialog animationType={this.props.animationType} visible={this.props.visible} title={this.props.title} buttons={this.buttons} dialogStyle={this.props.dialogStyle} onDismiss={() => this._onDismiss()} showSubtitle={!this.props.isCorrect} subtitle={this.props.warnText} useNewTheme dialogStyle={{
      subTitleStyle: {
        color: '#F43F31',
        fontSize: 14,
        lineHeight: 19
      }
    }} style={absDialogStyle} {...getAccessibilityConfig({
      accessible: this.props.accessible
    })}>
        <View style={[styles.container]}>
          {this.renderUpExtra()}
          {this.renderInputGroup()}
          {this.renderDownUnderline()}
          {this.renderDownExtra()}
        </View>
      </AbstractDialog>;
  }

  _onDismiss() {
    this.props.onDismiss && this.props.onDismiss();
    this.setState({
      disButton: true
    });
  }

  onPressUnderlineText() {
    this.hasPressUnderlineText = true;
    const {
      onPress
    } = this.props.underlineData;
    onPress && onPress();
  }

  onPressCheckbox() {
    this.setState({
      checked: !this.state.checked
    });
  }

}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal,
    paddingBottom: paddingVertical,
    backgroundColor: 'transparent',
    borderRadius: Styles.dialog.modal.borderRadius
  },
  underlineContainer: {
    marginHorizontal: 13,
    paddingTop,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  label: {
    fontSize: 14,
    lineHeight: 19,
    color: 'rgba(0,0,0,0.8)',
    flex: 1
  },
  underlineText: {
    flex: 1,
    textAlign: 'right',
    lineHeight: 19,
    textDecorationLine: 'underline',
    fontSize: 14
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkboxText: {
    flex: 1,
    marginLeft: 7,
    fontSize: 14,
    lineHeight: 19,
    color: '#999'
  },
  inputWarnText: {
    color: '#F43F31',
    alignSelf: 'flex-start',
    marginHorizontal: 16,
    marginTop: 9,
    fontSize: 14,
    lineHeight: 19,
    flex: 1
  }
});
export default InputDialog;