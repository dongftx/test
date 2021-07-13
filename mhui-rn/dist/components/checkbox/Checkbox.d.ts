import PropTypes from 'prop-types';
import React from 'react';
import { Animated, ViewStyle } from 'react-native';
export interface CheckboxProps {
    style: ViewStyle;
    disabled: boolean;
    checked: boolean;
    checkedColor: string;
    onValueChange: (checked: boolean) => void;
}
declare class Checkbox extends React.Component {
    static contextType: React.Context<Partial<Pick<import("../configProvider").ConfigContextProps, "language" | "colorScheme" | "environment"> & {
        theme: import("../../styles/themes").ITheme;
    }>>;
    static propTypes: {
        style: PropTypes.Requireable<object>;
        disabled: PropTypes.Requireable<boolean>;
        checked: PropTypes.Requireable<boolean>;
        onValueChange: PropTypes.Requireable<(...args: any[]) => any>;
        checkedColor: PropTypes.Requireable<string>;
        label: PropTypes.Requireable<string>;
        accessible: PropTypes.Requireable<boolean>;
        accessibilityLabel: PropTypes.Requireable<string | number>;
        accessibilityHint: PropTypes.Requireable<string | number>;
    };
    static defaultProps: {
        style: {};
        disabled: boolean;
        checked: boolean;
        checkedColor: string;
    };
    private UNCHECKED_BACKGROUNDCOLOR;
    constructor(props: any, context: any);
    UNSAFE_componentWillReceiveProps(newProps: any): void;
    backgroundColor: Animated.Value;
    render(): JSX.Element;
    _onValueChange(): void;
}
export default Checkbox;
