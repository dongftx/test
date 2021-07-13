/* eslint-disable  */
// @ts-nocheck

/* eslint-disable @typescript-eslint/explicit-function-return-type */

/**
 * 笛卡尔坐标和极坐标相互转换
 * 笛卡尔坐标系即为屏幕坐标系
 * 极坐标的x轴为笛卡尔坐标系的x轴，方向为逆时针
 */

/**
 * 极坐标转笛卡尔坐标
 * @param {number} radian - 弧度表示的极角
 */
const polarToCartesian = (radian, radius, offset) => {
  // const { radius } = this.props;
  const distance = radius + offset; // this._getExtraSize() / 2; // 圆心距离坐标轴的距离

  const x = distance + radius * Math.cos(radian);
  const y = distance - radius * Math.sin(radian);
  return {
    x,
    y
  };
};
/**
 * 笛卡尔坐标转极坐标
 * @param {Object} _point 笛卡尔系坐标
 * @param {number} distance 圆心距离坐标轴的距离
 */


const cartesianToPolar = ({
  x,
  y
}, distance) => {
  // const { radius } = this.props;
  // const distance = radius + this._getExtraSize() / 2; // 圆心距离坐标轴的距离
  const virtualPolar = Math.atan2(y - distance, x - distance); // 需要将其范围设在0 ~ 2 * pi

  const polar = virtualPolar > 0 ? 2 * Math.PI - virtualPolar : -virtualPolar;
  return polar;
};
/**
 * 角度转弧度
 * @param value
 */
// eslint-disable-next-line no-mixed-operators


const getRadianByAngle = angle => Math.PI * angle / 180;
/**
* 角度转笛卡尔坐标
* @param {number} angle 在极坐标下的角度
* @param {number} radius 半径
* @param {number} offset 补偿
*/


const getCartesianByAngle = (angle, radius, offset = 0) => {
  const radian = getRadianByAngle(angle);
  const point = polarToCartesian(radian, radius, offset);
  return point;
};
/**
* 获取坐标系上对应的角度值
* @param value 范围调制器上的真实值
*/


const getArcByValue = ({
  currentLeftValue,
  currentRightValue
}, isComponentHorizontal) => {
  let currentLeftAngle;
  let currentRightAngle;

  if (isComponentHorizontal) {
    currentLeftAngle = currentLeftValue + 90;
    currentRightAngle = currentRightValue > 90 ? 360 - (currentRightValue - 90) : 90 - currentRightValue;
  } else {
    currentLeftAngle = currentLeftValue;
    currentRightAngle = 360 - currentRightValue; // 可以转换
    // const x = 90
    // currentRightAngle = (currentRightValue + x) > 90
    //    ? 360 - (currentRightValue + x - 90) : 90 - (currentRightValue + x);
  }

  return {
    currentLeftAngle,
    currentRightAngle
  };
};
/**
 * 获取范围调节器上的真实值
 */


const getValueByArc = ({
  leftAngle,
  rightAngle
}, isComponentHorizontal) => {
  // const leftAngle = left / 2;
  // const rightAngle = right / 2;
  let leftValue;
  let rightValue;

  if (isComponentHorizontal) {
    // currentLeftAngle = currentLeftValue + 90;
    // currentRightAngle = currentRightValue > 90 ? 360 - (currentRightValue - 90) : 90 - currentRightValue;
    leftValue = leftAngle - 90;
    rightValue = rightAngle > 90 ? 360 - rightAngle + 90 : 90 - rightAngle; // rightAngle > 90 ? 360 - (rightAngle - 90) : -(rightValue - 90);
  } else {
    leftValue = leftAngle; //

    rightValue = 360 - rightAngle; // const x = -90
    // rightValue = rightValue - x > 90 : (360 - (rightValue - 90)) + 90 : (90 - (rightValue - 90))
  }

  return {
    leftValue,
    rightValue
  };
};

export { polarToCartesian, cartesianToPolar, getRadianByAngle, getCartesianByAngle, getArcByValue, getValueByArc };