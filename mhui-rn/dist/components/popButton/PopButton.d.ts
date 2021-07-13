/// <reference types="react" />
import { TextStyle, GestureResponderEvent, ViewStyle } from 'react-native';
import { IAccessibilityPropTypes } from '@utils/accessibility-helper';
export declare const COLORTYPE: {
    BLUELAYERWHITE: string;
    GRAYLAYERBLACK: string;
    GRAYLAYERBLUE: string;
};
export interface PopButtonProps extends IAccessibilityPropTypes {
    sizeLevel?: 'regular' | 'medium' | 'small';
    title: string;
    style?: ViewStyle;
    titleStyle?: TextStyle;
    titleColor?: string;
    colorType?: 'blueLayerWhite' | 'grayLayerBlack' | 'grayLayerBlue';
    backgroundColor?: {
        bgColorNormal: string;
        bgColorPressed: string;
    };
    disabled?: boolean;
    onPress: (event: GestureResponderEvent) => void;
    onLongPress?: (event: GestureResponderEvent) => void;
    allowFontScaling?: boolean;
}
export declare function PopButton(props: PopButtonProps): JSX.Element;
export declare namespace PopButton {
    var defaultProps: {
        sizeLevel: string;
        title: string;
        disabled: boolean;
        allowFontScaling: boolean;
    };
    var COLORTYPE: {
        BLUELAYERWHITE: string;
        GRAYLAYERBLACK: string;
        GRAYLAYERBLUE: string;
    };
}
export default PopButton;
