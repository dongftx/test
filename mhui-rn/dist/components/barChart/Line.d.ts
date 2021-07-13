import React from 'react';
import { ViewStyle, StyleProp } from 'react-native';
export interface LinePropsType {
    type: 'solid' | 'dashed';
    direction?: 'row' | 'column';
    backgroundColor: string;
    width: number;
    height: number;
    itemSize?: number;
    itemGap?: number;
    style?: StyleProp<ViewStyle>;
}
declare const MemoLine: React.MemoExoticComponent<(props: LinePropsType) => JSX.Element>;
export default MemoLine;
