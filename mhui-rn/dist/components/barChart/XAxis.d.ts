import React from 'react';
import { TextStyle, ViewStyle, StyleProp } from 'react-native';
export interface XAxisPropsType {
    axisWidth: number;
    axisHeight: number;
    data: Array<number | string>;
    dataTextStyle?: TextStyle;
    dataTextStyles?: Array<TextStyle>;
    name: string;
    nameTextStyle?: TextStyle;
    nameWidth: number;
    nameGap: number;
    axisLineShow?: boolean;
    axisLineStyle?: ViewStyle;
    axisTickShow?: boolean;
    axisTickStyle?: ViewStyle;
    axisLabelStyle?: ViewStyle;
    axisStyle?: StyleProp<ViewStyle>;
    selectedIndex: number;
    heighLightStyle: StyleProp<ViewStyle>;
}
declare const MemoXAxis: React.MemoExoticComponent<(props: XAxisPropsType) => JSX.Element>;
export default MemoXAxis;
