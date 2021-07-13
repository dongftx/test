import React from 'react';
import DynamicColor from '../../styles/DynamicColor';
export interface StatisticsTitlePropType {
    titleColor?: DynamicColor | string;
    subtitleColor?: DynamicColor | string;
    titleWithoutData?: string | number;
    titleWithData?: string | number;
    subtitleWithoutData?: string | number;
    subtitleWithData?: string | number;
}
declare const MemoStatisticsTitle: React.MemoExoticComponent<(props: StatisticsTitlePropType) => JSX.Element>;
export default MemoStatisticsTitle;
