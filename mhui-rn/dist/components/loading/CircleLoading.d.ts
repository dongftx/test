import React from 'react';
import { ViewStyle } from 'react-native';
export interface CircleLoadingPropType {
    style?: ViewStyle;
    radius?: number;
    timeout?: number;
    onTimeout?: () => void;
}
declare const CircleLoadingRef: React.ForwardRefExoticComponent<CircleLoadingPropType & React.RefAttributes<unknown>>;
export default CircleLoadingRef;
