import React, { Component } from 'react';
import { Text, Animated } from 'react-native';
import { ConfigContext } from '../configProvider';
export interface ToastViewProps {
    position: number;
    delay: number;
    visible: boolean;
    animation: boolean;
    hideOnPress: boolean;
    keyboardAvoiding: boolean;
    onShow: Function;
    onShown: Function;
    onHide: Function;
    onHidden: Function;
    text: Text;
}
export interface ToastViewState {
    rotate: Animated.Value;
}
export default class ToastView extends Component<ToastViewProps, ToastViewState> {
    static contextType: React.Context<Partial<Pick<import("../configProvider").ConfigContextProps, "language" | "colorScheme" | "environment"> & {
        theme: import("../../styles/themes").ITheme;
    }>>;
    context: React.ContextType<typeof ConfigContext>;
    static defaultProps: {
        visible: boolean;
        delay: number;
        keyboardAvoiding: boolean;
        hideOnPress: boolean;
        animation: boolean;
        position: number;
    };
    constructor(props: ToastViewProps);
    componentDidMount(): void;
    onShowView: () => void;
    render(): JSX.Element;
}
