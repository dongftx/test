import React from 'react';
import { ViewStyle } from 'react-native';
export interface CirclePropType {
    style?: ViewStyle;
    radius: number;
    fill?: string;
    stroke?: string;
    strokeWidth: number;
    colors?: Array<string>;
    locations?: Array<number>;
}
declare const MemoCircle: React.MemoExoticComponent<(props: CirclePropType) => JSX.Element>;
export default MemoCircle;
