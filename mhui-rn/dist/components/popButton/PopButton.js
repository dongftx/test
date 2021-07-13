import React, { useContext } from 'react';
import { StyleSheet, TouchableHighlight, View, Text } from 'react-native';
import { getAccessibilityConfig } from "../../utils/accessibility-helper";
import { ConfigContext } from "../configProvider";
import { FontLantingProMedium } from "../../constants/font";
/**
 * @description 按钮的颜色类型，只在regular和medium按钮上使用
 * @enum {string}
 */

export const COLORTYPE = {
  /** 蓝底白字 */
  BLUELAYERWHITE: 'blueLayerWhite',

  /** 灰底黑字 */
  GRAYLAYERBLACK: 'grayLayerBlack',

  /** 灰底蓝字 */
  GRAYLAYERBLUE: 'grayLayerBlue'
};
Object.freeze(COLORTYPE);
/**
 * @export
 * @author Zeng Xiangheng
 * @since 10042
 * @module PopButton
 * @description 弹窗按钮控件
 * @param {string} sizeLevel - 按钮的大小：regular, medium, small
 * @param {string} title - 按钮标题
 * @param {ViewStyle} style - 按钮样式
 * @param {object} titleStyle - 标题样式
 * @param {object} backgroundColor - 背景颜色
 * @param {boolean} disabled - 如果设为true，则禁止此组件的一切交互。
 * @param {function} onLongPress - 长按时的回调函数
 * @param {function} onPress - 点击时的回调函数
 * @param {string} colorType - 按钮的颜色类型,只在regular和medium按钮上使用
 * @param {function} allowFontScaling - 是否按系统字体大小改变
 * @param {string} titleColor - 字体颜色
 */

export function PopButton(props) {
  const context = useContext(ConfigContext);
  let buttonStyle;
  let bgColorNormal;
  let bgColorPressed;
  let titleS;
  let titleC;

  switch (props.sizeLevel) {
    case 'small':
      buttonStyle = styles.smallButton;
      titleS = styles.smallTitle;
      titleC = context.theme?.colorPrimary;
      bgColorNormal = context.theme?.colorBtnGreenOpaNor;
      bgColorPressed = context.theme?.colorBtnGreenOpaPres;
      break;

    case 'medium':
      buttonStyle = styles.mediumButton;
      titleS = styles.mediumTitle;
      titleC = context.theme?.colorToast;
      bgColorNormal = context.theme?.colorBtnGrayNor;
      bgColorPressed = context.theme?.colorBtnGrayPres;
      break;

    default:
      buttonStyle = styles.regularButton;
      titleS = styles.regularTitle;
      titleC = context.theme?.colorWhite2;
      bgColorNormal = context.theme?.colorBtnGreenNor;
      bgColorPressed = context.theme?.colorBtnGreenPres;
      break;
  }

  if (props.colorType) {
    switch (props.colorType) {
      case COLORTYPE.BLUELAYERWHITE:
        titleC = context.theme?.colorWhite2;
        bgColorNormal = context.theme?.colorBtnGreenNor;
        bgColorPressed = context.theme?.colorBtnGreenPres;
        break;

      case COLORTYPE.GRAYLAYERBLACK:
        titleC = context.theme?.colorToast;
        bgColorNormal = context.theme?.colorBtnGrayNor;
        bgColorPressed = context.theme?.colorBtnGrayPres;
        break;

      case COLORTYPE.GRAYLAYERBLUE:
        titleC = context.theme?.colorPrimary;
        bgColorNormal = context.theme?.colorBtnGrayNor;
        bgColorPressed = context.theme?.colorBtnGrayPres;
        break;

      default:
        break;
    }
  }

  if (props.backgroundColor) {
    bgColorNormal = props.backgroundColor.bgColorNormal;
    bgColorPressed = props.backgroundColor.bgColorPressed;
  }

  if (props.titleColor) {
    titleC = props.titleColor;
  }

  const {
    disabled
  } = props;
  const opacity = disabled ? 0.3 : 1; // smallButton限制12个字符 6个汉字

  function sub6string(str) {
    let len = 0;
    let resStr = '';

    for (let i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
        len += 2;
      } else {
        len += 1;
      }

      if (len <= 12) {
        resStr += str.charAt(i);
      } else {
        return resStr;
      }
    }

    return resStr;
  }

  return <View style={[styles.container, {
    opacity
  }]}>
      <TouchableHighlight style={[buttonStyle, {
      backgroundColor: String(bgColorNormal),
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1
    }, props.style]} underlayColor={String(bgColorPressed)} disabled={disabled} onPress={props.onPress} onLongPress={props.onLongPress} {...getAccessibilityConfig({
      accessible: props.accessible,
      accessibilityRole: 'button',
      accessibilityHint: props.accessibilityHint,
      accessibilityLabel: props.accessibilityLabel,
      accessibilityValue: props.accessibilityValue,
      accessibilityState: {
        disabled
      }
    })}>
        <View style={styles.titleContainer}>
          <Text style={[titleS, props.titleStyle, {
          color: String(titleC)
        }]} adjustsFontSizeToFit={props.sizeLevel === 'small'} allowFontScaling={props.allowFontScaling} numberOfLines={1}>
            {props.sizeLevel === 'small' ? sub6string(props.title) : props.title}
          </Text>
        </View>
      </TouchableHighlight>
    </View>;
}
PopButton.defaultProps = {
  sizeLevel: 'regular',
  title: '按钮文字',
  disabled: false,
  allowFontScaling: true
};
PopButton.COLORTYPE = COLORTYPE;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  regularButton: {
    height: 46,
    width: 306,
    borderRadius: 23
  },
  mediumButton: {
    height: 46,
    width: 147,
    borderRadius: 23
  },
  smallButton: {
    height: 34,
    width: 80,
    borderRadius: 17
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  regularTitle: {
    textAlign: 'center',
    maxWidth: 282,
    // lineHeight: 22,
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: FontLantingProMedium,
    textAlignVertical: 'center'
  },
  mediumTitle: {
    textAlign: 'center',
    maxWidth: 123,
    // lineHeight: 22,
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: FontLantingProMedium,
    textAlignVertical: 'center'
  },
  smallTitle: {
    textAlign: 'center',
    // lineHeight: 18,
    maxWidth: 52,
    fontWeight: 'bold',
    fontSize: 13,
    fontFamily: FontLantingProMedium,
    textAlignVertical: 'center'
  }
});
export default PopButton;