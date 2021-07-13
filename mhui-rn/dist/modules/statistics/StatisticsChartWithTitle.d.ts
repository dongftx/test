import React, { PureComponent } from 'react';
import { StatisticsTitlePropType } from './StatisticsTitle';
import { ChartType } from './chart';
import { SingleDataTypeUserStatisticsDataPropType, UserStatisticsDataType } from './requestConfig';
export declare type TitleConfig = StatisticsTitlePropType;
export interface StatisticsChartWithTitlePropType {
    dataType: UserStatisticsDataType;
    chartType: ChartType;
    chartData?: SingleDataTypeUserStatisticsDataPropType;
    titleConfig?: TitleConfig;
}
export interface StatisticsChartWithTitleState {
    selectedIndex: number;
}
export default class StatisticsChartWithTitle extends PureComponent<StatisticsChartWithTitlePropType, StatisticsChartWithTitleState> {
    static contextType: React.Context<Partial<Pick<import("../../components/configProvider").ConfigContextProps, "language" | "colorScheme" | "environment"> & {
        theme: import("../../styles/themes").ITheme;
    }>>;
    static defaultProps: {
        chartData: never[];
    };
    constructor(props: StatisticsChartWithTitlePropType);
    onChangeSelectedIndex: (index: number) => void;
    render(): JSX.Element;
}
