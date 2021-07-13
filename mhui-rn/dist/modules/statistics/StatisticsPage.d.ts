import React, { PureComponent } from 'react';
import { StatisticsTabsPropType, tabItemsType } from './StatisticsTabs';
import { RadioGroupWithSeparatorPropType, radioOptionsPropType } from './RadioGroupWithSeparator';
import { CircleLoadingPropType } from '../../components/loading/CircleLoading';
import { TitleConfig } from './StatisticsChartWithTitle';
import { SingleTabParamsPropType, MultiTabParamsPropType, MultiTabUserStatisticsDataPropType, SingleTabUserStatisticsDataPropType } from './requestConfig';
import { ChartType } from './chart';
declare type TabsConfig = StatisticsTabsPropType;
declare type RadioGroupConfig = RadioGroupWithSeparatorPropType;
export interface StatisticsPagePropType {
    chartType: ChartType;
    dataSourceConfig: MultiTabParamsPropType | SingleTabParamsPropType;
    showTabs?: boolean;
    titleConfig?: TitleConfig;
    radioGroupConfig?: RadioGroupConfig;
    tabsConfig?: TabsConfig;
}
export interface StatisticsPageState {
    isLoading: boolean;
    hasError: boolean;
    checkedId: number;
    activeKey: number;
    statisticsData: MultiTabUserStatisticsDataPropType | SingleTabUserStatisticsDataPropType;
}
export default class StatisticsPage extends PureComponent<StatisticsPagePropType, StatisticsPageState> {
    static contextType: React.Context<Partial<Pick<import("../../components/configProvider").ConfigContextProps, "language" | "colorScheme" | "environment"> & {
        theme: import("../../styles/themes").ITheme;
    }>>;
    circleLoadingRef: React.RefObject<CircleLoadingPropType>;
    static defaultProps: {
        chartType: string;
        showTabs: boolean;
        dataSourceConfig: ({
            value: string;
            items: {
                id: number;
                type: string;
                value: string;
                params: {};
            }[];
        } | {
            value: string;
            items: {
                type: string;
                value: string;
                params: {};
            }[];
        })[];
    };
    tabItems: tabItemsType;
    radioOptions: Map<number | string, radioOptionsPropType>;
    showTabs: boolean;
    constructor(props: StatisticsPagePropType);
    componentDidMount(): void;
    createTabItems(): void;
    onChangeActiveKey: (key: string | number) => void;
    onChangeCheck: (checkedId: number) => void;
    createLoading: () => JSX.Element;
    createStatisticsChartWithTitle: () => JSX.Element;
    render(): JSX.Element;
}
export {};
