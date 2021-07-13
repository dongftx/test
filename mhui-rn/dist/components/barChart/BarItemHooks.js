/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useRef } from 'react';
import { StyleSheet, Animated, TouchableHighlight, Text } from 'react-native';

const BarItemHooks = props => {
  const {
    // target,
    style,
    label = '',
    labelShow = false,
    labelStyle,
    height,
    underlayColor,
    onPress
  } = props;
  const heightAnim = useRef(new Animated.Value(height));
  useEffect(() => {
    heightAnim.current.setValue(height);
  }, [height]);
  useEffect(() => {
    Animated.spring(heightAnim.current, {
      toValue: 0,
      // Math.abs(height),
      tension: 20,
      useNativeDriver: true
    }).start();
  }, [height]); // height

  const createLabel = () => {
    if (labelShow) {
      return <Text style={[styles.labelStyle, labelStyle]}>{label}</Text>;
    }

    return null;
  };

  const wrapperStyle = [styles.barWrapper, {
    height // backgroundColor: !pressStatus ? 'transparent' : 'red',

  }];
  return <TouchableHighlight style={wrapperStyle} underlayColor={underlayColor} onPress={onPress}>
      <Animated.View style={[styles.bar, style, {
      height,
      transform: [{
        translateY: heightAnim.current
      }]
    }]}>
        {createLabel()}
      </Animated.View>
    </TouchableHighlight>;
};
/**
 * @export
 * @author Xu Liang
 * @since 10041
 * @module BarChart
 * @description 柱形图中一列图形。使用Hooks而非Component。
 * @param {number} height - 图形的高度
 * @param {function} onPress - 图形被点击时的回调
 * @param {boolean} labelShow - 是否显示图形标签。默认不显示。
 * @param {string|number} label - 图形标签。如果未开启labelShow，则忽略此属性。
 * @param {StyleProp<ViewStyle>} labelStyle - 图形标签的样式。如果未开启labelShow，则忽略此属性。
 * @param {color} underlayColor - 图形被触摸时显示出来的底层的颜色
 * @param {StyleProp<ViewStyle>} style - 图形总体样式
 */


const MemoBarItemHooks = React.memo(BarItemHooks);
export default MemoBarItemHooks;
const styles = StyleSheet.create({
  barWrapper: {
    backgroundColor: 'transparent',
    width: 29,
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    overflow: 'hidden'
  },
  bar: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  labelStyle: {
    textAlign: 'center'
  }
});