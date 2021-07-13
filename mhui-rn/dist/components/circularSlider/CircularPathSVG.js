/* eslint-disable  */
// @ts-nocheck
import React, { PureComponent } from 'react';
import { Path } from 'react-native-svg';
import { getRadianByAngle // getCartesianByAngle,
, polarToCartesian // cartesianToPolar,
} from "./coordUtils";

/**
 * @export
 * @author Xu Liang
 * @since 10042
 * @module circularSlider
 * @description 圆弧
 * @param {numer} leftAngle - 左侧点（结束点）角度，以屏幕坐标系下的x轴为x轴，逆时针方向为正方向
 * @param {numer} rightAngle - 左侧点（结束点）角度，以屏幕坐标系下的x轴为x轴，逆时针方向为正方向
 * @param {numer} midAngle - 中间点角度，以屏幕坐标系下的x轴为x轴，逆时针方向为正方向
 * @param {number} radius - 圆弧半径
 * @param {number} offset - 偏移量，如圆弧宽度
 * @param {number} strokeWidth - 圆弧宽度
 * @param {string} fill - 填充
 * @param {string} stroke - 背景颜色,
 * @param {string} strokeLinecap - 路径两端的形状
 */
export default class CircularDialSVG extends PureComponent {
  static defaultProps = {
    leftAngle: 180,
    // 左侧点（结束点）角度
    midAngle: 90,
    // 中间点角度
    rightAngle: 0,
    // 右侧点（起始点）角度
    radius: 100,
    // 圆弧半径
    offset: 20,
    // 偏移量，如路径宽度
    strokeLinecap: 'round',
    // 路径两端的形状
    strokeWidth: 40,
    // 路径宽度
    stroke: 'red',
    // 背景颜色
    fill: 'none' //

  }; // eslint-disable-next-line @typescript-eslint/explicit-function-return-type

  /**
   * 定义Track的路径
   * 路径从from到mid再到to
   */

  createMidPathDefine = () => {
    const {
      rightAngle,
      leftAngle,
      midAngle,
      radius,
      offset
    } = this.props;
    const rightRadian = getRadianByAngle(rightAngle);
    const midRadian = getRadianByAngle(midAngle);
    const leftRadian = getRadianByAngle(leftAngle);
    const rightPoint = polarToCartesian(rightRadian, radius, offset);
    const midPoint = polarToCartesian(midRadian, radius, offset);
    const leftPoint = polarToCartesian(leftRadian, radius, offset);
    const rightPartSize = rightRadian > midRadian ? 2 * Math.PI - (rightRadian - midRadian) : midRadian - rightRadian;
    const leftPartSize = leftRadian - midRadian; // 如果互换leftPoint（或rightPoint）和midPoint位置后，会绘制多余的块

    const rd = `M${midPoint.x},${midPoint.y} 
    A ${radius},${radius},0,${rightPartSize > Math.PI ? '1' : '0'},1,${rightPoint.x},${rightPoint.y}`;
    const ld = `M${midPoint.x},${midPoint.y} 
    A ${radius},${radius},0,${leftPartSize > Math.PI ? '1' : '0'},0,${leftPoint.x},${leftPoint.y}`;
    return {
      ld,
      rd
    };
  };
  /**
   * 画小弧
   * @description 当左右两点很接近中间点时，如果使用中间路径，则会绘画异常
   */

  createSmallArc = () => {
    const {
      rightAngle,
      leftAngle,
      radius,
      offset,
      strokeWidth,
      stroke,
      fill,
      strokeLinecap
    } = this.props;
    const rightRadian = getRadianByAngle(rightAngle);
    const leftRadian = getRadianByAngle(leftAngle);
    const rightPoint = polarToCartesian(rightRadian, radius, offset);
    const leftPoint = polarToCartesian(leftRadian, radius, offset);
    const path = `M${rightPoint.x},${rightPoint.y} 
    A ${radius},${radius},0,0,0,${leftPoint.x},${leftPoint.y}`;
    return <Path key="left" strokeWidth={strokeWidth} stroke={stroke} fill={fill} strokeLinecap={strokeLinecap} d={path} />;
  }; // eslint-disable-next-line @typescript-eslint/explicit-function-return-type

  render() {
    const {
      strokeWidth,
      stroke,
      fill,
      strokeLinecap,
      rightAngle,
      leftAngle,
      midAngle
    } = this.props;
    const limit = 3; // 如果左右圆弧特别接近中间角度，则不能借助中间路径画圆，

    if (midAngle === 90 && Math.abs(leftAngle - midAngle) <= limit && Math.abs(rightAngle - midAngle) <= limit || midAngle === 0 && Math.abs(leftAngle - midAngle) <= limit && Math.abs(rightAngle - (360 - midAngle)) <= limit) {
      return this.createSmallArc();
    }

    const {
      ld,
      rd
    } = this.createMidPathDefine();
    return <>
        <Path key="right" strokeWidth={strokeWidth} stroke={stroke} fill={fill} strokeLinecap={strokeLinecap} d={rd} />
        <Path key="left" strokeWidth={strokeWidth} stroke={stroke} fill={fill} strokeLinecap={strokeLinecap} d={ld} />
      </>;
  }

}