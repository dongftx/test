/* eslint-disable import/no-unresolved */
// @ts-nocheck
import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { RkTextInput, RkTheme } from 'react-native-ui-kitten';
import { getAccessibilityConfig } from "../../utils/accessibility-helper";
import { Icons } from "../../resources/Icons";
import { FontLantingProMedium } from "../../constants/font";
import { ConfigContext } from "../configProvider";
/**
 * @description 输入框的类型,两者不可同时出现
 * @enum {string}
 */

export const TYPE = {
  /** 右侧有删除 */
  DELETE: 'DELETE',

  /** 右侧有密码眼睛 */
  SECURE: 'SECURE',

  /** 右侧无图案 */
  NONE: 'NONE'
};
Object.freeze(TYPE);
/**
 * @export
 * @author Zeng Xiangheng
 * @since 10042
 * @description 带删除键,密码遮挡,边框高亮的输入框
 * @typedef {Object} Input
 * @param {string} type - 输入框的类型
 * @param {boolean} isCorrect - 判断内容是否有误，有红色边框警示
 * @param {string} placeholder - 占位文字，参考 https://facebook.github.io/react-native/docs/0.54/textinput#placeholder
 * @param {string} defaultValue - 初始默认文字，参考 https://facebook.github.io/react-native/docs/0.54/textinput#defaultvalue
 * @param {function} onChangeText - 文字变化回调，参考 https://facebook.github.io/react-native/docs/0.54/textinput#onchangetext
 * @param {TextInputProps} textInputProps - 其他 TextInput 支持的属性，参考 https://facebook.github.io/react-native/docs/0.54/textinput#props
 * @param {ViewStyle} style - 输入框的样式
 */

class InputView extends React.Component {
  static TYPE = TYPE;
  static contextType = ConfigContext;
  static defaultProps = {
    type: TYPE.NONE,
    placeholder: '自定义占位字符',
    defaultValue: '自定义默认值',
    textInputProps: {
      autoFocus: true
    },
    isCorrect: true
  };

  constructor(props) {
    super(props);
    this.state = {
      inputValue: this.props.defaultValue || '',
      secureState: false,
      isFocused: false
    };
    this._onChange = this._onChange.bind(this);
    this._onFocus = this._onFocus.bind(this);
  }

  _onChange(changeText) {
    this.setState({
      inputValue: changeText
    });

    if (this.props.onChangeText) {
      const onChangeTextOrigin = this.props.onChangeText;

      if (onChangeTextOrigin instanceof Function) {
        onChangeTextOrigin(changeText);
      }
    } // 兼容绿米错误写法，之后删


    if (this.props?.textInputProps?.onChangeText) {
      const onChangeTextOrigin = this.props.textInputProps.onChangeText;

      if (onChangeTextOrigin instanceof Function) {
        onChangeTextOrigin(changeText);
      }
    }
  }

  _onFocus() {
    this.setState(prevState => ({
      isFocused: !prevState.isFocused
    }));
  }
  /** 右侧删除按钮 */


  _renderRightDeleteButtonView() {
    return <TouchableOpacity style={styles.touchStyle} onPress={() => {
      this._onChange('');
    }}>
          <Image style={{
        height: 25,
        width: 25
      }} source={Icons.inputDelete} />
        </TouchableOpacity>;
  }
  /** 密码保护按钮  */


  _renderRightSecureButtonView() {
    const source = this.state.secureState ? Icons.inputEyeSecure : Icons.inputEye;
    return <TouchableOpacity style={styles.touchStyle} activeOpacity={1} onPress={() => {
      this.setState(prevState => ({
        secureState: !prevState.secureState
      }));
    }}>
          <Image style={{
        height: 20,
        width: 20
      }} source={source} />
        </TouchableOpacity>;
  }

  _notNull(str) {
    let result = false;

    if (str === '' || str === undefined) {
      result = false;
    }

    if (str.length > 0) {
      result = true;
    }

    return result;
  }

  render() {
    const {
      inputValue,
      secureState,
      isFocused
    } = this.state;
    const {
      type,
      isCorrect
    } = this.props;
    let borderColor = isFocused && this._notNull(inputValue) ? String(this.context.theme?.colorBtnGreenNor) : 'transparent';
    RkTheme.setType('RkTextInput', 'textinput', {
      input: {
        marginVertical: 0,
        color: this.context.theme?.colorBlack,
        marginLeft: 0,
        fontSize: 16,
        fontFamily: FontLantingProMedium
      },
      marginLeft: 16,
      flex: 1,
      underlineWidth: 0,
      marginVertical: 0,
      placeholderTextColor: this.props.textInputProps?.placeholderTextColor || this.context.theme?.colorPlaceHolder,
      minHeight: 40,
      // maxWidth: 282,
      borderRadius: 10
    }); // 错误红色边框

    if (!isCorrect) {
      borderColor = String(this.context.theme?.colorWarn);
    }

    if (type === TYPE.DELETE) {
      this.renderRight = this._renderRightDeleteButtonView();
    } else if (type === TYPE.SECURE) {
      this.renderRight = this._renderRightSecureButtonView();
    } else {
      this.renderRight = null;
    }

    const textInput = <RkTextInput placeholder={this.props.placeholder} value={inputValue} {...this.props.textInputProps || {}} onChangeText={this._onChange} secureTextEntry={secureState} onFocus={this._onFocus} onBlur={this._onFocus} selectionColor={String(this.context.theme?.colorBtnGreenNor)} rkType="textinput" {...getAccessibilityConfig({ ...this.props
    })} />;
    return <View style={[styles.containerPink, this.props.style, {
      borderColor: !isCorrect ? String(this.context.theme?.colorInputBorder) : 'transparent'
    }]}>
          <View style={[styles.container, {
        borderColor,
        flex: 1,
        backgroundColor: String(this.context.theme?.colorInputBackground)
      }]}>
            {textInput}
            {this.renderRight}
          </View>
        </View>;
  }

}

const styles = StyleSheet.create({
  container: {
    // 内边框
    flexDirection: 'row',
    height: 48,
    // maxWidth: 340,
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 10,
    borderWidth: 2
  },
  containerPink: {
    // 外阴影
    flexDirection: 'row',
    height: 54,
    // maxWidth: 344,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 3
  },
  touchStyle: {
    marginHorizontal: 10,
    height: 22,
    width: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
export default InputView;