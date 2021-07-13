/* eslint-disable  */
// @ts-nocheck

/* eslint-disable react/no-array-index-key */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { View, StyleSheet } from 'react-native'; // import Colors from '@utils/Colors';
// import { Styles } from '@resources/';
// import { Text } from 'react-native-svg';

import { Separator } from "../separator";

const Line = props => {
  const {
    type = 'solid',
    direction = 'row',
    backgroundColor = 'red',
    height = 20,
    width = 200,
    itemSize = 2,
    itemGap = 2,
    // height = StyleSheet.hairlineWidth,
    style
  } = props; // 为了适应Separator组件属性，需要严格限制使用状况

  const UniversalLine = direction === 'row' && height <= 1 || direction === 'column' && width <= 1 ? Separator : View;
  /** 创建直线 */

  const createSolidLine = () => <UniversalLine type={direction} style={[style, {
    backgroundColor,
    width,
    height
  }]} />;

  const createDashedLine = () => {
    // const num = direction === 'row'
    //   ? Math.floor(width / (itemSize + itemGap)) : Math.floor(height / (itemSize + itemGap));
    // // console.log(num);
    // const itemWidth = direction === 'row' ? itemSize : width;
    // const itemHeight = direction === 'row' ? height : itemSize;
    // const marginBottom = direction === 'row' ? 0 : itemGap;
    // const marginRight = direction === 'row' ? itemGap : 0;
    let num;
    let itemHeight;
    let itemWidth;
    let marginBottom;
    let marginRight;

    if (direction === 'row') {
      num = Math.floor(width / (itemSize + itemGap));
      itemWidth = itemSize; // ? width : itemSize;

      itemHeight = height;
      marginBottom = 0;
      marginRight = itemGap;
    } else {
      num = Math.floor(height / (itemSize + itemGap));
      itemWidth = width;
      itemHeight = itemSize;
      marginBottom = itemGap;
      marginRight = 0;
    }

    const priorStyle = {
      backgroundColor,
      width: itemWidth,
      height: itemHeight,
      marginBottom,
      marginRight // flex: 1,

    }; // console.log(priorStyle);

    const lines = Array.from({
      length: num
    }).map((_, idx) => <UniversalLine key={idx} type={direction} style={[styles.dashedItem, priorStyle]} />);
    return <View style={[styles.dashedContainer, style, {
      flexDirection: direction
    }, {
      height
    }]}>
        {lines}
      </View>;
  };

  if (type === 'solid') {
    return createSolidLine();
  }

  return createDashedLine();
};
/**
 * Line
 * @description 通用的线
 * @param {'solid' | 'dashed'} type - 线类型
 * @param {'row' | 'column'} direction - 线方向
 * @param {string} backgroundColor - 线颜色
 * @param {number} width - 线宽度
 * @param {number} height - 线高度
 * @param {StyleProp<ViewStyle>} style - 样式。如果样式中设置了width和height，会被线属性覆盖
 * @param {number} itemSize - type属性为dashed时生效。如果direction为row，itemSize指小块长；direction属性为column时，是为小块高
 * @param {number} itemGap - type属性为dashed时生效。线段之间的间隔。
 */


const MemoLine = React.memo(Line);
export default MemoLine;
const styles = StyleSheet.create({
  dashedItem: {
    // flex: 1,
    // height: 2,
    // width: 2,
    backgroundColor: 'rgba(0,0,0,0.20)' // marginRight: 2,

  },
  dashedContainer: {
    // backgroundColor: 'blue',
    height: 20,
    width: 300,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
});