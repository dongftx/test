// // @ts-nocheck
// /* eslint-disable  */
import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { window } from "../../utils/sizes";
import { ConfigContext } from "../../components/configProvider";
import StatisticsTitle from "./StatisticsTitle";
import { createChartComponent } from "./chart";

/**
 * @export
 * @author Xu Liang
 * @since 10044
 * @module statistics
 * @description 统计界面图表部分（有title）
 * @property {ChartData} chartData - 图表数据（只有一个数据系列）
 * @property {ChartConfig} chartConfig - 图表配置
 * @property {TitleConfig} titleConfig - 统计界面标题配置
 */
export default class StatisticsChartWithTitle extends PureComponent {
  static contextType = ConfigContext;
  static defaultProps = {
    chartData: []
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 3
    };
  }

  onChangeSelectedIndex = index => {
    this.setState({
      selectedIndex: index
    });
  };

  render() {
    const {
      titleConfig,
      chartData = [],
      chartType,
      dataType = 'day'
    } = this.props;
    const {
      selectedIndex
    } = this.state;
    const ChartComponent = createChartComponent(chartType);
    const value = chartData[selectedIndex]?.value;
    return <View style={styles.body}>
        <View style={styles.header}>
          <StatisticsTitle {...titleConfig} titleWithData={value} />
        </View>
        <ChartComponent dataType={dataType} style={styles.bodyChart} chartData={chartData} onPress={this.onChangeSelectedIndex} selectedIndex={selectedIndex} />
      </View>;
  }

}
const styles = StyleSheet.create({
  body: {
    flex: 1
  },
  header: {
    marginTop: 30,
    marginBottom: 82.5
  },
  bodyChart: {
    flex: 1,
    width: window.width - 2 * 27
  }
});