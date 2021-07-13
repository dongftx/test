/* eslint-disable  */
// @ts-nocheck
import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ConfigContext } from "../configProvider"; // CircleLoadingPropType

const Circle = props => {
  const {
    style,
    radius = 50,
    fill,
    stroke,
    strokeWidth = 0,
    colors,
    locations
  } = props;
  const context = useContext(ConfigContext);
  /** 整体圆宽度 */

  const width = 2 * (radius + strokeWidth);
  const {
    theme
  } = context;
  /** 圆环样式 */

  const stylesAndProps = [styles.container, style, {
    width,
    height: width,
    borderRadius: radius + strokeWidth,
    backgroundColor: stroke || theme?.colorForeground // || fill

  }];
  /** 圆环内部填充样式 */

  const fillStyle = {
    width: radius * 2,
    height: radius * 2,
    backgroundColor: fill || theme?.colorForeground,
    borderRadius: radius
  }; // 如果定义了渐变颜色数组

  if (colors !== undefined && colors.length >= 2) {
    return <LinearGradient colors={colors} locations={locations} // {[0, 0.5, 1.0]}// {locations}// {[0, 0.5, 1.0]}
    style={stylesAndProps}>
        <View style={fillStyle} />
      </LinearGradient>;
  }

  return <View style={stylesAndProps}>
      <View style={fillStyle} />
    </View>;
};
/**
 * 1
 */


const MemoCircle = React.memo(Circle);
export default MemoCircle;
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});