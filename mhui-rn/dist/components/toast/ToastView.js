import React, { Component } from 'react';
import { Text, View, Animated, StyleSheet } from 'react-native'; // import DarkMode from 'miot/darkmode';

import { FontLantingProNormal } from "../../constants/font";
import { Icons } from "../../resources/Icons";
import Toast from "./Toast";
import { ConfigContext } from "../configProvider";
/**
 * @exports
 * @author Zeng Xiangheng
 * @since 10043
 * @description toast 提示
 * @param {boolean} visible 可见性。布尔：默认值 false
 * @param {number} position 位置。数字：默认值 Toast.positions.BOTTOM（-86），Toast.positions.CENTER（0），Toast.positions.TOP（20）。负值距离屏幕底部，正值距离屏幕顶部，0定位在中间。
 * @param {boolean} animation 是否有动画效果。布尔：默认值 true
 * @param {boolean} keyboardAvoiding 是否跟随键盘移动。布尔：默认值 true
 * @param {number} delay 显示前的延迟时间。数字：默认值 0
 * @param {boolean} hideOnPress 点击是否消失。布尔：默认值 true
 * @param {Text} text 文字。
 */
// @param {number} duration - (改为由开发者外部控制持续时间) 持续时间，数字：默认值 Toast.durations.LONG（3500）Toast.durations.SHORT（2000），0一直持续

export default class ToastView extends Component {
  static contextType = ConfigContext;
  static defaultProps = {
    visible: false,
    delay: 0,
    keyboardAvoiding: true,
    hideOnPress: true,
    animation: false,
    position: Toast.positions.BOTTOM
  };

  constructor(props) {
    super(props);
    this.state = {
      rotate: new Animated.Value(0)
    };
  }

  componentDidMount() {
    if (this.props.animation) {
      this.onShowView();
    } // if (this.props.duration > 0 && this.props.visible) {
    //   setTimeout(() => {
    //     this.setState(() => ({ visible: false }));
    //   }, this.props.duration);
    // }

  }

  onShowView = () => {
    this.state.rotate.setValue(0);
    Animated.timing(this.state.rotate, {
      toValue: 1,
      useNativeDriver: true,
      duration: 1000
    }).start(() => this.onShowView());
  };

  render() {
    const {
      props
    } = this;
    const {
      animation
    } = props;
    const pic = this.context.colorScheme === 'dark' ? Icons.loadingPicDark : Icons.loadingPicLight;
    const imageView = <Animated.Image source={pic} style={{
      marginRight: 11,
      backgroundColor: 'transparent',
      width: 20,
      height: 20,
      transform: [{
        rotate: this.state.rotate.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg']
        })
      }]
    }} />;
    return <Toast visible={props.visible} hideOnPress={props.hideOnPress} // duration={props.duration}
    delay={props.delay} position={props.position} containerStyle={[styles.container]} keyboardAvoiding={props.keyboardAvoiding} backgroundColor={String(this.context.theme?.colorForeground)} onHide={props.onHide} onHidden={props.onHidden} onShow={props.onShow} onShown={props.onShown}>
        {animation && imageView}
        <View>
          <Text numberOfLines={5} style={[styles.textStyle, {
          color: String(this.context.theme?.colorToast)
        }]}>
            {props.text}
          </Text>
        </View>
      </Toast>;
  }

}
const styles = StyleSheet.create({
  container: {
    minWidth: 126,
    maxWidth: 230,
    minHeight: 40,
    borderColor: 'rgba(0,0,0,0.1)',
    borderWidth: 0.5
  },
  textStyle: {
    // marginVertical: 9,
    // marginHorizontal: 13,
    fontSize: 16,
    fontFamily: FontLantingProNormal,
    color: '#4C4C4C',
    textAlignVertical: 'center',
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 200
  }
});