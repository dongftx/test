import React, { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ConfigContext } from "../../components/configProvider";
import DynamicColor from "../../styles/DynamicColor";
/** 默认标题颜色 */

const TITLE_COLOR = new DynamicColor('#000000', '#FFFFFF');
/** 默认副标题颜色 */

const SUBTITLE_COLOR = new DynamicColor('#999999', '#FFFFFF');
/** 默认的空数据时标题文字 */

const DEFAULT_TITLE_EMPTY_DATA = '--';
/** 默认的空数据时副标题文字 */

const DEFAULT_SUBTITLE_EMPTY_DATA = '暂无数据';
/** 默认的有数据时副标题文字 */

const DEFAULT_SUBTITLE_DATA = '电量统计(KW/h)';

const StatisticsTitle = props => {
  const {
    subtitleWithData = DEFAULT_SUBTITLE_DATA,
    subtitleWithoutData = DEFAULT_SUBTITLE_EMPTY_DATA,
    titleWithData,
    titleWithoutData = DEFAULT_TITLE_EMPTY_DATA,
    titleColor = TITLE_COLOR,
    subtitleColor = SUBTITLE_COLOR
  } = props;
  const context = useContext(ConfigContext);
  const {
    colorScheme
  } = context;
  const titleColorString = typeof titleColor === 'string' ? titleColor : titleColor.color(colorScheme);
  const subtitleColorString = typeof subtitleColor === 'string' ? subtitleColor : subtitleColor.color(colorScheme);
  /** 创建标题 */

  const createTitle = () => {
    const fontColor = titleWithData === undefined ? subtitleColorString : titleColorString;
    return <Text style={[styles.headerTitle, {
      color: fontColor
    }]}>
        {titleWithData || titleWithoutData}
      </Text>;
  };
  /** 创建副标题 */


  const createSubtitle = () => {
    const subtitle = titleWithData === undefined ? subtitleWithoutData : subtitleWithData;
    const subtitleStyle = [styles.headerSubtitle, {
      color: subtitleColorString
    }];
    return <Text style={subtitleStyle}>{subtitle}</Text>;
  };

  return <View style={styles.titleWrapper}>
      {createTitle()}
      {createSubtitle()}
    </View>;
};
/**
 * @export
 * @author Xu Liang
 * @since 10044
 * @module statistics
 * @description 统计界面标题
 * @property {string | number} titleWithoutData - 空数据时标题文字
 * @property {string | number} titleWithData - 有数据时标题文字
 * @property {string | number} subtitleWithoutData - 空数据时副标题文字
 * @property {string | number} subtitleWithData - 有数据时副标题文字
 * @property {DynamicColor} titleColor - 标题颜色（适配黑暗模式）
 * @property {DynamicColor} subtitleColor - 副标题颜色（适配黑暗模式）
 */


const MemoStatisticsTitle = React.memo(StatisticsTitle);
export default MemoStatisticsTitle;
const styles = StyleSheet.create({
  header: {
    marginTop: 30,
    marginBottom: 82.5
  },
  titleWrapper: {
    height: 68
  },
  headerTitle: {
    fontFamily: 'Mitype2018-70',
    fontSize: 42,
    color: '#000000',
    letterSpacing: -1.72,
    textAlign: 'center'
  },
  headerSubtitle: {
    fontFamily: 'MILanPro_NORMAL--GB1-4',
    fontSize: 13,
    color: '#999999',
    letterSpacing: 0,
    textAlign: 'center'
  }
});