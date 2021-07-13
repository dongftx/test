import React from 'react';
import { TextInputProps, ViewStyle } from 'react-native';
import { IAccessibilityPropTypes } from '@utils/accessibility-helper';
import { ConfigContext } from '../configProvider';
export declare const TYPE: {
    DELETE: string;
    SECURE: string;
    NONE: string;
};
export interface InputViewProps extends IAccessibilityPropTypes {
    type?: string;
    isCorrect: boolean;
    placeholder: string;
    defaultValue: string;
    onChangeText?: (text: string) => void;
    textInputProps?: TextInputProps;
    style: ViewStyle;
}
export interface InputViewState {
    inputValue: string;
    secureState: boolean;
    isFocused: boolean;
}
declare class InputView extends React.Component<InputViewProps, InputViewState> {
    static TYPE: {
        DELETE: string;
        SECURE: string;
        NONE: string;
    };
    static contextType: React.Context<Partial<Pick<import("../configProvider").ConfigContextProps, "language" | "colorScheme" | "environment"> & {
        theme: import("../../styles/themes").ITheme;
    }>>;
    context: React.ContextType<typeof ConfigContext>;
    static defaultProps: {
        type: string;
        placeholder: string;
        defaultValue: string;
        textInputProps: {
            autoFocus: boolean;
        };
        isCorrect: boolean;
    };
    constructor(props: InputViewProps);
    _onChange(changeText: string): void;
    _onFocus(): void;
    _renderRightDeleteButtonView(): JSX.Element;
    _renderRightSecureButtonView(): JSX.Element;
    _notNull(str: string): boolean;
    render(): JSX.Element;
}
export default InputView;
