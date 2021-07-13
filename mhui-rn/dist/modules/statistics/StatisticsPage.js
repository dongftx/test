// @ts-nocheck

/* eslint-disable  */
import React, { PureComponent } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import StatisticsTabs from "./StatisticsTabs";
import RadioGroupWithSeparator from "./RadioGroupWithSeparator";
import { adjustSize } from "../../utils/sizes";
import { ConfigContext } from "../../components/configProvider";
import CircleLoading from "../../components/loading/CircleLoading";
import StatisticsChartWithTitle from "./StatisticsChartWithTitle";
import getUserStatistics from "./requestConfig";

/**
 * @export
 * @author Xu Liang
 * @since 10044
 * @module statistics
 * @description 统计界面
 * @property {boolean} showTabs - 是否显示tabs。默认不显示
 * @property {ChartType} chartType - 图表类型
 * @property {dataSourceConfig} dataSourceConfig - 数据源配置
 * @property {TitleConfig} titleConfig - 统计界面标题配置
 * @property {RadioGroupConfig} radioGroupConfig - RadioGroup配置
 * @property {TabsConfig} tabsConfig tabs配置
 */
export default class StatisticsPage extends PureComponent {
  static contextType = ConfigContext;
  static defaultProps = {
    chartType: 'BarChart',
    showTabs: false,
    dataSourceConfig: [{
      // key: 0,
      value: 'PM2.5',
      items: [{
        id: 0,
        type: 'day',
        value: '日',
        params: {}
      }, {
        id: 1,
        type: 'week',
        value: '周',
        params: {}
      }, {
        id: 2,
        type: 'month',
        value: '月',
        params: {}
      }]
    }, {
      value: 'VOC',
      items: [{
        // id: 0,
        type: 'day',
        value: '日',
        params: {}
      }, {
        // id: 1,
        type: 'day',
        value: '月',
        params: {}
      }, {
        // id: 2,
        type: 'day',
        value: '年',
        params: {}
      }]
    }]
  };
  /** tab items 文本  */

  tabItems = [];
  /** radio options */

  radioOptions = new Map();
  /** 是否显示tabs */

  showTabs = false;

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      hasError: false,
      activeKey: 0,
      // tabsConfig?.activeKey || this.tabItems[0]?.key || 0,
      checkedId: 0,
      statisticsData: []
    };
    this.circleLoadingRef = React.createRef();
  }

  componentDidMount() {
    const {
      dataSourceConfig
    } = this.props;
    getUserStatistics(dataSourceConfig).then(data => {
      // this.circleLoadingRef.current.onClose();data.map((v) => console.log(v))
      // console.log('data:', data, );
      this.setState({
        isLoading: false,
        statisticsData: data
      });
    }).catch(() => {
      this.setState({
        hasError: true
      });
    });
  }

  createTabItems() {
    const {
      dataSourceConfig,
      showTabs
    } = this.props;

    if (Array.isArray(dataSourceConfig)) {
      this.showTabs = !(showTabs === false); // || true;

      this.tabItems = dataSourceConfig.map(({
        key: tabKey,
        value: tabValue,
        items: dataTypeItems
      }, tabIdx) => {
        const radioOption = dataTypeItems.map(({
          id,
          value,
          type
        }, radioIdx) => ({
          id: id === undefined ? radioIdx : id,
          value,
          type
        }));
        const newTabKey = tabKey === undefined ? tabIdx : tabKey;
        this.radioOptions.set(newTabKey, radioOption);
        return {
          key: newTabKey,
          value: tabValue
        };
      });
    } else {
      this.showTabs = false;
      this.tabItems = [];
    }
  }

  onChangeActiveKey = key => {
    const {
      checkedId
    } = this.state;
    const newActiveKey = parseInt(`${key}`, 10);
    const newRadioItems = this.radioOptions.get(newActiveKey) || []; // 如果当前checkId大于等于新的radioOptions长度，就会触发越界，因此要重置checkId

    const newCheckId = checkedId >= newRadioItems.length ? 0 : checkedId;
    this.setState({
      activeKey: newActiveKey,
      checkedId: newCheckId
    });
  };
  onChangeCheck = checkedId => {
    this.setState({
      checkedId
    });
  };
  createLoading = () => {
    const radius = adjustSize(129); // 43

    return <View style={styles.loading}>
        <CircleLoading ref={this.circleLoadingRef} radius={radius} />
      </View>;
  };
  createStatisticsChartWithTitle = () => {
    const {
      dataSourceConfig,
      chartType,
      titleConfig
    } = this.props;
    const {
      statisticsData = [],
      activeKey,
      checkedId
    } = this.state;
    const tabStatisticsData = Array.isArray(dataSourceConfig) ? statisticsData[activeKey] : statisticsData; // .find(({type}) => type === activeKey);// || [];//[activeKey] || [];

    const chartData = tabStatisticsData[checkedId] || []; // ? tabStatisticsData.value[checkedId] : [];// showTabs ? statisticsData[activeKey][checkedId] : statisticsData[checkedId];

    const curRadioOptions = this.radioOptions.get(activeKey) || [];
    const dataType = curRadioOptions[checkedId]?.type || 'day';
    return <StatisticsChartWithTitle dataType={dataType} chartType={chartType} chartData={chartData} titleConfig={titleConfig} />;
  };

  render() {
    const {
      tabsConfig,
      radioGroupConfig
    } = this.props;
    const {
      isLoading,
      hasError,
      activeKey,
      checkedId
    } = this.state;
    this.createTabItems();

    if (hasError) {
      return <View style={styles.container}><Text>抱歉，数据加载异常，请稍后重试。</Text></View>;
    }

    return <View style={styles.container}>
        {this.showTabs ? <StatisticsTabs {...tabsConfig} activeKey={activeKey} onChange={this.onChangeActiveKey} tabItems={this.tabItems} /> : null}
        {isLoading ? this.createLoading() : this.createStatisticsChartWithTitle()}
        <RadioGroupWithSeparator {...radioGroupConfig} checkedId={checkedId} onChangeCheck={this.onChangeCheck} radioOptions={this.radioOptions.get(activeKey)} />
      </View>;
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});