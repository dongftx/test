import React from 'react';
import { TextStyle, ViewStyle, StyleProp } from 'react-native';
export interface YAxisPropsType {
    axisWidth: number;
    axisHeight: number;
    data: Array<number>;
    dataTextStyle?: TextStyle;
    name: string;
    nameTextStyle?: TextStyle;
    nameWidth: number;
    nameGap: number;
    axisLineShow: boolean;
    axisLineStyle?: ViewStyle;
    axisTickShow?: boolean;
    axisTickStyle?: ViewStyle;
    axisLabelStyle?: TextStyle;
    axisStyle?: StyleProp<ViewStyle>;
    splitNum: number;
    scale?: number;
    splitLineShow: boolean;
    splitLineStyle?: ViewStyle;
}
declare const MemoYAxis: React.MemoExoticComponent<(props: YAxisPropsType) => JSX.Element>;
export default MemoYAxis;
