import React from 'react';
import DynamicColor from '../../styles/DynamicColor';
declare type tabItem = {
    key: string | number;
    value: string | number;
};
export declare type tabItemsType = Array<tabItem>;
export interface StatisticsTabsPropType {
    tabItems?: tabItemsType;
    inactiveTabsColor?: DynamicColor | string;
    activeTabColor?: DynamicColor | string;
    onChange?: (key: number | string) => void;
    activeKey?: string | number;
}
declare const MemoStatisticsTabs: React.MemoExoticComponent<(props: StatisticsTabsPropType) => JSX.Element>;
export default MemoStatisticsTabs;
