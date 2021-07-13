import React, { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { getAccessibilityConfig } from "../../utils/accessibility-helper";
import { ConfigContext } from "../configProvider";
import * as Progress from 'react-native-progress';
import DynamicColor from "../../styles/DynamicColor";
import { FontLantingProMedium } from "../../constants/font";
/**
 * @export
 * @author Zeng Xiangheng
 * @since 10044
 * @module ProgressButton
 * @description 进度条按钮控件，与PopButton同大小，点击PopButton变为进度条
 * @param {string} sizeLevel - 按钮的大小：regular, medium, small
 * @param {number} progress - 当前的进度 取值0～1
 * @param {boolean} animated - 是否有动画
 * @param {boolean} disabled - 进度条灰
 * @param {ViewStyle} style - 按钮样式-显示指定width height borderRadius
 */

export default function ProgressButton(props) {
  const context = useContext(ConfigContext);
  const {
    colorScheme
  } = context;
  const {
    disabled,
    progress,
    animated
  } = props;
  let buttonStyle;
  let titleStyle;
  let filledBgColor = context.theme?.colorBtnGreenNor;
  let unfilledBgColor;

  switch (props.sizeLevel) {
    case 'small':
      buttonStyle = styles.smallButton;
      unfilledBgColor = context.theme?.colorBtnGreenOpaNor;
      titleStyle = styles.smallTitle;
      break;

    case 'medium':
      buttonStyle = styles.mediumButton;
      unfilledBgColor = context.theme?.colorBtnGrayNor;
      titleStyle = styles.mediumTitle;
      break;

    default:
      buttonStyle = styles.regularButton;
      unfilledBgColor = context.theme?.colorBtnGrayNor;
      titleStyle = styles.regularTitle;
      break;
  }

  const textColor = new DynamicColor('#ffffff', 'rgba(255,255,255,0.90)');
  const color = progress > 0.48 ? textColor.color(colorScheme) : '#32BAC0';
  const disabledColor = new DynamicColor('rgba(76,76,76,0.3)', 'rgba(255,255,255,0.3)').color(colorScheme);

  if (disabled) {
    unfilledBgColor = context.theme?.colorBtnGrayNor;
    filledBgColor = context.theme?.colorBtnGrayPres;
  }

  if (props.style) {
    buttonStyle = props.style;
  }

  const textView = disabled ? // 中间的文字内容
  <Text style={[titleStyle, {
    color: disabledColor
  }]}>
      等待
    </Text> : <Text style={[titleStyle, {
    color
  }]}>
        {Math.floor(progress * 10000) / 100}
        %
      </Text>;
  return <Progress.Bar progress={progress} style={[buttonStyle, {
    justifyContent: 'center'
  }]} height={buttonStyle.height} width={buttonStyle.width} borderRadius={buttonStyle.borderRadius} useNativeDriver color={String(filledBgColor)} unfilledColor={String(unfilledBgColor)} borderWidth={0} animated={animated} {...getAccessibilityConfig({
    accessible: props.accessible,
    accessibilityRole: 'progressbar',
    accessibilityHint: props.accessibilityHint,
    accessibilityLabel: props.accessibilityLabel,
    accessibilityValue: props.accessibilityValue,
    accessibilityState: {
      disabled
    }
  })}>
      <View style={[styles.container]}>
        {textView}
      </View>

    </Progress.Bar>;
}
ProgressButton.defaultProps = {
  sizeLevel: 'regular',
  animated: true,
  disabled: false,
  progress: 0
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    // justifyContent: 'center',
    backgroundColor: 'transparent',
    alignSelf: 'center'
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
  regularTitle: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: FontLantingProMedium,
    fontWeight: 'bold'
  },
  mediumTitle: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: FontLantingProMedium,
    fontWeight: 'bold'
  },
  smallTitle: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: FontLantingProMedium,
    fontWeight: 'bold'
  }
});