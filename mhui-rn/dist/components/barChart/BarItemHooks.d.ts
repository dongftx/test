import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
export interface BarItemPropsType {
    label?: string | number;
    labelShow?: boolean;
    labelStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    height: number;
    underlayColor?: string;
    onPress?: () => void;
}
declare const MemoBarItemHooks: React.MemoExoticComponent<(props: BarItemPropsType) => JSX.Element>;
export default MemoBarItemHooks;
