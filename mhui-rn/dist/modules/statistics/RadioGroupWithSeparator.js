// @ts-nocheck

/* eslint-disable  */
import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import Radio from "../../components/radio/Radio";
import { window } from "../../utils/sizes";
import { ConfigContext } from "../../components/configProvider";
import Separator from "../../components/separator/Separator";
import DynamicColor from "../../styles/DynamicColor"; // import { UserStatisticsDataType } from './requestConfig'

/** 默认分割线颜色 */

const SEPARATOR_LINE_COLOR = new DynamicColor('#E5E5E5', '#000000');
/** 默认日周月按钮未选中时的文本颜色 */

const RADIO_RAW_TEXT_COLOR = new DynamicColor('#666666', 'rgba(255,255,255,0.50)');
/** 默认日周月按钮选中时的文本颜色 */

const RADIO_CHECKED_TEXT_COLOR = new DynamicColor('rgba(255,255,255,0.90)', '#FFFFFF');
/** 默认按钮未选中时背景颜色（适配黑暗模式） */

const RADIO_RAW_BACKGROUNDCOLOR = new DynamicColor('#F7F7F7', 'rgba(255,255,255,0.20)');
/** 默认按钮被选中时背景颜色（适配黑暗模式） */

const RADIO_CHECKED_BACKGROUNDCOLOR = new DynamicColor('#FFA626', '#E68E10');

/**
 * @export
 * @author Xu Liang
 * @since 10044
 * @module statistics
 * @description 带有分割线的单选框组
 * @property {Array} radioOptions - 选项配置
 * @property {function} onChangeCheck - 选择发生改变时的回调
 * @property {DynamicColor} separatorLineColor - 分割线颜色（适配黑暗模式）
 * @property {DynamicColor} radioRawTextColor - 日周月按钮未选中时的文本颜色（适配黑暗模式）
 * @property {DynamicColor} radioCheckedTextColor - 日周月按钮选中时的文本颜色（适配黑暗模式）
 * @property {DynamicColor} radioRawBackgroundColor - 按钮未选中时背景颜色（适配黑暗模式）
 * @property {DynamicColor} radioCheckedBackgroundColor - 按钮被选中时背景颜色（适配黑暗模式）
 */
export default class RadioGroupWithSeparator extends PureComponent {
  static contextType = ConfigContext;
  static defaultProps = {
    radioOptions: [{
      id: 0,
      value: '日'
    }, {
      id: 1,
      value: '周'
    }, {
      id: 2,
      value: '月'
    }],
    separatorLineColor: SEPARATOR_LINE_COLOR,
    radioRawTextColor: RADIO_RAW_TEXT_COLOR,
    radioCheckedTextColor: RADIO_CHECKED_TEXT_COLOR,
    radioRawBackgroundColor: RADIO_RAW_BACKGROUNDCOLOR,
    radioCheckedBackgroundColor: RADIO_CHECKED_BACKGROUNDCOLOR
  };

  constructor(props) {
    super(props);
    this.state = {
      checkedId: props.checkedId || 0
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.checkedId !== this.props.checkedId) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        checkedId: this.props.checkedId || 0
      });
    }
  }
  /**
  * 改变某个按钮的选中状态
  * */


  onChangeCheck = checkedId => {
    this.setState({
      checkedId
    });
    this.props.onChangeCheck && this.props.onChangeCheck(checkedId);
  };
  /**
  * 创建日，周，月的单选框
  * 使用TouchableWithoutFeedback组件报告文字，使得文本不会遮挡单选框响应
  */

  createRadioGroup = () => {
    const {
      radioOptions = [],
      radioRawTextColor,
      radioCheckedTextColor,
      radioRawBackgroundColor,
      radioCheckedBackgroundColor
    } = this.props;
    const {
      checkedId
    } = this.state;
    const {
      colorScheme
    } = this.context;
    const radioRawTextColorString = typeof radioRawTextColor === 'string' ? radioRawTextColor : radioRawTextColor?.color(colorScheme);
    const radioCheckedTextColorString = typeof radioCheckedTextColor === 'string' ? radioCheckedTextColor : radioCheckedTextColor?.color(colorScheme);
    const radioRawBackgroundColorString = typeof radioRawBackgroundColor === 'string' ? radioRawBackgroundColor : radioRawBackgroundColor?.color(colorScheme);
    const radioCheckedBackgroundColorString = typeof radioCheckedBackgroundColor === 'string' ? radioCheckedBackgroundColor : radioCheckedBackgroundColor?.color(colorScheme);
    const content = radioOptions.map(option => {
      const {
        id,
        value
      } = option;
      const isChecked = id === checkedId;
      /** 圆背景颜色 */

      const checkedBackgroundColor = isChecked ? radioCheckedBackgroundColorString : radioRawBackgroundColorString;
      /** 字体颜色 */

      const checkedFontColor = isChecked ? radioCheckedTextColorString : radioRawTextColorString;
      /** 选中后大圆的样式 */

      const checkedBigCircleStyle = {
        borderColorChecked: radioCheckedBackgroundColorString,
        // '#00C',
        borderColor: radioRawBackgroundColorString,
        backgroundColorChecked: checkedBackgroundColor,
        // '#33F',
        backgroundColor: radioRawBackgroundColorString
      };
      return <View style={styles.radioWrapper} key={id}>
          <Radio isChecked={isChecked} changeCheck={this.onChangeCheck} id={id} accessible bigCircleStyle={styles.radioBigCircle} checkedBigCircleStyle={checkedBigCircleStyle} smallCircleBg={checkedBackgroundColor} />
          <TouchableWithoutFeedback onPress={() => this.onChangeCheck(id)}>
            <Text style={[styles.radioText, {
            color: checkedFontColor
          }]}>
              {value}
            </Text>
          </TouchableWithoutFeedback>
        </View>;
    });
    return content;
  };

  render() {
    const {
      separatorLineColor
    } = this.props;
    const separatorLineColorString = typeof separatorLineColor === 'string' ? separatorLineColor : separatorLineColor?.color(this.context.colorScheme);
    const separatorStyle = {
      backgroundColor: separatorLineColorString,
      width: window.width
    };
    return <View style={styles.radioGroup}>
        <Separator style={separatorStyle} />
        <View style={styles.radioContainer}>
          {this.createRadioGroup()}
        </View>
      </View>;
  }

}
const styles = StyleSheet.create({
  radioGroup: {
    width: window.width,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  radioBigCircle: {
    width: 62,
    // 62,
    height: 62,
    // 62, (262 - 186) = 76 / 2 = 39
    borderRadius: 31
  },
  radioContainer: {
    height: 180,
    // 180,
    // width: 262, // 262,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // 'space-between',
    alignItems: 'center',
    marginRight: 39
  },
  radioWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 39 // marginRight: 19.5,

  },
  radioText: {
    position: 'absolute',
    fontFamily: 'MILanPro_MEDIUM--GB1-4',
    fontSize: 15,
    // 14
    color: '#666666',
    textAlign: 'center'
  }
});