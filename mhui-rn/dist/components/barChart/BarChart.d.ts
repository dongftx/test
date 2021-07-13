import React, { PureComponent } from 'react';
import { ViewStyle, StyleProp, TextStyle } from 'react-native';
import { XAxisPropsType } from './XAxis';
import { YAxisPropsType } from './YAxis';
import { ConfigContext } from '../configProvider';
export interface HeighLightPropsType {
    xAxisDataStyle?: StyleProp<TextStyle>;
    barStyle?: StyleProp<ViewStyle>;
    seriesDataStyle?: StyleProp<ViewStyle>;
}
export interface SeriesPropsType {
    data: Array<number>;
    itemStyle?: ViewStyle;
    labelShow?: boolean;
    labelStyle?: StyleProp<ViewStyle>;
    underlayColor?: string;
}
export interface BarChartPropsType {
    autoScale?: boolean;
    style?: ViewStyle;
    xAxisProps: XAxisPropsType;
    yAxisProps: YAxisPropsType;
    series: SeriesPropsType;
    onPress?: (idx: number, value: number) => void;
    heighLight?: HeighLightPropsType;
    selectedIndex?: number;
}
interface BarChartState {
    isOnLayoutCall: boolean;
    width: number;
    height: number;
    selectedIndex: number;
}
export default class BarChart extends PureComponent<BarChartPropsType, BarChartState> {
    static contextType: React.Context<Partial<Pick<import("../configProvider").ConfigContextProps, "language" | "colorScheme" | "environment"> & {
        theme: import("../../styles/themes").ITheme;
    }>>;
    context: React.ContextType<typeof ConfigContext>;
    static defaultProps: {
        autoScale: boolean;
        xAxisProps: {
            data: string[];
            axisWidth: number;
            axisHeight: number;
            nameGap: number;
            nameWidth: number;
            axisStyle: {
                position: string;
                bottom: number;
                left: number;
                height: number;
            };
        };
        yAxisProps: {
            data: number[];
            splitNum: number;
            axisWidth: number;
            axisHeight: number;
            nameGap: number;
            nameWidth: number;
            axisStyle: {
                position: string;
                left: number;
                bottom: number;
                width: number;
            };
            axisLineShow: boolean;
        };
        series: {
            data: number[];
        };
    };
    constructor(props: BarChartPropsType);
    componentDidUpdate(prevProps: BarChartPropsType): void;
    _createYAxisData: (data: number[], splitNum?: number) => number[];
    _createYAxisStyle: (yAxisStyle?: StyleProp<ViewStyle>, bottom?: number | undefined, yAxisWidth?: number | undefined) => (false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | import("react-native").RecursiveArray<false | ViewStyle | import("react-native").RegisteredStyle<ViewStyle> | null | undefined> | {
        position: "absolute";
        bottom: number;
        left: number;
        width: number;
    } | null | undefined)[];
    _createYAxisSplitLineStyle: (width: number) => {
        width: number;
    };
    onPress: (idx: number, value: number) => void;
    createBarItems: (ratio: number, heighLight: StyleProp<ViewStyle>) => JSX.Element[];
    onLayout: ({ nativeEvent: { layout: { width, height, }, }, }: {
        nativeEvent: {
            layout: {
                width: any;
                height: any;
            };
        };
    }) => void;
    render(): JSX.Element;
}
export {};
