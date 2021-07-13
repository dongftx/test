/* eslint-disable  */
// @ts-nocheck
import React, { useEffect, useRef, useImperativeHandle, forwardRef, useContext, useState } from 'react';
import { Animated, Easing } from 'react-native';
import Images from "../../resources/Images";
import { ConfigContext } from "../configProvider";

// 需要增加timeout
const CircleLoading = (props, ref) => {
  const {
    radius = 43,
    style,
    timeout = 20000,
    onTimeout
  } = props;
  const context = useContext(ConfigContext);
  const animatedRotation = useRef(new Animated.Value(0)).current;
  const [visible, setVisible] = useState(true);
  /** loading的旋转动画 */

  const animate = Animated.timing(animatedRotation, {
    toValue: 360,
    // 2 * Math.PI,
    duration: 5000,
    // 2000,//,1500,
    easing: Easing.linear,
    // isInteraction: false,
    useNativeDriver: true
  });
  /** 动画无限循环 */

  const loopAnimate = Animated.loop(animate);
  /** 超时定时器 */

  let timer = null;
  /**
   * 组件销毁前需要：1.关闭动画；2.停止无限循环动画；3.移除超时定时器
   */

  const onDismiss = () => {
    setVisible(false);
    loopAnimate.stop();
    timer && clearTimeout(timer);
    timer = null;
  };

  useImperativeHandle(ref, () => ({
    /** 提前停止动画 */
    stop: () => {
      loopAnimate.stop();
    },
    // /** 重新打开loading */
    // onOpen: (): void => {
    //   if(visible){
    //     // 如果当前开启，则不需要重新打开
    //     console.log('is opening');
    //     return;
    //   }
    //   setVisible(true);
    //   loopAnimate.start();
    //   startTimeTask();
    // },

    /** 提前关闭loading */
    onClose: () => {
      onDismiss();
    }
  }), [loopAnimate]);
  useEffect(() => onDismiss, []);
  /** 开启定时任务 */

  const startTimeTask = () => {
    timer = setTimeout(() => {
      // 超时关闭loading
      setVisible(false);
      onTimeout && onTimeout();
    }, timeout);
  };
  /** 动画开启的函数 */


  const startAnimation = () => {
    loopAnimate.start();
    startTimeTask();
  };
  /** loading宽度（或高度） */


  const width = 2 * radius;
  /** loading样式 */

  const containerStyle = [style, {
    display: visible ? 'flex' : 'none',
    width,
    height: width,
    transform: [{
      rotate: animatedRotation.interpolate({
        inputRange: [0, 90, 180, 270, 360],
        // [0, 90, 180, 270, 360],//[0, 0.25, 0.5, 0.75, 1],//[0, 90, 180, 270, 360], //,[0, 0.25, 0.5, 0.75, 1], //[0, 90, 180, 270, 360],
        outputRange: ['0deg', '90deg', '180deg', '270deg', '360deg'] // ['142deg', '52deg', '322deg', '232deg', '142deg']//['142deg', '232deg', '180deg', '270deg', '360deg']

      })
    }]
  }];
  const imgLoadings = Images.loading;
  /** 适配黑暗模式 */

  const imgLoading = context.colorScheme === 'dark' ? imgLoadings.dark.empty : imgLoadings.light.empty;
  return <Animated.Image style={containerStyle} source={imgLoading} onLoad={startAnimation} />;
};
/**
 * @export
 * @author Xu Liang
 * @since 10043
 * @module loading
 * @description Loading态 for Android and iOS.
 * @property {ViewStyle} style -  loading样式。需要注意的是loading虽然呈现的是圆，但实际上是正方形图片，你的样式仅应用在图片
 * @property {number} radius - loading圆半径.默认为43
 * @property {number} timeout - loading的超时时间。默认20000。
 * @property {function} onTimeout - 超时回调函数
 * @method stop - 提前关闭loading动画
 * @method onClose - 提前关闭loading
 */


const CircleLoadingRef = forwardRef(CircleLoading);
export default CircleLoadingRef;