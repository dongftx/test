// // @ts-nocheck
// /* eslint-disable  */
import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import { ConfigContext } from "../../components/configProvider";
import DynamicColor from "../../styles/DynamicColor";
/** 默认的处于活动状态的tabs文字颜色 */

const DEFAULT_ACTIVE_TABS_COLOR = new DynamicColor('#000000', 'rgba(255,255,255,0.90)');
/** 默认的处于不活动状态的tab文字颜色 */

const DEFAULT_INACTIVE_TABS_COLOR = new DynamicColor('#999999', '#rgba(255,255,255,0.40)');
const DEFAULT_TAB_ITEMS = [{
  key: 0,
  value: 'VOC'
}, {
  key: 1,
  value: 'PM2.5'
}];

const StatisticsTabs = props => {
  const {
    tabItems = DEFAULT_TAB_ITEMS,
    inactiveTabsColor = DEFAULT_INACTIVE_TABS_COLOR,
    activeTabColor = DEFAULT_ACTIVE_TABS_COLOR,
    activeKey: defaultActiveKey = '',
    onChange
  } = props;
  const [activeKey, setActiveKey] = useState(defaultActiveKey);
  const context = useContext(ConfigContext);
  const {
    colorScheme
  } = context;
  const inactiveTabsColorString = typeof inactiveTabsColor === 'string' ? inactiveTabsColor : inactiveTabsColor?.color(colorScheme);
  const activeTabColorString = typeof activeTabColor === 'string' ? activeTabColor : activeTabColor?.color(colorScheme);

  const handleChangeTab = key => {
    setActiveKey(key);
    onChange && onChange(key);
  };
  /** 创建tabs */


  const createTabs = () => {
    const activeTabTextStyle = [styles.activeTabText, {
      color: activeTabColorString
    }];
    const inactiveTabTextStyle = [styles.inactiveTabText, {
      color: inactiveTabsColorString
    }];
    const tabs = tabItems.map(({
      value,
      key
    }) => {
      const tabTextStyle = key === activeKey ? activeTabTextStyle : inactiveTabTextStyle;
      return <TouchableWithoutFeedback key={key} onPress={() => handleChangeTab(key)}>
          <Text style={tabTextStyle}>{value}</Text>
        </TouchableWithoutFeedback>;
    });
    return tabs;
  };

  return <View style={styles.container}>
      {createTabs()}
    </View>;
};
/**
 * @export
 * @author Xu Liang
 * @since 10044
 * @module statistics
 * @description 统计界面Tabs
 * @property {Array<tabItem>} tabItems - tabs item文本内容
 * @property {string | DynamicColor} inactiveTabsColor - 处于不活动状态的tabs文字颜色（适配黑暗模式）
 * @property {string | DynamicColor} activeTabColor - 处于活动状态的tab文字颜色（适配黑暗模式）
 * @property {function} onChange -  改变时的回调
 * @property {string | number} activeKey - 初始的激活 tab 面板的 key
 */


const MemoStatisticsTabs = React.memo(StatisticsTabs);
export default MemoStatisticsTabs;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45
  },
  inactiveTabText: {
    fontFamily: 'MILanPro_MEDIUM--GB1-4',
    fontSize: 16,
    color: '#999999',
    letterSpacing: 0,
    textAlign: 'center',
    width: 106
  },
  activeTabText: {
    fontFamily: 'MILanPro_MEDIUM--GB1-4',
    fontSize: 16,
    color: '#000000',
    letterSpacing: 0,
    textAlign: 'center',
    width: 106
  }
});